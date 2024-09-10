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

use Modules\PremiseRegistration\Http\Controllers\PremiseRegistrationController;

Route::group(['middleware' => 'web', 'prefix' => 'premiseregistration'], function () {
    Route::get('/', 'PremiseRegistrationController@index');
    Route::get('/', 'PremiseRegistrationController@index');
    Route::post('uploadApplicationFile', 'PremiseRegistrationController@uploadApplicationFile');
    //REPORTS


    Route::get('previewDoc', 'ReportsController@previewDoc');
    Route::get('printPremiseRegistrationCertificate', 'ReportsController@printPremiseRegistrationCertificate');
    Route::get('printPremiseBusinessPermit', 'ReportsController@printPremiseBusinessPermit');
    Route::get('getManagersReports', 'ReportsController@getManagersReports');

    Route::get('getDrugShopApplicationsAtApproval', 'PremiseRegistrationController@getDrugShopApplicationsAtApproval');

     Route::get('getSIAPremiseRenewalList', 'PremiseRegistrationController@getSIAPremiseRenewalList');

    Route::get('getSIAPremiseApplicationsAtApproval', 'PremiseRegistrationController@getSIAPremiseApplicationsAtApproval');
    
    Route::get('getPremisesApprovedAppList', 'PremiseRegistrationController@getPremisesApprovedAppList');

    Route::get('getDrugShopPreInspectionList', 'PremiseRegistrationController@getDrugShopPreInspectionList');

    Route::get('getSIAPremisePreInspectionList', 'PremiseRegistrationController@getSIAPremisePreInspectionList');
    
    
     Route::get('getPremisePreInspectionList', 'PremiseRegistrationController@getPremisePreInspectionList');


    Route::post('onDeleteOnlineApplicationQueries', 'PremiseRegistrationController@onDeleteOnlineApplicationQueries');

    Route::post('saveApplicationProcessingZone', 'PremiseRegistrationController@saveApplicationProcessingZone');

    Route::post('savePremiseBatchInspectionRecommendation', 'PremiseRegistrationController@savePremiseBatchInspectionRecommendation');

    Route::post('onSavePremisesInspectoreStoreLocationDetails', 'PremiseRegistrationController@onSavePremisesInspectoreStoreLocationDetails');

   Route::post('onSaveDrugShopInspectoreStoreLocationDetails', 'PremiseRegistrationController@onSaveDrugShopInspectoreStoreLocationDetails');


 Route::get('getPremisesInspectionStoreLocationDetails', 'PremiseRegistrationController@getPremisesInspectionStoreLocationDetails');

    Route::get('getDrugShopInspectionStoreLocationDetails', 'PremiseRegistrationController@getDrugShopInspectionStoreLocationDetails');
    Route::get('getPremiseInspectionReport', 'PremiseRegistrationController@getPremiseInspectionReport');
    
});


//API Routes
Route::group(['middleware' => 'auth:api', 'prefix' => 'premiseregistration'], function () {


    Route::get('getOtherPremiseDetails', 'PremiseRegistrationController@getOtherPremiseDetails');

    Route::get('getPremisePharmacist', 'PremiseRegistrationController@getPremisePharmacist');

    Route::get('getPremiseInspectionHistory', 'PremiseRegistrationController@getPremiseInspectionHistory');
    
     Route::get('getPremiseRoomSizes', 'PremiseRegistrationController@getPremiseRoomSizes');

    Route::get('getPremiseRegParamFromModel', 'PremiseRegistrationController@getPremiseRegParamFromModel');
    Route::get('getApplicantsList', 'PremiseRegistrationController@getApplicantsList');
    Route::get('getPremisesList', 'PremiseRegistrationController@getPremisesList');
    Route::get('getLtrPremisesList', 'PremiseRegistrationController@getLtrPremisesList');
    Route::get('getAllPremisesList', 'PremiseRegistrationController@getAllPremisesList');
    
   Route::get('getPremiseProprietorsDetails', 'PremiseRegistrationController@getPremiseProprietorsDetails');


    Route::post('savepremiseRoomSizes', 'PremiseRegistrationController@savepremiseRoomSizes');

  
    
    Route::get('getPremiseApplications', 'PremiseRegistrationController@getPremiseApplications');
    Route::get('getPremiseApplicationsAtApproval', 'PremiseRegistrationController@getPremiseApplicationsAtApproval');
    Route::get('getPremiseOtherDetails', 'PremiseRegistrationController@getPremiseOtherDetails');
    Route::get('getPremisePersonnelDetails', 'PremiseRegistrationController@getPremisePersonnelDetails');

    Route::get('getPremiseDirectorsDetails', 'PremiseRegistrationController@getPremiseDirectorsDetails');
    Route::get('getPremiseStaffDetails', 'PremiseRegistrationController@getPremiseStaffDetails');
    Route::post('savePremiseRegCommonData', 'PremiseRegistrationController@savePremiseRegCommonData');
    Route::post('deletePremiseRegRecord', 'PremiseRegistrationController@deletePremiseRegRecord');
    Route::post('softDeletePremiseRegRecord', 'PremiseRegistrationController@softDeletePremiseRegRecord');
    Route::post('undoPremiseRegSoftDeletes', 'PremiseRegistrationController@undoPremiseRegSoftDeletes');
    Route::post('savePremiseOtherDetails', 'PremiseRegistrationController@savePremiseOtherDetails');
    Route::get('getQueryPrevResponses', 'PremiseRegistrationController@getQueryPrevResponses');
    Route::post('saveApplicationInvoicingDetails', 'PremiseRegistrationController@saveApplicationInvoicingDetails');
    Route::post('removeInvoiceCostElement', 'PremiseRegistrationController@removeInvoiceCostElement');
    Route::get('getApplicationApplicantDetails', 'PremiseRegistrationController@getApplicationApplicantDetails');
    Route::post('saveApplicationPaymentDetails', 'PremiseRegistrationController@saveApplicationPaymentDetails');
    Route::post('removeApplicationPaymentDetails', 'PremiseRegistrationController@removeApplicationPaymentDetails');
    Route::get('getManagerApplicationsGeneric', 'PremiseRegistrationController@getManagerApplicationsGeneric');
    Route::get('getManagerBatchApplicationsGeneric', 'PremiseRegistrationController@getManagerBatchApplicationsGeneric');
    Route::get('getPremApplicationMoreDetails', 'PremiseRegistrationController@getPremApplicationMoreDetails');
    Route::get('getApplicationComments', 'PremiseRegistrationController@getApplicationComments');
    Route::get('getApplicationEvaluationTemplate', 'PremiseRegistrationController@getApplicationEvaluationTemplate');
    Route::post('saveApplicationApprovalDetails', 'PremiseRegistrationController@saveApplicationApprovalDetails');
    Route::post('deleteApplicationInvoice', 'PremiseRegistrationController@deleteApplicationInvoice');
    Route::post('savePremisePersonnelDetails', 'PremiseRegistrationController@savePremisePersonnelDetails');
    Route::post('savePremisePersonnelQualifications', 'PremiseRegistrationController@savePremisePersonnelQualifications');
    Route::get('getPremisePersonnelQualifications', 'PremiseRegistrationController@getPremisePersonnelQualifications');
    Route::post('deletePersonnelQualification', 'PremiseRegistrationController@deletePersonnelQualification');
    Route::post('uploadPersonnelDocument', 'PremiseRegistrationController@uploadPersonnelDocument');
    Route::get('getPersonnelDocuments', 'PremiseRegistrationController@getPersonnelDocuments');
    Route::get('getTraderPersonnel', 'PremiseRegistrationController@getTraderPersonnel');
    Route::post('savePremisePersonnelLinkageDetails', 'PremiseRegistrationController@savePremisePersonnelLinkageDetails');
    Route::get('getInspectionDetails', 'PremiseRegistrationController@getInspectionDetails');
    Route::get('getInspectionInspectors', 'PremiseRegistrationController@getInspectionInspectors');
    Route::get('getInspectorsList', 'PremiseRegistrationController@getInspectorsList');
    Route::post('saveInspectionInspectors', 'PremiseRegistrationController@saveInspectionInspectors');
    Route::post('removeInspectionInspectors', 'PremiseRegistrationController@removeInspectionInspectors');
    Route::post('saveNewReceivingBaseDetails', 'PremiseRegistrationController@saveNewReceivingBaseDetails');

    Route::post('saveNewLicenseReceivingBaseDetails', 'PremiseRegistrationController@saveNewLicenseReceivingBaseDetails');
    
    Route::post('funcAddNewPremisesDetails', 'PremiseRegistrationController@funcAddNewPremisesDetails');
    
    

    Route::post('onSavePremisesStoreLocationDetails', 'PremiseRegistrationController@onSavePremisesStoreLocationDetails');

    Route::get('getPremisesStoreLocationDetails', 'PremiseRegistrationController@getPremisesStoreLocationDetails');

   Route::get('getDrugShopStoreLocationDetails', 'PremiseRegistrationController@getDrugShopStoreLocationDetails');


    Route::post('saveRenewalReceivingBaseDetails', 'PremiseRegistrationController@saveRenewalReceivingBaseDetails');
    Route::post('saveAlterationReceivingBaseDetails', 'PremiseRegistrationController@saveAlterationReceivingBaseDetails');
    Route::post('saveRenewalAlterationReceivingBaseDetails', 'PremiseRegistrationController@saveRenewalAlterationReceivingBaseDetails');

    Route::get('prepareNewPremiseReceivingStage', 'PremiseRegistrationController@prepareNewPremiseReceivingStage');

    Route::get('prepareNewLicensePremiseReceivingStage', 'PremiseRegistrationController@prepareNewLicensePremiseReceivingStage');


    
    Route::get('prepareRenewalPremiseReceivingStage', 'PremiseRegistrationController@prepareRenewalPremiseReceivingStage');
    Route::get('prepareNewPremiseInvoicingStage', 'PremiseRegistrationController@prepareNewPremiseInvoicingStage');
    Route::get('prepareRenewalPremiseInvoicingStage', 'PremiseRegistrationController@prepareRenewalPremiseInvoicingStage');
    Route::get('prepareNewPremisePaymentStage', 'PremiseRegistrationController@prepareNewPremisePaymentStage');
    Route::get('prepareRenewalPremisePaymentStage', 'PremiseRegistrationController@prepareRenewalPremisePaymentStage');
    Route::get('getManagerApplicationsRenewalGeneric', 'PremiseRegistrationController@getManagerApplicationsRenewalGeneric');
    Route::get('getManagerInspectionApplications', 'PremiseRegistrationController@getManagerInspectionApplications');
    Route::get('prepareNewPremiseManagerInspectionStage', 'PremiseRegistrationController@prepareNewPremiseManagerInspectionStage');

    

    Route::get('prepareNewPremiseRegionalEvaluationStage', 'PremiseRegistrationController@prepareNewPremiseRegionalEvaluationStage');
    Route::get('prepareNewPremiseDistrictEvaluationStage', 'PremiseRegistrationController@prepareNewPremiseDistrictEvaluationStage');

    Route::get('prepareNewPremiseLeadEvaluationStage', 'PremiseRegistrationController@prepareNewPremiseLeadEvaluationStage');


    Route::get('prepareNewPremiseEvaluationStage', 'PremiseRegistrationController@prepareNewPremiseEvaluationStage');
    Route::get('prepareRenewalPremiseEvaluationStage', 'PremiseRegistrationController@prepareRenewalPremiseEvaluationStage');
    Route::get('getOnlineApplicationQueries', 'PremiseRegistrationController@getOnlineApplicationQueries');
    Route::post('saveOnlineQueries', 'PremiseRegistrationController@saveOnlineQueries');
    Route::post('saveApplicationChecklistDetails', 'PremiseRegistrationController@saveApplicationChecklistDetails');
    Route::post('syncAlterationAmendmentFormParts', 'PremiseRegistrationController@syncAlterationAmendmentFormParts');
    Route::post('syncAlterationAmendmentOtherParts', 'PremiseRegistrationController@syncAlterationAmendmentOtherParts');
    Route::post('getPremiseComparisonDetails', 'PremiseRegistrationController@getPremiseComparisonDetails');
    Route::get('getApplicationUploadedDocs', 'PremiseRegistrationController@getApplicationUploadedDocs');
    Route::get('getApplicationChecklistQueries', 'PremiseRegistrationController@getApplicationChecklistQueries');
    Route::get('prepareNewOnlineReceivingStage', 'PremiseRegistrationController@prepareNewOnlineReceivingStage');
    Route::post('saveNewAuditingChecklistDetails', 'PremiseRegistrationController@saveNewAuditingChecklistDetails');
    Route::post('savePremiseInspectionDetails', 'PremiseRegistrationController@savePremiseInspectionDetails');
    Route::get('getPremiseContactPersonDetails', 'PremiseRegistrationController@getPremiseContactPersonDetails');
    Route::post('savePremiseCancellationReason', 'PremiseRegistrationController@savePremiseCancellationReason');
    Route::get('getPremiseCancellationReasons', 'PremiseRegistrationController@getPremiseCancellationReasons');
    Route::get('getPremiseWithdrawalApplicationsAtApproval', 'PremiseRegistrationController@getPremiseWithdrawalApplicationsAtApproval');
    Route::get('getPremiseCompareDetails', 'PremiseRegistrationController@getPremiseCompareDetails');
    Route::get('getDismissedPremiseApplications', 'PremiseRegistrationController@getDismissedPremiseApplications');
    Route::post('savePremiseInspectionRecommendation', 'PremiseRegistrationController@savePremiseInspectionRecommendation');
    Route::get('getManagerReviewApplications', 'PremiseRegistrationController@getManagerReviewApplications');
    //Online Applications
    Route::get('getOnlineApplications', 'PremiseRegistrationController@getOnlineApplications');
    Route::get('getOnlineAppPremiseOtherDetails', 'PremiseRegistrationController@getOnlineAppPremiseOtherDetails');
    Route::get('getOnlineAppPremisePersonnelDetails', 'PremiseRegistrationController@getOnlineAppPremisePersonnelDetails');
    Route::get('getOnlineApplicationUploads', 'PremiseRegistrationController@getOnlineApplicationUploads');
    Route::post('saveOnlineApplicationDetails', 'PremiseRegistrationController@saveOnlineApplicationDetails');
    Route::post('updateOnlineApplicationQueryResponse', 'PremiseRegistrationController@updateOnlineApplicationQueryResponse');
    Route::post('rejectOnlineApplicationDetails', 'PremiseRegistrationController@rejectOnlineApplicationDetails');
    Route::post('onOnlineApplicationActionQueries', 'PremiseRegistrationController@onOnlineApplicationActionQueries');

    
    Route::post('savePremiseScheduleInspectionDetails', 'PremiseRegistrationController@savePremiseScheduleInspectionDetails');
    Route::get('getRegisteredPremisesList', 'PremiseRegistrationController@getPremisesList');
    Route::post('linkRegisteredPremisestoInpection', 'PremiseRegistrationController@linkRegisteredPremisestoInpection');
    
    Route::get('getPremisesInspectionDetails', 'PremiseRegistrationController@getPremisesInspectionDetails');
    Route::get('getPremisesinspectionschedulingDetails', 'PremiseRegistrationController@getPremisesinspectionschedulingDetails');
    Route::get('getPremisesInspectionRecommendationDetails', 'PremiseRegistrationController@getPremisesInspectionRecommendationDetails');
    Route::get('getPremisesinspectionreviewrecomdetails', 'PremiseRegistrationController@getPremisesinspectionreviewrecomdetails');
     
    Route::get('getPremisesApprovedinspectiondetails', 'PremiseRegistrationController@getPremisesApprovedinspectiondetails');
    Route::post('saveLegalityofStockprdRemarks', 'PremiseRegistrationController@saveLegalityofStockprdRemarks');
    Route::post('savePremIllegalStockedProducts', 'PremiseRegistrationController@savePremIllegalStockedProducts');
    Route::get('getPremisesIllegalPrdStockDetails', 'PremiseRegistrationController@getPremisesIllegalPrdStockDetails');
      
    Route::get('getPremisesAppList', 'PremiseRegistrationController@getPremisesAppList');
    Route::post('saveAppliationEditionBaseDetails', 'PremiseRegistrationController@saveAppliationEditionBaseDetails');
     Route::post('savePrecheckingecommendationDetails', 'PremiseRegistrationController@savePrecheckingecommendationDetails');
     Route::post('saveTCMeetingDetails', 'PremiseRegistrationController@saveTCMeetingDetails');
     Route::get('preparePremiseRegMeetingStage', 'PremiseRegistrationController@preparePremiseRegMeetingStage');
     Route::get('getPremiseTcReviewMeetingApplications', 'PremiseRegistrationController@getPremiseTcReviewMeetingApplications');
     Route::get('getPremiseRegistrationMeetingApplications', 'PremiseRegistrationController@getPremiseRegistrationMeetingApplications');

     //DrugShop Routes
     Route::get('getDrugShopApplications', 'PremiseRegistrationController@getDrugShopApplications');
     
     Route::get('getSIAApplications', 'PremiseRegistrationController@getSIAApplications');
     
     Route::get('getPremiseIncharge', 'PremiseRegistrationController@getPremiseIncharge');


      Route::get('getDrugShopRenewalList', 'PremiseRegistrationController@getDrugShopRenewalList');
    
});
