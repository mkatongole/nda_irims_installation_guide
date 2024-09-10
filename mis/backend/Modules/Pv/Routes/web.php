<?php

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
use Modules\Pv\Http\Controllers\PvController;
Route::group(['middleware' => 'web', 'prefix' => 'pv'], function () {
    Route::post('savePvReceivingBaseDetails', [PvController::class, 'savePvReceivingBaseDetails']);
    Route::get('onLoadSuspectedDrugs', [PvController::class, 'onLoadSuspectedDrugs']);
    Route::get('getDashboardApplications', [PvController::class, 'getDashboardApplications']);
    Route::get('prepareNewPvReceivingStage', [PvController::class, 'prepareNewPvReceivingStage']);
    Route::get('getStagePvApplications', [PvController::class, 'getStagePvApplications']);
    Route::get('getPvApplicationMoreDetails', [PvController::class, 'getPvApplicationMoreDetails']);
    Route::post('sendReporterNotification', [PvController::class, 'sendReporterNotification']);
    Route::post('publishReport', [PvController::class, 'publishReport']);
    Route::get('getPvRegisterApplications', [PvController::class, 'getPvRegisterApplications']);
    Route::get('getRelatedProblems', [PvController::class, 'getRelatedProblems']);
    Route::get('onLoadTestProcedures', [PvController::class, 'onLoadTestProcedures']);
    Route::get('onLoadStudyInformation', [PvController::class, 'onLoadStudyInformation']);
    Route::get('getStudyDetails', [PvController::class, 'getStudyDetails']);
    Route::get('onLoadReaction', [PvController::class, 'onLoadReaction']);
    Route::get('onLoadDrugHistory', [PvController::class, 'onLoadDrugHistory']);
    Route::get('onLoadMedicalHistory', [PvController::class, 'onLoadMedicalHistory']);
    Route::get('onLoadPersonnel', [PvController::class, 'onLoadPersonnel']);
    Route::get('onLoadSenderDetails', [PvController::class, 'onLoadSenderDetails']);
    Route::get('getIndication', [PvController::class, 'getIndication']);
    Route::get('getCasaultyAssessment', [PvController::class, 'getCasaultyAssessment']);
    Route::get('getWHOCasaultyAssessment', [PvController::class, 'getWHOCasaultyAssessment']);
    Route::post('saveAssessmentReportdetails', [PvController::class, 'saveAssessmentReportdetails']);
    Route::post('updateAEFICategory', [PvController::class, 'updateAEFICategory']);
    Route::post('saveWHOAssessmentReportdetails', [PvController::class, 'saveWHOAssessmentReportdetails']);
    Route::get('getFacilityList', [PvController::class, 'getFacilityList']);
    Route::get('onLoadFrequentReporters', [PvController::class, 'onLoadFrequentReporters']);

});
//non json calls
Route::group(['prefix' => 'pv','middleware' => ['web']], function() {
    Route::get('exportAdrReport', [PvController::class, 'exportAdrReport']);
});


