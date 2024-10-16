<?php

namespace Xypp\ForumQuests\Console;

use Carbon\Carbon;
use Flarum\User\User;
use Illuminate\Console\Command;
use Throwable;
use Xypp\ForumQuests\Helper\QuestHelper;
use Xypp\ForumQuests\QuestInfo;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ReAvailableUtils;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\ProviderHelper;

class UpdateAchieveCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'forum-quests:update';

    /**
     * @var string
     */
    protected $description = 'Update achievement data for user after editing quests.';
    protected QuestHelper $questHelper;
    public function __construct(QuestHelper $questHelper)
    {
        parent::__construct();
        $this->questHelper = $questHelper;
    }
    public function handle()
    {
        $this->setProcessTitle("Re-calc Achievement.");
        $users = User::all();
        foreach (QuestInfo::all() as $quest) {
            $this->info("Updating {$quest->name}");
            $this->withProgressBar($users, function (User $user) use ($quest) {
                $this->questHelper->updateAchieve($user, $quest);
            });
            $this->info("Done");
        }
    }
}