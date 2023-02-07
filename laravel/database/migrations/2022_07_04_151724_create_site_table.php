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
        Schema::create('sites', function (Blueprint $table) {
         $table->bigIncrements('id');
         $table->string('code',20);
         $table->string('description',100)->nullable();
         $table->unsignedBigInteger('company_ref');
         $table->unsignedMediumInteger('_seq');
         $table->string('color', 20);
         $table->unsignedBigInteger('created_by_user_ref')->nullable();
         $table->unsignedBigInteger('last_modified_by_user_ref')->nullable();
         $table->timestamps();
         $table->foreign('company_ref')->references('id')->on('companies');
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
        Schema::dropIfExists('site');
    }
};
