<?php

namespace App\Src\UserProfile\gen;

class UserProfileFieldValidator
{
  public static function getCommonRules()
  {
    return [
      'user_id' => ['numeric', 'nullable', 'exists:users,id'],
      'created_date' => ['required', 'date'],
      'tel_no' => ['nullable', 'max:12'],
      'address' => ['nullable', 'max:200'],
      'default_site_id' => ['numeric', 'nullable', 'exists:sites,id'],
      'created_by_user_ref' => ['numeric', 'nullable', 'exists:users,id'],
      'last_modified_by_user_ref' => ['numeric', 'nullable', 'exists:users,id']

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
