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
use Modules\GvpApplications\Http\Controllers\GvpApplicationsController;
Route::group(['prefix' => 'gvpapplications','middleware' => ['auth:api', 'web']], function() {
    Route::get('/', [GvpApplicationsController::class, 'index']);
    
    Route::get('checkGvpInspectionScheduleDates', [GvpApplicationsController::class, 'checkGvpInspectionScheduleDates']);
    Route::post('deleteGvpUnnestedData', [GvpApplicationsController::class, 'deleteGvpUnnestedData']);
    Route::post('saveGvpSitesContractManufacturers', [GvpApplicationsController::class, 'saveGvpSitesContractManufacturers']);
    Route::get('getGvpContractManufacturerDetails', [GvpApplicationsController::class, 'getGvpContractManufacturerDetails']);
    Route::post('getIndexGvpContractManufacturerDetails', [GvpApplicationsController::class, 'getIndexGvpContractManufacturerDetails']);
    
    Route::get('getGvpApplicationParamFromModel', [GvpApplicationsController::class, 'getGvpApplicationParamFromModel']);
    Route::post('saveGvpApplicationCommonData', [GvpApplicationsController::class, 'saveGvpApplicationCommonData']);
    Route::post('deleteGvpApplicationRecord', [GvpApplicationsController::class, 'deleteGvpApplicationRecord']);
    Route::post('saveGVPOnlineAssessmentdetails', [GvpApplicationsController::class, 'saveGVPOnlineAssessmentdetails']);
    
    Route::post('saveInspectionDates', [GvpApplicationsController::class, 'saveInspectionDates']);
    Route::get('getGvpApplications', [GvpApplicationsController::class, 'getGvpApplications']);
    Route::get('getManagerApplicationsGeneric', [GvpApplicationsController::class, 'getManagerApplicationsGeneric']);
    Route::get('getManagerInspectionApplications', [GvpApplicationsController::class, 'getManagerInspectionApplications']);
    Route::get('getGvpInspectionSchedulingApplications', [GvpApplicationsController::class, 'getGvpInspectionSchedulingApplications']);
    Route::get('getTCMeetingSchedulingApplications', [GvpApplicationsController::class, 'getTCMeetingSchedulingApplications']);
    Route::get('getTCMeetingSchedulingReviewApplications', [GvpApplicationsController::class, 'getTCMeetingSchedulingReviewApplications']);
    Route::get('/onLoadManufacturingSitesDetails', [GvpApplicationsController::class, 'onLoadManufacturingSitesDetails']);


 Route::get('getManufacturingSiteGvpInspectionLineDetails', [GvpApplicationsController::class, 'getManufacturingSiteGvpInspectionLineDetails']);

    Route::get('getGvpApplicationsAtApproval', [GvpApplicationsController::class, 'getGvpApplicationsAtApproval']);
    Route::post('saveNewGvpReceivingBaseDetails', [GvpApplicationsController::class, 'saveNewGvpReceivingBaseDetails']);
    Route::post('saveRenewalGvpReceivingBaseDetails', [GvpApplicationsController::class, 'saveRenewalGvpReceivingBaseDetails']);
    //start prepare
    Route::get('prepareNewGvpReceivingStage', [GvpApplicationsController::class, 'prepareNewGvpReceivingStage']);
    Route::get('prepareNewGvpInvoicingStage', [GvpApplicationsController::class, 'prepareNewGvpInvoicingStage']);
    Route::get('prepareNewGvpPaymentStage', [GvpApplicationsController::class, 'prepareNewGvpPaymentStage']);
    Route::get('prepareNewGvpChecklistsStage', [GvpApplicationsController::class, 'prepareNewGvpChecklistsStage']);
    Route::get('prepareNewGvpSmfUploadsStage', [GvpApplicationsController::class, 'prepareNewGvpSmfUploadsStage']);
    Route::get('prepareNewGvpManagerInspectionStage', [GvpApplicationsController::class, 'prepareNewGvpManagerInspectionStage']);
    //end prepare
    Route::get('getSitePersonnelDetails', [GvpApplicationsController::class, 'getSitePersonnelDetails']);
    Route::get('getSiteOtherDetails', [GvpApplicationsController::class, 'getSiteOtherDetails']);
    Route::get('getSiteBlockDetails', [GvpApplicationsController::class, 'getSiteBlockDetails']);
    Route::post('saveSiteOtherDetails', [GvpApplicationsController::class, 'saveSiteOtherDetails']);
    Route::get('getGvpCommonParams', [GvpApplicationsController::class, 'getGvpCommonParams']);
    Route::post('saveGvpInspectionLineDetails', [GvpApplicationsController::class, 'saveGvpInspectionLineDetails']);
    Route::get('getGvpInspectionLineDetails', [GvpApplicationsController::class, 'getGvpInspectionLineDetails']);
    Route::post('saveApplicationApprovalDetails', [GvpApplicationsController::class, 'saveApplicationApprovalDetails']);
    Route::get('getGvpApplicationMoreDetails', [GvpApplicationsController::class, 'getGvpApplicationMoreDetails']);
    Route::get('getManufacturingSitesList', [GvpApplicationsController::class, 'getManufacturingSitesList']);
    Route::get('getManSitesList', [GvpApplicationsController::class, 'getManSitesList']);
    Route::get('getOnlineApplications', [GvpApplicationsController::class, 'getOnlineApplications']);
    Route::get('prepareNewGvpOnlineReceivingStage', [GvpApplicationsController::class, 'prepareNewGvpOnlineReceivingStage']);
    Route::get('getOnlineAppGvpPersonnelDetails', [GvpApplicationsController::class, 'getOnlineAppGvpPersonnelDetails']);
    Route::get('getOnlineAppGvpOtherDetails', [GvpApplicationsController::class, 'getOnlineAppGvpOtherDetails']);
    Route::get('getOnlineProductLineDetails', [GvpApplicationsController::class, 'getOnlineProductLineDetails']);
    Route::get('getGvpScheduleTeamDetails', [GvpApplicationsController::class, 'getGvpScheduleTeamDetails']);
    Route::post('saveGvpScheduleInspectionTypes', [GvpApplicationsController::class, 'saveGvpScheduleInspectionTypes']);
    Route::get('getGvpScheduleInspectionTypes', [GvpApplicationsController::class, 'getGvpScheduleInspectionTypes']);
    Route::post('saveGvpScheduleInspectors', [GvpApplicationsController::class, 'saveGvpScheduleInspectors']);
    Route::get('getGvpScheduleInspectors', [GvpApplicationsController::class, 'getGvpScheduleInspectors']);
    Route::get('getAssignedGvpInspections', [GvpApplicationsController::class, 'getAssignedGvpInspections']);
    Route::get('getGvpApplicationsForInspection', [GvpApplicationsController::class, 'getGvpApplicationsForInspection']);
    Route::post('addGvpApplicationsIntoInspectionSchedule', [GvpApplicationsController::class, 'addGvpApplicationsIntoInspectionSchedule']);
    Route::post('addGvpApplicationIntoInspectionSchedule', [GvpApplicationsController::class, 'addGvpApplicationIntoInspectionSchedule']);
    Route::post('saveGvpProductInfoLinkage', [GvpApplicationsController::class, 'saveGvpProductInfoLinkage']);
    Route::post('updateGvpProductInfoLinkage', [GvpApplicationsController::class, 'updateGvpProductInfoLinkage']);
    Route::get('getGvpProductInfoLinkage', [GvpApplicationsController::class, 'getGvpProductInfoLinkage']);
    Route::get('getGvpProductInfoLinkageOnline', [GvpApplicationsController::class, 'getGvpProductInfoLinkageOnline']);
    Route::post('saveManSitePersonnelLinkageDetails', [GvpApplicationsController::class, 'saveManSitePersonnelLinkageDetails']);
    Route::post('updateGvpApplicationsInspectionType', [GvpApplicationsController::class, 'updateGvpApplicationsInspectionType']);
    Route::get('getNonComplianceObservations', [GvpApplicationsController::class, 'getNonComplianceObservations']);
    Route::post('saveGvpDeskReviewScheduleDetails', [GvpApplicationsController::class, 'saveGvpDeskReviewScheduleDetails']);
    Route::get('getPreviousProductLineDetails', [GvpApplicationsController::class, 'getPreviousProductLineDetails']);
    Route::get('getGvpWithdrawalApplicationsAtApproval', [GvpApplicationsController::class, 'getGvpWithdrawalApplicationsAtApproval']);
    Route::get('getGvpCompareDetails', [GvpApplicationsController::class, 'getGvpCompareDetails']);
    Route::get('getDismissedGvpApplications', [GvpApplicationsController::class, 'getDismissedGvpApplications']);
    Route::get('getGvpApprovedApplications', [GvpApplicationsController::class, 'getGvpApprovedApplications']);
    Route::get('getAllGvpApplications', [GvpApplicationsController::class, 'getAllGvpApplications']);
    Route::post('saveGvpEditAppBaseDetails', [GvpApplicationsController::class, 'saveGvpEditAppBaseDetails']);
    Route::get('getGvpBusinessTypes', [GvpApplicationsController::class, 'getGvpBusinessTypes']);
    Route::get('getGvpApprovedApplicationsRegister', [GvpApplicationsController::class, 'getGvpApprovedApplicationsRegister']);
    Route::get('getManufacturingSiteGvpInspectionLineDetails', [GvpApplicationsController::class, 'getManufacturingSiteGvpInspectionLineDetails']);
    Route::post('saveGvpproductlinedetails', [GvpApplicationsController::class, 'saveGvpproductlinedetails']);



});

