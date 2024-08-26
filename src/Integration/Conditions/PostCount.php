<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class PostCount extends ConditionDefinition
{
    public function __construct()
    {
        parent::__construct("post_count",null,"xypp-forum-quests.ref.integration.condition.post_count");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $posts = $user->posts()->orderByDesc('created_at')->get();
        foreach ($posts as $post) {
            $conditionAccumulation->updateValue($post->created_at, 1);
        }
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
}