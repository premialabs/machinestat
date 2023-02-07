<?php

 
namespace App\Src\Company\gen;

use App\Src\Site\gen\Site;

use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Company extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'code',
	'description',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'companies';
      
  
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  
  public function sites() {
    return $this->hasMany(Site::class);
  }



}
