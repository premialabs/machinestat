<?php

namespace App\Src\UserProfile;

use App\Models\User;
use App\Src\Site\gen\Site;
use App\Src\UserProfile\gen\UserProfile;
use App\Src\UserProfile\gen\UserProfileBaseRepo;
use App\Src\UserProfile\Views\UserProfileListView;
use App\Src\UserProfile\gen\UserProfileWithParentsView;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Src\UserProfile\gen\UserProfileFieldValidator;
use App\Src\UserProfile\Views\UserProfileGetView;
use App\Src\UserProfile\Views\UserProfileWithUserView;
use Exception;

class UserProfileRepo extends UserProfileBaseRepo
{
  #region ---------------- Hooks ------------------
  public function prepareCreate(Request $request)
  {
  }

  public static function beforeCreateRec(&$rec)
  {
    if (!isset($rec['username'])) {
      throw new Exception(json_encode(["username" => "Username is required"]));
    }
    if (!isset($rec['name'])) {
      throw new Exception(json_encode(["name" => "Name is required"]));
    }
    if (!isset($rec['email'])) {
      throw new Exception(json_encode(["email" => "Email is required"]));
    }
    if (!isset($rec['password'])) {
      throw new Exception(json_encode(["password" => "Password is required"]));
    }

    $default_site_id = Site::where('code', 'MGL')->first()->id;
    $user = User::create([
      'username' => $rec['username'],
      'name' => $rec['name'],
      'email' => $rec['email'],
      'password' => bcrypt($rec['password']),
      'created_at' => Carbon::now(),
      'updated_at' => Carbon::now()
    ]);

    $rec['last_modified_by_user_ref'] = auth()->user()->id;
    $rec['user_id'] = $user->id;
    $rec['created_date'] = Carbon::now();
    $rec['default_site_id'] = $default_site_id;
    $rec['_seq'] = UserProfile::max('_seq') + 100;
  }

  public function prepareEdit($id)
  {
    // $UserProfile['roles'] = Role::all()->toArray();
    // $UserProfile['email_address'] = $UserProfile->user->email;
    // $UserProfile['role'] = $UserProfile->user->user_roles[0]->role_id;
    // $UserProfile['keep_password'] = true;
    // $UserProfile['retype_email_address'] = $UserProfile->user->email;

    // return $UserProfile;
  }

  public static function beforeUpdateRec(&$rec, $object)
  {
    $user = User::find($rec['user_id']);
    $user->email = $rec['email'];
    $user->name = $rec['name'];
    $user->password = bcrypt($rec['password']);
    $user->save();
  }

  public static function customValidator($rec, $method)
  {
    //$rec['code'] = Str::upper($rec['code']);
    //$rec['status'] = SampleObject::getInitialStatus();
  }
  #endregion

  public function list($request)
  {
    $page_no = $request->query('page_no');
    $page_size = $request->query('page_size');
    $i = 1;

    $data = UserProfile::select(['id', '_seq', 'user_id'])
      ->orderBy('_seq')
      ->with('user')
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item->setAttribute('_line_no', $i++);
          return $item;
        }
      );

    return UserProfileListView::collection($data);
  }

  public function show($model_id)
  {
    $i = 1;

    $data = UserProfile::where(
      'id',
      $model_id
    )
      ->orderBy('_seq')
      ->with(['user'])
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item->setAttribute('_line_no', $i++);
          return $item;
        }
      );

    return UserProfileGetView::collection($data);
  }

  public function withUser($request)
  {
    $page_no = $request->query('page_no');
    $page_size = $request->query('page_size');
    $i = 1;

    $data = UserProfile::select(['id', '_seq', 'user_id'])
      ->orderBy('_seq')
      ->with('user')
      ->get()
      ->map(
        function ($item, $key) use (&$i) {
          $item->setAttribute('_line_no', $i++);
          return $item;
        }
      );

    return UserProfileWithUserView::collection($data);
  }
}
