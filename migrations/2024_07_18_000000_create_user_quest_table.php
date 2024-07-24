<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'user_quest',
    function (Blueprint $table) {
        $table->increments('id');
        $table->timestamps();
        $table->timestamp('refresh_at');
        $table->integer('user_id')->unsigned();
        $table->integer('quest_info_id')->unsigned();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('quest_info_id')->references('id')->on('quest_info')->onDelete('cascade');
        $table->string("iid");
        $table->unique(["iid"]);
    }
);

