<?php

namespace Xypp\ForumQuests\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\UserQuest;
use InvalidArgumentException;

class QuestConditionSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'quest-condition';

    /**
     * {@inheritdoc}
     *
     * @param UserQuest $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof QuestCondition)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . QuestCondition::class
            );
        }

        $accumulation = $model->accumulation;
        if ($accumulation === null) {
            $accumulation = "{}";
        }
        return [
            "name" => $model->name,
            "value" => $model->value,
            "accumulation" => $accumulation
        ];
    }
}
