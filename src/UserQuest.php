<?php

namespace Xypp\ForumQuests;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;

class UserQuest extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.
    protected $dates = ['updated_at', 'created_at', "refresh_at"];
    protected $table = 'user_quest';
    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
    public function quest()
    {
        return $this->belongsTo(QuestInfo::class, "quest_info_id", "id");
    }
}
