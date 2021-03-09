<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
 
Route::group(['middleware' => [ 'auth:api', ]], function() {
    Route::resource('users', 'App\Http\Controllers\UserController');
    Route::post('excel_import', [App\Http\Controllers\UserController::class, 'excelImport']);
});
