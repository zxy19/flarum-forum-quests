<?php

namespace Xypp\ForumQuests;

use Flarum\Foundation\ContainerUtil;
use Flarum\User\User;
use Illuminate\Container\Container;

class RewardDefinition
{
    public string $name;
    public $cb;
    public function __construct(?string $name = null, ?callable $cb = null)
    {
        if ($name)
            $this->name = $name;
    }
    public function extend(Container $container)
    {
        if ($this->cb)
            $this->cb = ContainerUtil::wrapCallback($this->cb, $container);
    }
    public function perform(User $user, $value): bool
    {
        if ($this->cb) {
            return call_user_func($this->cb, $user, $value);
        }
        if (in_array($this->name, $user->getAttributes())) {
            $user->setAttribute($this->name, $user->getAttribute($this->name) + $value);
            $user->save();
            return true;
        } else
            return false;
    }
}