<?php

namespace Xypp\ForumQuests\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\ForumQuests\UserQuest;
use InvalidArgumentException;

class UserQuestSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'user-quests';

    /**
     * {@inheritdoc}
     *
     * @param UserQuest $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof UserQuest)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . UserQuest::class
            );
        }

        return [
            $model->quest_info_id,
            $model->user_id,
            $model->updated_at,
            $model->created_at,
            $model->id,
        ];
    }
}
