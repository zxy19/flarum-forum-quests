<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class Money extends ConditionDefinition
{
    public bool $accumulateAbsolute = false;
    public function __construct()
    {
        parent::__construct("money", null, "xypp-forum-quests.ref.integration.condition.money");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $conditionAccumulation->resetTotal($user->money);
        return true;
    }
}