<?php

namespace Xypp\ForumQuests\Integration;

use Flarum\Extend;
use Flarum\Extend\ApiController;
use Flarum\Extend\Frontend;
use Flarum\Extension\ExtensionManager;
use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Saving;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Xypp\ForumQuests\Extend\ConditionDefinitionProvider;
use Xypp\ForumQuests\Extend\QuestRewardProvider;
use Xypp\ForumQuests\Integration\Conditions\BadgeReceived;
use Xypp\ForumQuests\Integration\Conditions\DiscussionCount;
use Xypp\ForumQuests\Integration\Conditions\DiscussionReplied;
use Xypp\ForumQuests\Integration\Conditions\DiscussionViews;
use Xypp\ForumQuests\Integration\Conditions\LikeRecv;
use Xypp\ForumQuests\Integration\Conditions\LikeSend;
use Xypp\ForumQuests\Integration\Conditions\PostCount;
use Xypp\ForumQuests\Integration\Conditions\StoreItemPurchase;
use Xypp\ForumQuests\Integration\Listener\DiscussionViewed;
use Xypp\ForumQuests\Integration\Listener\ForumContent;
use Xypp\ForumQuests\Integration\Listener\LikeEventsListener;
use Xypp\ForumQuests\Integration\Listener\PostPostedListener;
use Xypp\ForumQuests\Integration\Listener\StoreEventListener;
use Xypp\ForumQuests\Integration\Middleware\ApiVisitCheck;
use Xypp\ForumQuests\Integration\Rewards\BadgeReward;
use Xypp\ForumQuests\Integration\Rewards\MoneyReward;
use Xypp\ForumQuests\Integration\Rewards\StoreItemReward;
use Xypp\ForumQuests\RewardDefinition;
use Xypp\Store\Api\Controller\storeItems\AddStoreItemController;

class Integrations
{
    public function __invoke()
    {
        $ret = [
            (new Extend\Event)
                ->listen(Posted::class, PostPostedListener::class),
            (new QuestRewardProvider())
                ->provide(MoneyReward::class),
            (new ConditionDefinitionProvider())
                ->provide(PostCount::class)
                ->provide(DiscussionReplied::class)
                ->provide(DiscussionCount::class)
                ->simpleFrontend("user_page_view")
                ->simple("reloads"),
            (new Extend\Middleware("forum"))
                ->add(ApiVisitCheck::class)
        ];

        if (class_exists(\Flarum\Likes\Event\PostWasLiked::class)) {
            $ret[] = (new ConditionDefinitionProvider())
                ->provide(LikeSend::class)
                ->provide(LikeRecv::class);
            $ret[] = (new Extend\Event())
                ->subscribe(LikeEventsListener::class);
        }

        if (class_exists(\Xypp\Store\AbstractStoreProvider::class)) {
            $ret[] = (new ConditionDefinitionProvider())
                ->provide(StoreItemPurchase::class);
            $ret[] = (new QuestRewardProvider())
                ->provide(StoreItemReward::class);
            $ret[] = (new Extend\Event())
                ->listen(\Xypp\Store\Event\PurchaseDone::class, StoreEventListener::class);
        }

        if (class_exists(DiscussionWasViewed::class)) {
            $ret[] = (new ConditionDefinitionProvider())
                ->provide(DiscussionViews::class);
            $ret[] = (new Extend\Event())
                ->listen(DiscussionWasViewed::class, DiscussionViewed::class);
        }

        if (class_exists(\V17Development\FlarumUserBadges\Badge\Badge::class)) {
            $ret[] = (new ConditionDefinitionProvider())
                ->provide(BadgeReceived::class);
            $ret[] = (new QuestRewardProvider())
                ->provide(BadgeReward::class);
        }
        return $ret;
    }
}