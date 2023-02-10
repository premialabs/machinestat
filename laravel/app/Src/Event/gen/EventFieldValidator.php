<?php

namespace App\Src\Event\gen;

class EventFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'device_id' => ['numeric','required','exists:devices,id'],
		'condition_id' => ['numeric','required','exists:conditions,id'],
		'condition_param_1' => ['max:30'],
		'condition_param_2' => ['max:30'],
		'condition_param_3' => ['max:30'],
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



