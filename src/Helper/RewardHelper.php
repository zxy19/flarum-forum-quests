<?php

namespace Xypp\ForumQuests\Helper;

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\User;
use Xypp\ForumQuests\Extend\QuestRewardCollection;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\RewardDefinition;

class RewardHelper
{
    public QuestRewardCollection $collection;
    public function __construct(QuestRewardCollection $collection)
    {
        $this->collection = $collection;
    }
    public function getRewardDefinition(string $name): RewardDefinition
    {
        return $this->collection->getRewardDefinition($name);
    }
    public function getAllRewardNames(): array
    {
        return $this->collection->getAllRewardNames();
    }

    public function reward(User $user, QuestInfo $questInfo)
    {
        $questInfo->eachRewards(function ($name, $value) use ($user) {
            $this->getRewardDefinition($name)->perform($user, $value);
        });
    }
}