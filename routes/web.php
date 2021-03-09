<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
    // return view('welcome');
});

Route::get('custom-js/{jsPath}', [App\Http\Controllers\JsController::class, 'index'])->name('custom-js');
Route::get('register', [App\Http\Controllers\AuthController::class, 'index_register']);
Route::get('login', [App\Http\Controllers\AuthController::class, 'index_login']);

// set session access_token so front-end javascript can get it
Route::get('login_redirect', [App\Http\Controllers\AuthController::class, 'loginRedirect']);

Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
 
// routes for authenticated
Route::group(['middleware' => [ 'auth.passport', ]], function() {
    Route::get('users', [App\Http\Controllers\UserController::class, 'index']);
});
