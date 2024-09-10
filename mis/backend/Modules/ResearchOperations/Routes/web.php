<?php

use Modules\ResearchOperations\Http\Controllers\ResearchOperationsController;

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

Route::group(['prefix' => 'researchoperations','middleware' => ['web']],function() {
    Route::get('/getResearchOperationsApplications', [ResearchOperationsController::class, 'getResearchOperationsApplications']);
    Route::get('/getGrantApplicationDetails', [ResearchOperationsController::class, 'getGrantApplicationDetails' ]);
    Route::get('/getGrantStatusParams', [ResearchOperationsController::class, 'getGrantStatusParams' ]);
    Route::post('/saveUpdateGrantApplication', [ResearchOperationsController::class, 'saveUpdateGrantApplication']);
    Route::post('/deleteGrantApplication', [ResearchOperationsController::class, 'deleteGrantApplication']);
    Route::get('/getMeetingDetails', [ResearchOperationsController::class, 'getMeetingDetails']);
    Route::get('/getMeetingStatusParams', [ResearchOperationsController::class, 'getMeetingStatusParams']);
    Route::post('/saveNewReceivingBaseDetails', [ResearchOperationsController::class, 'saveNewReceivingBaseDetails']);
    Route::post('/saveThematicArea', [ResearchOperationsController::class, 'saveThematicArea']);
    Route::get('/getMeetingThematicDetails', [ResearchOperationsController::class, 'getMeetingThematicDetails']);
    Route::get('/getManagerRecommendationData', [ResearchOperationsController::class, 'getManagerRecommendationData']);
    Route::get('/getResearchOperationsMeetingDetails', [ResearchOperationsController::class, 'getResearchOperationsMeetingDetails']);
    Route::get('/getResearchOperationsInternalResearch', [ResearchOperationsController::class, 'getResearchOperationsInternalResearch']);
    Route::post('/updateThematicArea', [ResearchOperationsController::class, 'updateThematicArea']);
    Route::post('/saveResearchInnovationTcRecommendationData', [ResearchOperationsController::class, 'saveResearchInnovationTcRecommendationData']);
    Route::get('/getRITcRecommendationData', [ResearchOperationsController::class, 'getRITcRecommendationData']);
    Route::post('/saveIRMDApplicationDetails', [ResearchOperationsController::class, 'saveIRMDApplicationDetails']);
    Route::get('/getManagerApplicationsGeneric', [ResearchOperationsController::class, 'getManagerApplicationsGeneric']);
    Route::post('/saveResearchOperationCommentData', [ResearchOperationsController::class, 'saveResearchOperationCommentData']);
    Route::get('/getInternalResearchApplicationsAtApproval', [ResearchOperationsController::class, 'getInternalResearchApplicationsAtApproval']);
    Route::post('/saveIRApplicationApprovalDetails', [ResearchOperationsController::class, 'saveIRApplicationApprovalDetails']);
});
