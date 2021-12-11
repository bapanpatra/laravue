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

//Route::get('/', function () {
//    return view('welcome');
//});
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
Route::get('/', 'HomeController@index');
Route::get('/admin', 'HomeController@admin_index');
Route::get('/admin/admin-login', 'HomeController@admin_index');
Route::get('/{anypath}', ['uses' => 'HomeController@index'])->where('path','.*');
Route::get('/admin/{anypath}', ['uses' => 'HomeController@admin_index'])->where('path','.*');
Route::get('/admin/{anypath}/{anypath1}', ['uses' => 'HomeController@admin_index'])->where('path','.*');