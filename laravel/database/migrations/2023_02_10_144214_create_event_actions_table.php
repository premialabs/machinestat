<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('event_id')->nullable();
            $table->bigInteger('action_line_no');
            $table->string('type',20)->nullable();
            $table->string('payload',1000)->nullable();
            $table->unsignedMediumInteger('_seq');
            $table->unsignedBigInteger('created_by_user_ref')->nullable();
            $table->unsignedBigInteger('last_modified_by_user_ref')->nullable();
            $table->timestamps();
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('created_by_user_ref')->references('id')->on('users');
            $table->foreign('last_modified_by_user_ref')->references('id')->on('users');
       
      });
      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_actions');
    }
};
