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
            $collector->addDefinition(new ConditionDefinition("user_page_view", true));
            $collector->addDefinition(new ConditionDefinition("reloads"));

            $collector->addDefinition($container->make(DiscussionCount::class));
            $collector->addDefinition($container->make(PostCount::class));
            $collector->addDefinition($container->make(DiscussionReplied::class));

            $collector->addDefinition($container->make(DiscussionViews::class));

            $collector->addDefinition($container->make(LikeRecv::class));
            $collector->addDefinition($container->make(LikeSend::class));

            $collector->addDefinition($container->make(StoreItemPurchase::class));

            $collector->addDefinition($container->make(BadgeReceived::class));
            return $collector;
        });
        $this->container->singleton(RewardDefinitionCollection::class, function (Container $container) {
            $collector = new RewardDefinitionCollection(
                $container->make(Translator::class)
            );
            $collector->addDefinition($container->make(MoneyReward::class));
            $collector->addDefinition($container->make(BadgeReward::class));
            $collector->addDefinition($container->make(StoreItemReward::class));
            return $collector;
        });
    }
}