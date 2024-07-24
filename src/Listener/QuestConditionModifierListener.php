<?php

namespace Xypp\ForumQuests\Listener;

use Xypp\ForumQuests\Event\QuestConditionData;
use Xypp\ForumQuests\Helper\ConditionHelper;

class QuestConditionModifierListener
{
    private ConditionHelper $conditionHelper;
    public function __construct(ConditionHelper $conditionHelper)
    {
        $this->conditionHelper = $conditionHelper;
    }

    public function __invoke(QuestConditionData $event)
    {
        $this->conditionHelper->updateConditions($event->user, $event->data);
    }
}