<?php

namespace Xypp\ForumQuests\Api\Controller;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Arr;
use Nette\Utils\Paginator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\ForumQuests\Helper\CarbonZoneHelper;
use Xypp\ForumQuests\QuestInfo;

class ShowQuestInfoController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = QuestInfoSerializer::class;

    /**
     * @var CarbonZoneHelper
     */
    protected $carbonZoneHelper;

    /**
     * @param CarbonZoneHelper $carbonZoneHelper
     */
    public function __construct(CarbonZoneHelper $carbonZoneHelper)
    {
        $this->carbonZoneHelper = $carbonZoneHelper;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $now = $this->carbonZoneHelper->now();
        $query = QuestInfo::where("id", $id)->leftJoin('user_quest', function ($join) {
            $join->on('quest_info.id', '=', 'user_quest.quest_info_id');
        })->where(function ($query) use ($actor) {
            $query->where('user_quest.user_id', '=', $actor->id)->orWhereNull('user_quest.user_id');
        });
        $query = $query->where(function ($query) use ($now) {
            $query
                ->whereNull("user_quest.refresh_at")
                ->whereNotNull("user_quest.user_id")
                ->orWhere('user_quest.refresh_at', '>=', $now)
                ->orWhere("hidden", "!=", 1);
        });
        $query = $query->selectRaw("`quest_info`.*");
        $result = $query->firstOrFail();
        $result->done = $result->user_id && ($result->refresh_at === null || $now->lte($result->refresh_at));
        return $result;
    }
}
