<?php

namespace Xypp\ForumQuests\Integration\Listener;

use \Flarum\Post\Event\Posted;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class PostPostedListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(Posted $event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->actor,
                [new ConditionData('post_count', 1)]
            )
        );
    }
}