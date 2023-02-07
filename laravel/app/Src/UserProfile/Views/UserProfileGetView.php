<?php

namespace App\Src\UserProfile\Views;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileGetView extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */


  public function toArray($request)
  {
    return [
      'id' => $this->id,
      '_line_no' => $this->_line_no,
      '_seq' => $this->_seq,
      'user' => $this->user,
      'user_id' => $this->user_id,
      'created_date' => $this->created_date,
      'tel_no' => $this->tel_no,
      'address' => $this->address,
      'email' => $this->user->email,
      'name' => $this->user->name,
      'default_site_id' => $this->default_site_id,
      'created_by_user_ref' => $this->created_by_user_ref,
      'last_modified_by_user_ref' => $this->last_modified_by_user_ref,
      'updated_at' => $this->updated_at,
      'created_at' => $this->created_at
    ];
  }
}
