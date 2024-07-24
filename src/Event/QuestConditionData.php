<?php

namespace Xypp\ForumQuests\Event;

use Flarum\User\User;
use Xypp\ForumQuests\Data\ConditionData;

class QuestConditionData
{
    public function __construct(User $user, array|ConditionData $data)
    {
        $this->user = $user;
        $this->data = $data;
    }
    public User $user;
    public array|ConditionData $data;
}