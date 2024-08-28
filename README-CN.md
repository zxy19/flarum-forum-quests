# 论坛任务

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/xypp/forum-quests.svg)](https://packagist.org/packages/xypp/forum-quests) [![Total Downloads](https://img.shields.io/packagist/dt/xypp/forum-quests.svg)](https://packagist.org/packages/xypp/forum-quests)

一个 [Flarum](http://flarum.org) 扩展。在论坛中添加任务，并以金钱或其他方式进行奖励。

For English User, Please see [README.md](README.md)

## 简单指南

转到 [使用前配置](#configure-before-usage)

## 说明

![效果](https://cdn-fusion.imgimg.cc/i/2024/3edd13a6ff9daf3e.png)

该扩展提供了一个数据分析系统，可在用户数据发生变化时对其进行跟踪，并触发相应的任务。

当用户满足某个任务的条件时，任务就会被触发并完成。用户将获得奖励。

如果设置了 “重新可用”，当时间到时，任务可以再次触发。

### 功能

### 时间区间

此扩展允许您在条件中使用时间区间。例如，在时间区间1之内发帖数>0 表示用户必须在这一天至少发帖一次。时间区间根据管理面板中配置的时区计算。

#### 重新可用

任务可能需要多次被完成，例如每天被完成一次。您可以使用 `re-available` 选项让任务在一段时间后再次可用。该扩展目前支持一天后（按时区）或几小时后（确切时间）重新可用。

### 前端列表和隐藏项目

本扩展为用户提供了一个前台页面，让他们知道自己能做什么任务。您还可以将任务从任务列表中隐藏起来，直到任务完成。

### 通知

### 关于重新计算命令

此命令将要求从数据库中重建所有条件。但有些条件没有随时间记录，因此重新计算后会丢失所有累积数据。

当您运行 `php flarum forum-quests:recalculate` 命令时，默认情况下它会在某些条件无法从数据库中重建时暂停运行并要求您确认。如果您是第一次运行此命令，键入 `y` 继续。否则 **按回车键或键入 `n` 跳过重建**，否则您将丢失所有累积数据，只能得到此条件的总值。

### 编辑后刷新

如果您将任务的 “重新可用”从“一次性”改为任何其他值，您可能会发现以前完成任务的用户无法再次完成任务。这是因为扩展只会在用户刚刚完成任务时计算其可以再次完成任务的时间。

要解决这个问题，请使用 `php flarum forum-quests:refresh` 。

### 使用前配置

安装后，你还需要做一些事情。

- 启用扩展
- 在管理面板中填写时区，然后按`保存
- 运行`php flarum forum-quests:recalculate`，并在所有查询中输入`y`（仅适用于首次运行）。

### 最佳体验

完成的任务会通过Alert通知用户。

配合下列插件使用体验更佳

+ xypp/flarum-websocket-notification
+ blomstra/realtime
+ kyrne/websocket
+ flarum/pusher

## 安装

使用 composer 安装：

```sh
composer require xypp/forum-quests: "*"
```

然后配置时区

```sh
php flarum forum-quests:recalculate
```

## 更新

```sh
composer update xypp/forum-quests: "*"
php flarum migrate
php flarum forum-quests:recalculate
php flarum cache:clear
```

## 截图

![Quest List Page](https://cdn-fusion.imgimg.cc/i/2024/093b3718fde17b90.png)
![Add Quest Modal](https://cdn-fusion.imgimg.cc/i/2024/f568ab58af507013.png)

## Comparing to Achievements/AutoMod?

本扩展专为以下目标而设计，而其他扩展则缺乏这些目标：

+ 公制前日
+ 一次性触发（无离开事件）
+ 多次触发
+ 前端列表


## 集成

该扩展原生提供了以下条件/奖励。

**条件**

- 发帖数(core)
- 讨论数(core)
- 修改邮箱(core)
- 修改头像(core)
- 访问用户页(core)
- 页面重载(core)
- 被回复(core)
- 收到赞(flarum/likes)
- 发送赞(flarum/likes)
- 购买商品(xypp/store)
- 讨论被浏览(michaelbelgium/flarum-discussion-views)
- 获得徽章(v17development/flarum-user-badges)
- 货币(AntoineFr/money)

**奖励**

- 货币(AntoineFr/money)
- 商品(xypp/store)
- 徽章(v17development/flarum-user-badges)

**由其他拓展提供**

- foskym/flarum-custom-levels: 经验值奖励.
- xypp/flarum-invite-user: 邀请相关的条件



## 链接

- [Packagist](https://packagist.org/packages/xypp/forum-quests)
- [GitHub](https://github.com/zxy19/flarum-forum-quests)
