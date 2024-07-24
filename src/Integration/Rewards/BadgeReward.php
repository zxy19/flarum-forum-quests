<?php

namespace Xypp\ForumQuests\Integration\Rewards;

use Flarum\Notification\NotificationSyncer;
use V17Development\FlarumUserBadges\Badge\Badge;
use V17Development\FlarumUserBadges\Notification\BadgeReceivedBlueprint;
use V17Development\FlarumUserBadges\UserBadge\UserBadge;
use Xypp\ForumQuests\RewardDefinition;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class BadgeReward extends RewardDefinition
{
    private NotificationSyncer $notifications;
    public function __construct(NotificationSyncer $notifications)
    {
        parent::__construct("badge");
        $this->notifications = $notifications;
    }
    public function perform(\Flarum\User\User $user, $value): bool
    {
        if (!Badge::find($value)->exists()) {
            return false;
        }
        $badge = UserBadge::build($user->id, $value);
        $badge->save();

        // Send notification
        $this->notifications->sync(
            new BadgeReceivedBlueprint($badge),
            [$user]
        );
        return true;
    }
}