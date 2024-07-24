<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'quest_condition',
    function (Blueprint $table) {
        $table->increments('id');
        $table->timestamps();
        $table->string('name');
        $table->integer('user_id')->unsigned();
        $table->integer("value");
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->mediumText("accumulation")->default("[]");
    }
);