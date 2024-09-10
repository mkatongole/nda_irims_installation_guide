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

Route::prefix('productregistration')->group(function() {
    Route::get('/', 'ProductRegistrationController@index');
    
});

Route::group(['middleware' => 'api', 'prefix' => 'productregistration'], function()
{
    Route::get('onSearchPublicRegisteredproducts', 'ProductRegistrationController@getSearchPublicRegisteredproducts');
    Route::get('onValidateProductOtherdetails', 'ProductRegistrationController@onValidateProductOtherdetails');
    
});

Route::group(['middleware' => 'auth:integration', 'prefix' => 'productregistration'], function()
{
    Route::get('getProductApplications', 'ProductRegistrationController@getProductApplications');
    Route::get('getLocaAgentProductApplications', 'ProductRegistrationController@getLocaAgentProductApplications');
    
    
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'productregistration'], function()
{
    
    Route::post('onSaveProductApplication', 'ProductRegistrationController@onSaveProductApplication');
    Route::post('onSaveGroupedApplicationdetails', 'ProductRegistrationController@onSaveGroupedApplicationdetails');

    
    Route::post('onSaveRenAltProductApplication', 'ProductRegistrationController@onSaveRenAltProductApplication');
    Route::post('onSaveWithdrawalProductApplication', 'ProductRegistrationController@onSaveWithdrawalProductApplication');
    Route::post('onSaveProductOtherDetails', 'ProductRegistrationController@onSaveProductOtherDetails');
    Route::post('onSaveProductQualitySummaryDetails', 'ProductRegistrationController@onSaveProductQualitySummaryDetails');

    //QOS
    Route::post('onSaveProductQualitySummary', 'ProductRegistrationController@onSaveProductQualitySummary');
    Route::post('onSaveProductGeneralQiSDetails', 'ProductRegistrationController@onSaveProductGeneralQiSDetails'); 
    Route::post('onSaveProductManufQiSDetails', 'ProductRegistrationController@onSaveProductManufQiSDetails'); 
    Route::post('onSaveProductCharacterQiSDetails', 'ProductRegistrationController@onSaveProductCharacterQiSDetails'); 
    Route::post('onSaveProductControlAPIQiSDetails', 'ProductRegistrationController@onSaveProductControlAPIQiSDetails');
    Route::post('onSaveProductReferQiSDetails', 'ProductRegistrationController@onSaveProductReferQiSDetails');
    //end
    Route::post('onDeleteProductsDetails', 'ProductRegistrationController@onDeleteProductsDetails');
    Route::post('onAddManufacturingSite', 'ProductRegistrationController@onAddManufacturingSite');
    Route::post('onNewProductsApplicationSubmit', 'ProductRegistrationController@onNewProductsApplicationSubmit');
    Route::post('onSaveMedicalProductNotification', 'ProductRegistrationController@onSaveMedicalProductNotification');
    Route::get('getProductsNutrients', 'ProductRegistrationController@getProductsNutrients');
    
    Route::get('getQualitySummaryReport', 'ProductRegistrationController@getQualitySummaryReport');
    Route::get('getQualitySummaryTemplateReport', 'ProductRegistrationController@getQualitySummaryTemplateReport');
   Route::get('getDiluentPackagingDetails', 'ProductRegistrationController@getDiluentPackagingDetails');


    Route::get('getProductsCommonName', 'ProductRegistrationController@getProductsCommonName');

    Route::get('getProductsIngredients', 'ProductRegistrationController@getProductsIngredients');
    Route::get('getProductApplicationInformation', 'ProductRegistrationController@getProductApplicationInformation');
    Route::get('getproductPackagingDetails', 'ProductRegistrationController@getproductPackagingDetails');
    Route::get('getManufacturingSiteInformation', 'ProductRegistrationController@getManufacturingSiteInformation');
    Route::get('getManufacturersInformation', 'ProductRegistrationController@getManufacturersInformation');
    Route::get('getproductFPPManufactureringData', 'ProductRegistrationController@getproductFPPManufactureringData');

    Route::get('getproductManufactureringData', 'ProductRegistrationController@getproductManufactureringData');
    Route::get('getAPIproductManufactureringData', 'ProductRegistrationController@getAPIproductManufactureringData');
    Route::get('getTraderInformationDetails', 'ProductRegistrationController@getTraderInformationDetails');
    Route::get('getProductsCounterDetails', 'ProductRegistrationController@getProductsCounterDetails');
    Route::get('getGmpInspectionsdetails', 'ProductRegistrationController@getGmpInspectionsdetails');
  
    Route::get('getProductsGMPInspectionDetails', 'ProductRegistrationController@getProductsGMPInspectionDetails');
    
    Route::get('getprodStatesRegistrationsData', 'ProductRegistrationController@getprodStatesRegistrationsData');
    Route::get('getotherStatesGmpInspectionsData', 'ProductRegistrationController@getotherStatesGmpInspectionsData');

    Route::get('onSearchRegisteredProductApplication', 'ProductRegistrationController@onSearchRegisteredProductApplication');
    Route::get('getProductSampleStageInformation', 'ProductRegistrationController@getProductSampleStageInformation');
    Route::get('getSampleSubmissionDetails', 'ProductRegistrationController@getSampleSubmissionDetails');
    
    Route::get('getproductNotificationsApps', 'ProductRegistrationController@getproductNotificationsApps');
    
    Route::get('getProductNotificationsInformation', 'ProductRegistrationController@getProductNotificationsInformation');
    
    Route::get('getgmpProductLineDatadetails', 'ProductRegistrationController@getgmpProductLineDatadetails');
    Route::get('onValidateBrandNameDetails', 'ProductRegistrationController@onValidateBrandNameDetails');
    
    Route::get('getGroupedProductApplicationInformation', 'ProductRegistrationController@getGroupedProductApplicationInformation');
    Route::get('getGroupedProductApplicationsSub', 'ProductRegistrationController@getGroupedProductApplicationsSub');
    

//QUOS


    Route::get('getProductsQualitySummaryDetails', 'ProductRegistrationController@getProductsQualitySummaryDetails');
    Route::get('getElucidationCharacterisation', 'ProductRegistrationController@getElucidationCharacterisation');
    Route::get('getImpuritiesCharacterisation', 'ProductRegistrationController@getImpuritiesCharacterisation');
    Route::get('getContainerClosureSystems', 'ProductRegistrationController@getContainerClosureSystems');
    Route::get('getContainerClosureSystem', 'ProductRegistrationController@getContainerClosureSystems');
    Route::get('getApiSpecification', 'ProductRegistrationController@getApiSpecification');
    Route::get('getBatchAnalyses', 'ProductRegistrationController@getBatchAnalyses');
    Route::get('getExcipientControl', 'ProductRegistrationController@getExcipientControl');
    Route::get('getSpecificationDetails', 'ProductRegistrationController@getSpecificationDetails');
    Route::get('getBatchAnalysesDetails', 'ProductRegistrationController@getBatchAnalysesDetails');
    Route::get('getImpuritiesDetails', 'ProductRegistrationController@getImpuritiesDetails');
    Route::get('getDossierOverage', 'ProductRegistrationController@getDossierOverage');
    Route::get('getDecriptionComposition', 'ProductRegistrationController@getDecriptionComposition');
    Route::get('getActiveIngredient', 'ProductRegistrationController@getActiveIngredient');
    Route::get('getDossierFormulation', 'ProductRegistrationController@getDossierFormulation');
    Route::get('getDossierOverage', 'ProductRegistrationController@getDossierOverage');
    Route::get('getProductsNomenclature', 'ProductRegistrationController@getProductsNomenclature');
    Route::get('getProductsGeneralProperties', 'ProductRegistrationController@getProductsGeneralProperties');
    Route::get('getProductsManufacturingName', 'ProductRegistrationController@getProductsManufacturingName');
    Route::get('getControlMaterials', 'ProductRegistrationController@getControlMaterials');
    Route::get('getCriticolControlData', 'ProductRegistrationController@getCriticolControlData');
    Route::get('getProductsManufacturingInfo', 'ProductRegistrationController@getProductsManufacturingInfo');
    Route::get('getDecriptionManufacturing', 'ProductRegistrationController@getDecriptionManufacturing');
    Route::get('getProductsSummaryInformation', 'ProductRegistrationController@getProductsSummaryInformation');
    Route::get('getReferenceStandards', 'ProductRegistrationController@getReferenceStandards');
    Route::get('getReferenceStandard', 'ProductRegistrationController@getReferenceStandard');
    Route::get('getStabilitySummary', 'ProductRegistrationController@getStabilitySummary');
    Route::get('getPostApprovalStability', 'ProductRegistrationController@getPostApprovalStability');
    Route::get('getStabilityDossierSummary', 'ProductRegistrationController@getStabilityDossierSummary');
    Route::get('getPostApproval', 'ProductRegistrationController@getPostApproval');

});

