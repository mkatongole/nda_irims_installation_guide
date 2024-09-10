<?php

use Illuminate\Http\Request;
use Modules\APIIntegrations\Http\Controllers\NewIntegrationsController;

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

Route::middleware('auth:api')->get('/apiintegrations', function (Request $request) {
    return $request->user();
});

//Handle Intial Sync
Route::get('exportwhodata', [NewIntegrationsController::class, 'exportwhodata']);
Route::get('syncwhodata', [NewIntegrationsController::class, 'syncwhodata']);