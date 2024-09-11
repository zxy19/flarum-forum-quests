<?php

namespace Xypp\ForumQuests;

use Flarum\Database\AbstractModel;
use Xypp\Collector\Condition;

class QuestConditionQuestInfo extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'quest_condition_quest_info';
    public function quest_info()
    {
        return $this->belongsTo(QuestInfo::class, "quest_info_id", "id");
    }
    public function quest_condition()
    {
        return $this->belongsTo(Condition::class, "condition_name", "name");
    }
}
