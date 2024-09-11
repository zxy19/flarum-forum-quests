<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;
return [
    'up' => function (Blueprint $table) {
    },
    'down' => function ($schema) {
        $schema->table('quest_condition', function ($table) {
            $table->dropIfExists();
        });
    }
];