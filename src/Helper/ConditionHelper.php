<?php

namespace Xypp\ForumQuests\Helper;

use Carbon\Carbon;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Illuminate\Support\Collection;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Extend\ConditionDefinitionCollection;
use Xypp\ForumQuests\Notification\QuestDoneNotification;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ConditionUtils;
use Xypp\ForumQuests\Utils\ReAvailableUtils;

class ConditionHelper
{
    public RewardHelper $rewardHelper;
    public NotificationSyncer $notifications;
    public ConditionDefinitionCollection $collection;
    public CarbonZoneHelper $cz;
    public Translator $translator;
    public function __construct(
        ConditionDefinitionCollection $collection,
        RewardHelper $rewardHelper,
        NotificationSyncer $notifications,
        CarbonZoneHelper $carbonZoneHelper,
        Translator $translator
    ) {
        $this->collection = $collection;
        $this->notifications = $notifications;
        $this->rewardHelper = $rewardHelper;
        $this->cz = $carbonZoneHelper;
        $this->translator = $translator;
    }
    public function getAllConditionName(): array
    {
        return $this->collection->getAllConditionName();
    }
    public function getConditionDefinition(string $name): ConditionDefinition
    {
        return $this->collection->getConditionDefinition($name);
    }

    public function updateConditions(User $user, ConditionData|array $data, bool $frontend = false)
    {
        if (is_array($data)) {
            foreach ($data as $condition) {
                $this->updateConditions($user, $condition, $frontend);
            }
            return;
        }
        $conditionDefine = $this->collection->getConditionDefinition($data->name);
        if ($frontend && !$conditionDefine->allowFrontendTrigger) {
            throw new ValidationException([
                "msg"=>$this->translator->trans('xypp-forum-quests.api.condition_not_allow_frontend')
            ]);
        }
        $model = QuestCondition::lockForUpdate()->where('user_id', $user->id)->where('name', $data->name)->first();
        if (!$model) {
            $model = new QuestCondition();
            $model->user_id = $user->id;
            $model->name = $data->name;
            $model->value = 0;
        }
        $model->value += $data->value;
        $model->getAccumulation()->updateValue($this->cz->now(), $data->value);
        $model->updateTimestamps();
        $model->save();

        $model->relatedQuest()->get()->each(function ($quest) use ($user) {
            $this->updateAchieve($user, $quest);
        });
    }
    public function updateAchieve(User $user, QuestInfo $questInfo)
    {
        $userQuest = UserQuest::where('user_id', $user->id)->where('quest_info_id', $questInfo->id)->first();
        if ($userQuest) {
            if (!$questInfo->re_available)
                return;
            $reAvailable = ReAvailableUtils::getExpireTime($questInfo->re_available, $this->cz->z($userQuest->updated_at));

            if (!$reAvailable || $reAvailable->isFuture())
                return;
        }
        $conditions = $questInfo->getUserConditions($user)->get();
        $isOk = true;
        $currentTime = $this->cz->now();
        $questInfo->eachConditions(
            function ($name, $operator, $value, $span) use ($conditions, $currentTime, &$isOk) {
                if (!$isOk)
                    return;
                $conditionDefine = $this->collection->getConditionDefinition($name);
                /**  @var QuestCondition */
                $condition = $conditions->firstWhere('name', $name);
                if (!$condition) {
                    $isOk = false;
                    return;
                }
                if ($span)
                    $currentValue = $condition->getAccumulation()->getSpan($currentTime, $span);
                else
                    $currentValue = $condition->getAccumulation()->total;
                if (!$conditionDefine->compare($currentValue, $operator, $value)) {
                    $isOk = false;
                }
            }
        );
        if ($isOk) {
            if (!$userQuest) {
                $userQuest = new UserQuest();
                $userQuest->user_id = $user->id;
                $userQuest->quest_info_id = $questInfo->id;
            }
            $userQuest->refresh_at = ReAvailableUtils::getExpireTime($questInfo->re_available, $currentTime);
            $userQuest->updateTimestamps();
            $userQuest->save();

            $this->rewardHelper->reward($user, $questInfo);
            $this->notifications->sync(new QuestDoneNotification($questInfo, $user), [$user]);
        }
    }
}