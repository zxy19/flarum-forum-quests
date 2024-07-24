<?php

namespace Xypp\ForumQuests\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use \Illuminate\Contracts\Container\Container;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Helper\ConditionHelper;

class ConditionDefinitionProvider implements ExtenderInterface
{
    protected array $conditionsDefinitions = [];

    protected array $simpleConditionsDefinitions = [];

    public function simple(string $name)
    {
        $this->simpleConditionsDefinitions[] = $name;
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
            ConditionDefinitionCollection::class,
            function (ConditionDefinitionCollection $collection, Container $container) {
                foreach ($this->conditionsDefinitions as $conditionDefinition) {
                    $obj = $container->make($conditionDefinition);
                    $collection->addDefinition($obj);
                }
                foreach ($this->simpleConditionsDefinitions as $name) {
                    $collection->addDefinition(new ConditionDefinition($name));
                }
            }
        );
        return $this;
    }
}