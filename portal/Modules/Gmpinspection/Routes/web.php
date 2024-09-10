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

Route::prefix('gmpinspection')->group(function() {
    Route::get('/', 'GmpinspectionController@index');
});


// Route::group(['middleware' => 'web', 'prefix' => 'gmpinspection', 'namespace' => 'Modules\Gmpinspection\Http\Controllers'], function()
// {
//     Route::get('/', 'GmpinspectionController@index');
// });

Route::group(['middleware' => 'auth:api', 'prefix' => 'gmpinspection'], function()
{
   
    Route::post('onSaveGmpApplication', 'GmpinspectionController@onSaveGmpApplication');
    Route::post('onSaveRenewalGmpApplication', 'GmpinspectionController@onSaveRenewalGmpApplication');
    
    Route::post('onSaveGmpOtherDetails', 'GmpinspectionController@onSaveGmpOtherDetails');
    Route::post('onSaveGmpContractDetails', 'GmpinspectionController@onSaveGmpContractDetails');
    Route::post('onSavePremisesPersonnel', 'GmpinspectionController@onSavePremisesPersonnel');
    Route::post('onDeletePremisesDetails', 'GmpinspectionController@onDeletePremisesDetails');
    Route::post('onNewGmpApplicationSubmit', 'GmpinspectionController@onNewGmpApplicationSubmit');
    Route::post('onNewPremisesApplicationArchive', 'GmpinspectionController@onNewPremisesApplicationArchive');
    
    Route::post('onSaveInspectionDetails', 'GmpinspectionController@onSaveInspectionDetails');
    Route::post('onSavePersonnelQualification', 'GmpinspectionController@onSavePersonnelQualification');
    Route::post('onSavePremisesAmmendmentsRequest', 'GmpinspectionController@onSavePremisesAmmendmentsRequest');
    Route::post('onSaveGmpProductLinedetails', 'GmpinspectionController@onSaveGmpProductLinedetails');
    Route::post('onSaveGmpHistoryInformation', 'GmpinspectionController@onSaveGmpHistoryInformation');
    Route::post('onDeleteMisTablePermitdetails', 'GmpinspectionController@onDeleteMisTablePermitdetails');


    Route::post('onSavemanufatcuringSiteBlocks', 'GmpinspectionController@onSavemanufatcuringSiteBlocks');
    Route::post('onSaveIntededmanufatcuringActivity', 'GmpinspectionController@onSaveIntededmanufatcuringActivity');

    
    //get 
    Route::get('getGMPOtherDetails', 'GmpinspectionController@getGMPOtherDetails');
    Route::get('getGmpProductLinedetails', 'GmpinspectionController@getGmpProductLinedetails');
    Route::get('getGmpProductLinedetailsDt', 'GmpinspectionController@getGmpProductLinedetailsDt');
    Route::get('getProductLinedetails', 'GmpinspectionController@getProductLinedetails');
    Route::get('getGmpProductLineSurgicaldetails', 'GmpinspectionController@getGmpProductLineSurgicaldetails');

    Route::get('getGmpProductLineSurgicaldetailsDt', 'GmpinspectionController@getGmpProductLineSurgicaldetailsDt');


    Route::get('getManufacturingSiteInformation', 'GmpinspectionController@getManufacturingSiteInformation');
    Route::get('getGmpPreProductLinedetails', 'GmpinspectionController@getGmpPreProductLinedetails');

    
    Route::get('getGmpApplicationLoading', 'GmpinspectionController@getGmpApplicationLoading');
    Route::get('getGMPContractManufacturingDetails', 'GmpinspectionController@getGMPContractManufacturingDetails');
    Route::get('getPremisesArchivedApplicationLoading', 'GmpinspectionController@getPremisesArchivedApplicationLoading');
    
    Route::get('getPersonnelInformations', 'GmpinspectionController@getPersonnelInformations');
    Route::get('getBillingPersonnelInformations', 'GmpinspectionController@getBillingPersonnelInformations');
    Route::get('getgmpApplicationDetails', 'GmpinspectionController@getgmpApplicationDetails');
    Route::get('getPersonnelQualifications', 'GmpinspectionController@getPersonnelQualifications');
    Route::get('getAppSubmissionGuidelines', 'GmpinspectionController@getAppSubmissionGuidelines');
    Route::get('getPremisesDocploads', 'GmpinspectionController@getPremisesDocploads');
    Route::get('getTradersRegisteredPremises', 'GmpinspectionController@getTradersRegisteredPremises');
    Route::get('getTradersRegisteredGMPApplications', 'GmpinspectionController@getTradersRegisteredGMPApplications');
    Route::get('getgmpSurgicalLineDetails', 'GmpinspectionController@getgmpSurgicalLineDetails');

    
    Route::get('checkPendingPremisesRenewal', 'GmpinspectionController@checkPendingPremisesRenewal');
    Route::get('getPremisesAmmendementsRequest', 'GmpinspectionController@getPremisesAmmendementsRequest');
    
    Route::get('getGMPApplicationcounterDetails', 'GmpinspectionController@getGMPApplicationcounterDetails');
   
    
    Route::get('getPremisesPersonnelDetails', 'GmpinspectionController@getPremisesPersonnelDetails');
    Route::get('getManufacturingSiteInformation', 'GmpinspectionController@getManufacturingSiteInformation');

    Route::get('getManufacturingSitePreInformation', 'GmpinspectionController@getManufacturingSitePreInformation');

    
    Route::get('getGmpManufacturingBlocksDetails', 'GmpinspectionController@getGmpManufacturingBlocksDetails');
    Route::get('getPreGmpManufacturingDetails', 'GmpinspectionController@getPreGmpManufacturingDetails');
    Route::get('getGmpInspectionHistoryDetails', 'GmpinspectionController@getGmpInspectionHistoryDetails');

    Route::get('getManufacturingSiteRegisteredProductsData', 'GmpinspectionController@getManufacturingSiteRegisteredProductsData');
    Route::get('getgmpproductDetailsInformationData', 'GmpinspectionController@getgmpproductDetailsInformationData');
    Route::get('getgmpSurgicalproductDetailsInformationData', 'GmpinspectionController@getgmpSurgicalproductDetailsInformationData');

    
    
});


