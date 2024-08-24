<?php

namespace Xypp\ForumQuests\Integration\Listener;

use Flarum\User\Event\AvatarChanged;
use Flarum\User\Event\EmailChanged;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class UserEventsListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function subscribe($events)
    {
        $events->listen(EmailChanged::class, [$this, 'emailChange']);
        $events->listen(AvatarChanged::class, [$this, 'avatarChange']);
    }
    public function avatarChange(AvatarChanged $event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->user,
                [new ConditionData('avatar_changed', 1)]
            )
        );
    }
    public function emailChange(EmailChanged $event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->user,
                [new ConditionData('email_changed', 1)]
            )
        );
    }

}