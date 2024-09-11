<?php

namespace Xypp\ForumQuests\Listener;

use Xypp\Collector\Event\ConditionChange;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\ForumQuests\Helper\QuestHelper;
use Xypp\ForumQuests\QuestInfo;

class QuestConditionModifierListener
{
    private ConditionHelper $conditionHelper;
    private QuestHelper $questHelper;
    public function __construct(ConditionHelper $conditionHelper, QuestHelper $questHelper)
    {
        $this->conditionHelper = $conditionHelper;
        $this->questHelper = $questHelper;
    }

    public function __invoke(ConditionChange $event)
    {
        $quests = $event->condition->relatedQuest()->get();
        $quests->each(function (QuestInfo $quest) use ($event) {
            $this->questHelper->updateAchieve($event->user, $quest, $event->condition);
        });
    }
}