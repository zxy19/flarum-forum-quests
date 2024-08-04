<?php

namespace Xypp\ForumQuests\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use \Illuminate\Contracts\Container\Container;
use Xypp\ForumQuests\ConditionDefinition;
use Xypp\ForumQuests\Helper\ConditionHelper;

class ConditionProvider implements ExtenderInterface
{
    protected array $conditionsDefinitions = [];

    protected array $simpleConditionsDefinitions = [];

    protected array $simpleFeConditionsDefinitions = [];

    public function simple(string $name)
    {
        $this->simpleConditionsDefinitions[] = $name;
        return $this;
    }
    public function simpleFrontend(string $name)
    {
        $this->simpleFeConditionsDefinitions[] = $name;
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
                foreach ($this->simpleFeConditionsDefinitions as $name) {
                    $collection->addDefinition(new ConditionDefinition($name, true));
                }
            }
        );
        return $this;
    }
}