<?php

namespace App\Src\Device\gen;

class DeviceFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'device_id' => ['numeric','required'],
		'node_id' => ['required', 'max:15'],
		'name' => ['required', 'max:100'],
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



