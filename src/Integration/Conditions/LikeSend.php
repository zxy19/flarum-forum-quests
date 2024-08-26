<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class LikeSend extends ConditionDefinition
{
    public ConnectionInterface $connection;
    public function __construct(ConnectionInterface $connection)
    {
        parent::__construct("like_send",null,"xypp-forum-quests.ref.integration.condition.like_send");
        $this->connection = $connection;
    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {

        $likes = $this->connection->table("post_likes")->where("user_id", $user->id)->get(['created_at']);
        foreach ($likes as $like) {
            $date = Date::createFromFormat($this->connection->getQueryGrammar()->getDateFormat(), $like->created_at);
            $conditionAccumulation->updateValue($date, 1);
        }
        return $conditionAccumulation->dirty;
    }
}