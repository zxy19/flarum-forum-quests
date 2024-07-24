<?php

namespace Xypp\ForumQuests\Integration\Listener;

use Illuminate\Events\Dispatcher;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class DiscussionViewed
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function __invoke(DiscussionWasViewed $event)
    {
        $user = $event->getDiscussion()->user()->first();
        if (!$user)
            return;
        $this->events->dispatch(
            new QuestConditionData(
                $event->getDiscussion()->user()->first(),
                [new ConditionData('discussion_count', 1)]
            )
        );
    }
}