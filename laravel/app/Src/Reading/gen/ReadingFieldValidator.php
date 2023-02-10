<?php

namespace App\Src\Reading\gen;

class ReadingFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'device_id' => ['numeric','required','exists:devices,id'],
		'recorded_time' => ['required'],
		'value' => ['required', 'max:100'],
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



