<?php

namespace Xypp\ForumQuests\Integration\Listener;

use AntoineFr\Money\Event\MoneyUpdated;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;
class MoneyChangeListener
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(MoneyUpdated $event)
    {
        $user = $event->user;
        $this->events->dispatch(
            new QuestConditionData(
                $user,
                [new ConditionData('money', intval($user->money), "", true)]
            )
        );
    }
}