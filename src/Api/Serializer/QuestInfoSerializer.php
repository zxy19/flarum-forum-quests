<?php

namespace Xypp\ForumQuests\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\ForumQuests\QuestInfo;
use InvalidArgumentException;

class QuestInfoSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'quest-infos';

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

        return [
            "id" => $model->id,
            "name" => $model->name,
            "description" => $model->description,
            "conditions" => $model->conditions ?? "{}",
            "rewards" => $model->rewards ?? "{}",
            "created_at" => $model->created_at,
            "updated_at" => $model->updated_at,
            "done" => $model->done,
            "re_available" => $model->re_available,
            "icon" => $model->icon
        ];
    }
}
