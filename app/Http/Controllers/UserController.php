<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Imports\UsersImport;
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
     * Handle Excel import
     */
    public function excelImport(Request $request)
    {
        $proceed = false;
        $msg = 'Invalid format. Make sure 1st row is a Heading. Make sure Heading `name` and `email` exist. Make sure Heading `password` exists for action Add';

        $allRows = (new UsersImport)->toArray(request()->file('excel'))[0];
        $colIndex = [];
        $firstRow = $allRows[0];

        // find column location
        foreach ($firstRow as $index => $col) {
            if( strtolower($col) === 'name' ) {
                $colIndex['name'] = $index; 
            }
            else if( strtolower($col) === 'email' ) {
                $colIndex['email'] = $index; 
            }
            else if( strtolower($col) === 'password' ) {
                $colIndex['password'] = $index; 
            }
        }

        if( count($colIndex) ) {
            array_shift($allRows);
            try {
                // use column location to fill data
                foreach ($allRows as $row) {
                    $fill = [];
                    if( trim($row[$colIndex['name']]) ) {
                        $fill['name'] = $row[$colIndex['name']];
                    }
                    if( trim($row[$colIndex['email']]) ) {
                        $fill['email'] = $row[$colIndex['email']];
                    }
                    if( isset($colIndex['password']) && trim($row[$colIndex['password']]) ) {
                        $fill['password'] = Hash::make($row[$colIndex['password']]);
                    }

                    switch($request->action) {
                        case 'store':
                            $trx = User::create($fill);
                        break;
                        case 'update':
                            $trx = User::where('email', $fill['email'])->update($fill);
                        break;
                        case 'destroy':
                            $trx = User::where('email', $fill['email'])->delete();
                        break;
                        default: break;
                    }
                }

                $proceed = true;
                $msg = 'Succeed.';
            }
            catch(\Exception $e) {
                // handle error
                // $msg = $e->getMessage();
                if( strpos($e->getMessage(), 'Duplicate entry') ) {
                    if (preg_match("/Duplicate entry '(.*?)' for key/", $e->getMessage(), $match) === 1) {
                        $msg = 'Cannot accept this file, email address <b class="text-red-600">'.$match[1].'</b> is taken.';
                    }
                }
            }
        }

        return response()->json([
            'debug' => $colIndex,
            'debug2' => $allRows[1][$colIndex['email']],
            'message' => $msg,
        ], $proceed ? 200 : 422);
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
