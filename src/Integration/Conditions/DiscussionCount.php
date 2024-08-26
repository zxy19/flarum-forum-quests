<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class DiscussionCount extends ConditionDefinition
{
    public function __construct()
    {
        parent::__construct("discussion_count", null, "xypp-forum-quests.ref.integration.condition.discussion_count");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $discussions = $user->discussions()->orderByDesc('created_at')->get();
        foreach ($discussions as $discuss) {
            $conditionAccumulation->updateValue($discuss->created_at, 1);
        }
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
}