<?php

namespace Xypp\ForumQuests\Console;

use Carbon\Carbon;
use Flarum\User\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Throwable;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\Helper\CarbonZoneHelper;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\QuestConditionQuestInfo;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ReAvailableUtils;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\ProviderHelper;

class Debug extends Command
{
    /**
     * @var string
     */
    protected $signature = 'forum-quests:debug';

    /**
     * @var string
     */
    protected $description = 'Check user condition.';

    protected ConditionHelper $conditionHelper;
    public CarbonZoneHelper $cz;

    public function __construct(CarbonZoneHelper $carbonZoneHelper, ConditionHelper $conditionHelper)
    {
        parent::__construct();
        $this->conditionHelper = $conditionHelper;
        $this->cz = $carbonZoneHelper;
        $this->addArgument("id", InputArgument::REQUIRED, "UserId");
    }
    public function handle()
    {
        $user = User::find($this->argument("id"));
        $this->info("User: " . $user->username);
        $now = $this->cz->now();
        $this->info("Now Time: " . $now);
        QuestCondition::where("user_id", $user->id)->get()->each(function ($condition) use ($user) {
            $conditionName = $condition->name;
            $this->info("Condition: " . $conditionName);
            $this->info("\t- Value: " . $condition->value);
            $now = $this->cz->now();

            /**
             * @var ConditionAccumulation $accumulation
             */
            $accumulation = $condition->getAccumulation();
            $this->info("Accumulation(Today): " . $accumulation->getSpan($now, 1));
            $this->info("Accumulation(5 days): " . $accumulation->getSpan($now, 5));
            $this->info("Accumulation(Total): " . $accumulation->total);
        });
        $this->info("Achievement check");
        QuestInfo::all()->each(function (QuestInfo $questInfo) use ($user) {
            $this->info("Quest: " . $questInfo->name);
            $conditions = $questInfo->getUserConditions($user)->get();
            $isOk = true;
            $questInfo->eachConditions(
                function ($name, $operator, $value, $span) use ($conditions, &$isOk) {
                    if (!$isOk)
                        return;
                    /**  @var QuestCondition */
                    $condition = $conditions->firstWhere('name', $name);
                    if (!$condition) {
                        $this->warn("\t- Condition: $name not found");
                        $isOk = false;
                        return;
                    }
                    $isOk = $isOk && $this->conditionHelper->checkCondition($name, $operator, $value, $span, $condition);
                    if (!$isOk) {
                        $this->warn("\t- Condition: $name not satisfied");
                        $this->warn("\t\t- Current value: " . $this->getValue($span, $condition));
                        $this->warn("\t\t- Target value: " . $condition->value);
                        $this->warn("\t\t- Target Span: " . $span);

                    }
                }
            );
            if ($isOk) {
                $this->info("\t- Achievement: OK");
            } else {
                $this->warn("\t- Achievement: NO");
            }
        });
    }

    protected function getValue(int $span, QuestCondition $condition): ?int
    {
        $currentTime = $this->cz->now();
        if ($span)
            $currentValue = $condition->getAccumulation()->getSpan($currentTime, $span);
        else
            $currentValue = $condition->getAccumulation()->total;
        return $currentValue;
    }
}