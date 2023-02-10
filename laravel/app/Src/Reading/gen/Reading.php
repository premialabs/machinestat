<?php

 
namespace App\Src\Reading\gen;
use App\Src\event\gen\event;
use App\Src\device\gen\device;


use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Reading extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'device_id',
	'recorded_time',
	'value',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'readings';
      
  
  public function device() {
    return $this->belongsTo(device::class, 'device_id');
  }
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  


}
