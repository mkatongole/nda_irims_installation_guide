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

Route::prefix('premisesregistration')->group(function() {
    Route::get('/', 'PremisesRegistrationController@index');
});

Route::group(['middleware' => ['api', 'cors'], 'prefix' => 'premisesregistration'], function()
{
    Route::get('getPremisesOtherDetails', 'PremisesRegistrationController@getPremisesOtherDetails');
    Route::get('getPremisesPersonnelDetails', 'PremisesRegistrationController@getPremisesPersonnelDetails');
    Route::get('getPremisesStaffDetails', 'PremisesRegistrationController@getPremisesStaffDetails');
    Route::get('getPremisesDirectorsDetails', 'PremisesRegistrationController@getPremisesDirectorsDetails');
    Route::get('getPremisesExternalStoreDetails', 'PremisesRegistrationController@getPremisesExternalStoreDetails');
    Route::get('getClinicalPersonnelDetails', 'PremisesRegistrationController@getClinicalPersonnelDetails');
    Route::get('getPremisesCounterDetails', 'PremisesRegistrationController@getPremisesCounterDetails');
    Route::get('onSearchPublicRegisteredpremises', 'PremisesRegistrationController@onSearchPublicRegisteredpremises');
    Route::get('getPremisesStoreLocationDetails', 'PremisesRegistrationController@getPremisesStoreLocationDetails');
    Route::get('getDrugShopStoreLocationDetails', 'PremisesRegistrationController@getDrugShopStoreLocationDetails');
});
Route::group(['middleware' => 'auth:api', 'prefix' => 'premisesregistration'], function()
{
    Route::post('onSavePremisesApplication', 'PremisesRegistrationController@onSavePremisesApplication');
    Route::post('onSavePremisesStoreLocationDetails', 'PremisesRegistrationController@onSavePremisesStoreLocationDetails');
    Route::post('onSaveDrugShopStoreLocationDetails', 'PremisesRegistrationController@onSaveDrugShopStoreLocationDetails');
    Route::post('onSavePremisesDirectorsDetails', 'PremisesRegistrationController@onSavePremisesDirectorsDetails');
    Route::post('onSaveApprovalRecomDetails', 'PremisesRegistrationController@onSaveApprovalRecomDetails');
    Route::post('onSaveProductNotificationApplication', 'PremisesRegistrationController@onSaveProductNotificationApplication');
    Route::post('onSaveNotificationOtherDetails', 'PremisesRegistrationController@onSaveNotificationOtherDetails');


    Route::post('onSaveRenPremisesApplication', 'PremisesRegistrationController@onSaveRenPremisesApplication');
    Route::post('onSaveClinicalPersonnel', 'PremisesRegistrationController@onSaveClinicalPersonnel');
     Route::post('onSaveDrugShopApplication', 'PremisesRegistrationController@onSaveDrugShopApplication');
    Route::post('onSavePremisesOtherDetails', 'PremisesRegistrationController@onSavePremisesOtherDetails');
    Route::post('onSaveChangedPharmacistDetails', 'PremisesRegistrationController@onSaveChangedPharmacistDetails');
    Route::post('onSavePremisesPersonnel', 'PremisesRegistrationController@onSavePremisesPersonnel');
    Route::post('onSavePremisesStaff', 'PremisesRegistrationController@onSavePremisesStaff');
    Route::post('onSavePremisesholder', 'PremisesRegistrationController@onSavePremisesholder');

    Route::post('onSavePremisesDirectors', 'PremisesRegistrationController@onSavePremisesDirectors');
    Route::post('onSavePremisesExternalStore', 'PremisesRegistrationController@onSavePremisesExternalStore');

    Route::post('onDeletePremisesDetails', 'PremisesRegistrationController@onDeletePremisesDetails');
    Route::post('onNewPremisesApplicationSubmit', 'PremisesRegistrationController@onNewPremisesApplicationSubmit');
    Route::post('onNewPremisesApplicationArchive', 'PremisesRegistrationController@onNewPremisesApplicationArchive');
    
    Route::post('onSavePersonnelDetails', 'PremisesRegistrationController@onSavePersonnelDetails');
    Route::post('onSaveTelephoneDetails', 'PremisesRegistrationController@onSaveTelephoneDetails');
    Route::post('onSavePersonnelQualification', 'PremisesRegistrationController@onSavePersonnelQualification');
    Route::post('onSavePremisesAmmendmentsRequest', 'PremisesRegistrationController@onSavePremisesAmmendmentsRequest');
  
    //get 
    Route::get('getPremisesApplicationLoading', 'PremisesRegistrationController@getPremisesApplicationLoading');
   Route::get('getPremisesApplicationPharmicts', 'PremisesRegistrationController@getPremisesApplicationPharmicts');

    Route::get('getPremisesArchivedApplicationLoading', 'PremisesRegistrationController@getPremisesArchivedApplicationLoading');
    
    Route::get('getPersonnelInformations', 'PremisesRegistrationController@getPersonnelInformations');
    Route::get('getTelephoneDetails', 'PremisesRegistrationController@getTelephoneDetails');
    Route::get('getApplicantIncharge', 'PremisesRegistrationController@getApplicantIncharge');
    Route::get('getSupervisingPharmacist', 'PremisesRegistrationController@getSupervisingPharmacist');
    Route::get('getApplicantInchargeDetails', 'PremisesRegistrationController@getApplicantInchargeDetails');
    Route::get('getApplicantInchargeDetails', 'PremisesRegistrationController@getApplicantInchargeDetails');

    Route::get('getBusinessDetails', 'PremisesRegistrationController@getBusinessDetails');
    Route::get('getNotificationPProdData', 'PremisesRegistrationController@getNotificationPProdData');

    Route::get('getpsurNotificationApplicationLoading', 'PremisesRegistrationController@getpsurNotificationApplicationLoading');


    Route::get('getDirectorsInformations', 'PremisesRegistrationController@getDirectorsInformations');
    Route::get('getStaffInformations', 'PremisesRegistrationController@getStaffInformations');
    Route::get('getOtherPremises', 'PremisesRegistrationController@getOtherPremises');
    Route::get('getPremisesPharmacistDetails', 'PremisesRegistrationController@getPremisesPharmacistDetails');

   Route::get('getpremisesApplicationDetails', 'PremisesRegistrationController@getpremisesApplicationDetails');
   //notification
   Route::get('getNotificationApplicationDetails', 'PremisesRegistrationController@getNotificationApplicationDetails');

   Route::get('getApplicantDetails', 'PremisesRegistrationController@getApplicantDetails');

    Route::get('getPersonnelQualifications', 'PremisesRegistrationController@getPersonnelQualifications');
    Route::get('getBusinessTypeDetails', 'PremisesRegistrationController@getBusinessTypeDetails');
    Route::get('getAppSubmissionGuidelines', 'PremisesRegistrationController@getAppSubmissionGuidelines');
  
    Route::get('getTradersRegisteredPremises', 'PremisesRegistrationController@getTradersRegisteredPremises');

    Route::get('getTradersRegisteredDrugShops', 'PremisesRegistrationController@getTradersRegisteredDrugShops');
    Route::get('getNearestPremises', 'PremisesRegistrationController@getNearestPremises');
    Route::get('getNearestDrugShops', 'PremisesRegistrationController@getNearestDrugShops');
    Route::get('checkPendingPremisesRenewal', 'PremisesRegistrationController@checkPendingPremisesRenewal');
    
    Route::get('getPremisesAmmendementsRequest', 'PremisesRegistrationController@getPremisesAmmendementsRequest');
    
    
    Route::get('IntiateREinspectionResponseProcesses', 'PremisesRegistrationController@IntiateREinspectionResponseProcesses');
    
    
});
