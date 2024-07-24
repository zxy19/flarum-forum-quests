<?php

namespace Xypp\ForumQuests\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use \Illuminate\Contracts\Container\Container;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Helper\ConditionHelper;
use Xypp\ForumQuests\RewardDefinition;

class QuestRewardProvider implements ExtenderInterface
{
    protected array $conditionsDefinitions = [];

    protected array $simpleConditionsDefinitions = [];

    public function simple(string $name, callable $perform)
    {
        $this->simpleConditionsDefinitions[] = [$name, $perform];
        return $this;
    }
    public function provide($className)
    {
        $this->conditionsDefinitions[] = $className;
        return $this;
    }
    public function extend(Container $container, Extension $extension = null)
    {
        $container->resolving(
            QuestRewardCollection::class,
            function (QuestRewardCollection $collection, Container $container) {
                foreach ($this->conditionsDefinitions as $conditionDefinition) {
                    $obj = $container->make($conditionDefinition);
                    $obj->extend($container);
                    $collection->addDefinition($obj);
                }
                foreach ($this->simpleConditionsDefinitions as [$name, $perform]) {
                    $obj = new RewardDefinition($name, $perform);
                    $obj->extend($container);
                    $collection->addDefinition($obj);
                }
            }
        );
        return $this;
    }
}