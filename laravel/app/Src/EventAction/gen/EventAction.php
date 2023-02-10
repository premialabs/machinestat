<?php

 
namespace App\Src\EventAction\gen;
use App\Src\event\gen\event;
use App\Src\device\gen\device;
use App\Src\condition\gen\condition;


use Premialabs\Foundation\Traits\ModelModifierTrait;
use Premialabs\Foundation\FndModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class EventAction extends FndModel
{  
   use ModelModifierTrait;
   protected $fillable = [ 
	'event_id',
	'action_line_no',
	'type',
	'payload',
	'_seq',
	'created_by_user_ref',
	'last_modified_by_user_ref', 
  ];       
  protected $table = 'event_actions';
      
  
  public function event() {
    return $this->belongsTo(event::class, 'event_id');
  }
  public function created_by() {
    return $this->belongsTo(User::class, 'created_by_user_ref');
  }
  public function last_modified_by() {
    return $this->belongsTo(User::class, 'last_modified_by_user_ref');
  }

  


}
