<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\Date;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class LikeRecv extends ConditionDefinition
{
    public ConnectionInterface $connection;
    public function __construct(ConnectionInterface $connection)
    {
        parent::__construct("like_recv");
        $this->connection = $connection;
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $posts = $user->posts()->get(['id']);
        $ids = $posts->pluck('id')->toArray();
        $likes = $this->connection->table("post_likes")->whereIn("post_id", $ids)->get(['created_at']);
        foreach ($likes as $like) {
            $date = Date::createFromFormat($this->connection->getQueryGrammar()->getDateFormat(), $like->created_at);
            $conditionAccumulation->updateValue($date, 1);
        }
        return $conditionAccumulation->dirty;
    }
}