<?php

namespace Xypp\ForumQuests\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Xypp\ForumQuests\Api\Serializer\QuestConditionSerializer;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestInfo;
use Tobscure\JsonApi\Document;

class ManualUpdateCondition extends AbstractListController
{
    public $serializer = QuestConditionSerializer::class;
    protected ConditionHelper $helper;
    protected Translator $translator;
    public function __construct(ConditionHelper $helper, Translator $translator)
    {
        $this->helper = $helper;
    }
    public function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $id = Arr::get($request->getQueryParams(), 'id');
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
        $conditions = $this->helper->updateConditionFromDatabase($actor, $quest_info);
        return $conditions;
    }
}