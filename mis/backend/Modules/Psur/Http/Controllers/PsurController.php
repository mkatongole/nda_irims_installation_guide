<?php

namespace Modules\Psur\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Modules\Reports\Traits\ReportsTrait;

class PsurController extends Controller
{
    protected $user_id;
    use ReportsTrait;

public function saveNewPsurReceivingBaseDetails(Request $request, $inCall=0)
    {
                $active_application_id = $request->input('application_id');
                $applicant_id = $request->input('applicant_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $section_id = $request->input('section_id');
                $module_id = $request->input('module_id');
                $application_code = $request->input('application_code');
                $sub_module_id = $request->input('sub_module_id');
                $local_agent_id = $request->input('local_applicant_id');
                $user_id= \Auth::user()->id;
                $tra_product_id = $request->input('tra_product_id');
                $psur_type_id = $request->input('psur_type_id');
                $remarks = $request->input('remarks');
                $from_date = $request->input('from_date');
                $to_date = $request->input('to_date');
        
         try {
             DB::beginTransaction();
             $applications_table = 'tra_psur_pbrer_applications';

             if (isset($active_application_id) || isset($application_code)) {
                 
                 $application_params = array(
                    'applicant_id' => $applicant_id,
                    'sourceofsafety_alert_id' => $request->sourceofsafety_alert_id,
                    'psur_type_id' => $request->psur_type_id,
                    'remarks'=> $request->remarks,
                    'from_date'=>$request->from_date,
                    'to_date' => $to_date,
                    'report_approval_date' => $request->report_approval_date,
                    'version_no'=>$request->version_no,
                    'version_no'=>$request->version_no,
                    'data_log_point' => $request->data_log_point,
                    'is_registered_product' => $request->is_registered_product,
                    'product_registration_no' => $request->product_registration_no,
                    'brand_name' => $request->brand_name,
                    'generic_name' => $request->generic_name,
                    'dosage_form_id' => $request->dosage_form_id,
                    'product_strength' => $request->product_strength,
                    'marketing_authorisation_holder' => $request->marketing_authorisation_holder,
                    'marketing_authorisation_address' => $request->marketing_authorisation_address, 
                    'local_technical_representative' => $request->local_technical_representative,
                    'manufacturer_id' => $request->manufacturer_id
                 );
                     if(validateIsNumeric($application_code)){
                        $where_app = array(
                         'application_code' => $application_code,
                         
                         );
                     }else{
                          $where_app = array(
                             'id' => $active_application_id
                             
                         );  
                     }

    
                 if (recordExists($applications_table, $where_app)) {
              
                     $app_details = getPreviousRecords($applications_table, $where_app);
                     
                     if ($app_details['success'] == false) {
                         DB::rollBack();
                         return $app_details;
                     }
                     $app_details = $app_details['results'];
                     
                     $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                     if ($app_res['success'] == false) {
                         DB::rollBack();
                         return $app_res;
                     }
                    
                 }
               
                 $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                 $tracking_no = $app_details[0]['tracking_no'];
                 $reference_no = $app_details[0]['reference_no'];
    
    ;
                     DB::commit();
             } else {
                 //Insert
                 //Application_create
                 $codes_array =  $this->getPsurApplicationReferenceCodes($request);
                 $view_id = generateApplicationViewID();
                 $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id,1, $user_id);
                 $application_code = generateApplicationCode($sub_module_id, $applications_table);
                 $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
          
                 if ($tracking_details['success'] == false) {
                     DB::rollBack();
                     return \response()->json($tracking_details);
                 }
    
                 $tracking_no = $tracking_details['tracking_no'];
                 $reference_no = $tracking_details['tracking_no'];
                 $reference_no = str_replace("TRC", 'NDA', $reference_no);
               
                 $application_params = array(
                    'applicant_id' => $applicant_id,
                    'module_id' => $module_id,
                    'tracking_no' => $tracking_no,
                    'reference_no' => $reference_no,
                    'sub_module_id' => $sub_module_id,
                    'application_code' => $application_code,
                    'section_id' => $section_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'sourceofsafety_alert_id' => $request->sourceofsafety_alert_id,
                    'psur_type_id' => $request->psur_type_id,
                    'remarks'=> $request->remarks,
                    'from_date'=>$request->from_date,
                    'to_date' => $to_date,
                    'report_approval_date' => $request->report_approval_date,
                    'version_no'=>$request->version_no,
                    'international_birth_date' => $request->international_birth_date,
                    'data_log_point' => $request->data_log_point,
                    'is_registered_product' => $request->is_registered_product,
                    'product_registration_no' => $request->product_registration_no,
                    'brand_name' => $request->brand_name,
                    'generic_name' => $request->generic_name,
                    'dosage_form_id' => $request->dosage_form_id,
                    'product_strength' => $request->product_strength,
                    'marketing_authorisation_holder' => $request->marketing_authorisation_holder,
                    'marketing_authorisation_address' => $request->marketing_authorisation_address, 
                    'local_technical_representative' => $request->local_technical_representative,
                    'manufacturer_id' => $request->manufacturer_id
                
            );
               
                 
                
                 $res = insertRecord($applications_table, $application_params, $user_id);

                
                 if(!isset($res['record_id'])){
                     DB::rollBack();
                     return $res;
                 }
                 
                 $active_application_id = $res['record_id'];
                 
                 $submission_params = array(
                     'application_id' => $active_application_id,
                     'view_id' => $view_id,
                     'process_id' => $process_id,
                     'application_code' => $application_code,
                     'tracking_no' => $tracking_no,
                     'reference_no' => $reference_no,
                     'usr_from' => $user_id,
                     'usr_to' => $user_id,
                     'previous_stage' => $workflow_stage_id,
                     'current_stage' => $workflow_stage_id,
                     'module_id' => $module_id,
                     'sub_module_id' => $sub_module_id,
                     'section_id' => $section_id,
                     'application_status_id' => $application_status->status_id,
                     'urgency' => 1,
                     'remarks' => 'Initial save of the application',
                     'date_received' => Carbon::now(),
                     'created_on' => Carbon::now(),
                     'created_by' => $user_id
                 );
                 DB::table('tra_submissions')
                     ->insert($submission_params);            
             }
             DB::commit();
             
             $res['active_application_id'] = $active_application_id;
             $res['process_id'] = $process_id;
             $res['application_code'] = $application_code;
             $res['tracking_no'] = $tracking_no;
             $res['reference_no'] = $reference_no;
             $res['message'] = 'Record Saved Successfully';
             $res['success']=true;
                
                } catch (\Exception $exception) {
             DB::rollBack();
             $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
         } catch (\Throwable $throwable) {
             DB::rollBack();
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
         }
         if($inCall == 1){
             return $res;
         }
         return \response()->json($res);
    }
public function getPsurApplicationReferenceCodes($application_details)
{
    $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');

    $codes_array = array(
        'section_code' => $section_code,
    );

    return $codes_array;
}
public function preparenewPsurReceiving(Request $req)
    {
        $application_id = $req->input('application_id');
        try {
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                  ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->select('t1.*', 't1.id as active_application_id','t2.name as applicant_name', 't2.contact_person',
                    't2.tpin_no', 't2.country_id as app_country_id', 't2.region_id as app_region_id', 't2.district_id as app_district_id', 't2.physical_address as app_physical_address',
                    't2.postal_address as app_postal_address', 't2.telephone_no as app_telephone', 't2.fax as app_fax', 't2.email as app_email', 't2.website as app_website')
                ->where('t1.id', $application_id);
            $results = $qry->first();

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
    public function preparenewPsurAssessment(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_psur_pbrer_applications as t1')
                ->leftJoin('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('par_atc_codes as t5', 't2.atc_code_id', '=', 't5.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*', 't5.name as atc_code', 't5.description as atc_code_description', 't1.id as active_application_id', 't2.brand_name as brand_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                     't4.id as invoice_id', 't4.invoice_no', 't1.product_id as tra_product_id');
            $results = $qry1->first();
            $qry2 = clone $main_qry;
            $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
                ->select('t3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            $ltrDetails = $qry2->first();
            $qry3= clone $main_qry;
            $qry3->leftJoin('tra_psur_evaluation_details as t11', 't1.application_code', '=', 't11.application_code')
                 ->select('t11.*','t11.id as assessment_id');
            $psurAssessmentDetails = $qry3->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
                'psurAssessmentDetails' => $psurAssessmentDetails,
                'message' => 'All is well'
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function onSavePsurAssessmentDetails(Request $request)
    {
        try{
            $table_name= $request->table_name;
            $active_application_code = $request->active_application_code;
            $active_application_id = $request->active_application_id;
            $product_id = $request->product_id;
            $user_id = \Auth::user()->id;
            $post_data = $request->all();  
            $record_id = $request->assessment_id;
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['application_code']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            $post_data['application_code']= $post_data['active_application_code'];
            $post_data['application_id']= $post_data['active_application_id'];
            unset($post_data['active_application_code']);
            unset($post_data['active_application_id']);
            unset($post_data['assessment_id']);
            $app_data = $post_data;
            if(validateIsNumeric($record_id)){
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $where = array(
                    'id'=>$record_id
                );

                 $previous_data = getPreviousRecords('tra_psur_evaluation_details', $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                $previous_data = $previous_data['results'];
                $res = updateRecord('tra_psur_evaluation_details', $previous_data, $where, $app_data, $user_id);
            }else{
                $res = insertRecord('tra_psur_evaluation_details', $app_data);
               
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function getStagePsurApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage = $request->input('workflow_stage_id');
        $process_id = $request->input('process_id');
        $table_name = getTableName($module_id);
        try {  
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                ->leftJoin('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('wf_workflow_stages as t12', 't9.current_stage', 't12.id')
                ->leftJoin('tra_approval_recommendations as t14', 't1.application_code', 't14.application_code')
                ->leftJoin('tra_psur_evaluation_details as t25', 't1.application_code', 't25.application_code')
                ->leftJoin('par_psur_type as t26', 't1.psur_type_id', 't26.id')
                ->select('t1.*','t25.reviewers_final_response','t3.name as applicant_name','t1.application_code as active_application_code','t1.id as active_application_id','t1.from_date as reporting_from','t1.to_date as reporting_to','t2.product_origin_id', 't2.brand_name as product_name', DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by"), 't9.date_received as submitted_on', 't8.name as common_name', 't3.name as applicant_name', 't4.name as application_status',
                     't1.id as active_application_id', 't5.decision_id','t5.approval_date','t5.expiry_date', 't5.id as approval_id', 't12.stage_category_id','t14.decision_id as approval_decision_id'
                    ,'t26.name as report_type')
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0) );

            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }

             if (validateIsNumeric($process_id)) {
                $qry->where('t9.process_id', $process_id);
            }

            $results = $qry->orderBy('t9.id','desc')->groupBy('t1.id')->get();

             foreach ($results as $result) {
                $result->from_date = formatDateWithSuffix($result->from_date);
                $result->to_date = formatDateWithSuffix($result->to_date);
                $result->report_approval_date = formatDateWithSuffix($result->report_approval_date);
                $result->international_birth_date = formatDateWithSuffix($result->international_birth_date);
                $result->data_log_point = formatDateWithSuffix($result->data_log_point);
            }


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

    public function onPsurProductDetails (Request $req){
        try{
            $application_code = $req->application_code;
   

            $qry = DB::table('tra_product_notification_details as t1')
                   ->leftJoin('par_product_type as t2', 't1.product_type_id', '=', 't2.id')
                    ->leftJoin('par_dosage_forms as t3', 't1.dosage_form_id', '=', 't3.id')
                    ->leftJoin('tra_manufacturing_sites as t4', 't1.manufacturer_id', '=', 't4.id')
                     ->leftJoin('par_common_names as t5', 't1.common_name_id', '=', 't5.id')
                   ->select('t1.*','t2.name as product_type','t3.name as dosage_form','t4.name as manufacturer_name','t5.name as generic_name')
                    ->where('t1.application_code', $application_code);
            $results = $qry->get();
            foreach ($results as $result) {
                $result->route_of_administration_id = json_decode($result->route_of_administration_id);
            }
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


    public function getPsurApplicationMoreDetails(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                  ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->select('t1.*', 't1.id as active_application_id','t2.name as applicant_name', 't2.contact_person',
                    't2.tpin_no', 't2.country_id as app_country_id', 't2.region_id as app_region_id', 't2.district_id as app_district_id', 't2.physical_address as app_physical_address',
                    't2.postal_address as app_postal_address', 't2.telephone_no as app_telephone', 't2.fax as app_fax', 't2.email as app_email', 't2.website as app_website')
                ->where('t1.application_code', $application_code);

            $psur_details = $qry->first();

            $res = array(
                'success' => true,
                'psur_details' => $psur_details,
                'branch_id' => 1,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }

    public function getPsurApplicationsAssessmentDetails(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                  ->leftJoin('tra_psur_evaluation_details as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t2.*', 't2.id as assessment_id','t1.id as active_application_id')
                  
                ->where('t1.application_code', $application_code);

            $psur_details = $qry->first();

            $res = array(
                'success' => true,
                'results' => $psur_details,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function getPsurApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = \Auth::user()->id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tpin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*"))
                ->where('t5.stage_status','<>',3)
                ->where('isDone', 0);


            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {

                $qry->where('t7.current_stage', $workflow_stage_id);
            }

            $qry->where('t7.isDone', 0);
            $results = $qry->get();

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

    public function shareFeedBack(Request $request){
        $application_code = $request->input('application_code');
        $selected = $request->input('selected');

        try {
            if (!empty($selected)) {
                $selected_appcodes = json_decode($selected);

                foreach ($selected_appcodes as $application_code) {
                    $this->shareFeedBackAndLog($application_code);
                }
            } else {
                $this->shareFeedBackAndLog($application_code);
            }

            return response()->json(['success' => true, 'message' => 'Report FeedBack shared successfully.']);
        } catch (\Exception $exception) {
            return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
        } catch (\Throwable $throwable) {
            return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
        }
    }

public function shareFeedBackAndLog($application_code){
        $user_id= \Auth::user()->id;
        $where = ['application_code' => $application_code];
        $update = ['is_notified' => 1];
       
        $message = "Kindly find attached feedback as per the following details:";
      
        $message .= "<br/>Feedback  Date:".Carbon::now();

        $subject='ACKNOWLEDGMENT OF RECEIPT OF PBRER';
        $applicant_id = getSingleRecordColValue('tra_psur_pbrer_applications', array('application_code' => $application_code ), 'applicant_id');                                                                  
        $trader_record = getSingleRecord('wb_trader_account', array('id'=>$applicant_id),'mysql');                                           
        if($trader_record){
            $attachement_name = 'Acknowledgement Letter.pdf';
            $attachement =   getcwd() .Config('constants.dms.doc_rootupload').'Feedback' . time() . '.' . 'pdf';

            $request = new Request([
                'application_code' => $application_code,
                                    
            ]);
            $this->printProductNotificationLetter($request, 'notify',$attachement);            
               $response = sendMailNotification($trader_record->name, 'kenedymuthui1@gmail.com',$subject,$message,'','',$attachement,$attachement_name);
               unlink($attachement);

        }

        $res = updateRecordNoPrevious('tra_psur_pbrer_applications', $where, $update);

        if ($res['success']) {
            $data = [
                'application_code' => $application_code,
                'feedback_shared_by' =>$user_id,
                'feedback_shared_on' => Carbon::now()
            ];
            insertRecord('tra_psur_published_logs', $data);
        }
    }


    public function getPreviousPsurReportApplications(Request $request)
    {
        $product_id = $request->input('product_id');
        try {
            $qry = DB::table('tra_psur_pbrer_applications as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('tra_psur_evaluation_details as t25', 't1.application_code', 't25.application_code')
                ->select('t1.*','t2.product_origin_id', 't2.brand_name as product_name','t2.device_brand_name',DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by"), 't9.date_received as submitted_on', 't8.name as common_name', 't3.name as applicant_name', 't4.name as application_status',
                     't1.id as active_application_id','t25.introduction','t25.marketing_approval_status','t25.actions_reporting_interval','t25.reference_safety_information','t25.cumulative_exposure_clinical','t25.cumulative_exposure_marketing','t25.cumulative_summary_clinical','t25.cumulative_summary_marketing','t25.completed_clinical_trials','t25.ongoing_clinical_trials','t25.long_time_followup','t25.other_therapeutic_product_use'
                    ,'t25.safety_data_related_to_fixed_combination_therapies','t25.other_clinical_trials','t25.medication_errors','t25.findings_non_interventional_studies','t25.non_clinical_data','t25.literature','t25.other_periodic_reports','t25.Lack_of_efficacy_in_controlled_ct','t25.late_breaking_information','t25.overview_of_signals','t25.summary_of_safety_concerns','t25.signal_evaluation','t25.evaluation_risks_and_new_information'
                    ,'t25.characterization_of_risks','t25.effectiveness_of_risk_minimization','t25.important_baseline_efficacy','t25.newly_identified_information','t25.characterization_of_benefits','t25.benefit_risk_context','t25.benefit_risk_analysis','t25.questions_comments','t25.overall_conclusion','t25.draft_response','t25.recommendations')
                    ->where('t1.product_id',$product_id);



            $results = $qry->get();
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

}
