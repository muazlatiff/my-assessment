<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JsController extends Controller
{
    public function index(Request $request, $jsPath)
    {
        $jsNoAuth = [
            'app.js',
            'register.js',
            'login.js',
        ];
        $jsAuth = [
            'users.js',
        ];
        $js = array_merge($jsNoAuth, $jsAuth);
        
        // condition to invalid js path
        $proceed = (
            !in_array($jsPath, $js) ||  // when js is not defined
            ( !$this->authenticated() && in_array($jsPath, $jsAuth) )   // when a guest requested authenticated js
        ) ? false : true;

        if( !$proceed ) abort(404);

        $jsContent = Storage::disk('resources')->get('js/pages/min/'.$jsPath);
        $response = response()->make($jsContent, 200);
        $response->header('Content-Type', 'application/javascript');
        return $response;
    }

    //
}
