<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class DiscussionViews extends ConditionDefinition
{
    public function __construct()
    {
        parent::__construct("discussion_views");
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $discussions = $user->discussions()->orderByDesc('created_at')->get();
        foreach ($discussions as $discuss) {
            $views = $discuss->hasMany(DiscussionView::class)->get();
            foreach ($views as $view) {
                $conditionAccumulation->updateValue($view->visited_at, 1);
            }
        }
        return true;
    }
}