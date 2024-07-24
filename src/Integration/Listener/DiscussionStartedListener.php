<?php

namespace Xypp\ForumQuests\Integration\Listener;

use \Flarum\Discussion\Event\Started;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class DiscussionStartedListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(Started $event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->actor,
                [new ConditionData('discussion_count', 1)]
            )
        );
    }
}