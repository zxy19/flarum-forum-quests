<?php

namespace Xypp\ForumQuests\Console;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Throwable;
use Xypp\ForumQuests\UserQuest;
use Xypp\ForumQuests\Utils\ReAvailableUtils;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\ProviderHelper;

class UpdateRefreshCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'forum-quests:refresh';

    /**
     * @var string
     */
    protected $description = 'Update refresh data for user after editing quests.';
    public function handle()
    {
        $this->setProcessTitle("Re-calc Refresh time.");
        $this->withProgressBar(UserQuest::all(), function (UserQuest $userQuest) {
            $quest = $userQuest->quest()->first();
            $time = ReAvailableUtils::getExpireTime($quest->re_available, $userQuest->updated_at);
            if ($userQuest->refresh_at != $time) {
                $userQuest->refresh_at = $time;
                $userQuest->save();
            }
        });
        $this->info("Done");
    }
}