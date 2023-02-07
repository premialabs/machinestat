<?php

 
namespace App\Src\Site\gen;
use App\Src\Company\gen\Company;

use App\Src\MaintObject\gen\MaintObject;
use App\Src\JobCard\gen\JobCard;

use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Site extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'code',
	'description',
	'color',
	'company_ref',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'sites';
      
  
  public function company() {
    return $this->belongsTo(Company::class, 'company_ref');
  }
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  
  public function maint_objects() {
    return $this->hasMany(MaintObject::class);
  }
  public function job_cards() {
    return $this->hasMany(JobCard::class);
  }



}
