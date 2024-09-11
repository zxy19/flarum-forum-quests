<?php

/*
 * This file is part of xypp/forum-quests.
 *
 * Copyright (c) 2024 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Xypp\ForumQuests;

use Flarum\Extend;
use Xypp\Collector\Condition;
use Xypp\Collector\Event\ConditionChange;
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\ForumQuests\Listener\QuestConditionModifierListener;
use Xypp\ForumQuests\Notification\QuestDoneNotification;
use Xypp\ForumQuests\Console\UpdateRefreshCommand;
use Xypp\ForumQuests\Router\QuestPageRoute;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/quest_page', 'quest.index', QuestPageRoute::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Event())
        ->listen(ConditionChange::class, QuestConditionModifierListener::class),
    (new Extend\Routes('api'))
        ->get('/quest-infos', 'quest-infos.index', Api\Controller\ListQuestInfosController::class)
        ->get('/quest-infos-admin', 'quest-infos.admin', Api\Controller\ListAdminQuestInfosController::class)
        ->get('/quest-infos/{id}', 'quest-infos.show', Api\Controller\ShowQuestInfoController::class)
        ->get('/quest-infos/{id}/update', 'quest-infos.manual-update', Api\Controller\ManualUpdateCondition::class)
        ->post('/quest-infos', 'quest-infos.create', Api\Controller\EditQuestInfoController::class)
        ->patch('/quest-infos/{id}', 'quest-infos.edit', Api\Controller\EditQuestInfoController::class)
        ->delete('/quest-infos/{id}', 'quest-infos.delete', Api\Controller\RemoveQuestInfoController::class),
    (new Extend\Model(Condition::class))
        ->relationship("relatedQuest", function ($model) {
            return $model->hasManyThrough(QuestInfo::class, QuestConditionQuestInfo::class, "condition_name", "id", "name", "quest_info_id");
        }),
    (new Extend\Notification())
        ->type(QuestDoneNotification::class, QuestInfoSerializer::class, ['alert']),
    (new Extend\Console())
        ->command(UpdateRefreshCommand::class),
    (new Extend\Settings())
        ->default('xypp.forum-quests.allow_update', true)
];