<?php

namespace Xypp\ForumQuests\Api\Controller;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Arr;
use Nette\Utils\Paginator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\ForumQuests\Api\Serializer\QuestConditionSerializer;
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\ForumQuests\QuestCondition;
use Xypp\ForumQuests\QuestInfo;

class ListUserConditionsController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = QuestConditionSerializer::class;
    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $results = QuestCondition::where('user_id', $actor->id)->get();
        return $results;
    }
}
