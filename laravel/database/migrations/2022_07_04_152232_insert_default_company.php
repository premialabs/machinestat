<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Src\Company\gen\Company;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user_id = User::where('email', 'sys@premialabs.com')->first()->id;

        Company::create([
            '_seq' => 100000,
            'code' => '*',
            'description' => 'Default Company',
            'last_modified_by_user_ref' => $user_id,
            'created_by_user_ref' => $user_id
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
