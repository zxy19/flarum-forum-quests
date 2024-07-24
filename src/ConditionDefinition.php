<?php

namespace Xypp\ForumQuests;

use Flarum\User\User;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\Enum\ConditionOperator;

class ConditionDefinition
{
    /**
     * Name of this condition
     * @var string
     */
    public string $name;
    /**
     * Weather this condition can be triggered from frontend
     * @var bool
     */
    public bool $allowFrontendTrigger = false;

    /**
     * Can accumulate when get absolute value;
     * @var bool
     */
    public bool $accumulateAbsolute = true;

    /**
     * Can accumulate value
     * @var bool
     */
    public bool $accumulate = true;

    public function __construct(?string $name = null)
    {
        if ($name)
            $this->name = $name;
    }

    public function compare(int $value, ConditionOperator $operator, int $compareValue): bool
    {
        switch ($operator) {
            case ConditionOperator::EQUAL:
                return $value == $compareValue;
            case ConditionOperator::NOT_EQUAL:
                return $value != $compareValue;
            case ConditionOperator::GREATER_THAN:
                return $value > $compareValue;
            case ConditionOperator::LESS_THAN:
                return $value < $compareValue;
            case ConditionOperator::GREATER_THAN_OR_EQUAL:
                return $value >= $compareValue;
            case ConditionOperator::LESS_THAN_OR_EQUAL:
                return $value <= $compareValue;
            default:
                return false;
        }
    }
    public function getAbsoluteValue(User $user, ConditionAccumulation $accumulation): bool
    {
        return false;
    }
}