<?php

namespace Xypp\ForumQuests\Integration\Listener;

use \Flarum\Post\Event\Posted;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class StoreEventListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(\Xypp\Store\Event\PurchaseDone $event)
    {
        $this->events->dispatch(
            new QuestConditionData(
                $event->user,
                [new ConditionData('store_purchased', 1)]
            )
        );
    }
}