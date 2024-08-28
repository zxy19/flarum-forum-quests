<?php

namespace Xypp\ForumQuests\Event;

use Flarum\User\User;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;

/**
 * Trigger when a quest is done before reward.
 */
class QuestDone
{
    public User $user;
    public QuestInfo $quest;
    public UserQuest $userQuest;
    public function __construct(User $user, QuestInfo $quest,UserQuest $userQuest)
    {
        $this->user = $user;
        $this->quest = $quest;
        $this->userQuest = $userQuest;
    }
}