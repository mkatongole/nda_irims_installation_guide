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

Route::prefix('clinicaltrials')->group(function() {
    Route::get('/', 'ClinicalTrialsController@index');

    Route::post('saveClinicalTrialApplication', 'ClinicalTrialsController@saveClinicalTrialApplication');

    Route::post('saveClinicalTrialRegistryApplication', 'ClinicalTrialsController@saveClinicalTrialRegistryApplication');

    
    Route::post('saveAltClinicalTrialApplication', 'ClinicalTrialsController@saveAltClinicalTrialApplication');
    
    Route::post('onSaveClinicalStudySite', 'ClinicalTrialsController@onSaveClinicalStudySite');
    Route::post('onsaveclinicaltInvestigatorDetails', 'ClinicalTrialsController@onsaveclinicaltInvestigatorDetails');
    Route::post('onsaveclinicaltSponsorDetails', 'ClinicalTrialsController@onsaveclinicaltSponsorDetails');
    Route::post('onsaveclinicaltMonitorDetails', 'ClinicalTrialsController@onsaveclinicaltMonitorDetails');
    Route::post('onSaveClinicalPersonnel', 'ClinicalTrialsController@onSaveClinicalPersonnel');

    Route::post('saveClinicalCasualityAssessmentDetails', 'ClinicalTrialsController@saveClinicalCasualityAssessmentDetails');
    Route::post('saveClinicalSaeDrugsDetails', 'ClinicalTrialsController@saveClinicalSaeDrugsDetails');
    Route::post('onsaveConcomittantDrugDetails', 'ClinicalTrialsController@onsaveConcomittantDrugDetails');
    Route::post('onsaveRelevantHistoryDetails', 'ClinicalTrialsController@onsaveRelevantHistoryDetails');
    Route::post('onDeleteMisTablePermitdetails', 'ClinicalTrialsController@onDeleteMisTablePermitdetails');
    Route::post('onsaveSaeInvestigationsDetails', 'ClinicalTrialsController@onsaveSaeInvestigationsDetails');
    Route::post('saveClinicalSaeLabTetsDetails', 'ClinicalTrialsController@saveClinicalSaeLabTetsDetails');

    Route::post('onsavePatientInformation', 'ClinicalTrialsController@onsavePatientInformation');

    Route::post('saveiMPProductDetailsDetails', 'ClinicalTrialsController@saveiMPProductDetailsDetails');
    Route::post('saveiMPHandlingProductDetailsDetails', 'ClinicalTrialsController@saveiMPHandlingProductDetailsDetails');
    Route::post('savePlaceboProductDetailsDetails', 'ClinicalTrialsController@savePlaceboProductDetailsDetails');
    Route::post('saveComparatorProductDetailsDetails', 'ClinicalTrialsController@saveComparatorProductDetailsDetails');
    Route::post('onsaveclinicaltrailVariationRequests', 'ClinicalTrialsController@onsaveclinicaltrailVariationRequests');
    Route::post('saveAssessmentReportdetails', 'ClinicalTrialsController@saveAssessmentReportdetails');




        //NON CLINICAL FINDINGS

    Route::post('onSaveNonClincialTrialToxicology', 'ClinicalTrialsController@onSaveNonClincialTrialToxicology');
    Route::post('onsaveToxicityDosage', 'ClinicalTrialsController@onsaveToxicityDosage');
    Route::post('onSaveNonClincialTrialPharmacology', 'ClinicalTrialsController@onSaveNonClincialTrialPharmacology');
    Route::post('onSaveClincialTrialMeasures', 'ClinicalTrialsController@onSaveClincialTrialMeasures');
    Route::get('getNonClinicaltrailToxicologyData', 'ClinicalTrialsController@getNonClinicaltrailToxicologyData');

    Route::get('getCasaultyAssessment', 'ClinicalTrialsController@getCasaultyAssessment');

    Route::post('onSaveClincialTrialProgressReportApplication', 'ClinicalTrialsController@onSaveClincialTrialProgressReportApplication');
    
    Route::post('onsaveStudySiteDetails', 'ClinicalTrialsController@onsaveStudySiteDetails');
    Route::post('onSaveClincialTrialDescriptionApplication', 'ClinicalTrialsController@onSaveClincialTrialDescriptionApplication');
    Route::post('onSaveClincialTrialOthersApplication', 'ClinicalTrialsController@onSaveClincialTrialOthersApplication');
    Route::post('onSaveClincialTrialEthicsApplication', 'ClinicalTrialsController@onSaveClincialTrialEthicsApplication');
    Route::post('onSaveMonitoringApplication', 'ClinicalTrialsController@onSaveMonitoringApplication');
    Route::post('onSaveClincialTrialHistoryApplication', 'ClinicalTrialsController@onSaveClincialTrialHistoryApplication');
    Route::post('onSaveClincialTrialParticipantsApplication', 'ClinicalTrialsController@onSaveClincialTrialParticipantsApplication');
    Route::get('getClinicalApplicationsDetails', 'ClinicalTrialsController@getClinicalApplicationsDetails');
    Route::get('getClinicalTrialSites', 'ClinicalTrialsController@getClinicalTrialSites');
    Route::get('getClinicaltrailinvestigatorsData', 'ClinicalTrialsController@getClinicaltrailinvestigatorsData');
    Route::get('getClinicaltrailMonitorssData', 'ClinicalTrialsController@getClinicaltrailMonitorssData');
    Route::get('getGmpProductLinedetails', 'ClinicalTrialsController@getGmpProductLinedetails');




    Route::get('getClinicaltrailIMPHandlingProdData', 'ClinicalTrialsController@getClinicaltrailIMPHandlingProdData');
    Route::get('getClinicaltrailIMPProdData', 'ClinicalTrialsController@getClinicaltrailIMPProdData');
    Route::get('getClinicalTrialsList', 'ClinicalTrialsController@getClinicalTrialsList');
    Route::get('getClinicaltrailVariationsrequests', 'ClinicalTrialsController@getClinicaltrailVariationsrequests');
    
    Route::get('getRegisteredProductsDetails', 'ClinicalTrialsController@getRegisteredProductsDetails');
    Route::post('saveCtrProgressReportingApplication', 'ClinicalTrialsController@saveCtrProgressReportingApplication');
    Route::post('saveCtrSaeReportingApplication', 'ClinicalTrialsController@saveCtrSaeReportingApplication');
    Route::post('saveCtrOtherReportingApplication', 'ClinicalTrialsController@saveCtrOtherReportingApplication');
    Route::post('onSaveSecondaryIdentifiers', 'ClinicalTrialsController@onSaveSecondaryIdentifiers');
    Route::post('onSaveStudyDesign', 'ClinicalTrialsController@onSaveStudyDesign');
    Route::post('onSaveInterventionDetails', 'ClinicalTrialsController@onSaveInterventionDetails');
    
    // get Renewal summary report
    Route::get('getClinicalSummaryActivityDetails', 'ClinicalTrialsController@getClinicalSummaryActivityDetails');
   Route::get('getClinicalRegulatoryLapseDetails', 'ClinicalTrialsController@getClinicalRegulatoryLapseDetails');
   Route::get('getClinicalDeviationReportDetails', 'ClinicalTrialsController@getClinicalDeviationReportDetails');
   Route::get('getClinicalInspectionReportDetails', 'ClinicalTrialsController@getClinicalInspectionReportDetails');

//Save renewal reports
    Route::post('onsaveSummaryActivity', 'ClinicalTrialsController@onsaveSummaryActivity');
    Route::post('onsaveRegulatorystudyLapse', 'ClinicalTrialsController@onsaveRegulatorystudyLapse');
    Route::post('onsaveDeviationReport', 'ClinicalTrialsController@onsaveDeviationReport');
    Route::post('onsaveInspectionReport', 'ClinicalTrialsController@onsaveInspectionReport');

    Route::post('onSaveClincialTrialSummaryApplication', 'ClinicalTrialsController@onSaveClincialTrialSummaryApplication');

    Route::get('getclinicalStudySitesData', 'ClinicalTrialsController@getclinicalStudySitesData');
    Route::get('getClinicalPersonnelDetails', 'ClinicalTrialsController@getClinicalPersonnelDetails');
    Route::get('getClinicalPersonnelInformation', 'ClinicalTrialsController@getClinicalPersonnelInformation');

    Route::get('getClinicalRegistryDetails', 'ClinicalTrialsController@getClinicalRegistryDetails');
    Route::get('getClinicalRegistryAppData', 'ClinicalTrialsController@getClinicalRegistryAppData');
    Route::get('getClinicalInterventionsDetails', 'ClinicalTrialsController@getClinicalInterventionsDetails');
    Route::get('getClinicalOutcomesDetails', 'ClinicalTrialsController@getClinicalOutcomesDetails');
    

    Route::get('getClinicaltrailSeaDrugs', 'ClinicalTrialsController@getClinicaltrailSeaDrugs');
    Route::get('getClinicaltrailCasualityAssessmentDetails', 'ClinicalTrialsController@getClinicaltrailCasualityAssessmentDetails');
    Route::get('getClinicaltrailSeaLabTest', 'ClinicalTrialsController@getClinicaltrailSeaLabTest');
    Route::get('getClinicaltrailSeaVariations', 'ClinicalTrialsController@getClinicaltrailSeaVariations');
    Route::get('getClinicaltrailconcomittantDetails', 'ClinicalTrialsController@getClinicaltrailconcomittantDetails');
    Route::get('getClinicaltrailRelevantHistoryDetails', 'ClinicalTrialsController@getClinicaltrailRelevantHistoryDetails');


    Route::post('onDeleteClinicalRegistryDetails', 'ClinicalTrialsController@onDeleteClinicalRegistryDetails');
   
    Route::post('onSaveEligibilityCriteria', 'ClinicalTrialsController@onSaveEligibilityCriteria');
    Route::post('onSaveOutcomesDetails', 'ClinicalTrialsController@onSaveOutcomesDetails');
    Route::post('onSaverecruitmentCenter', 'ClinicalTrialsController@onSaverecruitmentCenter');
   
    Route::get('getClinicalRecruiptmentDetails', 'ClinicalTrialsController@getClinicalRecruiptmentDetails');
    Route::get('getClinicalEthicsApprovalDetails', 'ClinicalTrialsController@getClinicalEthicsApprovalDetails');
    Route::get('getClinicaltrailSponsorsData', 'ClinicalTrialsController@getClinicaltrailSponsorsData');
    
    Route::post('onSaveethicsApproval', 'ClinicalTrialsController@onSaveethicsApproval');

    Route::post('onSavefundingSourceDetails', 'ClinicalTrialsController@onSavefundingSourceDetails');
    Route::post('onSaveCollaboratorsDetails', 'ClinicalTrialsController@onSaveCollaboratorsDetails');
    Route::post('onSaveContactPersonDetails', 'ClinicalTrialsController@onSaveContactPersonDetails');
    
    
    Route::get('getClinicalContactPersonsDetails', 'ClinicalTrialsController@getClinicalContactPersonsDetails');
    Route::post('onValidateClinicalTrialApp', 'ClinicalTrialsController@onValidateClinicalTrialApp');
    
    Route::get('getClinicalTrialDiseasesDetails', 'ClinicalTrialsController@getClinicalTrialDiseasesDetails');
    Route::get('getClinicalPatientInformation', 'ClinicalTrialsController@getClinicalPatientInformation');

});
