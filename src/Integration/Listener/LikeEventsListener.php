<?php

namespace Xypp\ForumQuests\Integration\Listener;

use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class LikeEventsListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function subscribe($events)
    {
        $events->listen(\Flarum\Likes\Event\PostWasLiked::class, [$this, 'liked']);
        $events->listen(\Flarum\Likes\Event\PostWasUnliked::class, [$this, 'unliked']);
    }

    public function liked($event)
    {
        if (!$event->user)
            return;
        $this->events->dispatch(
            new QuestConditionData(
                $event->user,
                [new ConditionData('like_send', 1)]
            )
        );
        $this->events->dispatch(
            new QuestConditionData(
                $event->post->user()->first(),
                [new ConditionData('like_recv', 1)]
            )
        );
    }

    public function unliked($event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->user,
                [new ConditionData('like_send', -1)]
            )
        );
        $this->events->dispatch(
            new QuestConditionData(
                $event->post->user()->first(),
                [new ConditionData('like_recv', -1)]
            )
        );
    }
}