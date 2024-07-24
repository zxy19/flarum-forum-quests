<?php

namespace Xypp\ForumQuests\Data;

use Flarum\User\User;

/**
 * Used in event.
 */
class ConditionData
{
    public string $name;
    public int $value;
    public function __construct(string $name, int $value)
    {
        $this->name = $name;
        $this->value = $value;
    }
}