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
Route::get('login', [App\Http\Controllers\AuthController::class, 'index_login']);
Route::get('register', [App\Http\Controllers\AuthController::class, 'index_register']);
 
Route::group(['middleware' => [ 'auth', ]], function() {
    Route::get('users', [App\Http\Controllers\UserController::class, 'index']);
});
