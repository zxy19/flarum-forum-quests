<?php

namespace Xypp\ForumQuests\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;
use Xypp\ForumQuests\QuestInfo;

class QuestDoneNotification implements BlueprintInterface
{
    public $user;
    public $quest;
    public $data;

    public function __construct(QuestInfo $quest, User $user)
    {
        $this->quest = $quest;
        $this->user = $user;
        $this->data = [
            "achieve" => time()
        ];
    }

    public function getSubject()
    {
        return $this->quest;
    }

    public function getFromUser()
    {
        return $this->user;
    }

    public function getData()
    {
        return $this->data;
    }

    public static function getType()
    {
        return 'quest_done';
    }

    public static function getSubjectModel()
    {
        return QuestInfo::class;
    }
}