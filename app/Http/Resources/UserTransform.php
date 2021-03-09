<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserTransform extends ResourceCollection
{
    public $self_id;

    public function __construct() {
        $this->self_id = auth()->guard('api')->user();
    }
    
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public function index($Users) {
        $Users->transform(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'me' => $user->id === $this->self_id->id ? true : false,
            ];
        });

        return $Users->toArray();
    }

}
