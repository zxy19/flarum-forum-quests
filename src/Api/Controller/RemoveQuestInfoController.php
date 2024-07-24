<?php

namespace Xypp\ForumQuests\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\ForumQuests\QuestInfo;

class RemoveQuestInfoController extends AbstractDeleteController
{
    protected function delete(Request $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan("removeQuestInfo");
        $id = Arr::get($request->getQueryParams(), 'id');
        $item = QuestInfo::findOrFail($id);
        $item->delete();
    }
}
