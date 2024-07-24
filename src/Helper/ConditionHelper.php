<?php

namespace Xypp\ForumQuests\Helper;

use Carbon\Carbon;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Illuminate\Support\Collection;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Extend\ConditionDefinitionCollection;
use Xypp\ForumQuests\Notification\QuestDoneNotification;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\QuestConditionQuestInfo;
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

    public function checkCondition(string $name, string $operator, int $value, ?int $span, QuestCondition $condition): bool
    {
        $currentTime = $this->cz->now();
        $conditionDefine = $this->collection->getConditionDefinition($name);
        if (!$condition) {
            return false;
        }
        if ($span)
            $currentValue = $condition->getAccumulation()->getSpan($currentTime, $span);
        else
            $currentValue = $condition->getAccumulation()->total;
        if (!$conditionDefine->compare($currentValue, $operator, $value)) {
            return false;
        }
        return true;
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
                "msg" => $this->translator->trans('xypp-forum-quests.api.condition_not_allow_frontend')
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
        if ($data->flag) {
            $model->getAccumulation()->updateFlag($data->flag);
        }
        $model->updateTimestamps();
        $model->save();

        $model->relatedQuest()->get()->each(function ($quest) use ($user, $model) {
            $this->updateAchieve($user, $quest, $model);
        });
    }
    public function updateAchieve(User $user, QuestInfo $questInfo, ?QuestCondition $preJudge = null)
    {
        $userQuest = UserQuest::lockForUpdate()->where('user_id', $user->id)->where('quest_info_id', $questInfo->id)->first();
        if ($userQuest) {
            if (!$questInfo->re_available)
                return;
            $reAvailable = ReAvailableUtils::getExpireTime($questInfo->re_available, $this->cz->z($userQuest->updated_at));

            if (!$reAvailable || $reAvailable->isFuture())
                return;
        }
        $isOk = true;
        $currentTime = $this->cz->now();
        if ($preJudge) {
            $questInfo->eachConditions(function ($name, $operator, $value, $span) use ($preJudge, &$isOk) {
                if ($preJudge->name == $name) {
                    $isOk = $isOk && $this->checkCondition($name, $operator, $value, $span, $preJudge);
                }
            });
        }

        $conditions = $questInfo->getUserConditions($user)->get();
        $questInfo->eachConditions(
            function ($name, $operator, $value, $span) use ($conditions, &$isOk) {
                if (!$isOk)
                    return;
                /**  @var QuestCondition */
                $condition = $conditions->firstWhere('name', $name);
                if (!$condition) {
                    $isOk = false;
                    return;
                }
                $isOk = $isOk && $this->checkCondition($name, $operator, $value, $span, $condition);
            }
        );
        if ($isOk) {
            if (!$userQuest) {
                $userQuest = new UserQuest();
                $userQuest->user_id = $user->id;
                $userQuest->quest_info_id = $questInfo->id;
                $userQuest->iid = $questInfo->id . "-" . $user->id;
            }
            $userQuest->refresh_at = ReAvailableUtils::getExpireTime($questInfo->re_available, $currentTime);
            $userQuest->updateTimestamps();
            $userQuest->save();

            $this->rewardHelper->reward($user, $questInfo);
            $this->notifications->sync(new QuestDoneNotification($questInfo, $user), [$user]);
        }
    }
    public function updateConditionFromDatabase(User $user, QuestInfo $data)
    {
        $updatedConditions = [];
        $conditions = [];
        $ret = [];
        $data->eachConditions(
            function ($name, $operator, $value, $span) use ($user, &$updatedConditions, &$conditions, &$ret) {
                $conditionDefine = $this->collection->getConditionDefinition($name);
                $model = QuestCondition::lockForUpdate()->where('user_id', $user->id)->where('name', $name)->first();
                if (!$model) {
                    $model = new QuestCondition();
                    $model->user_id = $user->id;
                    $model->name = $name;
                    $model->value = 0;
                }
                $accumulation = $model->getAccumulation();
                if ($conditionDefine->updateValue($user, $accumulation)) {
                    $updatedConditions[] = $name;
                    $conditions[$name] = $model;
                    $ret[] = $model;
                    $model->value = $accumulation->total;
                    $model->updateTimestamps();
                    $model->save();
                }
            }
        );
        QuestConditionQuestInfo::whereIn("condition_name", $updatedConditions)->get()->each(function (QuestConditionQuestInfo $model) use ($user, $conditions) {
            $this->updateAchieve($user, $model->quest_info()->first(), $conditions[$model->condition_name]);
        });
        return $ret;
    }
}