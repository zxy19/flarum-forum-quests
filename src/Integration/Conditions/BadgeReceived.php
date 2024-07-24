<?php
namespace Xypp\ForumQuests\Integration\Conditions;

use V17Development\FlarumUserBadges\UserBadge\UserBadge;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class BadgeReceived extends ConditionDefinition
{
    public bool $needManualUpdate = true;
    public function __construct()
    {
        parent::__construct("badge_received");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $badges = UserBadge::where("user_id", $user->id)->get();
        foreach ($badges as $badge) {
            $conditionAccumulation->updateValue($badge->assigned_at, 1);
        }
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
    public function updateValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $q = UserBadge::where("user_id", $user->id);
        if ($conditionAccumulation->updateFlag) {
            $q = $q->where("id", ">=", $conditionAccumulation->updateFlag);
        }
        $badges = $q->get();
        foreach ($badges as $badge) {
            $conditionAccumulation->updateValue($badge->assigned_at, 1);
        }
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }

}