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
    public string $flag = "";
    public function __construct(string $name, int $value, string $flag = "")
    {
        $this->name = $name;
        $this->value = $value;
        $this->flag = $flag;
    }
}