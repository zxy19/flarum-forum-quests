<?php

namespace Xypp\ForumQuests\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\Helper\RewardHelper;

class QuestSeriviceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton(ConditionHelper::class);
        $this->container->singleton(RewardHelper::class);
    }
}