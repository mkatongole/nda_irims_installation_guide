<?php

namespace Modules\Gmpinspection\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GmpinspectionController extends Controller
{
    public function __construct(){
        if (!Auth::guard('api')->check()) {
                $res = array(
                    'success' => false,
                    'message' => 'Invalid Token or failed authentication, login to proceed!!'
                );
               // echo json_encode($res);
               // exit();
        }
    }
    public function onSaveGmpApplication(Request $req)
    {
        try {
            $manufacturing_site_id = $req->manufacturing_site_id;
            
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->gmpmodule_id;
            $sub_module_id = $req->gmpsub_module_id;
            $local_agent_id = $req->local_agent_id;
            $premise_id=$req->premise_id;
            $man_site_id = $req->man_site_id;
            $gmp_type_id = $req->gmp_type_id;
            $assessment_type_id = $req->assessment_type_id;
            $paying_currency_id = $req->paying_currency_id;
            $is_fast_track = $req->is_fast_track;
            $manufacturer_id =  getSingleRecordColValue('par_man_sites', array('id'=>$man_site_id), 'manufacturer_id','mis_db');
            $module_id = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'module_id','mis_db');
           
            $device_type_id = $req->device_type_id;
            //registrant_option_id
            $trader_aslocal_agent = $req->trader_aslocal_agent;
            $registrant_option_id = $req->registrant_option_id;

            $tracking_no = $req->tracking_no;
            $contact_person_id = $req->contact_person_id;
            $billing_person_id = $req->billing_person_id;
            $contact_person_startdate = $req->contact_person_startdate;
            $contact_person_enddate = $req->contact_person_enddate;
            $applicant_contact_person = $req->applicant_contact_person;
            $zone_id = $req->zone_id;
            //$res = array('success'=>true, 'message'=>'Trues', 'manufacturing_site_id'=>$manufacturing_site_id);
       // return response()->json($res);   
       if($sub_module_id ==117){
            $premises_infor = array('premise_reg_no'=>$req->premise_reg_no,
                                    'name'=>$req->manufacturer_name,
                                    'country_id'=>$req->country_id,
                                    'section_id'=>$section_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,
                                    'email'=>$req->email_address,
                                    'inspection_activities_id'=>$req->inspection_activities_id,
                                    'nda_approved_id'=>$req->nda_approved_id,
                                    'permit_no'=>$req->permit_no,
                                    'manufacturer_site_name'=>$req->manufacturer_site_name,
                                    'site_country_id'=>$req->site_country_id,
                                    'site_physical_address'=>$req->site_physical_address,
                                    'applicant_billing_person'=>$req->applicant_billing_person,
                                    'postal_address'=>$req->postal_address,
                                    'ltr_id'=>$premise_id,
                                    'applicant_as_ltr'=>$trader_aslocal_agent,
                                    'telephone'=>$req->telephone,
                                    'pharmacist_id'=>$req->pharmacist_id,
                                    'code_no'=>$req->code_no,
                                    'mobile_no'=>$req->mobile_no,
                                    'man_site_id'=>$man_site_id,
                                    'manufacturer_id'=>$manufacturer_id,
                                    'physical_address'=>$req->physical_address,
                                    'longitude'=>$req->longitude,
                                    'latitude'=>$req->latitude,
                                    'business_type_id'=>$req->business_type_id,
                                    'billing_person'=>$req->billing_person,
                                    'billing_person_id'=>$req->billing_person_id,
                                    'gmp_type_id'=>$req->gmp_type_id,
                                    'contact_person_id'=>$req->contact_person_id,
                                    'inspection_activities_id'=>$req->inspection_activities_id,
                                    'contact_person_startdate'=>$req->contact_person_startdate,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'applicant_contact_person'=>$req->applicant_contact_person
                        );

                    
        }else{
                   $premises_infor = array('premise_reg_no'=>$req->premise_reg_no,
                                    'name'=>$req->manufacturing_site_name,
                                    'country_id'=>$req->country_id,
                                    'section_id'=>$section_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,
                                    'email'=>$req->email_address,
                                    'inspection_activities_id'=>$req->inspection_activities_id,
                                    'nda_approved_id'=>$req->nda_approved_id,
                                    'permit_no'=>$req->permit_no,
                                    'manufacturer_site_name'=>$req->manufacturer_site_name,
                                    'site_country_id'=>$req->site_country_id,
                                    'site_physical_address'=>$req->site_physical_address,
                                    'postal_address'=>$req->postal_address,
                                    'ltr_id'=>$premise_id,
                                    'applicant_as_ltr'=>$trader_aslocal_agent,
                                    'telephone'=>$req->telephone,
                                    'code_no'=>$req->code_no,
                                    'mobile_no'=>$req->mobile_no,
                                    'man_site_id'=>$man_site_id,
                                    'manufacturer_id'=>$manufacturer_id,
                                    'physical_address'=>$req->physical_address,
                                    'longitude'=>$req->longitude,
                                    'latitude'=>$req->latitude,
                                    'business_type_id'=>$req->business_type_id,
                                    'billing_person'=>$req->billing_person,
                                    'billing_person_id'=>$req->billing_person_id,
                                    'gmp_type_id'=>$req->gmp_type_id,
                                    'contact_person_id'=>$req->contact_person_id,
                                    'inspection_activities_id'=>$req->inspection_activities_id,
                                    'contact_person_startdate'=>$req->contact_person_startdate,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'applicant_contact_person'=>$req->applicant_contact_person
                        );

          }
                        
                    $app_data = array('sub_module_id'=>$sub_module_id,
                                   'section_id'=>$section_id,
                                   'module_id'=>$module_id,
                                   'gmp_type_id'=>$req->gmp_type_id,
                                   'application_initiator_id'=>$trader_id,
                                   'registrant_option_id'=>$registrant_option_id,
                                   'local_agent_id'=>$local_agent_id,
                                   'premise_id'=>$premise_id,
                                   'applicant_id'=>$trader_id,
                                   'trader_id'=>$trader_id,
                                   'device_type_id'=>$device_type_id,
                                   'trader_aslocal_agent'=>$trader_aslocal_agent,
                                   'manufacturing_site_id'=>$manufacturing_site_id,
                                   'assessment_type_id'=>$assessment_type_id,
                                   'paying_currency_id'=>$paying_currency_id,
                                   'is_fast_track'=>$is_fast_track,
                                   
                                   'zone_id'=>$req->zone_id,
                           );
            
                           
                        /** Already Saved */
                      $table_name = 'wb_gmp_applications';
                     
                        if(validateIsNumeric($manufacturing_site_id)){
                           
                               
                                $where = array('id'=>$manufacturing_site_id);
                              
                                $where_app = array('manufacturing_site_id'=>$manufacturing_site_id);
                               

                                if (recordExists('wb_manufacturing_sites', $where)) {
                                    
                                    $premises_infor['dola'] = Carbon::now();
                                    $premises_infor['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_manufacturing_sites', $where);
                                    
                                    
                                    $resp=  updateRecord('wb_manufacturing_sites', $previous_data, $where, $premises_infor, $trader_email);
                               
                                    
                                    $app_data['dola'] = Carbon::now();
                                    $app_data['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_gmp_applications', $where_app);
                                   
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                   $sql = DB::connection('mis_db')->table('tra_application_documentsdefination')->where(array('application_code'=>$application_code))->first();
                   if(!$sql){
                                            
                   // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);
                                                
                  }
                                     $resp=   updateRecord('wb_gmp_applications', $previous_data, $where_app, $app_data, $trader_email);
                                    
                                }
                                
                        }
                        else{
                           
                            $premises_infor['created_on'] = Carbon::now();
                            $premises_infor['created_by'] = $trader_email;
                                
                            $resp = insertRecord('wb_manufacturing_sites', $premises_infor, $trader_email);
                            $tracking_no= generateGMPReferenceNo($section_id,$sub_module_id);
                            
                            if( $tracking_no == ''){
                                return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                            }
                            $application_code = generateApplicationCode($sub_module_id, 'wb_gmp_applications');


                            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');


                            $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code','mis_db');
                            $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                            $gmp_code = getSingleRecordColValue('par_gmplocation_details', array('id' => $req->gmp_type_id), 'location_code','mis_db');

                            $gmp_region_code = getSingleRecordColValue('par_regions', array('id' => $region_id), 'code','mis_db');

                            $codes_array = array(
                                'section_code' => $section_code,
                                'gmp_region_code'=>$gmp_region_code,
                                'zone_code' => $zone_code,
                                'gmp_type' => $gmp_code
                            );

                            $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');

                            $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }

                            $application_code = generateApplicationCode($sub_module_id, 'wb_gmp_applications');
                             $manufacturing_site_id = $resp['record_id'];
                 
                             $app_data = array('sub_module_id'=>$sub_module_id,
                                   'section_id'=>$section_id,
                                   'module_id'=>$module_id,
                                   'gmp_type_id'=>$req->gmp_type_id,
                                   'application_initiator_id'=>$trader_id,
                                   'registrant_option_id'=>$registrant_option_id,
                                   'local_agent_id'=>$local_agent_id,
                                   'applicant_id'=>$trader_id,
                                   'trader_id'=>$trader_id,
                                   'device_type_id'=>$device_type_id,
                                   'trader_aslocal_agent'=>$trader_aslocal_agent,
                                   'manufacturing_site_id'=>$manufacturing_site_id,
                                   'assessment_type_id'=>$assessment_type_id,
                                   
                                   'paying_currency_id'=>$paying_currency_id,
                                   'is_fast_track'=>$is_fast_track,
                                   
                                   'zone_id'=>$req->zone_id,
                           );
                
                            $app_data['manufacturing_site_id']=$manufacturing_site_id;
                            $app_data['application_code']=$application_code;
                            $app_data['tracking_no']=$tracking_no;
                            $app_data['date_added']=Carbon::now();
                            $app_data['application_status_id']=1;
                            $app_data['created_by']=$trader_email;
                            $app_data['created_on']=Carbon::now();
                            
                            $resp = insertRecord('wb_gmp_applications', $app_data, $trader_email);

                            //update the application code_no
                            if($resp['success']){

                //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);

                saveApplicationSubmissionDetails($application_code,$table_name);  
                            }
                            
                        }
                               
                        if($resp['success']){
                            $this->saveGmpassessmentProcCountries($req->gmpassessment_countries_ids,$req->assessment_type_id,$application_code,$trader_id);
                            $res = array('tracking_no'=>$tracking_no,
                                         'manufacturing_site_id'=>$manufacturing_site_id, 
                                        'gmp_type_id'=>$gmp_type_id, 
                                         'application_code'=>$application_code,
                                         'success'=>true,
                                         'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);

                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message1'=>$resp['message'],
                            'message'=>'Error Occurred Premises Application not saved, it this persists contact the system Administrator');
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
    function saveGmpassessmentProcCountries($gmpassessment_countries_ids,$assessment_type_id,$application_code,$trader_id){
        
        $gmpassessment_countriesdata = array();
                    //save the diseases
                    DB::table('wb_productassessmentproc_countries')->where(array('application_code'=>$application_code))->delete();
                    if(is_array($gmpassessment_countries_ids)){
                        foreach($gmpassessment_countries_ids as $country_id){
                                                    
                                $gmpassessment_countriesdata[] = array('country_id'=>$country_id, 
                                                'assessment_type_id'=>$assessment_type_id, 
                                                'application_code'=>$application_code, 
                                                'created_by'=>$trader_id, 
                                                'created_on'=>Carbon::now());

                        }

                    }
                    
                    
                    DB::table('wb_productassessmentproc_countries')->insert($gmpassessment_countriesdata);

     } 
    function checkPendingPremisesRenewal(Request $req){
            //check on the portal 
            $premise_target_id = $req->premise_target_id;
            $res = '';
            $rec = DB::table('wb_premises_applications as t1')
                        ->join('wb_premises as t2', 't1.manufacturing_site_id','=','t2.id')
                        ->where(array('target_id'=>$premise_target_id))
                        ->whereNotIn('application_status_id', [2,4])
                        ->first();
                        //add rejected
                        $res = array(
                            'success' => true,
                        );
            if($rec){
                $tracking_no = $rec->tracking_no;
                $res = array(
                    'success' => false,
                    'message' => 'There is an already instatiated under the following tracking No: '.$tracking_no
                );
               
            }
            //check in the MIS
            $rec = DB::connection('mis_db')->table('tra_premises_applications as t1')
                    ->join('tra_premises as t2', 't1.manufacturing_site_id','=','t2.id')
                    ->where(array('target_id'=>$premise_target_id))
                    ->whereNotIn('application_status_id', [2,4])
                    ->first();

            if($rec){
                $reference_no = $rec->reference_no;
                $res = array(
                    'success' => false,
                    'message' => 'There is an already instatiated under the following tracking No: '.$reference_no
                );
            }
            return response()->json($res);  
     
    }
    public function onSaveRenewalGmpApplication(Request $req){
        try {
              
            $manufacturing_site_id = $req->manufacturing_site_id;
           
            $registered_id = $req->registered_id;
            $premise_id = $req->premise_id;
            $initial_site_id = $req->initial_site_id;
            $module_id = $req->module_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $local_agent_id = $req->local_agent_id;
            $tracking_no = $req->tracking_no;
            $sub_module_id = $req->gmpsub_module_id;
            $assessment_type_id = $req->assessment_type_id;
            
                               
            $module_id = $req->gmpmodule_id;
            $gmp_type_id = $req->gmp_type_id;
             $local_agent_id = $req->local_agent_id;
            $man_site_id = $req->man_site_id;
            $zone_id =  $req->zone_id;
           $resp = array();
           $device_type_id = $req->device_type_id;
            //registrant_option_id
            $trader_aslocal_agent = $req->trader_aslocal_agent;
            $registrant_option_id = $req->registrant_option_id;

            $manufacturer_id =  getSingleRecordColValue('par_man_sites', array('id'=>$man_site_id), 'manufacturer_id','mis_db');
            $tracking_no = $req->tracking_no;
            $contact_person_id = $req->contact_person_id;
            $contact_person_startdate = $req->contact_person_startdate;
            $contact_person_enddate = $req->contact_person_enddate;
            $applicant_contact_person = $req->applicant_contact_person;
            
            $localidentification_no = getSingleRecordColValue('wb_trader_account',array('id'=>$local_agent_id), 'identification_no','mis_db');
            $local_agent_id = getSingleRecordColValue('wb_trader_account',array('identification_no'=>$localidentification_no), 'id');
            
            $zone_id = $req->zone_id;
                if($sub_module_id ==118){
                    $premises_infor = array('premise_reg_no'=>$req->premise_reg_no,
                                            'name'=>$req->manufacturer_name,
                                            'country_id'=>$req->country_id,
                                            'section_id'=>$section_id,
                                            'region_id'=>$req->region_id,
                                            'district_id'=>$req->district_id,
                                            'email'=>$req->email_address,
                                            'inspection_activities_id'=>$req->inspection_activities_id,
                                            'nda_approved_id'=>$req->nda_approved_id,
                                            'permit_no'=>$req->permit_no,
                                            'manufacturer_site_name'=>$req->manufacturer_site_name,
                                            'site_country_id'=>$req->site_country_id,
                                            'site_physical_address'=>$req->site_physical_address,
                                            'postal_address'=>$req->postal_address,
                                            'ltr_id'=>$premise_id,
                                            'applicant_as_ltr'=>$trader_aslocal_agent,
                                            'telephone'=>$req->telephone,
                                            'pharmacist_id'=>$req->pharmacist_id,
                                            'code_no'=>$req->code_no,
                                            'mobile_no'=>$req->mobile_no,
                                            'man_site_id'=>$man_site_id,
                                            'manufacturer_id'=>$manufacturer_id,
                                            'physical_address'=>$req->physical_address,
                                            'longitude'=>$req->longitude,
                                            'latitude'=>$req->latitude,
                                            'business_type_id'=>$req->business_type_id,
                                            'billing_person'=>$req->billing_person,
                                            'billing_person_id'=>$req->billing_person_id,
                                            'gmp_type_id'=>$req->gmp_type_id,
                                            'contact_person_id'=>$req->contact_person_id,
                                            'inspection_activities_id'=>$req->inspection_activities_id,
                                            'contact_person_startdate'=>$req->contact_person_startdate,
                                            'contact_person_enddate'=>$req->contact_person_enddate,
                                            'applicant_contact_person'=>$req->applicant_contact_person
                                );

                            
                }else{
                           $premises_infor = array('premise_reg_no'=>$req->premise_reg_no,
                                            'name'=>$req->manufacturing_site_name,
                                            'country_id'=>$req->country_id,
                                            'section_id'=>$section_id,
                                            'region_id'=>$req->region_id,
                                            'district_id'=>$req->district_id,
                                            'email'=>$req->email_address,
                                            'inspection_activities_id'=>$req->inspection_activities_id,
                                            'nda_approved_id'=>$req->nda_approved_id,
                                            'permit_no'=>$req->permit_no,
                                            'manufacturer_site_name'=>$req->manufacturer_site_name,
                                            'site_country_id'=>$req->site_country_id,
                                            'site_physical_address'=>$req->site_physical_address,
                                            'postal_address'=>$req->postal_address,
                                            'ltr_id'=>$premise_id,
                                            'applicant_as_ltr'=>$trader_aslocal_agent,
                                            'telephone'=>$req->telephone,
                                            'code_no'=>$req->code_no,
                                            'mobile_no'=>$req->mobile_no,
                                            'man_site_id'=>$man_site_id,
                                            'manufacturer_id'=>$manufacturer_id,
                                            'physical_address'=>$req->physical_address,
                                            'longitude'=>$req->longitude,
                                            'latitude'=>$req->latitude,
                                            'business_type_id'=>$req->business_type_id,
                                            'billing_person'=>$req->billing_person,
                                            'billing_person_id'=>$req->billing_person_id,
                                            'gmp_type_id'=>$req->gmp_type_id,
                                            'contact_person_id'=>$req->contact_person_id,
                                            'inspection_activities_id'=>$req->inspection_activities_id,
                                            'contact_person_startdate'=>$req->contact_person_startdate,
                                            'contact_person_enddate'=>$req->contact_person_enddate,
                                            'applicant_contact_person'=>$req->applicant_contact_person
                                );
                }
                        /** Already Saved */
                        //validate data to avert any duplicates 
                        $table_name = 'wb_gmp_applications';
                        if(validateIsNumeric($manufacturing_site_id) && $tracking_no != ''){
                                //update the record 
                                //product information
                                //
                                $where = array('id'=>$manufacturing_site_id);
                                $where_app = array('manufacturing_site_id'=>$manufacturing_site_id);

                                if (recordExists('wb_manufacturing_sites', $where)) {
                                    
                                    $premises_infor['dola'] = Carbon::now();
                                    $premises_infor['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_manufacturing_sites', $where);
                                    
                                    updateRecord('wb_manufacturing_sites', $previous_data, $where, $premises_infor, $trader_email);
                                    $app_data = array('trader_id'=>$trader_id,
                                            'zone_id'=>$req->zone_id,
                                            'altered_by'=>$trader_email,
                                            'dola'=>Carbon::now()
                                    );
                                    $previous_data = getPreviousRecords('wb_gmp_applications', $where_app);
                                   
                                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                          
                                     $res=   updateRecord('wb_gmp_applications', $previous_data, $where_app, $app_data, $trader_email);
                               
                                }
                                $sql = DB::connection('mis_db')->table('tra_application_documentsdefination')->where(array('application_code'=>$application_code))->first();
                                        if(!$sql){
                                            
                                               // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);
                                                
                                        }
                                 $res = array('tracking_no'=>$tracking_no,
                                                                    'manufacturing_site_id'=>$manufacturing_site_id,
                                                                    'application_code'=>$application_code,
                                                                    'success'=>true,
                                                                    'premise_target_id'=>$req->premise_target_id,
                                                                    'message'=>'GMP Application Saved Successfully, with Tracking No: '.$tracking_no);
                        }
                        else{
                            $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                            $anyOngoingApps = checkForOngoingApplications($registered_id, 'tra_gmp_applications', 'reg_site_id', $process_id);
                            $anyOngoingPortalApps = checkForPortalOngoingApplications($registered_id, 'wb_gmp_applications', 'reg_site_id', $process_id);
                                
                            if((!$anyOngoingApps['exists'] && !$anyOngoingPortalApps['exists']) || ($sub_module_id == 39 || $sub_module_id == 40)){
                                               $premises_infor['created_on'] = Carbon::now();
                                                $premises_infor['created_by'] = $trader_email;
                                                    
                                                $resp = insertRecord('wb_manufacturing_sites', $premises_infor, $trader_email);
                                            
                                                $tracking_no = generatePremisesReferenceNo($section_id,$sub_module_id);
                                                if( $tracking_no == ''){
                                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                                }
                                                $manufacturing_site_id = $resp['record_id'];
                                                $application_code = generateApplicationCode($sub_module_id, 'wb_gmp_applications');
                                                           
                                                $app_data = array('applicant_id'=>$trader_id,
                                                                'sub_module_id'=>$sub_module_id,
                                                                'module_id'=>$module_id,'trader_id'=>$trader_id,
                                                                'section_id'=>$section_id,
                                                                'manufacturing_site_id'=>$manufacturing_site_id,
                                                                'application_initiator_id'=>$trader_id,
                                                                'local_agent_id'=>$local_agent_id,
                                                                'zone_id'=>$req->zone_id,
                                                                'reg_site_id'=>$registered_id,
                                                                'tracking_no'=>$tracking_no,
                                                                'gmp_type_id'=>$gmp_type_id,
                                                                'assessment_type_id'=>$assessment_type_id,
                                   
                                                                'date_added'=>Carbon::now(),
                                                                'application_code'=>$application_code,
                                                                'application_status_id'=>1,
                                                                'created_by'=>$trader_email,
                                                                'created_on'=>Carbon::now()
                                                        );
                                                //get the other details 
                                                $this->saveInitialManufacturingSiteOtherdetails($initial_site_id, $manufacturing_site_id,$trader_email);
                                                $this->saveInitialManufacturingSItePersonnel($initial_site_id,$manufacturing_site_id,$trader_email);

                                                  $manufacturingsite_block_id = $this->saveInitialManufacturingSIteBlocks($initial_site_id,$manufacturing_site_id,$trader_email);
                                                
                                                $this->saveInitialManufacturingSiteProductLine($initial_site_id,$manufacturing_site_id,$trader_email,$manufacturingsite_block_id);
                                                
                                                
                                                $resp = insertRecord('wb_gmp_applications', $app_data, $trader_email);
                                            
                                                     
                                                    //update the application code_no
                                                    if($resp['success']){
                                                        $record_id = $resp['record_id'];
                                                      //  $res = initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);
                                                        saveApplicationSubmissionDetails($application_code,$table_name);  
                                                        $res = array('tracking_no'=>$tracking_no,
                                                                    'manufacturing_site_id'=>$manufacturing_site_id,
                                                                    'application_code'=>$application_code,
                                                                    'success'=>true,
                                                                    'premise_target_id'=>$req->premise_target_id,
                                                                    'message'=>'GMP Application Saved Successfully, with Tracking No: '.$tracking_no);
                                
                                                    }
                                                    else{
                                                        $res = array(
                                                        'success'=>false,
                                                        'message'=>'Error Occurred GMP Application not saved, it this persists contact the system Administrator');
                                                    }
                    
                            }
                            else{
                              //  $res = $anyOngoingApps;
    $res = array('success'=>false, 'message'=>"There is an application pending approval with reference no ".$anyOngoingApps['ref_no'].' '.$anyOngoingPortalApps['ref_no'].", check on the GMP application dashboard or contact system administrator for clasification.");
    
                            }
                            
                        }
                        
                         
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   


    }
    function saveInitialManufacturingSiteOtherdetails($initial_site_id,$manufacturing_site_id,$trader_email){
            $records = DB::connection('mis_db')->table('tra_mansite_otherdetails')->where(array('manufacturing_site_id'=>$initial_site_id))->get();
            if($records){
                foreach ($records as $rec) {
                        $data = array('manufacturing_site_id'=>$manufacturing_site_id,
                                      'business_type_id'=>$rec->business_type_id,
                                       'business_type_detail_id'=>$rec->business_type_detail_id,
                                       'created_by'=>$trader_email,
                                       'created_on'=>Carbon::now()
                                );
                        $resp = insertRecord('wb_mansite_otherdetails', $data, $trader_email);
                                   
                }
            }
    }
    function saveInitialManufacturingSIteBlocks($initial_site_id,$manufacturing_site_id,$trader_email){
        $record_id = '';
        $records = DB::connection('mis_db')->table('tra_manufacturing_sites_blocks')->where(array('manufacturing_site_id'=>$initial_site_id))->get();
        if($records){
            foreach ($records as $rec) {
                    $data = array('manufacturing_site_id'=>$manufacturing_site_id,
                                'activities' => $rec->activities,
                                'name' => $rec->name,
                                'inspection_category_id' => $rec->inspection_category_id, 
                                'created_by'=>$trader_email,
                                'created_on'=>Carbon::now()
                            );
                    $record_id = insertRecord('tra_manufacturing_sites_blocks', $data, $trader_email,'mis_db');
                               
            }
        }
        return $record_id;

}
    function saveInitialManufacturingSiteProductLine($initial_site_id,$manufacturing_site_id,$trader_email, $manufacturingsite_block_id){
        $record_id = '';
        $records = DB::connection('mis_db')->table('gmp_product_details')->where(array('manufacturing_site_id'=>$initial_site_id))->get();
        if($records){
            foreach ($records as $rec) {
                    $data = array(
                                'manufacturing_site_id'=>$manufacturing_site_id,
                                'product_line_id'=>$rec->product_line_id,
                                'gmpproduct_type_id'=>$rec->gmpproduct_type_id,
                                'intended_manufacturing_activity_id'=>$rec->intended_manufacturing_activity_id,
                                'inteded_manufacturing_id'=>$rec->inteded_manufacturing_id,
                                'manufacturing_id'=>$rec->manufacturing_id,
                                'manufacturing_activity_id'=>$rec->manufacturing_activity_id,
                                'invasive_id'=>$rec->invasive_id,
                                'sterile_id'=>$rec->sterile_id,
                                'active_id'=>$rec->active_id,
                                'medicated_id'=>$rec->medicated_id,
                                'created_by'=>$trader_email,
                                'manufacturingsite_block_id'=>$manufacturingsite_block_id,
                                'created_on'=>Carbon::now()
                            );
                    $record_id = insertRecord('wb_gmp_productline_details', $data, $trader_email);
                               
            }
        }
        return $record_id;
}
    function saveInitialManufacturingSItePersonnel($initial_site_id,$manufacturing_site_id,$trader_email){
            $records = DB::connection('mis_db')->table('tra_manufacturing_sites_personnel')
                            ->where(array('manufacturing_site_id'=>$initial_site_id))
                            ->get();
            if($records){
                foreach ($records as $rec) {
                        $data = array('manufacturing_site_id'=>$manufacturing_site_id,
                                    'name'=>$rec->name,
                                    'telephone'=>$rec->telephone,
                                    'email_address'=>$rec->email_address,
                                    'postal_address'=>$rec->postal_address,
                                    'position_id'=>$rec->position_id,
                                    'fax'=>$rec->fax,
                                    'status_id'=>$rec->status_id,
                                    'created_by'=>$trader_email,
                                    'created_on'=>Carbon::now()
                                );
                        $resp = insertRecord('wb_manufacturing_sites_personnel', $data, $trader_email);
                                
                }
            }
    }
    public function onSaveGmpOtherDetails(Request $req){
       
        try{
                $resp ="";
                $trader_id = $req->trader_id;
                $email_address = $req->email_address;
                $manufacturing_site_id = $req->manufacturing_site_id;

                $data = $req->all();
                
                $table_name = $req->table_name;
                $record_id = $req->id;
               unset($data['table_name']);
                unset($data['email_address']);
                unset($data['trader_id']);
                unset($data['manufacturer_name']);
                unset($data['physical_address']);
                unset($data['brand_name']);
                unset($data['applicant_name']);
                unset($data['reference_no']);
                unset($data['gmdn_code']);
                unset($data['gmdn_code_description']);

                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $email_address;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $email_address);
                        
                    }
                }
                else{
                    //insert 
                    $data['created_by'] = $email_address;
                    $data['created_on'] = Carbon::now();

                    $resp = insertRecord($table_name, $data, $email_address);
                    
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
       public function onSaveGmpContractDetails(Request $req){
    try {
        $manufacturing_site_id = $req->manufacturing_site_id;
        $record_id = $req->id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;

        $table_name = $req->table_name;
        $premises_otherinfor = array(
            'contract_manufacturing_id' => $req->contract_manufacturing_id,
            'inspected_id' => $req->inspected_id,
            'contact_person' => $req->contact_person,
            'manufacturer_name' => $req->manufacturer_name,
            'manufacturing_site_id' => $req->manufacturing_site_id,
        );

        // Check if record_id is numeric and greater than 0
        if (validateIsNumeric($record_id) && $record_id > 0) {
            $where = array('id' => $record_id);

            if (recordExists($table_name, $where)) {
                $premises_otherinfor['dola'] = Carbon::now();
                $premises_otherinfor['altered_by'] = $email_address;

                $previous_data = getPreviousRecords($table_name, $where);

                $resp = updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
            } else {
                // If record doesn't exist, treat it as a new record
                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
            }
        } else {
            // If record_id is not numeric or less than or equal to 0, treat it as a new record
            $premises_otherinfor['created_on'] = Carbon::now();
            $premises_otherinfor['created_by'] = $email_address;

            $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
        }

        $res = returnFuncResponses($resp, 'Contract Manufacturing Details', 'manufacturing_site_id', $manufacturing_site_id);

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

    public function onSaveGmpProductLinedetails(Request $req){
        try {
            $manufacturing_site_id = $req->manufacturing_site_id;
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
           
           $table_name = 'gmp_productline_details';
            $premises_otherinfor = array('product_line_id'=>$req->product_line_id,
                     'gmpproduct_type_id'=>$req->gmpproduct_type_id,
                     'manufacturingsite_block_id'=>$req->manufacturingsite_block_id,
                     'intended_manufacturing_activity_id'=>$req->intended_manufacturing_activity_id,
                     'inteded_manufacturing_id'=>$req->inteded_manufacturing_id,
                     'manufacturing_id'=>$req->manufacturing_id,
                     'manufacturing_activity_id'=>$req->manufacturing_activity_id,
                     'group_family_id'=>$req->group_family_id,
                     'product_name'=>$req->product_name,
                     'gmdn_code_id'=>$req->gmdn_code_id,
                     'gmdn_code_description'=>$req->gmdn_code_description,
                     'classification_id'=>$req->classification_id,
                     'invasive_id'=>$req->invasive_id,
                     'sterile_id'=>$req->sterile_id,
                     'active_id'=>$req->active_id,
                     'medicated_id'=>$req->medicated_id,
                     'manufacturing_site_id'=>$req->manufacturing_site_id,
                                ); 
                if(validateIsNumeric($record_id, 'mis_db')){
                              
                        $where = array('id'=>$record_id);
                                if (recordExists($table_name, $where,'mis_db')) {
                                    
                                    $premises_otherinfor['dola'] = Carbon::now();
                                    $premises_otherinfor['altered_by'] = $email_address;
                
                                    $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                                    
                                    $resp =updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address,'mis_db');

                                }
                                $res = returnFuncResponses($resp,'Product Line Details','manufacturing_site_id',$manufacturing_site_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                           if(!recordExists($table_name, $premises_otherinfor,'mis_db')){
                                $premises_otherinfor['created_on'] = Carbon::now();
                                $premises_otherinfor['created_by'] = $email_address;
            
                                $resp = insertRecord($table_name, $premises_otherinfor, $email_address,'mis_db');
                                $res = returnFuncResponses($resp,'Product Line Details','manufacturing_site_id',$manufacturing_site_id);
                           
                            }
                           else{
                                $res = array(
                                    'success'=>false,
                                    'message'=>'Product Line Details exists or already saved.');

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
    public function onSaveInspectionDetails(Request $req){
        try {
            $application_code = $req->application_code;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
            $table_name = 'tra_gmp_inspection_dates';
            $premises_otherinfor = array(
                'customer_confirmation_id'=>$req->customer_confirmation_id,
                'client_rejection_reason'=>$req->client_rejection_reason,
                'client_preferred_start_date'=>$req->client_preferred_start_date,
                    ); 
                          
                    $where = array('application_code'=>$application_code);
                     if (recordExists($table_name, $where,'mis_db')) {
                                    
                        $premises_otherinfor['dola'] = Carbon::now();
                        $premises_otherinfor['altered_by'] = $email_address;
                         $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                                    
                        $resp =updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address,'mis_db');

                    }
                    $res = returnFuncResponses($resp,'Inspection','application_code',$application_code);
                           
  

                        
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


public function onSaveGmpHistoryInformation(Request $req){
    try {
        $manufacturing_site_id = $req->manufacturing_site_id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;
        $table_name = 'tra_gmp_inpection_history';

        $premises_otherinfor = [
                        'start_date'=>$req->start_date,
                        'compliant'=>$req->compliant,
                        'manufacturing_site_id'=>$req->manufacturing_site_id,
                        'timesince_lastinspection'=>$req->timesince_lastinspection,
                        'meet_criteria'=>$req->meet_criteria,
                        'pms_complaintsreceived_previously'=>$req->pms_complaintsreceived_previously,
                        'product_recallspreviously_conducted'=>$req->product_recallspreviously_conducted,
                        'approved_renewalprevious_productline'=>$req->approved_renewalprevious_productline,
                        'total_product_line'=>$req->total_product_line,
                        'facility_inspected_who'=>$req->facility_inspected_who,
                        'country_id'=>$req->country_id,
                        'approval_date'=>$req->approval_date,
                        'expiry_date'=>$req->expiry_date,
                        'validity_status'=>$req->validity_status,
                        'times_to_expiry'=>$req->times_to_expiry,
                        'section_id'=>$req->section_id,
                        'sub_module_id'=>$req->sub_module_id
        ];

        if (recordExists($table_name, ['manufacturing_site_id' => $manufacturing_site_id],'mis_db')) {
            $premises_otherinfor['dola'] = Carbon::now();
            $premises_otherinfor['altered_by'] = $email_address;

            $previous_data = getPreviousRecords($table_name, ['manufacturing_site_id' => $manufacturing_site_id]);

            $resp = updateRecord($table_name, $previous_data, ['manufacturing_site_id' => $manufacturing_site_id], $premises_otherinfor, $email_address,'mis_db');

            $res = returnFuncResponses($resp, 'Inspection History Details', 'manufacturing_site_id', $manufacturing_site_id);
        } else {
            $premises_otherinfor['created_on'] = Carbon::now();
            $premises_otherinfor['created_by'] = $email_address;

            $resp = insertRecord($table_name, $premises_otherinfor, $email_address,'mis_db');
            $res = returnFuncResponses($resp, 'Inspection History Details', 'manufacturing_site_id', $manufacturing_site_id);
        }
    } catch (\Exception $exception) {
        $res = [
            'success' => false,
            'message' => $exception->getMessage()
        ];
    } catch (\Throwable $throwable) {
        $res = [
            'success' => false,
            'message' => $throwable->getMessage()
        ];
    }

    return response()->json($res);
}

public function onSavemanufatcuringSiteBlocks(Request $req) {
    try {
        $manufacturing_site_id = $req->manufacturing_site_id;
        $special_category_id = $req->special_category_id;
        $record_id = $req->id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;
        $name = $req->name;
        $site_name = $req->site_name; 
        $inspection_category_id = $req->inspection_category_id; 
        $inspection_activities_id = $req->inspection_activities_id; 
        $activities = $req->activities;
        $table_name = 'tra_manufacturing_sites_blocks';
        $block_data = array(
            'name' => $req->name,
            'manufacturing_site_id' => $req->manufacturing_site_id,
            'inspection_category_id' => $req->inspection_category_id, 
            'general_manufacturing_activity_id' =>$req->general_manufacturing_activity_id,
            'special_category_id'=> $req->special_category_id
        );
        if (validateIsNumeric($record_id,'mis_db')) {
            $where = array('id' => $record_id);
            if (recordExists($table_name, $where,'mis_db')) {
                $block_data['dola'] = Carbon::now();
                $block_data['altered_by'] = $email_address;

                $previous_data = getPreviousRecords($table_name, $where,'mis_db');

                $resp = updateRecord($table_name, $previous_data, $where, $block_data, $email_address,'mis_db');

                $res = array(
                    'success' => true,
                    'message' => 'Manufacturing Block details saved successfully.',
                    'id' => $record_id, 
                    'special_category_id' => $special_category_id,
                    'manufacturing_site_id' => $manufacturing_site_id,
                );
            }
        } else {
            if (!recordExists($table_name, $block_data,'mis_db')) {
                $block_data['created_on'] = Carbon::now();
                $block_data['created_by'] = $email_address;

                $resp = insertRecord($table_name, $block_data, $email_address,'mis_db');
                    $record_id = $resp['record_id'];
                    $res = array(
                        'success' => true,
                        'message' => 'Manufacturing Block details saved successfully.',
                        'id' => $record_id,
                        'special_category_id' => $special_category_id,
                        'manufacturing_site_id' => $manufacturing_site_id,
                    );
               
            }else{
                 $res = array(
                        'success'=>false,
                        'message'=>'Details already saved.');

            }
        }


    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'message' => $exception->getMessage(),
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage(),
        );
    }

    return response()->json($res);
}
public function onSaveIntededmanufatcuringActivity(Request $req) {
    try {
        $manufacturing_site_id = $req->manufacturing_site_id;
        $record_id = $req->id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;
        $inteded_manufacturing_id = $req->inteded_manufacturing_id; 
        $table_name = 'wb_intended_manufacturing';
        $block_data = array(
            'inteded_manufacturing_id' => $req->inteded_manufacturing_id, 
            'manufacturing_site_id' => $req->manufacturing_site_id,
            'manufacturing_activity_id' => $req->manufacturing_activity_id,

        );

        if (validateIsNumeric($record_id)) {
            $where = array('id' => $record_id);

            if (recordExists($table_name, $where)) {
                $block_data['dola'] = Carbon::now();
                $block_data['altered_by'] = $email_address;

                $previous_data = getPreviousRecords($table_name, $where);

                $resp = updateRecord($table_name, $previous_data, $where, $block_data, $email_address);

                $res = array(
                    'success' => true,
                    'message' => 'Manufacturing details saved successfully.',
                    'id' => $record_id, // Include 'id' in the response
                    'manufacturing_site_id' => $manufacturing_site_id,
                );
            }
        } else {
            if (!recordExists($table_name, $block_data)) {
                $block_data['created_on'] = Carbon::now();
                $block_data['created_by'] = $email_address;

                $resp = insertRecord($table_name, $block_data, $email_address);
                    $record_id = $resp['record_id'];
                    $res = array(
                        'success' => true,
                        'message' => 'Manufacturing details saved successfully.',
                        'id' => $record_id,
                        'manufacturing_site_id' => $manufacturing_site_id,
                    );
               
            }else{
                 $res = array(
                        'success'=>false,
                        'message'=>'Details already saved.');

            }
        }

    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'message' => $exception->getMessage(),
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage(),
        );
    }

    return response()->json($res);
}


public function onSavePremisesAmmendmentsRequest(Request $req){
        try {
            $manufacturing_site_id = $req->manufacturing_site_id;
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
           
           $table_name = 'wb_premises_ammendmentrequest';
            $premises_otherinfor = array('manufacturing_site_id'=>$req->manufacturing_site_id,
                                    'part_id'=>$req->part_id,
                                   'remarks'=>$req->remarks
                                );  
                             
                        if(validateIsNumeric($record_id)){
                              
                                $where = array('id'=>$record_id);
                          
                                if (recordExists($table_name, $where)) {
                                    
                                    $premises_otherinfor['dola'] = Carbon::now();
                                    $premises_otherinfor['altered_by'] = $email_address;
                
                                    $previous_data = getPreviousRecords($table_name, $where);
                                    
                                    $resp =updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
                                    
                                }
                                $res = returnFuncResponses($resp,'Premises Ammendments Request','manufacturing_site_id',$manufacturing_site_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                           if(!recordExists($table_name, $premises_otherinfor)){
                                $premises_otherinfor['created_on'] = Carbon::now();
                                $premises_otherinfor['created_by'] = $email_address;
            
                                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                                
                                $res = returnFuncResponses($resp,'Premises Ammendments Request','manufacturing_site_id',$manufacturing_site_id);
                           
                            }
                           else{
                                $res = array(
                                    'success'=>false,
                                    'message'=>'Premises Premises Ammendments Request exists or already saved.');

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
    public function getGMPContractManufacturingDetails(Request $req){

    try{
        $manufacturing_site_id = $req->manufacturing_site_id;
        $data = array();
        $mis_db = DB::connection('mis_db')->getDatabaseName();
        //get the records 
        $records = DB::table('wb_contractmanufacturing_details as t1')
                       ->leftJoin($mis_db.'.tra_personnel_information as t2', function($join) {
                        $join->on('t2.name', '=', 't1.contact_person');
                    })
                ->select(DB::raw('t1.*,t2.email_address,t2.telephone_no'))
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                foreach ($records as $rec) {
                    $contract_manufacturing_id = $rec->contract_manufacturing_id;
                    $inspected_id = $rec->inspected_id;
                
                   $contract_manufacturing = getParameterItem('par_manufacturing_contractdetails',$rec->contract_manufacturing_id,'mis_db');
                    $inspected = getParameterItem('par_confirmations',$rec->inspected_id,'mis_db');
                        $data[] = array('id'=>$rec->id,
                                    'contract_manufacturing'=>$contract_manufacturing,
                                    'inspected'=>$inspected,
                                    'manufacturer_name'=>$rec->manufacturer_name,
                                    'contact_person'=>$rec->contact_person,
                                    'telephone_no'=>$rec->telephone_no,
                                    'email_address'=>$rec->email_address,
                                    'manufacturing_site_id'=>$rec->manufacturing_site_id,
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
public function getGmpApplicationLoading(Request $req){
       
            try{
                $trader_id = $req->trader_id;
                $application_status_id = $req->application_status_id;
                $application_status_ids = explode(',',  $application_status_id);
                $sub_module_id = $req->sub_module_id;
                $gmp_type_id = $req->gmp_type_id;
                $section_id = $req->section_id;
                $mis_db = DB::connection('mis_db')->getDatabaseName();
                $data = array();
                //get the records 
                if($sub_module_id == 117){
                         $records = DB::table('wb_gmp_applications as t1')
                        ->select(DB::raw('t1.module_id,t1.created_by,t7.name as action_name,t7.iconCls,t7.action,t1.zone_id,t1.manufacturing_site_id, t1.tracking_no,t1.application_code, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*, t1.date_added, t1.date_added as submission_date,t1.manufacturing_site_id, t1.sub_module_id,t1.section_id, t1.applicant_id, registrant_option_id,trader_aslocal_agent,local_agent_id,application_initiator_id, t1.reference_no, t1.application_status_id'))
                        ->leftJoin('wb_manufacturing_sites as t2', 't1.manufacturing_site_id','=','t2.id')

                        ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                        ->leftJoin('wb_processstatus_actions as t6',function($join){
                            $join->on('t1.application_status_id', '=', 't6.status_id')
                                 ->on('t6.is_default_action', '=', DB::raw(1));

                        })
                        ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                        ->where(function($q) use($trader_id) {
                                $q->where('t1.applicant_id', $trader_id)
                                ->orWhere('application_initiator_id', $trader_id);
                        })
                        ->whereNotIn('application_status_id',array('12'))
                        ->whereIn('t1.sub_module_id',array(117));


                    }else{
                        $records = DB::table('wb_gmp_applications as t1')
                        ->select(DB::raw('t1.module_id,t1.created_by,t7.name as action_name,t7.iconCls,t7.action,t1.zone_id,t1.manufacturing_site_id, t1.tracking_no,t1.gmp_type_id,t1.application_code, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*,t1.date_added, t1.date_added as submission_date,t1.manufacturing_site_id, t1.sub_module_id,t1.section_id, t1.applicant_id, registrant_option_id,trader_aslocal_agent,local_agent_id,application_initiator_id, t1.reference_no, t1.application_status_id'))
                        ->leftJoin('wb_manufacturing_sites as t2', 't1.manufacturing_site_id','=','t2.id')

                        ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                        ->leftJoin('wb_processstatus_actions as t6',function($join){
                            $join->on('t1.application_status_id', '=', 't6.status_id')
                                 ->on('t6.is_default_action', '=', DB::raw(1));

                        })
                        ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                        ->where(function($q) use($trader_id) {
                                $q->where('t1.applicant_id', $trader_id)
                                ->orWhere('application_initiator_id', $trader_id);
                        })
                        ->whereNotIn('application_status_id',array('12'));

                    }

                    if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                        $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                    } if(validateIsNumeric($gmp_type_id)){
                        $records =  $records->where(array('t1.gmp_type_id'=>$gmp_type_id));
                    }
                    if(validateIsNumeric($sub_module_id)){
                        $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                    }if(validateIsNumeric($section_id)){
                        //$records =  $records->where(array('t1.section_id'=>$section_id));
                    }
                    $records = $records->get();

                    $data = $this->getGmpApplications($records);
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
    public function getPremisesArchivedApplicationLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_applications as t1')
                ->select(DB::raw('t1.module_id,t1.created_by,t1.zone_id, t1.tracking_no, t1.id as application_id,t1.application_code,t3.name as status_name,t1.section_id,t2.*, t1.date_added, t1.submission_date,t1.manufacturing_site_id, t1.sub_module_id,t1.section_id, t1.trader_id, t1.reference_no, t1.application_status_id'))
                ->leftJoin('wb_premises as t2', 't1.manufacturing_site_id','=','t2.id')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->where(array('t1.trader_id' => $trader_id,'application_status_id'=>12))
                ->get();
                $data = $this->getGmpApplications($records);
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
    function getGmpApplications($records){
        
         $actionColumnData = returnContextMenuActions();
         $data = array();
         $subModuleData = getParameterItems('sub_modules','','mis_db');
         $sectionsData = getParameterItems('par_sections','','mis_db');
         $countriesData = getParameterItems('par_countries','','mis_db');
         $regionsData = getParameterItems('par_regions','','mis_db');
         $districtsData = getParameterItems('par_districts','','mis_db');
         $countriesData = getParameterItems('par_countries','','mis_db');
       
         foreach ($records as $rec) {
            $section = returnParamFromArray($sectionsData,$rec->section_id);
            $data[] = array('reference_no'=>$rec->reference_no,
                            'application_initiator_id'=>$rec->application_initiator_id,
                            'registrant_option_id'=>$rec->registrant_option_id,
                            'local_agent_id'=>$rec->local_agent_id,
                             'premise_id'=>$rec->premise_id,
                            'email_address'=>$rec->email,
                            'trader_aslocal_agent'=>$rec->trader_aslocal_agent,
                            'applicant_id'=>$rec->applicant_id,
                            'manufacturing_site_id'=>$rec->manufacturing_site_id,
                            'section_id'=>$rec->section_id,
                            'manufacturing_site_name'=>$rec->name,
                            'application_id'=>$rec->application_id,
                            'application_code'=>$rec->application_code,
                            'id'=>$rec->application_id,
                            'date_added'=>$rec->date_added,
                            'sub_module_id'=>$rec->sub_module_id,
                            'module_id'=>$rec->module_id,
                            'application_status_id'=>$rec->application_status_id,
                            'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                            'section'=>$section,
                            'created_by'=>$rec->created_by,
                            'submission_date'=>$rec->submission_date,
                            'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                            'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                            'district_name'=>returnParamFromArray($districtsData,$rec->district_id),
                            'country_id'=>$rec->country_id,
                            'region_id'=>$rec->region_id,
                            'district_id'=>$rec->district_id,
                            'section_id'=>$rec->section_id,
                            'zone_id'=>$rec->zone_id,
                            'longitude'=>$rec->longitude,
                            'latitude'=>$rec->latitude,
                            'section_name'=>$section,
                            'physical_address'=>$rec->physical_address,
                            'status_name'=>$rec->status_name,
                            'added_by'=>$rec->created_by,
                            'tracking_no'=>$rec->tracking_no,
                            'action_name'=>$rec->action_name,
                                        'action'=>$rec->action,
                                        'iconCls'=>$rec->iconCls,
                            'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                        );
                        
         }
         return $data;


    }
    public function getgmpApplicationDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            
            $records = DB::table('wb_gmp_applications as t1')
                    ->select(DB::raw('t1.*,init_site_id as initial_site_id, t2.registered_id, t2.premise_id, t6.name as local_agent_name,t7.name as premise_name,t1.id as application_id, t5.name as applicant_name, t2.name as manufacturing_site_name, t2.*, t3.name as status_name, t4.router_link, t4.name as process_title'))
                    ->join('wb_manufacturing_sites as t2', 't1.manufacturing_site_id','=','t2.id')
                    ->join('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_trader_account as t5', 't1.applicant_id','=','t5.id')
                    ->leftJoin('wb_trader_account as t6', 't1.local_agent_id','=','t6.id')
                    ->leftJoin('wb_premises as t7', 't1.premise_id','=','t7.id')

                    ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                        $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                        $join->on('t1.application_status_id', '=', 't4.status_id');
                    })
                    ->where(array('t1.id' => $application_id))
                    ->get();
                    $data = $this->getgmpApplicationDataSets($records);
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
    function getgmpApplicationDataSets($records){
        foreach ($records as $rec) {
            $manufacturer_id =  getSingleRecordColValue('par_man_sites', array('id'=>$rec->man_site_id), 'manufacturer_id','mis_db');
            $manufacturer_name =  getSingleRecordColValue('tra_manufacturers_information', array('id'=>$manufacturer_id), 'name','mis_db');
            $contact_person =  getSingleRecordColValue('tra_personnel_information', array('id'=>$rec->contact_person_id), 'name','mis_db');
            $billing_person =  getSingleRecordColValue('tra_personnel_information', array('id'=>$rec->billing_person_id), 'name','mis_db');
       $premise_name=  getSingleRecordColValue('tra_premises', array('id'=>$rec->premise_id), 'name','mis_db');
       
            $data[] = array('reference_no'=>$rec->reference_no,
                            'application_initiator_id'=>$rec->application_initiator_id,
                            'registrant_option_id'=>$rec->registrant_option_id,
                            'local_agent_id'=>$rec->local_agent_id,
                            'application_code'=>$rec->application_code,
                            'trader_aslocal_agent'=>$rec->trader_aslocal_agent,
                'inspection_activities_id'=>$rec->inspection_activities_id,
                            'manufacturing_site_id'=>$rec->manufacturing_site_id,
                            'initial_manufacturing_site_id'=>$rec->initial_manufacturing_site_id,
                            'applicant_id'=>$rec->applicant_id,
                            'gmp_type_id'=>$rec->gmp_type_id,
                            'date_added'=>$rec->date_added,
                            'submission_date'=>$rec->submission_date,
                            'reference_no'=>$rec->reference_no,
                            'tracking_no'=>$rec->tracking_no,
                            'section_id'=>$rec->section_id,
                            'manufacturer_name'=>$manufacturer_name,
                            'module_id'=>$rec->module_id,
                            'sub_module_id'=>$rec->sub_module_id,
                            'application_status_id'=>$rec->application_status_id,
                            'zone_id'=>$rec->zone_id,
                           'registered_id'=>$rec->registered_id,
                           'premise_id'=>$rec->premise_id,
                           'local_agent_name'=>$rec->local_agent_name,
                            'premise_name'=>$rec->premise_name,
                           'application_id'=>$rec->application_id,
                           'applicant_name'=>$rec->applicant_name,
                           'manufacturing_site_name'=>$rec->manufacturing_site_name,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'process_title'=>$rec->process_title,
                            //the manufacturing site
                            'man_site_id'=>$rec->man_site_id,
                           'gmp_type_id'=>$rec->gmp_type_id,
                           'zone_id'=>$rec->zone_id,
                          // 'status_id'=>$rec->status_id,
                           'init_site_id'=>$rec->init_site_id,
                           'ltr_id'=>$rec->ltr_id,
                           'registered_id'=>$rec->registered_id,
                           'name'=>$rec->name,
                           'country_id'=>$rec->country_id,
                           'region_id'=>$rec->region_id,
                           'city_id'=>$rec->city_id,
                           'section_id'=>$rec->section_id,
                           'code_no'=>$rec->code_no,
                           'mobile_no'=>$rec->mobile_no,
                           'district_id'=>$rec->district_id,
                           'telephone'=>$rec->telephone,
                           'fax'=>$rec->fax,
                           'email_address'=>$rec->email,
                           'website'=>$rec->website,
                           'physical_address'=>$rec->physical_address,
                           'postal_address'=>$rec->postal_address,
                          // 'street'=>$rec->street,
                          // 'gps_coordinate'=>$rec->gps_coordinate,
                           'latitude'=>$rec->latitude,
                           'longitude'=>$rec->longitude,
                          // 'business_scale_id'=>$rec->business_scale_id,
                           'assessment_type_id'=>$rec->assessment_type_id,
                           'device_type_id'=>$rec->device_type_id,
                            'contact_person'=>$contact_person,
                           'contact_person_id'=>$rec->contact_person_id,
                            'billing_person'=>$billing_person,
                'premise_name'=>$premise_name,
                           'billing_person_id'=>$rec->billing_person_id,
                           'contact_person_startdate'=>$rec->contact_person_startdate,
                           'contact_person_enddate'=>$rec->contact_person_enddate,
                           'applicant_contact_person'=>$rec->applicant_contact_person,
                           'business_type_id'=>$rec->business_type_id,
                           'is_fast_track'=>$rec->is_fast_track,
                           'paying_currency_id'=>$rec->paying_currency_id


                        );
                        
         }
         return $data;

    }
    public function getGMPOtherDetails(Request $req){
       
        try{
            $manufacturing_site_id = $req->manufacturing_site_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_mansite_otherdetails as t1')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                     ->get();
                     
                     foreach ($records as $rec) {
                      
                        $data[] = array('id'=>$rec->id,
                                        'business_type'=>getParameterItem('par_business_types',$rec->business_type_id,'mis_db'),
                                        'business_type_details'=>getParameterItem('par_business_type_details',$rec->business_type_detail_id,'mis_db'),
                                        'business_type_detail_id'=>$rec->business_type_detail_id,
                                        'business_type_id'=>$rec->business_type_id,
                                        'manufacturing_site_id'=>$rec->manufacturing_site_id
                                    );
                                    
                     }
                     $res = $data;
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



public function getManufacturingSiteInformation(Request $req){
        
  try{
        $search_value  = '';
        $take = $req->has('take') ? (int)$req->take : 50;
        $skip = $req->has('skip') ? (int)$req->skip : 0;
        $searchValue = $req->searchValue;
        $data = array();
        $qry = DB::connection('mis_db')
                        ->table('par_man_sites as t1')
                        ->select('t1.*','t1.id as man_site_id','t5.name as manufacturer_name', 't1.name as manufacturing_site_name', 't2.name as country', 't3.name as region','t4.name as district')
                        ->leftjoin('par_countries as t2', 't1.country_id', '=','t2.id')
                        ->leftjoin('par_regions as t3', 't1.region_id', '=','t3.id')
                        ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                        ->join('tra_manufacturers_information as t5', 't1.manufacturer_id', '=','t5.id');
        $data = array();
       
            if($req->searchValue != 'undefined'){
                
                $searchValue = explode(',',$searchValue);
                $search_value = '';
                if(isset($searchValue[2])){
                    $search_value =  $searchValue[2];
                }
                
                
            }
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.email  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";

                $filter_string = implode(' OR ', $whereClauses);
                $qry->whereRAW($filter_string);
            }
            
            $totalCount = $qry->count(); // Get total count before pagination

                    // Apply pagination
            $records = $qry->skip($skip)->take($take)->get();

             $res = array('success'=>true, 
                        'data'=>$records,
                        'totalCount'=>$totalCount 
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



public function getManufacturingSitePreInformation(Request $req){
        
    try{
        $search_value  = '';
        $take = $req->has('take') ? (int)$req->take : 50;
        $skip = $req->has('skip') ? (int)$req->skip : 0;
        $searchValue = $req->searchValue;
        $data = array();
        $qry = DB::connection('mis_db')
                        ->table('par_man_sites as t1')
                        ->select('t1.*','t1.id as man_site_id','t5.name as manufacturer_name', 't1.name as manufacturing_site_name', 't2.name as country', 't3.name as region','t4.name as district')
                        ->leftjoin('par_countries as t2', 't1.country_id', '=','t2.id')
                        ->leftjoin('par_regions as t3', 't1.region_id', '=','t3.id')
                        ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                        ->join('tra_manufacturers_information as t5', 't1.manufacturer_id', '=','t5.id');
        $data = array();
       
            if($req->searchValue != 'undefined'){
                
                $searchValue = explode(',',$searchValue);
                $search_value = '';
                if(isset($searchValue[2])){
                    $search_value =  $searchValue[2];
                }
                
                
            }
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.email  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";

                $filter_string = implode(' OR ', $whereClauses);
                $qry->whereRAW($filter_string);
            }
            
            $totalCount = $qry->count(); // Get total count before pagination

                    // Apply pagination
            $records = $qry->skip($skip)->take($take)->get();

             $res = array('success'=>true, 
                        'data'=>$records,
                        'totalCount'=>$totalCount 
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


public function getGmpProductLineSurgicaldetailsDt(Request $request)
    {
       $block_id = $request->block_id;
        $manufacturing_site_id = $request->manufacturing_site_id;
        $section_id = $request->input('section_id');
        try {
           $mis_db = DB::connection('mis_db')->getDatabaseName();

           $qry = DB::table($mis_db.'.par_medical_device_family as t2')
           ->join($mis_db.'.gmp_productline_details as t1', function ($join) use ($manufacturing_site_id) {
                    $join->on('t2.id', '=', 't1.group_family_id')
                             ->where('t1.manufacturing_site_id', $manufacturing_site_id);
           })
           ->leftJoin($mis_db.'.gmp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
           ->leftJoin($mis_db.'.gmp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
           ->leftJoin($mis_db.'.tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
           ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t18', 't1.intended_manufacturing_activity_id', '=', 't18.id')
            ->leftJoin($mis_db.'.par_manufacturinginspection_category as t10', 't7.inspection_category_id', '=', 't10.id')
            ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t19', 't1.inteded_manufacturing_id', '=', 't19.id')
           ->leftJoin($mis_db.'.par_activitity as t20', 't1.active_id', '=', 't20.id')
            ->leftJoin($mis_db.'.par_sterility as t21', 't1.sterile_id', '=', 't21.id')
            ->leftJoin($mis_db.'.par_invasivity as t22', 't1.invasive_id', '=', 't22.id')
            ->leftJoin($mis_db.'.par_medics as t23', 't1.medicated_id', '=', 't23.id')


           ->leftJoin($mis_db.'.gmp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
            ->leftJoin($mis_db.'.par_manufacturing_activities as t12', 't1.manufacturing_activity_id', '=', 't12.id')
            ->leftJoin($mis_db.'.par_gmpproduct_types as t13', 't1.gmpproduct_type_id', '=', 't13.id')
           ->select('t1.*','t7.*','t13.name as gmpproduct_type','t1.id as record_id','t10.name as inspection_manufacturing_category','t2.id as group_family_id', 't12.name as manufacturing_activities','t7.name as block_name','t18.name as manufacturing_activity','t19.name as scope_inteded_manufacturing','t2.name as products_line_name','t20.name as active','t21.name as sterility', 't22.name as invasive','t23.name as medicated','t1.product_line_description','t6.name as product_line_status','t5.name as inspection_recommendation','t8.name as tc_recommendation','t9.name as dg_recommendation')
           ->where('t1.manufacturingsite_block_id', $block_id);

            if(validateIsNumeric($section_id)){

               // $qry->where(array('t2.section_id'=>$section_id));
            }
             $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message'=>'All is well.'
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
        return response()->json($res);
    }


    public function getgmpSurgicalLineDetails(Request $req){
        try{
            $manufacturing_site_id = $req->manufacturing_site_id;
            $data = array();
            $records = DB::connection('mis_db')->table('gmp_productline_details as t1')
                    ->select('t1.id', 't2.name as products_line_name','t3.name as manufacturing_activities')
                    ->join('par_medical_device_family as t2', 't1.group_family_id','=','t2.id')
                    ->leftJoin('par_manufacturing_activities as t3', 't1.manufacturing_activity_id', '=', 't3.id')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                    ->get();
                     $res =array('success'=>true,'data'=> $records);
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



public function getGmpProductLineSurgicaldetails(Request $request)
    {
       
        $manufacturing_site_id = $request->manufacturing_site_id;
        $section_id = $request->input('section_id');
        try {
           $mis_db = DB::connection('mis_db')->getDatabaseName();

           $qry = DB::table($mis_db.'.par_medical_device_family as t2')
           ->join($mis_db.'.gmp_productline_details as t1', function ($join) use ($manufacturing_site_id) {
                    $join->on('t2.id', '=', 't1.group_family_id')
                             ->where('t1.manufacturing_site_id', $manufacturing_site_id);
           })
           ->leftJoin($mis_db.'.gmp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
           ->leftJoin($mis_db.'.gmp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
           ->leftJoin($mis_db.'.tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
           ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t18', 't1.intended_manufacturing_activity_id', '=', 't18.id')
            ->leftJoin($mis_db.'.par_manufacturinginspection_category as t10', 't7.inspection_category_id', '=', 't10.id')
            ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t19', 't1.inteded_manufacturing_id', '=', 't19.id')
           ->leftJoin($mis_db.'.par_activitity as t20', 't1.active_id', '=', 't20.id')
            ->leftJoin($mis_db.'.par_sterility as t21', 't1.sterile_id', '=', 't21.id')
            ->leftJoin($mis_db.'.par_invasivity as t22', 't1.invasive_id', '=', 't22.id')

            ->leftJoin($mis_db.'.par_medics as t23', 't1.medicated_id', '=', 't23.id')

           ->leftJoin($mis_db.'.gmp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
            ->leftJoin($mis_db.'.par_manufacturing_activities as t12', 't1.manufacturing_activity_id', '=', 't12.id')
            ->leftJoin($mis_db.'.par_gmpproduct_types as t13', 't1.gmpproduct_type_id', '=', 't13.id')
           ->select('t1.*','t7.*','t13.name as gmpproduct_type','t1.id as record_id','t10.name as inspection_manufacturing_category','t2.name as products_line_name','t2.id as group_family_id','t12.name as manufacturing_activities','t7.name as block_name','t18.name as manufacturing_activity','t19.name as scope_inteded_manufacturing','t20.name as active','t21.name as sterility', 't22.name as invasive','t23.name as medicated','t1.product_line_description','t6.name as product_line_status','t5.name as inspection_recommendation','t8.name as tc_recommendation','t9.name as dg_recommendation');
                       // $results = $qry->get();
            if(validateIsNumeric($section_id)){

               // $qry->where(array('t2.section_id'=>$section_id));
            }
             $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message'=>'All is well'
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
        return response()->json($res);
    }


public function getGmpProductLinedetailsDt(Request $request)
    {
       $block_id = $request->block_id;
        $manufacturing_site_id = $request->manufacturing_site_id;
        $section_id = $request->input('section_id');
        try {
           $mis_db = DB::connection('mis_db')->getDatabaseName();

           $qry = DB::table($mis_db.'.gmp_product_lines as t2')
           ->join($mis_db.'.gmp_productline_details as t1', function ($join) use ($manufacturing_site_id) {
                    $join->on('t2.id', '=', 't1.product_line_id')
                             ->where('t1.manufacturing_site_id', $manufacturing_site_id);
           })
            ->leftJoin($mis_db.'.gmp_product_categories as t3', 't2.gmp_product_categories_id', '=', 't3.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
           ->leftJoin($mis_db.'.gmp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
           ->leftJoin($mis_db.'.tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
           ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t18', 't1.intended_manufacturing_activity_id', '=', 't18.id')
            ->leftJoin($mis_db.'.par_manufacturinginspection_category as t10', 't7.inspection_category_id', '=', 't10.id')
            ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t19', 't1.inteded_manufacturing_id', '=', 't19.id')
           ->leftJoin($mis_db.'.par_activitity as t20', 't1.active_id', '=', 't20.id')
            ->leftJoin($mis_db.'.par_sterility as t21', 't1.sterile_id', '=', 't21.id')
            ->leftJoin($mis_db.'.par_invasivity as t22', 't1.invasive_id', '=', 't22.id')
            ->leftJoin($mis_db.'.par_medics as t23', 't1.medicated_id', '=', 't23.id')

            ->leftJoin($mis_db.'.par_medical_device_family as t24', 't1.group_family_id', '=', 't24.id')

           ->leftJoin($mis_db.'.gmp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
            ->leftJoin($mis_db.'.par_manufacturing_activities as t12', 't1.manufacturing_activity_id', '=', 't12.id')
            ->leftJoin($mis_db.'.par_gmpproduct_types as t13', 't1.gmpproduct_type_id', '=', 't13.id')
           ->select('t1.*','t7.*','t13.name as gmpproduct_type','t24.name as products_line_name','t1.id as record_id','t10.name as inspection_manufacturing_category','t2.id as product_line_id', 't3.id as gmp_product_categories_id','t12.name as manufacturing_activities','t7.name as block_name','t18.name as manufacturing_activity','t19.name as scope_inteded_manufacturing','t2.name as product_line_name','t3.name as product_line_category','t20.name as active','t21.name as sterility', 't22.name as invasive','t23.name as medicated','t1.product_line_description','t2.gmp_product_categories_id','t6.name as product_line_status','t5.name as inspection_recommendation','t8.name as tc_recommendation','t9.name as dg_recommendation')
           ->where('t1.manufacturingsite_block_id', $block_id);

            if(validateIsNumeric($section_id)){

               // $qry->where(array('t2.section_id'=>$section_id));
            }
             $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message'=>'All is well.'
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
        return response()->json($res);
    }

public function getProductLinedetails(Request $request)
    {
       
        $manufacturing_site_id = $request->manufacturing_site_id;
        try {
           $mis_db = DB::connection('mis_db')->getDatabaseName();

           $qry = DB::table($mis_db.'.gmp_product_lines as t2')
           ->join($mis_db.'.gmp_productline_details as t1', function ($join) use ($manufacturing_site_id) {
                    $join->on('t2.id', '=', 't1.product_line_id')
                             ->where('t1.manufacturing_site_id', $manufacturing_site_id);
           })
  
           ->select('t1.id','t2.name as product_line_name');

             $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message'=>'All is well'
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
        return response()->json($res);
    }

public function getGmpProductLinedetails(Request $request)
    {
       
        $manufacturing_site_id = $request->manufacturing_site_id;
        $section_id = $request->input('section_id');
        try {
           $mis_db = DB::connection('mis_db')->getDatabaseName();

           $qry = DB::table($mis_db.'.gmp_product_lines as t2')
           ->join($mis_db.'.gmp_productline_details as t1', function ($join) use ($manufacturing_site_id) {
                    $join->on('t2.id', '=', 't1.product_line_id')
                             ->where('t1.manufacturing_site_id', $manufacturing_site_id);
           })
            ->leftJoin($mis_db.'.gmp_product_categories as t3', 't2.gmp_product_categories_id', '=', 't3.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
           ->leftJoin($mis_db.'.gmp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
           ->leftJoin($mis_db.'.tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
           ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t18', 't1.intended_manufacturing_activity_id', '=', 't18.id')
            ->leftJoin($mis_db.'.par_manufacturinginspection_category as t10', 't7.inspection_category_id', '=', 't10.id')
            ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t19', 't1.inteded_manufacturing_id', '=', 't19.id')
           ->leftJoin($mis_db.'.par_activitity as t20', 't1.active_id', '=', 't20.id')
            ->leftJoin($mis_db.'.par_sterility as t21', 't1.sterile_id', '=', 't21.id')
            ->leftJoin($mis_db.'.par_invasivity as t22', 't1.invasive_id', '=', 't22.id')

            ->leftJoin($mis_db.'.par_medics as t23', 't1.medicated_id', '=', 't23.id')
            ->leftJoin($mis_db.'.par_medical_device_family as t24', 't1.group_family_id', '=', 't24.id')

           ->leftJoin($mis_db.'.gmp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
           ->leftJoin($mis_db.'.gmp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
            ->leftJoin($mis_db.'.par_manufacturing_activities as t12', 't1.manufacturing_activity_id', '=', 't12.id')
            ->leftJoin($mis_db.'.par_gmpproduct_types as t13', 't1.gmpproduct_type_id', '=', 't13.id')
           ->select('t1.*','t7.*','t13.name as gmpproduct_type','t1.id as record_id','t10.name as inspection_manufacturing_category','t24.name as products_line_name','t2.id as product_line_id', 't3.id as gmp_product_categories_id','t12.name as manufacturing_activities','t7.name as block_name','t18.name as manufacturing_activity','t19.name as scope_inteded_manufacturing','t2.name as product_line_name','t3.name as product_line_category','t20.name as active','t21.name as sterility', 't22.name as invasive','t23.name as medicated','t1.product_line_description','t2.gmp_product_categories_id','t6.name as product_line_status','t5.name as inspection_recommendation','t8.name as tc_recommendation','t9.name as dg_recommendation');
                       // $results = $qry->get();
            if(validateIsNumeric($section_id)){

               // $qry->where(array('t2.section_id'=>$section_id));
            }
             $results = $qry->get();
            $res = array(
                'success' => true,
                'data' => $results,
                'message'=>'All is well'
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
        return response()->json($res);
    }
public function getGmpManufacturingBlocksDetails(Request $req){
    try{
        $manufacturing_site_id = $req->manufacturing_site_id;
        $data = array();
        $mis_db = DB::connection('mis_db')->getDatabaseName();                    
        $records = DB::table($mis_db.'.tra_manufacturing_sites_blocks as t1')
                ->select('t1.*','t1.name as block_name','t5.name as general_manufacturing_activity_type','t3.name as inspection_manufacturing_category',DB::raw('COUNT(DISTINCT t4.id) as total_value'))
                ->leftJoin($mis_db.'.par_manufacturinginspection_category as t3', 't1.inspection_category_id', '=', 't3.id')
                 ->leftJoin($mis_db.'.par_general_manufacturing_activity as t5', 't1.general_manufacturing_activity_id', '=', 't5.id')
                ->leftJoin($mis_db.'.gmp_productline_details as t4', 't4.manufacturingsite_block_id', '=', 't1.id')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->groupBy('t1.id')
                 ->get();
                 $res = array(
                    'success' => true,
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



public function getGmpInspectionHistoryDetails(Request $req){
    try{
        $mis_db = DB::connection('mis_db')->getDatabaseName();                    
        $manufacturing_site_id = $req->manufacturing_site_id;
        $data = array();
        $records = DB::table($mis_db.'.tra_gmp_inpection_history as t1')
                ->select('t1.*')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                 $res = array(
                    'success' => true,
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


public function getPreGmpManufacturingDetails(Request $req){
    try{
        $manufacturing_site_id = $req->manufacturing_site_id;
        $data = array();
        $mis_db = DB::connection('mis_db')->getDatabaseName();                    
        $records = DB::table('wb_intended_manufacturing as t1')
                ->select('t1.*','t1.manufacturing_activity_id as manufacturing_activities')
                ->leftJoin($mis_db.'.par_inteded_manufacturingactivities as t2', 't1.manufacturing_activity_id', '=', 't2.id')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                 $res = array(
                    'success' => true,
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
public function getPersonnelInformations(Request $req){
    $trader_id = $req->mistrader_id;
    $data = DB::connection('mis_db')->table('tra_personnel_information as t1')
                ->where(array('trader_id'=>$trader_id))
                ->get();
    return response()->json(array('data'=>$data));
}
public function getBillingPersonnelInformations(Request $req){
    $trader_id = $req->mistrader_id;
    $data = DB::connection('mis_db')->table('tra_billingpersonnel_information as t1')
                ->where(array('trader_id'=>$trader_id))
                ->get();
    return response()->json(array('data'=>$data));
}
public function onSavePremisesPersonnel(Request $req){
            
    try {
        $trader_id = $req->trader_id;
         $email_address = $req->traderemail_address;
   
        $personnel_id = $req->personnel_id;
        $start_date = $req->start_date;
        $end_date = $req->end_date;
        $premise_id = $req->premise_id;
        $record_id = $req->id;
        $position_id = $req->position_id;

        $premises_personnel = array('personnel_id'=>$req->personnel_id,
                                'start_date'=>formatDate($req->start_date),
                                'manufacturing_site_id'=>$req->manufacturing_site_id,
                                'position_id'=>$req->position_id,
                                'qualification_id'=>$req->qualification_id,
                                'end_date'=>formatDate($req->end_date),
                                'study_field_id'=>$req->study_field_id,
                                'registration_no'=>$req->registration_no,
                                'institution'=>$req->institution,
                            );  
                           
                    $table_name = 'wb_manufacturing_sites_personnel';
                    if(validateIsNumeric($record_id)){
                          
                            $where = array('id'=>$record_id);
                      
                            if (recordExists($table_name, $where)) {
                                
                                $premises_personnel['dola'] = Carbon::now();
                                $premises_personnel['altered_by'] = $email_address;
            
                                $previous_data = getPreviousRecords($table_name, $where);
                               
                                $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $email_address);
                                
                            }
                            $res = returnFuncResponses($resp,'Premises Personnel','premise_id',$premise_id);
                            
                        }
                    else{
                        //chenform if this exisit 
                        
                       if(!recordExists($table_name, $premises_personnel)){
                            $premises_personnel['created_on'] = Carbon::now();
                            $premises_personnel['created_by'] = $email_address;
                            
                            $resp = insertRecord($table_name, $premises_personnel, $email_address);
                        
                            $res = returnFuncResponses($resp,'Manufacturing Site Personnel Details','premise_id',$premise_id);
                       
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
public function onSavePersonnelDetails(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
        $traderemail_address = $req->traderemail_address;
        
        $record_id = $req->personnel_id;

        $premises_personnel = array('name'=>$req->name,
                                'postal_address'=>$req->postal_address,
                                'telephone_no'=>$req->telephone_no,
                                'email_address'=>$req->email_address,
                                'trader_id'=>$req->mistrader_id,
                                'fax'=>$req->fax,
                                'status_id'=>1,
                                'position_id'=>$req->position_id,
                                'manufacturing_site_id'=>$req->manufacturing_site_id
                            );
                    $table_name = 'wb_manufacturing_sites_personnel';
                    if(validateIsNumeric($record_id)){
                          
                            $where = array('id'=>$record_id);
                      
                            if (recordExists($table_name, $where,'mis_db')) {
                                
                                $premises_personnel['dola'] = Carbon::now();
                                $premises_personnel['altered_by'] = $mistrader_id;
            
                                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                               
                                $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $mistrader_id,'mis_db');
                               
                            }
                            $res = returnFuncResponses($resp,'Personnel Details','personnel_id',$record_id);
                       
                        }
                    else{
                        //chenform if this exisit 
                        
                       if(!recordExists($table_name, $premises_personnel,'mis_db')){
                            $premises_personnel['created_on'] = Carbon::now();
                            $premises_personnel['created_by'] = $mistrader_id;
                            
                            $resp = insertRecord($table_name, $premises_personnel, $traderemail_address,'mis_db');
                            $record_id = $resp['record_id'];
                                  
                            $res = returnFuncResponses($resp,'Manufacturing Site Personnel Details','personnel_id',$record_id);
                       
                        }
                       else{
                            $res = array(
                                'success'=>false,
                                'message'=>'Personnel exists or already saved.');

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
public function onSavePersonnelQualification(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
        $traderemail_address = $req->traderemail_address;
        
        $record_id = $req->id;
        $personnel_id = $req->personnel_id;
        $premises_personnel = array('institution'=>$req->institution,
                                'registration_no'=>$req->registration_no,
                                'qualification_id'=>$req->qualification_id,
                                'study_field_id'=>$req->study_field_id,
                                'personnel_id'=>$req->personnel_id
                            );  
                           
                    $table_name = 'tra_personnel_qualifications';
                    if(validateIsNumeric($record_id)){
                          
                            $where = array('id'=>$record_id);
                      
                            if (recordExists($table_name, $where,'mis_db')) {
                                
                                $premises_personnel['dola'] = Carbon::now();
                                $premises_personnel['altered_by'] = $mistrader_id;
            
                                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                               
                                $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $mistrader_id,'mis_db');
                               
                            }
                            $res = returnFuncResponses($resp,'Personnel Details','personnel_id',$personnel_id);
                       
                        }
                    else{
                       
                       if(!recordExists($table_name, $premises_personnel,'mis_db')){
                            $premises_personnel['created_on'] = Carbon::now();
                            $premises_personnel['created_by'] = $mistrader_id;
                            
                            $resp = insertRecord($table_name, $premises_personnel, $traderemail_address,'mis_db');
                          
                            $res = returnFuncResponses($resp,'Personnel Qualification Details','personnel_id',$personnel_id);
                       
                        }
                       else{
                            $res = array(
                                'success'=>false,
                                'message'=>'Personnel Qualification exists or already saved.');

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

public function getPremisesPersonnelDetails(Request $req){
    
    try{
        $manufacturing_site_id = $req->manufacturing_site_id;
        $data = array();
        //get the records 
        $records = DB::table('wb_manufacturing_sites_personnel as t1')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                 foreach ($records as $rec) {
                    $qualification_id = $rec->qualification_id;
                    $registration_no = $rec->registration_no;
                    

                   $study_field = getParameterItem('par_personnel_studyfield',$rec->study_field_id,'mis_db');
                   $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');
                    $per_records = DB::connection('mis_db')->table('tra_personnel_information as t1')
                            ->select(DB::raw('t1.name as personnel,t1.*'))
                            
                            ->where(array('t1.id' => $rec->personnel_id))
                            ->first();
                            
                    if($per_records){
                        $data[] = array('id'=>$rec->id,
                                    'qualification_id'=>$qualification_id,
                                    'personnel_name'=>$per_records->personnel,
                                    'name'=>$per_records->personnel,
                                    'qualification'=>$qualification,
                                    'registration_no'=>$rec->registration_no,
                                    'institution'=>$rec->institution,
                                    'study_field'=>$study_field,
                                    'postal_address'=>$per_records->postal_address,
                                    'telephone_no'=>$per_records->telephone_no,
                                    'email_address'=>$per_records->email_address,
                                    'start_date'=>formatDate($rec->start_date),
                                    'end_date'=>formatDate($rec->end_date),
                                    'id'=>$rec->id,
                                    'position_id'=>$rec->position_id,
                                    'position_name'=> getParameterItem('par_personnel_positions',$rec->position_id,'mis_db'),
                                    'manufacturing_site_id'=>$rec->manufacturing_site_id,
                                    'personnel_id'=>$rec->personnel_id
                                );
                    }
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
public function getPremisesAmmendementsRequest(Request $req){
                try{
                    $manufacturing_site_id = $req->manufacturing_site_id;
                    $data = array();
                    //get the records 
                    $records = DB::table('wb_premises_ammendmentrequest as t1')
                            ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                             ->get();
                             foreach ($records as $rec) {
                                    $data[] = array('id'=>$rec->id,
                                                    'part_id'=>$rec->part_id,
                                                    'remarks'=>$rec->remarks,
                                                    'ammended_section'=>getParameterItem('par_alteration_setup',$rec->part_id,'mis_db')
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
public function getPersonnelQualifications(Request $req){
    try{
        $personnel_id = $req->personnel_id;
        $data = array();
        //get the records 
        $records = DB::connection('mis_db')->table('tra_personnel_information as t1')
                ->select(DB::raw('t2.*, t2.personnel_id, t1.name as personnel_name, t3.name as study_field, t4.name as qualifications'))
                ->join('tra_personnel_qualifications as t2','t1.id','=','t2.personnel_id')
                ->leftJoin('par_personnel_studyfield as t3', 't2.study_field_id','=','t3.id')
                ->leftJoin('par_personnel_qualifications as t4', 't2.qualification_id','=','t4.id')
                ->where(array('t1.id' => $personnel_id))
                 ->get();
                 
                 $res = array('success'=>true, 'data'=>$records);
                 // $records;
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
                        $resp = deleteRecordNoMisTransaction($table_name, $previous_data, $where_state,  $email_address);
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



public function onDeletePremisesDetails(Request $req){
    
    try{
        $record_id = $req->record_id;
        $manufacturing_site_id = $req->manufacturing_site_id;
        $table_name = $req->table_name;
        $title = $req->title;
        $email_address = $req->email_address;
        $data = array();
        //get the records 
        $resp = false;
        $where_state = array( 'id'=>$record_id);
        $records = DB::table($table_name)
                ->where($where_state)
                 ->get();
        if(count($records) >0){
                //delete functionality
                
                $previous_data = getPreviousRecords($table_name, $where_state,);
                         
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

public function onNewGmpApplicationSubmit(Request $req){
    try{
        $tracking_no = $req->tracking_no;
        $manufacturing_site_id = $req->manufacturing_site_id;
        $status_id = $req->status_id;
        $trader_id = $req->trader_id;
        $remarks = $req->remarks;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'wb_gmp_applications';
        $resp = false;
        $where_state = array('manufacturing_site_id' => $manufacturing_site_id, 'tracking_no'=>$tracking_no);
        $records = DB::table($table_name)
                    ->where($where_state)
                    ->first();
        if($records){
                //delete functionality
                $previous_status_id = $records->application_status_id;
                $current_status_id = 2;
                
                $premise_data = array('application_status_id'=>$current_status_id,
                                    'altered_by'=>$traderemail_address,
                                    'dola'=>Carbon::now(),
                                    'submission_date'=>Carbon::now(),
                                );
                $submission_data = array('tracking_no'=>$tracking_no,
                                        'trader_id'=>$trader_id,
                                        'remarks'=>$remarks,
                                        'previous_status_id'=>$previous_status_id,
                                        'current_status_id'=>$current_status_id,
                                        'submission_date'=>Carbon::now(),
                                        'created_by'=>$traderemail_address,
                                        'created_on'=>Carbon::now(),
                                    );
                
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data, $where_state, $premise_data, $traderemail_address,'mysql');
                
                $resp = insertRecord('wb_application_submissions', $submission_data, $traderemail_address,'mysql');
                                 
        }
        if($resp){
            $res = array('success'=>true, 'message'=>'GMP Application has been submitted Successfully for processing.');

        }   
        else{
            $res = array('success'=>false, 'message'=>' Application Submission failed, contact the system admin if this persists');
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
public function onNewPremisesApplicationArchive(Request $req){
    try{
        $tracking_no = $req->tracking_no;
        $manufacturing_site_id = $req->manufacturing_site_id;
        $status_id = $req->status_id;
        $trader_id = $req->trader_id;
        $remarks = $req->remarks;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'wb_premises_applications';
        $resp = false;
        $where_state = array('manufacturing_site_id' => $manufacturing_site_id, 'tracking_no'=>$tracking_no);
        $records = DB::table($table_name)
                    ->where($where_state)
                    ->first();
        if($records){
                //delete functionality
                $previous_status_id = $records->application_status_id;
                $current_status_id = 12;
                $premise_data = array('application_status_id'=>$current_status_id,
                                    'altered_by'=>$traderemail_address,
                                    'dola'=>Carbon::now(),
                                    'submission_date'=>Carbon::now(),
                                );
                $submission_data = array('tracking_no'=>$tracking_no,
                                        'application_code'=>$records->application_code,
                                        'trader_id'=>$trader_id,
                                        'remarks'=>$remarks,
                                        'previous_status_id'=>$previous_status_id,
                                        'current_status_id'=>$current_status_id,
                                        'submission_date'=>Carbon::now(),
                                        'created_by'=>$traderemail_address,
                                        'created_on'=>Carbon::now(),
                                    );
                
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data, $where_state, $premise_data, $traderemail_address,'mysql');
                
                $resp = insertRecord('wb_application_submissions', $submission_data, $traderemail_address,'mysql');
                                 
        }
        if($resp){
            $res = array('success'=>true, 'message'=>'Premises Application has been archived successfully.');

        }   
        else{
            $res = array('success'=>false, 'message'=>' Application Submission failed, contact the system admin if this persists');
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


public function getPremisesDocploads(Request $req){
   
            //get the uploaded documents 
            try{
                $manufacturing_site_id = $req->manufacturing_site_id;
                $reference_no = $req->reference_no;
                $section_id = $req->section_id;
                $sub_module_id = $req->sub_module_id;
            
                $document_type_id = $req->document_type_id;
                $doc_data = array();
                
                //get the requirements 
                        $doc_req = DB::connection('mis_db')->table('tra_documentupload_requirements as t1')
                            ->leftJoin('par_document_types as t2','t1.document_type_id','=','t2.id')
                            ->leftJoin('sub_modules as t4','t1.sub_module_id','=','t4.id')
                            ->leftJoin('modules as t3','t4.module_id','=','t3.id')
                            ->leftJoin('par_sections as t5','t1.section_id','=','t5.id')
                            ->select('t1.*','t2.name as document_type')
                            ->where(array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id))
                            ->get();
                            foreach ($doc_req as $rec) {
                                    //load the uploaded documents 
                                    $document_requirement_id = $rec->id;
                                    $document_type_id = $rec->document_type_id;
                                    $document_type = $rec->document_type;
                                    $document_requirement = $rec->name;
                                   // wb_uploaded_documents
                                   $document_records = DB::table('wb_uploaded_documents')
                                            ->where(array('reference_no'=>$reference_no, 'document_requirement_id'=>$document_requirement_id))
                                            ->get();
                                    if(count($document_records) >0) {

                                        foreach ($document_records as $doc_rec) {
                                             $doc_data[] = array('document_type'=>$document_type,
                                                              'document_requirement'=>$document_requirement,
                                                              'document_requirement_id'=>$document_requirement_id,
                                                              'uploaded_on'=>$doc_rec->uploaded_on,
                                                              'uploaded_by'=>$doc_rec->uploaded_by,
                                                              'initial_file_name'=>$doc_rec->initial_file_name,
                                                              'file_type'=>$doc_rec->file_type,
                                                              'dms_node_id'=>$doc_rec->dms_node_id,
                                                              'version_no'=>$doc_rec->version_no,
                                            );
            
                                        }
            
                                    }
                                    else{
                                        $doc_data[] = array('document_type'=>$document_type,
                                                            'document_requirement'=>$document_requirement,
                                                            'document_requirement_id'=>$document_requirement_id,
                                                            'uploaded_on'=>'',
                                                            'uploaded_by'=>'',
                                                            'initial_file_name'=>'',
                                                            'file_type'=>'',
                                                            'dms_node_id'=>'',
                                                            'version_no'=>'',
                                                 );
                                    }
            
                            }
               
                $res = array('success'=>true, 'data'=>$doc_data);
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
public function getTradersRegisteredPremises(Request $req){
    try{
        $trader_id = $req->mistrader_id;
        $section_id = $req->section_id;
       // echo $trader_id;
        $data = DB::connection('mis_db')->table('tra_premises as t1')
                ->join('tra_premises_applications as t5','t5.premise_id','=','t1.id')
                ->join('registered_premises as t4','t1.id','=','t4.tra_premise_id')
                ->join('tra_approval_recommendations as t2', 't1.permit_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't5.applicant_id', '=', 't3.id')
                ->select('t1.id as ltr_id','t1.name as manufacturing_site_name','t1.name as premises_name', 't1.*', 't2.permit_no', 't3.name as applicant_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no',
                    't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website')
                ->whereIn('t1.status_id', array(2, 4))
                ->where(array('t5.applicant_id'=>$trader_id,'t1.section_id'=>$section_id))
                ->get();

        $res = array('success'=>true, 'data'=>$data);

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


public function getTradersRegisteredGMPApplications(Request $req) {
    try {
        $take = $req->has('take') ? (int)$req->take : 100;
        $skip = $req->has('skip') ? (int)$req->skip : 0;

        $search_value = $req->searchValue;
        $search_value = $req->searchValue;
        $trader_id = $req->mistrader_id;
        $section_id = $req->section_id;
        $validity_status = $req->validity_status;
        $registration_status = $req->registration_status;
        $gmp_type_id = $req->gmp_type_id;

        $query = DB::connection('mis_db')->table('tra_manufacturing_sites as t1')
            ->leftJoin('registered_manufacturing_sites as t4', 't1.id', '=', 't4.tra_site_id')
            ->join('tra_gmp_applications as t19', 't1.id', '=', 't19.manufacturing_site_id')
            ->leftJoin('tra_approval_recommendations as t2', 't1.permit_id', '=', 't2.id')
            ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->leftJoin('par_countries as t5', 't1.country_id', '=', 't5.id')
            ->leftJoin('par_regions as t6', 't1.country_id', '=', 't6.id')
            ->leftJoin('wb_trader_account as t7', 't1.ltr_id', '=', 't7.id')
            ->leftJoin('tra_premises as t9', 't1.ltr_id', '=', 't9.id')
            ->leftJoin('tra_gmp_inspection_dates as t20', 't1.id', '=', 't20.manufacturing_site_id')
            ->leftJoin('par_validity_statuses as t8', 't4.validity_status', '=', 't8.id')
            ->leftJoin('par_registration_statuses as t15', 't4.registration_status', '=', 't15.id')
            ->leftJoin('par_man_sites as t16', 't1.man_site_id', '=', 't16.id')
            ->leftJoin('tra_manufacturers_information as t17', 't16.manufacturer_id', '=', 't17.id')
            ->leftJoin('tra_gmp_applications as t18', 't1.id', '=', 't18.manufacturing_site_id')
            ->select('t8.name as validity_status', 't1.email', 't1.email as email_address', 't15.name as registration_status', 't1.name as manufacturing_site_name', 't1.ltr_id as premise_id', 't18.gmp_type_id', 't7.name as local_agent_name', 't20.start_date', 't9.name as premise_name', 't5.name as country', 't6.name as region', 't1.*', 't2.permit_no', 't3.name as applicant_name', 't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address', 't1.applicant_as_ltr as trader_aslocal_agent', 't3.telephone_no as app_telephone', 't1.name as manufacturer_name', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't1.id as initial_site_id', 't4.id as registered_id');

        // Apply filters
        if (validateIsNumeric($validity_status)) {
            $query->where('t4.validity_status', $validity_status);
        }
        if (validateIsNumeric($registration_status)) {
            $query->where('t4.registration_status', $registration_status);
        }
        if (validateIsNumeric($trader_id)) {
            //$query->where('t1.applicant_id', $trader_id);
        }
        if (validateIsNumeric($gmp_type_id)) {
            //$query->where('t18.gmp_type_id', $gmp_type_id);
        }

        // Apply search filter
        if ($search_value != '' && $search_value != 'undefined') {
            $search_value = explode(',', $search_value);
            if (isset($search_value[2])) {
                $search_value = $search_value[2];
                $whereClauses = array();
                $whereClauses[] = "t1.manufacturing_site_name like '%" . ($search_value) . "%'";
                $whereClauses[] = "t2.permit_no like '%" . ($search_value) . "%'";
                $whereClauses[] = "t3.physical_address like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
                $query->whereRAW($filter_string);
            }
        }

        // Get total count before pagination
        $totalCount = $query->count();
        // Apply pagination and get data

         if(validateIsNumeric($take)){
            $data = $query->groupBy('t1.id')->skip($skip)->take($take)->get();
         }
         else{
            $data = $query->get();

        }

        $res = array('success' => true, 'totalCount' => $totalCount, 'data' => $data);
    } catch (\Exception $e) {
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


public function getGMPApplicationCounterDetails(Request $req) {
    try {
        $trader_id = $req->trader_id;
        $sub_module_id = $req->sub_module_id;
        $gmp_type_id = $req->gmp_type_id;

        $data = [];
        
        $table_name = 'wb_gmp_applications as t1';
        $where_state = ['trader_id' => $trader_id];
        
        $records = DB::table($table_name)
            ->select(DB::raw("count(application_status_id) as application_counter, t2.name as status_name, t2.id    as status_id"))
            ->join('wb_statuses as t2', 't1.application_status_id', '=', 't2.id')
            ->where('t1.sub_module_id',$sub_module_id)
            ->where(function ($q) use ($trader_id) {
                $q->where('applicant_id', $trader_id)
                    ->orWhere('application_initiator_id', $trader_id);
            })
            ->groupBy('t2.id');
        if(validateIsNumeric($gmp_type_id)){
            $records =  $records->where('t1.gmp_type_id', $gmp_type_id);

        }
        $records = $records->get();

        if (count($records) > 0) {
            $res = ['success' => true, 'data' => $records];
        } else {
            $res = ['success' => true, 'data' => $data];
        }
    } catch (\Throwable $throwable) {
        // Log the error for debugging
        \Log::error($throwable);

        $res = [
            'success' => false,
            'message' => $throwable->getMessage()
        ];
    }

    return response()->json($res);
}

public function getManufacturingSiteRegisteredProductsData(Request $req){
        
    try {
        $mistrader_id = $req->mistrader_id;
        $section_id = $req->section_id;
        $validity_status = $req->validity_status;
        $registration_status = $req->registration_status;
        $man_site_id = $req->man_site_id;
        
        $take = $req->take;
         $skip = $req->skip;
         $searchValue = $req->searchValue;
         $search_value =  '';
         if($req->searchValue != 'undefined'){
             $searchValue = explode(',',$searchValue);
             $search_value =  $searchValue[2];
         }
        
        $qry = DB::connection('mis_db')->table('tra_product_applications as t1')
        ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
        ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
        ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
        ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
        ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
        ->leftJoin('tra_approval_recommendations as t11', 't1.permit_id', '=', 't11.id')
        ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
        ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
        ->join('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
        ->join('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
        ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
        ->leftJoin('par_dosage_forms as t17', 't7.dosage_form_id', '=', 't17.id')
        ->leftJoin('par_product_types as t18', 't1.product_type_id', '=', 't18.id')
        ->leftJoin('tra_product_manufacturers as t14', function ($join) {
            $join->on('t7.id', '=', 't14.product_id')
                ->on('t14.manufacturer_role_id', '=', DB::raw(1))
                ->on('t14.manufacturer_type_id', '=', DB::raw(1));
        })
        ->leftJoin('par_man_sites as t19', 't14.man_site_id', '=', 't19.id')
        ->select('t7.*','t1.*', 't16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id',  't3.name as applicant_name','t3.physical_address', 't17.name as dosage_form', 't19.name as manufacturing_site',  't9.name as local_agent', 't12.id as reg_product_id','t1.product_id as tra_product_id','t7.id as product_id',
            't13.name as storage_condition','t7.brand_name', 't7.id as product_id', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
            't7.brand_name as sample_name','t14.manufacturer_id');//, 't7.section_id'=>$section_id
        
     if (isset($section_id) && is_numeric($section_id)) {
         $qry->where('t1.section_id', $section_id);
     }
     if (validateIsNumeric($validity_status)) {
         $qry->where('t12.validity_status_id', $validity_status);
     }
     if (validateIsNumeric($registration_status)) {
         $qry->where('t12.registration_status_id', $registration_status);
     }
     if (validateIsNumeric($mistrader_id)) {
         $qry->where('t12.applicant_id', $mistrader_id);
     }
     if (validateIsNumeric($man_site_id)) {
     //   $qry->where('t14.man_site_id', $man_site_id);
    }
     
     
     if($search_value != ''){
         $whereClauses = array();
         $whereClauses[] = "t8.name like '%" . ($search_value) . "%'";
         
         $whereClauses[] = "t7.brand_name  like '%" . ($search_value) . "%'";
         $whereClauses[] = "t11.certificate_no  like '%" . ($search_value) . "%'";
         $filter_string = implode(' OR ', $whereClauses);
         $qry->whereRAW($filter_string);
     }
 
     $totalCount = $qry->count();
     if(validateIsNumeric($take)){
         $records = $qry->skip($skip)->take($take)->get();
     }
     else{
 
         $records = $qry->get();
     }
     
         $res = array('success' => true,
             'data' => $records,'totalCount'=>$totalCount 
         );
     } catch (\Exception $e) {
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



public function getgmpproductDetailsInformationData(Request $req){
        try{
            $mis_db = DB::connection('mis_db')->getDatabaseName();                    
            $manufacturing_site_id = $req->manufacturing_site_id;
            $data = array();
            //get the records 
                $gmpproductDescriptionData = getParameterItems('gmp_product_descriptions','','mis_db');
               // $gmpProductLineData = getParameterItems('gmp_product_lines','','mis_db');
            $records = DB::table('wb_product_gmpinspectiondetails as t1')
                    ->select('t1.*','t3.name as product_line_name','t4.name as products_line_name', 't2.prodline_description')
                    ->join($mis_db.'.gmp_productline_details as t2','t2.id' ,'=', 't1.gmp_productline_id')
                     ->join($mis_db.'.gmp_product_lines as t3','t2.product_line_id' ,'=', 't3.id')
                     ->leftjoin($mis_db.'.par_medical_device_family as t4','t2.group_family_id' ,'=', 't4.id')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                    ->get();
                if(count($records)>0 && validateisNumeric($manufacturing_site_id)){
                    foreach ($records as $rec) {
                        //get the array 
                        $reg_site_id = $rec->reg_site_id;
                        $prodline_description = $rec->prodline_description;
                        //$product_line_id = $rec->product_line_id;
                        $group_family_id = $rec->group_family_id;
                        $reg_product_id = $rec->reg_product_id;
                        $product_id = $rec->product_id;
                        $records = DB::connection('mis_db')->table('tra_product_applications as t1')
                                    ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                                    ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                                    ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                                    ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
                                    ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                                    ->leftJoin('tra_approval_recommendations as t11', 't1.permit_id', '=', 't11.id')
                                    ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                                    ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                                    ->join('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
                                    ->join('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
                                    ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
                                    ->leftJoin('par_dosage_forms as t17', 't7.dosage_form_id', '=', 't17.id')
                                    ->leftJoin('par_product_types as t18', 't1.product_type_id', '=', 't18.id')
                                    ->select('t7.*','t1.*', 't16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id',  't3.name as applicant_name','t3.physical_address', 't17.name as dosage_form',   't9.name as local_agent', 't12.id as reg_product_id','t1.product_id as tra_product_id','t7.id as product_id',
                                        't13.name as storage_condition','t7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
                                        't7.brand_name as sample_name') 
                                       // ->where(array('t12.id'=>$reg_product_id, 't1.product_id'=>$product_id))
                                        ->first();//, 't7.section_id'=>$section_id
                        $prodline_description = returnParamFromArray($gmpproductDescriptionData,$rec->prodline_description);
                                if($records){
                                    $data[] = array('id'=>$rec->id,
                                    'product_id'=>$records->product_id,
                                     'reg_site_id'=>$reg_site_id,
                                     'reference_no'=>$records->reference_no,
                                     'brand_name'=>$records->brand_name,
                                    'applicant_name'=>$records->applicant_name,
                                     'classification_name'=>$records->classification_name,
                                     'common_name'=>$records->common_name,
                                     'prodline_description'=>$prodline_description,
                                     'product_line_name'=>$rec->product_line_name,
                                    'products_line_name'=>$rec->products_line_name,

                                    // 'product_linedetails'=>$product_linedetails
                                  );

                                }
                                   
                     }

                }
                     
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
    public function getgmpSurgicalproductDetailsInformationData(Request $req){
        try{
            $mis_db = DB::connection('mis_db')->getDatabaseName();                    
            $manufacturing_site_id = $req->manufacturing_site_id;
            $data = array();
            //get the records 
                $gmpproductDescriptionData = getParameterItems('gmp_product_descriptions','','mis_db');
               // $gmpProductLineData = getParameterItems('gmp_product_lines','','mis_db');
            $records = DB::table('wb_product_gmpinspectiondetails as t1')
                    ->select('t1.*','t3.name as product_line_name','t10.name as classification_name','t2.prodline_description')
                    ->join($mis_db.'.gmp_productline_details as t2','t2.id' ,'=', 't1.group_family_id')
                    ->leftjoin($mis_db.'.par_medical_device_family as t3','t2.group_family_id' ,'=', 't3.id')
                     ->leftJoin($mis_db.'.par_medicaldevices_classification as t10', 't1.classification_id', '=', 't10.id')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                    ->get();
                if(count($records)>0 && validateisNumeric($manufacturing_site_id)){
                    foreach ($records as $rec) {
                        //get the array 
                        $reg_site_id = $rec->reg_site_id;
                        $prodline_description = $rec->prodline_description;
                        $group_family_id = $rec->group_family_id;
                        $reg_product_id = $rec->reg_product_id;
                        $product_id = $rec->product_id;
                        $records = DB::connection('mis_db')->table('tra_product_applications as t1')
                                    ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                                    ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                                    ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                                    ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
                                    ->leftJoin('par_medicaldevices_classification as t10', 't7.classification_id', '=', 't10.id')
                                    ->leftJoin('tra_approval_recommendations as t11', 't1.permit_id', '=', 't11.id')
                                    ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                                    ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                                    ->join('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
                                    ->join('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
                                    ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
                                    ->leftJoin('par_dosage_forms as t17', 't7.dosage_form_id', '=', 't17.id')
                                    ->leftJoin('par_product_types as t18', 't1.product_type_id', '=', 't18.id')
                                    ->select('t7.*','t1.*', 't16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id',  't3.name as applicant_name','t3.physical_address', 't17.name as dosage_form',   't9.name as local_agent', 't12.id as reg_product_id','t1.product_id as tra_product_id','t7.id as product_id',
                                        't13.name as storage_condition','t7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
                                        't7.brand_name as sample_name') 
                                        ->where(array('t12.id'=>$reg_product_id, 't1.product_id'=>$product_id))
                                        ->first();//, 't7.section_id'=>$section_id
                        $prodline_description = returnParamFromArray($gmpproductDescriptionData,$rec->prodline_description);
                               // if($records){
                                    $data[] = array('id'=>$rec->id,
                                    //'product_id'=>$records->product_id,
                                     'reg_site_id'=>$reg_site_id,
                                     //'reference_no'=>$records->reference_no,
                                    // 'brand_name'=>$records->brand_name,
                                   // 'applicant_name'=>$records->applicant_name,
                                     'classification_name'=>$rec->classification_name,
                                    // 'common_name'=>$records->common_name,
                                     'prodline_description'=>$prodline_description,
                                     'products_line_name'=>$rec->product_line_name,

                                    // 'product_linedetails'=>$product_linedetails
                                  );

                                //}
                                   
                     }

                }
                     
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
}
