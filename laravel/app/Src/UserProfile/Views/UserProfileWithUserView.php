<?php

namespace App\Src\UserProfile\Views;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileWithUserView extends JsonResource
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
      'user_id' => $this->user_id,
      'user' => $this->user
    ];
  }
}
