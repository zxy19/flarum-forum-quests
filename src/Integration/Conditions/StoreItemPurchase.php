<?php

namespace Xypp\ForumQuests\Integration\Conditions;

use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\RewardDefinition;

class StoreItemPurchase extends ConditionDefinition
{
    public bool $accumulateAbsolute = false;
    public function __construct()
    {
        parent::__construct("store_purchased",null,"xypp-forum-quests.ref.integration.condition.store_purchased");

    }
    public function getAbsoluteValue(\Flarum\User\User $user, ConditionAccumulation $conditionAccumulation): bool
    {
        $count = \Xypp\Store\PurchaseHistory::where("user_id", $user->id)->count();

        $conditionAccumulation->rest = $count;
        $conditionAccumulation->total = $count;
        $conditionAccumulation->dirty = true;
        return true;
    }
}