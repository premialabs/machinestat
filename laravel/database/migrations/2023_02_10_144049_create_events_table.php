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
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('device_id');
            $table->unsignedBigInteger('condition_id');
            $table->string('condition_param_1',30)->nullable();
            $table->string('condition_param_2',30)->nullable();
            $table->string('condition_param_3',30)->nullable();
            $table->unsignedMediumInteger('_seq');
            $table->unsignedBigInteger('created_by_user_ref')->nullable();
            $table->unsignedBigInteger('last_modified_by_user_ref')->nullable();
            $table->timestamps();
            $table->foreign('device_id')->references('id')->on('devices');
            $table->foreign('condition_id')->references('id')->on('conditions');
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
        Schema::dropIfExists('events');
    }
};
