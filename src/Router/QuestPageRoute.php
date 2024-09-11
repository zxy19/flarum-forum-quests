<?php

namespace Xypp\ForumQuests\Router;
use Flarum\Locale\Translator;
use Flarum\Frontend\Document;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\Collector\Helper\RewardHelper;

class QuestPageRoute
{
    protected ConditionHelper $conditionHelper;
    protected RewardHelper $rewardHelper;
    protected Translator $translator;
    public function __construct(ConditionHelper $conditionHelper, RewardHelper $rewardHelper, Translator $translator)
    {
        $this->conditionHelper = $conditionHelper;
        $this->rewardHelper = $rewardHelper;
        $this->translator = $translator;
    }
    public function __invoke(Document $document)
    {
        $document->payload["quest-definition"] = [
            "conditions" => array_map(
                function ($conditionName) use (&$ret) {
                    return [
                        "key" => $conditionName,
                        "trans" => $this->translator->trans($this->conditionHelper->getConditionDefinition($conditionName)->translateKey)
                    ];
                },
                $this->conditionHelper->getAllConditionName()
            ),
            "rewards" => array_map(
                function ($rewardName) use (&$ret) {
                    return [
                        "key" => $rewardName,
                        "trans" => $this->translator->trans($this->rewardHelper->getRewardDefinition($rewardName)->translateKey)
                    ];
                },
                $this->rewardHelper->getAllRewardNames()
            )
        ];
        return $document;
    }
}