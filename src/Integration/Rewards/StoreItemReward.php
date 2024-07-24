<?php

namespace Xypp\ForumQuests\Integration\Rewards;

use Xypp\ForumQuests\RewardDefinition;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class StoreItemReward extends RewardDefinition
{
    private StoreHelper $storeHelper;
    public function __construct(StoreHelper $storeHelper)
    {
        parent::__construct("store_item");
        $this->storeHelper = $storeHelper;
    }
    public function perform(\Flarum\User\User $user, $value): bool
    {
        $item = StoreItem::find($value);
        if (!$item) {
            return false;
        }
        try {
            $this->storeHelper->userPurchase($user, $item, function ($actor, StoreItem $item, PurchaseHistory|null $old = null, PurchaseContext $context) {
                $context->noConsume();
                $context->noCostMoney();
            }, true);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
}