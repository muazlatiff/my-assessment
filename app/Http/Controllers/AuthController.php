<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handles Registration
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
 
        $token = $user->createToken('Login')->accessToken;

        return response()->json([
            'token' => $token,
        ], 200);
    }
 
    /**
     * Handles Login 
     */
    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];
 
        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('Login')->accessToken;
            return response()->json([
                'token' => $token,
            ], 200);
        }
        else {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }
    }
 
    /**
     * View Login page 
     */
    public function index_login(Request $request)
    {
        return ( auth()->user() ) ?
            redirect('/') :
            view('login');
    }
 
    /**
     * View Register page 
     */
    public function index_register(Request $request)
    {
        return ( auth()->user() ) ?
            redirect('/') :
            view('register');
    }

    //
}
