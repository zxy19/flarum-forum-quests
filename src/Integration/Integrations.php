<?php

use Flarum\Discussion\Event\Started;
use Flarum\Extend;
use Flarum\Post\Event\Posted;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Xypp\ForumQuests\Integration\Listener\DiscussionStartedListener;
use Xypp\ForumQuests\Integration\Listener\DiscussionViewed;
use Xypp\ForumQuests\Integration\Listener\LikeEventsListener;
use Xypp\ForumQuests\Integration\Listener\PostPostedListener;
use Xypp\ForumQuests\Integration\Listener\StoreEventListener;
use Xypp\ForumQuests\Integration\Middleware\ApiVisitCheck;
use Xypp\Store\Event\PurchaseDone;

return [
    (new Extend\Event)
        ->listen(Posted::class, PostPostedListener::class)
        ->listen(Started::class, DiscussionStartedListener::class)
        //Integrate with michaelbelgium/flarum-discussion-views
        ->listen(DiscussionWasViewed::class, DiscussionViewed::class)
        //Integrate with xypp/store
        ->listen(PurchaseDone::class, StoreEventListener::class)
        //Integrate with flarum/likes
        ->subscribe(LikeEventsListener::class),
    (new Extend\Middleware("forum"))
        ->add(ApiVisitCheck::class)
];