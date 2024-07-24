<?php

namespace Xypp\ForumQuests\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\ForumQuests\QuestInfo;

class ShowQuestInfoController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = QuestInfoSerializer::class;

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // See https://docs.flarum.org/extend/api.html#api-endpoints for more information.

        $actor = RequestUtil::getActor($request);
        $modelId = Arr::get($request->getQueryParams(), 'id');
        $model = QuestInfo::findOrFail($modelId);
        if ($model) {
            if ($model->getUserQuests($actor)->exists()) {
                $model->done = true;
            }
        }
        return $model;
    }
}
