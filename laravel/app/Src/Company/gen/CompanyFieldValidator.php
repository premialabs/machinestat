<?php

namespace App\Src\Company\gen;

class CompanyFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'code' => ['required', 'max:20'],
		'description' => ['max:100'],
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



