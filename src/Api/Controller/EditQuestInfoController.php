<?php

namespace Xypp\ForumQuests\Api\Controller;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\Collector\Helper\ConditionHelper;
use Xypp\ForumQuests\QuestInfo;
use Xypp\Store\StoreItem;
use Xypp\Store\Helper\ProviderHelper;


class EditQuestInfoController extends AbstractCreateController
{
    public $serializer = QuestInfoSerializer::class;
    protected Translator $translator;
    protected $conditionHelper;
    public function __construct(Translator $translator, ConditionHelper $conditionHelper)
    {
        $this->translator = $translator;
        $this->conditionHelper = $conditionHelper;
    }

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan("addQuestInfo");

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);
        if (Arr::get($request->getQueryParams(), 'id')) {
            $model = QuestInfo::findOrFail(Arr::get($request->getQueryParams(), 'id'));
        } else {
            $model = new QuestInfo();
        }
        $model->name = Arr::get($attributes, 'name');
        $model->description = Arr::get($attributes, 'description');
        $model->conditions = Arr::get($attributes, 'conditions');
        $conditions = json_decode(Arr::get($attributes, 'conditions'));
        $hidden = Arr::get($attributes, 'hidden');
        foreach ($conditions as $condition) {
            $conditionDefinition = $this->conditionHelper->getConditionDefinition($condition->name);
            if ($conditionDefinition->needManualUpdate && $hidden) {
                throw new ValidationException([
                    "msg" => $this->translator->trans("xypp.forum-quests.api.manual_condition_cannot_hidden", [
                        "condition" => $conditionDefinition->name
                    ])
                ]);
            }
        }
        $model->rewards = Arr::get($attributes, 'rewards');
        $model->re_available = Arr::get($attributes, 're_available');
        if ($model->re_available === "") {
            $model->re_available = null;
        }
        $model->icon = Arr::get($attributes, 'icon');
        $model->hidden = $hidden;
        $model->save();
        return $model;
    }
}