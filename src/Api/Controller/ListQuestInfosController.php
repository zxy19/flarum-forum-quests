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
use Xypp\ForumQuests\Api\Serializer\QuestInfoSerializer;
use Xypp\ForumQuests\Helper\CarbonZoneHelper;
use Xypp\ForumQuests\QuestInfo;

class ListQuestInfosController extends AbstractListController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = QuestInfoSerializer::class;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var CarbonZoneHelper
     */
    protected $carbonZoneHelper;

    /**
     * @param UrlGenerator $url
     * @param CarbonZoneHelper $carbonZoneHelper
     */
    public function __construct(UrlGenerator $url, CarbonZoneHelper $carbonZoneHelper)
    {
        $this->url = $url;
        $this->carbonZoneHelper = $carbonZoneHelper;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // See https://docs.flarum.org/extend/api.html#api-endpoints for more information.

        $actor = RequestUtil::getActor($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $filterDone = Arr::get($request->getQueryParams(), 'filter', "all");
        $now = $this->carbonZoneHelper->now();
        $query = QuestInfo::query()->leftJoin('user_quest', function ($join) use ($actor) {
            $join->on('quest_info.id', '=', 'user_quest.quest_info_id');
        })->where(function ($query) use ($actor) {
            $query->where('user_quest.user_id', '=', $actor->id)->orWhereNull('user_quest.user_id');
        });
        if ($filterDone != "all") {
            $query->where(function ($query) use ($filterDone, $now) {
                if ($filterDone == 'true')
                    $query = $query
                        ->whereNotNull('user_quest.user_id')
                        ->where(function ($query) use ($now) {
                            $query->whereNull("user_quest.refresh_at")
                                ->orWhere('user_quest.refresh_at', '>=', $now);
                        });
                else
                    $query = $query
                        ->whereNull('user_quest.user_id')
                        ->orWhere(function ($query) use ($now) {
                            $query->whereNotNull('user_quest.refresh_at')
                                ->where('user_quest.refresh_at', '<', $now);
                        });
            });
        }
        $query = $query->where(function ($query) use ($now) {
            $query
                ->where(function ($query) {
                    $query->whereNull("user_quest.refresh_at")
                        ->whereNotNull("user_quest.user_id");
                })
                ->orWhere('user_quest.refresh_at', '>=', $now)
                ->orWhere("hidden", "!=", 1);
        });
        $query = $query->offset($offset)->limit($limit + 1);
        $query = $query->select(["quest_info.*", "user_quest.refresh_at", "user_quest.user_id"]);
        $results = $query->get();
        $results->each(function (QuestInfo $questInfo) use ($now) {
            $questInfo->done = $questInfo->user_id && ($questInfo->refresh_at === null || $now->lte($questInfo->refresh_at));
        });
        $more = false;
        if (count($results) > $limit) {
            $results = $results->take($limit);
            $more = true;
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('quest-infos.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $more ? null : 0
        );
        return $results;
    }
}
