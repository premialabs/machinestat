<?php

namespace App\Src\EventAction\gen;

class EventActionFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'event_id' => ['numeric','nullable','exists:events,id'],
		'action_line_no' => ['numeric','required'],
		'type' => ['max:20'],
		'payload' => ['max:1000'],
		'_seq' => ['numeric','required'],
		'created_by_user_ref' => ['numeric','nullable','exists:users,id'],
		'last_modified_by_user_ref' => ['numeric','nullable','exists:users,id'],

    ];
  }

 public static function getCreateRules()
  {
    return array_merge([], self::getCommonRules());
  }

  public static function getUpdateRules()
  {
    return array_merge([], self::getCommonRules());
  }

}



