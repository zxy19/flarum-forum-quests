<?php

namespace Xypp\ForumQuests\Helper;

use Carbon\Carbon;
use Flarum\Locale\Translator;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Xypp\LocalizeDate\Helper\CarbonZoneHelper;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Helper\RewardHelper;
use Xypp\ForumQuests\Event\QuestDone;
use Xypp\Collector\Extend\ConditionDefinitionCollection;
use Xypp\ForumQuests\Notification\QuestDoneNotification;
use Xypp\Collector\Condition;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ReAvailableUtils;
use Illuminate\Events\Dispatcher;


class QuestHelper
{
    public RewardHelper $rewardHelper;
    public NotificationSyncer $notifications;
    public ConditionDefinitionCollection $collection;
    public CarbonZoneHelper $cz;
    public Translator $translator;
    public Dispatcher $events;
    public ConditionHelper $conditionHelper;
    public function __construct(
        ConditionDefinitionCollection $collection,
        RewardHelper $rewardHelper,
        NotificationSyncer $notifications,
        CarbonZoneHelper $carbonZoneHelper,
        Translator $translator,
        Dispatcher $events,
        ConditionHelper $conditionHelper
    ) {
        $this->collection = $collection;
        $this->notifications = $notifications;
        $this->rewardHelper = $rewardHelper;
        $this->cz = $carbonZoneHelper;
        $this->translator = $translator;
        $this->conditionHelper = $conditionHelper;
        $this->events = $events;
    }
    public function updateAchieve(User $user, QuestInfo $questInfo, ?Condition $preJudge = null)
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
            $questInfo->eachConditions(function ($name, $operator, $value, $span, $calculate) use ($preJudge, &$isOk) {
                if ($preJudge->name == $name) {
                    $isOk = $isOk && $this->conditionHelper->checkCondition($name, $operator, $value, $span, $calculate, $preJudge);
                }
            });
        }
        $conditions = $questInfo->getUserConditions($user)->get();
        $questInfo->eachConditions(
            function ($name, $operator, $value, $span, $calculate) use ($conditions, &$isOk) {
                if (!$isOk)
                    return;
                /**  @var Condition */
                $condition = $conditions->firstWhere('name', $name);
                if (!$condition) {
                    $isOk = false;
                    return;
                }
                $isOk = $isOk && $this->conditionHelper->checkCondition($name, $operator, $value, $span, $calculate, $condition);
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

            $this->events->dispatch(new QuestDone($user, $questInfo, $userQuest));

            $questInfo->eachRewards(function ($name, $value) use ($user) {
                $this->rewardHelper->reward($user, $name, intval($value));
            });
            $this->notifications->sync(new QuestDoneNotification($questInfo, $user), [$user]);
        }
    }
}