<?php

namespace Xypp\ForumQuests\Integration\Rewards;

use Xypp\ForumQuests\RewardDefinition;

class MoneyReward extends RewardDefinition
{
    public function __construct()
    {
        parent::__construct("money");
    }
    public function perform(\Flarum\User\User $user, $value):bool
    {
        $user->lockForUpdate()->find($user->id)->increment("money", $value);
        return true;
    }
}