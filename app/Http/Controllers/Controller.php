<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Check if authenticated 
     */
    public function authenticated()
    {
        return session('access_token') ? true : false;
    }

    /**
     * Get authenticated user
     */
    public function auth_user()
    {
        return session('access_token') ? auth()->guard('api')->user() : NULL;
    }
}
