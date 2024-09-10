<?php

namespace Modules\ResearchOperations\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Support\Carbon;

class ResearchOperationsController extends Controller
{

    protected $user_id;

    public function __construct(Request $req)
    {
        $is_mobile = $req->input('is_mobile');
        if (is_numeric($is_mobile) && $is_mobile > 0) {
            $this->user_id = $req->input('user_id');
        } else {
            $this->middleware(function ($request, $next) {
                if (!\Auth::check()) {
                    $res = array(
                        'success' => false,
                        'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM !!</p>'
                    );
                    echo json_encode($res);
                    exit();
                }
                $this->user_id = \Auth::user()->id;
                return $next($request);
            });
        }
    }


    public function getResearchOperationsApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_researchoperations_applications as t1')
                // ->join('tra_samplecollection_sites as t2', 't1.sample_site_id', '=', 't2.id')
                // ->join('par_zones as t3', 't1.zone_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                // ->join('par_directorates as t7', 't1.directorate_id', '=', 't7.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t4.name as process_name, t5.name as workflow_stage, t5.is_general,
                    t1.*"))
                ->where('t1.is_dismissed', '<>', 1);
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function getManagerApplicationsGeneric(Request $request){
        $module_id = $request->input('module_id');
        $workflow_stage = $request->input('workflow_stage_id');#endregion
        $secondary_table = $request->input('table_name');
        $table_name = getTableName($module_id);
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('wf_workflow_stages as t12', 't9.current_stage', 't12.id')
                ->leftJoin('mg_recommendations as t13', 't13.application_code', '=', 't1.application_code')
                // ->leftJoin('tra_evaluation_recommendations as t13', function ($join) use($workflow_stage) {
                //     $join->on('t1.application_code', '=', 't13.application_code')
                //         ->on('t12.stage_category_id', '=', 't13.stage_category_id')
                //         ->where('t9.current_stage', $workflow_stage);
                // })
                ->leftJoin('tra_approval_recommendations as t14', 't1.application_code', 't14.application_code')
               ->leftJoin($secondary_table . ' as t15', 't1.irmd_id', 't15.id')
                ->select('t1.*', DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by"), 't9.date_received as submitted_on', 't4.name as application_status',
                    't1.id as active_application_id',
                    't12.stage_category_id','t13.id as recommendation_id','t13.decision_id as recommendation_record_id','t13.comments as remarks','t14.decision_id as approval_decision_id', 
                    't1.treatment as final_recommendation', 
                    't15.research_purpose as research_purpose', 't15.aim_research as aim_research')
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0) );
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function getInternalResearchApplicationsAtApproval(Request $request)
    {
        $table_name = 'tra_researchoperations_applications';
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('mg_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_approval_decisions as t6', 't14.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->join('wf_tfdaprocesses as t7', 't10.process_id', '=', 't7.id')
                ->join('wf_workflow_stages as t8', 't10.current_stage', '=', 't8.id')
                ->leftJoin('users as t11', 't10.usr_from', '=', 't11.id')
                ->leftJoin('users as t12', 't10.usr_to', '=', 't12.id')
                ->leftJoin('tra_internalresearch_details as t15', 't1.irmd_id', '=', 't15.id')
                ->leftJoin('dr_recommendations as t16', 't1.application_code', '=', 't16.application_code')
                ->leftJoin('par_tcmeeting_decisions as t17', 't16.decision_id', '=', 't17.id')
                ->select(
                    't1.*', 't1.id as active_application_id',
                     't4.name as application_status', 't6.name as approval_status',
                     't14.decision_id as recommendation_record_id','t14.comments as manager_comment',
                     't17.name as director_recomm',
                     't16.decision_id as director_recommendation_id','t16.comments as director_comment',
                     't7.name as process_name', 't8.name as workflow_stage', 't8.is_general',
                     't14.id as recommendation_id', 't6.name as recommendation',  
                     DB::raw("CONCAT_WS(' ',decrypt(t11.first_name),decrypt(t11.last_name)) as from_user,
                     CONCAT_WS(' ',decrypt(t12.first_name),
                     decrypt(t12.last_name)) as to_user"),
                     't15.aim_research as aim_research',
                     't15.research_purpose as research_purpose',
                     )
                ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0));
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function saveResearchOperationCommentData(Request $req){
        
        $application_code = $req->input("application_code");
        $table_name = $req->input("table_name");
        $secondary_table = $req->input('model');
        $user_id = $this->user_id;
        $id = $req->input('id');

        try{
            $recommendation_params = array(
                'decision_id' => $req->input("decision_id"),
                'comments' => $req->input("comments"),
                'application_code' => $application_code,
            );
            $recommendation_params['created_on'] = Carbon::now();
            $recommendation_params['created_by'] = $user_id;
            if ($id == '' || $id == null){
                $res = insertRecord($table_name, $recommendation_params, $user_id);
                if($res['success'] == false){
                    return $res;
                }



            }else{
                // FIXME: This is not completely correct
                $where_id = array(
                    'id' => $id,
                );
                if (recordExists($table_name, $where_id)) {
                    $recommendation_params['dola'] = Carbon::now();
                    $recommendation_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where_id);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where_id, $recommendation_params, $user_id);
                }
            }
        }
        catch (Exception $exception){
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }

        return \response()->json($res);

    }

    // public function saveResearchOperationCommentData(Request $req)
    // {
    //     try { 
            
    //         $user_id = \Auth::user()->id;
    //         $post_data = $req->all();
    //         $table_name = $post_data['model'];
    //         $application_code = $post_data['application_code'];

    //         //unset unnecessary values
    //         unset($post_data['_token']);
    //         unset($post_data['table_name']);
    //         unset($post_data['model']);
    //         unset($post_data['id']);
    //         unset($post_data['unset_data']);
    //         $unsetData = $req->input('unset_data');
    //         dd($unsetData);
    //         if (isset($unsetData)) {
    //             $unsetData = explode(",", $unsetData);
    //             $post_data = unsetArrayData($post_data, $unsetData);
    //         }
            
    //         $table_data = $post_data;
    //         //add extra params
    //         $table_data['created_on'] = Carbon::now();
    //         $table_data['created_by'] = $user_id;
    //         $where = array(
    //             'application_code' => $application_code
    //         );
    //         $res = array();
    //         if (isset($application_code) && $application_code != "") {

    //             $res=recordExists($table_name, $where);
    //             if (recordExists($table_name, $where)) {
    //                 unset($table_data['created_on']);
    //                 unset($table_data['created_by']);
    //                 $table_data['dola'] = Carbon::now();
    //                 $table_data['altered_by'] = $user_id;
    //                 $previous_data = getPreviousRecords($table_name, $where);


    //                 if ($previous_data['success'] == false) {
    //                     return $previous_data;
    //                 }
    //                 $previous_data = $previous_data['results'];
    //                 $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                    
    //             }else{
    //                $res = insertRecord($table_name, $table_data, $user_id); 
    //             }
    //         } else {
                
    //             $res = insertRecord($table_name, $table_data, $user_id);
            

    //         }
    //     } catch (\Exception $exception) {
    //         $res = array(
    //             'success' => false,
    //             'message' => $exception->getMessage()
    //         );
    //     } catch (\Throwable $throwable) {
    //         $res = array(
    //             'success' => false,
    //             'message' => $throwable->getMessage()
    //         );
    //     }
    //     return response()->json($res);
    // }


    public function getGrantApplicationDetails(Request $req){
        // $table_name =$req->input('table_name');

        try {
            $results = DB::table('tra_grants')
            ->leftJoin('par_grant_statuses', 'tra_grants.status_id', '=', 'par_grant_statuses.id' )
            ->select('tra_grants.*', 'par_grant_statuses.name as status_name')
            ->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function getManagerRecommendationData(Request $req){
        try{
            $table_name = $req->input('table_name');
            $application_code =  array(
                'application_code' => $req->input('application_code')
            );

            $qry = DB::table($table_name . ' as t1')
            ->where('t1.application_code', $application_code);
            $res = array(
                'success' => true,
               'results' => $qry->first(),
            );
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
        
    }




    public function getGrantStatusParams(Request $req){
        try {
            $results = DB::table('par_grant_statuses')->get();
            $res = array(
              'success' => true,
              'results' => $results,
              'message' => 'All is well!!'
            );
        } catch (\Exception $exception) {
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
              'success' => false,
              'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    
    public function saveUpdateGrantApplication(Request $req){
        try{
            $id=$req->input('id');
            $table_name = $req ->input('table_name'); 
            $user_id = \Auth::user()->id;
            $grant_application_params = array( 
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'website' => $req->input('website'),
                'grant_name' => $req->input('grant_name'),
                'grant_description' => $req->input('grant_description'),
                'grant_reference_no' => $req->input('grant_reference_no'),
                'funding_amount' => $req->input('funding_amount'),
                'project_title' => $req->input('project_title'),
                'project_objectives' => $req->input('project_objectives'),
                'start_date' => $req->input('start_date'),
                'end_date' => $req->input('end_date'),
                'status_id' => $req->input('status_id'),
                'follow_up_actions' => $req->input('follow_up_actions'),
                );

                   
            $where = array(
                'id' => $id
            );
            $res = array();
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    $grant_application_params['dola'] = Carbon::now();
                    $grant_application_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $grant_application_params, $user_id);
                }
            } else {
                $res = insertRecord($table_name, $grant_application_params, $user_id);
            }
            

        }
         catch(\Exception $exception){
            $res = array(
                "success" => false,
                "message" => $exception->getMessage()
            );
        }
        catch(\Throwable $throwable) {
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }    
        return \response()->json($res);
    }


    public function deleteGrantApplication(Request $req){
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }



    public function getMeetingDetails(Request $req)
    {
        try{
            $results = Db::table('tra_research_innovation_meeting_details as t1')
            ->leftJoin('par_meeting_types as t2', 't1.meeting_type_id', '=', 't2.id' )
            ->leftJoin('par_research_innovation_thematic_areas as t3', 't1.area_of_discussion_id', '=', 't3.id')
            ->leftJoin('par_meeting_statuses as t4', 't1.meeting_status_id', '=', 't4.id')
            ->select('t1.*', 't2.name as meeting_type', 't3.name as area_of_discussion', 't4.name as meeting_status')
            ->get();

            $res = array(
              'success' => true,
              'results' => $results,
              'message' => 'All is well!!!'
            );

        }catch(\Exception $exception){
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );

        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }


    public function getMeetingStatusParams(){
        try{
            $results = Db::table('par_meeting_statuses')->get();
            $res = array(
             'success' => true,
             'results' => $results,
             'message' => 'All is well!!'
            );
        }catch(\Exception $exception){
            $res = array(
            'success' => false,
            'message' => $exception->getMessage()
            );
        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        return response()->json($res);

    }

    public function getMeetingTypeParams(){
        try{
            $results = Db::table('par_meeting_types')->get();
            $res = array(
            'success' => true,
            'results' => $results,
            'message' => 'All is well!!'
            );
        }catch(\Exception $exception){
            $res = array(
           'success' => false,
           'message' => $exception->getMessage()
            );
        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }



    public function saveNewReceivingBaseDetails(Request $request){
       

        $application_id = $request->input('application_id');
        $meeting_id = $request->input('id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $zone_id = '';

       
        $user_id = $this->user_id;

        $meeting_details_params = array(
            'meeting_name' => $request->input('meeting_name'),
            'date_requested' => $request->input('date_requested'),
            'meeting_time' => $request->input('meeting_time'),
            'meeting_type_id' => $request->input('meeting_type_id'),
            'meeting_venue' => $request->input('meeting_venue'),
            'meeting_invitation_details' => $request->input('meeting_invitation_details'),
            'meeting_desc' => $request->input('meeting_desc'),
        );
        

        DB::beginTransaction();
        try{
            $meeting_details_table = 'tc_meeting_details';
            $applications_table = 'tra_researchoperations_applications';

            $where_application = array(
                'id' => $application_id
            );
            
            $where_meeting = array(
                'id' => $meeting_id
            );

            if (validateIsNumeric($application_id)){

                $application_params = array(
                    'meeting_id' => $meeting_id
                );

                $app_details = array();


                if(recordExists($meeting_details_table, $where_meeting)) {
                    $meeting_details_params['dola'] = Carbon::now();
                    $meeting_details_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($meeting_details_table, $where_meeting);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $meeting_details_res = updateRecord($meeting_details_table, $previous_data, $where_meeting, $meeting_details_params, $user_id);
                    Db::commit();

                }
                else{
                    $meeting_details_res = insertRecord($meeting_details_table, $meeting_details_params, $user_id);
                    if($meeting_details_res['success']==false){
                        return \response()->json($meeting_details_res);
                    }
                    $meeting_id = $meeting_details_res['record_id'];
                    $application_params['meeting_id'] = $meeting_id;
                    DB::commit();
                }
                
                if(recordExists($applications_table, $where_application)){
                    $app_details = getPreviousRecords($applications_table, $where_application);
                    if ($app_details['success'] == false){
                            return $app_details;
                    }
                    
                    
                    $app_details = $app_details['results'];
                    $application_res = updateRecord($applications_table, $app_details, $where_application, $application_params, $user_id);
                    if($application_res['success'] == false){
                        return $application_res;
                    }

                    Db::commit();
                    $application_res = $application_res['record_id'];
                    
    
                    
                }
                                    
            $application_code = $app_details[0]['application_code'];
            $ref_no = $app_details[0]['reference_no'];

            $res = array(
                'record_id' => $application_res,
                'application_code' => $application_code,
                'meeting_id' => $meeting_id,
                'reference_no' => $ref_no,
                'message' => 'Data updated successfully',
                'success' => true
            );
            

            } else {
                //Create a new  Meeting
                $meeting_details_res = insertRecord($meeting_details_table, $meeting_details_params, $user_id);
                if ($meeting_details_res['success'] == false){
                    return \response()->json($meeting_details_res);
                }
                $meeting_id = $meeting_details_res['record_id'];

                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                $codes_array = array(
                    'sub_module_code' => $sub_module_code
                );

                $view_id = generateApplicationViewID();
                $reference_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id, true);
                //dd($reference_details);
                if ($reference_details['success'] == false) {
                    return \response()->json($reference_details);
                }
                $ref_no = $reference_details['tracking_no'];
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
            
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                if ($application_status->status_id == '') {
                    $res = array(
                        'success' => false,
                        'message' => 'Please set initial application status of the application!!'
                    );
                    return \response()->json($res);

                }
                $application_params = array(
                    'module_id' => $module_id,
                    'view_id' => $view_id,
                    'sub_module_id' => $sub_module_id,
                    'application_code' => $application_code,
                    'meeting_id' => $meeting_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'reference_no' => $ref_no,
                    'stage_id' => 1,
                    "tracking_no" => $ref_no,
                    'application_status_id' => $application_status->status_id
                );

                $res = insertRecord($applications_table, $application_params, $user_id);

                if($res['success'] == false) {
                    return $res;
                }

                $application_id = $res['record_id'];

                $reg_params = array(
                    'tra_surveillance_id' => $application_id,
                    'created_by' => $user_id
                );
                
                createInitialRegistrationRecord('registered_surveillance', $applications_table, $reg_params, $application_id, 'reg_surveillance_id');

                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => 0,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                ); 
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            Db::commit();
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['meeting_id'] = $meeting_id;
            $res['reference_no'] = $ref_no;
        }
        catch(\Exception $exception){
            DB::rollback();
            $res = array(
                "success" => false,
                "message" => $exception->getMessage()
            );
        }
        catch(\Throwable $throwable) {
            Db::rollback();
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }    
        return \response()->json($res);
    }


    public function updateThematicArea(Request $request){
        $meeting_id = $request->input('meeting_id');
        $user_id = $this->user_id;
        $thematic_id = $request->input('thematic_id');
       
        $thematic_params = array(
            "description" =>$request->input('description'),
            "name" => $request->input('name'),
        );
        
        DB::beginTransaction();
        try{
            $thematic_table = $request->input('table_name');
            $where_thematic = array(
                'id' => $thematic_id
            );
           
            if(validateIsNumeric($thematic_id)){
                if(recordExists($thematic_table, $where_thematic)) {
                    $thematic_params['dola'] = Carbon::now();
                    $thematic_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($thematic_table, $where_thematic);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($thematic_table, $previous_data, $where_thematic, $thematic_params, $user_id);
                
                }else {
                    $res = array(
                        'success' => false,
                        'message' => 'Thematic area not found'
                    );
                
                }
            }else {
                $res = array(
                   'success' => false,
                   'message' => 'Thematic area not found'
                );
            }
        } catch(\Exception $e){
            DB::rollback();
            $res = array(
                "success" => false,
                "message" => $e->getMessage()
            );
        } catch(\Throwable $e){
            DB::rollback();
            $res = array(
                "success" => false,
                "message" => $e->getMessage()
            );
        }
    
        DB::commit(); // Commit the transaction after the try-catch block
    
        return \response()->json($res);
    }



    public function saveThematicArea(Request $request){
        $meeting_id = $request->input('meeting_id');
        $user_id = $this->user_id;
        $thematic_table = $request->input('table_name');

        $thematic_params = array(
            "description" => $request->input('description'),
            "name" => $request->input('name'),
            "meeting_id" => $request->input('meeting_id'),
        );

        DB::beginTransaction();
        try{

            $where_meeting = array(
                'id' => $meeting_id
            );
            $thematic_params['dola'] = Carbon::now();
            $thematic_params['created_by'] = $user_id;
            $thematic_params["created_on"] = Carbon::now();

            $res = insertRecord($thematic_table, $thematic_params, $user_id);

            if($res['success'] == false){
                return \response()->json($res);
            }


        }catch(\Exception $exception){
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );

        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        DB::commit();
        return \response()->json($res);

    }



    public function getMeetingThematicDetails (Request $request){

        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        $applications_table = 'tra_researchoperations_applications';

        try{
            $where_application = array(
                "id" => $application_id,
            );
            $application_data = getPreviousRecords($applications_table, $where_application);
            $meeting_id = $application_data ["results"][0]["meeting_id"];

            $qry = Db::table($table_name . ' as t1')
            ->where('t1.meeting_id', $meeting_id)
            ->select('t1.*');
            $results = $qry->get();
            // dd($results);

            $res = array(
              'success' => true,
              'results' => $results,
              'message' => 'All is well!!'
            );


        }catch(\Exception $exception){
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );

        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    


    public function getResearchOperationsMeetingDetails(Request $request) {
        $application_id = $request->input('application_id');
        $table_name = 'tra_researchoperations_applications';

        try{
            $qry = Db::table($table_name . ' as t1')
            ->leftJoin('tc_meeting_details as t2', 't1.meeting_id', '=', 't2.id')
            ->where('t1.id', $application_id)
            ->select('t2.*');
            $results = $qry->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
              );
        }
        catch(\Exception $exception){
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );

        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }

        return \response()->json($res);

    }

    public function getResearchOperationsInternalResearch(Request $request) {
        $application_id = $request->input("application_id");
        $table_name = $request->input("table_name");

        try{
            $qry = Db::table('tra_researchoperations_applications as t1')
            ->leftJoin($table_name . ' as t2', 't1.irmd_id', '=', 't2.id')
            ->where('t1.id', $application_id)
            ->select('t2.*')
            ->first();
            

            $res = array(
                'success' => true,
                'results' => $qry,
                'message' => 'All is well!!'
              );
              
        }catch(\Exception $e){
            $res = array(
                "success" => false,
                "message" => $e->getMessage(),
            );

        }catch(\Throwable $e){
            $res = array(
                "success" => false, 
                "message" => $e->getMessage(),
            );
        }

        return \response()->json($res);
    }


    public function getResearchOperationsMeetingParticipants(Request $request) {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        $applications_table = 'tra_researchoperations_applications';

        try{
            $where_application = array(
                "id" => $application_id,
            );
            $application_data = getPreviousRecords($applications_table, $where_application);
            $meeting_id = $application_data ["results"][0]["meeting_id"];

            $qry = Db::table($table_name . ' as t1')
            ->where('t1.meeting_id', $meeting_id)
            ->select('t1.*');
            $results = $qry->get();

            $res = array(
              'success' => true,
              'results' => $results,
              'message' => 'All is well!!'
            );


        }catch(\Exception $exception){
            $res = array(
              'success' => false,
              'message' => $exception->getMessage()
            );

        }catch(\Throwable $throwable){
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }


    public function saveResearchInnovationTcRecommendationData(Request $req)
    {
        try { 
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['ritc_recommendation_id'];

            
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['ritc_recommendation_id']);
            unset($post_data['unset_data']);
            
            $unsetData = $req->input('unset_data');
         
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $post_data['id'] = $id;
            
            $table_data = $post_data;
           
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
         
            if (isset($id) && $id != "") {

                $res=recordExists($table_name, $where);
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);


                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                    
                }
            } else {

                $res = insertRecord($table_name, $table_data, $user_id);
            

            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function getRITcRecommendationData(Request $request){
        $thematic_id = $request->input('thematic_id');
        $table_name = $request->input('table_name');
        
        try{
            $qry = Db::table($table_name . ' as t1')
            ->where('t1.thematic_id', $thematic_id)
            ->select('t1.*')
            ->first();

            $res = array(
            'success' => true,
            'results' => $qry,
            'message' => 'Data fetched successfully!!'
            );


        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }


    // Ann

    // public function saveApplicantDetails(Request $request)
    // {
    //     try{
            
    //         $posted_array=$request->all();
    //         $active_application_id=$posted_array['active_application_id'];
    //         $module_id=$posted_array['module_id'];
    //         $sub_module_id=$posted_array['sub_module_id'];
    //         $process_id=$posted_array['process_id'];
    //         $section_id=$posted_array['section_id'];
    //         $promotion_material_table='tra_internalresearch_details';
    //         $workflow_stage_id = $posted_array['workflow_stage_id'];
    //         $applicant_id=$posted_array['applicant_id'];
    //         $zone_id=$request->input('zone_id');
            
    //         $user_id = $this->user_id;
        
    //         $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
    //         //$ref_number = generateProductsRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
            
    //         $promotion_material_data=array(
                 
                 
    //             'research_type_id'=>$request->research_type_id,
    //             'aim_research'=>$request->aim_research,
    //             'research_purpose'=>$request->research_purpose,
    //             'project_lead'=>$request->project_lead,
    //             'project_duration'=>$request->project_duration,
    //             'research_objectives'=>$request->research_objectives,
    //             'research_id'=>$request->research_id,
    //             'other_advert_materials'=>$request->other_advert_materials,
    //             'meeting_types_id'=>$request->meeting_types_id,
    //             'other_promotion_meetingtype'=>$request->other_promotion_meetingtype,
    //             'venue_of_exhibition'=>$request->venue_of_exhibition,
    //             'exhibition_start_time'=>$request->exhibition_start_time,
    //             'exhibition_end_time'=>$request->exhibition_end_time,
    //             'description_language'=>$request->description_language,
    //             'applicant_id'=>$request->applicant_id,
    //             'module_id'=>$module_id,
    //             'sub_module_id'=>$sub_module_id,
    //             'workflow_stage_id'=>$request->workflow_stage_id
 
                            
    //         );
           
        
    //         if(validateIsNumeric($active_application_id)){
    //             //update
    //             $promotion_material_data['dola'] = Carbon::now();
    //             $promotion_material_data['altered_by'] = $user_id;
    //             $where_app = array(
    //                 'id' => $active_application_id
    //             );
    //             $previous_data = getPreviousRecords($promotion_material_table, $where_app);
    //             if ($previous_data['success'] == false) {
    //                 return $previous_data;
    //             }
    //             $previous_data = $previous_data['results'];
    //             $tracking_no = $previous_data[0]['tracking_no'];
                
    //             $application_code = $previous_data[0]['application_code'];
                
    //             $promotion_material = updateRecord($promotion_material_table, $previous_data, $where_app, $promotion_material_data, $user_id);
                
    //         }else{
                
    //             //insert
    //             $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
    //             $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
    //             $codes_array = array(
    //                     'section_code' => $section_code,
    //                     'zone_code' => $zone_code
    //                 );
                
    //             $application_code = generateApplicationCode($sub_module_id, $promotion_material_table);
    //             $application_status_id = getApplicationInitialStatus($module_id, $sub_module_id)->status_id;
                
    //             $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1,$codes_array, $process_id, $zone_id, $user_id);
                
    //             $promotion_material_data['created_by'] = $user_id;
    //             $tracking_no = $tracking_details['tracking_no'];
    //             $view_id = generateApplicationViewID();
                
    //             $promotion_material_data['application_code'] = $application_code;
    //             $promotion_material_data['application_status_id'] = 1;
    //             $promotion_material_data['tracking_no'] = $tracking_no;
    //             $promotion_material_data['view_id'] = $view_id;
    //            $promotion_material =insertRecord($promotion_material_table, $promotion_material_data, $user_id);
             
    //             if ($promotion_material['success'] == false) {
    //                 return \response()->json($promotion_material);
    //             }
                
    //             //track  application
    //             $active_application_id=$promotion_material['record_id'];
                
    //                     //add to submissions table
    //                     $submission_params = array(
    //                         'application_id' => $active_application_id,
    //                         'process_id' => $process_id,
    //                         'application_code' => $application_code,
    //                         //'reference_no' => $ref_number,
    //                         'tracking_no'=>$tracking_no,
    //                         'usr_from' => $user_id,
    //                         'view_id'=>$view_id,
    //                         'usr_to' => $user_id,
    //                         'previous_stage' => $workflow_stage_id,
    //                         'current_stage' => $workflow_stage_id,
    //                         'module_id' => $module_id,
    //                         'sub_module_id' => $sub_module_id,
    //                         'section_id' => $section_id,
    //                         'application_status_id' => $application_status_id,
    //                         'urgency' => 1,
    //                         'applicant_id' => $applicant_id,
    //                         'remarks' => 'Initial save of the application',
    //                         'date_received' => Carbon::now(),
    //                         'created_by' => $user_id
    //                     );
                        
                        

    //         insertRecord('tra_submissions', $submission_params, $user_id);
            
            
            
    //     }
    //      if(validateIsNumeric($active_application_id)){
   
    //                       $meeting_typedata = array();
    //                     $meeting_types_id = json_decode($request->meeting_types_id);
    //                       DB::table('tra_promotionmeetingtypes_details')->where(array('application_id'=>$active_application_id))->delete();
                          
    //                       if(is_array($meeting_types_id)){
                             
    //                           foreach($meeting_types_id as $meeting_type_id){
                                                          
    //                                   $meeting_typedata[] = array('meeting_type_id'=>$meeting_type_id, 
    //                                                   'application_id'=>$active_application_id, 
    //                                                   'created_by'=>$user_id,
    //                                                   'created_on'=>Carbon::now());
      
    //                           }
    //                           DB::table('tra_promotionmeetingtypes_details')->insert($meeting_typedata);
      
    //                       }
    //                       $promotions_material_id = json_decode($request->promotions_material_id);
    //                       DB::table('tra_promotion_materials_details')->where(array('application_id'=>$active_application_id))->delete();
    //                       $material_detailsdata = array();
                            
    //                       if(is_array($promotions_material_id)){
    //                           foreach($promotions_material_id as $promotion_material_id){
                                                          
    //                                   $material_detailsdata[] = array('material_id'=>$promotion_material_id, 
    //                                                   'application_id'=>$active_application_id, 
    //                                                   'created_by'=>$user_id, 
    //                                                   'created_on'=>Carbon::now());
      
    //                           }
    //                           DB::table('tra_promotion_materials_details')->insert($material_detailsdata);
      
    //                       }
    //                       $advertisement_channels_id = json_decode($request->advertisement_channels_id);
    //                       DB::table('tra_promotion_advertisement_channels')->where(array('application_id'=>$active_application_id))->delete();
    //                       $material_detailsdata = array();
                            
    //                       if(is_array($advertisement_channels_id)){
    //                           foreach($advertisement_channels_id as $advertisement_channel_id){
                                                          
    //                                   $material_detailsdata[] = array('advertisement_channel_id'=>$advertisement_channel_id, 
    //                                                   'application_id'=>$active_application_id, 
    //                                                   'created_by'=>$user_id, 
    //                                                   'created_on'=>Carbon::now());
      
    //                           }
    //                           DB::table('tra_promotion_advertisement_channels')->insert($material_detailsdata);
      
    //                       }
    //                      }
        
    //       $res['record_id'] = $active_application_id;
    //       $res['process_id'] = $process_id;
    //       $res['application_code'] = $application_code;
         
    //       $res['message'] = 'Application Saved Successfully';
    //       $res['tracking_no'] = $tracking_no;
    //       $res['success']=true;
        
    //     }catch (\Exception $exception) {
    //             $res = array(
    //                 'success' => false,
    //                 'message' => $exception->getMessage()
    //             );
    //     } catch (\Throwable $throwable) {
    //             $res = array(
    //                 'success' => false,
    //                 'message' => $throwable->getMessage()
    //             );
    //     }
        
    //      return \response()->json($res);
        
        
        
        
    // }

    public function saveIRMDApplicationDetails(Request $request){
       // Internal REsearch Meeting Details == irmd

        $application_id = $request->input('active_application_id');
        $irmd_id = $request->input('internal_research_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $zone_id = '';

       
        $user_id = $this->user_id;
        

        $irmd_params = array(
            'research_type_id' => $request->input('research_type_id'),
            'aim_research' => $request->input('aim_research'),
            'research_purpose' => $request->input('research_purpose'),
            'project_lead' => $request->input('project_lead'),
            'project_duration' => $request->input('project_duration'),
            'research_objectives' => $request->input('research_objectives'),
            'research_id' => $request->input('research_id'),
            'other_advert_materials' => $request->input('other_advert_materials'),
            'meeting_types_id' => $request->input('meeting_types_id'),
            'other_promotion_meetingtype' => $request->input('other_promotion_meetingtype'),
            'venue_of_exhibition' => $request->input('venue_of_exhibition'),
            'description_language' => $request->input('description_language'),
        );
        

        DB::beginTransaction();
        try{
            $irmd_table = 'tra_internalresearch_details';
            $applications_table = 'tra_researchoperations_applications';

            $where_application = array(
                'id' => $application_id
            );
            
            $where_irmd = array(
                'id' => $irmd_id
            );

            if (validateIsNumeric($application_id)){

                $application_params = array(
                    'irmd_id' => $irmd_id
                );

                $app_details = array();


                if(recordExists($irmd_table, $where_irmd)) {
                    $irmd_params['dola'] = Carbon::now();
                    $irmd_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($irmd_table, $where_irmd);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $irmd_res = updateRecord($irmd_table, $previous_data, $where_irmd, $irmd_params, $user_id);
                    Db::commit();

                }
                else{
                    $irmd_res = insertRecord($irmd_table, $irmd_params, $user_id);
                    if($irmd_res['success']==false){
                        return \response()->json($irmd_res);
                    }
                    $irmd_id = $irmd_res['record_id'];
                    $application_params['irmd_id'] = $irmd_id;
                    DB::commit();
                }
                
                if(recordExists($applications_table, $where_application)){
                    $app_details = getPreviousRecords($applications_table, $where_application);
                    if ($app_details['success'] == false){
                            return $app_details;
                    }
                    
                    
                    $app_details = $app_details['results'];
                    $application_res = updateRecord($applications_table, $app_details, $where_application, $application_params, $user_id);
                    if($application_res['success'] == false){
                        return $application_res;
                    }

                    Db::commit();
                    $application_res = $application_res['record_id'];
                    
    
                    
                }
                                    
            $application_code = $app_details[0]['application_code'];
            $ref_no = $app_details[0]['reference_no'];

            $res = array(
                'record_id' => $application_res,
                'application_code' => $application_code,
                'irmd_id' => $irmd_id,
                'reference_no' => $ref_no,
                'message' => 'Data updated successfully',
                'success' => true
            );
            

            } else {
                //Create a new  Meeting
                $irmd_res = insertRecord($irmd_table, $irmd_params, $user_id);
                if ($irmd_res['success'] == false){
                    return \response()->json($irmd_res);
                }
                $irmd_id = $irmd_res['record_id'];

                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                $codes_array = array(
                    'sub_module_code' => $sub_module_code
                );

                $view_id = generateApplicationViewID();
                $reference_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id, true);

                if ($reference_details['success'] == false) {
                    return \response()->json($reference_details);
                }
                $ref_no = $reference_details['tracking_no'];
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
            
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                if ($application_status->status_id == '') {
                    $res = array(
                        'success' => false,
                        'message' => 'Please set initial application status of the application!!'
                    );
                    return \response()->json($res);

                }
                $application_params = array(
                    'module_id' => $module_id,
                    'view_id' => $view_id,
                    'sub_module_id' => $sub_module_id,
                    'application_code' => $application_code,
                    'irmd_id' => $irmd_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'reference_no' => $ref_no,
                    'stage_id' => 1,
                    "tracking_no" => $ref_no,
                    'application_status_id' => $application_status->status_id
                );

                $res = insertRecord($applications_table, $application_params, $user_id);

                if($res['success'] == false) {
                    return $res;
                }

                $application_id = $res['record_id'];

                $reg_params = array(
                    'tra_surveillance_id' => $application_id,
                    'created_by' => $user_id
                );
                
                createInitialRegistrationRecord('registered_surveillance', $applications_table, $reg_params, $application_id, 'reg_surveillance_id');

                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => 0,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                ); 
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            Db::commit();
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['irmd_id'] = $irmd_id;
            $res['reference_no'] = $ref_no;
        }
        catch(\Exception $exception){
            DB::rollback();
            $res = array(
                "success" => false,
                "message" => $exception->getMessage()
            );
        }
        catch(\Throwable $throwable) {
            Db::rollback();
            $res = array(
                "success" => false,
                "message" => $throwable->getMessage()
            );
        }    
        return \response()->json($res);
    }





}
