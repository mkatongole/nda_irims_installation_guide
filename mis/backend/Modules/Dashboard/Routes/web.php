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
use Modules\Dashboard\Http\Controllers\DashboardController;

Route::group(['middleware' => ['web'], 'prefix' => 'dashboard'], function(){
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('getInTrayItems', [DashboardController::class, 'getInTrayItems']);
    Route::get('getOutTrayItems', [DashboardController::class, 'getOutTrayItems']);
    Route::get('getSystemGuidelines', [DashboardController::class, 'getSystemGuidelines']);
    Route::post('saveDashCommonData', [DashboardController::class, 'saveDashCommonData']);
    Route::get('getDispatchedCorrespondence', [DashboardController::class, 'getDispatchedCorrespondence']);
    Route::get('getCorrespondence', [DashboardController::class, 'getCorrespondence']);
    Route::post('dispatchCorrespondence', [DashboardController::class, 'dispatchCorrespondence']);
    Route::get('getOnlineApplicationDashboard', [DashboardController::class, 'getOnlineApplicationDashboard']);
    Route::get('getApplicationSummaryIntrayItems', [DashboardController::class, 'getApplicationSummaryIntrayItems']);
    Route::get('getExternalUserInTrayItems', [DashboardController::class, 'getExternalUserInTrayItems']);
    Route::get('getOnlineAppsSubmissionCounter', [DashboardController::class, 'getOnlineAppsSubmissionCounter']);
    Route::get('getDashApplicationGraphSummaryDetails', [DashboardController::class, 'getDashApplicationGraphSummaryDetails']);
    Route::get('getApplicationAssaignmentCount', [DashboardController::class, 'getApplicationAssaignmentCount']);
    Route::get('getTodoListItems', [DashboardController::class, 'getTodoListItems']);
    Route::post('saveTodo', [DashboardController::class, 'saveTodo']);

    Route::get('getDashApplicationSummaryDetails', [DashboardController::class, 'getDashApplicationSummaryDetails']);
    Route::get('getApplicationSummaryOverDueTrayItems', [DashboardController::class, 'getApplicationSummaryOverDueTrayItems']);
    Route::get('getOverDueTrayItems', [DashboardController::class, 'getOverDueTrayItems']);
    Route::get('getDashRevenueGraphSummaryDetails', [DashboardController::class, 'getDashRevenueGraphSummaryDetails']);
    Route::get('getDashRevenueSummaryDetails', [DashboardController::class, 'getDashRevenueSummaryDetails']);
    Route::get('getExternalOutTrayItems', [DashboardController::class, 'getExternalOutTrayItems']);
    Route::get('getScheduledTcMeetingDetails', [DashboardController::class, 'getScheduledTcMeetingDetails']);
    Route::post('checkAssignmentDefination', [DashboardController::class, 'checkAssignmentDefination']);
    Route::get('getApplicationAssaignmentRecords', [DashboardController::class, 'getApplicationAssaignmentRecords']);
    Route::get('getAssaignmentApplications', [DashboardController::class, 'getAssaignmentApplications']);
    Route::get('getUserCompletedAssPerformancSummary', [DashboardController::class, 'getUserCompletedAssPerformancSummary']);
    Route::get('getUserCompletedAssignments', [DashboardController::class, 'getUserCompletedAssignments']);
    Route::get('getActiveUserCompletedAssignments', [DashboardController::class, 'getActiveUserCompletedAssignments']);
    Route::get('exportDashboard', [DashboardController::class, 'exportDashboard']);
    Route::get('getOnlineImportExportManagerReviewApplications', [DashboardController::class, 'getOnlineImportExportManagerReviewApplications']);
    Route::get('getAssignedFasttrackApplications', [DashboardController::class, 'getAssignedFasttrackApplications']);
    Route::get('checkFastTrackApplications', [DashboardController::class, 'checkFastTrackApplications']);

});




    

    
    
