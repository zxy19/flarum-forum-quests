<?php

namespace Xypp\ForumQuests\Integration\Rewards;

use AntoineFr\Money\Event\MoneyUpdated;
use Xypp\ForumQuests\RewardDefinition;
use Illuminate\Events\Dispatcher;

class MoneyReward extends RewardDefinition
{
    private Dispatcher $dispatcher;
    public function __construct(Dispatcher $dispatcher)
    {
        parent::__construct("money");
        $this->dispatcher = $dispatcher;
    }
    public function perform(\Flarum\User\User $user, $value): bool
    {
        $user->lockForUpdate()->find($user->id)->increment("money", $value);
        $this->dispatcher->dispatch(new MoneyUpdated($user));
        return true;
    }
}