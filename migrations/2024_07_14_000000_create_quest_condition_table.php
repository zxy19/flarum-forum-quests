<?php

use Flarum\Database\Migration;
return [
    'up' => function ($table) {
    },
    'down' => function ($schema) {
        $schema->table('quest_condition', function ($table) {
            $table->dropIfExists();
        });
    }
];