<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AuthController;
use App\Http\Resources\UserTransform;

class UserController extends Controller
{
    public $transformer;
    public $perPage;

    public function __construct() {
        $this->transformer = new UserTransform;
        $this->perPage = 10;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->filled('perPage') ? $request->perPage : $this->perPage;
        return $this->transformer->index( User::paginate($perPage) );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return (new AuthController)->register($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $details = $this->transformer->show( User::where('id', $id)->get() );
        return $details ?
            $details :
            response()->json([
                'message' => 'User not found.',
            ], 422);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email',
            'password' => 'sometimes|nullable|min:8',
        ]);

        $filled = collect( request()->all() )->filter(function($value) {
            return $value;
        })->toArray();
        if( isset($filled['password']) ) {
            $filled['password'] = Hash::make($filled['password']);
        }

        try {
            $trx = User::where('id', $id)->update($filled);
        }
        catch(\Exception $e) {
            $trx = response()->json([
                'exception' => $e,
                'message' => 'Input contains invalid value.',
            ], 422);
        }

        return $trx;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        try {
            $trx = User::where('id', $id)->delete();
        }
        catch(\Exception $e) {
            $trx = response()->json([
                'exception' => $e,
                'message' => 'Something went wrong.',
            ], 422);
        }

        return $trx;
    }

    /**
     * View User List page 
     */
    public function index_users_list(Request $request)
    {
        return view('users_list');
    }

    //
}
