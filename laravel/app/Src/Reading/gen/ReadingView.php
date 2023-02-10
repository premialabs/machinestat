<?php

namespace App\Src\Reading\gen;

use Illuminate\Database\Eloquent\Modell;
use Illuminate\Http\Resources\Json\JsonResource;

class ReadingView extends JsonResource
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
			'id' =>  $this->id,
			'_line_no' => $this->_line_no,
			'device_id' => $this->device_id,
			'recorded_time' => $this->recorded_time,
			'value' => $this->value,
			'_seq' => $this->_seq,
			'created_by_user_ref' => $this->created_by_user_ref,
			'last_modified_by_user_ref' => $this->last_modified_by_user_ref,
			'updated_at' =>  $this->updated_at,
			'created_at' =>  $this->created_at 
    ]; 
  }

}

