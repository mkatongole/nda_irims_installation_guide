<?php

use Modules\MobileApp\Http\Controllers\MobileAppController;
//Route::group(['middleware' => ['web'], 'prefix' => 'mobileapp'], function(){
Route::group(['middleware' => ['web'], 'prefix' => 'mobileapp'], function(){
	//reusable routes
	Route::get('getCommonParamFromTable', [MobileAppController::class,'getCommonParamFromTable']);
    Route::get('getFromTable', [MobileAppController::class,'getFromTable']);
    Route::post('saveToTable', [MobileAppController::class,'saveToTable']);

    //specific routes
	Route::get('getPremiseApplications', [MobileAppController::class,'getPremiseApplications']);
	Route::get('getInspectionRecommendations', [MobileAppController::class,'getInspectionRecommendations']);
	Route::get('getInspectionDetails', [MobileAppController::class,'getInspectionDetails']);
	Route::get('checkpremisdata', [MobileAppController::class,'checkpremisdata']);
	Route::get('getpremisesProd', [MobileAppController::class,'getpremisesProd']);
	Route::get('getpremisesProducts', [MobileAppController::class,'getpremisesProducts']);
	Route::get('checkPoeApplication', [MobileAppController::class,'checkPoeApplication']);
    Route::get('getAgentDetails', [MobileAppController::class,'getAgentDetails']);
	Route::post('authenticateMisMobileUser', [MobileAppController::class,'authenticateMisMobileUser']);
	Route::post('saveInspectionRecommendation', [MobileAppController::class,'saveInspectionRecommendation']);
    Route::post('getImportPermitDetails', [MobileAppController::class,'getImportPermitDetails']);
	Route::post('saveApplicationPoeProductDetails', [MobileAppController::class,'saveApplicationPoeProductDetails']);
	Route::post('submitpoe', [MobileAppController::class,'submitpoe']);
});

