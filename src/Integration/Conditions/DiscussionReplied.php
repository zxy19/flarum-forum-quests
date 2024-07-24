<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class DiscussionReplied extends ConditionDefinition
{
    public function __construct()
    {
        parent::__construct("discussion_replied");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $discussions = $user->discussions()->orderByDesc('created_at')->get();
        foreach ($discussions as $discuss) {
            $posts = $discuss->posts()->orderByDesc('created_at')->get();
            foreach ($posts as $post) {
                if ($post->user_id == $user->id)
                    continue;
                $conditionAccumulation->updateValue($post->created_at, 1);
            }
        }
        if (!$conditionAccumulation->dirty)
            return false;
        return true;
    }
}