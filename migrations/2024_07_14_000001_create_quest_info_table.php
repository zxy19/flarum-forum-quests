<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'quest_info',
    function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('description');
        $table->mediumText("conditions");
        $table->mediumText("rewards");
        $table->string("re_available")->nullable();
        $table->string("icon")->nullable();
        // created_at & updated_at
        $table->timestamps();
    }
);

