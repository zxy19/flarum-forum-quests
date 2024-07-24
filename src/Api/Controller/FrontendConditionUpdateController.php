<?php

namespace Xypp\ForumQuests\Api\Controller;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Helper\ConditionHelper;

class FrontendConditionUpdateController implements RequestHandlerInterface
{
    protected ConditionHelper $helper;
    public function __construct(ConditionHelper $helper)
    {
        $this->helper = $helper;
    }
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $data = Arr::get($request->getParsedBody(), 'data', []);
        $wp = [];
        foreach ($data as $d) {
            $wp[] = new ConditionData(Arr::get($d, "name"), Arr::get($d, "value"));
        }
        $this->helper->updateConditions($actor, $wp, true);
        return new JsonResponse([
            "message" => "success"
        ]);
    }
}