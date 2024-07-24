<?php

namespace Xypp\ForumQuests;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Xypp\ForumQuests\Data\ConditionAccumulation;

class QuestCondition extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.
    protected $dates = ['updated_at', 'created_at'];
    protected $table = 'quest_condition';
    protected ?ConditionAccumulation $accObj = null;
    public function relatedQuest()
    {
        return $this->hasManyThrough(QuestInfo::class, QuestConditionQuestInfo::class, "condition_name", "id", "name", "quest_info_id");
    }
    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
    public function getAccumulation()
    {
        if ($this->accObj === null) {
            $this->accObj = new ConditionAccumulation($this->accumulation);
        }
        return $this->accObj;
    }
    public function setAccumulation(ConditionAccumulation $accumulation)
    {
        $this->accObj = $accumulation;
    }
    public static function boot()
    {
        parent::boot();
        static::saving(function (QuestCondition $model) {
            if ($model->accObj !== null) {
                $model->accumulation = $model->accObj->serialize();
            }
        });
    }
}
