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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedMediumInteger('_seq');
            $table->unsignedBigInteger('user_id');
            $table->dateTime('created_date');
            $table->string('tel_no', 12)->nullable();
            $table->string('address', 200)->nullable();

            $table->unsignedBigInteger('default_site_id');
            $table->unsignedBigInteger('last_modified_by_user_ref');
            $table->unsignedBigInteger('created_by_user_ref');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_profiles');
    }
};
