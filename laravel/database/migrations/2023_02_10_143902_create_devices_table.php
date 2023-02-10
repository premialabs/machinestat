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
        Schema::create('devices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('device_id');
            $table->string('node_id',15);
            $table->string('name',100);
            $table->unsignedMediumInteger('_seq');
            $table->unsignedBigInteger('created_by_user_ref')->nullable();
            $table->unsignedBigInteger('last_modified_by_user_ref')->nullable();
            $table->timestamps();
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
        Schema::dropIfExists('devices');
    }
};
