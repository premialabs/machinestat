<?php

 
namespace App\Src\condition\gen;


use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class condition extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'name',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'conditions';
      
  
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  


}
