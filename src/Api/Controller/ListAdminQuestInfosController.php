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

class ListAdminQuestInfosController extends AbstractListController
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
        $actor->assertAdmin();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $query = QuestInfo::query()->offset($offset)->limit($limit + 1);
        $results = $query->get();
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
