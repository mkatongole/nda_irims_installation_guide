<?php
namespace Modules\ImportExportApp\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ImportexportpermitsTraits
{
    public function getImportExpApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code', 'mis_db');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code', 'mis_db');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code', 'mis_db');

        $import_typecategory_code = getSingleRecordColValue('par_permit_typecategories', array('id' => $application_details->import_typecategory_id), 'code', 'mis_db');
       
        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'apptype_code' => $submodule_code
        );  
        return $codes_array;
        
    }
    public function getDisposalpApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code', 'mis_db');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code', 'mis_db');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code', 'mis_db');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'submodule_code' => $submodule_code
        );  
              
        return $codes_array;
    }
    function funcImpApplicationSubmission($application_code,$sub_module_id,$module_id,$request,$view_id){
        // DB::beginTransaction();
         try {
           $user_id = 0;
          $applications_table = 'tra_importexport_applications';
             $app_previousdata = DB::connection('mis_db')->table($applications_table)
                                         ->where('application_code',$application_code)
                                         ->first();

                                        
                                         $qry = DB::table('wb_importexport_applications as t1')
                                              ->select('t1.*')
                                              ->where('t1.application_code', $application_code);
                                         $results = $qry->first();


                                            
                                         if (is_null($results)) {
                                             $res = array(
                                                 'success' => false,
                                                 'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                             );
                                             return $res;
                                         }
                                         //application_insert
                                         $tracking_no = $results->tracking_no;
                                         $sub_module_id = $results->sub_module_id;
                                         $module_id = $results->module_id;
                                         $zone_id = $results->zone_id;
                                         $section_id = $results->section_id;
                                        $process_id = $results->process_id;
                                        $applicant_id = $results->trader_id;
                                       
                                         $portal_application_id = $results->id;

                                         if($module_id==4 && $sub_module_id == 81|| $module_id===4 && $sub_module_id ===81){
                                            $where = array(
                                                't1.module_id' => $results->module_id,  
                                                 't1.sub_module_id' => $results->sub_module_id,
                                                 't1.importexport_permittype_id' => $results->licence_type_id,
                                                 't1.importexport_applicationtype_id' => $results->has_registered_premises
                                                 );
                    
                                         }else if($module_id==4 && $sub_module_id==12 || $module_id===4 && $sub_module_id===12){
                                                    $where = array(
                                                        't1.module_id' => $results->module_id,  
                                                         't1.sub_module_id' => $results->sub_module_id,
                                                         't1.port_id' => $results->port_id,
                             't1.importexport_applicationtype_id' => $results->has_registered_premises
                                                         );

                                                 }else if($module_id==4 && $sub_module_id==115 || $module_id===4 && $sub_module_id===115){
                                                     $where = array(
                                                      't1.module_id' => $results->module_id,  
                                                      't1.sub_module_id' => $results->sub_module_id,
                                                      't1.port_id' => $results->port_id,
                                                      't1.importexport_applicationtype_id' => $results->has_registered_premises
                                                         );


                                               }else if($module_id==4 && $sub_module_id==49 || $module_id===4 && $ub_module_id===49){
                        $where = array(
                            't1.module_id' => $results->module_id,  
                             't1.sub_module_id' => $results->sub_module_id,
                             't1.port_id' => $results->port_id,
                             );


                     } else{
                                                     $where = array(
                                                 't1.module_id' => $results->module_id,
                                                 't1.sub_module_id' => $results->sub_module_id
                                                 //'t1.section_id' => $records->section_id
                                                 );
                                         }
                                       
                                         $application_status = $this->getApplicationInitialStatus($module_id, $sub_module_id);
                          $app_status = $this->getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                         $app_status_id = $app_status->status_id;
 
                                 $application_details = array(
                                     'application_code' => $results->application_code,
                                     'tracking_no' => $results->tracking_no, 
                                     'reference_no' => $results->reference_no, 
                                     'applicant_id' => $applicant_id,
                                     'view_id' => $view_id,
                                     'date_added' => Carbon::now(),
                                     'submission_date'=>$results->submission_date,
                                      'mode_oftransport_id' => $results->mode_oftransport_id,
                                       
                                     'sub_module_id' => $sub_module_id,
                                     'module_id' => $module_id,
                                     'section_id' => $results->section_id,
                                     'permit_category_id' => $results->permit_category_id,
                                     'import_typecategory_id' => $results->import_typecategory_id,
                                     
                
                                     
                                     'eligible_importersdoctype_id' => $results->eligible_importersdoctype_id,
                                     'eligible_importerscategory_id' => $results->eligible_importerscategory_id,
                                     'document_upload_id' => $results->document_upload_id,
                                     'product_classification_id'=>$results->product_classification_id,

                                    'has_registered_premises' =>$results->has_registered_premises,
                                    'licence_type_id' => $results->licence_type_id,
                                    'shipment_date'=>$results->shipment_date,

                                    'vc_application_type_id' => $results->vc_application_type_id,
                                     'importation_reason_id' => $results->importation_reason_id,
                                    'product_category_id' => $results->product_category_id,
                                    'entry_country_id' =>$results->entry_country_id,
                                    'port_of_exit_from_country_of_origin' =>$results->port_of_exit_from_country_of_origin,
                                    'importer_licence_number' => $results->importer_licence_number,
                                    'applicant_contact_person' =>$results->applicant_contact_person,
                                    'contact_person_id' => $results->contact_person_id,
                                    'applicant_as_consignee' =>$results->applicant_as_consignee,

                                     'business_type_id'=>$results->business_type_id,
                                     'is_registered'=>$results->is_registered,
                                       
                                     'reason_fornonregister_outlet' => $results->reason_fornonregister_outlet,
                                     'permit_productscategory_id' => $results->permit_productscategory_id,
                                     'permit_reason_id' => $results->permit_reason_id,
                                     'proforma_invoice_no' => $results->proforma_invoice_no,
                                     'proforma_invoice_date' => $results->proforma_invoice_date,
                                     'premise_id' => $results->premise_id,
                                     'tpin_id' => $results->tpin_id,
                                     'psu_no' => $results->psu_no,
                                     'paying_currency_id' => $results->paying_currency_id,
                                     'sender_receiver_id' => $results->sender_receiver_id,
                                     'zone_id' => $results->zone_id,
                                      'port_id' => $results->port_id,
                                     
                                     'application_status_id' => $results->application_status_id,
                                      'consignee_options_id' => $results->consignee_options_id,
                                      'consignee_id' => $results->consignee_id,
                                      'consignee_name' =>$results->consignee_name,
                                     'process_id' => $process_id,
                                     'application_status_id' => $app_status_id,
                                     'portal_id' => $portal_application_id,
                                     'created_on' => Carbon::now(),
                                     'created_by'=>$user_id
                                 ); 



         

                                 if($sub_module_id == 49 || $sub_module_id == 84){

                                     $application_details['custom_declaration_no'] =  $results->custom_declaration_no;
                                      $application_details['clearing_agent'] =  $results->clearing_agent;
                                      $application_details['proposed_inspection_date'] =  $results->proposed_inspection_date;
                                 //	$application_details['proposed_inspection_date'] =  $results->proposed_inspection_date;
                                     $application_details['shipment_date'] =  $results->shipment_date;
                                     $application_details['clearing_agent_no']=$results->clearing_agent_no;
                                     $application_details['clearing_agent_email']=$results->clearing_agent_email;
                                     $application_details['clearing_agent_firm']=$results->clearing_agent_firm;
                                     $application_details['mode_oftransport_id']=$results->mode_oftransport_id;
                                     $application_details['port_id']=$results->port_id;
                                     $application_details['proforma_invoice_no']=$results->proforma_invoice_no;
                                     $application_details['proforma_invoice_date']=$results->proforma_invoice_date;
                                     $application_details['package_no']=$results->package_no;
                                     $application_details['technical_declaration_id']=$results->technical_declaration_id;
                                     $application_details['declaration_application_code']=$results->declaration_application_code;


                                     
                                 }

                     if(!is_null($app_previousdata)){   
                          $this->funcSaveOnlineImportExportOtherdetails($application_code, $user_id);
                         
                         $app_status_id = '';
                         
                         $reference_no = '';
                         if($sub_module_id == 78 || $sub_module_id == 79){
                             $reference_no = $results->tracking_no;
                         }
                         
                         $where_data = array('application_code'=>$application_code);

                            
                              $previousdata = getPreviousRecords($applications_table, $where_data, 'mis_db');
                             
                              $app_previousdata = $previousdata['results'][0];
                              $mis_application_id = $app_previousdata['id'];
                              $reference_no = $app_previousdata['reference_no'];
                              
                             $application_insert =  updateRecord($applications_table, $previousdata, $where_data, $application_details, $user_id, 'mis_db');
     
                         if ($application_insert['success'] == false) {
                             DB::rollBack();
                             //application_insert identification_no
                             return $application_insert;
                         }
                         
                         $portal_params = array(
                             'application_status_id' => 3
                         );
                         $portal_where = array(
                             'application_code' => $application_code
                         );
                         $this->updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                         $portal_params = array(
                                 'reference_no' => $reference_no,
                                 'application_id'=>$mis_application_id
                             );
                             
                         DB::connection('mis_db')->table('tra_submissions')
                                 ->where('application_code',$application_code)
                                 ->update($portal_params);
                             
                                 
                     }
                     else if(is_null($app_previousdata)){


                         
                         $application_status = $this->getApplicationInitialStatus($module_id, $sub_module_id);

                         
                         $application_code = $results->application_code;;
             
                         $this->funcSaveOnlineImportExportOtherdetails($application_code, $user_id);
                         
                         
                         $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name', 'mis_db');
                         
                         $application_insert = insertRecord('tra_importexport_applications', $application_details, $user_id, 'mis_db');


                         if ($application_insert['success'] == false) {
                             DB::rollBack();
                             return $application_insert;
                         }
                         $application_id = $application_insert['record_id'];
                         $mis_application_id = $application_insert['record_id'];
                         
                         $portal_params = array(
                                 'reference_no' => $reference_no,
                                 'application_id'=>$mis_application_id
                             );
                             
                         DB::connection('mis_db')->table('tra_submissions')
                         ->where('application_code',$application_code)
                         ->update($portal_params);
                         
                         $table_name = 'tra_importexport_applications';
                         
                         $section_id =  $results->section_id;
                          $codes_array = $this->getImportExpApplicationReferenceCodes($results);
                     
                            
                            $portal_params = array(
                                 'reference_no' => $reference_no,
                                 'application_status_id' => 3
                             );
                             $portal_where = array(
                                 'application_code' => $application_code
                             );
                             $this->updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                         
                         //update the submissions table 
                       
                     }else{
                        $res = array('success'=>false, 'message'=>'Application status has not been set, contact the Authority for further guidance..');
                     }
             
                     
             $res = array(
                 'success' => true,
               //  'details' => $details,
                 'message' => 'Application saved successfully in the MIS!!'
             );
         } catch (\Exception $exception) {
             //DB::rollBack();
             $res = array(
                 'success' => false,
                 'message' => $exception->getMessage()
             );
         } catch (\Throwable $throwable) {
           //  DB::rollBack();
             $res = array(
                 'success' => false,
                 'message' => $throwable->getMessage()
             );
         }
                 
         return $res;
     }
	 function funcSaveOnlineImportExportOtherdetails($application_code, $user_id)
    {


		$record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code' => $application_code))->count();
		if($record >0){
			DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code' => $application_code))
            ->delete();
		}
 
           $previous_permitdetails = DB::table('wb_permits_products as t2')

                                       ->select(DB::raw(
                                        "approvedlicense_product_id,proprietary_name,atc_code_id,controlled_substance_id,scheduled_number,convertion_factor,controlled_substance_schedule,controlled_substance_schedule,total_salt_quantity,total_narcotic_units,total_narcotic_base,therapeutic_group,distribution_category,route_of_administarion, atc_desciption,class_category,classification,co_pack,single_fixed_dose,approvedvisa_product_id, is_registered,gmdn_code,gmdn_descriptor,medical_device_class_type,product_registration_no,ingredient_id,specification_type_id,units_for_quantity,name_chemical_reference,name_of_material, material_category, equipment_purpose, si_unit_id, no_of_packs_tertiary, no_of_packs_secondary, no_of_packs,no_of_units, total_units,unit_price, verification_fee_percent, total_value, consignment_quantity,vc_quantity, declaration_quantity, no_of_batches, qty_shipped, approved_qty, unitpack_size, vc_no,declare_product_id, port_id,controlleddrug_base,controlleddrug_baseunit_id,pack_unit,strength_asgrams,drugs_content,gramsbasesiunit_id,controlleddrugs_basesalt_id,controlled_drugssubstances_id,controlleddrugs_type_id,purpose_of_drugsuse,ctrdrugslicense_permits_drugs_id,conversion_unit,product_strength,prodcertificate_no,product_origin_id, manufacturer_name,consignment_quantity,product_batch_no,product_expiry_date,product_manufacturing_date,regulated_prodpermit_id, permitbrand_name, brand_name,common_name_id,dosage_form_id, section_id, unitpack_size,unitpack_unit_id,prodclass_category_id,productphysical_description,product_registration_no,document_upload_id,manufacturer_id,permitcommon_name,is_regulated_product,laboratory_no,container_type_id,product_id,quantity,unit_price,currency_id,application_code,packaging_unit_id,product_packaging,total_weight,weights_units_id,product_category_id,id as portal_id, now() as created_on"
                                    ))
                                     
                            ->where('application_code', $application_code)
                            ->get();



                            $previous_batchdetails = DB::table('wb_batch_permits_products as t2')

                                       ->select(DB::raw(
                                        "product_batch_no,product_expiry_date,batch_qty,product_id,application_code"
                                    ))
                                     
                            ->where('application_code', $application_code)
                            ->get();


            $previous_permitdetails = convertStdClassObjToArray($previous_permitdetails);
            $previous_batchdetails = convertStdClassObjToArray($previous_batchdetails);

                       
            DB::connection('mis_db')->table('tra_permits_products')
             ->insert($previous_permitdetails); 
             DB::connection('mis_db')->table('tra_batch_permits_products')
            ->insert($previous_batchdetails);  

        }
	
	
 function getApplicationInitialStatus($module_id, $sub_module_id)
    {
        $statusDetails = (object)array(
            'status_id' => 0,
            'name' => ''
        );
        $where = array(
            'module_id' => $module_id,
            'sub_module_id' => $sub_module_id
        );
        $results = DB::connection('mis_db')->table('par_application_statuses as t1')
            ->join('par_system_statuses as t2', 't1.status_id', '=', 't2.id')
            ->select('t1.status_id', 't2.name')
            ->where($where)
            ->where('t1.status', 1)
            ->first();

        if (!is_null($results)) {
            $statusDetails = $results;
        }
        return $statusDetails;
    }
	
	public function funcDisposaApplicationSubmission($application_code,$sub_module_id,$module_id,$req,$view_id,$next_stage)
    {
       
        $user_id = 0;

      
        $applications_table = 'tra_disposal_applications';
        DB::beginTransaction();
        try {
            $qry = DB::table('wb_disposal_applications as t1')
            ->select('t1.*')
            ->where('t1.application_code', $application_code);
			$results = $qry->first();

            $app_previousdata = DB::connection('mis_db')->table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
	
                                        if (is_null($results)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $tracking_no = $results->tracking_no;
                                        $sub_module_id = $results->sub_module_id;
                                        $module_id = $results->module_id;
                                        $zone_id = $results->zone_id;
                                        $section_id = $results->section_id;
                                      
                                        $portal_application_id = $results->id;
                                        $where = array(
                                            'module_id' => $results->module_id,
                                            'sub_module_id' => $results->sub_module_id,
                                            'section_id' => $results->section_id
                                        );
                                        $process_details = getTableData('wf_tfdaprocesses', $where, 'mis_db');
                                        if (is_null($process_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $process_id = $process_details->id;
										
                                        $application_status = $this->getApplicationInitialStatus($module_id, $sub_module_id);
                                       
                                        $app_status = $this->getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                                        $app_status_id = $app_status->status_id;
                                        
                                        $applicant_id = $results->trader_id;
										
                                        $application_details = array(
                                            'application_code' => $results->application_code,
                                            'proposedmethod_of_disposal_id' => $results->proposedmethod_of_disposal_id,
                                            'view_id' => $view_id,
                                            'total_weight' => $results->total_weight,
                                            'weights_units_id' => $results->weights_units_id, 
                                            'disposal_siteoption_id' => $results->disposal_siteoption_id, 
                                            'market_value' => $results->market_value, 
                                            'currency_id' => $results->currency_id, 
                                            'reference_no' => $results->reference_no, 
                                            'tracking_no' => $results->tracking_no, 
                                            'sub_module_id' => $results->sub_module_id, 
                                            'module_id' => $results->module_id, 
                                            'section_id' => $results->section_id, 
                                            'zone_id' => $results->zone_id,  
                                            'proposed_destructionsite' => $results->proposed_destructionsite,  
                                            'destructionsite_location' => $results->destructionsite_location,  
                                            'proposed_destructiondate' => $results->proposed_destructiondate,  
                                            'reason_of_destruction_id' => $results->reason_of_destruction_id,  
                                            'reason_for_disposal' => $results->reason_for_disposal,  
                                            'product_particulars_description' => $results->product_particulars_description,  
                                            'otherproposedmethod_of_disposal' => $results->otherproposedmethod_of_disposal,  'superintendent_incharge'=>$results->superintendent_incharge,
											'superintendent_registration_number'=>$results->superintendent_registration_number,
											'registration_body'=>$results->registration_body,
											'premise_id'=>$results->premise_id,
                                            'applicant_id'=>$results->trader_id,
                                            'workflow_stage_id' => $next_stage,
                                            'process_id' => $process_details->id,
                                            'application_status_id' => $app_status_id,
                                            'portal_id' => $portal_application_id,
                                            
                                        );  	
                    if($app_previousdata){

                        $application_details['dola'] = Carbon::now();
                        $application_details['altered_by'] = $user_id;
                        
                        $this->funcSaveOnlineDisposalOtherdetails($application_code, $user_id);
                        
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name', 'mis_db');
                        
                        $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data, 'mis_db');
                          
                            $application_update =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, 'mis_db');


                        if ($application_update['success'] == false) {
                            DB::rollBack();
                            return $application_update;
                        } 
                       
                    }
                    else{
                        $application_details['created_on'] = Carbon::now();
                        $application_details['created_by'] = $user_id;
                        $application_details['added_on'] = Carbon::now();
                        $application_status = $this->getApplicationInitialStatus($module_id, $sub_module_id);
                        
                        $application_code = $results->application_code;;
						
                        
                        $this->funcSaveOnlineDisposalOtherdetails($application_code, $user_id);
                        
                        $app_status = $this->getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                        $app_status_id = $app_status->status_id;
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name', 'mis_db');
                       
                        $application_insert = insertRecord($applications_table, $application_details, $user_id, 'mis_db');
                        if ($application_insert['success'] == false) {
                            DB::rollBack();
                            return $application_insert;
                        }
                        $record_id = $application_insert['record_id'];
                      
                        
                    }//details 

                    DB::commit();
                   
            $res = array(
                'success' => true,
                //'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
            );
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
	
        return $res;
    }function funcSaveOnlineDisposalOtherdetails($application_code, $user_id)
    {
        DB::connection('mis_db')->table('tra_disposal_products')->where(array('application_code' => $application_code))
            ->delete();

        
        $previous_permitdetails = DB::table('wb_disposal_products as t2')
            ->select(DB::raw("application_code,brand_name,common_name,product_strength,dosage_form,pack_size,quantity,batch_no,estimated_value,reason_for_disposal,currency_name,application_code,id as portal_id, $user_id as created_by, now() as created_on"))
            ->where('application_code', $application_code)
            ->get();

        $previous_permitdetails = convertStdClassObjToArray($previous_permitdetails);
        DB::connection('mis_db')->table('tra_disposal_products')
            ->insert($previous_permitdetails);
			
    }

}

?>