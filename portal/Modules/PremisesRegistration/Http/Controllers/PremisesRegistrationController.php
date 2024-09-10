<?php

namespace Modules\PremisesRegistration\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
 
class PremisesRegistrationController extends Controller
{
    public function __construct(){
        if (!Auth::guard('api')->check()) {
                $res = array(
                    'success' => false,
                    'message' => 'Invalid Token or failed authentication, login to proceed!!'
                );
                echo json_encode($res);
                exit();
        }
         
    }
    public function onSavePremisesApplication(Request $req)
    {
        try {
            $premise_id = $req->premise_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $premise_ref_no = '';

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            $district_id = $req->district_id;
            $region_id =$req->region_id;
            $application_code = $req->application_code;
            $business_type_id = $req->business_type_id;

            $product_classification_id = $req->product_classification_id;
            
            $contact_person_id = $req->contact_person_id;
            $contact_person_startdate = $req->contact_person_startdate;
            $contact_person_enddate = $req->contact_person_enddate;
            $applicant_contact_person = $req->applicant_contact_person;
            $business_category_id = $req->business_category_id;

            $had_offence = $req->had_offence;
            $had_cancelled_application = $req->had_cancelled_application;
            $is_workinotherinstitutions = $req->is_workinotherinstitutions;

            $premise_type_id = $req->premise_type_id;
            $vehicle_reg_no = $req->vehicle_reg_no;

            $paying_currency_id = $req->paying_currency_id;
            $is_fast_track = $req->is_fast_track;
          
            $premises_infor = array('name'=>$req->premises_name,
                                    'country_id'=>$req->country_id,
                                    'section_id'=> $req->sectionId,
                                    'premise_type_id'=>$premise_type_id,
                                    'had_offence'=>$req->had_offence,
                                    'offence'=>$req->offence,
                                    'product_classification_id'=>$req->product_classification_id,
                                    'had_cancelled_application'=>$req->had_cancelled_application,
                                    'cancelling_reason'=>$req->cancelling_reason,
                                    'is_workinotherinstitutions'=>$req->is_workinotherinstitutions,
                                    'working_inotherinstitutions'=>$req->working_inotherinstitutions,
                                    'vehicle_reg_no'=>$vehicle_reg_no,
                                    'applicant_type_id'=>$req->applicant_type_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,
                                    'investment_capital'=>$req->investment_capital,
                                    'investment_capital_currency_id'=>$req->investment_capital_currency_id,
                                    'nin_no'=>$req->nin_no,
                                    'parish_id'=>$req->parish_id,
                                    'incharge_id'=>$req->incharge_id,
                                    'has_incharge'=>$req->has_incharge,
                                    'applicant_reg_no'=>$req->applicant_reg_no,
                                    'applicant_reg_date'=>$req->applicant_reg_date,
                                    'applicant_incharge_telephone'=>$req->applicant_incharge_telephone,
                                    'applicant_incharge_email'=>$req->applicant_incharge_email,
                                    'incharge_physical_address'=>$req->incharge_physical_address,
                                    'county_id'=>$req->county_id,
                                    'sub_county_id'=>$req->sub_county_id,
                                    'street'=>$req->street,
                                    'managing_director_email'=>$req->managing_director_email,
                                    'managing_director_telepone'=>$req->managing_director_telepone,
                                    'managing_director'=>$req->managing_director,
                                    'superv_email'=>$req->superv_email,
                                    'other_classification'=>$req->other_classification,
                                    'super_telephone'=>$req->super_telephone,
                                    'super_physical_address'=>$req->super_physical_address,
                                    'postal_address'=>$req->postal_address,
                                    'code_no'=>$req->code_no,
                                    'mobile_no'=>$req->mobile_no,
                                    'business_type_id'=>$business_type_id,
                                    'physical_address'=>$req->physical_address,
                                    'longitude'=>$req->longitude,
                                    'latitude'=>$req->latitude,
                                    'business_scale_id'=>$req->business_scale_id,
                                    'business_category_id'=>$req->business_category_id,
                                    'village'=>$req->village,
                                    'contact_person'=>$req->contact_person,
                                    'contact_person_email'=>$req->contact_person_email,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'contact_person_telephone'=>$req->contact_person_telephone,
                                    'tpin_no'=>$req->tpin_no,
                                    'company_registration_no'=>$req->company_registration_no,
                                    'psu_no'=>$req->psu_no,
                                    'pharmacist_id'=>$req->pharmacist_id,
                                    'qualification_id'=>$req->qualification_id,
                                    'reg_date'=>$req->reg_date,
                                    'registration_date'=>$req->registration_date,
                                    'contact_person_id'=>$req->contact_person_id,
                                    'contact_person_startdate'=>$req->contact_person_startdate,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'applicant_contact_person'=>$req->applicant_contact_person
                                ); 


                        $table_name = 'wb_premises_applications';
                        /** Already Saved */
                        $sub_module_id = $req->sub_module_id;

                        if(validateIsNumeric($premise_id) && $tracking_no != ''){
                               
                                $where = array('id'=>$premise_id);
                                $where_app = array('premise_id'=>$premise_id);

                                if (recordExists('wb_premises', $where)) {
                                    
                                    $premises_infor['dola'] = Carbon::now();
                                    $premises_infor['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_premises', $where);
                                    updateRecord('wb_premises', $previous_data, $where, $premises_infor, $trader_email);

                                    $region_id = $previous_data['results'][0]['region_id']; // Access 

                                        $app_data = array(
                                            'trader_id' => $trader_id,
                                            'zone_id' => $req->zone_id,
                                            'region_id' => $region_id, 
                                            'altered_by' => $trader_email,
                                            'is_fast_track' => $is_fast_track,
                                            'paying_currency_id' => $paying_currency_id,
                                            'dola' => Carbon::now()
                                        );
                                    $previous_data = getPreviousRecords('wb_premises_applications', $where_app);
                                   
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                     $resp =   updateRecord('wb_premises_applications', $previous_data, $where_app, $app_data, $trader_email);
                                
                            }
                        }
                        else{


                                $premises_infor['created_on'] = Carbon::now();
                                $premises_infor['created_by'] = $trader_email;

                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('section_id' => $req->section_id,'module_id' => $module_id,'sub_module_id' => $req->sub_module_id,), 'id','mis_db');
                                
                                $resp = insertRecord('wb_premises', $premises_infor, $trader_email);
                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                                $business_code = getSingleRecordColValue('par_business_types', array('id' => $business_type_id), 'code');
                                $district_code = getSingleRecordColValue('par_premise_districts', array('id' => $district_id), 'code');

                                $region_code = getSingleRecordColValue('par_premise_regions', array('id' => $region_id), 'code');


                                 $product_category_code = getSingleRecordColValue('par_premise_class', array('id' => $product_classification_id), 'code');


                                 $codes_array = array(
                                        'sub_module_code' => $sub_module_code,
                                        'business_type_code' => $business_code,
                                        'product_category_code' => $product_category_code,
                                        'district_code' => $district_code,
                                        'region_code' => $region_code
                                  );

                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);


                                   //$tracking_no= generatePremisesReferenceNo($business_type_id,$req->sub_module_id); Static
                                    

                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }


                                    $premise_ref_no=generateApplicationRefNumber(6, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);

                                    if( $premise_ref_no == ''){
                                         return \response()->json(array('success'=>false, 'message'=>'Reference No Format(Business Central) has not been set, contact the system administrator'));
                                    }

                                     $application_code = generateApplicationCode($sub_module_id, 'wb_premises_applications');

                                    $premise_id = $resp['record_id'];

                                    $rec = DB::table('wb_premises')
                                                ->where('id',$premise_id)
                                                ->first();

                                    $app_data = array('trader_id'=>$trader_id,
                                                    'sub_module_id'=>$req->sub_module_id,
                                                    'premise_ref_no'=>$premise_ref_no,
                                                    'region_id'=>$rec->region_id,
                                                    'module_id'=>$module_id,
                                                    'premise_id'=>$premise_id,
                                                    'zone_id'=>$req->zone_id,
                                                    'tracking_no'=>$tracking_no,
                                                    'application_code'=>$application_code,
                                                    'is_fast_track'=>$is_fast_track,
                                                    'paying_currency_id'=>$paying_currency_id,
                                                    'date_added'=>Carbon::now(),
                                                    'application_status_id'=>1,
                                                    'created_by'=>$trader_email,
                                                    'created_on'=>Carbon::now()
                                            );

                                        $resp = insertRecord('wb_premises_applications', $app_data, $trader_email);
                                            $record_id = $resp['record_id'];

                                             if($resp['success']){

                                                $res = array('tracking_no'=>$tracking_no,
                                                             'premise_ref_no'=>$premise_ref_no,
                                                             'premise_id'=>$premise_id,
                                                             'success'=>true,
                                                             'message'=>'Premises Application Saved Successfully, with Tracking No: '.$tracking_no);
                                                             
                                                    //create all the details
                                                  // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                                   saveApplicationSubmissionDetails($application_code,$table_name);  
                                             }
                                            
                                            
                                           
                            
                                    //update the application code_no
                        }
                        if($resp){

                          // $telephone = $req->telephone;
                          // DB::table('wb_telephone_details')->where(array('premise_id'=>$premise_id))->delete();
                          // $telephoneData = array();
                          // if(is_array($telephone)){
                          //     foreach($telephone as $phone){
                                                          
                          //              $telephoneData[]= array(
                          //                           'telephone'=>$phone['telephone'], 
                          //                            'premise_id'=>$premise_id, 
                          //                             'created_by'=>$trader_id, 
                          //                             'created_on'=>Carbon::now());

                          //      }
                          //     DB::table('wb_telephone_details')->insert($telephoneData);

                          //   }

                            $res = array('tracking_no'=>$tracking_no,
                                         'premise_ref_no'=>$premise_ref_no,
                                         'premise_id'=>$premise_id,
                                         'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Premises Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
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
    function checkPendingPremisesRenewal(Request $req){
            //check on the portal 
            $premise_target_id = $req->premise_target_id;
            $res = '';
            $rec = DB::table('wb_premises_applications as t1')
                        ->join('wb_premises as t2', 't1.premise_id','=','t2.id')
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
                    ->join('tra_premises as t2', 't1.premise_id','=','t2.id')
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

    public function onSaveProductNotificationApplication(Request $req)
    {
        try {
                $application_id = $req->application_id;
                $trader_id = $req->trader_id;
                $email = $req->email;
                $trader_email = $req->trader_email;
                $module_id = $req->module_id;
                $tracking_no = $req->tracking_no;
                $zone_id = $req->zone_id;
                $sub_module_id = $req->sub_module_id;

                $application_code = $req->application_code;

                $premises_infor = array(
                            'sourceofpsur_id'=>$req->sourceofpsur_id,
                            'psur_type_id'=>$req->psur_type_id,
                            'from_date'=> $req->from_date,
                            'to_date'=>$req->to_date,
                            'international_birth_date'=>$req->international_birth_date,
                            'module_id'=>$req->module_id,
                            'trader_id'=>$req->trader_id,
                            'sub_module_id'=>$req->sub_module_id,

                        ); 

                $table_name = 'wb_psur_pbrer_applications';
                $sub_module_id = $req->sub_module_id;

                    /** Already Saved */
                 if(validateIsNumeric($application_id)){
                             
                    $where_app = array('id'=>$application_id);

                    if (recordExists('wb_psur_pbrer_applications', $where_app)) {
                                    
                        $premises_infor['altered_by'] = $trader_email;
                        $premises_infor['dola'] = Carbon::now();
                                   
                        $previous_data = getPreviousRecords('wb_psur_pbrer_applications', $where_app);
                        $application_code = $previous_data['results'][0]['application_code'];

                        $tracking_no = $previous_data['results'][0]['tracking_no'];
                        $resp =   updateRecord('wb_psur_pbrer_applications', $previous_data, $where_app, $premises_infor, $trader_email);  
                                   
                        $where_app = array('application_code'=>$application_code);
                        if (!recordExists('tra_application_uploadeddocuments', $where_app,'mis_db')) {
                             //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
                        }
                     }

                }else{
                    $record = '';

                    $premises_infor['created_on'] = Carbon::now();
                    $premises_infor['created_by'] = $trader_email;
                    $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('section_id' => $req->section_id,'module_id' => $module_id,'sub_module_id' => $req->sub_module_id,), 'id','mis_db');
                    $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                   // dd($ref_id);
                    $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');                                

                    $codes_array = array(
                                'sub_module_code' => $sub_module_code,
                            );

                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);                                    

                    if (!validateIsNumeric($ref_id )) {
                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                    }else if( $tracking_no == ''){
                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                    }
                    $premise_ref_no=generateApplicationRefNumber(6, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);

                    if( $premise_ref_no == ''){
                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format(Business Central) has not been set, contact the system administrator'));
                    }

                    $application_code = generateApplicationCode($sub_module_id, 'wb_psur_pbrer_applications');
                    $premises_infor['tracking_no'] =   $tracking_no;
                    $premises_infor['application_status_id'] =   1;
                    $premises_infor['application_code'] =   $application_code;
                    $premises_infor['date_added'] =  Carbon::now();
                    $resp = insertRecord('wb_psur_pbrer_applications', $premises_infor, $trader_email);

                    $record_id = $resp['record_id'];
                    $application_id = $record_id;
                    if($resp['success']){
                        //create all the details
                                                  
                        // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,1000), $trader_id);
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
                            'message'=>' Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                }else{
                    $res = array(
                        'success'=>false,
                        'message'=>'Error Occurred Application not saved, it this persists contact the system Administrator');
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


    public function onSaveRenPremisesApplication(Request $req){
        try {

       DB::beginTransaction();
            $premise_id = $req->premise_id;
            $tra_premise_id = $req->tra_premise_id;
            $registered_id = $req->registered_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;

            $tracking_no = $req->tracking_no;

            $business_type_id = $req->business_type_id;
            $product_classification_id = $req->product_classification_id;
            $is_fast_track = $req->is_fast_track;
            $paying_currency_id = $req->paying_currency_id;
            
            $zone_id = $req->zone_id;
            $region_id = $req->region_id;
            $contact_person_id = $req->contact_person_id;
            $contact_person_startdate = $req->contact_person_startdate;
            $contact_person_enddate = $req->contact_person_enddate;
            $applicant_contact_person = $req->applicant_contact_person;
            $reg_premise_id = $req->reg_premise_id;
            $applicant_contact_person = $req->applicant_contact_person;
            
            $premise_type_id = $req->premise_type_id;
            $vehicle_reg_no = $req->vehicle_reg_no;
            $module_id = getSingleRecordColValue('sub_modules', array('id' => $req->sub_module_id), 'module_id','mis_db');
            $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('section_id' => $req->section_id,'module_id' => $module_id,'sub_module_id' => $req->sub_module_id,), 'id','mis_db');
             
            $premises_infor = array('name'=>$req->premises_name,
                                    'country_id'=>$req->country_id,
                                    'section_id'=> $req->sectionId,
                                    'premise_type_id'=>$premise_type_id,
                                    'had_offence'=>$req->had_offence,
                                    'offence'=>$req->offence,
                                    'product_classification_id'=>$req->product_classification_id,
                                    'had_cancelled_application'=>$req->had_cancelled_application,
                                    'cancelling_reason'=>$req->cancelling_reason,
                                    'is_workinotherinstitutions'=>$req->is_workinotherinstitutions,
                                    'working_inotherinstitutions'=>$req->working_inotherinstitutions,
                                    'vehicle_reg_no'=>$vehicle_reg_no,
                                    'applicant_type_id'=>$req->applicant_type_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,
                                    'parish_id'=>$req->parish_id,
                                    'investment_capital'=>$req->investment_capital,
                                    'investment_capital_currency_id'=>$req->investment_capital_currency_id,
                                    'nin_no'=>$req->nin_no,
                                    'incharge_id'=>$req->incharge_id,
                                    'has_incharge'=>$req->has_incharge,
                                    'applicant_reg_no'=>$req->applicant_reg_no,
                                    'applicant_reg_date'=>$req->applicant_reg_date,
                                    'applicant_incharge_telephone'=>$req->applicant_incharge_telephone,
                                    'applicant_incharge_email'=>$req->applicant_incharge_email,
                                    'incharge_physical_address'=>$req->incharge_physical_address,
                                    'county_id'=>$req->county_id,
                                    'sub_county_id'=>$req->sub_county_id,
                                    'street'=>$req->street,
                                    'managing_director_email'=>$req->managing_director_email,
                                    'managing_director_telepone'=>$req->managing_director_telepone,
                                    'managing_director'=>$req->managing_director,
                                    'superv_email'=>$req->superv_email,
                                    'other_classification'=>$req->other_classification,
                                    'super_telephone'=>$req->super_telephone,
                                    'super_physical_address'=>$req->super_physical_address,
                                    'postal_address'=>$req->postal_address,
                                    'code_no'=>$req->code_no,
                                    'mobile_no'=>$req->mobile_no,
                                    'business_type_id'=>$business_type_id,
                                    'physical_address'=>$req->physical_address,
                                    'longitude'=>$req->longitude,
                                    'latitude'=>$req->latitude,
                                    'business_scale_id'=>$req->business_scale_id,
                                    'business_category_id'=>$req->business_category_id,
                                    'village'=>$req->village,
                                    'contact_person'=>$req->contact_person,
                                    'contact_person_email'=>$req->contact_person_email,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'contact_person_telephone'=>$req->contact_person_telephone,
                                    'tpin_no'=>$req->tpin_no,
                                    'company_registration_no'=>$req->company_registration_no,
                                    'psu_no'=>$req->psu_no,
                                    'pharmacist_id'=>$req->pharmacist_id,
                                    'qualification_id'=>$req->qualification_id,
                                    'reg_date'=>$req->reg_date,
                                    'registration_date'=>$req->registration_date,
                                    'contact_person_id'=>$req->contact_person_id,
                                    'contact_person_startdate'=>$req->contact_person_startdate,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'applicant_contact_person'=>$req->applicant_contact_person
                                ); 
                 
                        /** Already Saved */
                        //validate data to avert any duplicates 
                        $table_name = 'wb_premises_applications';
                        $sub_module_id = $req->sub_module_id;
                        if(validateIsNumeric($premise_id) && $tracking_no != ''){
                                //update the record 
                                //product information
                                //
                                $where = array('id'=>$premise_id);
                                $where_app = array('premise_id'=>$premise_id);

                                if (recordExists('wb_premises', $where)) {
                                    
                                    $premises_infor['dola'] = Carbon::now();
                                    $premises_infor['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_premises', $where);
                                    
                                    updateRecord('wb_premises', $previous_data, $where, $premises_infor, $trader_email);
                                     $region_id = $previous_data['results'][0]['region_id'];  

                                    $relocation_infor['dola'] = Carbon::now();
                                    $relocation_infor['altered_by'] = $trader_email;
                                    $previous_data = getPreviousRecords('wb_premises_relocation', $where_app);
                                    if($sub_module_id == 109 ){
                                     updateRecord('wb_premises_relocation', $previous_data, $where_app, $relocation_infor, $trader_email);    
                                       }
                                    $app_data = array('trader_id'=>$trader_id,
                                            'zone_id'=>$req->zone_id,
                                            'region_id'=>$region_id,
                                            'altered_by'=>$trader_email,
                                            'is_fast_track'=>$is_fast_track,
                                            'paying_currency_id'=>$paying_currency_id,
                                            'dola'=>Carbon::now()
                                    );
                                    $previous_data = getPreviousRecords('wb_premises_applications', $where_app);
                                   
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                          
                                     $resp=   updateRecord('wb_premises_applications', $previous_data, $where_app, $app_data, $trader_email);
                                    
                                }
                                else{
                                     $resp=  array('success'=>false,'message'=>'Error occurred');
                                }
                        }
                        else{
                           
                          $anyOngoingApps = checkForOngoingApplications($registered_id, 'tra_premises_applications', 'reg_premise_id', $process_id);

                           $anyOngoingPortalApps = checkForPortalOngoingApplications($registered_id, 'wb_premises_applications', 'registered_id', $process_id);
                                
                            if(!$anyOngoingApps['exists'] && !$anyOngoingPortalApps['exists']){
                                                 $premises_infor['created_on'] = Carbon::now();
                                $premises_infor['created_by'] = $trader_email;
                                    
                                $resp = insertRecord('wb_premises', $premises_infor, $trader_email);
                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code','mis_db');
                                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                                    $business_code = getSingleRecordColValue('par_business_types', array('id' => $business_type_id), 'code');
                                    $district_code = getSingleRecordColValue('par_premise_districts', array('id' => $district_id), 'code');

                                    $region_code = getSingleRecordColValue('par_premise_regions', array('id' => $region_id), 'code');


                                     $product_category_code = getSingleRecordColValue('par_premise_class', array('id' => $product_classification_id), 'code');


                                     $codes_array = array(
                                            'sub_module_code' => $sub_module_code,
                                            'business_type_code' => $business_code,
                                            'product_category_code' => $product_category_code,
                                            'district_code' => $district_code,
                                            'region_code' => $region_code
                                      );
                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }
                                $application_code = generateApplicationCode($sub_module_id, 'wb_premises_applications');

                                $premise_id = $resp['record_id'];
                                $rec = DB::table('wb_premises')
                                         ->where('id',$premise_id)
                                        ->first();

                                  $relocation_infor = array(
                                    'proposed_region_id'=>$req->proposed_region_id,
                                    'premise_id'=>$premise_id,
                                    'proposed_district_id'=>$req->proposed_district_id,
                                    'country_id'=>$req->country_id,
                                    'proposed_county_id'=>$req->proposed_county_id,
                                    'proposed_sub_county_id'=>$req->proposed_sub_county_id,
                                    'proposed_village'=>$req->proposed_village,
                                    'proposed_parish_id'=>$req->proposed_parish_id,
                                    'proposed_street'=>$req->proposed_street,
                                    'proposed_physical_address'=>$req->proposed_physical_address,
                                    'proposed_longitude'=>$req->proposed_longitude,
                                    'proposed_latitude'=>$req->proposed_latitude,
                                 ); 
                
                                $app_data = array('trader_id'=>$trader_id,
                                                'sub_module_id'=>$req->sub_module_id,
                                                'module_id'=>$req->module_id,
                                                'section_id'=>$section_id,
                                                'premise_id'=>$premise_id,
                                                'zone_id'=>$req->zone_id,
                                                'region_id'=>$rec->region_id,
                                                'tracking_no'=>$tracking_no,
                                                'application_code'=>$application_code,
                                                'reg_premise_id'=>$reg_premise_id,
                                                'date_added'=>Carbon::now(),
                                                'registered_id'=>$registered_id,

                                                'application_status_id'=>1,
                                                'created_by'=>$trader_email,
                                                'is_fast_track'=>$is_fast_track,
                                                'paying_currency_id'=>$paying_currency_id,
                                                'created_on'=>Carbon::now()
                                        );

                                 if($sub_module_id == 109 ){
                                  insertRecord('wb_premises_relocation', $relocation_infor, $trader_email);

                                }
                    
                                //get the other details 
                                
                                $init_locationDetails = DB::connection('mis_db')->table('tra_premises_storelocation as t1')
                                    ->select(
                                        't1.name',
                                        't1.distance',
                                        't1.street',
                                        't1.country_id',
                                        't1.county_id',
                                        't1.sub_county_id',
                                        't1.region_id',
                                        't1.physical_address',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t1.premise_id', $tra_premise_id)
                                    ->get();

                                 $init_staffDetails = DB::connection('mis_db')->table('tra_premises_personnel as t1')
                                    ->select(
                                        't1.personnel_name',
                                        't1.telephone_no',
                                        't1.email_address',
                                        't1.qualification_id',
                                        't1.position_id',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t1.premise_id', $tra_premise_id)
                                    ->get();
                                    $init_locationDetails = convertStdClassObjToArray($init_locationDetails);
                                    $init_staffDetails = convertStdClassObjToArray($init_staffDetails);                             
                                     $init_personnelDetails = DB::connection('mis_db')->table('tra_premises_proprietors as t2')
                                    ->select(
                                        't2.name',
                                        't2.telephone_no',
                                        't2.email_address',
                                        't2.qualification_id',
                                        't2.country_id',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t2.premise_id', $tra_premise_id)
                                    ->get();
                                    $init_personnelDetails = convertStdClassObjToArray($init_personnelDetails);
                                    DB::table('wb_premises_storelocation')
                                        ->insert($init_locationDetails);
                                    DB::table('wb_premises_personnel')
                                        ->insert($init_staffDetails);
                                    DB::table('wb_premises_proprietors')
                                        ->insert($init_personnelDetails);

                                        $resp = insertRecord('wb_premises_applications', $app_data, $trader_email);
                                       
                                        $record_id = $resp['record_id'];
                                        if($resp['success']){
                                            //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                            saveApplicationSubmissionDetails($application_code,$table_name);  
                                       }
                                       
    
                            }
                            else{
                              //  $res = $anyOngoingApps;
                                //dd('TEST');
                     $resp = array('success'=>false, 'message'=>"There is an application pending approval with reference no ".$anyOngoingApps['ref_no'].' Tracking No'.$anyOngoingPortalApps['ref_no'].", check on the premises application dashboard or contact system administrator for clasification.");
    
                            }
                            

                        }
                               
                        if($resp['success']){
                             DB::commit();
                            $res = array('tracking_no'=>$tracking_no,
                                         'premise_id'=>$premise_id,
                                         'application_code'=>$application_code,
                                         'success'=>true,
                                         'premise_target_id'=>$req->premise_target_id,
                                         'message'=>'Premises Application Saved Successfully, with Tracking No: '.$tracking_no);
    
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>$resp['message'],
                            'message1'=>'Error Occurred Premises Application not saved, it this persists contact the system Administrator');
                         }
        } catch (\Exception $exception) {
              DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
              DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   


    }
public function onSaveDrugShopApplication(Request $req){
        try {

       DB::beginTransaction();
            $premise_id = $req->premise_id;
            $tra_premise_id = $req->tra_premise_id;
            $registered_id = $req->registered_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;

            $tracking_no = $req->tracking_no;

            $business_type_id = $req->business_type_id;
            $product_classification_id = $req->product_classification_id;
            $is_fast_track = $req->is_fast_track;
            $paying_currency_id = $req->paying_currency_id;
            
            $zone_id = $req->zone_id;
            $region_id =$req->region_id;
            $contact_person_id = $req->contact_person_id;
            $contact_person_startdate = $req->contact_person_startdate;
            $contact_person_enddate = $req->contact_person_enddate;
            $applicant_contact_person = $req->applicant_contact_person;
            $reg_premise_id = $req->reg_premise_id;
            $applicant_contact_person = $req->applicant_contact_person;
            
            $premise_type_id = $req->premise_type_id;
            $vehicle_reg_no = $req->vehicle_reg_no;
            $module_id = getSingleRecordColValue('sub_modules', array('id' => $req->sub_module_id), 'module_id','mis_db');
            $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('section_id' => $req->section_id,'module_id' => $module_id,'sub_module_id' => $req->sub_module_id,), 'id','mis_db');
             
            $premises_infor = array('name'=>$req->premises_name,
                                    'country_id'=>$req->country_id,
                                    'section_id'=> $req->sectionId,
                                    'premise_type_id'=>$premise_type_id,
                                    'had_offence'=>$req->had_offence,
                                    'offence'=>$req->offence,
                                    'product_classification_id'=>$req->product_classification_id,
                                    'had_cancelled_application'=>$req->had_cancelled_application,
                                    'cancelling_reason'=>$req->cancelling_reason,
                                    'is_workinotherinstitutions'=>$req->is_workinotherinstitutions,
                                    'working_inotherinstitutions'=>$req->working_inotherinstitutions,
                                    'vehicle_reg_no'=>$vehicle_reg_no,
                                    'applicant_type_id'=>$req->applicant_type_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,
                                    'parish_id'=>$req->parish_id,
                                    'investment_capital'=>$req->investment_capital,
                                    'investment_capital_currency_id'=>$req->investment_capital_currency_id,
                                    'nin_no'=>$req->nin_no,
                                    'incharge_id'=>$req->incharge_id,
                                    'has_incharge'=>$req->has_incharge,
                                    'applicant_reg_no'=>$req->applicant_reg_no,
                                    'applicant_reg_date'=>$req->applicant_reg_date,
                                    'applicant_incharge_telephone'=>$req->applicant_incharge_telephone,
                                    'applicant_incharge_email'=>$req->applicant_incharge_email,
                                    'incharge_physical_address'=>$req->incharge_physical_address,
                                    'county_id'=>$req->county_id,
                                    'sub_county_id'=>$req->sub_county_id,
                                    'street'=>$req->street,
                                    'managing_director_email'=>$req->managing_director_email,
                                    'managing_director_telepone'=>$req->managing_director_telepone,
                                    'managing_director'=>$req->managing_director,
                                    'superv_email'=>$req->superv_email,
                                    'other_classification'=>$req->other_classification,
                                    'super_telephone'=>$req->super_telephone,
                                    'super_physical_address'=>$req->super_physical_address,
                                    'postal_address'=>$req->postal_address,
                                    'code_no'=>$req->code_no,
                                    'mobile_no'=>$req->mobile_no,
                                    'business_type_id'=>$business_type_id,
                                    'physical_address'=>$req->physical_address,
                                    'longitude'=>$req->longitude,
                                    'latitude'=>$req->latitude,
                                    'business_scale_id'=>$req->business_scale_id,
                                    'business_category_id'=>$req->business_category_id,
                                    'village'=>$req->village,
                                    'contact_person'=>$req->contact_person,
                                    'contact_person_email'=>$req->contact_person_email,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'contact_person_telephone'=>$req->contact_person_telephone,
                                    'tpin_no'=>$req->tpin_no,
                                    'company_registration_no'=>$req->company_registration_no,
                                    'psu_no'=>$req->psu_no,
                                    'qualification_id'=>$req->qualification_id,
                                    'reg_date'=>$req->reg_date,
                                    'registration_date'=>$req->registration_date,
                                    'contact_person_id'=>$req->contact_person_id,
                                    'contact_person_startdate'=>$req->contact_person_startdate,
                                    'contact_person_enddate'=>$req->contact_person_enddate,
                                    'applicant_contact_person'=>$req->applicant_contact_person
                                );  
                        /** Already Saved */
                        //validate data to avert any duplicates 
                        $table_name = 'wb_premises_applications';
                        $sub_module_id = $req->sub_module_id;
                        if(validateIsNumeric($premise_id) && $tracking_no != ''){
                                //update the record 
                                //product information
                                //
                                $where = array('id'=>$premise_id);
                                $where_app = array('premise_id'=>$premise_id);

                                if (recordExists('wb_premises', $where)) {
                                    
                                    $premises_infor['dola'] = Carbon::now();
                                    $premises_infor['altered_by'] = $trader_email;
                
                                    $previous_data = getPreviousRecords('wb_premises', $where);
                                    
                                    updateRecord('wb_premises', $previous_data, $where, $premises_infor, $trader_email);
                                    $region_id = $previous_data['results'][0]['region_id'];

                                    $app_data = array('trader_id'=>$trader_id,
                                            'zone_id'=>$req->zone_id,
                                            'region_id'=>$region_id,
                                            'altered_by'=>$trader_email,
                                            'is_fast_track'=>$is_fast_track,
                                            'paying_currency_id'=>$paying_currency_id,
                                            'dola'=>Carbon::now()
                                    );
                                    $previous_data = getPreviousRecords('wb_premises_applications', $where_app);
                                   
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                          
                                     $resp=   updateRecord('wb_premises_applications', $previous_data, $where_app, $app_data, $trader_email);
                                    
                                }
                                else{
                                     $resp=  array('success'=>false,'message'=>'Error occurred');
                                }
                        }
                        else{
                           
                           $anyOngoingApps = checkForOngoingApplications($registered_id, 'tra_premises_applications', 'reg_premise_id', $process_id);

                            $anyOngoingPortalApps = checkForPortalOngoingApplications($registered_id, 'wb_premises_applications', 'registered_id', $process_id);
                                
                            if(!$anyOngoingApps['exists'] && !$anyOngoingPortalApps['exists']){
                                                 $premises_infor['created_on'] = Carbon::now();
                                $premises_infor['created_by'] = $trader_email;
                                    
                                $resp = insertRecord('wb_premises', $premises_infor, $trader_email);
                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                               

                                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                                $business_code = getSingleRecordColValue('par_business_types', array('id' => $business_type_id), 'code');
                                $district_code = getSingleRecordColValue('par_premise_districts', array('id' => $district_id), 'code');

                                $region_code = getSingleRecordColValue('par_premise_regions', array('id' => $region_id), 'code');


                                 $product_category_code = getSingleRecordColValue('par_premise_class', array('id' => $product_classification_id), 'code');


                                 $codes_array = array(
                                        'sub_module_code' => $sub_module_code,
                                        'business_type_code' => $business_code,
                                        'product_category_code' => $product_category_code,
                                        'district_code' => $district_code,
                                        'region_code' => $region_code
                                  );

                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }
                                $application_code = generateApplicationCode($sub_module_id, 'wb_premises_applications');
                                $premise_id = $resp['record_id'];
                                    $rec = DB::table('wb_premises')
                                                ->where('id',$premise_id)
                                                ->first();
                                $app_data = array('trader_id'=>$trader_id,
                                                'sub_module_id'=>$req->sub_module_id,
                                                'module_id'=>$req->module_id,
                                                'section_id'=>$section_id,
                                                'premise_id'=>$premise_id,
                                                'zone_id'=>$req->zone_id,
                                                'region_id'=>$rec->region_id,
                                                'tracking_no'=>$tracking_no,
                                                'application_code'=>$application_code,
                                                'reg_premise_id'=>$reg_premise_id,
                                                'date_added'=>Carbon::now(),
                                                'registered_id'=>$registered_id,

                                                'application_status_id'=>1,
                                                'created_by'=>$trader_email,
                                                'is_fast_track'=>$is_fast_track,
                                                'paying_currency_id'=>$paying_currency_id,
                                                'created_on'=>Carbon::now()
                                        );
                                //get the other details 
                                

                                $init_drugshoplocationDetails = DB::connection('mis_db')->table('tra_drugshop_storelocation as t1')
                                    ->select(
                                        't1.name',
                                        't1.distance',
                                        't1.street',
                                        't1.country_id',
                                      
                                        't1.county_id',
                                        't1.sub_county_id',
                                        't1.region_id',
                                        't1.physical_address',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t1.premise_id', $tra_premise_id)
                                    ->get();
                
                                $init_locationDetails = DB::connection('mis_db')->                          table('tra_premises_storelocation as t1')
                                    ->select(
                                        't1.name',
                                        't1.distance',
                                        't1.street',
                                        't1.country_id',
                                        
                                        't1.county_id',
                                        't1.sub_county_id',
                                        't1.region_id',
                                        't1.physical_address',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t1.premise_id', $tra_premise_id)
                                    ->get();
                                    $init_locationDetails = convertStdClassObjToArray($init_locationDetails); 
                                    $init_drugshoplocationDetails = convertStdClassObjToArray($init_drugshoplocationDetails); 
                                                                                      
                                     $init_personnelDetails = DB::connection('mis_db')->table('tra_premises_proprietors as t2')
                                    ->select(
                                        't2.name',
                                        't2.telephone_no',
                                        't2.email_address',
                                        't2.qualification_id',
                                        't2.country_id',
                                        DB::raw("$trader_id as created_by"),
                                        DB::raw("$premise_id as premise_id")
                                    )
                                    ->where('t2.premise_id', $tra_premise_id)
                                    ->get();
                                    $init_personnelDetails = convertStdClassObjToArray($init_personnelDetails);
    
                                    DB::table('wb_drugshop_storelocation')
                                        ->insert($init_drugshoplocationDetails);
                                     DB::table('wb_premises_storelocation')
                                        ->insert($init_locationDetails);
                                    DB::table('wb_premises_proprietors')
                                        ->insert($init_personnelDetails);
    
                                        $resp = insertRecord('wb_premises_applications', $app_data, $trader_email);
                                       
                                        $record_id = $resp['record_id'];
                                        if($resp['success']){
                                           // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                            saveApplicationSubmissionDetails($application_code,$table_name);  
                                       }
                                       
    
                            }
                            else{
                              //  $res = $anyOngoingApps;
                     $resp = array('success'=>false, 'message'=>"There is an application pending approval with reference no ".$anyOngoingApps['ref_no'].' Tracking No'.$anyOngoingPortalApps['ref_no'].", check on the premises application dashboard or contact system administrator for clasification.");
    
                            }
                            

                        }
                               
                        if($resp['success']){
                             DB::commit();
                            $res = array('tracking_no'=>$tracking_no,
                                         'premise_id'=>$premise_id,
                                         'application_code'=>$application_code,
                                         'success'=>true,
                                         'premise_target_id'=>$req->premise_target_id,
                                         'message'=>'Premises Application Saved Successfully, with Tracking No: '.$tracking_no);
    
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>$resp['message'],
                            'message1'=>'Error Occurred Premises Application not saved, it this persists contact the system Administrator');
                         }
        } catch (\Exception $exception) {
              DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
              DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   


    }



    function saveInitialPremisesOtherdetails($init_premise_id,$premise_id,$trader_email){
            $records = DB::connection('mis_db')->table('tra_premises_otherdetails')->where(array('premise_id'=>$init_premise_id))->get();
            if($records){
                foreach ($records as $rec) {
                        $data = array('premise_id'=>$premise_id,
                                      'business_type_id'=>$rec->business_type_id,
                                       'business_type_detail_id'=>$rec->business_type_detail_id,
                                       'created_by'=>$trader_email,
                                       'created_on'=>Carbon::now()
                                );
                        $resp = insertRecord('wb_premises_otherdetails', $data, $trader_email);
                                   
                }
            }
    }
    function saveInitialPremisesPersonnel($init_premise_id,$premise_id,$trader_email){
            $records = DB::connection('mis_db')->table('tra_premises_personnel')->where(array('premise_id'=>$init_premise_id))->get();
            if($records){
                foreach ($records as $rec) {
                        $data = array('premise_id'=>$premise_id,
                                    'personnel_name'=>$rec->personnel_name,
                                        'telephone_no'=>$rec->telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'qualification_id'=>$rec->qualification_id,
                                       
                                        'study_field'=>$rec->study_field,
                                        'registration_no'=>$rec->registration_no,
                                        'professional_board'=>$rec->professional_board,
                                        'institution'=>$rec->institution,
                                'position_id'=>$rec->position_id,
                                    'registration_no'=>$rec->registration_no,
                                    'position_id'=>$rec->position_id,
                                    'personnel_qualification_id'=>$rec->personnel_qualification_id,
                                    'start_date'=>$rec->start_date,
                                    'end_date'=>$rec->end_date,
                                    'created_by'=>$trader_email,
                                    'created_on'=>Carbon::now()
                                );
                        $resp = insertRecord('wb_premises_personnel', $data, $trader_email);
                                
                }
            }
    }
    public function onSavePremisesOtherDetails(Request $req){
        try {
            $premise_id = $req->premise_id;
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
            $manufacturing_activities = $req->manufacturing_activities;
           
           $table_name = 'wb_premises_otherdetails';
            $premises_otherinfor = array('business_type_id'=>$req->business_type_id,
                                    'business_type_detail_id'=>$req->business_type_detail_id,
                                    'product_category_id'=>$req->product_category_id,
                                    'product_subcategory_id'=>$req->product_subcategory_id,
                                    'product_details'=>$req->product_details,
                                   'premise_id'=>$req->premise_id
                                );  
                             
                        if(validateIsNumeric($record_id)){
                              
                                $where = array('id'=>$record_id);
                          
                                if (recordExists($table_name, $where)) {
                                    
                                    $premises_otherinfor['dola'] = Carbon::now();
                                    $premises_otherinfor['altered_by'] = $email_address;
                
                                    $previous_data = getPreviousRecords($table_name, $where);
                                    
                                    $resp =updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
                                    
                                $premises_otherdetail_id = $record_id;
                                }
                                $res = returnFuncResponses($resp,'Premises Business Type Details','premise_id',$premise_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                            $table_name = 'wb_premises_otherdetails';
                           if(!recordExists($table_name, $premises_otherinfor)){
                                $premises_otherinfor['created_on'] = Carbon::now();
                                $premises_otherinfor['created_by'] = $email_address;
            
                                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                                $premises_otherdetail_id = $resp['record_id'];
                                $res = returnFuncResponses($resp,'Premises Business Type Details','premise_id',$premise_id);
                           
                            }
                           else{
                                $res = array(
                                    'success'=>false,
                                    'message'=>'Premises Business Details exists or already saved.');

                           }
                            
                        }
                        if(is_array($manufacturing_activities)){
                              
                            $manufacturing_actData = array();
                          foreach($manufacturing_activities as $manufacturer_activity_id){
                                            
                                    $manufacturing_actData[] = array('premise_id'=>$premise_id, 
                                                    'manufacturer_activity_id'=>$manufacturer_activity_id, 
                                                    'premises_otherdetail_id'=>$premises_otherdetail_id, 
                                                    'created_by'=>$email_address, 
                                                    'created_on'=>Carbon::now());

                            }
                            if(count($manufacturing_actData) >0){
                                 DB::table('wb_premisesmanufacturers_activities')->where('premises_otherdetail_id',$premises_otherdetail_id)->delete();
                                  DB::table('wb_premisesmanufacturers_activities')->insert($manufacturing_actData);
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

   public function onSaveNotificationOtherDetails(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $study_site_id = $req->study_site_id;
        $application_id = $req->application_id;
        $record_id = $req->id;
        $error_message = 'Error occurred, data not saved successfully';
        $table_name = 'wb_product_notification_details';

         $data = array('brand_name'=>$req->brand_name, 
                        'product_category_id'=>$req->product_category_id,
                        'common_name_id'=>$req->common_name_id, 
                        'country_id'=>$req->country_id,  
                        'dosage_form_id'=>$req->dosage_form_id, 
                        'manufacturer_id'=>$req->manufacturer_id, 
                        'investigationproduct_section_id'=>$req->investigationproduct_section_id, 
                        'product_desc'=>$req->product_desc, 
                        'product_strength'=>$req->product_strength, 
                        'registered_product_id'=>$req->registered_product_id, 
                        'routes_of_admin_id'=>$req->routes_of_admin_id, 
                        'si_unit_id'=>$req->si_unit_id, 
                        'gmdn_code'=>$req->gmdn_code, 
                        'classification_id'=>$req->classification_id, 
                        'gmdn_term'=>$req->gmdn_term, 
                        'gmdn_category'=>$req->gmdn_category, 
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
                $error_message = "The Product has already been added!!";
                
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



public function getNotificationPProdData(Request $req){

    try{
        $data = array();
        $table_name = $req->table_name;
        $application_id = $req->application_id;
        $records = DB::table('wb_product_notification_details as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        $product_category = getSingleRecordColValue('par_clinical_product_categories', array('id' => $rec->product_category_id), 'category_name','mis_db');
                        $generic_name = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name','mis_db');
                        $dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $rec->dosage_form_id), 'name','mis_db');
                        $route_of_administration = getSingleRecordColValue('par_route_of_administration', array('id' => $rec->routes_of_admin_id), 'name','mis_db');
                        $si_units = getSingleRecordColValue('par_si_units', array('id' => $rec->si_unit_id), 'name','mis_db');
                        $manufacturer_name = getSingleRecordColValue('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'name','mis_db');
                       
                        $classification_name = getSingleRecordColValue('par_classifications', array('id' => $rec->classification_id), 'name','mis_db');
                       
                        $data[] = array('id'=>$rec->id,
                                       'application_id'=>$rec->application_id,
                                       'product_category_id'=>$rec->product_category_id,
                                       'brand_name'=>$rec->brand_name,
                                       'product_desc'=>$rec->product_desc,
                                       'dosage_form_id'=>$rec->dosage_form_id,
                                       'common_name_id'=>$rec->common_name_id,
                                       'manufacturer_id'=>$rec->manufacturer_id,
                                       'routes_of_admin_id'=>$rec->routes_of_admin_id,
                                       'product_strength'=>$rec->product_strength,
                                       'si_unit_id'=>$rec->si_unit_id,
                                       'country_id'=>$rec->country_id,
                                        'manufacturer_name'=> $manufacturer_name,
                                       'product_category'=>$product_category,
                                       'generic_name'=>$generic_name,
                                       'dosage_form'=>$dosage_form,
                                       'route_of_administration'=>$route_of_administration,
                                       
                                       'gmdn_category'=>$rec->gmdn_category,
                                       'gmdn_term'=>$rec->gmdn_term,
                                       'classification_id'=>$rec->classification_id,
                                       'gmdn_code'=>$rec->gmdn_code,
                                       'investigationproduct_section_id'=>$rec->investigationproduct_section_id,

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

public function onSaveChangedPharmacistDetails(Request $req)
{
    try {
        $premise_id = $req->premise_id;
        $pharmacist_id = $req->pharmacist_id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;
        $table_name = 'wb_changed_pharmacistdata';
        $record = DB::table('wb_premises_applications')
            ->where('premise_id',$premise_id)
            ->get();
            foreach($record as $rec){
                $application_code = $rec->application_code;
            }
                $premises_otherinfor = array(
                'pharmacist_id' => $req->pharmacist_id,
                'psu_no' => $req->psu_no,
                'application_code'=>$application_code,
                'premise_id' => $req->premise_id
                );
            
        $where = array('pharmacist_id' => $pharmacist_id,'premise_id' => $premise_id);

        if (recordExists($table_name, $where)) {
            $premises_otherinfor['dola'] = Carbon::now();
            $premises_otherinfor['altered_by'] = $email_address;

            $previous_data = getPreviousRecords($table_name, $where);

            $resp = updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
            $res = returnFuncResponses($resp, 'Pharmacist Details already and Updated', 'premise_id', $premise_id);
        } else {
            // Check if the record does not exist before inserting
            if (!recordExists($table_name, $premises_otherinfor)) {
                $premises_otherinfor['created_on'] = Carbon::now();
                $premises_otherinfor['created_by'] = $email_address;

                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                $res = returnFuncResponses($resp, 'Pharmacist Details Saved ', 'premise_id', $premise_id);
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Pharmacist exists or already saved.'
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

    return response()->json($res);
}

public function onSavePremisesStoreLocationDetails(Request $req)
{
    try {
        $premise_id = $req->premise_id;
        $record_id = $req->id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;

        $table_name = 'wb_premises_storelocation';
        $premises_otherinfor = array(
            'street' => $req->street,
            'distance' => $req->distance,
            'country_id' => $req->country_id,
            'region_id' => $req->region_id,
            'district_id' => $req->district_id,
            'county_id' => $req->county_id,
            'sub_county_id' => $req->sub_county_id,
            'name' => $req->name,
            'premise_id' => $req->premise_id
        );
       
            $where = array('id' => $record_id);

            if (recordExists($table_name, $where)) {
                $premises_otherinfor['dola'] = Carbon::now();
                $premises_otherinfor['altered_by'] = $email_address;

                $previous_data = getPreviousRecords($table_name, $where);

                $resp = updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
                $premises_otherdetail_id = $record_id;
                $res = returnFuncResponses($resp, 'Premises Type Details', 'premise_id', $premise_id);

            }else {
          
                $premises_otherinfor['created_on'] = Carbon::now();
                $premises_otherinfor['created_by'] = $email_address;

                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                $premises_otherdetail_id = $resp['record_id'];
                $res = returnFuncResponses($resp, 'Premises Store Location', 'premise_id', $premise_id);
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

public function onSaveDrugShopStoreLocationDetails(Request $req)
{
    try {
        $premise_id = $req->premise_id;
        $record_id = $req->id;
        $trader_id = $req->trader_id;
        $email_address = $req->email_address;

        $table_name = 'wb_drugshop_storelocation';
        $premises_otherinfor = array(
            'street' => $req->street,
            'distance' => $req->distance,
            'country_id' => $req->country_id,
            'region_id' => $req->region_id,
            'district_id' => $req->district_id,
            'county_id' => $req->county_id,
            'sub_county_id' => $req->sub_county_id,
            'name' => $req->name,
            'premise_id' => $req->premise_id
        );
       
            $where = array('id' => $record_id);

            if (recordExists($table_name, $where)) {
                $premises_otherinfor['dola'] = Carbon::now();
                $premises_otherinfor['altered_by'] = $email_address;

                $previous_data = getPreviousRecords($table_name, $where);

                $resp = updateRecord($table_name, $previous_data, $where, $premises_otherinfor, $email_address);
                $premises_otherdetail_id = $record_id;
                $res = returnFuncResponses($resp, 'Premises Type Details', 'premise_id', $premise_id);

            }else {
          
                $premises_otherinfor['created_on'] = Carbon::now();
                $premises_otherinfor['created_by'] = $email_address;

                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                $premises_otherdetail_id = $resp['record_id'];
                $res = returnFuncResponses($resp, 'Drug Store Location', 'premise_id', $premise_id);
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


    public function onSavePremisesAmmendmentsRequest(Request $req){
        try {
            $premise_id = $req->premise_id;
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
           
           $table_name = 'wb_premises_ammendmentrequest';
            $premises_otherinfor = array('premise_id'=>$req->premise_id,
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
                                $res = returnFuncResponses($resp,'Premises Ammendments Request','premise_id',$premise_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                           if(!recordExists($table_name, $premises_otherinfor)){
                                $premises_otherinfor['created_on'] = Carbon::now();
                                $premises_otherinfor['created_by'] = $email_address;
            
                                $resp = insertRecord($table_name, $premises_otherinfor, $email_address);
                                
                                $res = returnFuncResponses($resp,'Premises Ammendments Request','premise_id',$premise_id);
                           
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
    public function getPremisesStoreLocationDetails(Request $req){
    try{
            $premise_id = $req->premise_id;
            $countriesData = getParameterItems('par_countries','','mis_db');
            $regionsData = getParameterItems('par_regions','','mis_db');
            $districtsData = getParameterItems('par_districts','','mis_db');
            $countiesData = getParameterItems('par_county','','mis_db');
            $subCountiesData= getParameterItems('par_sub_county','','mis_db');
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_storelocation as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) {
                      $premise_id = $rec->premise_id;
                        $data[] = array('id'=>$rec->id,
                                        'name'=>$rec->name,
                                        'street'=>$rec->street,
                                        'distance'=>$rec->distance,
                                        'premise_id'=>$rec->premise_id,
                                        'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                                        'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                                        'county_name'=>returnParamFromArray($countiesData,$rec->county_id),
                                        'sub_county_name'=>returnParamFromArray($subCountiesData,$rec->sub_county_id)
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
public function getDrugShopStoreLocationDetails(Request $req){
    try{
            $premise_id = $req->premise_id;
            $countriesData = getParameterItems('par_countries','','mis_db');
            $regionsData = getParameterItems('par_regions','','mis_db');
            $districtsData = getParameterItems('par_districts','','mis_db');
            $countiesData = getParameterItems('par_county','','mis_db');
            $subCountiesData= getParameterItems('par_sub_county','','mis_db');
            $data = array();
            //get the records 
            $records = DB::table('wb_drugshop_storelocation as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) {
                      $premise_id = $rec->premise_id;
                        $data[] = array('id'=>$rec->id,
                                        'name'=>$rec->name,
                                        'street'=>$rec->street,
                                        'distance'=>$rec->distance,
                                        'premise_id'=>$rec->premise_id,
                                        'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                                        'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                                        'district_name'=>returnParamFromArray($districtsData,$rec->district_id),
                                        'county_name'=>returnParamFromArray($countiesData,$rec->county_id),
                                        'sub_county_name'=>returnParamFromArray($subCountiesData,$rec->sub_county_id)
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
    
    public function getPremisesApplicationLoading(Request $req){
       
            try{
                $trader_id = $req->trader_id;
                $application_status_id = $req->application_status_id;
                $application_status_ids = explode(',',  $application_status_id);
                $sub_module_id = $req->sub_module_id;
                $section_id = $req->section_id;
                $data = array();
                //get the records 
             
                    $records = DB::table('wb_premises_applications as t1')
                    ->select(DB::raw('t1.application_code,t7.name as action_name,t7.iconCls,t7.action,  t1.module_id,t1.created_by,t1.zone_id,t1.premise_id,            t1.tracking_no, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*,t8.*, t1.date_added,                          t1.submission_date,t1.premise_id, t1.sub_module_id,t1.section_id, t1.trader_id, t1.reference_no, t1.application_status_id'))
                    ->leftJoin('wb_premises as t2', 't1.premise_id','=','t2.id')
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_processstatus_actions as t6',function($join){
                        $join->on('t1.application_status_id', '=', 't6.status_id')
                             ->on('t6.is_default_action', '=', DB::raw(1));

                    })
                    ->leftJoin('wb_premises_relocation as t8', 't8.premise_id','=','t2.id')
                    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                     ->where(array('t1.trader_id' => $trader_id))
                    ->whereNotIn('application_status_id',array('12'));

                    if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                
                        $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                    }if(validateIsNumeric($sub_module_id)){
                        $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                    }if(validateIsNumeric($section_id)){
                        $records =  $records->where(array('t1.section_id'=>$section_id));
                    }
                    $records=$records->get();
                $data = $this->getPremisesApplications($records);
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



    public function getpsurNotificationApplicationLoading(Request $req){
       
            try{
                $trader_id = $req->trader_id;
                $application_status_id = $req->application_status_id;
                $application_status_ids = explode(',',  $application_status_id);
                $sub_module_id = $req->sub_module_id;
                $data = array();
                //get the records 
             
                    $records = DB::table('wb_psur_pbrer_applications as t1')
                    ->select(DB::raw('t1.application_code,t7.name as action_name,t7.iconCls,t7.action,  t1.module_id,t1.created_by, t1.tracking_no, t1.id as application_id,t3.name as status_name,t1.*,t1.date_added,                          t1.submission_date, t1.sub_module_id, t1.trader_id, t1.reference_no, t1.application_status_id'))
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_processstatus_actions as t6',function($join){
                        $join->on('t1.application_status_id', '=', 't6.status_id')
                             ->on('t6.is_default_action', '=', DB::raw(1));

                    })
                    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                     ->where(array('t1.trader_id' => $trader_id))
                    ->whereNotIn('application_status_id',array('12'));

                    if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                
                        $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                    }if(validateIsNumeric($sub_module_id)){
                        $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                    }
                    $records=$records->get();
                $data = $this->getNoficationpplications($records);
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


    public function getPremisesApplicationPharmicts(Request $req){
       
            try{
                $trader_id = $req->trader_id;
                $application_status_id = $req->application_status_id;
                $application_status_ids = explode(',',  $application_status_id);
                $sub_module_id = $req->sub_module_id;
                $section_id = $req->section_id;
                $data = array();
                //get the records wb_premises_applications as t2
                $records = DB::table('wb_pharmacists_approval as t1')
                    ->select(DB::raw('t1.application_code,t7.name as action_name,t7.iconCls,t7.action,  t2.module_id,t2.created_by,t1.premise_id, t2.tracking_no, t2.id as application_id,t4.name as status_name,t2.section_id,t3.*, t2.date_added, t2.submission_date,t1.premise_id, t2.sub_module_id,t2.section_id, t2.trader_id, t2.reference_no, t2.application_status_id'))
                    ->join('wb_premises_applications as t2', 't1.application_code','=','t2.application_code')
                    ->leftJoin('wb_premises as t3', 't1.premise_id','=','t3.id')
                    ->leftJoin('wb_statuses as t4', 't2.application_status_id','=','t4.id')
                    ->leftJoin('wb_processstatus_actions as t6',function($join){
                        $join->on('t2.application_status_id', '=', 't6.status_id')
                             ->on('t6.is_default_action', '=', DB::raw(1));

                    })
                    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                    ->where('t1.pharmacist_id', '=', DB::raw('t3.psu_no'));
                    if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                        $records =  $records->whereIn('t2.application_status_id', $application_status_ids);
                    }if(validateIsNumeric($sub_module_id)){
                        $records =  $records->where(array('t2.sub_module_id'=>$sub_module_id));
                    }if(validateIsNumeric($section_id)){
                        $records =  $records->where(array('t2.section_id'=>$section_id));
                    }

                    $records = $records->get();

                    $data = $this->getPremisesApplications($records);
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
                ->select(DB::raw('t1.module_id,t1.created_by,t1.zone_id, t1.tracking_no, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*, t1.date_added, t1.submission_date,t1.premise_id, t1.sub_module_id,t1.section_id, t1.trader_id,t1.application_code, t1.reference_no, t1.application_status_id'))
                ->leftJoin('wb_premises as t2', 't1.premise_id','=','t2.id')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->where(array('t1.trader_id' => $trader_id,'application_status_id'=>12))
                ->get();
                $data = $this->getPremisesApplications($records);
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
    function getPremisesApplications($records){
        
         $actionColumnData = returnContextMenuActions();
         $data = array();
         $subModuleData = getParameterItems('sub_modules','','mis_db');
         $businessData = getParameterItems('par_business_types','','mis_db');
         $countriesData = getParameterItems('par_countries','','mis_db');
         $regionsData = getParameterItems('par_premise_regions','','mis_db');
         $districtsData = getParameterItems('par_districts','','mis_db');
        
    
         foreach ($records as $rec) {
            //$telephone = $this->getPremiseDetails('wb_telephone_details', $rec->premise_id, 'telephone');
            $premise_category = returnParamFromArray($businessData,$rec->business_type_id);
            $data[] = array('reference_no'=>$rec->reference_no,
                            'trader_id'=>$rec->trader_id,
                            'premise_id'=>$rec->premise_id,
                            'applicant_type_id'=>$rec->applicant_type_id,
                            'section_id'=>$rec->section_id,
                            'product_classification_id'=>$rec->product_classification_id,
                            'premises_name'=>$rec->name,
                            'application_code'=>$rec->application_code,
                            'application_id'=>$rec->application_id,
                            'id'=>$rec->application_id,
                            'date_added'=>$rec->date_added,
                            'sub_module_id'=>$rec->sub_module_id,
                            'module_id'=>$rec->module_id,
                            'application_status_id'=>$rec->application_status_id,
                            'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Premises Application',
                            'premise_category'=>$premise_category,
                            'created_by'=>$rec->created_by,
                            'submission_date'=>$rec->submission_date,
                            'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                            'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                            'district_name'=>returnParamFromArray($districtsData,$rec->district_id),
                            'country_id'=>$rec->country_id,
                            'region_id'=>$rec->region_id,
                            'district_id'=>$rec->district_id,
                            'village'=>$rec->village,
                            'proposed_region_id'=>$rec->proposed_region_id,
                            'proposed_district_id'=>$rec->proposed_district_id,
                            'proposed_county_id'=>$rec->proposed_county_id,
                            'proposed_sub_county_id'=>$rec->proposed_sub_county_id,
                            'proposed_village'=>$rec->proposed_village,
                            'proposed_street'=>$rec->proposed_street,
                            'proposed_physical_address'=>$rec->proposed_physical_address,
                            'proposed_longitude'=>$rec->proposed_longitude,
                            'proposed_latitude'=>$rec->proposed_latitude,
                            'business_scale_id'=>$rec->business_scale_id,
                            'parish_id'=>$rec->parish_id,
                            'longitude'=>$rec->longitude,
                            'latitude'=>$rec->latitude,
                            'business_category_id'=>$rec->business_category_id,
                            'physical_address'=>$rec->physical_address,
                            'status_name'=>$rec->status_name,
                            'status'=>$rec->status_name,
                            'added_by'=>$rec->created_by,
                            'tracking_no'=>$rec->tracking_no,
                            'nin_no'=>$rec->nin_no,
                            'incharge_id'=>$rec->incharge_id,
                            'pharmacist_id'=>$rec->pharmacist_id,
                            'applicant_reg_no'=>$rec->applicant_reg_no,
                            'other_classification'=>$rec->other_classification,
                            'applicant_reg_date'=>$rec->applicant_reg_date,
                            'applicant_incharge_telephone'=>$rec->applicant_incharge_telephone,
                            'applicant_incharge_email'=>$rec->applicant_incharge_email,
                            'incharge_physical_address'=>$rec->incharge_physical_address,
                            'county_id'=>$rec->county_id,
                            'sub_county_id'=>$rec->sub_county_id,
                            'qualification_id'=>$rec->qualification_id,
                            'working_inotherinstitutions'=>$rec->working_inotherinstitutions,
                            'cancelling_reason'=>$rec->cancelling_reason,
                            'offence'=>$rec->offence,
                            'street'=>$rec->street,
                            'managing_director_email'=>$rec->managing_director_email,
                            'managing_director_telepone'=>$rec->managing_director_telepone,
                            'managing_director'=>$rec->managing_director,
                            'superv_email'=>$rec->superv_email,
                            'super_telephone'=>$rec->super_telephone,
                            'super_physical_address'=>$rec->super_physical_address,
                            'cell_id'=>$rec->cell_id,
                            'investment_capital_currency_id'=>$rec->investment_capital_currency_id,
                            'contact_person'=>$rec->contact_person,
                            'contact_person_email'=>$rec->contact_person_email,
                            'contact_person_enddate'=>$rec->contact_person_enddate,
                            'contact_person_telephone'=>$rec->contact_person_telephone,
                            'sector_id'=>$rec->sector_id,
                            'tpin_no'=>$rec->tpin_no,
                            'company_registration_no'=>$rec->company_registration_no,
                            'reg_date'=>$rec->reg_date,
                            'registration_date'=>$rec->registration_date,
                            'action_name'=>$rec->action_name,
                                        'action'=>$rec->action,
                                        'iconCls'=>$rec->iconCls,
                            'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                        );                

         }
         return $data;


    }
      function getPremiseDetails($table_name, $premise_id, $column_name){
            $record = array();
            $records = DB::table($table_name)->where('premise_id',$premise_id)->select(DB::raw("$column_name as record_id"))->get();
            if($records){
                    foreach($records as $rec){
                            
                        $record[] = $rec->record_id;
                        
                    }
                
            }
            return $record;
            
        
        
    }
    function getNoficationpplications($records){
        
         $actionColumnData = returnContextMenuActions();
         $data = array();
         $subModuleData = getParameterItems('sub_modules','','mis_db');
         $reportSourceData = getParameterItems('par_sourcesofsafety_alerts','','mis_db');
         $ReportTypeData = getParameterItems('par_psur_type','','mis_db');
         foreach ($records as $rec) {
            $data[] = array('reference_no'=>$rec->reference_no,
                            'trader_id'=>$rec->trader_id,
                            'application_code'=>$rec->application_code,
                            //'application_id'=>$rec->application_id,
                            'id'=>$rec->application_id,
                            'date_added'=>$rec->date_added,
                            'sub_module_id'=>$rec->sub_module_id,
                            'report_period_from'=>$rec->from_date,
                            'report_period_to'=>$rec->to_date,
                            'module_id'=>$rec->module_id,
                            'application_status_id'=>$rec->application_status_id,
                            'created_by'=>$rec->created_by,
                            'submission_date'=>$rec->submission_date,
                            'source_of_report'=>returnParamFromArray($reportSourceData,$rec->sourceofpsur_id),
                            'report_type'=>returnParamFromArray($ReportTypeData,$rec->psur_type_id),
                            'sourceofpsur_id'=>$rec->sourceofpsur_id,
                            'psur_type_id'=>$rec->psur_type_id,
                            'status_name'=>$rec->status_name,
                            'status'=>$rec->status_name,
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


 
    public function getpremisesApplicationDetails(Request $req){
        try{            
        $mis_db = DB::connection('mis_db')->getDatabaseName();                    
            $application_id = $req->application_id;
            $data = array();
            $records = DB::table('wb_premises_applications as t1')
                    ->select(DB::raw('t1.                               *,t7.proposed_region_id,t7.proposed_district_id,t7.proposed_county_id,t7.proposed_sub_county_id,t7.proposed_village,t7.proposed_street,
    t7.proposed_physical_address,t7.proposed_longitude,t7.proposed_latitude,t7.proposed_parish_id, t2.name as premises_name,t5.nin_no,t5.name as fullname,t5.country_id as    incharge_country_id,t5.region_id as incharge_region_id,t5.district_id as incharge_district_id,t5.telephone as incharge_telephone,t5.email as incharge_email,t6.psu_no,t6.name as full_names,t5.qualification_id as incharge_qualification,t6.country_id as pharmacist_country_id,t6.region_id as     pharmacist_region_id,t6.district_id as pharmacist_district_id,t6.telephone as pharmacist_telephone,t6.email as pharmacist_email,t6.qualification_id     as pharmacist_qualification,t6.psu_date,t1.application_status_id as status_id, t2.*, t3.name as status_name, t4.router_link, t4.name as     process_title'))
                    ->join('wb_premises as t2', 't1.premise_id','=','t2.id')
                    ->leftjoin('wb_premises_relocation as t7', 't7.premise_id','=','t2.id')
                    ->leftjoin($mis_db.'.tra_premise_incharge_personnel as t5', 't2.incharge_id','=','t5.id')
                    ->leftjoin($mis_db.'.tra_pharmacist_personnel as t6', 't2.pharmacist_id','=','t6.id')
                    ->join('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                        $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                        $join->on('t1.application_status_id', '=', 't4.status_id');
                    })
                    ->where(array('t1.id' => $application_id));
                    //->first();
                  $records =$records->first();
        
                     //get the process title 
                    //get the process data 
                    //wf_tfdaprocesses process_title
                    $process_name = getSingleRecordColValue('wf_tfdaprocesses', array('section_id'=>$records->section_id,'sub_module_id'=>$records->sub_module_id), 'name','mis_db');
                    if($process_name != ''){
                        $records->process_title = $process_name;
                    } 
                 //   $telephone = $this->getPremiseDetails('wb_telephone_details', $records->premise_id, 'telephone');


                       // $records->telephone = $telephone;
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
    public function getNotificationApplicationDetails(Request $req){
        try{            
        $mis_db = DB::connection('mis_db')->getDatabaseName();                    
            $application_id = $req->application_id;
            $data = array();
            $records = DB::table('wb_psur_pbrer_applications as t1')
                    ->select(DB::raw('t1.*,t1.application_status_id as status_id,t3.name as status_name, t4.router_link, t4.name as process_title'))
                    ->join('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                        $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                        $join->on('t1.application_status_id', '=', 't4.status_id');
                    })
                    ->where(array('t1.id' => $application_id));
                    //->first();
                  $records =$records->first();
                    $process_name = getSingleRecordColValue('wf_tfdaprocesses', array('section_id'=>$records->section_id,'sub_module_id'=>$records->sub_module_id), 'name','mis_db');
                    if($process_name != ''){
                        $records->process_title = $process_name;
                    } 
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

   function getManufacturerRActivities($premises_otherdetail_id,$premise_id,$manufacturer_roleData){
            $man_roles = '';
            $records = DB::table('wb_premisesmanufacturers_activities')
                    ->where(array('premises_otherdetail_id'=>$premises_otherdetail_id, 'premise_id'=>$premise_id))
                    ->get();
                foreach($records as $rec){
                    $manufacturer_activity_id = $rec->manufacturer_activity_id;
                                
                    $manufacturing_role = returnParamFromArray($manufacturer_roleData,$manufacturer_activity_id);
                                
                    $man_roles .= $manufacturing_role.';';
                }
                return $man_roles;
    }
    public function getBusinessDetails(Request $req){
        $TinNo = $req->TinNo;
        $data = DB::table('wb_premises as t1')
                    ->where(array('tpin_no'=>$TinNo))
                    ->get();
        return response()->json(array('data'=>$data));
    }
    public function getPremisesOtherDetails(Request $req){
       
        try{
            $premise_id = $req->premise_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_otherdetails as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();
                     $manufacturer_roleData = getParameterItems('par_manufacturing_roles','','mis_db');
                     foreach ($records as $rec) {
                      $premises_otherdetail_id = $rec->id;
                      $premise_id = $rec->premise_id;
                      $manufacturing_activities = $this->getManufacturerRActivities($premises_otherdetail_id,$premise_id,$manufacturer_roleData);

                        $data[] = array('id'=>$rec->id,
                                        'business_type'=>getParameterItem('par_business_types',$rec->business_type_id,'mis_db'),
                                        'business_type_details'=>getParameterItem('par_business_type_details',$rec->business_type_detail_id,'mis_db'),
                                        
                                        'product_category'=>getParameterItem('par_product_categories',$rec->product_category_id,'mis_db'),
                                        'product_subcategory'=>getParameterItem('par_subproduct_categories',$rec->product_subcategory_id,'mis_db'),
                                        'business_type_detail_id'=>$rec->business_type_detail_id,
                                        'business_type_id'=>$rec->business_type_id,
                                        'manufacturing_activities'=>$manufacturing_activities,
                                         'product_category_id'=>$rec->product_category_id,
                                          'product_subcategory_id'=>$rec->product_subcategory_id,
                                        'premise_id'=>$rec->premise_id
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
public function getPersonnelInformations(Request $req){
    $trader_id = $req->mistrader_id;
    $data = DB::connection('mis_db')->table('tra_personnel_information as t1')
                ->where(array('trader_id'=>$trader_id))
                ->get();
    return response()->json(array('data'=>$data));
}

public function getTelephoneDetails(Request $req){
    $trader_id = $req->mistrader_id;
    $data = DB::connection('mis_db')->table('tra_telephone_details as t1')
                ->where(array('trader_id'=>$trader_id))
                ->get();
    return response()->json(array('data'=>$data));
}

public function getApplicantIncharge(Request $req){
    $nimNo = $req->nimNo;
    $data = DB::connection('mis_db')->table('tra_premise_incharge_personnel as t1')
                ->where(array('nin_no'=>$nimNo))
                ->get();
    return response()->json(array('data'=>$data));
}
public function getApplicantInchargeDetails(Request $req){
            $email = $req->email;
            $data  = DB::connection('mis_db')->table('tra_premise_incharge_personnel as t1')
                    ->where(array('t1.email' => $email))
                     ->get();
    return response()->json(array('data'=>$data));
}
public function getApplicantDetails(Request $req){
            $trader_id = $req->trader_id;
            $data  = DB::table('wb_trader_account as t1')
                    ->where(array('t1.id' => $trader_id))
                     ->get();
    return response()->json(array('data'=>$data));
}


public function getSupervisingPharmacist(Request $req){
    $psuNo = $req->psuNo;
    $data = DB::connection('mis_db')->table('tra_pharmacist_personnel as t1')
                ->where(array('psu_no'=>$psuNo))
                ->get();
    return response()->json(array('data'=>$data));
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
                                'trader_id'=>$req->mistrader_id
                            );  
                           
                    $table_name = 'tra_personnel_information';
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
                                  
                            $res = returnFuncResponses($resp,'Premises Personnel Details','personnel_id',$record_id);
                       
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

public function onSavePremisesStaff(Request $req){
            
            try {
                $trader_id = $req->trader_id;
                 $email_address = $req->traderemail_address;
           
                $premise_id = $req->premise_id;
                $record_id = $req->id;

                $premises_personnel = array(
                                        'staff_full_name'=>$req->staff_full_name,
                                        'staff_telephone_no'=>$req->staff_telephone_no,
                                        'email_address'=>$req->email_address,
                                        'staff_email_address'=>$req->staff_email_address,
                                        'premise_id'=>$req->premise_id,
                                        'trader_id'=>$req->trader_id,
                                        'qualification_id'=>$req->qualification_id,
                                        'country_id'=>$req->country_id,
                                        'region_id'=>$req->region_id,
                                        'district_id'=>$req->district_id,
                                        'postal_address'=>$req->postal_address,
                                        'postal_code'=>$req->postal_code

                                    );  
                            $table_name = 'wb_premises_staff';
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

                                    $res = returnFuncResponses($resp,'Premises Staff Details','premise_id',$premise_id);
                               
                                }
                               else{
                                    $res = array(
                                        'success'=>false,
                                        'message'=>'Premises Staff exists or already saved.');
    
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
public function onSaveApprovalRecomDetails(Request $req){
            $premise_id = $req->premise_id;
            $traderemail_address=$req->traderemail_address;
            $trader_id =$req->trader_id;
            $qry = DB::table('wb_premises_applications')
                ->where(array('trader_id'=> $trader_id));
            $app_details = $qry->first();
            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details!!'
                );
                return response()->json($res);            }
                try {
                    $premise_id = $req->input('premise_id');
                    $pharmacist_approvalstatus_id = $req->input('pharmacist_approvalstatus_id');
                    $approval_date = $req->input('approval_date');


                    if (validateIsNumeric($app_details->premise_id)) {
                        $where = array('premise_id' => $app_details->premise_id);
                        if (recordExists('wb_premises_applications', $where)) {
                            // Check for specific premise and status conditions
                            $existingRecord = recordExists('wb_premises_applications', ['premise_id' => $premise_id, 'pharmacist_approvalstatus_id' => 2]);
                            if ($existingRecord) {
                                $res = [
                                    'success' => false,
                                    'message' => 'Application is already approved'
                                ];
                            } else {
                                $params = [
                                    'pharmacist_approvalstatus_id' => $pharmacist_approvalstatus_id,
                                    'application_status_id' => 1,
                                    'approval_date' => $approval_date
                                ];
                                $table_name = 'wb_pharmacists_approval';

                                // Get previous data for update
                                $previous_data = getPreviousRecords($table_name, $where);
                                if ($previous_data['success'] == false) {
                                    return response()->json($previous_data);
                                }

                                // Update records
                                updateRecord($table_name, $previous_data, $where, $params, $traderemail_address);
                                updateRecord('wb_premises_applications', $previous_data, $where, $params, $traderemail_address);

                                $res = [
                                    'success' => true,
                                    'message' => 'Application successfully Approved'
                                ];
                            }
                        } else {
                            $res = [
                                'success' => false,
                                'message' => 'Application record not found'
                            ];
                        }
                    } else {
                        $res = [
                            'success' => false,
                            'message' => 'Invalid premise ID'
                        ];
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

public function onSavePremisesholder(Request $req){
            
            try {
                $trader_id = $req->trader_id;
                 $email_address = $req->traderemail_address;
           
                $premise_id = $req->premise_id;
                $other_premise_id=$req->id;

                $premises_personnel = array(
                                        'premise_id'=>$req->premise_id,
                                        'other_premise_id'=>$other_premise_id,
                                        'region_id'=>$req->region_id,
                                        'hold_premise'=>$req->hold_premise,
                                        'name'=>$req->name,
                                        'permit_no'=>$req->permit_no
                                    );  

                            $table_name = 'wb_other_premises';
                                
                            if(!recordExists($table_name, $premises_personnel)){
                                $premises_personnel['created_on'] = Carbon::now();
                                $premises_personnel['created_by'] = $email_address;
                                    
                                $resp = insertRecord($table_name, $premises_personnel, $email_address);
                             
                                $res = returnFuncResponses($resp,'Other premises Details','premise_id',$premise_id);
                               
                                }
                               else{
                                    $res = array(
                                        'success'=>false,
                                        'message'=>'Other Premises exists or already saved.');
    
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
public function onSavePremisesPersonnel(Request $req){
            
            try {
                $trader_id = $req->trader_id;
                 $email_address = $req->traderemail_address;
           
                $personnel_id = $req->personnel_id;
                $premise_id = $req->premise_id;
                $record_id = $req->id;
                $position_id = $req->position_id;

                $premises_personnel = array(
                                        'personnel_name'=>$req->personnel_name,
                                        'telephone_no'=>$req->telephone_no,
                                        'email_address'=>$req->email_address,
                                        'premise_id'=>$req->premise_id,
                                        'position_id'=>$req->position_id,
                                        'qualification_id'=>$req->qualification_id,
                                    );  
                            

                            $table_name = 'wb_premises_personnel';
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
                                
                               if(!recordExists($table_name, $premises_personnel)){
                                    $premises_personnel['created_on'] = Carbon::now();
                                    $premises_personnel['created_by'] = $email_address;
                                    
                                    $resp = insertRecord($table_name, $premises_personnel, $email_address);
                     $res = returnFuncResponses($resp,'Premises Personnel Details','premise_id',$premise_id);
                               
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
public function onSaveClinicalPersonnel(Request $req){
            
           try {
                $trader_id = $req->trader_id;
                $email_address = $req->traderemail_address;
                $personnel_id = $req->personnel_id;
                $record_id = $req->id;
                $position_id = $req->position_id;

                $premises_personnel = array(
                                        'personnel_name'=>$req->personnel_name,
                                        'telephone_no'=>$req->telephone_no,
                                        'email_address'=>$req->email_address,
                                        'trader_id'=>$req->trader_id,
                                        'position_id'=>$req->position_id,
                                        'qualification_id'=>$req->qualification_id,
                                    );  
                            

                            $table_name = 'wb_premises_personnel';
                            if(validateIsNumeric($record_id)){

                                    $where = array('id'=>$record_id);
                              
                                    if (recordExists($table_name, $where)) {
                                        
                                        $premises_personnel['dola'] = Carbon::now();
                                        $premises_personnel['altered_by'] = $email_address;
                    
                                        $previous_data = getPreviousRecords($table_name, $where);
                                        $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $email_address);

                                    }
                                    $res = returnFuncResponses($resp,'Premises Personnel','premise_id',$trader_id);

                                    
                                }
                            else{
                                
                               if(!recordExists($table_name, $premises_personnel)){
                                    $premises_personnel['created_on'] = Carbon::now();
                                    $premises_personnel['created_by'] = $email_address;
                                    
                                    $resp = insertRecord($table_name, $premises_personnel, $email_address);
                     $res = returnFuncResponses($resp,'Premises Personnel Details','premise_id',$trader_id);
                               
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
public function getOtherPremises(Request $req){

   try{     
            $premise_id = $req->premise_id;
            $regionsData = getParameterItems('par_regions','','mis_db');
            $data = array();
            //get the records 
            $records = DB::table('wb_other_premises as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) {
                      $premise_id = $rec->premise_id;
                        $data[] = array('id'=>$rec->id,
                                        'name'=>$rec->name,
                                        'permit_no'=>$rec->permit_no,
                                        'premise_id'=>$rec->premise_id,
                                        'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
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
public function onSavePremisesExternalStore(Request $req){
            
            try {
                $trader_id = $req->trader_id;
                 $email_address = $req->traderemail_address;
                $premise_id = $req->premise_id;
                $record_id = $req->id;

                $premises_personnel = array(
                                        'premise_id'=>$req->premise_id,
                                        'country_id'=>$req->country_id,
                                        'region_id'=>$req->region_id,
                                        'district_id'=>$req->district_id,
                                        'county_id'=>$req->county_id,
                                        'sub_county_id'=>$req->sub_county_id,
                                        'village'=>$req->village,
                                        'street'=>$req->street,
                                        'parish_id'=>$req->parish_id,
                                        'latitude'=>$req->latitude,
                                        'physical_address'=>$req->physical_address,
                                        'longitude'=>$req->longitude

                                    );  
                            
                            $table_name = 'wb_premises_externalstore';
                            if(validateIsNumeric($record_id)){
                                  
                                    $where = array('id'=>$record_id);
                              
                                    if (recordExists($table_name, $where)) {
                                        
                                        $premises_personnel['dola'] = Carbon::now();
                                        $premises_personnel['altered_by'] = $email_address;
                    
                                        $previous_data = getPreviousRecords($table_name, $where);
                                       
                                        $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $email_address);
                                        
                                    }
                                    $res = returnFuncResponses($resp,'Premises External Store','premise_id',$premise_id);
                                    
                                }
                            else{
                                //chenform if this exisit 
                                
                               if(!recordExists($table_name, $premises_personnel)){
                                    $premises_personnel['created_on'] = Carbon::now();
                                    $premises_personnel['created_by'] = $email_address;
                                    
                                    $resp = insertRecord($table_name, $premises_personnel, $email_address);
                             
                                    $res = returnFuncResponses($resp,'Premises External Store Details','premise_id',$premise_id);
                               
                                }
                               else{
                                    $res = array(
                                        'success'=>false,
                                        'message'=>'Premises External Store Details exists or already saved.');
    
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
public function onSavePremisesDirectors(Request $req){
            
            try {
                $trader_id = $req->trader_id;
                 $email_address = $req->traderemail_address;
           
                $premise_id = $req->premise_id;
                $record_id = $req->id;

                $premises_personnel = array(
                                        'name'=>$req->name,
                                        'telephone_no'=>$req->telephone_no,
                                        'email_address'=>$req->email_address,
                                        'premise_id'=>$req->premise_id,
                                        'trader_id'=>$req->trader_id,
                                        'qualification_id'=>$req->qualification_id,
                                        'country_id'=>$req->country_id,
                                        'shares'=>$req->shares,
                                        'region_id'=>$req->region_id,
                                        'district_id'=>$req->district_id,
                                        'physical_address'=>$req->physical_address,

                                    );  
                            
                            $table_name = 'wb_premises_proprietors';
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
                             
                                    $res = returnFuncResponses($resp,'Premises Personnel Details','premise_id',$premise_id);
                               
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

public function onSaveTelephoneDetails(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
        $traderemail_address = $req->traderemail_address;
        $premises_personnel = array(
                                'telephone'=>$req->telephone,
                                'trader_id'=>$req->mistrader_id
                            );  
                           
                    $table_name = 'tra_telephone_details';
                    $premises_personnel['created_on'] = Carbon::now();
                    $premises_personnel['created_by'] = $mistrader_id;
                    $resp = insertRecord($table_name, $premises_personnel,$traderemail_address,'mis_db');
                    $record_id = $resp['record_id'];        
                    $res = returnFuncResponses($resp,'Telephone Details','personnel_id',$record_id);
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
public function onSavePremisesStaffDetails(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
        $traderemail_address = $req->traderemail_address;
        
        $record_id = $req->personnel_id;
        $premises_personnel = array('name'=>$req->name,
                                'postal_address'=>$req->postal_address,
                                'telephone_no'=>$req->telephone_no,
                                'email_address'=>$req->email_address,
                                'trader_id'=>$req->mistrader_id
                            );  
                           
                    $table_name = 'wb_staff_information';
                    if(validateIsNumeric($record_id)){
                          
                            $where = array('id'=>$record_id);
                      
                            if (recordExists($table_name, $where)) {
                                
                                $premises_personnel['dola'] = Carbon::now();
                                $premises_personnel['altered_by'] = $mistrader_id;
            
                                $previous_data = getPreviousRecords($table_name, $where);
                               
                                $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $mistrader_id);
                               
                            }
                            $res = returnFuncResponses($resp,'Personnel Details','personnel_id',$record_id);
                       
                        }
                    else{
                        //chenform if this exisit 
                        
                       if(!recordExists($table_name, $premises_personnel)){
                            $premises_personnel['created_on'] = Carbon::now();
                            $premises_personnel['created_by'] = $mistrader_id;
                            
                            $resp = insertRecord($table_name, $premises_personnel, $traderemail_address);
                            $record_id = $resp['record_id'];
                                  
                            $res = returnFuncResponses($resp,'Premises Personnel Details','personnel_id',$record_id);
                       
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


public function onSavePremisesDirectorsDetails(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
        $traderemail_address = $req->traderemail_address;
        
        $record_id = $req->personnel_id;
        $premises_personnel = array(

                                    'designation_id'=>$req->designation_id,
                                    'directorfull_names'=>$req->directorfull_names,
                                    'director_telephone_no'=>$req->director_telephone_no,
                                    'director_email_address'=>$req->director_email_address,
                                    'country_id'=>$req->country_id,
                                    'region_id'=>$req->region_id,
                                    'district_id'=>$req->district_id,                       
                                    'id'=>$req->id,
                                    'director_postal_address'=>$req->director_postal_address,
                                    'premise_id'=>$req->premise_id,
                                    'trader_id'=>$req->mistrader_id
                            ); 

                    $table_name = 'tra_premises_proprietors';
                    if(validateIsNumeric($record_id)){
                          
                            $where = array('id'=>$record_id);
                            if (recordExists($table_name, $where,'mis_db')) {
                                
                                $premises_personnel['dola'] = Carbon::now();
                                $premises_personnel['altered_by'] = $mistrader_id;
            
                                $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                               
                                $resp =updateRecord($table_name, $previous_data, $where, $premises_personnel, $mistrader_id,'mis_db');
                                 $resp =updateRecord('wb_premises_proprietors', $previous_data, $where, $premises_personnel, $mistrader_id);
                               
                            }
                            $res = returnFuncResponses($resp,'Personnel Details','personnel_id',$record_id);
                       
                        }
                    else{
                        
                       if(!recordExists($table_name, $premises_personnel,'mis_db')){
                            $premises_personnel['created_on'] = Carbon::now();
                            $premises_personnel['created_by'] = $mistrader_id;
                            
                            $resp = insertRecord($table_name, $premises_personnel, $traderemail_address,'mis_db');

                            $resp = insertRecord('wb_premises_proprietors', $premises_personnel,$traderemail_address);
                             $record_id = $resp['record_id'];
                            $res = returnFuncResponses($resp,'Drug Shop Personnel Details','personnel_id',$record_id);
                       
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
            $premise_id = $req->premise_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_personnel as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;

                       $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');
    
                            $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$qualification_id,
                                        'personnel_name'=>$rec->personnel_name,
                                        'name'=>$rec->personnel_name,
                                        'qualification'=>$qualification,
                                        'telephone_no'=>$rec->telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'id'=>$rec->id,
                                        'position_id'=>$rec->position_id,
                                        'position'=> getParameterItem('par_personnel_positions',$rec->position_id,'mis_db'),
                                        'premise_id'=>$rec->premise_id,
                                        
                                        'personnel_id'=>$rec->personnel_id
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
  public function getPremisesPharmacistDetails(Request $req){
     try{        
            $mis_db = DB::connection('mis_db')->getDatabaseName();                    
            $premise_id = $req->premise_id;
            $data = array();
            $records = DB::table('wb_changed_pharmacistdata as t1')
                    ->select(DB::raw('t1.*,t6.psu_no,t6.name as full_names,t6.country_id as pharmacist_country_id,t6.region_id as                             pharmacist_region_id,t6.district_id as pharmacist_district_id,t6.telephone as pharmacist_telephone,t6.email as                              pharmacist_email,t6.qualification_id as pharmacist_qualification,t6.psu_date'))
                    ->leftjoin($mis_db.'.tra_pharmacist_personnel as t6', 't1.pharmacist_id','=','t6.id')
                    ->where(array('t1.premise_id' => $premise_id));
                    //->first();
                   $records =$records->first();
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

public function getClinicalPersonnelDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_personnel as t1')
                    ->where(array('t1.trader_id' => $trader_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;

                       $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');
    
                            $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$qualification_id,
                                        'personnel_name'=>$rec->personnel_name,
                                        'name'=>$rec->personnel_name,
                                        'qualification'=>$qualification,
                                        'telephone_no'=>$rec->telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'id'=>$rec->id,
                                        'position_id'=>$rec->position_id,
                                        'position'=> getParameterItem('par_personnel_positions',$rec->position_id,'mis_db'),
                                        'trader_id'=>$rec->trader_id,
                                        
                                        'personnel_id'=>$rec->personnel_id
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
public function getPremisesExternalStoreDetails(Request $req){
    
        try{
            $premise_id = $req->premise_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_externalstore as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) { 
                                 $country = getParameterItem('par_countries',$rec->country_id,'mis_db');           
                                  $region = getParameterItem('par_premise_regions',$rec->region_id,'mis_db');           
                                   $districts = getParameterItem('par_premise_districts',$rec->district_id,'mis_db'); 
                                $parish = getParameterItem('par_parishes',$rec->parish_id,'mis_db');   
                                $village = getParameterItem('par_villages',$rec->village,'mis_db');                       
                   
                                
                             $data[] = array('id'=>$rec->id,
                                        'village'=>$village,
                                        'street'=>$rec->street,
                                        'latitude'=>$rec->latitude,
                                        'longitude'=>$rec->longitude,
                                        'country'=>$country,
                                        'parish'=>$parish,
                                        'region'=>$region,
                                        'districts'=>$districts, 
                                        'county_id'=>$rec->county_id,
                                        'sub_county_id'=>$rec->sub_county_id,                      
                                        'id'=>$rec->id,
                                        'physical_address'=>$rec->physical_address,
                                        'premise_id'=>$rec->premise_id
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
public function getPremisesDirectorsDetails(Request $req){
    
        try{
            $trader_id = $req->trader_id;
            $premise_id = $req->premise_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_proprietors as t1')
                          ->select(DB::raw("t1.*,t1.name as director_full_name,t1.telephone_no as director_telephone_no,t1.email_address as director_email_address"))
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;
                       // $registration_no = $rec->registration_no;
                        

                    $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');
                             $data[] = array('id'=>$rec->id,
                                        'qualification'=>$qualification,
                                        'director_full_name'=>$rec->name,
                                        'director_telephone_no'=>$rec->telephone_no,
                                        'director_email_address'=>$rec->email_address,
                                        'country_id'=>$rec->country_id,
                                        'region_id'=>$rec->region_id,
                                        'shares'=>$rec->shares,
                                        'district_id'=>$rec->district_id,                       
                                        'id'=>$rec->id,
                                        'physical_address'=>$rec->physical_address,
                                        'premise_id'=>$rec->premise_id,
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

public function getDirectorsInformations(Request $req){
    
        try{
            $premise_id = $req->premise_id;
            $trader_id = $req->trader_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_premises_proprietors as t1')
                    ->where(array('t1.trader_id' => $trader_id))
                     ->get();

                     foreach ($records as $rec) {
                             $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$rec->qualification_id,
                                        'name'=>$rec->name,
                                        'telephone_no'=>$rec->telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'country_id'=>$rec->country_id,
                                        'region_id'=>$rec->region_id,
                                        'shares'=>$rec->shares,
                                        'district_id'=>$rec->district_id,                       
                                        'id'=>$rec->id,
                                        'physical_address'=>$rec->physical_address,
                                        'premise_id'=>$rec->premise_id,
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
public function getStaffInformations(Request $req){
    
        try{
            $trader_id = $req->trader_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_premises_staff as t1')
                    ->where(array('t1.trader_id' => $trader_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;
                        
                                                 
                            $data[] = array('id'=>$rec->id,
                                        'qualification_id'=>$rec->qualification_id,
                                        'staff_full_name'=>$rec->staff_full_name,
                                        'staff_telephone_no'=>$rec->staff_telephone_no,
                                        'staff_email_address'=>$rec->staff_email_address,
                                        'country_id'=>$rec->country_id,
                                        'region_id'=>$rec->region_id,
                                        'district_id'=>$rec->district_id,                       
                                        'id'=>$rec->id,
                                        'postal_address'=>$rec->postal_address,
                                        'postal_code'=>$rec->postal_code,
                                        'trader_id'=>$rec->trader_id,
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
public function getPremisesStaffDetails(Request $req){
    
        try{
            $premise_id = $req->premise_id;
            $data = array();
            $records = DB::table('wb_premises_staff as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();

                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;                        

                       $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,'mis_db');

                       
                            $data[] = array('id'=>$rec->id,
                                        'staff_full_name'=>$rec->staff_full_name,
                                        'qualification'=>$qualification,
                                        'country_id'=>$rec->country_id,
                                        'region_id'=>$rec->region_id,
                                        'district_id'=>$rec->district_id,
                                        'staff_telephone_no'=>$rec->staff_telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'staff_email_address'=>$rec->staff_email_address,
                                        'postal_code'=>$rec->postal_code,
                                        'id'=>$rec->id,
                                        'postal_address'=>$rec->postal_address,
                                        'premise_id'=>$rec->premise_id,
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

//getPremisesAmmendementsRequest
public function getPremisesAmmendementsRequest(Request $req){
                try{
                    $premise_id = $req->premise_id;
                    $data = array();
                    //get the records 
                    $records = DB::table('wb_premises_ammendmentrequest as t1')
                            ->where(array('t1.premise_id' => $premise_id))
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
    
}public function getBusinessTypeDetails(Request $req){
    try{
        $business_type_id = $req->business_type_id;
        $data = array();
        //get the records 
        $records = DB::connection('mis_db')->table('par_business_types as t1')
                ->select(DB::raw('t1.*'))
                 ->get();
                 
                 $res = array('success'=>true, 'data'=>$records);
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
        $premise_id = $req->premise_id;
        $table_name = $req->table_name;
        $title = $req->title;
        $email_address = $req->email_address;
        $data = array();
        //get the records 
        $resp = false;
        $where_state = array('premise_id' => $premise_id, 'id'=>$record_id);
        $records = DB::table($table_name)
                ->where($where_state)
                 ->get();
        if(count($records) >0){
                //delete functionality
                
                $previous_data = getPreviousRecords($table_name, $where_state);
                         
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

public function onNewPremisesApplicationSubmit(Request $req){
    try{
        $tracking_no = $req->tracking_no;
        $premise_id = $req->premise_id;
        $status_id = $req->status_id;
        $trader_id = $req->trader_id;
        $remarks = $req->remarks;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'wb_premises_applications';
        $resp = false;
        $where_state = array('premise_id' => $premise_id, 'tracking_no'=>$tracking_no);
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
            $res = array('success'=>true, 'message'=>'Premises Application has been submitted Successfully for processing.');

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

//getApplicationsCounter
public function getPremisesCounterDetails(Request $req){
    //the statuses
    try{
        $trader_id = $req->trader_id;
        
        $data = array();
        //get the records 
        $resp = false;
        $table_name = 'wb_premises_applications as t1';
        $where_state = array('trader_id' => $trader_id);
        $records = DB::table($table_name)
                ->select(DB::raw("count(application_status_id) as application_counter,t2.name as status_name, t2.id as status_id"))
                ->join('wb_statuses as t2','t1.application_status_id','=','t2.id')
                ->where($where_state)
                 ->groupBy('t2.id')
                 ->get();
        if(count($records) >0){
                //delete functionality
                $res = array('success'=>true, 'data'=>$records);
        }else{
            $res = array('success'=>true, 'data'=>$data);
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
public function getNearestPremises(Request $req)
{
    try {
        $trader_id = $req->mistrader_id;
        $premise_id=$req->premise_id;
        $take = $req->take;
        $skip = $req->skip;
        $searchValue = $req->searchValue;
        $search_value = '';


        if($req->searchValue != 'undefined' && $searchValue != ''){
            $searchValue = explode(',',$searchValue);
            $search_value =  $searchValue[2];
        }    

        $rec = DB::table('wb_premises_applications as t1')
                        ->join('wb_premises as t2','t1.premise_id','=','t2.id')
                        ->where(array('t1.premise_id' => $premise_id))
                        ->first();
        $module_id = $rec->module_id;
        $sub_module_id = $rec->sub_module_id;             
        $business_type_id = $rec->business_type_id;


        if($sub_module_id == 108){
            $record = DB::table('wb_premises_externalstore as t1')
                        ->join('wb_premises as t2','t1.premise_id','=','t2.id')
                        ->where(array('t1.premise_id' => $premise_id))
                        ->first();
            if($record ){

                $latitude = $record->latitude; 
                $longitude = $record->longitude;
            }

        }else{

            $latitude = $rec->latitude; 
            $longitude = $rec->longitude;
        }

            $validity_status = $req->validity_status;
            $registration_status = $req->registration_status;

            $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t1.id as premise_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*, t2.permit_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereIn('t2.appvalidity_status_id', array(2, 4));

                if (validateIsNumeric($validity_status)) {
                  $data =  $data->where('t4.validity_status', $validity_status);
                }
                if (validateIsNumeric($registration_status)) {
                    $data = $data->where('t4.registration_status', $registration_status);
                }
                if (validateIsNumeric($rec->region_id)) {
                   $data->where('t1.region_id', $rec->region_id);
                }
                if (validateIsNumeric($rec->district_id)) {
                    //$data->where('t1.district_id', $rec->district_id); 
                }

                if (validateIsNumeric($trader_id)){
                   // $data = $data->where(array('t2.appregistration_status_id'=>2,'t6.applicant_id'=> $trader_id));
                    //$data = $data->where(array('t6.applicant_id'=> $trader_id));
                }

        if ($search_value != '') {
            $whereClauses = array();
            $whereClauses[] = "t3.name  like '%" . ($search_value) . "%'";
            $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";
            $filter_string = implode(' OR ', $whereClauses);
            $data->whereRAW($filter_string);
        }

        
        if($sub_module_id == 109){

        $records = DB::table('wb_premises_relocation as t1')
                ->join('wb_premises as t2','t1.premise_id','=','t2.id')
                ->where(array('t1.premise_id' => $premise_id))
                ->first();
           if($records) {
            $proposed_latitude = $records->proposed_latitude;
            $proposed_longitude = $records->proposed_longitude;
           } 

        //  $data->selectRaw(
        //     "(6371 * acos(cos(radians($proposed_latitude)) * cos(radians(t1.latitude)) * cos(radians(t1.longitude) - radians($proposed_longitude)) + sin(radians($proposed_latitude)) * sin(radians(t1.latitude))))  * 1000  as distance"
        // );  
        }
        // $data->selectRaw(
        //     "(6371 * acos(cos(radians($latitude)) * cos(radians(t1.latitude)) * cos(radians(t1.longitude) - radians($longitude)) + sin(radians($latitude)) * sin(radians(t1.latitude)))) * 1000 as distance"
        // );

        // $data->orderBy('distance')->groupBy('t4.tra_premise_id')
        // ->where('t6.module_id',$module_id)->where('t1.business_type_id',$business_type_id);

        $data->groupBy('t4.tra_premise_id')
        ->where('t6.module_id',$module_id)->where('t1.business_type_id',$business_type_id);

        $nearestPremises = $data->take(7)->get();
        $nearestPremiseNames = $nearestPremises->pluck('premises_name')->toArray();

        if (validateIsNumeric($take)) {
            $records = $data->skip($skip)->take($take)->get();
        } else {
            $records = $data->get();
        }

        $res = array(
            'success' => true,
            'nearestPremises' => $nearestPremiseNames,
            'data' => $records,
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
public function getNearestDrugShops(Request $req)
{
    try {
        $trader_id = $req->mistrader_id;
        $premise_id=$req->premise_id;
        $take = $req->take;
        $skip = $req->skip;
        $searchValue = $req->searchValue;
        $search_value = '';
        $module_id=29;
        if($req->searchValue != 'undefined' && $searchValue != ''){
            $searchValue = explode(',',$searchValue);
            $search_value =  $searchValue[2];
        }                   

         $rec = DB::table('wb_premises_applications as t1')
                            ->join('wb_premises as t2','t1.premise_id','=','t2.id')
                            ->where(array('t1.premise_id' => $premise_id))
                             ->first();
           if($rec) {
            $latitude = $rec->latitude; 
            $longitude = $rec->longitude;
           }                 

            $validity_status = $req->validity_status;
            $registration_status = $req->registration_status;

            $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t1.id,t1.id as premise_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*, t2.permit_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereIn('t2.appvalidity_status_id', array(2, 4));

                if (validateIsNumeric($validity_status)) {
                  $data =  $data->where('t4.validity_status', $validity_status);
                }
                if (validateIsNumeric($registration_status)) {
                    $data = $data->where('t4.registration_status', $registration_status);
                }
                if (validateIsNumeric($trader_id)){
                   // $data = $data->where(array('t2.appregistration_status_id'=>2,'t6.applicant_id'=> $trader_id));
                    //$data = $data->where(array('t6.applicant_id'=> $trader_id));
                }
        if ($search_value != '') {
            $whereClauses = array();
            $whereClauses[] = "t3.name  like '%" . ($search_value) . "%'";
            $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";
            $filter_string = implode(' OR ', $whereClauses);
            $data->whereRAW($filter_string);
        }

        $totalCount = $data->count();
        
        // $data->selectRaw(
        //     "(6371 * acos(cos(radians($latitude)) * cos(radians(t1.latitude)) * cos(radians(t1.longitude) - radians($longitude)) + sin(radians($latitude)) * sin(radians(t1.latitude)))) AS distance"
        // );

        $data->orderBy('distance')->groupBy('t6.premise_id')->where('t6.module_id',$module_id);
        $nearestPremises = $data->take(7)->get();
        $nearestPremiseNames = $nearestPremises->pluck('premises_name')->toArray();

        if (validateIsNumeric($take)) {
            $records = $data->skip($skip)->take($take)->get();
        } else {
            $records = $data->get();
        }

        $res = array(
            'success' => true,
            'nearestPremises' => $nearestPremiseNames,
            'data' => $records,
            'totalCount' => $totalCount
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
public function getTradersRegisteredPremises(Request $req){
    try{
        $trader_id = $req->mistrader_id;
        $business_type_id = $req->business_type_id;
        $take = $req->take;
        $module_id=2;
        $skip = $req->skip;
        $searchValue = $req->searchValue;
        $search_value =  '';
        if($req->searchValue != 'undefined' && $searchValue != ''){
            $searchValue = explode(',',$searchValue);
            $search_value =  $searchValue[2];
        }
       
       $validity_status = $req->validity_status;
       $registration_status = $req->registration_status;
        $sub_module_id = $req->sub_module_id;
        if($sub_module_id == 108){
            $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('tra_pharmacist_personnel as t9','t1.pharmacist_id','=','t9.id')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t6.application_code,t1.id as premise_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*, t2.permit_no as premise_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t6.reference_no,t3.contact_person, t3.tin_no,t9.psu_no,t9.name as full_names,t9.country_id as pharmacist_country_id,t9.region_id as pharmacist_region_id,t9.district_id as pharmacist_district_id,t9.telephone as pharmacist_telephone,t9.email as pharmacist_email,t9.qualification_id as pharmacist_qualification,t9.psu_date,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereNotIn('t6.sub_module_id',array(89))->whereIn('t1.business_type_id',array(1))->whereIn('t2.appvalidity_status_id', array(2, 4));
        }else if($sub_module_id == 1){
            $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('tra_pharmacist_personnel as t9','t1.pharmacist_id','=','t9.id')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t6.application_code,t1.id as premise_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*, t2.permit_no as premise_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name,t6.reference_no, t3.contact_person, t3.tin_no,t9.psu_no,t9.name as full_names,t9.country_id as pharmacist_country_id,t9.region_id as pharmacist_region_id,t9.district_id as pharmacist_district_id,t9.telephone as pharmacist_telephone,t9.email as pharmacist_email,t9.qualification_id as pharmacist_qualification,t9.psu_date,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereIn('t6.sub_module_id',array(89))->whereIn('t2.appvalidity_status_id', array(2, 4));

        }else {
            $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('tra_pharmacist_personnel as t9','t1.pharmacist_id','=','t9.id')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t6.application_code,t1.id as premise_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*, t2.permit_no as premise_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t6.reference_no, t3.contact_person, t3.tin_no,t9.psu_no,t9.name as full_names,t9.country_id as pharmacist_country_id,t9.region_id as pharmacist_region_id,t9.district_id as pharmacist_district_id,t9.telephone as pharmacist_telephone,t9.email as pharmacist_email,t9.qualification_id as pharmacist_qualification,t9.psu_date,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereNotIn('t6.sub_module_id',array(89,97,96))->whereIn('t2.appvalidity_status_id', array(2, 4));              

        }


                if (validateIsNumeric($validity_status)) {
                  $data =  $data->where('t4.validity_status', $validity_status);
               
            
                }
                if (validateIsNumeric($registration_status)) {
                    $data = $data->where('t4.registration_status', $registration_status);
                }
                if (validateIsNumeric($trader_id)){
                   // $data = $data->where(array('t2.appregistration_status_id'=>2,'t6.applicant_id'=> $trader_id));
                    //$data = $data->where(array('t6.applicant_id'=> $trader_id));
                }
                if($search_value != ''){
                    $whereClauses = array();
                    $whereClauses[] = "t2.permit_no like '%" . ($search_value) . "%'";
                     $whereClauses[] = "t1.premise_reg_no like '%" . ($search_value) . "%'";
                    
                    $whereClauses[] = "t3.name  like '%" . ($search_value) . "%'";
                    $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";
                    $filter_string = implode(' OR ', $whereClauses);
                    $data->whereRAW($filter_string);
                }

        
            $totalCount = $data->count();

        $data->orderBy('t6.id', 'desc')->where('t6.module_id',$module_id)->groupBy('t6.application_code');

            if(validateIsNumeric($take)){
                $records = $data->skip($skip)->take($take)->get();
            }
            else{
                $records = $data->get();
        
            }
        $res = array('success'=>true, 'data'=>$records,'totalCount'=>$totalCount );

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

function generatePremisesReinspectionTrackingno($reference_no,$application_code,$table_name,$sub_module_id){
            $where = array('application_code'=>$application_code,'sub_module_id'=>$sub_module_id);

            $count = DB::connection('mis_db')->table($table_name)->where($where)->count();
            if($count > 0){

                    $count = 1;

            }else{

                $count =  1;
            }
            return $reference_no.'/RINS-'.$count;
        }
public function IntiateREinspectionResponseProcesses(Request $req){
    try{
            $application_code = $req->application_code;
            $table_name = 'tra_premises_applications';
            $where = array('application_code'=>$application_code);
            
            $application_status_id = 52;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $trader_id = $req->trader_id;
            $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

            if($rec){
                    //update the record >tra_importexport_applications generateapplication_code
                    $section_id = $rec->section_id;
                    $sub_module_id = $rec->sub_module_id;
                    //$registered_id = $rec->registered_id; premises_name app_data
                    $premise_type_id = $rec->premise_type_id;
                    $process_id = $rec->process_id;
                    $premise_id = $rec->premise_id;
                    $prem_rec = DB::connection('mis_db')->table('tra_premises')->where(array('id'=>$premise_id))->first();

                    $record = DB::table('wb_premises_applications')
                                        ->where(array('prev_application_code'=>$application_code, 'application_status_id'=>$application_status_id))
                                        ->first();
                                        
                    if(!$record && $application_code != 0){
                        
                        $reference_no = $rec->reference_no;
                        $process_id = $rec->process_id;
                        
                        
                       $premises_infor = array('name'=>$prem_rec->premises_name,
                                    'country_id'=>$prem_rec->country_id,
                                    'section_id'=>$section_id,

                                    'premise_type_id'=>$premise_type_id,
                                    'vehicle_reg_no'=>$vehicle_reg_no,

                                    'region_id'=>$prem_rec->region_id,
                                    'district_id'=>$prem_rec->district_id,
                                    'investment_capital'=>$prem_rec->investment_capital,
                                    'investment_capital_currency_id'=>$prem_rec->investment_capital_currency_id,
                                    
                                    'managing_director_email'=>$prem_rec->managing_director_email,
                                    'managing_director_telepone'=>$prem_rec->managing_director_telepone,
                                    'managing_director'=>$prem_rec->managing_director,
                                    'email'=>$prem_rec->email,
                                    'postal_address'=>$prem_rec->postal_address,
                                    'telephone'=>$prem_rec->telephone,
                                    'code_no'=>$prem_rec->code_no,
                                    'mobile_no'=>$prem_rec->mobile_no,
                                    'business_type_id'=>$business_type_id,
                                    'physical_address'=>$prem_rec->physical_address,
                                    'longitude'=>$prem_rec->longitude,
                                    'latitude'=>$prem_rec->latitude,
                                    'business_scale_id'=>$prem_rec->business_scale_id,
                                    'business_category_id'=>$prem_rec->business_category_id,
                                    'cell_id'=>$prem_rec->cell_id,
                                    'village'=>$prem_rec->village,
                                    'contact_person'=>$prem_rec->contact_person,
                                    'contact_person_email'=>$prem_rec->contact_person_email,
                                    'contact_person_enddate'=>$prem_rec->contact_person_enddate,
                                    'contact_person_telephone'=>$prem_rec->contact_person_telephone,
                                    'sector_id'=>$prem_rec->sector_id,
                                    'tpin_no'=>$prem_rec->tpin_no,
                                     'company_registration_no'=>$prem_rec->company_registration_no,
                                    
                                    'contact_person_id'=>$prem_rec->contact_person_id,
                                    'contact_person_startdate'=>$prem_rec->contact_person_startdate,
                                    'contact_person_enddate'=>$prem_rec->contact_person_enddate,
                                    'applicant_contact_person'=>$prem_rec->applicant_contact_person
                                ); 
                           $premises_infor['created_on'] = Carbon::now();
                            $premises_infor['created_by'] = $trader_email;
                                
                            $resp = insertRecord('wb_premises', $premises_infor, $trader_email);
                             $generatepremise_id = $resp['record_id'];
                        
                           
                            $reference_no = $this->generatePremisesReinspectionTrackingno($reference_no,$application_code,$table_name,$sub_module_id);

                            $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_premises_applications');
                             $app_data = array('trader_id'=>$rec->applicant_id,
                                            'sub_module_id'=>$rec->sub_module_id, 'section_id'=>$rec->section_id,
                                            'module_id'=>$rec->module_id,
                                           
                                            'zone_id'=>$rec->zone_id,
                                        'premise_type_id'=>$rec->premise_type_id,
                                            'is_fast_track'=>$rec->is_fast_track,
                                            'paying_currency_id'=>$rec->paying_currency_id,
                                            'date_added'=>Carbon::now(),
                                            'created_by'=>$trader_email,
                                            'created_on'=>Carbon::now()
                                );
                            $app_data['process_id'] = $process_id;
                            $app_data['reference_no'] = $reference_no;
                            $app_data['tracking_no'] = $reference_no;
                            $app_data['application_code'] = $generateapplication_code;
                            $app_data['prev_application_code'] = $application_code;
                            $app_data['application_status_id'] = $application_status_id;
                             $app_data['premise_id'] = $generatepremise_id;
                            
                            $resp = insertRecord('wb_premises_applications', $app_data, $trader_email);
                            if($resp['success']){
                                
                                    saveApplicationSubmissionDetails($generateapplication_code,'wb_premises_applications');  
                                    $res =$this->savePremisesOtherDetails($generatepremise_id,$premise_id,$trader_email);
                                    
                                    $res =$this->savePremisesPersonneldetails($generatepremise_id,$premise_id,$trader_email);
                                    
                                    $res =$this->savePremisesDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    
                                    $res =$this->savePremisesReinspectionRequest($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    
                            }
                            $sub_data = $this->getpremisesAppDetails('',$generateapplication_code);
                            $res = array('success'=>true, 
                                    'data'=>$sub_data,
                                    'message'=>'Permit Application status updated successfully');


                    }
                    else{
                                $res = array('success'=>false, 
                                'message'=>'There is a Pending Request for Permit Amendment that has not been submitted, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
                    }


            }else{

                $res = array('success'=>false, 
                              'message'=>'Permit Application do no exists, contact the authority for clarification');

            }

    }
    catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
    }
     return response()->json($res, 200);
}
public function savePremisesOtherDetails($generatepremise_id,$premise_id,$trader_email){
    $record = DB::connection('mis_db')->table('tra_premises_otherdetails')->where(array('premise_id'=>$premise_id))->get();
    $res = '';
    
    foreach($record as $rec){
        $data = array('premise_id'=>$generatepremise_id, 
                      'business_type_detail_id'=>$rec->business_type_detail_id,
                      'business_type_id'=>$rec->business_type_id,
                      'product_category_id'=>$rec->product_category_id,
                                    'product_subcategory_id'=>$rec->product_subcategory_id,
                                    'product_details'=>$rec->product_details,
                      'created_on'=>Carbon::now());
                        
        $res = insertRecord('wb_premises_otherdetails', $data, $trader_email);
    }

}
public function savePremisesPersonneldetails ($generatepremise_id,$premise_id,$trader_email){
    $record = DB::connection('mis_db')->table('tra_premises_personnel')->where(array('premise_id'=>$premise_id))->get();
    $res = '';
    
    foreach($record as $rec){
        $data = array('premise_id'=>$generatepremise_id, 
                     'personnel_name'=>$rec->personnel_name,
                                        'telephone_no'=>$rec->telephone_no,
                                        'email_address'=>$rec->email_address,
                                        'qualification_id'=>$rec->qualification_id,
                                       
                                        'study_field'=>$rec->study_field,
                                        'registration_no'=>$rec->registration_no,
                                        'professional_board'=>$rec->professional_board,
                                        'institution'=>$rec->institution,
                      'position_id'=>$rec->position_id,
                      'registration_no'=>$rec->registration_no,
                      'study_field_id'=>$rec->study_field_id,
                      'status_id'=>$rec->status_id,
                      'end_date'=>$rec->end_date,
                      'created_on'=>Carbon::now());
                        
        $res = insertRecord('wb_premises_personnel', $data, $trader_email);
    }
}

public function savePremisesDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id){
        $record = DB::connection('mis_db')->table('tra_application_uploadeddocuments')
                                ->where(array('application_code'=>$application_code))
                                ->get();

        foreach($record as $rec){
                $document_data = array('application_code'=>$generateapplication_code,
                                'document_requirement_id'=>$rec->document_requirement_id,
                                'uploaded_on'=>Carbon::now(),
                                'traderuploadby_id'=>$rec->traderuploadby_id,
                                'file_name'=>$rec->file_name,
                                'initial_file_name'=>$rec->initial_file_name,
                                'file_type'=>$rec->file_type,
                                'fileSize'=>$rec->fileSize,
                                'node_ref'=>$rec->node_ref,
                                'dola'=>Carbon::now(),
                                'altered_by'=>$rec->traderuploadby_id,
                                'dc_module_id'=>$rec->dc_module_id,
                                'dc_sub_module_id'=>$rec->dc_sub_module_id,
                                'portalapp_variationsdata_id'=>$rec->portalapp_variationsdata_id,
                                'is_synched'=>1
                );
                $res = insertRecord('tra_application_uploadeddocuments', $document_data, 0,'mis_db');
                
        }

}
public function savePremisesReinspectionRequest($generateapplication_code,$application_code,$trader_email,$sub_module_id){
        $record = DB::connection('mis_db')->table('tra_appreinspectionrequest_reftracker')
                                ->where(array('application_code'=>$application_code))
                                ->get();

        foreach($record as $rec){
            $prev_query_id = $rec->id;
                $document_data = array('application_code'=>$generateapplication_code,
                                'application_id'=>$rec->application_id,
                                'table_name'=>$rec->table_name,
                                'query_ref'=>$rec->query_ref,
                                'query_remark'=>$rec->query_remark,
                                'query_type_id'=>$rec->query_type_id,
                                'query_processstage_id'=>$rec->query_processstage_id,
                                'is_live_signature'=>$rec->is_live_signature,
                                'dola'=>Carbon::now(),
                                'comments'=>$rec->comments
                );
                $res = insertRecord('tra_appreinspectionrequest_reftracker', $document_data, 0,'mis_db');
                $query_id = $res['record_id'];
                $query_records = DB::connection('mis_db')->table('reinspectiontitems_queries')
                                ->where(array('query_id'=>$prev_query_id))
                                ->get();
                                
                         foreach($query_records as $query_record){
                                $dquery_data = array('query_id'=>$query_id,
                                                'query'=>$query_record->query,
                                                'comment'=>$query_record->comment,
                                                'query_response'=>$query_record->query_response,
                                                'status'=>$query_record->status,
                                                'reference_section'=>$query_record->reference_section,
                                                'application_code'=>$generateapplication_code,
                                                'checklist_item_id'=>$query_record->checklist_item_id,
                                                'created_on'=>Carbon::now()
                                );
                                 $res = insertRecord('reinspectiontitems_queries', $dquery_data, 0,'mis_db');
                         }
        }

}
public function getTradersRegisteredDrugShops(Request $req){
    try{
        $trader_id = $req->mistrader_id;
        $take = $req->take;
        $skip = $req->skip;
        $searchValue = $req->searchValue;
        $search_value =  '';
        if($req->searchValue != 'undefined' && $searchValue != ''){
            $searchValue = explode(',',$searchValue);
            $search_value =  $searchValue[2];
        }
       $module_id = 29;
       $validity_status = $req->validity_status;
       $registration_status = $req->registration_status; 
       $sub_module_id = $req->sub_module_id;
       if($sub_module_id == 96){
                $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('tra_premise_incharge_personnel as t9','t1.incharge_id','=','t9.id')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_premise_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t1.id as premise_id,t6.reference_no,t6.module_id,t6.sub_module_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*,t9.nin_no,t9.name as fullname,t9.country_id as incharge_country_id,t9.region_id as incharge_region_id,t9.district_id as incharge_district_id,t9.telephone as incharge_telephone,t9.email as incharge_email,t9.qualification_id as incharge_qualification,t2.permit_no as premise_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereIn('t6.sub_module_id',array(97))->whereIn('t2.appvalidity_status_id', array(2, 4));//change to status
            
       }else{
                $data = DB::connection('mis_db')->table('tra_premises_applications as t6')
                ->join('tra_premises as t1', 't6.premise_id', '=', 't1.id')
                ->join('tra_approval_recommendations as t2', 't6.application_code', '=', 't2.application_code')
                ->leftjoin('tra_premise_incharge_personnel as t9','t1.incharge_id','=','t9.id')
                ->join('wb_trader_account as t3', 't6.applicant_id', '=', 't3.id')
                ->leftJoin('registered_premises as t4', 't1.id', '=', 't4.tra_premise_id')
                ->leftJoin('par_validity_statuses as t5', 't2.appvalidity_status_id', '=', 't5.id')
                
                ->leftJoin('par_premise_regions as t7', 't1.region_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't2.appregistration_status_id', '=', 't8.id')
                ->select(DB::raw(" DISTINCT t4.tra_premise_id,t1.id as premise_id,t6.reference_no,t6.module_id,t6.sub_module_id, t1.name as manufacturing_site_name,t1.name as premises_name, t1.*,t9.nin_no,t9.name as fullname,t9.country_id as incharge_country_id,t9.region_id as incharge_region_id,t9.district_id as incharge_district_id,t9.telephone as incharge_telephone,t9.email as incharge_email,t9.qualification_id as incharge_qualification,t2.permit_no as premise_no, t3.name as applicant_name,t4.id as registered_id,
                    t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t7.name as region_name,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,validity_status as validity_status_id,t8.name as registration_status,
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->whereIn('t6.sub_module_id',array(96,110,111))->whereIn('t2.appvalidity_status_id', array(2, 4));//change to status
       }

                if (validateIsNumeric($validity_status)) {
                  $data =  $data->where('t4.validity_status', $validity_status);
                }
                if (validateIsNumeric($registration_status)) {
                    $data = $data->where('t4.registration_status', $registration_status);
                }
                if (validateIsNumeric($trader_id)){
                   // $data = $data->where(array('t2.appregistration_status_id'=>2,'t6.applicant_id'=> $trader_id));
                    //$data = $data->where(array('t6.applicant_id'=> $trader_id));
                }
                if($search_value != ''){
                    $whereClauses = array();
                    $whereClauses[] = "t2.permit_no like '%" . ($search_value) . "%'";
                     $whereClauses[] = "t1.premise_reg_no like '%" . ($search_value) . "%'";
                    
                    $whereClauses[] = "t3.name  like '%" . ($search_value) . "%'";
                    $whereClauses[] = "t1.name  like '%" . ($search_value) . "%'";
                    $filter_string = implode(' OR ', $whereClauses);
                    $data->whereRAW($filter_string);
                }               


            $data = $data->limit(50);
            $totalCount = $data->count();

            $data->orderBy('t6.id', 'desc')
                ->where('t6.module_id',$module_id)
               ->groupBy('t6.application_code');
        

            if(validateIsNumeric($take)){
                $records = $data->skip($skip)->take($take)->get();

            }
            else{
                $records = $data->get();
            }
        $res = array('success'=>true, 'data'=>$records,'totalCount'=>$totalCount );

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
