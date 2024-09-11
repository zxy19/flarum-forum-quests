<?php

namespace Xypp\ForumQuests\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Xypp\ForumQuests\Api\Serializer\QuestConditionSerializer;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestInfo;
use Tobscure\JsonApi\Document;

class ManualUpdateCondition extends AbstractListController
{
    public $serializer = QuestConditionSerializer::class;
    protected ConditionHelper $helper;
    protected Translator $translator;
    protected SettingsRepositoryInterface $settings;
    public function __construct(ConditionHelper $helper, Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->helper = $helper;
        $this->translator = $translator;
        $this->settings = $settings;
    }
    public function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $id = Arr::get($request->getQueryParams(), 'id');
        if ($this->settings->get('xypp.forum-quests.allow_update')) {
            throw new ValidationException(["msg" => $this->translator->trans("xypp-forum-quests.api.no_manual_update")]);
        }
        $quest_info = QuestInfo::findOrFail($id);
        $updateManual = false;
        $quest_info->eachConditions(function ($name, $operator, $value, $span) use (&$updateManual) {
            if ($this->helper->getConditionDefinition($name)->needManualUpdate) {
                $updateManual = true;
            }
        });
        if (!$updateManual) {
            return new ValidationException(["msg" => $this->translator->trans("xypp-forum-quests.api.no_manual_update")]);
        }

        $quest_info->eachConditions(function ($name, $operator, $value, $span) use ($quest_info, $actor) {
            $this->helper->updateUserCondition($actor, $name);
        });

        return $quest_info->getConditions();
    }
}