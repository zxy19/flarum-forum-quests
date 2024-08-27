<?php

namespace Xypp\ForumQuests\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Locale\Translator;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Extend\ConditionDefinitionCollection;
use Xypp\ForumQuests\Extend\RewardDefinitionCollection;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\Helper\RewardHelper;
use Illuminate\Contracts\Container\Container;
use Xypp\ForumQuests\Integration\Conditions\BadgeReceived;
use Xypp\ForumQuests\Integration\Conditions\DiscussionCount;
use Xypp\ForumQuests\Integration\Conditions\DiscussionReplied;
use Xypp\ForumQuests\Integration\Conditions\DiscussionViews;
use Xypp\ForumQuests\Integration\Conditions\LikeRecv;
use Xypp\ForumQuests\Integration\Conditions\LikeSend;
use Xypp\ForumQuests\Integration\Conditions\PostCount;
use Xypp\ForumQuests\Integration\Conditions\StoreItemPurchase;
use Xypp\ForumQuests\Integration\Rewards\BadgeReward;
use Xypp\ForumQuests\Integration\Rewards\MoneyReward;
use Xypp\ForumQuests\Integration\Rewards\StoreItemReward;
use Xypp\ForumQuests\RewardDefinition;

class QuestSeriviceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton(ConditionHelper::class);
        $this->container->singleton(RewardHelper::class);
        $this->container->singleton(ConditionDefinitionCollection::class, function (Container $container) {
            $collector = new ConditionDefinitionCollection(
                $container->make(Translator::class)
            );
            // Core features
            $collector->addDefinition(new ConditionDefinition("user_page_view", true, "xypp-forum-quests.ref.integration.condition.user_page_view"));
            $collector->addDefinition(new ConditionDefinition("reloads", null, "xypp-forum-quests.ref.integration.condition.reloads"));
            $collector->addDefinition(new ConditionDefinition("email_changed", null, "xypp-forum-quests.ref.integration.condition.email_changed"));
            $collector->addDefinition(new ConditionDefinition("avatar_changed", null, "xypp-forum-quests.ref.integration.condition.avatar_changed"));

            $collector->addDefinition($container->make(DiscussionCount::class));
            $collector->addDefinition($container->make(PostCount::class));
            $collector->addDefinition($container->make(DiscussionReplied::class));

            // Integrate with michaelbelgium/flarum-discussion-views
            if (class_exists(\Michaelbelgium\Discussionviews\Models\DiscussionView::class))
                $collector->addDefinition($container->make(DiscussionViews::class));

            // Integrate with flarum-likes
            if (class_exists(\Flarum\Likes\Event\PostWasLiked::class)) {
                $collector->addDefinition($container->make(LikeRecv::class));
                $collector->addDefinition($container->make(LikeSend::class));
            }

            // Integrate with xypp-store
            if (class_exists(\Xypp\Store\StoreItem::class))
                $collector->addDefinition($container->make(StoreItemPurchase::class));

            // v17development/flarum-user-badges
            if (class_exists(\V17Development\FlarumUserBadges\Badge\Badge::class))
                $collector->addDefinition($container->make(BadgeReceived::class));

            return $collector;
        });
        $this->container->singleton(RewardDefinitionCollection::class, function (Container $container) {
            $collector = new RewardDefinitionCollection(
                $container->make(Translator::class)
            );
            // Integrate with AntoineFr/money
            if (class_exists(\AntoineFr\Money\Event\MoneyUpdated::class))
                $collector->addDefinition($container->make(MoneyReward::class));

            // Integrate with v17development/flarum-user-badges
            if (class_exists(\V17Development\FlarumUserBadges\Badge\Badge::class))
                $collector->addDefinition($container->make(BadgeReward::class));

            // Integrate with xypp-store
            if (class_exists(\Xypp\Store\StoreItem::class))
                $collector->addDefinition($container->make(StoreItemReward::class));

            return $collector;
        });
    }
}