<?php

namespace Xypp\ForumQuests;

use Flarum\Database\AbstractModel;
use Flarum\User\User;
use Serializable;
use Xypp\Collector\Condition;

class QuestInfo extends AbstractModel
{
    protected $table = 'quest_info';
    protected $dates = ['updated_at', 'created_at', 'refresh_at'];
    public ?array $parsed_conditions = null;
    public ?array $parsed_rewards = null;
    public bool $done = false;

    protected function loadObjs()
    {
        if ($this->parsed_rewards === null) {
            $this->parsed_rewards = json_decode($this->rewards);
        }
        if ($this->parsed_conditions === null) {
            $this->parsed_conditions = json_decode($this->conditions);
        }
    }
    public function getConditions(): array
    {
        $this->loadObjs();
        return $this->parsed_conditions;
    }
    public function getRewards(): array
    {
        $this->loadObjs();
        return $this->parsed_rewards;
    }
    public function eachRewards(callable $callback)
    {
        $this->loadObjs();
        $rewards = $this->parsed_rewards;
        foreach ($rewards as $reward) {
            $callback($reward->name, $reward->value);
        }
    }
    public function addReward(string $name, string $value, string $alterName = null)
    {
        $this->loadObjs();
        $this->parsed_rewards[] = (object) [
            'name' => $name,
            'value' => $value,
            'alter_name' => $alterName,
        ];
    }
    public function setRewards(array $rewards)
    {
        $this->parsed_rewards = $rewards;
    }


    public function eachConditions(callable $callback)
    {
        $this->loadObjs();
        $conditions = $this->parsed_conditions;
        foreach ($conditions as $condition) {
            $span = null;
            if (isset($condition->span) && $condition->span) {
                $span = $condition->span;
            }
            $callback(
                $condition->name,
                $condition->operator,
                $condition->value,
                $span,
                isset($condition->calculate) ? $condition->calculate : 1,
            );
        }
    }
    public function addCondition(string $name, $operator, string $value, int $span = null, string $alterName = null)
    {
        $this->loadObjs();
        $this->parsed_conditions[] = (object) [
            'name' => $name,
            'operator' => $operator,
            'value' => $value,
            'span' => $span,
            'alter_name' => $alterName,
        ];
    }
    public function setConditions(array $conditions)
    {
        $this->parsed_conditions = $conditions;
    }

    /**
     * Conditions relation in Database
     * Return a Hasmany relation to QuestConditionQuestInfo
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function recordConditions()
    {
        return $this->hasMany(QuestConditionQuestInfo::class, "quest_info_id", "id");
    }
    /**
     * Get User Conditions relation in Database
     * @param \Flarum\User\User $user
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function getUserConditions(User $user)
    {
        return $this->hasManyThrough(Condition::class, QuestConditionQuestInfo::class, "quest_info_id", "name", "id", "condition_name")->where("user_id", $user->id);
    }

    public function getUserQuests(User $user)
    {
        return $this->hasMany(UserQuest::class, "quest_info_id", "id")->where("user_id", $user->id);
    }

    public static function boot()
    {
        parent::boot();
        static::saving(function (QuestInfo $model) {
            $model->afterSave(function () use ($model) {
                $model->loadObjs();
                $model->conditions = json_encode($model->parsed_conditions);
                $model->rewards = json_encode($model->parsed_rewards);
                $hasStored = $model->recordConditions()->get();
                $conditionNames = [];
                $model->eachConditions(function ($name, $operator, $value, $span) use ($hasStored, $model, &$conditionNames) {
                    $conditionNames[] = $name;
                    if (!($hasStored->firstWhere("condition_name", $name))) {
                        $relateModel = new QuestConditionQuestInfo();
                        $relateModel->condition_name = $name;
                        $relateModel->quest_info_id = $model->id;
                        $model->recordConditions()->save($relateModel);
                    }
                });
                $model->recordConditions()->whereNotIn("condition_name", $conditionNames)->delete();
            });
        });
    }
}
