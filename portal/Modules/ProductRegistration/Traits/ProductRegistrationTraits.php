<?php
namespace Modules\ProductRegistration\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ProductRegistrationTraits
{
   
	

public function funcProductsRetentionApplicationSubmission($application_code,$sub_module_id,$module_id,$request,$view_id,$next_stage)
    {
		
	try{
		 
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $status_type_id = $request->input('status_type_id');
		
        $user_id = 0;
       
        $applications_table = 'tra_product_applications';
       
                            $qry = DB::table('wb_product_applications as t1')
                            ->leftJoin('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.application_code', $application_code);
                            $results = $qry->first();
                 
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
          
                            $application_code = $results->application_code;
                    
                    $app_previousdata = DB::connection('mis_db')->table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
										
                    if($app_previousdata){
                        $tracking_no = $app_previousdata->tracking_no;

                            $details = $this->updateOnlineProductRetentionDetails($results,$application_code,$sub_module_id,$module_id,$request,$app_previousdata,$view_id);
                            
                    }
                    else{
                       
                        $details = $this->saveRetentionInitialDetails($application_code,$sub_module_id,$module_id,$request,$view_id);

                    }

       //email 4 localagent_email
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
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
	 
			return $res;
    }
	public function funcProductsApplicationSubmission($application_code,$sub_module_id,$module_id,$request,$view_id,$next_stage)
    {
		
	try{
		 
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $status_type_id = $request->input('status_type_id');
		
        $user_id = 0;
       
        $applications_table = 'tra_product_applications';
       
                            $qry = DB::table('wb_product_applications as t1')
                            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.application_code', $application_code);
                            $results = $qry->first();
                 
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
          
                            $application_code = $results->application_code;
                    
                    $app_previousdata = DB::connection('mis_db')->table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
										
                    if($app_previousdata){
                        $tracking_no = $app_previousdata->tracking_no;

                            $details = $this->updateOnlineProductDetails($results,$application_code,$sub_module_id,$module_id,$request,$app_previousdata,$view_id);
                            
                    }
                    else{
                       
                        $details = $this->saveInitialDetails($application_code,$sub_module_id,$module_id,$request,$view_id);

                    }

       //email 4 localagent_email
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
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
	
			return $res;
    }
	
	public function saveInitialDetails($application_code,$sub_module_id,$module_id,$request,$view_id){
                try{
			
        $user_id = 0;
       
        $qry = DB::table('wb_product_applications as t1')
            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                ->where('t1.application_code', $application_code);

            $results = $qry->first();


            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                );
                return $res;
            }
            $tracking_no = $results->tracking_no;
            $sub_module_id = $results->sub_module_id;
            $module_id = $results->module_id;
            $zone_id = $results->zone_id;
            $section_id = $results->section_id;
            $classification_id = $results->classification_id;
            $ref_no = $results->reference_no;
            
            $assessment_procedure_id = $results->assessment_procedure_id;
           
            $portal_application_id = $results->id;
            $reg_product_id = $results->reg_product_id;
            $portal_product_id = $results->product_id;
            //process/workflow details
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where,'mis_db' );
			 

            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                );
                return $res;
            }
            $process_id = $process_details->id;
			
            $application_code = $results->application_code;
            $is_fast_track = $results->is_fast_track;;
            $paying_currency_id = $results->paying_currency_id;;

            
            $applicant_id = $results->trader_id;
            $local_agent_id = $results->local_agent_id;
            $premise_id = $results->premise_id;
            
             
            //premise main details
            $product_details = DB::table('wb_product_information')
                ->where('id', $results->product_id)
                ->first();


            if (is_null($product_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                );
                return $res;
            }
            $product_details->portal_id = $results->product_id;
            $product_details->created_by = $user_id;
            $product_details = convertStdClassObjToArray($product_details);

            unset($product_details['id']);
			unset($product_details['product_type_id']);
            $product_details['created_on'] = Carbon::now();
            $product_details['created_by'] = $user_id;
          
            
            $prod_insert = insertRecord('tra_product_information', $product_details, $user_id, 'mis_db');

            
            if ($prod_insert['success'] == false) {
                DB::rollBack();
                return $prod_insert;
            }
            $product_id = $prod_insert['record_id'];

            $app_status_id = 5;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name','mis_db');
            $registration_data = array('tra_product_id' => $product_id,
                    'status_id' => $app_status_id,
                    'validity_status_id' => 1,
					'reg_applicant_id' => $applicant_id,
                    'reg_local_agent_id' => (isset($premise_id))?$premise_id:null,
                    'registration_status_id' => 1
                ); 

            if($sub_module_id == 7){
                $where_statement = array('tra_product_id' => $product_id);

                $product_regresp = $this->saveApplicationRegistrationDetails('tra_registered_products', $registration_data, $where_statement, $user_id);

                if( $product_regresp['success']){
    
                    $reg_product_id = $product_regresp['record_id'];

                }   

            }
    
            $this->funcSaveOnlineProductOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
			$zone_id = $results->zone_id;
              $application_details = array(
                'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'applicant_id' => $applicant_id, 
                //'local_agent_id' => $local_agent_id,
                'premise_id'=>$premise_id,
                'application_code' => $application_code,
                'product_id' => $product_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'date_added'=>Carbon::now(),
                'view_id'=>$view_id,
                'reg_product_id'=>$reg_product_id,
                'assessment_procedure_id'=>$assessment_procedure_id ,
                'assessmentprocedure_type_id'=>$results->assessmentprocedure_type_id ,
                //'eac_registeringbody_id'=>$results->eac_registeringbody_id,
                'process_id' => $process_id,
                'application_status_id' => $app_status_id,
                'paying_currency_id'=>$paying_currency_id,
                //'reference_application_code'=>$results->reference_application_code,
                'is_fast_track'=>$is_fast_track,
                'portal_id' => $portal_application_id,
                'dola' =>  Carbon::now(),
                'altered_by'=>$user_id
            ); 

            $res = insertRecord('tra_product_applications', $application_details, $user_id,'mis_db');
			

            if ($res['success'] == false) {
                DB::connection('mis_db')->rollBack();
                return $res;
            }
            
            $mis_application_id = $res['record_id'];
     
            DB::connection('mis_db')->commit();
           
		
            if ($sub_module_id == 9) {//Alteration
                $this->syncApplicationOnlineVariationRequests($application_code);
            }
            if ($sub_module_id == 17) {//Withdrawal
                $this->syncApplicationOnlineWithdrawalReasons($application_code);
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
	
	   return $res;
    }
	function saveApplicationRegistrationDetails($table_name, $registration_data, $where_statement, $user_id)
    {
        if (recordExists($table_name, $where_statement, 'mis_db')) {
            //update
            $prev_data = getPreviousRecords($table_name, $where_statement,'mis_db');

            $res = updateRecord($table_name, $prev_data['results'], $where_statement, $registration_data, $user_id,'mis_db');

        } else {
            //insert
            $res = insertRecord($table_name, $registration_data, $user_id,'mis_db');

        } 
        return $res;
    }
	function funcSaveOnlineProductOtherdetails($portal_product_id, $product_id, $reg_product_id, $user_id)
    {
       
	   //save the route of admin
		 $where_statement = array('product_id' => $product_id);
        $previous_prodroutes = DB::table('wb_prod_routeofadministrations as t2')
            ->select(DB::raw("$product_id as product_id,route_of_administration_id , $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_prodroutes) > 0) {
            $previous_prodroutes = convertStdClassObjToArray($previous_prodroutes);
            DB::connection('mis_db')->table('tra_prod_routeofadministrations')->where($where_statement)->delete();
            DB::connection('mis_db')->table('tra_prod_routeofadministrations')
                ->insert($previous_prodroutes);
        }
		

            //manufacturing Countries

        $previous_mancountries = DB::table('wb_prod_mancountry as t2')
            ->select(DB::raw("$product_id as product_id,manufacturing_country_id , $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_mancountries) > 0) {
            $previous_mancountries = convertStdClassObjToArray($previous_mancountries);
            DB::connection('mis_db')->table('tra_prod_mancountry')->where($where_statement)->delete();
            DB::connection('mis_db')->table('tra_prod_mancountry')
                ->insert($previous_mancountries);
        }

       //save the target specieeds

		$where_statement = array('product_id' => $product_id);
        $previous_prodspecies = DB::table('wb_prod_targetspecies as t2')
            ->select(DB::raw("$product_id as product_id,target_species_id , $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_prodspecies) > 0) {
            $previous_prodspecies = convertStdClassObjToArray($previous_prodspecies);
            DB::connection('mis_db')->table('tra_prod_targetspecies')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_prod_targetspecies')
                ->insert($previous_prodspecies);
        }
		
		$where_statement = array('product_id' => $product_id);
        $previous_prodintendeduses = DB::table('wb_prod_intendeduses as t2')
            ->select(DB::raw("$product_id as product_id,intended_use_id , $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_prodintendeduses) > 0) {
            $previous_prodintendeduses = convertStdClassObjToArray($previous_prodintendeduses);
            DB::connection('mis_db')->table('tra_prod_intendeduses')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_prod_intendeduses')
                ->insert($previous_prodintendeduses);
        }
		
		$where_statement = array('product_id' => $product_id);
        $previous_prodintendeduses = DB::table('wb_prod_product_forms as t2')
            ->select(DB::raw("$product_id as product_id,product_form_id , $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();
			
        if (count($previous_prodintendeduses) > 0) {
            $previous_prodintendeduses = convertStdClassObjToArray($previous_prodintendeduses);
            DB::connection('mis_db')->table('tra_prod_product_forms')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_prod_product_forms')
                ->insert($previous_prodintendeduses);
        }
	
        $active_ingredient_id = '';

        //packaging
        $where_statement = array('product_id' => $product_id);
        $previous_prodpackaging = DB::table('wb_product_packaging as t2')
            ->select(DB::raw("$product_id as product_id, container_type_id,container_id,container_material_id,closure_material_id,si_unit_id,seal_type_id,retail_packaging_size,packaging_units_id,no_of_units,no_of_packs,unit_pack,product_unit, $user_id as created_by, now() as created_on,id as portal_id"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_prodpackaging) > 0) {
            $previous_prodpackaging = convertStdClassObjToArray($previous_prodpackaging);
            DB::connection('mis_db')->table('tra_product_packaging')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_product_packaging')
                ->insert($previous_prodpackaging);
        }
        //secondary packaging
        $previous_secondarypackaging = DB::table('wb_secondary_packaging as t2')
            ->select(DB::raw("$product_id as product_id, containers_type_id,containers_id,containers_material_id,closure_material_id,seal_type_id,retail_packaging_size,packaging_units_id,unit_pack,no_of_packs_secondary,product_unit, $user_id as created_by, now() as created_on,id as portal_id"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_secondarypackaging) > 0) {
            $previous_secondarypackaging = convertStdClassObjToArray($previous_secondarypackaging);
            DB::connection('mis_db')->table('tra_secondary_packaging')->where($where_statement)->delete();
            //dd($previous_secondarypackaging);
           $res = DB::connection('mis_db')->table('tra_secondary_packaging')
                ->insert($previous_secondarypackaging);
        }
            //tertiary packaging
        $previous_tertiarypackaging = DB::table('wb_tertiary_packaging as t2')
            ->select(DB::raw("$product_id as product_id, container_type_ids,container_ids,container_material_ids,closure_material_id,seal_type_id,retail_packaging_size,packaging_units_id,unit_pack,no_of_packs_tertiary,product_unit, $user_id as created_by, now() as created_on,id as portal_id"))
            ->where('product_id', $portal_product_id)
            ->get();
        if (count($previous_tertiarypackaging) > 0) {
            $previous_tertiarypackaging = convertStdClassObjToArray($previous_tertiarypackaging);
            DB::connection('mis_db')->table('tra_tertiary_packaging')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_tertiary_packaging')
                ->insert($previous_tertiarypackaging);
        }


        $previous_prodnutrients = DB::table('wb_product_nutrients as t2')
            ->select(DB::raw("$product_id as product_id, nutrients_category_id,nutrients_id,units_id,proportion,$user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();

        if (count($previous_prodnutrients) > 0) {
            $previous_prodnutrients = convertStdClassObjToArray($previous_prodnutrients);
            DB::connection('mis_db')->table('tra_product_nutrients')->where($where_statement)->delete();

            DB::connection('mis_db')->table('tra_product_nutrients')
                ->insert($previous_prodnutrients);


        }
        $previous_prodingredients = DB::table('wb_product_ingredients as t2')
            ->select(DB::raw("$product_id as product_id,t2.id, ingredient_type_id,ingredient_id,cas_number,ingredient_function,specification_type_id,strength,proportion,ingredientssi_unit_id,inclusion_reason_id,acceptance_id, $user_id as created_by, now() as created_on"))
            ->where('product_id', $portal_product_id)
            ->get();

        DB::connection('mis_db')->table('tra_product_ingredients')->where($where_statement)->delete();
        DB::connection('mis_db')->table('tra_product_manufacturers')->where($where_statement)->delete();
 
        foreach ($previous_prodingredients as $rec) {
            $prevactive_ingredient_id = $rec->id;

            $data = array('product_id' => $product_id,
                'ingredient_type_id' => $rec->ingredient_type_id,
                'ingredient_id' => $rec->ingredient_id,
                'specification_type_id' => $rec->specification_type_id,
                'strength' => $rec->strength,
                'proportion' => $rec->proportion,
                'ingredientssi_unit_id' => $rec->ingredientssi_unit_id,
                'acceptance_id' => $rec->acceptance_id,
                'created_by' => $user_id,
                'created_on' => Carbon::now());

            $active_ingredient_id = DB::connection('mis_db')->table('tra_product_ingredients')
                ->insertGetId($data);

            $previous_prodmanufacturers = DB::table('wb_product_manufacturers as t2')
                ->select(DB::raw("$product_id as product_id,man_site_id, manufacturer_id,manufacturer_role_id,manufacturer_status_id,manufacturer_type_id,$active_ingredient_id as active_ingredient_id,$user_id as created_by, now() as created_on"))
                ->where(array('product_id' => $portal_product_id, 'active_ingredient_id' => $prevactive_ingredient_id, 'manufacturer_type_id' => 2))
                ->get();
            $previous_prodmanufacturers = convertStdClassObjToArray($previous_prodmanufacturers);

            DB::connection('mis_db')->table('tra_product_manufacturers')
                ->insert($previous_prodmanufacturers);

        }
        $previous_prodmanufacturers = DB::table('wb_product_manufacturers as t2')
            ->select(DB::raw("$product_id as product_id,man_site_id, manufacturer_id,manufacturer_role_id,manufacturer_status_id,manufacturing_activities,gmp_application_code,has_beeninspected,reg_site_id, gmp_productline_id,manufacturer_type_id,$user_id as created_by, now() as created_on"))
            ->where(array('product_id' => $portal_product_id, 'manufacturer_type_id' => 1))
            ->get();
        $previous_prodmanufacturers = convertStdClassObjToArray($previous_prodmanufacturers);
        DB::connection('mis_db')->table('tra_product_manufacturers')
            ->insert($previous_prodmanufacturers);

        //update tra_uploadedproduct_images
        $data = array('product_id' => $product_id);

        DB::connection('mis_db')->table('tra_uploadedproduct_images')
            ->where(array('portal_product_id' => $portal_product_id))
            ->update($data);

        //sample details manufacturer_type_id
		 $previous_prodsamples= DB::table('wb_sample_information as t2')
            ->select(DB::raw("$product_id as product_id,manufacturing_date, expiry_date,sample_tracking_no,mode_of_delivery,quantity,quantity_unit_id,sample_status_id,batch_no, $user_id as created_by, now() as created_on"))
            ->where(array('product_id' => $portal_product_id))
            ->get();
        $previous_prodsamples = convertStdClassObjToArray($previous_prodsamples);
        DB::connection('mis_db')->table('tra_sample_information')
            ->insert($previous_prodsamples);
		
    }
	public function syncApplicationOnlineWithdrawalReasons($application_code)
    {
        $user_id = 0;
        $reasons = DB::table('wb_application_withdrawaldetails')
            ->where('application_code', $application_code)
            ->select(DB::raw("id as portal_id,application_code,withdrawal_category_id,reason_for_withdrawal,status_id,
                        $user_id as created_by"))
            ->get();
        $reasons = convertStdClassObjToArray($reasons);
        DB::connection('mis_db')->table('tra_application_withdrawaldetails')
            ->insert($reasons);
    }

    public function syncApplicationOnlineVariationRequests($application_code)
    {
        $user_id = 0;
        $portal_db = DB::connection('portal_db');
        $variations = DB::table('wb_application_variationsdata')
            ->where('application_code', $application_code)
            ->select(DB::raw("id as portal_id,appuploaded_document_id,application_code,variation_type_id,variation_category_id,present_details,proposed_variation,
                        variation_background_information,status_id,$user_id as created_by"))
            ->get();
        $variations = convertStdClassObjToArray($variations);
        DB::connection('mis_db')->table('tra_application_variationsdata')
            ->insert($variations);
            
    }
	
	public function updateOnlineProductDetails($results,$application_code,$sub_module_id,$module_id,$request,$app_previousdata,$view_id){
		try{
        $user_id = 0;
		$applications_table = 'tra_product_applications';
    
							$product_id = $app_previousdata->product_id;
                            $tracking_no = $results->tracking_no;
                            $sub_module_id = $results->sub_module_id;
                            $module_id = $results->module_id;
                            $zone_id = $results->zone_id;
                            $section_id = $results->section_id;
                            $classification_id = $results->classification_id;
                            
                            $assessment_procedure_id = $results->assessment_procedure_id;
                            
                            $portal_application_id = $results->id;
                            $reg_product_id = $results->reg_product_id;
                            $portal_product_id = $results->product_id;
                            //process/workflow details workflow_details
                            $where = array(
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'section_id' => $results->section_id
                            );
                            $process_details = getTableData('wf_tfdaprocesses', $where,'mis_db');
                            if (is_null($process_details)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                );
                                return $res;
                            }

                            $process_id = $process_details->id;
							
                            $portal_status_id = 3;
                            $app_status_id = 1;
                           
                            $application_code = $results->application_code;;
					
                            $applicant_id = $results->trader_id;
                            
                                $local_agent_id = $results->local_agent_id;
                            
                            $product_details = DB::table('wb_product_information')
                                ->where('id', $results->product_id)
                                ->first();
                
                            if (is_null($product_details)) {
                                DB::rollBack();
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                                );
                                return $res;
                            }
                        
                            $product_portal_id = $results->product_id;
                            $product_details->portal_id = $results->product_id;
                            $product_details->created_by = 0;
                            $product_details = convertStdClassObjToArray($product_details);
            
                            unset($product_details['id']);
                            $product_details['created_on'] = Carbon::now();
                            $product_details['created_by'] = $user_id;
                           
                            $whereproduct_data = array('id'=>$product_id);

                            $product_table = 'tra_product_information';
                            $where = array('');
                            $product_previousdata = getPreviousRecords($product_table, $whereproduct_data,'mis_db');
							
                            //$product_previousdata = $product_previousdata['results'];
							
                            $prod_update = updateRecord($product_table, $product_previousdata, $whereproduct_data, $product_details, $user_id, 'mis_db');
                              
                            if ($prod_update['success'] == false) {
                                DB::rollBack();
                                return $prod_update;
                            }
                         
                            
                            $reg_product_id =  $app_previousdata->reg_product_id;
                            
                            $this->funcSaveOnlineProductOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
                           
                           $zone_id = $results->zone_id;
                            $application_details = array(
                                //'reference_no' => $ref_no,
                                'tracking_no' => $tracking_no,
                                'applicant_id' => $applicant_id, 
                                'local_agent_id' => $local_agent_id,
                                'application_code' => $application_code,
                                'product_id' => $product_id,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'zone_id' => $results->zone_id,
                                'section_id' => $results->section_id,
                                'date_added'=>Carbon::now(),
                                'view_id'=>$view_id,
                'reference_application_code'=>$results->reference_application_code,
                                'reg_product_id'=>$reg_product_id,
                                'assessment_procedure_id'=>$assessment_procedure_id ,
                                'assessmentprocedure_type_id'=>$results->assessmentprocedure_type_id ,
                                'process_id' => $process_details->id,
                                'application_status_id' => $app_status_id,
                                'portal_id' => $portal_application_id,
                                'dola' =>  Carbon::now(),
                                'altered_by'=>$user_id
                            );
							
                            //update the details 
                            if($sub_module_id != 7){

                                $application_details['reference_no'] = $tracking_no;

                            }
                            $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data, 'mis_db');
                   
                            $res =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, 'mis_db');
                           
                            if ($res['success'] == false) {
                                DB::connection('mis_db')->rollBack();
                                return $res;
                            }
                          
			DB::connection('mis')->commit();
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
	
	   return $res;

    }
	public function updateOnlineProductRetentionDetails($results,$application_code,$sub_module_id,$module_id,$request,$app_previousdata,$view_id){
		try{
        $user_id = 0;
		$applications_table = 'tra_product_applications';
    
                            $tracking_no = $results->tracking_no;
                            $sub_module_id = $results->sub_module_id;
                            $module_id = $results->module_id;
                            $zone_id = $results->zone_id;
                            $section_id = $results->section_id;
                            $classification_id = $results->classification_id;
                            
                            $assessment_procedure_id = $results->assessment_procedure_id;
                            
                            $portal_application_id = $results->id;
                            $reg_product_id = $results->reg_product_id;
                            //$portal_product_id = $results->product_id;
                            //process/workflow details workflow_details brand_name product_id 
                            $where = array(
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id
                            );
                            $process_details = getTableData('wf_tfdaprocesses', $where,'mis_db');
                            if (is_null($process_details)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                );
                                return $res;
                            }

                            $process_id = $process_details->id;
							
                            $portal_status_id = 3;
                            $app_status_id = 1;
                           
                            $application_code = $results->application_code;;
					
                            $applicant_id = $results->trader_id;
                            
                                $local_agent_id = $results->local_agent_id;
                            
                           $zone_id = $results->zone_id;
                            $application_details = array(
                                //'reference_no' => $ref_no,
                                'tracking_no' => $tracking_no,
                                'applicant_id' => $applicant_id, 
                                'local_agent_id' => $local_agent_id,
                                'application_code' => $application_code,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'zone_id' => $results->zone_id,
                                'section_id' => $results->section_id,
                                'date_added'=>Carbon::now(),
                                'view_id'=>$view_id,
                                'assessment_procedure_id'=>$assessment_procedure_id ,
                                'assessmentprocedure_type_id'=>$results->assessmentprocedure_type_id ,
                                'process_id' => $process_details->id,
                                'application_status_id' => $app_status_id,
                                'portal_id' => $portal_application_id,
                                'dola' =>  Carbon::now(),
                                'altered_by'=>$user_id
                            );
							
                            //update the details 
                            if($sub_module_id != 7){

                                $application_details['reference_no'] = $tracking_no;

                            }
                            $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data, 'mis_db');
                   
                            $res =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, 'mis_db');
                           
                            if ($res['success'] == false) {
                                DB::connection('mis_db')->rollBack();
                                return $res;
                            }
                          
			DB::connection('mis')->commit();
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
	
	   return $res;

    }
	
	public function saveRetentionInitialDetails($application_code,$sub_module_id,$module_id,$request,$view_id){
                try{
			
        $user_id = 0;
       
        $qry = DB::table('wb_product_applications as t1')
            ->leftJoin('wb_product_information as t2', 't1.product_id','=','t2.id')
            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                ->where('t1.application_code', $application_code);

            $results = $qry->first();

            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                );
                return $res;
            }
            $tracking_no = $results->tracking_no;
            $sub_module_id = $results->sub_module_id;
            $module_id = $results->module_id;
            $zone_id = $results->zone_id;
            $section_id = $results->section_id;
            $classification_id = $results->classification_id;
            $ref_no = $results->reference_no;
            
            $assessment_procedure_id = $results->assessment_procedure_id;
           
            $portal_application_id = $results->id;
            $reg_product_id = $results->reg_product_id;
            $portal_product_id = $results->product_id;
            //process/workflow details brand_name product_id
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
               // 'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where,'mis_db' );
			 
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                );
                return $res;
            }
            $process_id = $process_details->id;
			
            $application_code = $results->application_code;
            $is_fast_track = $results->is_fast_track;;
            $paying_currency_id = $results->paying_currency_id;;

            
            $applicant_id = $results->trader_id;
            $local_agent_id = $results->local_agent_id;
            
             
            
            $app_status_id = 5;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name','mis_db');

            $registration_data = array(
                    'status_id' => $app_status_id,
                    'validity_status_id' => 1,
					'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                    'registration_status_id' => 1
                ); 
			
			$zone_id = $results->zone_id;
              $application_details = array(
                'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'applicant_id' => $applicant_id, 
                'local_agent_id' => $local_agent_id,
                'application_code' => $application_code,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'date_added'=>Carbon::now(),
                'view_id'=>$view_id,
                'reg_product_id'=>$reg_product_id,
                'assessment_procedure_id'=>$assessment_procedure_id ,
                'assessmentprocedure_type_id'=>$results->assessmentprocedure_type_id ,'eac_registeringbody_id'=>$results->eac_registeringbody_id,
                'process_id' => $process_id,
                'application_status_id' => $app_status_id,
                'paying_currency_id'=>$paying_currency_id,
                'is_fast_track'=>$is_fast_track,
                'portal_id' => $portal_application_id,
                'dola' =>  Carbon::now(),
                'altered_by'=>$user_id
            ); 
			 
         
            $res = insertRecord('tra_product_applications', $application_details, $user_id,'mis_db');
			
		
            if ($res['success'] == false) {
                DB::connection('mis_db')->rollBack();
                return $res;
            }
            
            $mis_application_id = $res['record_id'];
     
            DB::connection('mis_db')->commit();
           
			
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
	
	   return $res;
    }
}

?>