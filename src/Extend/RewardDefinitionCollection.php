<?php

namespace Xypp\ForumQuests\Extend;

use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Xypp\ForumQuests\RewardDefinition;

class RewardDefinitionCollection
{
    public Translator $translator;
    public static array $rewardDefinitions = [];
    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }
    public function addDefinition(RewardDefinition $rewardDefinition)
    {
        self::$rewardDefinitions[$rewardDefinition->name] = $rewardDefinition;
    }
    public function getRewardDefinition(string $name): RewardDefinition
    {
        if (!isset(self::$rewardDefinitions[$name])) {
            throw new ValidationException([
                "error" => $this->translator->trans("xypp.forum_quests.reward_not_found", ["reward" => $name])
            ]);
        }
        return self::$rewardDefinitions[$name];
    }
    public function getAllRewardNames(): array
    {
        return array_keys(self::$rewardDefinitions);
    }
}