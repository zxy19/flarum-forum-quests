<?php

namespace Xypp\ForumQuests\Console;

use Carbon\Carbon;
use Flarum\User\User;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Throwable;
use Xypp\ForumQuests\Data\ConditionAccumulation;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\QuestConditionQuestInfo;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ReAvailableUtils;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\ProviderHelper;

class UpdateCondition extends Command
{
    /**
     * @var string
     */
    protected $signature = 'forum-quests:update';

    /**
     * @var string
     */
    protected $description = 'Update condition absolutely.';

    protected ConditionHelper $conditionHelper;
    public function __construct(ConditionHelper $conditionHelper)
    {
        parent::__construct();
        $this->conditionHelper = $conditionHelper;
        $this->addArgument("names", InputArgument::OPTIONAL | InputArgument::IS_ARRAY, "Condition names to update");
        $this->addOption("overwrite", "o", InputArgument::OPTIONAL, "Overwrite item that cannot get absolute accumulation data");
        $this->addOption("skip", "s", InputArgument::OPTIONAL, "Skip item that cannot get absolute accumulation data");
        $this->addOption("no-update-achieve", "a", InputArgument::OPTIONAL, "Not update achievement");
    }
    public function handle()
    {
        $names = $this->argument("names");
        if ($names && !is_array($names)) {
            $names = [$names];
        }
        $users = User::all();
        $this->info("Updating all conditions for " . $users->count() . " users.");

        $questInfoIds = [];

        foreach ($this->conditionHelper->getAllConditionName() as $conditionDefinitionName) {
            if ($names && !in_array($conditionDefinitionName, $names))
                continue;
            $conditionDefinition = $this->conditionHelper->getConditionDefinition($conditionDefinitionName);
            if (!$conditionDefinition->accumulateAbsolute) {
                if (!$this->option("overwrite")) {
                    if ($this->option("skip")) {
                        $this->info("Skipped");
                        continue;
                    }
                    $q = "Condition $conditionDefinitionName is not accumulateAbsolute able," .
                        "continue with losing all accumulate data(which used to calc value in span)." .
                        " do you want to do it? (y/n)";
                    $ans = $this->askWithCompletion($q, ["y", "n"], "n");
                    if ($ans != "y") {
                        $this->info("Skipped");
                        continue;
                    }
                }
            }

            $updated = false;
            $this->info("Updating $conditionDefinitionName");
            $this->withProgressBar(
                $users,
                function (User $user) use ($conditionDefinitionName, $conditionDefinition, &$updated) {
                    $accumulation = new ConditionAccumulation("[]");
                    $result = $conditionDefinition->getAbsoluteValue($user, $accumulation);
                    if (!$result)
                        return;
                    $condition = QuestCondition::where("name", $conditionDefinitionName)->where("user_id", $user->id)->first();
                    if (!$condition) {
                        $condition = new QuestCondition();
                        $condition->name = $conditionDefinitionName;
                        $condition->user_id = $user->id;
                    }
                    $condition->setAccumulation($accumulation);
                    $condition->value = $accumulation->total;
                    $condition->updateTimestamps();
                    $condition->save();
                    $updated = true;
                }
            );
            if ($updated) {
                QuestConditionQuestInfo::where("condition_name", $conditionDefinitionName)->get()
                    ->each(function (QuestConditionQuestInfo $questConditionQuestInfo) use (&$questInfoIds) {
                        $questInfoIds[$questConditionQuestInfo->quest_info_id] = true;
                    });
            }
            $this->info("Done");
        }
        $this->info("All Done");
        if ($this->option("no-update-achieve"))
            return;
        $this->info("Updating Achievement");
        $this->withProgressBar(
            $users,
            function (User $user) use (&$questInfoIds) {
                foreach ($questInfoIds as $questInfoId => $__) {
                    $questInfo = QuestInfo::find($questInfoId);
                    $this->conditionHelper->updateAchieve($user, $questInfo);
                }
            }
        );
        $this->info("All Done");
    }
}