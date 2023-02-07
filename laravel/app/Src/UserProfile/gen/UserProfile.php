<?php


namespace App\Src\UserProfile\gen;

use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use App\Src\Site\gen\Site;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends FndModel
{
  use ModelModifierTrait;

  protected $fillable = [
    '_seq',
    'user_id',
    'created_date',
    'tel_no',
    'address',
    'default_site_id',
    'created_by_user_ref',
    'last_modified_by_user_ref',
  ];
  protected $table = 'user_profiles';


  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
  public function site()
  {
    return $this->belongsTo(Site::class, 'default_site_id');
  }
  public function created_by()
  {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by()
  {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }
}
