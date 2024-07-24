<?php

namespace Xypp\ForumQuests\Enum;

enum ConditionOperator: string
{
    case EQUAL = '='; // 等于
    case NOT_EQUAL = '!='; // 不等于
    case GREATER_THAN = '>'; // 大于
    case LESS_THAN = '<'; // 小于
    case GREATER_THAN_OR_EQUAL = '>='; // 大于等于
    case LESS_THAN_OR_EQUAL = '<='; // 小于等于
}