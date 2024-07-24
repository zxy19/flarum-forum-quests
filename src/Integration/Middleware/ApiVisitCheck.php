<?php

namespace Xypp\ForumQuests\Integration\Middleware;

use Flarum\Http\RequestUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Illuminate\Events\Dispatcher;
use Xypp\ForumQuests\Data\ConditionData;
use Xypp\ForumQuests\Event\QuestConditionData;

class ApiVisitCheck implements MiddlewareInterface
{
    protected $events;
    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);
        $actor = RequestUtil::getActor($request);
        if (!$actor->isGuest()) {
            $route = $request->getAttribute('routeName');
            if (!str_starts_with($route, 'api.')) {
                $this->events->dispatch(
                    new QuestConditionData(
                        $actor,
                        [new ConditionData('reloads', 1)]
                    )
                );
            }
        }
        return $response;
    }
}