<?php

namespace Xypp\ForumQuests\Event;

use Flarum\User\User;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\QuestCondition;

/**
 * Trigger when condition changed after write to database.
 */
class QuestConditionChange
{
    public QuestCondition $condition;
    public User $user;
    public ConditionData $data;
    public function __construct(User $user, ConditionData $data, QuestCondition $condition)
    {
        $this->user = $user;
        $this->data = $data;
        $this->condition = $condition;
    }
}