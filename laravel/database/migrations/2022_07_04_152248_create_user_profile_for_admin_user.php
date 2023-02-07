<?php

use App\Models\User;
use App\Src\Site\gen\Site;
use App\Src\UserProfile\gen\UserProfile;
use Carbon\Carbon;
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
        $user_id = User::where('email', 'sys@premialabs.com')->first()->id;
        UserProfile::create([
            '_seq' => 100000,
            'user_id' => $user_id,
            'created_date' => Carbon::now(),
            'tel_no' => null,
            'address' => null,
            'default_site_id' => Site::where('code', 'MGL')->first()->id,
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
    }
};
