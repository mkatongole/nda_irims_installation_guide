<?php

namespace Modules\ResearchOperations\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ResearchOperationsTrait
{
    public function saveIRRecommendationDetails(Request $request)
    {
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');

        $qry = DB::table($table_name)
            ->where('application_code', $application_code);
        $app_details = $qry->first();
        $res = array();
        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details, &$res) {
                $UpdateParams = array();
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = $request->input('approval_date');
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
				$sub_module_id = $app_details->sub_module_id;

                $user_id = $this->user_id;

                $update_activity_data = array(
                    'is_manager_approved'=>1
                );
                $where_activity= array(
                    'application_code'=>$application_code
                );
                $where_summary = array(
                    'active_application_code'=>$application_code
                );
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'decision_id' => $decision_id,
                    'comment' => $comment,
                    'approval_date' => $approval_date,
                    'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                $UpdateParams['permit_issue_date'] = $approval_date;
                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 2), 'reference_format_id');
                if (validateIsNumeric($id)) {
                    //update
                    $where = array(
                        'id' => $id
                    );
                    $params['dola'] = Carbon::now();
                    $params['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords('tra_approval_recommendations', $where);
                    if ($prev_data['success'] == false) {
                        return \response()->json($prev_data);
                    }
                    $prev_data_results = $prev_data['results'];
                    $prev_decision_id = $prev_data_results[0]['decision_id'];
                    $prev_data_results[0]['record_id'] = $id;
                    $prev_data_results[0]['update_by'] = $user_id;
                    $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                    unset($prev_data_results[0]['id']);
                    DB::table('tra_approval_recommendations_log')
                        ->insert($prev_data_results);
                    if ($decision_id == 1) {
						$UpdateParams['reference_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        // if ($prev_decision_id != 1) {
                        //     $certificate_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id,$sub_module_id);
                        //     $params['certificate_no'] = $certificate_no;
                        // }
                    } else {
                        $UpdateParams['reference_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['certificate_no'] = '';
                        $params['certificate_no'] = null;
                    }
                    $previous_data = getPreviousRecords('tra_approval_recommendations', $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord('tra_approval_recommendations', $previous_data, $where, $params, $user_id);
                    
                } else {
                    //insert
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    if ($decision_id == 1) {
                        $UpdateParams['reference_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        //permits
                        // $certificate_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id,$sub_module_id);
                        // $params['certificate_no'] = $certificate_no;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $UpdateParams['reference_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['certificate_no'] = '';
                        $params['expiry_date'] = null;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                   // dd($res);
                    $id = $res['record_id'];
                }

				$UpdateParams['validity_status'] = $validity_status_id;
				$UpdateParams['registration_status'] = $registration_status_id;

                    if($decision_id == 1){
                        $portal_status_id = 10;
                        //dd($workflow_stage_id);
                        if($sub_module_id==106){
                            if ($workflow_stage_id==1296){

                                $previous_data = getPreviousRecords('par_joint_activities_details', $where_activity);
                                if ($previous_data['success'] == false) {
                                    return $previous_data;
                                }
                                $previous_data = $previous_data['results'];
                                $res2 = updateRecord('par_joint_activities_details', $previous_data, $where_activity, $update_activity_data, $user_id);
                                
                            }
                            else if($workflow_stage_id==1299){
                                $previous_data = getPreviousRecords('par_operation_summary', $where_summary);
                                if ($previous_data['success'] == false) {
                                    return $previous_data;
                                }
                                $previous_data = $previous_data['results'];
                                $res3 = updateRecord('par_operation_summary', $previous_data, $where_summary, $update_activity_data, $user_id);
                              //  dd($res3);
                            }
                            else{
                            }
                           
                        }
                        else{

                        }
                    }
                    else{
                        $portal_status_id = 11;
                    }
                    

            }, 5);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;
	}
}