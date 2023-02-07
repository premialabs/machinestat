<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Src\Site\gen\Site;
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
        $user_id    = User::where('email', 'sys@premialabs.com')->first()->id;
        $company_id = Company::where('code', '*')->first()->id;

        Site::create([
            '_seq' => 100000,
            'code' => 'MGL',
            'description' => 'Magal Gana',
            'color'=> "#5DC3B3",
            'company_ref' => $company_id,
            'last_modified_by_user_ref' => $user_id,
            'created_by_user_ref' => $user_id
        ]); 
        
        // Site::create([
        //     '_seq' => 100001,
        //     'code' => 'KPH',
        //     'description' => 'Kalu Pahana',
        //     'color'=> "#5DC3B3",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100002,
        //     'code' => 'HG1',
        //     'description' => 'Hula Ganaga - I',
        //     'color'=> "#B1967F",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100003,
        //     'code' => 'HG2',
        //     'description' => 'Hula Ganaga - II',
        //     'color'=> "#0B7B3E",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100004,
        //     'code' => 'BDO',
        //     'description' => 'Badulu Oya',
        //     'color'=> "#968FD8",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100005,
        //     'code' => 'MDO',
        //     'description' => 'Mandagal Oay',
        //     'color'=> "#5DC3B3",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100006,
        //     'code' => 'ELP',
        //     'description' => 'Ellapita Ella',
        //     'color'=> "#78C584",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100007,
        //     'code' => 'HGT',
        //     'description' => 'Hapugastenna',
        //     'color'=> "#F2C49A",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100008,
        //     'code' => 'ALP',
        //     'description' => 'Alupola',
        //     'color'=> "#BFC5C8",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);

        // Site::create([
        //     '_seq' => 100009,
        //     'code' => 'GLS',
        //     'description' => 'Glassaugh',
        //     'color'=> "#EA885E",
        //     'company_ref' => $company_id,
        //     'last_modified_by_user_ref' => $user_id,
        //     'created_by_user_ref' => $user_id
        // ]);
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
