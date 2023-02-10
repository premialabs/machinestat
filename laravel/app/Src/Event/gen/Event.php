<?php

 
namespace App\Src\Event\gen;
use App\Src\event\gen\event;
use App\Src\device\gen\device;
use App\Src\condition\gen\condition;


use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Event extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'device_id',
	'condition_id',
	'condition_param_1',
	'condition_param_2',
	'condition_param_3',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'events';
      
  
  public function device() {
    return $this->belongsTo(device::class, 'device_id');
  }
  public function condition() {
    return $this->belongsTo(condition::class, 'condition_id');
  }
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  


}
