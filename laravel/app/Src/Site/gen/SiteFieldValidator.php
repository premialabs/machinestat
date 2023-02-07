<?php

namespace App\Src\Site\gen;

class SiteFieldValidator
{
  public static function getCommonRules()
  {
    return [
 
    		'code' => ['required', 'max:20'],
		'description' => ['max:100'],
		'color' => ['required', 'max:20'],
		'company_ref' => ['numeric','required','exists:companies,id'],
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



