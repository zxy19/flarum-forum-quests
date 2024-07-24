<?php

namespace Xypp\ForumQuests\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestInfo;
use InvalidArgumentException;

class QuestInfoSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'quest-infos';
    protected ConditionHelper $conditionHelper;
    public function __construct(ConditionHelper $conditionHelper)
    {
        $this->conditionHelper = $conditionHelper;
    }
    /**
     * {@inheritdoc}
     *
     * @param QuestInfo $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof QuestInfo)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . QuestInfo::class
            );
        }
        $updateManual = false;
        $model->eachConditions(function ($name, $operator, $value, $span) use (&$updateManual) {
            if ($this->conditionHelper->getConditionDefinition($name)->needManualUpdate) {
                $updateManual = true;
            }
        });

        return [
            "id" => $model->id,
            "name" => $model->name,
            "description" => $model->description,
            "conditions" => $model->conditions ?? "{}",
            "rewards" => $model->rewards ?? "{}",
            "done" => $model->done,
            "re_available" => $model->re_available,
            "icon" => $model->icon,
            "hidden" => $model->hidden,
            "manual" => $updateManual
        ];
    }
}
