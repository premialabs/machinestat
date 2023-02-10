<?php

 
namespace App\Src\Device\gen;
use App\Src\event\gen\event;

use App\Src\Reading\gen\Reading;

use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Device extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'device_id',
	'node_id',
	'name',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'devices';
      
  
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  
  public function readings() {
    return $this->hasMany(Reading::class);
  }



}
