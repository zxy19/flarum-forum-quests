<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return [
    'up' => function ($schema) {
        $schema->table("quest_info", function (Blueprint $table) {
            $table->boolean("hidden")->default(false);
        });
    },
    'down' => function ($schema) {
        $schema->table("quest_info", function (Blueprint $table) {
            $table->dropColumn('hidden');
        });
    }
];