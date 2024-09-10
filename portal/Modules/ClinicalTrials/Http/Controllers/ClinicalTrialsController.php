<?php

namespace Modules\ClinicalTrials\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ClinicalTrialsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        
    }
    public function getRegisteredClincialTrials($reg_clinical_trial_id){
            $sql = DB::connection('mis_db')->table('registered_clinical_trials as t1')
                        ->leftjoin('tra_clinical_trial_applications as t2', 't1.tra_clinical_trial_id', '=','t2.id')
                        ->select('t2.*')
                        ->where(array('t1.id'=>$reg_clinical_trial_id))
                        ->first();
        
        if(!$sql){
            return \response()->json(array('success'=>false, 'message'=>'Registered Clinical Trial Not Found, contact system admin!!'));
        }
        else{
            return $sql;
        }
    }
    public function saveCtrProgressReportingApplication(Request $req){
            try {
                $resp = '';
                $application_id = $req->application_id;
                $trader_id = $req->trader_id;
                $email = $req->email;
                $trader_email = $req->trader_email;
                $section_id = $req->section_id;
                $module_id = $req->appmodule_id;
                $sub_module_id = $req->sub_module_id;
        
                $tracking_no = $req->tracking_no;
                $clinical_prodsection_id = $req->clinical_prodsection_id;
                $phase_id = $req->phase_id;
                $zone_id = $req->zone_id;
                
                $application_code = $req->application_code;
                
                $reg_clinical_trial_id = $req->reg_clinical_trial_id;
                
                $reportingapp_data  = array('reporting_start_date'=>$req->reporting_start_date,
                                            'reporting_end_date'=>$req->reporting_end_date,
            
                                            'clinicalreport_type_id'=>$req->clinicalreport_type_id,
                                            'actualstudy_date'=>$req->actualstudy_date,
                                            'screen_participants'=>$req->screen_participants,
                                            'dateof_first_screening'=>$req->dateof_first_screening,
                                            'target_sample_size'=>$req->target_sample_size,
                                            'enrolled_participants'=>$req->enrolled_participants,
                                            'dateof_first_enrollment'=>$req->dateof_first_enrollment,
                                            'number_of_dropouts'=>$req->number_of_dropouts,
                                            'number_lost_tofollow_ups'=>$req->number_lost_tofollow_ups,
                                            'inclusion_criteria'=>$req->inclusion_criteria,
                                            'exclusion_criteria'=>$req->exclusion_criteria,
                                            'number_of_saes'=>$req->number_of_saes,
                                            'events_of_medialimportance'=>$req->events_of_medialimportance,
                                            'protocol_deviations'=>$req->protocol_deviations,
                                            'clinicalstudy_status_id'=>$req->clinicalstudy_status_id,
                                            'study_site_id'=>$req->study_site_id
                                    );       
               
                            $sub_module_id = $req->sub_module_id;
                    
                            $table_name = 'wb_clinical_trial_applications';
                            if(validateIsNumeric($application_id)){
                                
                                $where_app = array('application_id'=>$application_id);
        
                                    if (recordExists('wb_clinicaltrial_progressreports', $where_app)) {
                                        
                                        $app_data['altered_by'] = $trader_email;
                                        $app_data['dola'] = Carbon::now();
                                    
                                        $previous_data = getPreviousRecords('wb_clinicaltrial_progressreports', $where_app);
                                        
                                        $resp =   updateRecord('wb_clinicaltrial_progressreports', $previous_data, $where_app, $reportingapp_data, $trader_email);
                                        
                                $where_app = array('id'=>$application_id);
                                        
                                        $previous_data = getPreviousRecords('wb_clinical_trial_applications', $where_app);
                                     $application_code = $previous_data['results'][0]['application_code'];
                                    
                                }
                            }
                            else{
                                $rec = $this->getRegisteredClincialTrials($reg_clinical_trial_id);

                                $app_data = array('section_id'=>$req->section_id,
                                                'sub_module_id'=>$req->sub_module_id,
                                                'module_id'=>$req->appmodule_id,
                                                'section_id'=>$section_id,
                                                'phase_id'=>$rec->phase_id,
                                                'sponsor_id'=>$rec->sponsor_id,
                                                'investigator_id'=>$rec->investigator_id,
                                                'protocol_no'=>$rec->protocol_no,
                                                'version_no'=>$rec->version_no,
                                                'reg_clinical_trial_id'=>$reg_clinical_trial_id,
                                                'date_of_protocol'=>formatDate($rec->date_of_protocol),
                                                'study_start_date'=>formatDate($rec->study_start_date),
                                                'study_end_date'=>$rec->study_end_date,
                                                'clearance_no'=>$rec->clearance_no,
                                                'study_duration'=>$rec->study_duration,
                                                'study_title'=>$rec->study_title,
                                                'duration_desc'=>$rec->duration_desc,
                                                'zone_id'=>$req->zone_id,
                                                'clinical_prodsection_id'=>$rec->clinical_prodsection_id,
                                                'phase_id'=>$rec->phase_id,
                                                'applicant_id'=>$trader_id,
                                                'trader_id'=>$trader_id
                                    );
                               
                                     $record = '';
                                
                                    $app_data['created_on'] = Carbon::now();
                                    
                                    $app_data['date_added'] = Carbon::now();
                                    $app_data['created_by'] = $trader_email;
                                    
                                    
                                    $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                  
                                    
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                
                                    $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                    
                                    $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                    $prev_refno = getSingleRecordColValue('tra_clinical_trial_applications', array('reg_clinical_trial_id' => $reg_clinical_trial_id,'sub_module_id'=>10), 'reference_no','mis_db');

                                        
                                    $application_code = generateApplicationCode($sub_module_id, 'wb_clinical_trial_applications');
                                    $codes_array = array(
                                        'section_code' => $section_code,
                                        'zone_code' => $zone_code,
                                        'prev_refno'=>$prev_refno
                                    );

                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }
                                        $app_data['tracking_no'] =   $tracking_no;
                                        $app_data['application_status_id'] =   1;
                                        $app_data['application_code'] =   $application_code;
                                        $app_data['date_added'] =  Carbon::now();
                                                    
                                                $resp = insertRecord('wb_clinical_trial_applications', $app_data, $trader_email);

                                                $record_id = $resp['record_id'];
                                                $application_id = $record_id;
                                                if($resp['success']){
                                                  // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                                   saveApplicationSubmissionDetails($application_code,$table_name);   
                                                }
                                 //save the other details for the clinical trial reporting 
                                 $reportingapp_data['application_id'] = $application_id;
                                 insertRecord('wb_clinicaltrial_progressreports', $reportingapp_data, $trader_email);
                                                
                            }
                            if($resp['success']){
                                $res = array('tracking_no'=>$tracking_no,
                                            'application_id'=>$application_id,
                                            'application_code'=>$application_code,
                                            'module_id'=>$module_id,
                                            'sub_module_id'=>$sub_module_id,
                                            'success'=>true,
                                            'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                            
                            }
                            else{
                                $res = array(
                                'success'=>false,
                                'success1'=>$resp,
                                'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                            }
        
                                
                            
            } catch (\Exception $exception) {
                $res = array(
                    'success' => false,
                    'message1'=>$resp,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,'message1'=>$resp,
                    'message' => $throwable->getMessage()
                );
            }
            
            return response()->json($res);

    }
public function saveCtrSaeReportingApplication(Request $req){
            try {
                $resp = '';
                $application_id = $req->application_id;
                $trader_id = $req->trader_id;
                $email = $req->email;
                $trader_email = $req->trader_email;
                $section_id = $req->section_id;
                $module_id = $req->appmodule_id;
                $sub_module_id = $req->sub_module_id;
        
                $tracking_no = $req->tracking_no;
                $clinical_prodsection_id = $req->clinical_prodsection_id;
                $phase_id = $req->phase_id;
                $zone_id = $req->zone_id;
                
                $application_code = $req->application_code;
                
                $reg_clinical_trial_id = $req->reg_clinical_trial_id;
                
                $reportingapp_data  = array(
                                      'sourceofpsur_id'=>$req->sourceofpsur_id,
                                      'report_category_id'=>$req->report_category_id,
                                      'report_type_id'=>$req->report_type_id,
                                      'initial_receive_date'=>$req->initial_receive_date,
                                      'report_date'=>$req->report_date,
                                      'adr_reporter_category_id'=>$req->adr_reporter_category_id,
                                      'adr_type_id'=>$req->adr_type_id,
                                      'species'=>$req->species,
                                      'breed'=>$req->breed,
                                      'animal_status_id'=>$req->animal_status_id,
                                      'humanvet_contact_id'=>$req->humanvet_contact_id,
                                      'patient_name'=>$req->patient_name,
                                      'title_id'=>$req->title_id,
                                      'gender_id'=>$req->gender_id,
                                      'device_operator_id'=>$req->device_operator_id,
                                      'local_supplier'=>$req->local_supplier,
                                      'software_version'=>$req->software_version,
                                      'catalogue_number'=>$req->catalogue_number,
                                      'serial_number'=>$req->serial_number,
                                      'model_number'=>$req->model_number,
                                      'device_location_id'=>$req->device_location_id,
                                      'last_menstruation_date'=>$req->last_menstruation_date,
                                      'is_pregnant'=>$req->is_pregnant,
                                      'is_lactating'=>$req->is_lactating,
                                      'date_of_birth'=>$req->date_of_birth,

                                      'study_arm'=>$req->study_arm,
                                      'medra_term_id'=>$req->medra_term_id,
                                      'sae_onset_date'=>$req->sae_onset_date,
                                      'stop_date'=>$req->stop_date,
                                      'ongoing_id'=>$req->ongoing_id,
                                      'site_awareness_date'=>$req->site_awareness_date,
                                      'sae_narative'=>$req->sae_narative,


                                      'patient_age'=>$req->patient_age,
                                      'age_group_id'=>$req->age_group_id,
                                      'patient_weight'=>$req->patient_weight,
                                      'patient_height'=>$req->patient_height,
                                      'bmi'=>$req->bmi
                                    ); 
                            $sub_module_id = $req->sub_module_id;
                    
                            $table_name = 'wb_clinical_trial_applications';
                            if(validateIsNumeric($application_id)){
                                
                                $where_app = array('application_id'=>$application_id);
        
                                    if (recordExists('wb_clinicaltrial_saereports', $where_app)) {
                                        
                                        $app_data['altered_by'] = $trader_email;
                                        $app_data['dola'] = Carbon::now();
                                    
                                        $previous_data = getPreviousRecords('wb_clinicaltrial_saereports', $where_app);
                                        
                                        $resp =   updateRecord('wb_clinicaltrial_saereports', $previous_data, $where_app, $reportingapp_data,$trader_email);
                                        
                                $where_app = array('id'=>$application_id);
                                        
                                        $previous_data = getPreviousRecords('wb_clinical_trial_applications', $where_app);
                                     $application_code = $previous_data['results'][0]['application_code'];
                                    
                                }
                            }
                            else{
                                $rec = $this->getRegisteredClincialTrials($reg_clinical_trial_id);

                                $app_data = array('section_id'=>$req->section_id,
                                                'sub_module_id'=>$req->sub_module_id,
                                                'module_id'=>$req->appmodule_id,
                                                'section_id'=>$section_id,
                                                'phase_id'=>$rec->phase_id,
                                                'sponsor_id'=>$rec->sponsor_id,
                                                'investigator_id'=>$rec->investigator_id,
                                                'protocol_no'=>$rec->protocol_no,
                                                'version_no'=>$rec->version_no,
                                                'reg_clinical_trial_id'=>$reg_clinical_trial_id,
                                                'date_of_protocol'=>formatDate($rec->date_of_protocol),
                                                'study_start_date'=>formatDate($rec->study_start_date),
                                                'study_end_date'=>$rec->study_end_date,
                                                'clearance_no'=>$rec->clearance_no,
                                                'study_duration'=>$rec->study_duration,
                                                'study_title'=>$rec->study_title,
                                                'duration_desc'=>$rec->duration_desc,
                                                'zone_id'=>$req->zone_id,
                                                'clinical_prodsection_id'=>$rec->clinical_prodsection_id,
                                                'applicant_id'=>$trader_id,
                                                'trader_id'=>$trader_id
                                    );
                              
                                     $record = '';
                                
                                    $app_data['created_on'] = Carbon::now();
                                    
                                    $app_data['date_added'] = Carbon::now();
                                    $app_data['created_by'] = $trader_email;
                                    
                                    
                                    $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                  
                                    
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                
                                    $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                    
                                    $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                    $prev_refno = getSingleRecordColValue('tra_clinical_trial_applications', array('reg_clinical_trial_id' => $reg_clinical_trial_id,'sub_module_id'=>10), 'reference_no','mis_db');

                                        
                                    $application_code = generateApplicationCode($sub_module_id, 'wb_clinical_trial_applications');
                                    $codes_array = array(
                                        'section_code' => $section_code,
                                        'zone_code' => $zone_code,
                                        'prev_refno'=>$prev_refno
                                    );

                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }
                                        $app_data['tracking_no'] =   $tracking_no;
                                        $app_data['application_status_id'] =   1;
                                        $app_data['application_code'] =   $application_code;
                                        $app_data['date_added'] =  Carbon::now();
                                                    
                                                $resp = insertRecord('wb_clinical_trial_applications', $app_data, $trader_email);
                        
                                                $record_id = $resp['record_id'];
                                                $application_id = $record_id;
                                                if($resp['success']){
                                                  // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                                   saveApplicationSubmissionDetails($application_code,$table_name);   
                                                }
                                 //save the other details for the clinical trial reporting 
                                 $reportingapp_data['application_id'] = $application_id;
                                 
                  insertRecord('wb_clinicaltrial_saereports', $reportingapp_data, $trader_email);
                                               
                            }
                            if($resp['success']){
                                $res = array('tracking_no'=>$tracking_no,
                                            'application_id'=>$application_id,
                                            'application_code'=>$application_code,
                                            'module_id'=>$module_id,
                                            'sub_module_id'=>$sub_module_id,
                                            'success'=>true,
                                            'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                            
                            }
                            else{
                                $res = array(
                                'success'=>false,
                                'success1'=>$resp,
                                'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                            }

               if(validateIsNumeric($application_id)){
                            $adverse_reaction = array();
                            $adverse_reaction_id= $req->adverse_reaction_id;
                              DB::table('wb_adverse_reaction')->where(array('application_id'=>$application_id))->delete();
                              if(is_array($adverse_reaction_id)){
                                  foreach($adverse_reaction_id as $adverse_reactions_id){
                                                              
                                          $adverse_reaction[] = array('adverse_reaction_id'=>$adverse_reactions_id, 
                                                          'application_id'=>$application_id, 
                                                          'created_by'=>$trader_id, 
                                                          'created_on'=>Carbon::now());
          
                                  }
                                  DB::table('wb_adverse_reaction')->insert($adverse_reaction);
          
                              }
                }
                                
                            
            } catch (\Exception $exception) {
                $res = array(
                    'success' => false,
                    'message1'=>$resp,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,'message1'=>$resp,
                    'message' => $throwable->getMessage()
                );
            }
            
            return response()->json($res);



    }

    public function saveCtrOtherReportingApplication(Request $req){
            try {
                $resp = '';
                $application_id = $req->application_id;
                $trader_id = $req->trader_id;
                $email = $req->email;
                $trader_email = $req->trader_email;
                $section_id = $req->section_id;
                $module_id = $req->appmodule_id;
                $sub_module_id = $req->sub_module_id;
        
                $tracking_no = $req->tracking_no;
                $clinical_prodsection_id = $req->clinical_prodsection_id;
                $phase_id = $req->phase_id;
                $zone_id = $req->zone_id;
                
                $application_code = $req->application_code;
                
                $reg_clinical_trial_id = $req->reg_clinical_trial_id;
                
                $reportingapp_data  = array('reporting_start_date'=>$req->reporting_start_date,
                                            'reporting_end_date'=>$req->reporting_end_date,
                                            'brief_description'=>$req->brief_description,
                                            'clinicalreport_type_id'=>$req->clinicalreport_type_id,
                                            'actualstudy_date'=>$req->actualstudy_date,
                                            'screen_participants'=>$req->screen_participants,
                                            'dateof_first_screening'=>$req->dateof_first_screening,
                                            'target_sample_size'=>$req->target_sample_size,
                                            'enrolled_participants'=>$req->enrolled_participants,
                                            'dateof_first_enrollment'=>$req->dateof_first_enrollment,
                                            'number_of_dropouts'=>$req->number_of_dropouts,
                                            'number_lost_tofollow_ups'=>$req->number_lost_tofollow_ups,
                                            'inclusion_criteria'=>$req->inclusion_criteria,
                                            'exclusion_criteria'=>$req->exclusion_criteria,
                                            'number_of_saes'=>$req->number_of_saes,
                                            'events_of_medialimportance'=>$req->events_of_medialimportance,
                                            'protocol_deviations'=>$req->protocol_deviations,
                                            'clinicalstudy_status_id'=>$req->clinicalstudy_status_id,
                                            'study_site_id'=>$req->study_site_id
                                    );       
               
                            $sub_module_id = $req->sub_module_id;
                    
                            $table_name = 'wb_clinical_trial_applications';
                            if(validateIsNumeric($application_id)){
                                
                                $where_app = array('application_id'=>$application_id);
        
                                    if (recordExists('wb_clinicaltrial_otherreports', $where_app)) {
                                        
                                        $app_data['altered_by'] = $trader_email;
                                        $app_data['dola'] = Carbon::now();
                                    
                                        $previous_data = getPreviousRecords('wb_clinicaltrial_otherreports', $where_app);
                                        
                                        $resp =   updateRecord('wb_clinicaltrial_otherreports', $previous_data, $where_app, $reportingapp_data, $trader_email);
                                        
                                $where_app = array('id'=>$application_id);
                                        
                                        $previous_data = getPreviousRecords('wb_clinical_trial_applications', $where_app);
                                     $application_code = $previous_data['results'][0]['application_code'];
                                    
                                }
                            }
                            else{
                                $rec = $this->getRegisteredClincialTrials($reg_clinical_trial_id);

                                $app_data = array('section_id'=>$req->section_id,
                                                'sub_module_id'=>$req->sub_module_id,
                                                'module_id'=>$req->appmodule_id,
                                                'section_id'=>$section_id,
                                                'phase_id'=>$rec->phase_id,
                                                'sponsor_id'=>$rec->sponsor_id,
                                                'investigator_id'=>$rec->investigator_id,
                                                'protocol_no'=>$rec->protocol_no,
                                                'version_no'=>$rec->version_no,
                                                'reg_clinical_trial_id'=>$reg_clinical_trial_id,
                                                'date_of_protocol'=>formatDate($rec->date_of_protocol),
                                                'study_start_date'=>formatDate($rec->study_start_date),
                                                'study_end_date'=>$rec->study_end_date,
                                                'clearance_no'=>$rec->clearance_no,
                                                'study_duration'=>$rec->study_duration,
                                                'study_title'=>$rec->study_title,
                                                'duration_desc'=>$rec->duration_desc,
                                                'zone_id'=>$req->zone_id,
                                                'clinical_prodsection_id'=>$rec->clinical_prodsection_id,
                                                'phase_id'=>$rec->phase_id,
                                                'applicant_id'=>$trader_id,
                                                'trader_id'=>$trader_id
                                    );
                               
                                     $record = '';
                                
                                    $app_data['created_on'] = Carbon::now();
                                    
                                    $app_data['date_added'] = Carbon::now();
                                    $app_data['created_by'] = $trader_email;
                                    
                                    
                                    $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                  
                                    
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                
                                    $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                    
                                    $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                    $prev_refno = getSingleRecordColValue('tra_clinical_trial_applications', array('reg_clinical_trial_id' => $reg_clinical_trial_id,'sub_module_id'=>10), 'reference_no','mis_db');

                                        
                                    $application_code = generateApplicationCode($sub_module_id, 'wb_clinical_trial_applications');
                                    $codes_array = array(
                                        'section_code' => $section_code,
                                        'zone_code' => $zone_code,
                                        'prev_refno'=>$prev_refno
                                    );

                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }
                                        $app_data['tracking_no'] =   $tracking_no;
                                        $app_data['application_status_id'] =   1;
                                        $app_data['application_code'] =   $application_code;
                                        $app_data['date_added'] =  Carbon::now();
                                                    
                                                $resp = insertRecord('wb_clinical_trial_applications', $app_data, $trader_email);

                                                $record_id = $resp['record_id'];
                                                $application_id = $record_id;
                                                if($resp['success']){
                                                  // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                                   saveApplicationSubmissionDetails($application_code,$table_name);   
                                                }
                                 //save the other details for the clinical trial reporting 
                                 $reportingapp_data['application_id'] = $application_id;
                                 insertRecord('wb_clinicaltrial_otherreports', $reportingapp_data, $trader_email);
                                                
                            }
                            if($resp['success']){
                                $res = array('tracking_no'=>$tracking_no,
                                            'application_id'=>$application_id,
                                            'application_code'=>$application_code,
                                            'module_id'=>$module_id,
                                            'sub_module_id'=>$sub_module_id,
                                            'success'=>true,
                                            'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                            
                            }
                            else{
                                $res = array(
                                'success'=>false,
                                'success1'=>$resp,
                                'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                            }
        
                                
                            
            } catch (\Exception $exception) {
                $res = array(
                    'success' => false,
                    'message1'=>$resp,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,'message1'=>$resp,
                    'message' => $throwable->getMessage()
                );
            }
            
            return response()->json($res);



    }

    public function  saveClinicalTrialApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->appmodule_id;
            $sub_module_id = $req->sub_module_id;
    
            $tracking_no = $req->tracking_no;
            $clinical_prodsection_id = $req->clinical_prodsection_id;
            $phase_id = $req->phase_id;
            $zone_id = $req->zone_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            
            $phase_id = $req->phase_id;
            $is_fast_track = $req->is_fast_track;
            //dms get sub module flder getSubModuleNodereference()
            $study_duration = $req->study_duration;
            $duration_desc = $req->duration_desc;
            $timespan_defination = getSingleRecordColValue('clinical_trial_duration_desc', array('id' => $duration_desc), 'name','mis_db');
                                
            $study_end_date = date('Y-m-d', strtotime($req->study_start_date. " + $study_duration  $timespan_defination"));
              $formattedMeetingTime = date('H:i', strtotime($req->meeting_time));
                        /** Already Saved */ 
                         $app_data = array(
                            'study_title' => $req->study_title,
                            'short_study_title' => $req->short_study_title,
                            'phase_id' => $req->phase_id,
                             'other_study'=> $req->other_study,
                            'clincialtrialfields_type_id'=>$req->clincialtrialfields_type_id,
                            'protocol_no' => $req->protocol_no,
                            'date_of_protocol'=>formatDate($req->date_of_protocol),
                            'version_no' => $req->version_no,
                            'clinical_prodsection_id' => $req->clinical_prodsection_id,
                            'clinicaltrial_identification_no' => $req->clinicaltrial_identification_no,
                            'clinicaltrial_registry_id' => $req->clinicaltrial_registry_id,
                            //'other_registry' => $req->other_registry,
                            'sponsor_id' => $req->sponsor_id,
                            'investigator_id' => $req->investigator_id,
                            'meeting_time' => $formattedMeetingTime, 
                            'brief_description'=>$req->brief_description, 
                            'meeting_type_id'=>$req->meeting_type_id,
                            'meeting_date'=>$req->meeting_date, 
                            'meeting_venue'=>$req->meeting_venue, 
                            'meeting_invitation_details'=>$req->meeting_invitation_details, 
                            //non clinical
                            'primary_pharmacodynamics'=>$req->primary_pharmacodynamics, 
                            'secondary_pharmacodynamics'=>$req->secondary_pharmacodynamics,
                            'safety_pharmacology'=>$req->safety_pharmacology,
                            'pharmacodynamic_drug_interactions'=>$req->pharmacodynamic_drug_interactions, 
                            'pharmacokinetics'=>$req->pharmacokinetics,
                            'toxicology'=>$req->toxicology,
                            'First_in_human_trials'=>$req->First_in_human_trials,
                            'glp_aspects'=>$req->glp_aspects,
                            'module_id' => $module_id,
                            'sub_module_id' => $req->sub_module_id,
                            'section_id' => $req->section_id,
                            'clincialtrialfunding_source_id' => $req->clincialtrialfunding_source_id,
                            'trader_id' => $trader_id,
                            'applicant_id' => $trader_id
                       );

                        $sub_module_id = $req->sub_module_id;
                  
                        $table_name = 'wb_clinical_trial_applications';
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);
    
                                if (recordExists('wb_clinical_trial_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_clinical_trial_applications', $where_app);
                                    $application_code = $previous_data['results'][0]['application_code'];

                                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                                    $resp =   updateRecord('wb_clinical_trial_applications', $previous_data, $where_app, $app_data, $trader_email);

                                   
                                   
                                   $where_app = array('application_code'=>$application_code);
                                    if (!recordExists('tra_application_uploadeddocuments', $where_app,'mis_db')) {
                                        //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                                    }
                            }
                            
                        }
                        else{
                            $record = '';
                            
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                               
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                       
                                $application_code = generateApplicationCode($sub_module_id, 'wb_clinical_trial_applications');
                                $codes_array = array(
                                    'section_code' => $section_code,
                                    'zone_code' => $zone_code
                                );
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                                $app_data['reference_no'] =   $tracking_no;
                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                               $app_data['date_added'] =  Carbon::now();
                                        
                                            $resp = insertRecord('wb_clinical_trial_applications', $app_data, $trader_email);

                                            $record_id = $resp['record_id'];
                                            $application_id = $record_id;
                                            if($resp['success']){
                                                    //create all the details
                                                  
                                                 //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                                                 saveApplicationSubmissionDetails($application_code,$table_name);
                                             }
                               
    
                               
                                
                            
                                    //update the application code_no
                        }
                        if($resp){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                         }
    
                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,'message1'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);
    }   
    
    public function  saveAltClinicalTrialApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->appmodule_id;
            $sub_module_id = $req->sub_module_id;
    
            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference()
            $study_duration = $req->study_duration;
            $duration_desc = $req->duration_desc;
            $reg_clinical_trial_id = $req->reg_clinical_trial_id;
            $clinical_prodsection_id = $req->clinical_prodsection_id;
            $phase_id = $req->phase_id;

            
            
            $timespan_defination = getSingleRecordColValue('clinical_trial_duration_desc', array('id' => $duration_desc), 'name','mis_db');
                                
            $study_end_date = date('Y-m-d', strtotime($req->study_start_date. " + $study_duration  $timespan_defination"));
                        
            $formattedMeetingTime = date('H:i', strtotime($req->meeting_time));

                        $app_data = array(

                            'study_title' => $req->study_title,
                            'protocol_no' => $req->protocol_no,
                            'primary_endpoints' => $req->primary_endpoints,
                            'secondary_endpoints' => $req->secondary_endpoints,
                            'version_no' => $req->version_no,
                            'other_study'=>$req->other_study,
                            'explorator_objective'=>$req->explorator_objective,
                            'other_objective'=>$req->other_objective,
                            'date_of_protocol'=>formatDate($req->date_of_protocol),
                            'study_start_date'=>formatDate($req->study_start_date),
                            'meeting_time' => $formattedMeetingTime, 
                            'brief_description'=>$req->brief_description, 
                            'uncst_no'=>$req->uncst_no,
                            'first_final_duration'=>$req->first_final_duration,
                            'duration_stimate'=>$req->duration_stimate,
                            'meeting_type_id'=>$req->meeting_type_id,
                            'meeting_date'=>$req->meeting_date, 
                            'meeting_venue'=>$req->meeting_venue, 
                            'meeting_invitation_details'=>$req->meeting_invitation_details, 
                            'study_end_date'=>$study_end_date,
                            'sponsor_id' => $req->sponsor_id,
                            'investigator_id' => $req->investigator_id,
                            'study_duration' => $req->study_duration,
                            'duration_desc' => $req->duration_desc,
                            'clearance_no' => $req->clearance_no,
                            'rec_no'=>$req->rec_no,
                            'clinical_prodsection_id' => $req->clinical_prodsection_id,
                            'is_clinicaltrialin_uganda'=>$req->is_clinicaltrialin_uganda,
                            'phase_id' => $req->phase_id,
                             'clinicaltrial_registry_id' => $req->clinicaltrial_registry_id,
                            'clinicaltrial_identification_no' => $req->clinicaltrial_identification_no,
                            'is_clinicaltrialin_othercountry'=>$req->is_clinicaltrialin_othercountry,
                            'short_study_title' => $req->short_study_title,
                            'ctrethics_committee_id' => $req->ctrethics_committee_id,
                            'trial_design' => $req->trial_design,
                            'clinicaltrialprimary_objective' => $req->clinicaltrialprimary_objective,
                            'clinicaltrialsecondary_objective' => $req->clinicaltrialsecondary_objective,
                            'exclusion_criteria' => $req->exclusion_criteria,
                            'inclusion_criteria' => $req->inclusion_criteria,
                            'purpose_of_trial' => $req->purpose_of_trial,
                            'clinicaltrial_description' => $req->clinicaltrial_description,
                            'module_id' => $module_id,
                            'sub_module_id' => $req->sub_module_id,
                            'section_id' => $req->section_id,
                            'participant_no' => $req->participant_no,
                            'enrolled_worldwide_no' => $req->enrolled_worldwide_no,
                            'intended_no' => $req->intended_no,
                            'enrolled_uganda_no' => $req->enrolled_uganda_no,
                            'sites_no' => $req->sites_no,
                            'zone_id' => $req->zone_id,
                            'clinicalin_othercountries_sites' => $req->clinicalin_othercountries_sites,
                            'clinicalin_otheruganda_sites' => $req->clinicalin_otheruganda_sites,
                            'clincialtrialfields_type_id' => $req->clincialtrialfields_type_id,
                            'clincialtrialfunding_source_id' => $req->clincialtrialfunding_source_id,
                            'trader_id' => $trader_id,
                            'applicant_id' => $trader_id
                       );
                        /** Already Saved */ 

                        $sub_module_id = $req->sub_module_id;
                        $table_name = 'wb_clinical_trial_applications';
                        if(validateIsNumeric($application_id)){

                                
                               $where_app = array('id'=>$application_id);
    
                                if (recordExists('wb_clinical_trial_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_clinical_trial_applications', $where_app);
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    $resp =   updateRecord('wb_clinical_trial_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                            $where_app = array('application_code'=>$application_code);

                            if (!recordExists('tra_application_uploadeddocuments', $where_app,'mis_db')) {
                                initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                            }
                            
                            
                        }
                        else{
                            
                            $process_id = '';
                           // $anyOngoingApps = checkForOngoingApplications($req->reg_clinical_trial_id, 'tra_clinical_trial_applications', 'reg_clinical_trial_id', $process_id);
                            $prev_refno = getSingleRecordColValue('tra_clinical_trial_applications', array('reg_clinical_trial_id' => $reg_clinical_trial_id,'sub_module_id'=>10), 'reference_no','mis_db');

                            /*
                            $anyOngoingPortalApps = checkForPortalOngoingApplications($req->reg_clinical_trial_id, 'wb_clinical_trial_applications', 'reg_clinical_trial_id', $process_id);
                                
                            if ($anyOngoingApps['exists'] == true || $anyOngoingPortalApps['exists'] == true) {
                                    $res = array(
                                        'success' => false,
                          'message' => 'There is an ongoing application pending approval with reference number ' . $anyOngoingApps['ref_no'].' '.$anyOngoingPortalApps['ref_no']
                                    );
                                    return \response()->json($res);
                            }
                            */
                            
                            $record = '';
                           
                             $where_statement = array('sub_module_id'=>10,'t1.reg_clinical_trial_id'=>$reg_clinical_trial_id);

                            
                                
                                $app_data['created_on'] = Carbon::now();
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                $ref_id = 0;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                               
                                $tra_clinical_trial_id = getSingleRecordColValue('registered_clinical_trials',array('id'=>$reg_clinical_trial_id), 'id','mis_db');
                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                        $codes_array = array(
                                            'prev_refno' => $prev_refno,
                                            'zone_code' => $zone_code
                                        );
                                        
                                $application_code = generateApplicationCode($sub_module_id, 'wb_clinical_trial_applications');
                                      $where_statementref =  array('reg_clinical_trial_id' => $reg_clinical_trial_id,'sub_module_id'=>$sub_module_id);

                                 $tracking_no = generateSubRefNumber($where_statementref, 'tra_clinical_trial_applications', $ref_id, $codes_array, $sub_module_id, $trader_id);
                                
                                //change from CT to CT/ALT CTR
                                if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }

                                $nodetracking = str_replace("/","-",$tracking_no);
                              
                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                               $app_data['date_added'] =  Carbon::now();
                              
    
                                            
                                $resp = insertRecord('wb_clinical_trial_applications', $app_data, $trader_email);

                                    $record_id = $resp['record_id'];
                                    $application_id = $record_id;
                                        //save the details 

                                         $prev_sites = DB::connection('mis_db')->table('clinical_trial_sites as t1')
                                                ->select(DB::raw("t1.*,$application_id as application_id"))
                                                ->where('t1.application_id', $tra_clinical_trial_id)
                                                ->get();
                                            $prev_sites = convertStdClassObjToArray($prev_sites);
                                            $prev_sites = unsetPrimaryIDsInArray($prev_sites,'id');

                                            //personnel
                                          $prev_personnel = DB::connection('mis_db')->table('clinical_trial_personnel as t1')
                                                ->select(DB::raw("t1.*,$application_id as application_id"))
                                                ->where('t1.application_id', $tra_clinical_trial_id)
                                                ->get();
                                            $prev_personnel = convertStdClassObjToArray($prev_personnel);
                                            $prev_personnel = unsetPrimaryIDsInArray($prev_personnel,'id');

                                            //prev other investigators
                                            $prev_investigators = DB::connection('mis_db')->table('clinical_trial_investigators as t1')
                                                ->select(DB::raw("t1.*,$application_id as application_id"))
                                                ->where('t1.application_id', $tra_clinical_trial_id)
                                                ->get();

                                            $prev_investigators = convertStdClassObjToArray($prev_investigators);
                                            $prev_investigators = unsetPrimaryIDsInArray($prev_investigators,'id');
                                            //prev Imp Products
                                            $prev_products = DB::connection('mis_db')->table('clinical_trial_products as t2')
                                                ->select(DB::raw("t2.*,$application_id as application_id"))
                                                ->where('t2.application_id', $tra_clinical_trial_id)
                                                ->get();
                                            $prev_products = convertStdClassObjToArray($prev_products);
                                            $prev_products = unsetPrimaryIDsInArray($prev_products,'id');

                                            DB::table('wb_clinical_trial_sites')->insert($prev_sites);
                                            DB::table('wb_clinical_trial_personnel')->insert($prev_personnel);
                                            DB::table('wb_clinical_trial_investigators')->insert($prev_investigators);
                                            DB::table('wb_clinical_trial_products')->insert($prev_products);

                                            if($resp['success']){

                                                    //create all the details
                                                    //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                                    saveApplicationSubmissionDetails($application_code,$table_name);
                                             }
                               
    
                               
                           
                            
                                    //update the application code_no
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            
                            'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                         }
    
                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1'=>$resp['message'],
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
   public function onSaveClincialTrialProgressReportApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

           $reportingapp_data  = array(
                                'reporting_start_date'=>$req->reporting_start_date,
                                'reporting_end_date'=>$req->reporting_end_date,
                                'clinicalreport_type_id'=>$req->clinicalreport_type_id,
                                'actualstudy_date'=>$req->actualstudy_date,
                                'screen_participants'=>$req->screen_participants,
                                'dateof_first_screening'=>$req->dateof_first_screening,
                                'target_sample_size'=>$req->target_sample_size,
                                'enrolled_participants'=>$req->enrolled_participants,
                                'dateof_first_enrollment'=>$req->dateof_first_enrollment,
                                'number_of_dropouts'=>$req->number_of_dropouts,
                                'number_lost_tofollow_ups'=>$req->number_lost_tofollow_ups,
                                'number_of_saes'=>$req->number_of_saes,
                                'events_of_medialimportance'=>$req->events_of_medialimportance,
                                'protocol_deviations'=>$req->protocol_deviations
                            );  

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $reportingapp_data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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

public function onSaveClincialConcomitantDrugs(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinicaltrial_saereports';

           $reportingapp_data  = array( 
                        'concomitant_drugs'=>$req->concomitant_drugs,
                        'dateof_administration'=>$req->dateof_administration,
                        'relevant_history'=>$req->relevant_history
                                    );  

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                $resp = updateRecord($table_name, $previous_data, $where, $reportingapp_data, $trader_email);

            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
public function onsavePatientInformation(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_patient_information';

            $data = array(
                        'name'=>$req->name,
                        'adr_type_id'=>$req->adr_type_id,
                        'species'=>$req->species,
                        'breed'=>$req->breed,
                        'humanvet_contact_id'=>$req->humanvet_contact_id,
                        'animal_status_id'=>$req->animal_status_id,
                        'dateof_birth'=>$req->dateof_birth,
                        'age'=>$req->age,
                        'sex_id'=>$req->sex_id,
                        'trader_id'=>$req->trader_id

                     );
     

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');
                
            }
            $res = returnFuncResponses($resp, 'Patient Details', 'data', $data);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');  
                $res = returnFuncResponses($resp, 'Patient Details', 'data', $data);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Patient Details exists or already saved.');
    
            }

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

   public function onSaveClincialTrialSummaryApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

           $reportingapp_data  = array( 
                        'date_of_approved_research'=>$req->date_of_approved_research,
                        'date_of_approved_uncst'=>$req->date_of_approved_uncst,
                        'date_of_approval'=>$req->date_of_approval
                                    );  

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                $resp = updateRecord($table_name, $previous_data, $where, $reportingapp_data, $trader_email);

            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
    public function getClinicalApplicationsDetails(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
                $sub_module_id = $req->sub_module_id;
                 $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::table('wb_clinical_trial_applications as t1')
                ->select('t1.*','t1.id as application_id','t8.adverse_reaction_id','t7.name as action_name','t7.iconCls','t7.action', 't1.clinical_prodsection_id','t1.application_status_id as status_id','t3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_adverse_reaction as t8', 't1.id','=','t8.application_id')
               ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('wb_processstatus_actions as t6',function($join){
                        $join->on('t1.application_status_id', '=', 't6.status_id')
                             ->on('t6.is_default_action', '=', DB::raw(1));

                    })
                    
                    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id');


                  if($trader_id!=1 || $trader_id!=81069){
                   $records->where(array('t1.applicant_id' => $trader_id));
                  }

                if(validateIsNumeric($application_status_id)){
                    $records->where(array('t1.application_status_id'=>$application_status_id));
                }if(validateIsNumeric($sub_module_id)){
                     $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }
                 if(validateIsNumeric($application_code)){
                $records->where(array('t1.application_code'=>$application_code));
                }
                $records =  $records->get();
        
          
                $data = $this->getClincialTrialAppsData($records);
                $res =array('success'=>true,'data'=> $data);
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);


    }
    function getClincialTrialAppsData($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();
        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        
        $permitCategoryData = getParameterItems('par_permit_category','','mis_db');
        $permitReasonData = getParameterItems('par_permit_category','','mis_db');
        $meetingData = getParameterItems('par_meeting_types','','mis_db');
        $adverseReaction = getParameterItems('par_adverse_reaction','','mis_db');
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
       $reaction = returnParamFromArray($adverseReaction,$rec->adverse_reaction_id);
           $meetingType = returnParamFromArray($meetingData,$rec->meeting_type_id);
           $clinical_trial_sponsor = getSingleRecordColValue('clinical_trial_personnel', array('id' => $rec->sponsor_id), 'name','mis_db');
           $principal_investigator = getSingleRecordColValue('clinicaltrial_investigator_personnel', array('id' => $rec->investigator_id), 'name','mis_db');
           if($rec->sub_module_id == 23 ||$rec->sub_module_id == 102||$rec->sub_module_id == 103){
                if($rec->sub_module_id == 23){
                $report_data = getSingleRecord('wb_clinicaltrial_progressreports', array('application_id' => $rec->application_id));
                 }else if($rec->sub_module_id == 102){
                $report_data = getSingleRecord('wb_clinicaltrial_saereports', array('application_id' => $rec->application_id));
                 }else{
                $report_data = getSingleRecord('wb_clinicaltrial_otherreports', array('application_id' => $rec->application_id));
                 }
                if($report_data){
               
                    $data[] = array('application_code'=>$rec->application_code,
                                'module_id'=>$rec->module_id,
                                'sub_module_id'=>$rec->sub_module_id,
                                'action_name'=>$rec->action_name,
                                'iconCls'=>$rec->iconCls,
                                'action'=>$rec->action,
                                'application_status_id'=>$rec->application_status_id,
                                'reference_no'=>$rec->reference_no,
                                'tracking_no'=>$rec->tracking_no,
                                'date_received'=>$rec->date_received,
                                'date_added'=>$rec->date_added,
                                'trader_id'=>$rec->applicant_id,
                                'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Clinical Trial Application',
                                'sponsor_id'=>$rec->sponsor_id,
                                'investigator_id'=>$rec->investigator_id,
                                'study_title'=>$rec->study_title,
                                'protocol_no'=>$rec->protocol_no,
                                'version_no'=>$rec->version_no,
                                'date_of_protocol'=>$rec->date_of_protocol,
                                'study_start_date'=>$rec->study_start_date,
                                'clearance_no'=>$rec->clearance_no,
                                'study_duration'=>$rec->study_duration,
                                'duration_desc'=>$rec->duration_desc,
                                'paying_currency_id'=>$rec->paying_currency_id,
                                'section_id'=>$rec->section_id,
                                'reaction'=>$reaction,
                                'router_link'=>$rec->router_link,
                                'process_title'=>$rec->process_title,
                                'reg_clinical_trial_id'=>$rec->reg_clinical_trial_id,
                                'zone_id'=>$rec->zone_id,
                                'zone_id'=>$rec->zone_id,
                                'id'=>$rec->id,
                                'application_id'=>$rec->id,
                                'clinical_prodsection_id'=>$rec->clinical_prodsection_id,
                                'phase_id'=>$rec->phase_id,
                                'status_name'=>$rec->status_name,
                                'is_fast_track'=>$rec->is_fast_track,
                                'clinical_trial_sponsor'=>$clinical_trial_sponsor,
                                'principal_investigator'=>$principal_investigator,

                                //sae report
                                'sourceofpsur_id'=>$report_data->sourceofpsur_id,
                                'report_category_id'=>$report_data->report_category_id,
                                'report_type_id'=>$report_data->report_type_id,
                                'initial_receive_date'=>$report_data->initial_receive_date,
                                'report_date'=>$report_data->report_date,
                                'adr_reporter_category_id'=>$report_data->adr_reporter_category_id,
                                'adr_type_id'=>$report_data->adr_type_id,
                                'species'=>$report_data->species,
                                'breed'=>$report_data->breed,
                                'animal_status_id'=>$report_data->animal_status_id,
                                'humanvet_contact_id'=>$report_data->humanvet_contact_id,
                                'patient_name'=>$report_data->patient_name,
                                'title_id'=>$report_data->title_id,
                                'gender_id'=>$report_data->gender_id,
                                'device_operator_id'=>$report_data->device_operator_id,
                                'local_supplier'=>$report_data->local_supplier,
                                'software_version'=>$report_data->software_version,
                                'catalogue_number'=>$report_data->catalogue_number,
                                'serial_number'=>$report_data->serial_number,
                                'model_number'=>$report_data->model_number,
                                'device_location_id'=>$report_data->device_location_id,
                                'last_menstruation_date'=>$report_data->last_menstruation_date,
                                'is_pregnant'=>$report_data->is_pregnant,
                                'is_lactating'=>$report_data->is_lactating,
                                'date_of_birth'=>$report_data->date_of_birth,
                                'patient_age'=>$report_data->patient_age,
                                'age_group_id'=>$report_data->age_group_id,
                                'patient_weight'=>$report_data->patient_weight,
                                'patient_height'=>$report_data->patient_height,
                                'bmi'=>$report_data->bmi,

                                //additional fields
                                'study_arm'=>$report_data->study_arm,
                                'medra_term_id'=>$report_data->medra_term_id,
                                'sae_onset_date'=>$report_data->sae_onset_date,
                                'stop_date'=>$report_data->stop_date,
                                'ongoing_id'=>$report_data->ongoing_id,
                                'site_awareness_date'=>$report_data->site_awareness_date,
                                'sae_narative'=>$report_data->sae_narative,
                                //end of sae
                                'primary_endpoints' => $rec->primary_endpoints,
                                        'secondary_endpoints' => $rec->secondary_endpoints,

                                'study_end_date'=>$rec->study_end_date,
                                'clinicaltrial_registry_id' => $rec->clinicaltrial_registry_id,
                                'clinicaltrial_identification_no' => $rec->clinicaltrial_identification_no,
                                'short_study_title' => $rec->short_study_title,
                                'ctrethics_committee_id' => $rec->ctrethics_committee_id,
                                'trial_design' => $rec->trial_design,
                                'clinicaltrialprimary_objective' => $rec->clinicaltrialprimary_objective,
                                'clinicaltrialsecondary_objective' => $rec->clinicaltrialsecondary_objective,
                                'exclusion_criteria' => $rec->exclusion_criteria,
                                'inclusion_criteria' => $rec->inclusion_criteria,
                                'purpose_of_trial' => $rec->purpose_of_trial,
                                'clinicaltrial_description' => $rec->clinicaltrial_description,
                                    
                                'clincialtrialfields_type_id' => $rec->clincialtrialfields_type_id,
                                'clincialtrialfunding_source_id' => $rec->clincialtrialfunding_source_id,
                                'phase_id'=>$rec->phase_id,
                                'status_name'=>$rec->status_name,
                                'is_fast_track'=>$rec->is_fast_track,
                                'clinicalin_othercountries_sites' => $rec->clinicalin_othercountries_sites,
                               // 'clinicalin_otheruganda_sites' => $rec->clinicalin_otheruganda_sites,
                                'clinical_trial_sponsor'=>$clinical_trial_sponsor,
                                'principal_investigator'=>$principal_investigator,
                                'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                            );
                    
                }
                  
                        


           }
           else{

                $data[] = array('application_code'=>$rec->application_code,
                        'module_id'=>$rec->module_id,
                        'sub_module_id'=>$rec->sub_module_id,
                        'action_name'=>$rec->action_name,
                        'iconCls'=>$rec->iconCls,
                        'action'=>$rec->action,
                        'explorator_objective'=>$rec->explorator_objective,
                        'other_objective'=>$rec->other_objective,
                        'application_status_id'=>$rec->application_status_id,
                        'reference_no'=>$rec->reference_no,
                        'tracking_no'=>$rec->tracking_no,
                        'other_study'=>$rec->other_study,
                        'uncst_no'=>$rec->uncst_no,
                        'first_final_duration'=>$rec->first_final_duration,
                        'date_received'=>$rec->date_received,
                        'date_added'=>$rec->date_added,
                        'duration_stimate'=>$rec->duration_stimate,
                        'rec_no'=>$rec->rec_no,
                         'date_of_approved_research'=>$rec->date_of_approved_research,
                         'date_of_approved_uncst'=>$rec->date_of_approved_uncst,
                         'date_of_approval'=>$rec->date_of_approval,
                        'trader_id'=>$rec->applicant_id,
                        'data_management_process'=>$rec->data_management_process,
                        'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Clinical Trial Application',
                        'sponsor_id'=>$rec->sponsor_id,
                        'investigator_id'=>$rec->investigator_id,
                        'study_title'=>$rec->study_title,
                        'protocol_no'=>$rec->protocol_no,
                        'participant_no' => $rec->participant_no,
                        'enrolled_worldwide_no' => $rec->enrolled_worldwide_no,
                        'intended_no' => $rec->intended_no,
                        'enrolled_uganda_no' => $rec->enrolled_uganda_no,
                        'sites_no' => $rec->sites_no,
                        'version_no'=>$rec->version_no,
                        'date_of_protocol'=>formatDate($rec->date_of_protocol),
                        'study_start_date'=>formatDate($rec->study_start_date),
                        'meeting_date'=>formatDate($rec->meeting_date),
                        'clearance_no'=>$rec->clearance_no,
                        'study_duration'=>$rec->study_duration,
                        'duration_desc'=>$rec->duration_desc,
                        'paying_currency_id'=>$rec->paying_currency_id,
                        'section_id'=>$rec->section_id,
                        'meeting_invitation_details'=>$rec->meeting_invitation_details,
                        'meeting_type_id'=>$rec->meeting_type_id,
                        'meeting_venue'=>$rec->meeting_venue,
                        'brief_description'=>$rec->brief_description,
                        'meeting_time'=>formatDate($rec->meeting_time),
                        'router_link'=>$rec->router_link,
                        'process_title'=>$rec->process_title,
                        'reg_clinical_trial_id'=>$rec->reg_clinical_trial_id,
                        'zone_id'=>$rec->zone_id,
                        'zone_id'=>$rec->zone_id,
                        'id'=>$rec->id,
                        'application_id'=>$rec->id,
                        'clinical_prodsection_id'=>$rec->clinical_prodsection_id,
                        'is_clinicaltrialin_othercountry'=>$rec->is_clinicaltrialin_othercountry,
                        'primary_endpoints' => $rec->primary_endpoints,
                        'secondary_endpoints' => $rec->secondary_endpoints,
                        'tertiary_endpoints'=> $rec->tertiary_endpoints,
                        'is_clinicaltrialin_uganda'=>$rec->is_clinicaltrialin_uganda,
                        'study_end_date'=>$rec->study_end_date,
                        'clinicaltrial_registry_id' => $rec->clinicaltrial_registry_id,
                        'clinicaltrial_identification_no' => $rec->clinicaltrial_identification_no,
                        'short_study_title' => $rec->short_study_title,
                        'ctrethics_committee_id' => $rec->ctrethics_committee_id,
                        'trial_design' => $rec->trial_design,
                        'clinicaltrialprimary_objective' => $rec->clinicaltrialprimary_objective,
                        'tertiary_objectives' => $rec->tertiary_objectives,

                        'clinicaltrialsecondary_objective' => $rec->clinicaltrialsecondary_objective,
                        'exclusion_criteria' => $rec->exclusion_criteria,
                        'inclusion_criteria' => $rec->inclusion_criteria,
                        'purpose_of_trial' => $rec->purpose_of_trial,
                        'clinicaltrial_description' => $rec->clinicaltrial_description,
                        'sample_size'=> $rec->sample_size,
                        'planned_analyses'=> $rec->planned_analyses,
                        'analysis_sets'=> $rec->analysis_sets,

                        'primary_pharmacodynamics'=> $rec->primary_pharmacodynamics,
                        'secondary_pharmacodynamics'=> $rec->secondary_pharmacodynamics,
                        'safety_pharmacology'=> $rec->safety_pharmacology,
                        'pharmacodynamic_drug_interactions'=> $rec->pharmacodynamic_drug_interactions,
                        'pharmacokinetics'=> $rec->pharmacokinetics,

                        'toxicology'=> $rec->toxicology,
                        'First_in_human_trials'=> $rec->First_in_human_trials,
                        'glp_aspects'=> $rec->glp_aspects,

                        'reporting_start_date'=>$rec->reporting_start_date,
                        'reporting_end_date'=>$rec->reporting_end_date,
                        'clinicalreport_type_id'=>$rec->clinicalreport_type_id,
                        'actualstudy_date'=>$rec->actualstudy_date,
                        'screen_participants'=>$rec->screen_participants,
                        'dateof_first_screening'=>$rec->dateof_first_screening,
                        'target_sample_size'=>$rec->target_sample_size,
                        'enrolled_participants'=>$rec->enrolled_participants,
                        'dateof_first_enrollment'=>$rec->dateof_first_enrollment,
                        'number_of_dropouts'=>$rec->number_of_dropouts,
                        'number_lost_tofollow_ups'=>$rec->number_lost_tofollow_ups,
                        'number_of_saes'=>$rec->number_of_saes,
                        'events_of_medialimportance'=>$rec->events_of_medialimportance,
                        'protocol_deviations'=>$rec->protocol_deviations,

                        'clincialtrialfields_type_id' => $rec->clincialtrialfields_type_id,
                        'clincialtrialfunding_source_id' => $rec->clincialtrialfunding_source_id,
                            
                        'screening_period' => $rec->screening_period,
                        'screening_duration' => $rec->screening_duration,
                        'follow_up_period' => $rec->follow_up_period,
                        'follow_up_duration' => $rec->follow_up_duration,
                        'intervention_period'=>$rec->intervention_period,
                        'intervention_duration'=>$rec->intervention_duration,
                            
                        'safety_monitoring_plan' => $rec->safety_monitoring_plan,
                        'system_used' => $rec->system_used,
                        'action_seriousadverse_event' => $rec->action_seriousadverse_event,
                        'safety_monitoring_board' => $rec->safety_monitoring_board,
                        'interim_report_date'=>$rec->interim_report_date,
                        'estimated_due_report_date'=>$rec->estimated_due_report_date,
                        
                        'phase_id'=>$rec->phase_id,
                        'status_name'=>$rec->status_name,
                        'clinicalin_othercountries_sites' => $rec->clinicalin_othercountries_sites,
                        'clinicalin_otheruganda_sites' => $rec->clinicalin_otheruganda_sites,
                        //'is_prevclinicaltrialin_othercountry' => $rec->is_prevclinicaltrialin_othercountry,
                       // 'prevclinicalin_othercountries_sites' => $rec->prevclinicalin_othercountries_sites,

                        'is_fast_track'=>$rec->is_fast_track,
                        'clinical_trial_sponsor'=>$clinical_trial_sponsor,
                        'principal_investigator'=>$principal_investigator,
                        'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                    );
                //dd($data);
           }
          
            
        }
        return $data;


   }
   public function getClinicaltrailIMPProdData(Request $req){

    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;
        $records = DB::table($table_name .' as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
            //dd($application_id);
                    foreach ($records as $rec) {
                        $product_category = getSingleRecordColValue('par_clinical_product_categories', array('id' => $rec->product_category_id), 'category_name','mis_db');
                        $generic_name = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name','mis_db');
                        $dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $rec->dosage_form_id), 'name','mis_db');
                        $route_of_administration = getSingleRecordColValue('par_route_of_administration', array('id' => $rec->routes_of_admin_id), 'name','mis_db');
                        $si_units = getSingleRecordColValue('par_si_units', array('id' => $rec->si_unit_id), 'name','mis_db');
                        $market_location = getSingleRecordColValue('par_product_types', array('id' => $rec->market_location_id), 'name','mis_db');
                       
                        $classification_name = getSingleRecordColValue('par_classifications', array('id' => $rec->classification_id), 'name','mis_db');
                       
                        $data[] = array('id'=>$rec->id,
                                       'application_id'=>$rec->application_id,
                                       'product_category_id'=>$rec->product_category_id,
                                       'brand_name'=>$rec->brand_name,
                                       'registration_no'=>$rec->registration_no,
                                       'registration_date'=>$rec->registration_date,
                                       'identification_mark'=>$rec->identification_mark,
                                       'product_desc'=>$rec->product_desc,
                                       'market_location_id'=>$rec->market_location_id,
                                       'estimated_quantity'=>$rec->estimated_quantity,
                                       'dosage_form_id'=>$rec->dosage_form_id,
                                       'common_name_id'=>$rec->common_name_id,
                                       'manufacturer_id'=>$rec->manufacturer_id,
                                       'routes_of_admin_id'=>$rec->routes_of_admin_id,
                                       'product_strength'=>$rec->product_strength,
                                       'si_unit_id'=>$rec->si_unit_id,
                                       'country_id'=>$rec->country_id,

                                       'product_category'=>$product_category,
                                       'generic_name'=>$generic_name,
                                       'dosage_form'=>$dosage_form,
                                       'route_of_administration'=>$route_of_administration,
                                       'market_location'=>$market_location,
                                       
                                       'device_type_id'=>$rec->device_type_id,
                                       'gmdn_category'=>$rec->gmdn_category,
                                       'gmdn_term'=>$rec->gmdn_term,
                                       'classification_id'=>$rec->classification_id,
                                       'gmdn_code'=>$rec->gmdn_code,
                                       'investigationproduct_section_id'=>$rec->investigationproduct_section_id,
                                       'market_location'=>$market_location,

                                    );

                    }

            $res = array('success'=>true, 
                        'data'=>$data
                        );

            }
            catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            return response()->json($res);
        

   }
   //
   public function getClinicaltrailMonitorssData(Request $req){
        
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;

        $records = DB::table('wb_clinical_trial_monitors as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        
                        $rec_data = DB::connection('mis_db')
                                ->table('clinical_trial_personnel as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->monitor_id))
                                ->first();
                                if($rec_data){
                                    $data[] = array('id'=>$rec->id,
                                    'monitor'=>$rec_data->name,
                                    'country'=>$rec_data->country,
                                    'region'=>$rec_data->region,
                                    'district'=>$rec_data->district,
                                    'physical_address'=>$rec_data->physical_address,
                                    'postal_address'=>$rec_data->postal_address,
                                    'telephone'=>$rec_data->telephone);

                                }
                                                    

                    }

            $res = array('success'=>true, 
                        'data'=>$data
                        );

            }
            catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            return response()->json($res);
        
        
           } 


    public function getClinicalSummaryActivityDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_clinicaltrial_summary_activity as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {    
                            $data[] = array('id'=>$rec->id,
                                        'type_of_ammendment'=>$rec->type_of_ammendment,
                                        'summary_of_ammendment'=>$rec->summary_of_ammendment,
                                        'date_of_approval_by'=>$rec->date_of_approval_by,
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id,
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}

   public function getClinicalRegulatoryLapseDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_clinicaltrial_regulatorylapse as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {
                        $lapse_study_id = $rec->lapse_study_id;

                       $regulatory_lapse = getParameterItem('par_clinical_regulatorystudy',$rec->lapse_study_id,'mis_db');
    
                            $data[] = array('id'=>$rec->id,
                                        'regulatory_lapse'=>$regulatory_lapse,
                                        'date_of_occurrance'=>$rec->date_of_occurrance,
                                        'reason'=>$rec->reason,                
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}
   public function getClinicalDeviationReportDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_clinicaltrial_deviationrprt as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {    
                            $data[] = array('id'=>$rec->id,
                                        'deviation'=>$rec->deviation,
                                        'CAPA'=>$rec->capa,
                                        'date_of_occurrance'=>$rec->date_of_occurrance,
                                        'id'=>$rec->id,
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id,
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}

 public function getClinicalInspectionReportDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_clinicaltrial_inspectionrprt as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {

    
                            $data[] = array('id'=>$rec->id,
                                        'regulatory_body'=>$rec->regulatory_body,
                                        'date_of_inspection'=>$rec->date_of_inspection,
                                        'outcome'=>$rec->outcome,
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id,
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}
  public function getClinicalPatientInformation(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_clinicaltrial_patient_information as t1')
                    ->where(array('t1.trader_id' => $trader_id))
                     ->get();
                     foreach ($records as $rec) {
                        $adr_type_id = $rec->adr_type_id;
                        $sex_id = $rec->sex_id;
                        $animal_status_id = $rec->animal_status_id;
                        $humanvet_contact_id =$rec->humanvet_contact_id;
                        $product_type = getParameterItem('par_adr_types',$rec->adr_type_id,'mis_db');
                        $sex = getParameterItem('par_gender',$rec->sex_id,'mis_db');
                        $animal_status = getParameterItem('par_animal_status',$rec->animal_status_id,'mis_db');
                        $country = getParameterItem('par_countries',$rec->country_id,'mis_db');

                        $animal_contact =getParameterItem('par_humanvet_contacts',$rec->humanvet_contact_id,'mis_db');
                            $data[] = array('id'=>$rec->id,
                                        'product_type'=>$product_type,
                                        'name'=>$rec->name,
                                        'animal_status'=>$animal_status,
                                        'country'=>$country,
                                        'animal_contact'=>$animal_contact,
                                        'sex'=>$sex,
                                        'sex_id'=>$rec->sex_id,
                                        'country_id'=>$rec->country_id,
                                        'animal_status_id'=>$rec->animal_status_id,
                                        'adr_type_id'=>$rec->adr_type_id,
                                        'humanvet_contact_id'=>$rec->humanvet_contact_id,
                                        'age'=>$rec->age,
                                        'species'=>$rec->species,
                                        'trader_id'=>$rec->trader_id,
                                        'breed'=>$rec->breed,
                                        'dateof_birth'=>$rec->dateof_birth
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
} 
  public function getClinicalPersonnelDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('clinical_trial_personnel as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;
            $position_id = $rec->position_id;

                       $qualification = getParameterItem('par_personnel_qualifications',$rec->                      qualification_id,'mis_db');
                       $position = getParameterItem('par_clinicaltrialpersons_roles',$rec->                         position_id,'mis_db');
            
                            $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$qualification_id,
                                        'name'=>$rec->name,
                                        'qualification'=>$qualification,
                                        'telephone'=>$rec->telephone,
                                        'email_address'=>$rec->email_address,
                                        'id'=>$rec->id,
                                        'position_id'=>$rec->position_id,
                                        'position'=>$position,
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id,
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}

 public function getClinicaltrailIMPHandlingProdData(Request $req){

    try{
        $data = array();
        $table_name = 'tra_clinicaltrial_producthandling';
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table($table_name .' as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {

                        
                      
                        $container_type = getSingleRecordColValue('par_containers_types', array('id' => $rec->container_type_id), 'name','mis_db');
                        $generic_name = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name','mis_db');
                        $primary_container = getSingleRecordColValue('par_containers', array('id' => $rec->container_id), 'name','mis_db');
                        $container_materials = getSingleRecordColValue('par_containers_materials', array('id' => $rec->container_material_id), 'name','mis_db');
                        $si_units = getSingleRecordColValue('par_si_units', array('id' => $rec->si_unit_id), 'name','mis_db');

                         $rec_data = DB::connection('mis_db')
                                ->table('clinical_trial_personnel as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->investigator_id))
                                ->first();

                        $rec_no = DB::table('wb_clinical_trial_products as t1')
                                ->select('t1.*')
                                ->where(array('t1.id'=>$rec->common_name_id))
                                ->first();
                      if($rec_no && $rec_data){
                                $data[] = array('id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'registration_no'=>$rec->registration_no,
                                'registration_date'=>$rec->registration_date,
                                'common_name_id'=>$rec_no->common_name_id,
                                'investigator_name'=>$rec_data->name, 
                                'shipping_delivery_distribution'=>$rec->shipping_delivery_distribution, 
                                'storage_requirements_arrangements'=>$rec->storage_requirements_arrangements,
                                'dispensing_trial_medicines'=>$rec->dispensing_trial_medicines, 
                                'investigator_id'=>$rec->investigator_id,
                                'no_of_units'=>$rec->no_of_units,
                                'no_of_packs'=>$rec->no_of_packs,
                                'si_unit_id'=>$rec->si_unit_id,
                'si_units'=>$si_units,
                                'container_type_id'=>$rec->container_type_id,
                                'container_type'=>$container_type,
                                'generic_name'=>$generic_name,
                                'primary_container'=>$primary_container,
                                'container_id'=>$rec->container_id,
                                'container_materials'=>$container_materials,
                                'container_material_id'=>$rec->container_material_id,

                            );  
                      }         


                    }

            $res = array('success'=>true, 
                        'data'=>$data
                        );

            }
            catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            return response()->json($res);
        

   }
 public function getClinicalPersonnelInformation(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('clinical_trial_personnel as t1')
                    ->where(array('t1.trader_id' => $trader_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;

                       $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');
    
                            $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$qualification_id,
                                        'name'=>$rec->name,
                                        'qualification'=>$qualification,
                                        'telephone'=>$rec->telephone,
                                        'email_address'=>$rec->email_address,
                                        'id'=>$rec->id,
                                        'position_id'=>$rec->position_id,
                                        'position'=> getParameterItem('par_personnel_positions',$rec->position_id,'mis_db'),
                                        'trader_id'=>$rec->trader_id,
                                        'application_id'=>$rec->application_id,
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}
           
public function getclinicalStudySitesData(Request $req){
            try{
                $data = array();
                $reg_clinical_trial_id = $req->reg_clinical_trial_id;
                $records = DB::connection('mis_db')->table('clinical_trial_sites as t1')
                                ->join('study_sites as t2', 't1.study_site_id','=','t2.id')
                                ->join('registered_clinical_trials as t3', 't1.application_id','=','t3.tra_clinical_trial_id')
                                ->select('t2.name','t2.id')
                                ->where(array('t3.id'=>$reg_clinical_trial_id))
                                ->get();

                    $res = array('success'=>true, 
                                'data'=>$records
                                );
        
                    }
                    catch (\Exception $e) {
                        $res = array(
                            'success' => false,
                            'message' => $e->getMessage()
                        );
                    } catch (\Throwable $throwable) {
                        $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                        );
                    }
                    return response()->json($res);


           }
   public function getClinicaltrailinvestigatorsData(Request $req){
        
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;
        $records = DB::table('wb_clinical_trial_investigators as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        $study_site_id = $rec->study_site_id;

                        $study_site = getSingleRecordColValue('study_sites', array('id' => $rec->study_site_id), 'name','mis_db');
                        $investigator_category = getSingleRecordColValue('clinical_investigator_cat', array('id' => $rec->category_id),                         'category_name','mis_db');
           
                        $rec_data = DB::connection('mis_db')
                                ->table('clinicaltrial_investigator_personnel as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->investigator_id))
                                ->first();
                                if($rec_data){
                                    $data[] = array('id'=>$rec->id,
                                    'study_site'=>$study_site,
                                    'investigator_category'=>$investigator_category,
                                    'investigator'=>$rec_data->name,
                                    'country'=>$rec_data->country,
                                    'region'=>$rec_data->region,
                                    'district'=>$rec_data->district,
                                    'physical_address'=>$rec_data->physical_address,
                                    'postal_address'=>$rec_data->postal_address,
                                    'telephone'=>$rec_data->telephone);

                                }
                                                    

                    }

            $res = array('success'=>true, 
                        'data'=>$data
                        );

            }
            catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            return response()->json($res);
        
        
           }
   public function getClinicalTrialSites(Request $req){
        
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;
        $records = DB::table('wb_clinical_trial_sites as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        $study_site_id = $rec->study_site_id;
                        $rec_data = DB::connection('mis_db')
                                ->table('study_sites as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->study_site_id))
                                ->first();
                            if($rec_data){
                                $data[] = array('id'=>$rec->id,
                                'site_name'=>$rec_data->name,
                                'approving_instution'=>$rec->approving_instution,
                                'responsible_ethics_committee'=>$rec->responsible_ethics_committee,
                                'approval_date'=>$rec->approval_date,
                                'application_reference_no'=>$rec->application_reference_no,
                                'study_site_id'=>$study_site_id,
                                 'country'=>$rec_data->country,
                                 'region'=>$rec_data->region,
                                 'district'=>$rec_data->district,
                                 'physical_address'=>$rec_data->physical_address,
                                 'postal_address'=>$rec_data->postal_address,
                                 'telephone'=>$rec_data->telephone);

                            }
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);


   }
   
    public function getNonClinicaltrailToxicologyData(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $application_id = $req->application_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_clinicaltrial_toxicitydosage as t1')
                    ->where(array('t1.application_id' => $application_id))
                     ->get();
                     foreach ($records as $rec) {
                        $dosage_type_id = $rec->dosage_type_id;

                       $dose_type = getParameterItem('par_clinicaldosage_toxicity',$rec->dosage_type_id,'mis_db');
    
                            $data[] = array(
                                        'id'=>$rec->id,
                                        'species'=>$rec->species,
                                        'dose_type'=>$dose_type,
                                        'dose_route'=>$rec->dose_route,
                                        'mntd'=>$rec->mntd,
                                        'major_findings'=>$rec->major_findings,
                                        'application_id'=>$rec->application_id
                                    );
                        
                     }
                     $res = array('success'=>true, 'data'=>$data);// $data;
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}
   public function onsaveToxicityDosage(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinicaltrial_toxicitydosage';

        $data = array(
                'dosage_type_id'=>$req->dosage_type_id, 
                'species'=>$req->species,
                'dose_route'=>$req->dose_route,
                'mntd'=>$req->mntd,
                'major_findings'=>$req->major_findings,
                'application_id'=>$application_id);
      
            //insert 
            $where = $data;
            $data['created_by'] = $traderemail_address;
            $data['created_on'] = Carbon::now();
            
            if (!recordExists($table_name, $where)) {
                $resp = insertRecord($table_name, $data, $traderemail_address);
               
                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "These Details has already been added!!";
                
            }
        
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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

  public function onsaveSummaryActivity(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_summary_activity';

            $data = array(
                        'type_of_ammendment'=>$req->type_of_ammendment,
                        'summary_of_ammendment'=>$req->summary_of_ammendment,
                        'date_of_approval_by'=>$req->date_of_approval_by,
                        'application_id'=>$req->application_id,
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');
                
            }
            $res = returnFuncResponses($resp, 'Summary Ammendment Activities', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');  
                $res = returnFuncResponses($resp, 'Summary Ammendment Activities', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Summary Ammendment Activities exists or already saved.');
    
            }

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

 public function onsaveRegulatorystudyLapse(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_regulatorylapse';

            $data = array(
                        'date_of_occurrance'=>$req->date_of_occurrance,
                        'lapse_study_id'=>$req->lapse_study_id,
                        'reason'=>$req->reason,
                        'application_id'=>$req->application_id,
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');
                
            }
            $res = returnFuncResponses($resp, 'Regulatory Details', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');  
                $res = returnFuncResponses($resp, 'Regulatory Details', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Regulatory Details exists or already saved.');
    
            }

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

 public function onsaveDeviationReport(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_deviationrprt';

            $data = array(
                        'deviation'=>$req->deviation,
                        'capa'=>$req->capa,
                        'date_of_occurrance'=>$req->date_of_occurrance,
                        'application_id'=>$req->application_id,
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');
                
            }
            $res = returnFuncResponses($resp, 'Report', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');  
                $res = returnFuncResponses($resp, 'Report ', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Report exists or already saved.');
    
            }

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

 public function onsaveInspectionReport(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_inspectionrprt';

            $data = array(
                        'regulatory_body'=>$req->regulatory_body,
                        'date_of_inspection'=>$req->date_of_inspection,
                        'outcome'=>$req->outcome,
                        'application_id'=>$req->application_id,
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');
                
            }
            $res = returnFuncResponses($resp, 'Inspection Report', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');  
                $res = returnFuncResponses($resp, 'Inspection Report', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Inspection Report exists or already saved.');
    
            }

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

   public function onSaveNonClincialTrialToxicology(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'primary_pharmacodynamics'=>$req->primary_pharmacodynamics, 
                'secondary_pharmacodynamics'=>$req->secondary_pharmacodynamics,
                'safety_pharmacology'=>$req->safety_pharmacology,
                'pharmacodynamic_drug_interactions'=>$req->pharmacodynamic_drug_interactions, 
                'pharmacokinetics'=>$req->pharmacokinetics,
                'toxicology'=>$req->toxicology, 
                'First_in_human_trials'=>$req->First_in_human_trials,
                'glp_aspects'=>$req->glp_aspects

        );

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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


   public function onSaveNonClincialTrialPharmacology(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'primary_pharmacodynamics'=>$req->primary_pharmacodynamics, 
                'secondary_pharmacodynamics'=>$req->secondary_pharmacodynamics,
                'safety_pharmacology'=>$req->safety_pharmacology,
                'pharmacodynamic_drug_interactions'=>$req->pharmacodynamic_drug_interactions, 
                'pharmacokinetics'=>$req->pharmacokinetics

            );

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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


   public function onSaveClincialTrialMeasures(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'sample_size'=>$req->sample_size, 
                'planned_analyses'=>$req->planned_analyses,
                'analysis_sets'=>$req->analysis_sets
            );

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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


   public function saveComparatorProductDetailsDetails(Request $req){
       
       $res = $this-> saveClinicalTrialProductDetailsDetails($req,'wb_clinical_comparatorproducts');
        return response()->json($res);

   }
      public function savePlaceboProductDetailsDetails(Request $req){
       
         $res = $this-> saveClinicalTrialProductDetailsDetails($req,'wb_clinical_placebaproducts');
        return response()->json($res);

   }
      public function saveiMPProductDetailsDetails(Request $req){
       
         $res = $this-> saveClinicalTrialProductDetailsDetails($req,'wb_clinical_trial_products');
        return response()->json($res);

   }
   
   public function saveClinicalTrialProductDetailsDetails($req,$table_name){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $study_site_id = $req->study_site_id;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

         $data = array('brand_name'=>$req->brand_name, 
                        'product_category_id'=>$req->product_category_id,
                        'common_name_id'=>$req->common_name_id, 
                        'country_id'=>$req->country_id,  
                        'dosage_form_id'=>$req->dosage_form_id, 
                        'identification_mark'=>$req->identification_mark, 
                        'manufacturer_id'=>$req->manufacturer_id, 
                        'investigationproduct_section_id'=>$req->investigationproduct_section_id, 
                        'market_location_id'=>$req->market_location_id, 
                        'product_desc'=>$req->product_desc, 
                        'product_strength'=>$req->product_strength, 
                        'registered_product_id'=>$req->registered_product_id, 
                        'registration_date'=>$req->registration_date, 
                        'registration_no'=>$req->registration_no, 
                        'routes_of_admin_id'=>$req->routes_of_admin_id, 
                        'si_unit_id'=>$req->si_unit_id, 
                        'gmdn_code'=>$req->gmdn_code, 
                        'classification_id'=>$req->classification_id, 
                        'gmdn_term'=>$req->gmdn_term, 
                        'gmdn_category'=>$req->gmdn_category, 'device_type_id'=>$req->device_type_id, 
'application_id'=>$req->application_id);
           
        if(validateIsNumeric($record_id)){
            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $traderemail_address;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);
                
            }
        }
        else{
            //insert 
            $where = $data;
            $data['created_by'] = $traderemail_address;
            $data['created_on'] = Carbon::now();
            
            if (!recordExists($table_name, $where)) {
                $resp = insertRecord($table_name, $data, $traderemail_address);
                
                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "The Clinical Trial IMP Product has already been added!!";
                
            }
        } 
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
    return $res;
   }
public function saveiMPHandlingProductDetailsDetails(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $study_site_id = $req->study_site_id;
        $application_id = $req->application_id;
        $record_id = $req->id;
    $table_name = 'tra_clinicaltrial_producthandling';
        $error_message = 'Error occurred, data not saved successfully';

         $data = array(
                        'common_name_id'=>$req->common_name_id, 
                        'country_id'=>$req->country_id,  
                        'registered_product_id'=>$req->registered_product_id, 
                        'registration_date'=>$req->registration_date, 
                        'registration_no'=>$req->registration_no, 
                        'si_unit_id'=>$req->si_unit_id, 
                        'shipping_delivery_distribution'=>$req->shipping_delivery_distribution, 
                        'storage_requirements_arrangements'=>$req->storage_requirements_arrangements, 
                        'dispensing_trial_medicines'=>$req->dispensing_trial_medicines, 
                        'investigator_id'=>$req->investigator_id,
                        'container_type_id'=>$req->container_type_id, 
                        'container_id'=>$req->container_id, 
                        'container_material_id'=>$req->container_material_id, 
                        'no_of_units'=>$req->no_of_units,
                        'no_of_packs'=>$req->no_of_packs, 

                        'application_id'=>$req->application_id
                    );
           
        if(validateIsNumeric($record_id)){
            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $traderemail_address;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address,'mis_db');
                
            }
        }
        else{
            //insert 
            $where = $data;
            $data['created_by'] = $traderemail_address;
            $data['created_on'] = Carbon::now();
            
            if (!recordExists($table_name, $where,'mis_db')) {
                $resp = insertRecord($table_name, $data, $traderemail_address,'mis_db');
                
                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "The Clinical Trial IMP Product has already been added!!";
                
            }
        } 
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
    return $res;
   }

public function onsaveConcomittantDrugDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
       $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;
        $table_name = 'tra_clinicaltrial_concomittant';

            $data = array(
                        'brand_name'=>$req->brand_name,
                        'common_name_id'=>$req->common_name_id,
                        'dosage_form_id'=>$req->dosage_form_id,
                        'routes_of_admin_id'=>$req->routes_of_admin_id,
                        'indication'=>$req->indication,
                        'application_code'=>$application_code,
                        'application_id'=>$req->application_id,
                        'start_date'=>$req->start_date,
                        'end_date'=>$req->end_date,
                        'ongoing_id'=>$req->ongoing_id,
                        'manufacturer_name'=>$req->manufacturer_name,
                        'registered_product_id'=>$req->registered_product_id,
                        'manufacturer_id'=>$req->manufacturer_id,
                        'registration_date'=>$req->registration_date,
                        'registration_no'=>$req->registration_no,
                        'trader_id'=>$req->trader_id
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Concomittant Drugs', 'application_code', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Concomittant Drugs', 'application_code', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Concomittant Drugs exists or already saved.');
    
            }

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
    public function onDeleteMisTablePermitdetails(Request $req){
            try{
                $record_id = $req->record_id;
                $application_code = $req->application_code;
                $application_id = $req->application_id;
                $table_name = $req->table_name;
                $title = $req->title;
                $email_address = $req->email_address;
                $data = array();
                //get the records 
                $resp = false;
                
                $where_state = array( 'id'=>$record_id);
                
                $records = DB::connection('mis_db')->table($table_name)
                        ->where($where_state)
                        ->get();
                
                if(count($records) >0){
                        //delete functionality
                        $previous_data = getPreviousRecords($table_name, $where_state,'mis_db');
                        $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address);
                
                }
                if($resp){
                    $res = array('success'=>true, 'message'=>$title.' deleted successfully');
        
                }   
                else{
                    $res = array('success'=>false, 'message'=>$title.' delete failed, contact the system admin if this persists');
                }
            }
            catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            return response()->json($res);
        }

public function onsaveRelevantHistoryDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_code;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
       $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;
        $table_name = 'tra_clinicaltrial_sae_relevanthistory';

            $data = array(
                        'other_relevant_history'=>$req->other_relevant_history,
                        'seriousness_id'=>$req->seriousness_id,
                        'expected_id'=>$req->expected_id,
                        'application_code'=>$application_code,
                        'application_id'=>$req->application_id,
                        'trader_id'=>$req->trader_id
                     ); 

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Relevant History', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db');
                $res = returnFuncResponses($resp, 'Relevant History', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Relevant History exists or already saved.');
    
            }

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

public function saveClinicalCasualityAssessmentDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
        $table_name = 'tra_clinicaltrial_casuality_assessment';
        $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;

            $data = array(
                        'tool_id'=>$req->tool_id,
                        'other_tool'=>$req->other_tool,
                        'other_cause_event'=>$req->other_cause_event,
                        'casuality_id'=>$req->casuality_id,
                        'conclusion_releted_id'=>$req->conclusion_releted_id,
                        'severity_event_id'=>$req->severity_event_id,
                        'outcome_event_id'=>$req->outcome_event_id,
                        'application_code'=>$application_code,
                        'confirmation_id'=>$req->confirmation_id,
                        'confirmed_date'=>$req->confirmed_date,
                        'drug_stop_id'=>$req->drug_stop_id,
                        'reported_id'=>$req->reported_id,
                        'application_id' => $req->application_id,

                        'trader_id'=>$req->trader_id
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Casuality Assessment', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Casuality Assessment', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Casuality Assessment exists or already saved.');
    
            }

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

public function saveClinicalSaeDrugsDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
        $table_name = 'tra_clinicaltrial_sae_drug';
        $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;

            $data = array(
                        'brand_name'=>$req->brand_name,
                        'common_name_id'=>$req->common_name_id,
                        'dosage_form_id'=>$req->dosage_form_id,
                        'routes_of_admin_id'=>$req->routes_of_admin_id,
                        'indication'=>$req->indication,
                        'application_code'=>$application_code,
                        'start_date'=>$req->start_date,
                        'end_date'=>$req->end_date,
                        'ongoing_id'=>$req->ongoing_id,
                        'manufacturer_name'=>$req->manufacturer_name,
                        'registered_product_id'=>$req->registered_product_id,
                        'manufacturer_id'=>$req->manufacturer_id,
                        'registration_date'=>$req->registration_date,
                        'registration_no'=>$req->registration_no,
                        'application_id' => $req->application_id,

                        'trader_id'=>$req->trader_id
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Suspected Drug', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Suspected Drug', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Suspected Drug exists or already saved.');
    
            }

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

   
   public function onsaveSaeInvestigationsDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id =$req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_sae_investigations';
        $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;
            $data = array(
                        'investigations'=>$req->investigations,
                        'results'=>$req->results,
                        'trader_id'=>$req->trader_id,
                        'application_code'=>$application_code,
                        'application_id'=>$req->application_id

                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Investigations Details', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Investigations Details', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Investigations Details or already saved.');
    
            }

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


   public function saveClinicalSaeLabTetsDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id =$req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
        $rec = DB::table('wb_clinical_trial_applications as t1')
                    ->leftJoin('wb_clinicaltrial_saereports as t2','t2.application_id','=','t1.id')
                    ->where(array('t2.application_id'=>$application_id))
                    ->first();
        $application_code = $rec->application_code;
    
        $table_name = 'tra_clinicaltrial_sae_labtest';

            $data = array(
                        'laboratory_test'=>$req->laboratory_test,
                        'results'=>$req->results,
                        'trader_id'=>$req->trader_id,
                        'application_id'=>$req->application_id,
                        'application_code'=>$application_code
                     ); 

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Laboratory Test', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Laboratory Test', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Laboratory Test exists or already saved.');
    
            }

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
public function  getClinicaltrailCasualityAssessmentDetails(Request $req){

    
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_code = $req->application_code;
        $application_id = $req->application_id;


        $records = DB::connection('mis_db')->table('tra_clinicaltrial_casuality_assessment as t1')
                            ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
            foreach ($records as $rec) {
                $tool = getSingleRecordColValue('par_adr_tools', array('id' => $rec->tool_id), 'name','mis_db');
                $casuality = getSingleRecordColValue('par_adr_casuality', array('id' => $rec->casuality_id), 'name','mis_db');
                $conclusion_relatedness  = getSingleRecordColValue('par_adr_reletedness', array('id' => $rec->conclusion_releted_id), 'name','mis_db');
                $severity_event = getSingleRecordColValue('par_adr_severity', array('id' => $rec->severity_event_id), 'name','mis_db');
                $outcome_event = getSingleRecordColValue('par_adr_outcomes', array('id' => $rec->outcome_event_id), 'name','mis_db');
                $confirmation = getSingleRecordColValue('par_confirmations', array('id' => $rec->confirmation_id), 'name','mis_db');
                $drug_stopped = getSingleRecordColValue('par_confirmations', array('id' => $rec->drug_stop_id), 'name','mis_db');
              $adverse_event_reported = getSingleRecordColValue('par_confirmations', array('id' => $rec->reported_id), 'name','mis_db');


                        $data[] = array('id'=>$rec->id,
                                'application_code'=>$rec->application_code,
                                'conclusion_releted_id'=>$rec->conclusion_releted_id,
                                'tool_id'=>$rec->tool_id,
                                'severity_event_id'=>$rec->severity_event_id,
                                'casuality_id'=>$rec->casuality_id,
                                'outcome_event_id'=>$rec->outcome_event_id,
                                'confirmation_id'=>$rec->confirmation_id,
                                'tool'=>$tool,
                                'casuality'=>$casuality,
                                'confirmed_date'=>$rec->confirmed_date,
                                'other_tool'=>$rec->other_tool,
                                'other_cause_event'=>$rec->other_cause_event,
                                'drug_stop_id'=>$rec->drug_stop_id,
                                'conclusion_relatedness'=>$conclusion_relatedness,
                                'severity_event'=>$severity_event,
                                'outcome_event'=>$outcome_event,
                                'confirmation'=>$confirmation,                                
                                'drug_stopped'=>$drug_stopped,
                                'adverse_event_reported'=>$adverse_event_reported,
                    );
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }

  public function  getClinicaltrailSeaDrugs(Request $req){

    
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_code = $req->application_code;
        $application_id = $req->application_id;


        $records = DB::connection('mis_db')->table('tra_clinicaltrial_sae_drug as t1')
                            ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
            foreach ($records as $rec) {
                $formulation = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name','mis_db');
                $routes_of_administration = getSingleRecordColValue('par_route_of_administration', array('id' => $rec->routes_of_admin_id), 'name','mis_db');


                        $data[] = array('id'=>$rec->id,
                                'application_code'=>$rec->application_code,
                                'brand_name'=>$rec->brand_name,
                                'common_name_id'=>$rec->common_name_id,
                                'dosage_form_id'=>$rec->dosage_form_id,
                                'routes_of_admin_id'=>$rec->routes_of_admin_id,
                                'indication'=>$rec->indication,
                                'start_date'=>$rec->start_date,
                                'formulation'=>$formulation,
                                'routes_of_administration'=>$routes_of_administration,
                                'end_date'=>$rec->end_date,
                                'ongoing_id'=>$rec->ongoing_id,
                                'manufacturer_name'=>$rec->manufacturer_name,
                    );
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }

public function  getClinicaltrailconcomittantDetails(Request $req){

    try{
        $data = array();
        $table_name = $req->table_name;
        $application_code = $req->application_code;
        $application_id = $req->application_id;

        $records = DB::connection('mis_db')->table('tra_clinicaltrial_concomittant as t1')
                    ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
            foreach ($records as $rec) {
                $formulation = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name','mis_db');
                $routes_of_administration = getSingleRecordColValue('par_route_of_administration', array('id' => $rec->routes_of_admin_id), 'name','mis_db');


                        $data[] = array('id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'drug_name'=>$rec->brand_name,
                                'common_name_id'=>$rec->common_name_id,
                                'dosage_form_id'=>$rec->dosage_form_id,
                                'routes_of_admin_id'=>$rec->routes_of_admin_id,
                                'indication'=>$rec->indication,
                                'start_date'=>$rec->start_date,
                                'formulation'=>$formulation,
                                'routes_of_administration'=>$routes_of_administration,
                                'end_date'=>$rec->end_date,
                                'ongoing_id'=>$rec->ongoing_id,
                                'manufacturer_name'=>$rec->manufacturer_name,
                    );
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }

public function  getClinicaltrailRelevantHistoryDetails(Request $req){

    try{
        $data = array();
        $table_name = $req->table_name;
        $application_code = $req->application_code;
        $application_id = $req->application_id;

        $records = DB::connection('mis_db')->table('tra_clinicaltrial_sae_relevanthistory as t1')
                    ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
            foreach ($records as $rec) {
                $seriousness = getSingleRecordColValue('par_adr_seriousness', array('id' => $rec->seriousness_id), 'name','mis_db');
                $expectetation = getSingleRecordColValue('par_clinical_sae_expectation', array('id' => $rec->expected_id), 'name','mis_db');


                        $data[] = array('id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'other_relevant_history'=>$rec->other_relevant_history,
                                'seriousness_id'=>$rec->seriousness_id,
                                'expected_id'=>$rec->expected_id,
                                'seriousness'=>$seriousness,
                                'expectetation'=>$expectetation
                    );
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }


  public function  getClinicaltrailSeaLabTest(Request $req){

    
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;

        $records = DB::connection('mis_db')->table('tra_clinicaltrial_sae_labtest as t1')
                    ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
    
            foreach ($records as $rec) {

                        $data[] = array('id'=>$rec->id,
                                'application_code'=>$rec->application_code,
                                'results'=>$rec->results,
                                'laboratory_test'=>$rec->laboratory_test
                    );
                    }

            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }

  public function  getClinicaltrailSeaVariations(Request $req){

    
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;

        $records = DB::connection('mis_db')->table('tra_clinicaltrial_sae_investigations as t1')
                    ->select(DB::raw("t1.*"))
                    ->where(array('application_id'=>$application_id))
                    ->get();
                foreach ($records as $rec) {

                        $data[] = array('id'=>$rec->id,
                                'application_code'=>$rec->application_code,
                                'results'=>$rec->results,
                                'investigations'=>$rec->investigations
                    );
                    }
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }
   
   public function onSaveClinicalPersonnel(Request $req){
    try{
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'clinical_trial_personnel';

            $data = array(
                        'name'=>$req->name,
                        'telephone'=>$req->telephone,
                        'email_address'=>$req->email_address,
                        'trader_id'=>$req->trader_id,
                        'position_id'=>$req->position_id,
                        'application_id'=>$req->application_id,
                        'qualification_id'=>$req->qualification_id,
                     );  

        if(validateIsNumeric($record_id)){

            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email,'mis_db');

            }
            $res = returnFuncResponses($resp, 'Other Staff', 'application_id', $trader_id);                             

        }
        else{
            if(!recordExists($table_name, $data,'mis_db')){
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $trader_email;
                                    
                $resp = insertRecord($table_name, $data, $trader_email,'mis_db'); 
                $res = returnFuncResponses($resp, 'Other Staff', 'application_id', $trader_id);                             
            }
            else{
                $res = array(
                        'success'=>false,
                        'message'=>'Premises Personnel exists or already saved.');
    
            }

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
   
   public function onsaveclinicaltrailVariationRequests(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $study_site_id = $req->study_site_id;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_application_variationsdata';

         $data = array('variation_type_id'=>$req->variation_type_id, 
                        'variation_category_id'=>$req->variation_category_id,
                        'present_details'=>$req->present_details,
                        'proposed_variation'=>$req->proposed_variation,
                        'variation_background_information'=>$req->variation_background_information,
                        'status_id'=>1,
                        'application_code'=>$req->application_code);
           
        if(validateIsNumeric($record_id)){
            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
            $where = $data;
            $data['created_by'] = $trader_email;
            $data['created_on'] = Carbon::now();
            $data['date_added'] = Carbon::now();
            if (!recordExists($table_name, $where)) {
                $resp = insertRecord($table_name, $data, $trader_email);
                

                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "The Clinical Trial Variation Request has already been added!!";
                
            }
        } 
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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

   public function onSaveClincialTrialDescriptionApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'clinicaltrial_description'=>$req->clinicaltrial_description, 
                'explorator_objective'=>$req->explorator_objective,
                'other_objective'=>$req->other_objective,
                'purpose_of_trial'=>$req->purpose_of_trial,
                'trial_design'=>$req->trial_design,
                'clinicaltrialprimary_objective'=>$req->clinicaltrialprimary_objective,
                'tertiary_objectives'=>$req->tertiary_objectives,
                'clinicaltrialsecondary_objective'=>$req->clinicaltrialsecondary_objective
            );
        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
   public function onSaveClincialTrialOthersApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'primary_endpoints'=>$req->primary_endpoints, 
                'secondary_endpoints'=>$req->secondary_endpoints,
                'inclusion_criteria'=>$req->inclusion_criteria,
                'exclusion_criteria'=>$req->exclusion_criteria,
                'tertiary_endpoints'=>$req->tertiary_endpoints,
                'sample_size'=>$req->sample_size,
                'planned_analyses'=>$req->planned_analyses,
                'analysis_sets'=>$req->analysis_sets
                );
        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
   public function onSaveClincialTrialEthicsApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'clearance_no'=>$req->clearance_no, 
                'ctrethics_committee_id'=>$req->ctrethics_committee_id,
                'uncst_no'=>$req->uncst_no);

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
      public function onSaveMonitoringApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'safety_monitoring_plan'=>$req->safety_monitoring_plan, 
                'system_used'=>$req->system_used,
                'action_seriousadverse_event'=>$req->action_seriousadverse_event,
                'safety_monitoring_board'=>$req->safety_monitoring_board,
                'data_management_process'=>$req->data_management_process,
                'estimated_due_report_date'=>$req->estimated_due_report_date, 
                'interim_report_date'=>$req->interim_report_date
                );

        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
   public function onSaveClincialTrialParticipantsApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'participant_no'=>$req->participant_no, 
                'enrolled_worldwide_no'=>$req->enrolled_worldwide_no,
                'enrolled_uganda_no'=>$req->enrolled_uganda_no, 
                'sites_no'=>$req->sites_no,
                'intended_no'=>$req->intended_no, 
                'study_start_date'=>$req->study_start_date,
                'first_final_duration'=>$req->first_final_duration, 
                'screening_period'=>$req->screening_period,
                'follow_up_period'=>$req->follow_up_period, 
                'follow_up_duration'=>$req->follow_up_duration,
                'intervention_period'=>$req->intervention_period, 
                'intervention_duration'=>$req->intervention_duration,
                'study_duration'=>$req->study_duration,
                'duration_desc'=>$req->duration_desc
            );
        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
public function onSaveClincialTrialHistoryApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_clinical_trial_applications';

            $data = array(
                'is_clinicaltrialin_uganda'=>$req->is_clinicaltrialin_uganda, 
                'clinicalin_otheruganda_sites'=>$req->clinicalin_otheruganda_sites,
                'is_clinicaltrialin_othercountry'=>$req->is_clinicaltrialin_othercountry, 
                'clinicalin_othercountries_sites'=>$req->clinicalin_othercountries_sites,
                'is_prevclinicaltrialin_othercountry'=>$req->is_prevclinicaltrialin_othercountry, 
                'prevclinicalin_othercountries_sites'=>$req->prevclinicalin_othercountries_sites
            );
        if(validateIsNumeric($application_id)){
            $where = array('id'=>$application_id);
            if (recordExists($table_name, $where)) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                
            }
        }
        else{
            //insert 
         return response()->json($res);


        } 
        if($resp){
            $res =  array('success'=>true,
            'application_id'=>$application_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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

   public function onSaveClinicalStudySite(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $study_site_id = $req->study_site_id;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = $req->table_name;

        $data = array('study_site_id'=>$study_site_id, 
                'approving_instution'=>$req->approving_instution,
                'responsible_ethics_committee'=>$req->responsible_ethics_committee,
                'approval_date'=>$req->approval_date,
                'application_reference_no'=>$req->application_reference_no,
                 'application_id'=>$application_id);
      
            //insert 
            $where = $data;
            $data['created_by'] = $traderemail_address;
            $data['created_on'] = Carbon::now();
            
            if (!recordExists($table_name, $where)) {
                $resp = insertRecord($table_name, $data, $traderemail_address);
               
                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "The Clinical Trial Study Site has already been added!!";
                
            }
        
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
   
   public function onsaveclinicaltMonitorDetails (Request $req){
                $resp ="";
                $monitor_id = $req->monitor_id;
                $application_id = $req->application_id;
            
               
                $table_name = 'wb_clinical_trial_monitors';

                $data = array('monitor_id'=>$monitor_id,
                            'application_id'=>$application_id
                        );
                        $res = $this->onSaveClinicalPersonnelDetails($data,$table_name,$req);
                        return response()->json($res);
   }
   //
   public function onsaveclinicaltInvestigatorDetails(Request $req){
            $resp ="";
            
            $category_id = $req->category_id;
            $investigator_id = $req->investigator_id;
            $study_site_id = $req->study_site_id;
            $application_id = $req->application_id;
           

            $error_message = 'Error occurred, data not saved successfully';

            $table_name = 'wb_clinical_trial_investigators';
            $data = array('category_id'=>$category_id,
                        'investigator_id'=>$investigator_id,
                        'study_site_id'=>$study_site_id,
                        'application_id'=>$application_id
                    );
            $res = $this->onSaveClinicalPersonnelDetails($data,$table_name,$req);
            return response()->json($res);

   }
   function onSaveClinicalPersonnelDetails($data,$table_name,$req){
    try{
        $record_id = $req->record_id;
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $error_message = 'Error occurred, data not saved successfully';

        if(validateIsNumeric($record_id)){
            $where = array('id'=>$record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                            
                $data['dola'] = Carbon::now();
                $data['altered_by'] = $traderemail_address;

                $previous_data = getPreviousRecords($table_name, $where);
                
                $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);

            }
        }
        else{
            //insert 
            $where = $data;
            $data['created_by'] = $traderemail_address;
            $data['created_on'] = Carbon::now();
            
            if (!recordExists($table_name, $where)) {
                $resp = insertRecord($table_name, $data, $traderemail_address);
                $record_id = $resp['record_id'];           
            }
            else{
                $error_message = "Data has already been added!!";

                return response()->json(['message' => $error_message]);

            }
        } 
        if($resp['success']){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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
    return $res;
   
   }

   public function onsaveStudySiteDetails(Request $req){
    try{
            $resp ="";
            $table_name = 'study_sites';
            $trader_id = $req->trader_id;
            $traderemail_address = $req->trader_email;
            $application_id  = $req->application_id;
            $email = $req->email;
            $error_message = 'Error occurred, data not saved successfully';

            $data = $req->all();
            $record_id = $req->record_id;
            $product_id = $req->product_id;
            unset($data['table_name']);
            unset($data['trader_email']);
            unset($data['application_id']);
            unset($data['trader_id']);
            unset($data['product_id']);
            unset($data['tin_no']);
                $data['created_by'] = $traderemail_address;
                $data['created_on'] = Carbon::now();
                $where = array('name'=>$data['name']);
             if(validateIsNumeric($record_id)){
                 $where = array('id'=>$record_id);
                if (recordExists($table_name, $where,'mis_db')) {

                    $previous_data = getPreviousRecords($table_name, $where);
                     $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);                   
                   
                }
   
            }else{
             if (!recordExists($table_name, $where,'mis_db')) {
                    
                    $resp = insertRecord($table_name, $data, $traderemail_address,'mis_db');
                    $record_id = $resp['record_id'];     
                    $data = array('study_site_id'=>$record_id, 'application_id'=>$application_id);
                    $resp = insertRecord('wb_clinical_trial_sites', $data, $traderemail_address);
                   
                }
                else{
                    $error_message = "The Information exists with the following email Address: ".$email_address;
                    
                }

           }
      
        if($resp){
            $res =  array('success'=>true,
            'record_id'=>$record_id,
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
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





    public function getCasaultyAssessment(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            $causalityReport_main = DB::connection('mis_db')->table('tra_pv_causality_assessment as t1')
                ->leftJoin('par_pv_causality_asssessment as t2', 't1.question_id', '=', 't2.id')
                ->where('t1.application_code', $application_code)
                ->select(DB::raw("DISTINCT t1.id, t1.*, t2.question,t2.quidelines"))
                ->get();

            if ($causalityReport_main->isNotEmpty()) {
                $data = $causalityReport_main;
            } else {
                $templatereport_qry = DB::connection('mis_db')->table('par_pv_causality_asssessment as t1')
                    ->select(DB::raw("DISTINCT t1.id, t1.*, t1.id as question_id "));
                $data = $templatereport_qry->get();
            }


            $res = array(
                'success' => true,
                'data' => $data,
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


    public function saveAssessmentReportdetails(Request $request)
        {
            $application_code = $request->input('application_code');
            $report_questions = $request->input('report_questions');
            $report_questions = json_decode($report_questions);
            $table_name = 'tra_pv_causality_assessment';
            $trader_id =$request->trader_id;
            try {
                foreach ($report_questions as $report_question) {
                    $id = ''; 
                    $question_id = $report_question->question_id;
                    $score_id = $report_question->score_id;
                    $score = '';

                     switch ($question_id) {
                        case 1:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                            break;
                        case 2:
                            if ($score_id == 1) {
                                $score = 2;
                            } elseif ($score_id == 2) {
                                $score = -1;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 3:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 4:
                            if ($score_id == 1) {
                                $score = 2;
                            } elseif ($score_id == 2) {
                                $score = -1;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 5:
                            if ($score_id == 1) {
                                $score = -1;
                            } elseif ($score_id == 2) {
                                $score = 2;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 6:
                            if ($score_id == 1) {
                                $score = -1;
                            } elseif ($score_id == 2) {
                                $score = 1;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 7:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 8:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 9:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                        case 10:
                            if ($score_id == 1) {
                                $score = 1;
                            } elseif ($score_id == 2) {
                                $score = 0;
                            } elseif ($score_id == 3) {
                                $score = 0;
                            }
                        break;
                    }

                    $report_question_data = array(
                        'question_id' => $question_id,
                        'application_code' => $application_code,
                        'score_id' => $score_id,
                        'score' => $score
                    );

                    $where = array(
                        'question_id' => $question_id,
                        'application_code' => $application_code
                    );

                    if (recordExists($table_name, $where,'mis_db')) {
                        $existingRecord = getPreviousRecords($table_name, $where,'mis_db');
                        if ($existingRecord['success'] == false) {
                            return $existingRecord;
                        }
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $trader_id;
                        updateRecord($table_name, $existingRecord['results'], $where, $report_question_data, $trader_id,'mis_db');
                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report updated successfully!!'
                        );
                    } else {

                        // Insert as a new record
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $trader_id;
                        DB::connection('mis_db')->table($table_name)->insert($report_question_data);

                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report saved successfully!!'
                        );
                    }
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

            return \response()->json($res);
        }




   public function getClinicalTrialsList(Request $request)
   {
       $filter = $request->input('filter');
       $mistrader_id = $request->mistrader_id;
       $whereClauses = array();
       
       try {
           $qry = DB::connection('mis_db')->table('tra_clinical_trial_applications as t2')
               ->Join('registered_clinical_trials as t1', 't1.tra_clinical_trial_id', '=', 't2.id')
               ->Join('wb_trader_account as t3', 't2.applicant_id', '=', 't3.id')
               ->leftJoin('clinical_trial_personnel as t4', 't2.sponsor_id', '=', 't4.id')
               ->leftJoin('clinical_trial_personnel as t5', 't2.investigator_id', '=', 't5.id')
               ->Join('tra_approval_recommendations as t6', 't2.application_code', '=', 't6.application_code')
               ->leftJoin('tra_payments as t7', 't2.application_code', '=', 't7.application_code')
               ->select(DB::raw("DISTINCT t1.id as registered_id,t2.*,t2.id as previous_id,t6.certificate_no as permit_no,t6.approval_date as date_registered,t3.name as applicant_name,t4.name as             clinical_trial_sponsor,t5.name as principal_investigator,t1.id as reg_clinical_trial_id,
                   t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                   t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,
                   t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,
                   t3.telephone_no as app_telephone,t3.fax as app_fax, t3.email as app_email, t3.website as app_website"))
                     ->groupBy('t2.application_code');
                  //->where(array('t2.applicant_id'=>$mistrader_id));

           $results = $qry->get();
           $res = array(
               'success' => true,
               'data' => $results,
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
  public function  getClinicaltrailVariationsrequests(Request $req){

    
    try{
        $data = array();
        $table_name = $req->table_name;
        $application_code = $req->application_code;

        $records = DB::table('wb_application_variationsdata as t1')
                    ->where(array('application_code'=>$application_code))
                    ->get();
                    foreach ($records as $rec) {
                        $type_of_variation = getSingleRecordColValue('par_typeof_variations', array('id' => $rec->variation_type_id), 'name','mis_db');
                        $variation_category = getSingleRecordColValue('par_variations_categories', array('id' => $rec->variation_category_id), 'name','mis_db');

                        $data[] = array('id'=>$rec->id,
                                       'application_code'=>$rec->application_code,
                                       'variation_type_id'=>$rec->variation_type_id,
                                        'variation_category_id'=>$rec->variation_category_id,
                                        'present_details'=>$rec->present_details,
                                        'proposed_variation'=>$rec->proposed_variation,
                                        'variation_background_information'=>$rec->variation_background_information,
                                        'name'=>$variation_category,
                                        'variation_category'=>$variation_category,
                                        'type_of_variation'=>$type_of_variation);
                    }

    
            $res = array('success'=>true, 
                        'data'=>$data
                        );
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);

  }
  public function  saveClinicalTrialRegistryApplication(Request $req){
    try {
        $resp= array();
        $application_id = $req->id;
        $trader_id = $req->trader_id;
        $mistrader_id = $req->mistrader_id;
        $email = $req->email;
        $trader_email = $req->trader_email;
        $section_id = $req->section_id;
        $module_id = $req->appmodule_id;
        $sub_module_id = $req->sub_module_id;

        $protocol_no = $req->protocol_no;
        $tracking_no = $req->tracking_no;
        $phase_id = $req->phase_id;
        $disease_being_studied = $req->disease_being_studied;
        $application_code = $req->application_code;
         $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
        if(!validateIsNumeric($mistrader_id)){
             $applicant_data = getTableData('wb_trader_account', array('id'=>$trader_id));
                                            $applicantidentification_no = $applicant_data->identification_no;
                                            $applicant  = getTableData('wb_trader_account', array('identification_no'=>$applicantidentification_no),'mis_db');
                    $mistrader_id = $applicant->id;
        }
        $app_data = array('section_id'=>$req->section_id,
                                'sub_module_id'=>$req->sub_module_id,
                                'module_id'=>$req->appmodule_id,
                                'phase_id'=>$phase_id,
                                 'is_ctrapp_registered'=>$req->is_ctrapp_registered,
                                 'process_id'=>$process_id,
                                 'protocol_no'=>$protocol_no,
                                
                                'ctrregistered_tracking_no'=>$req->ctrregistered_tracking_no,
                                'acronym'=>$req->acronym,
                                'actualtrial_start_date'=>$req->actualtrial_start_date,
                                'anticipatedfollow_uplast_date'=>$req->anticipatedfollow_uplast_date,
                                'clinicaltrial_description'=>$req->clinicaltrial_description,
                                'completion_date'=>formatDate($req->completion_date),
                                'study_start_date'=>formatDate($req->study_start_date),
                                'final_participants'=>$req->final_participants,
                                'other_obstetrics_disease'=>$req->other_obstetrics_disease,
                                'proposed_start_date'=>$req->proposed_start_date,
                                'study_title'=>$req->study_title,
                                'public_title'=>$req->public_title,
                                
                                'publication_url'=>$req->publication_url,
                                'purpose_of_trial'=>$req->purpose_of_trial,
                                'recruitment_status_id'=>$req->recruitment_status_id,
                                'target_participants'=>$req->target_participants,
                                'version_no'=>$req->version_no,
                                'trial_design'=>$req->trial_design,
                                'applicant_id'=>$mistrader_id,
                                'investigator_id'=>$req->investigator_id,
                                'registered_institution'=>$req->registered_institution,
                                'registered_institution_refno'=>$req->registered_institution_refno,
                            );
                      
                  //  disease_being_studied "" zone_id
                    
                    $sub_module_id = $req->sub_module_id;
              
                    $table_name = 'tra_clinical_trial_applications';
                    if(validateIsNumeric($application_id)){
                           
                           $where_app = array('id'=>$application_id);

                            if (recordExists('tra_clinical_trial_applications', $where_app,'mis_db')) {
                                
                                $app_data['altered_by'] = $trader_email;
                                $app_data['dola'] = Carbon::now();
                               
                                $previous_data = getPreviousRecords('tra_clinical_trial_applications', $where_app,'mis_db');
                                $application_code = $previous_data['results'][0]['application_code'];

                                $tracking_no = $previous_data['results'][0]['tracking_no'];
                                $resp =   updateRecord('tra_clinical_trial_applications', $previous_data, $where_app, $app_data, $trader_email,'mis_db');
                             
                               $where_app = array('application_code'=>$application_code);
                                if (!recordExists('tra_application_uploadeddocuments', $where_app,'mis_db')) {
                                    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                                }
                        }
                        
                    }
                    else{
                        $record = '';
                        //rec
                            
                            $app_data['created_on'] = Carbon::now();
                            
                            $app_data['date_added'] = Carbon::now();
                            $app_data['created_by'] = $trader_email;
                            $app_data['clinical_registrystatus_id'] = 1;
                            $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                            
                            $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                           
                            $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                            
                            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                            $application_code = generateApplicationCode($sub_module_id, 'tra_clinical_trial_applications','mis_db');
                            $codes_array = array(
                                'section_code' => $section_code,
                                'zone_code' => '00'
                            );
                            $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, 2, $trader_id,'mis_db');
                            if (!validateIsNumeric($ref_id )) {
                                return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                            }
                            else if( $tracking_no == ''){
                                return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                            }
                            
                           $app_data['tracking_no'] =   $tracking_no;
                           $app_data['application_status_id'] =   1;
                           $app_data['application_code'] =   $application_code;
                           $app_data['date_added'] =  Carbon::now();
                                    
                                        $resp = insertRecord('tra_clinical_trial_applications', $app_data, $trader_email,'mis_db');

                                        $record_id = $resp['record_id'];
                                        $application_id = $record_id;
                                        if($resp['success']){
                                                //create all the details
                                              
                                             initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                                         }
                           
                    }
                    $disease_beingdata = array();
                    //save the diseases
                    DB::connection('mis_db')->table('tra_clinicaltrial_studydiseases')->where(array('application_id'=>$application_id))->delete();
                    if(is_array($disease_being_studied)){
                        foreach($disease_being_studied as $disease_id){
                                                    
                                $disease_beingdata[] = array('disease_being_studied'=>$disease_id, 
                                                'application_id'=>$application_id, 
                                                'created_by'=>$trader_email, 
                                                'created_on'=>Carbon::now());

                        }

                    }
                    
                    
                    DB::connection('mis_db')->table('tra_clinicaltrial_studydiseases')->insert($disease_beingdata);
                    if($resp['success']){
                        $res = array('tracking_no'=>$tracking_no,
                                    'application_id'=>$application_id,
                                    'application_code'=>$application_code,
                                     'module_id'=>$module_id,
                                     'sub_module_id'=>$sub_module_id,
                                     'success'=>true,
                                     'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                    
                     }
                     else{
                        $res = array(
                        'success'=>false,
                        'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                     }

                           
                    
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'message1'=>$resp,
            'message' => $exception->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,'message1'=>$resp,
            'message' => $throwable->getMessage()
        );
    }
    
    return response()->json($res);
}   
public function getClinicalRegistryDetails(Request $req){
        try{
            $search_value = $req->search_value;
            $mistrader_id = $req->mistrader_id;
            $sub_module_id = 56;
           // 'applicant_id'=>$mistrader_id,
           $where_statement= array('sub_module_id'=>$sub_module_id);

           if(validateIsNumeric($mistrader_id)){
                $where_statement['applicant_id'] = $mistrader_id;
           }
            $data = DB::connection('mis_db')->table('tra_clinical_trial_applications as t1')
                        ->leftJoin('par_clinicaltrial_designs as t2', 't1.trial_design_id','t2.id')
                        ->leftJoin('par_clinical_phases as t3', 't1.phase_id','t3.id')
                        ->leftJoin('par_clinical_recruitmentstatuses as t5', 't1.recruitment_status_id','t5.id')
                        ->leftJoin('par_clinical_registrystatuses as t6', 't1.clinical_registrystatus_id','t6.id')
                        ->select("t1.*",'t2.name as trial_design','t6.name as application_status', 't3.name as clinical_study_phase', 't5.name as recruitment_status')
                        ->where($where_statement)
                        ->get();
                      
                        $res =array('success'=>true,'data'=> $data);
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,'message1'=>$resp,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
}
public function getClinicalRegistryAppData(Request $req){
    try{
        $search_value = $req->search_value;
        $application_code = $req->application_code;
        $sub_module_id = 53;
        $return_datasets = array();
       // 'applicant_id'=>$mistrader_id,
        $data = DB::connection('mis_db')->table('tra_clinical_trial_applications as t1')
                    ->select(DB::raw("t1.*,t3.name as principal_investigator, t1.id as application_id, if(t1.ctrregistered_tracking_no is null, t2.certificate_no, t1.ctrregistered_tracking_no) as ctrregistered_tracking_no,if(t1.public_title is null, t1.study_title, t1.public_title) as public_title"))
                    ->leftJoin('tra_approval_recommendations as t2', 't1.application_code','t2.application_code')
                    ->leftJoin('clinical_trial_personnel as t3', 't1.investigator_id','t3.id')
                    ->where(array('t1.application_code'=>$application_code))
                    ->first();
            $data = (array)$data;
            $data['proposed_start_date']  = formatDate($data['proposed_start_date']);
            $data['actualtrial_start_date']  = formatDate($data['actualtrial_start_date']);
            $data['anticipatedfollow_uplast_date']  = formatDate($data['anticipatedfollow_uplast_date']);
            $data['completion_date']  = formatDate($data['completion_date']);
            
            $data['disease_being_studied'] = $this->getClinicalTrialdiseases( $data['application_id']);
            //get the other datasets 
            $return_datasets['trial_details'] = $data;
            $return_datasets['clinicaltrial_secondaryids'] = $this->getClinicalSecondaryIds( $data['application_id']);
            $return_datasets['clinicaltrial_studydesign'] = $this->getClinicalStudyDesign( $data['application_id']);
            $return_datasets['eligibilitycriteria'] = $this->getClinicalEligibilities( $data['application_id']);
           
            $return_datasets['fundingsource'] = $this->getClinicalFundingSource( $data['application_id']);
            $return_datasets['collaborators'] = $this->getClinicalCollaborators( $data['application_id']);
            $return_datasets['clinicaltrailSponsorsData'] = $this->getClinicaltrailSponsorsDataData( $data['application_id']);
            $return_datasets['contactPersonData'] = $this->getClinicalContactPersonsDetailsData( $data['application_id']);
            $return_datasets['ethicsApprovalData'] = $this->getClinicalEthicsApprovalDetailsData( $data['application_id']);
            $return_datasets['recruitmentCentersData'] = $this->getClinicalRecruiptmentDetailsData( $data['application_id']);
            $return_datasets['OutcomesData'] = $this->getClinicalOutcomesDetailsData( $data['application_id']);
            $return_datasets['clinicalTrialIntData'] = $this->getClinicalInterventionsDetailsData( $data['application_id']);

            $res =array('success'=>true,'data'=> $return_datasets);
                    
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

public function getClinicalInterventionsDetailsData($application_id){
  
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_interventions as t1')
        ->join('par_clinical_intervention_types as t2', 't1.intervention_type_id','t2.id')
        ->join('par_clinical_natureofcontrols as t3', 't1.nature_ofcontrol_id','t3.id')
        ->select('t1.*','t2.name as intervention_type', 't3.name as control_name')
        ->where(array('application_id'=>$application_id))
        ->get();
        
    return $records;

}

public function getClinicalOutcomesDetailsData($application_id){
    
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_outcomes as t1')
        ->join('par_clinicaloutcome_types as t2', 't1.outcome_type_id','t2.id')
        ->select('t1.*','t2.name as outcome_type')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        
    return $records;

}

public function getClinicalRecruiptmentDetailsData($application_id){
    
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_recruitmentcenters as t1')
        ->join('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->select('t1.*','t1.name as recruitment_centre', 't1.physical_address as street_address', 't2.name as country','t2.name as region', 't1.postal_address as postal_code')
        ->where(array('application_id'=>$application_id))
        ->get();
        
       
    return $records;

}


public function getClinicalEthicsApprovalDetailsData($application_id){
   
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_ethic_approvals as t1')
        ->leftJoin('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->select('t1.*', 't1.physical_address as street_address', 't2.name as country','t2.name as city', 't1.postal_address as postal_code')
        ->where(array('application_id'=>$application_id))
        ->get();
       
    return $records;

}

public function getClinicalContactPersonsDetailsData($application_id){
   
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_contactpersons as t1')
        ->join('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->join('par_clinicaltrialpersons_roles as t4', 't1.contactperson_role_id','t4.id')
        ->select('t1.*', 't2.name as country','t2.name as city', 't1.postal_address as postal_code', 't4.name as role')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        
    return $records;
}
public function getClinicaltrailSponsorsDataData($application_id){
   
        $records = DB::connection('mis_db')->table('tra_clinicaltrialregistry_sponsors as t1')
        ->leftJoin('clinical_trial_personnel as t4', 't1.sponsor_id','t4.id')
        ->leftJoin('par_countries as t2', 't4.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't4.region_id','t3.id')
        ->leftJoin('par_sponsors_nature as t5', 't1.sponsor_nature_id','t5.id')
        ->leftJoin('par_sponsors_levels as t6', 't1.sponsor_level_id','t6.id')
        ->select('t1.*', 't4.physical_address', 't2.name as country','t2.name as region', 't4.postal_address','t6.name as sponsor_level','t5.name as nature_of_sponsor','t4.name as sponsor_name')
        ->where(array('application_id'=>$application_id))
        ->get();
        
    return $records;

}
function getClinicalTrialdiseases($application_id){
    $disease_dta = array();
        $data = DB::connection('mis_db')->table('tra_clinicaltrial_studydiseases')->where('application_id',$application_id)
        ->select('disease_being_studied as id')
        ->get();
        if( count($data) >0){
           foreach($data as $rec){
                $disease_dta[] = $rec->id;

           }
          return $disease_dta;
        }else{
          //  return "";
        }
}function getClinicalSecondaryIds($application_id){
    $disease_dta = array();
        $data = DB::connection('mis_db')->table('tra_clinicaltrial_secondaryids')->where('application_id',$application_id)
        ->select('*')
        ->first();
       return $data;
}function getClinicalStudyDesign($application_id){
    $disease_dta = array();
        $data = DB::connection('mis_db')->table('tra_clinicaltrial_studydesign')->where('application_id',$application_id)
        ->select('*')
        ->first();
        if( $data){
            $data->masking_used_id =  $this->getClinicalMaskingUsed($application_id,$data->id);
        }
       
       return $data;
}
function getClinicalMaskingUsed($application_id,$design_id){
    $disease_dta = array();
        $data = DB::connection('mis_db')->table('tra_studydesign_maskingused')->where(array('application_id'=>$application_id,'studydesign_id'=>$design_id))
        ->select('masking_used_id as id')
        ->get();
        if( count($data) >0){
           foreach($data as $rec){
                $disease_dta[] = $rec->id;

           }
          return $disease_dta;
        }else{
          //  return "";
        }
}
function getClinicalEligibilities($application_id){

        $data = DB::connection('mis_db')->table('tra_clinicaltrial_eligibilitycriteria')->where('application_id',$application_id)
        ->select('*')
        ->first();
        if($data){
              $data->age_groups = $this->getClinicalAgeGroups($application_id,$data->id);

        }
      
       return $data;
       
}function getClinicalFundingSource($application_id){

    $data = DB::connection('mis_db')->table('tra_clinicaltrial_fundingsource')->where('application_id',$application_id)
    ->select('*')
    ->first();
    
   return $data;
   
}
function getClinicalCollaborators($application_id){

    $data = DB::connection('mis_db')->table('tra_clinicaltrial_collaborators')->where('application_id',$application_id)
    ->select('*')
    ->first();
    
   return $data;
   
}
//

function getClinicalAgeGroups($application_id,$eligibilitycriteria_id){
    $disease_dta = array();
        $data = DB::connection('mis_db')->table('tra_eligibilitycriteria_agegroup')->where(array('application_id'=>$application_id,'eligibilitycriteria_id'=>$eligibilitycriteria_id))
        ->select('age_group_id as id')
        ->get();
        if( count($data) >0){
           foreach($data as $rec){
                $disease_dta[] = $rec->id;

           }
          return $disease_dta;
        }else{
          //  return "";
        }
}
public function onSaveStudyDesign(Request $req){
    
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
       
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_studydesign';

        $masking_used_id = $req->masking_used_id;

        $data = array('intervention_assignment_id'=>$req->intervention_assignment_id,
                'intervention_allocation_id'=>$req->intervention_allocation_id,
                'allocation_sequence_id'=>$req->allocation_sequence_id,
                'sequence_generation_id'=>$req->sequence_generation_id,
                'masking_id'=>$req->masking_id,
                'application_id'=>$application_id);
            //insert 
            $where = array('application_id'=>$application_id);
            $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$data,$where,true,$application_id,'tra_studydesign_maskingused',$masking_used_id);
            
    
    return response()->json($res);
   }
  //
public function onSaveSecondaryIdentifiers(Request $req){
    
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
       
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_secondaryids';

        $app_data = array('is_secondaryid_applicable'=>$req->is_secondaryid_applicable,
                'secondary_id'=>$req->secondary_id,
                'issuing_authority'=>$req->issuing_authority,
                'application_id'=>$application_id);
      
            //insert 
            $where = array('application_id'=>$application_id);
           
            $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    
    
    return response()->json($res);
   }
   public function onSaveInterventionDetails(Request $req){
   
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
       
        $id = $req->id;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_interventions';

        $app_data = array('intervention_type_id'=>$req->intervention_type_id,
                'intervention_name'=>$req->intervention_name,
                'intervention_dose'=>$req->intervention_dose,
                'intervention_duration'=>$req->intervention_duration,
                'intervention_description'=>$req->intervention_description,
                'group_size'=>$req->group_size,'nature_ofcontrol_id'=>$req->nature_ofcontrol_id,
                'application_id'=>$application_id);
      
            //insert 
            $where = array('id'=>$id);
           
            $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
            
    
    
    return response()->json($res);
   }
   public function onSaveOutcomesDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_outcomes';
   
    $app_data = array('outcome_type_id'=>$req->outcome_type_id,
            'time_point'=>$req->time_point,
            'outcome'=>$req->outcome,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('id'=>$id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}

public function onSaverecruitmentCenter(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_recruitmentcenters';
   
    $app_data = array('name'=>$req->name,
            'physical_address'=>$req->physical_address,
            'country_id'=>$req->country_id,
            'region_id'=>$req->region_id,
            'postal_address'=>$req->postal_address,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('id'=>$id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}
public function onSaveethicsApproval(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_ethic_approvals';
   
    $app_data = array('submission_date'=>formatDate($req->submission_date),
    'approval_date'=>formatDate($req->approval_date),
            'committee_name'=>$req->committee_name,
            'phone_no'=>$req->phone_no,
            'email_address'=>$req-> email_address,
            'physical_address'=>$req->physical_address,
            'country_id'=>$req->country_id,
            'region_id'=>$req->region_id,
            'postal_address'=>$req->postal_address,
           
            'application_id'=>$application_id);
  
        //insert 
        $where = array('id'=>$id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}


public function onSaveCollaboratorsDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_collaborators';
   
    $app_data = array( 'has_collaborators'=>$req->has_collaborators,
            'name'=>$req->name,
            'physical_address'=>$req->physical_address,
            'country_id'=>$req->country_id,
            'region_id'=>$req->region_id,
            'postal_address'=>$req->postal_address,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('application_id'=>$application_id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}
public function onSaveContactPersonDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_contactpersons';
   
    $app_data = array( 'contactperson_role_id'=>$req->contactperson_role_id,
            'name'=>$req->name,
            'physical_address'=>$req->physical_address,
            'country_id'=>$req->country_id,
            'region_id'=>$req->region_id,
            'postal_address'=>$req->postal_address,
            'email_address'=>$req->email_address,
            'phone_no'=>$req-> phone_no,'contact_personposition'=>$req-> contact_personposition,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('application_id'=>$application_id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}

public function onSavefundingSourceDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_fundingsource';
   
    $app_data = array( 'is_funding_receivied'=>$req->is_funding_receivied,
            'fundsource_type_id'=>$req->fundsource_type_id,
            'name'=>$req->name,
            'physical_address'=>$req->physical_address,
            'country_id'=>$req->country_id,
            'region_id'=>$req->region_id,
            'postal_address'=>$req->postal_address,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('application_id'=>$application_id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}public function onsaveclinicaltSponsorDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
    $traderemail_address = $req->traderemail_address;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrialregistry_sponsors';
   
    $app_data = array( 'sponsor_id'=>$req->sponsor_id,
            'sponsor_level_id'=>$req->sponsor_level_id,
            'sponsor_nature_id'=>$req->sponsor_nature_id,
           
            'application_id'=>$application_id);
  
        //insert 
        $where = $app_data;
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        

      return response()->json($res);
}


   public function onSaveEligibilityCriteria(Request $req){

        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $age_groups = $req->age_groups;
        $id = $req->id;
        $application_id = $req->application_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'tra_clinicaltrial_eligibilitycriteria';
       
        $app_data = array('inclusion_criteria'=>$req->inclusion_criteria,
                'exclusion_criteria'=>$req->exclusion_criteria,
                'minimum_age'=>$req->minimum_age,
                'sex_id'=>$req->sex_id,
                'minage_duration_desc'=>$req->minage_duration_desc,
                'maximum_age'=>$req->maximum_age,'maxage_duration_desc'=>$req->maxage_duration_desc,
                'application_id'=>$application_id);
      
            //insert 
            $where = array('application_id'=>$application_id);
           $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where,true,$application_id,'tra_eligibilitycriteria_agegroup',$age_groups);
            
    
          return response()->json($res);
   }
   
public function getClinicalInterventionsDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_interventions as t1')
        ->join('par_clinical_intervention_types as t2', 't1.intervention_type_id','t2.id')
        ->join('par_clinical_natureofcontrols as t3', 't1.nature_ofcontrol_id','t3.id')
        ->select('t1.*','t2.name as intervention_type', 't3.name as control_name')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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

public function getClinicalOutcomesDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_outcomes as t1')
        ->join('par_clinicaloutcome_types as t2', 't1.outcome_type_id','t2.id')
        ->select('t1.*','t2.name as outcome_type')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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

public function getClinicalRecruiptmentDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_recruitmentcenters as t1')
        ->join('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->select('t1.*','t1.name as recruitment_centre', 't1.physical_address as street_address', 't2.name as country','t2.name as region', 't1.postal_address as postal_code')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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

public function onValidateClinicalTrialApp(Request $req){
    try{
        $ctrregistered_tracking_no = $req->ctrregistered_tracking_no;
        $record = DB::connection('mis_db')->table('tra_clinical_trial_applications as t1')
        ->leftJoin('tra_approval_recommendations as t2', 't1.application_code','t2.application_code')
        ->select('t1.*')
        ->where('t1.reference_no', '=', $ctrregistered_tracking_no)
        ->orWhere('t1.tracking_no', '=', $ctrregistered_tracking_no)
        ->orWhere('t2.certificate_no', $ctrregistered_tracking_no)
        ->orWhere('t2.permit_no', $ctrregistered_tracking_no)
        ->first();

        if($record){
                $res = array('success'=>true, 'message'=>'Clinical trial Application exists','record'=>$record);
        }
        else{
            $res = array('success'=>false, 'message'=>'Clinical trial Application doesnt exists, contact the authority for clarification.','record'=>$record);
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
    return $res;
    


}

public function getClinicalEthicsApprovalDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_ethic_approvals as t1')
        ->leftJoin('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->select('t1.*', 't1.physical_address as street_address', 't2.name as country','t2.name as city', 't1.postal_address as postal_code')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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

public function getClinicalContactPersonsDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrial_contactpersons as t1')
        ->join('par_countries as t2', 't1.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
        ->join('par_clinicaltrialpersons_roles as t4', 't1.contactperson_role_id','t4.id')
        ->select('t1.*', 't2.name as country','t2.name as city', 't1.postal_address as postal_code', 't4.name as role')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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
public function getClinicaltrailSponsorsData(Request $req){
    try{
        $application_id = $req->application_id;
        $records = DB::connection('mis_db')->table('tra_clinicaltrialregistry_sponsors as t1')
        ->leftJoin('clinical_trial_personnel as t4', 't1.sponsor_id','t4.id')
        ->leftJoin('par_countries as t2', 't4.country_id','t2.id')
        ->leftJoin('par_regions as t3', 't4.region_id','t3.id')
        ->leftJoin('par_sponsors_nature as t5', 't1.sponsor_nature_id','t5.id')
        ->leftJoin('par_sponsors_levels as t6', 't1.sponsor_level_id','t6.id')
        ->select('t1.*', 't4.physical_address', 't2.name as country','t2.name as region', 't4.postal_address','t6.name as sponsor_level','t5.name as nature_of_sponsor','t4.name as sponsor_name')
        ->where(array('application_id'=>$application_id))
        ->get();
        
        $res = array('success'=>true, 'data'=>$records);

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
public function onDeleteClinicalRegistryDetails(Request $req){
    try{
        $record_id = $req->record_id;
        $application_id = $req->application_id;
        $table_name = $req->table_name;
        $title = 'Record';
        $email_address = $req->email_address;
        $data = array();
        //get the records 
        $resp = false;
        
        $where_state = array( 'id'=>$record_id);
        
        $records = DB::connection('mis_db')->table($table_name)
                ->where($where_state)
                ->get();
        
        if(count($records) >0){
                //delete functionality
                $previous_data = getPreviousRecords($table_name, $where_state,'mis_db');
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address,'mis_db');
                $res = array('success'=>true, 'message'=>$title.' deleted successfully');

        
        }else{
            $res = array('success'=>false, 'message'=>'Error occurred, record not deleted successfully');

        
        }
           
    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);


return response()->json($res);
}
//onSaveEligibilityCriteria
function onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where,$has_foreigndata=false,$application_id = null,$foreign_datatype=null,$foreign_data=null ){
    $resp='';
    $traderemail_address = $req->trader_email;
    try{
        if (recordExists($table_name, $where,'mis_db')) {
                $app_data['altered_by'] = $traderemail_address;
                $app_data['dola'] = Carbon::now();
            
                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                $record_id = $previous_data['results'][0]['id'];
                $resp =   updateRecord($table_name, $previous_data, $where, $app_data, $traderemail_address,'mis_db');
            }
            else{
                $app_data['created_by'] = $traderemail_address;
                $app_data['created_on'] = Carbon::now();
                
                $resp = insertRecord($table_name, $app_data, $traderemail_address,'mis_db');
            
                $record_id = $resp['record_id'];    
                
            }
            if($has_foreigndata){
               
                    if($foreign_datatype =='tra_studydesign_maskingused'){
                        DB::connection('mis_db')->table('tra_studydesign_maskingused')->where(array('application_id'=>$application_id))->delete();
                        if(is_array($foreign_data)){
                            $masking_useddata = array();
                            foreach($foreign_data as $used_id){
                                                        
                                    $masking_useddata[] = array('masking_used_id'=>$used_id, 
                                                    'application_id'=>$application_id, 
                                                    'studydesign_id'=>$record_id,
                                                    'created_by'=>$traderemail_address, 
                                                    'created_on'=>Carbon::now());
            
                            }
                            DB::connection('mis_db')->table('tra_studydesign_maskingused')->insert($masking_useddata);
                        }
                    }
                    else if($foreign_datatype == 'tra_eligibilitycriteria_agegroup'){
                        DB::connection('mis_db')->table('tra_eligibilitycriteria_agegroup')->where(array('application_id'=>$application_id))->delete();
                        if(is_array($foreign_data)){
                            $masking_useddata = array();
                            foreach($foreign_data as $age_group_id){
                                                        
                                    $masking_useddata[] = array('age_group_id'=>$age_group_id, 
                                                    'application_id'=>$application_id, 
                                                    'eligibilitycriteria_id'=>$record_id,
                                                    'created_by'=>$traderemail_address, 
                                                    'created_on'=>Carbon::now());
            
                            }
                            DB::connection('mis_db')->table('tra_eligibilitycriteria_agegroup')->insert($masking_useddata);
                        }

                    }

            }
           
        if($resp['success']){
            $res =  array('success'=>true,
        
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$resp['message']);
        }

            
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'respose'=>$resp,
            'message' => $exception->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    } 
    return $res;

}
//11140256
public function getClinicalTrialDiseasesDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            $data['disease_being_studied'] = $this->getClinicalTrialdiseases($application_id);
            $res =array('success'=>true,'data'=> $data);
            
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
}
