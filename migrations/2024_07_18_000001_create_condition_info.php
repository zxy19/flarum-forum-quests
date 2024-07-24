<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'quest_condition_quest_info',
    function (Blueprint $table) {
        $table->string('quest_condition_name');
        $table->integer('quest_info_id')->unsigned();
        $table->foreign('quest_info_id')->references('id')->on('quest_info')->onDelete('cascade');
    }
);