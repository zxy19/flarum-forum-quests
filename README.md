# Forum Quests

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/xypp/forum-quests.svg)](https://packagist.org/packages/xypp/forum-quests) [![Total Downloads](https://img.shields.io/packagist/dt/xypp/forum-quests.svg)](https://packagist.org/packages/xypp/forum-quests)

A [Flarum](http://flarum.org) extension. Add quests to the forum, and reward with money or other things.

中文用户请参阅 [README-CN.md](README-CN.md)

## Simply Guide

Go [Configure Before Usage](#configure-before-usage)

## Description

![Effect](https://cdn-fusion.imgimg.cc/i/2024/2812b8d387f783b8.png)

This extension provided a data analysis system that tracks user's data when it changed and trigger the corresponding quests.

When a user satisfy the condition of a quest, it will be triggered and the quest will be done. The reward will be given to the user.

If re-available is set, when the time is up, the quest can be triggered again.

## Features

### Time Span

This extension allows you to use time span in condition. For example, "Post Count" > 0 in Span 1 means that the user must post at least one post this day. The time span is calculated by the timezone configured in admin panel.

### Re-Available

The quest is always supposed to be done multiple times, for example, once a day. You can use `re-available` option to make the quest to be available again after some time. The extension currently support re-available after a day(by timezone) or after certain hours(exact time).

### Frontend List and Hidden Item

This extension provides a frontend page for user to know what quest they are able to do. You can also hide the quest from the quest list until it is done.

## Notice

### About Recalculate Command

This command will ask all conditions to be rebuilt from database. However some conditions have not recorded with time so they will lost all accumulation data after recalculate.

When you running `php flarum forum-quests:recalculate` command, by default it will stop running and ask you to confirm when some conditions are not able to be rebuilt from database. If this is the first time you run this command, just type `y` to continue.Otherwise **Press Enter Or Type `n` to skip rebuilt** or you will lose all accumulation data and only get the total value of this condition.

### Refreshing after edit

If you change a quest's Re-Available from `once` to any other value, you may found that the users that had done the quest formerly was not able to do it again. That's because the extension will calculate the time user can do the quest again when they have just done it.

To fix the problem, rum `php flarum forum-quests:refresh`

### Configure before usage

After installing, there are still something you need to do.

- Enable the extension
- Fill the timezone in admin panel and press `Save`
- run `php flarum forum-quests:recalculate`, and type `y` for all query(ONLY FOR FIRST RUNNING)

### For Best Experience

The quest done will notify the user by alert notification.

It will be better to work with following

+ xypp/flarum-websocket-notification
+ blomstra/realtime
+ kyrne/websocket
+ flarum/pusher

## Installation

Install with composer:

```sh
composer require xypp/forum-quests:"*"
```

Then configure timezone

```sh
php flarum forum-quests:recalculate
```

## Updating

```sh
composer update xypp/forum-quests:"*"
php flarum migrate
php flarum forum-quests:recalculate
php flarum cache:clear
```

## Screenshots

![Quest List Page](https://cdn-fusion.imgimg.cc/i/2024/093b3718fde17b90.png)
![Add Quest Modal](https://cdn-fusion.imgimg.cc/i/2024/f568ab58af507013.png)

## Comparing to Achievements/AutoMod?

This extension is designed for following targets that other extensions lacks:

+ Metric Pre Day
+ One-time trigger(No leave event)
+ Multiple times
+ Frontend List


## Integration

The extension natively provides the following Conditions/Rewards.

**Conditions**

- Post Count(core)
- Discussion Count(core)
- Change Email(core)
- Change Avatar(core)
- User Page Visit(core)
- Page Reloads(core)
- Discussion Replied(core)
- Like Received(flarum/likes)
- Like Sent(flarum/likes)
- Store Purchased(xypp/store)
- Discussion was view(michaelbelgium/flarum-discussion-views)
- Badge Received(v17development/flarum-user-badges)
- Money(AntoineFr/money)

**Rewards**

- Money(AntoineFr/money)
- Store Item(xypp/store)
- Badge(v17development/flarum-user-badges)

**From Other Extensions**

- foskym/flarum-custom-levels: Reward with exp.
- xypp/flarum-invite-user: Conditions of invitation

## Links

- [Packagist](https://packagist.org/packages/xypp/forum-quests)
- [GitHub](https://github.com/zxy19/flarum-forum-quests)