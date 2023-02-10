<?php

namespace App\Src\EventAction\gen;

use Illuminate\Http\Resources\Json\JsonResource;

class EventActionWithParentsView extends JsonResource
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
		'event' => $this->event,
		'event_id' => $this->event_id,
		'action_line_no' => $this->action_line_no,
		'type' => $this->type,
		'payload' => $this->payload,
		'_seq' => $this->_seq,
		'created_by' => $this->created_by,
		'created_by_user_ref' => $this->created_by_user_ref,
		'last_modified_by' => $this->last_modified_by,
		'last_modified_by_user_ref' => $this->last_modified_by_user_ref,
			'updated_at' =>  $this->updated_at,
			'created_at' =>  $this->created_at
       ];
    }

}