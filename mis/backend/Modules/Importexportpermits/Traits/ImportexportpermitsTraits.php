<?php


namespace Modules\Importexportpermits\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ImportexportpermitsTraits
{
    public function getImportExpApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code');

        $import_typecategory_code = getSingleRecordColValue('par_permit_typecategories', array('id' => $application_details->import_typecategory_id), 'code');
       
        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'apptype_code' => $submodule_code
        );  
        return $codes_array;
        
    }
    public function getDisposalpApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'submodule_code' => $submodule_code
        );  
              
        return $codes_array;
    }

 public function getProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies', '');
    $weightsData = getParameterItems('par_weights_units', '');
    $packagingData = getParameterItems('par_packaging_units', '');
    $permitReasonData = getParameterItems('par_permit_category', '');
    $productClassCategoriesData = getParameterItems('par_prodclass_categories', '');
    $deviceData = getParameterItems('par_device_types', '');
    $siUnitsData = getParameterItems('par_si_units', '');
    $dosageFormsData = getParameterItems('par_dosage_forms', '');
    $productRegistrationData = getParameterItems('par_import_registration_level', '');
    $permitProductRecommendationData = getParameterItems('par_permitprod_recommendations', '');
    $verification_fee_percentage = 'Not Set';
    $verification_fee = '';
    $country_of_origin_region_id = '';
    $registration_equivalent_id = '';
    $is_bubu = 2;
    $is_generic = 2;
    $is_vaccine='';
    $is_glove_id='';

    foreach ($records as $rec) {
        $pack_size_id = '';
        $pack_size = null;

        $country_oforigin_id = '';
        $manufacturer_name = '';

        if(validateIsNumeric($rec->manufacturer_id)){
               $manufacturer_rec = getSingleRecord('tra_manufacturing_sites', array('id' => $rec->manufacturer_id));

                if($manufacturer_rec){
                    $manufacturer_name = $manufacturer_rec->name;
                    $country_oforigin_id = $manufacturer_rec->country_id;
                }else{

                    $manufacturer_rec = getSingleRecord('tra_manufacturers_information', array('id' => $rec->manufacturer_id));
                   $manufacturer_name = $manufacturer_rec->name;
                    $country_oforigin_id = $manufacturer_rec->country_id;
                }

               
          }

        if (validateIsNumeric($rec->pack_size)) {
            $pack_size_id = $rec->pack_size;
            $pack_size_data = $this->getproductPackagingInformation($pack_size_id);

            if ($pack_size_data && $pack_size_data->isNotEmpty()) {
                $packSize = $pack_size_data->first(); // Safely get the first item
            }

            if ($packSize) {
                $pack_size = $packSize->pack_size;
            }
        } else {
            $pack_size = $rec->pack_size;
        }


        if (validateisNumeric($rec->product_origin_id)) {
            $is_not_bubu_country = belongsToWhichRegionCategory($rec->product_origin_id, array('bubu_id' => 2));

         
          

            if (!$is_not_bubu_country) {
               
               if(validateisNumeric($rec->atc_code_id)){
                 if (recordExists('par_bubu', array('atc_code_id' => $rec->atc_code_id,'strength' => $rec->product_strength, 'si_unit' => $rec->si_unit_id, 'dosage_form_id' => $rec->dosage_form_id))) {
                    $is_bubu = 1;

                 }
               }else{
                 if (recordExists('par_bubu', array('atc_code_id' => $rec->common_name_id,'strength' => $rec->product_strength, 'si_unit' => $rec->si_unit_id, 'dosage_form_id' => $rec->dosage_form_id))) {
                    $is_bubu = 1;
                  }

                  //   if (recordExists('par_bubu', array('atc_code_id' => $rec->common_name_id,'strength' => $rec->product_strength,'si_unit' => $rec->si_unit_id,'dosage_form_id' => $rec->dosage_form_id ))) {
                  //   dd(111);
                  //   $is_bubu = 1;
                  // }
                  //  dd($rec->dosage_form_id);

                }

                
            }
        }

        $is_eac_country = belongsToWhichRegionCategory($rec->product_origin_id, array('eac_id' => 1));
        if ($is_eac_country) {
            $country_of_origin_region_id = 3;
        } else {
            $country_of_origin_region_id = 2;
        }

        $is_sra_country = belongsToWhichRegionCategory($rec->product_origin_id, array('sra_id' => 1));
        if ($is_sra_country) {
            $country_of_origin_region_id = 1;
        }

        if ($rec->product_category == 10) {
            $is_generic = 1;
        }

      // dd($rec);

        if ($rec->is_registered == 1) {
            $fob_percentage = getSingleRecordColValue('tra_import_feesconfigurations', array(
                'license_type_id' => $rec->license_type_id,
                'import_reason_id' => $rec->import_reason_id,
                'premise_type_id' => $rec->premise_type_id,
                'product_category_id' => $rec->product_category_id,
                'is_registered' => $rec->is_registered,
                'is_bubu' => $is_bubu
            ), 'fob');
        } else {
            if ($country_of_origin_region_id == 1) {
                if ($is_generic == 1) {
                    if (recordExists('tra_product_information', array(
                        'atc_code_id' => $rec->atc_code_id,
                        'product_strength' => $rec->product_strength,
                        'si_unit_id' => $rec->si_unit_id,
                        'dosage_form_id' => $rec->dosage_form_id
                    ))) {
                        $product_origin_id = getSingleRecordColValue('tra_import_feesconfigurations', array(
                            'atc_code_id' => $rec->atc_code_id,
                            'product_strength' => $rec->product_strength,
                            'si_unit_id' => $rec->si_unit_id,
                            'dosage_form_id' => $rec->dosage_form_id
                        ), 'product_origin_id');

                        $is_eac_country = belongsToWhichRegionCategory($product_origin_id, array('eac_id' => 1));
                        if ($is_eac_country) {
                            $registration_equivalent_id = 8;
                        } else {
                            $registration_equivalent_id = 7;
                        }

                        $is_sra_country = belongsToWhichRegionCategory($product_origin_id, array('sra_id' => 1));
                        if ($is_sra_country) {
                            $registration_equivalent_id = 6;
                        }
                    } else {
                        $registration_equivalent_id = 5;
                    }
                } else {
                    if (recordExists('tra_product_information', array(
                        'atc_code_id' => $rec->atc_code_id,
                        'product_strength' => $rec->product_strength,
                        'si_unit_id' => $rec->si_unit_id,
                        'dosage_form_id' => $rec->dosage_form_id,
                        'prodclass_category_id' => 10
                    ))) {
                        $product_origin_id = getSingleRecordColValue('tra_import_feesconfigurations', array(
                            'atc_code_id' => $rec->atc_code_id,
                            'product_strength' => $rec->product_strength,
                            'si_unit_id' => $rec->si_unit_id,
                            'dosage_form_id' => $rec->dosage_form_id,
                            'prodclass_category_id' => 10
                        ), 'product_origin_id');

                        $is_eac_country = belongsToWhichRegionCategory($product_origin_id, array('eac_id' => 1));
                        if ($is_eac_country) {
                            $registration_equivalent_id = 4;
                        } else {
                            $registration_equivalent_id = 3;
                        }

                        $is_sra_country = belongsToWhichRegionCategory($product_origin_id, array('sra_id' => 1));
                        if ($is_sra_country) {
                            if ($product_origin_id == 37) {
                                $registration_equivalent_id = 1;
                            } else {
                                $registration_equivalent_id = 2;
                            }
                        }
                    } else {
                        $registration_equivalent_id = 5;
                    }
                }
            } else if ($country_of_origin_region_id == 3) {
                if ($is_generic == 1) {
                    if (recordExists('tra_product_information', array(
                        'atc_code_id' => $rec->atc_code_id,
                        'product_strength' => $rec->product_strength,
                        'si_unit_id' => $rec->si_unit_id,
                        'dosage_form_id' => $rec->dosage_form_id
                    ))) {
                        $product_origin_id = getSingleRecordColValue('tra_product_information', array(
                            'atc_code_id' => $rec->atc_code_id,
                            'product_strength' => $rec->product_strength,
                            'si_unit_id' => $rec->si_unit_id,
                            'dosage_form_id' => $rec->dosage_form_id
                        ), 'product_origin_id');

                        $is_eac_country = belongsToWhichRegionCategory($product_origin_id, array('eac_id' => 1));
                        if ($is_eac_country) {
                            $registration_equivalent_id = 8;
                        } else {
                            $registration_equivalent_id = 7;
                        }

                        $is_sra_country = belongsToWhichRegionCategory($product_origin_id, array('sra_id' => 1));
                        if ($is_sra_country) {
                            $registration_equivalent_id = 6;
                        }
                    } else {
                        $registration_equivalent_id = 5;
                    }
                } else {
                    if (recordExists('tra_product_information', array(
                        'atc_code_id' => $rec->atc_code_id,
                        'product_strength' => $rec->product_strength,
                        'si_unit_id' => $rec->si_unit_id,
                        'dosage_form_id' => $rec->dosage_form_id,
                        'prodclass_category_id' => 10
                    ))) {
                        $product_origin_id = getSingleRecordColValue('tra_product_information', array(
                            'atc_code_id' => $rec->atc_code_id,
                            'product_strength' => $rec->product_strength,
                            'si_unit_id' => $rec->si_unit_id,
                            'dosage_form_id' => $rec->dosage_form_id,
                            'prodclass_category_id' => 10
                        ), 'product_origin_id');

                        $is_eac_country = belongsToWhichRegionCategory($product_origin_id, array('eac_id' => 1));
                        if ($is_eac_country) {
                            $registration_equivalent_id = 4;
                        } else {
                            $registration_equivalent_id = 3;
                        }

                        $is_sra_country = belongsToWhichRegionCategory($product_origin_id, array('sra_id' => 1));
                        if ($is_sra_country) {
                            $registration_equivalent_id = 2;
                        }
                    } else {
                        $registration_equivalent_id = 5;
                    }
                }
            } else {
                if (recordExists('tra_product_information', array(
                    'atc_code_id' => $rec->atc_code_id,
                    'product_strength' => $rec->product_strength,
                    'si_unit_id' => $rec->si_unit_id,
                    'dosage_form_id' => $rec->dosage_form_id,
                    'prodclass_category_id' => 10
                ))) {
                    $product_origin_id = getSingleRecordColValue('tra_product_information', array(
                        'atc_code_id' => $rec->atc_code_id,
                        'product_strength' => $rec->product_strength,
                        'si_unit_id' => $rec->si_unit_id,
                        'dosage_form_id' => $rec->dosage_form_id,
                        'prodclass_category_id' => 10
                    ), 'product_origin_id');

                    $is_eac_country = belongsToWhichRegionCategory($product_origin_id, array('eac_id' => 1));
                    if ($is_eac_country) {
                        $registration_equivalent_id = 4;
                    } else {
                        $registration_equivalent_id = 3;
                    }

                    $is_sra_country = belongsToWhichRegionCategory($product_origin_id, array('sra_id' => 1));
                    if ($is_sra_country) {
                        $registration_equivalent_id = 2;
                    }
                } else {
                    $registration_equivalent_id = 5;
                }
            }

            $fob_percentage = getSingleRecordColValue('tra_import_feesconfigurations', array(
                'license_type_id' => $rec->license_type_id,
                'import_reason_id' => $rec->import_reason_id,
                'premise_type_id' => $rec->premise_type_id,
                'product_category_id' => $rec->product_category_id,
                'is_registered' => $rec->is_registered,
                'is_bubu' => $is_bubu,
                'is_generic' => $is_generic,
                'country_of_origin_region_id' => $country_of_origin_region_id,
                'registration_equivalent_id' => $registration_equivalent_id
            ), 'fob');

            // print_r($rec->license_type_id);
            // print_r($rec->import_reason_id);
            // print_r($rec->premise_type_id);
            // print_r($rec->product_category_id);
            //  print_r($is_bubu);
            //  print_r($is_generic);
            //  print_r($country_of_origin_region_id);
            // print_r($registration_equivalent_id);

            // dd($fob_percentage);
        }

        if ($fob_percentage !== null && $fob_percentage !== '') {
            $verification_fee_percentage = $fob_percentage;
        }
       if($rec->product_category_id!=9){
            if(validateisNumeric($rec->atc_code_id)){
              $is_vaccine = belongsToVaccineAnticancerCategory($rec->atc_code_id);
            }else{
              //if ($rec->is_registered == 2) {
                $is_vaccine = belongsToVaccineAnticancerCategory($rec->common_name_id); 
               //}
            }
            if ($is_vaccine) {
                $verification_fee_percentage = 0;
            }
        }
         if($rec->product_category_id==9 || $rec->product_category_id===9){
            if(validateisNumeric($rec->common_name_id)){
                $is_glove_id = belongsToGlovesCategory($rec->common_name_id); 
            }else{
              if(validateisNumeric($rec->gmdn_code)){
                $is_glove_id = belongsToGlovesCategoryByCode($rec->gmdn_code); 
               }

            }
            if ($is_glove_id) {
                $verification_fee_percentage = 20;
            }
        }


        $total_value = ($rec->pack_price * $rec->no_of_packs);

    
        $exchange_ratedata = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $rec->currency_id), 'exchange_rate');
        if (validateIsNumeric($exchange_ratedata)) {
            if ($verification_fee_percentage != 'Not Set' && $verification_fee_percentage != 'N/A') {
                $verification_fee = $exchange_ratedata * (($verification_fee_percentage / 100) * $total_value);
            }
        } else {
            $currency_name = getSingleRecordColValue('par_currencies', array('id' => $rec->currency_id), 'name');
            $verification_fee = 'Exchange Rate' . $currency_name . 'Not Set';
        }
        //exclude Exports

        if ($rec->vc_application_type_id==2 || $rec->vc_application_type_id===2){
            $verification_fee_percentage = 'N/A';
            $verification_fee = 'N/A ';
        }
        
        //dd($rec->vc_application_type_id);

        //Exclude Donations
        if ($rec->import_reason_id == 9){
            $verification_fee_percentage = 'N/A';
            $verification_fee = 'N/A ';
        }



        $data[] = array(
            'application_code' => $rec->application_code,
            'product_id' => $rec->product_id,
            'quantity' => $rec->quantity,
            'currency_id' => $rec->currency_id,
            'packaging_unit_id' => $rec->packaging_unit_id,
            'registration_no' => $rec->product_registration_no,
            'certificate_no' => $rec->product_registration_no,
            'common_name' => $rec->permitcommon_name,
            'brand_name' => $rec->permitbrand_name,
            'product_strength' => $rec->product_strength,
            'section_id' => $rec->section_id,
            'id' => $rec->id,
            'permit_prod_id' => $rec->id,
            'is_registered' => $rec->is_registered,
            'permitprod_recommendation_id' => $rec->permitprod_recommendation_id,
            'permitprod_recommendation_remarks' => $rec->permitprod_recommendation_remarks,
            'permitprod_recommendation' => returnParamFromArray($permitProductRecommendationData, $rec->permitprod_recommendation_id),
            'product_registration_status' => returnParamFromArray($productRegistrationData, $rec->is_registered),
            'manufacturer_id'=>$rec->manufacturer_id,
            'country_oforigin_id'=>$country_oforigin_id,
            'manufacturing_country_id' => json_decode(trim($rec->manufacturing_country_id, '""'), true) ?: [],
            'manufacturer_name'=>$manufacturer_name,
            'gmdn_code'=>$rec->gmdn_code,
            'gmdn_term'=>$rec->gmdn_descriptor,
            'pack_size' => $pack_size,
            'no_of_packs' => $rec->no_of_packs,
            'packaging_units' => returnParamFromArray($packagingData, $rec->packaging_unit_id),
            'units_of_strength' => returnParamFromArray($siUnitsData, $rec->si_unit_id),
            'atc_code_id' => $rec->atc_code_id,
            'currency_name' => returnParamFromArray($currencyData, $rec->currency_id),
            'product_category' => returnParamFromArray($productClassCategoriesData, $rec->prodclass_category_id),
            'dosage_form' => returnParamFromArray($dosageFormsData, $rec->dosage_form_id),
            'unit_price' => $rec->pack_price,
            'total_value' => $total_value,
            'verification_fee_percentage' => $verification_fee_percentage,
            'verification_fee' => $verification_fee,
        );
    }
    return $data;
   }
    
    public function getImporExportInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_importexport_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,t6.id as invoice_id,
                     'Import/Export Permit Invoice' as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        
        return $invoice_details;
        
    } 
    public function processDisposalApplicationSubmission(Request $request)
    {
        
        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $module_id = $request->input('module_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $keep_status = $request->input('keep_status');
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        $user_id = $this->user_id;
        $data = DB::table('wf_workflow_actions')
                ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                ->select('*')
                ->first();
                $table_name = returnTableNamefromModule($table_name,$module_id);
        if($data){
                $application_details = DB::table($table_name. ' as t1')
                ->select('t1.*')
                ->where('t1.id', $application_id)
                ->first();
                 $recommendation_table = $data->recommendation_table;
                 $update_portal_status = $data->update_portal_status;
                 $portal_status_id = $data->portal_status_id;
               
                $zone_id = $application_details->zone_id;
                $refno_generated = $application_details->refno_generated;
                $portal_id = $application_details->portal_id;

                 $recommendation_table = $data->recommendation_table;
                 $update_portal_status = $data->update_portal_status;
                 $portal_status_id = $data->portal_status_id;

                 $action_details = $this->getApplicationWorkflowActionDetails($action);
                 $keep_status = $action_details->keep_status;
                 $action_type = $action_details->action_type_id;
                 $sub_module_id = $application_details->sub_module_id;
                 $module_id = $application_details->sub_module_id;
                 if($update_portal_status == 1){
                    $proceed = updatePortalApplicationStatusWithCode($application_code, 'wb_importexport_applications',$portal_status_id);
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }      
                }
                if ($action_details->generate_refno == 1) {
                    if ($refno_generated != 1) {

                        $codes_array = $this->getDisposalpApplicationReferenceCodes($application_details);
                       
                        $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  1, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);

                        if ($refno_details['success'] == false) {
                            echo json_encode($refno_details);
                            exit();
                        }
                        
                        $portal_params = array(
                            'reference_no' => $refno_details['ref_no']
                        );
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                    }
                }
                if ($action_type == 2) {//initial query
                    $this->processReceivingQueriedApplicationSubmission($request);
                } else if ($action_type == 3) {//initial rejection
                    $this->processReceivingRejectedApplicationSubmission($request);
                } else if ($action_type == 6) {//recommendation submission
                    $recommendation_table = $action_details->recommendation_table;
                    $this->processRecommendationApplicationSubmission($request, $recommendation_table);
                }else{
                    $this->processNormalApplicationSubmission($request);
                }
        }
        else{
                 $this->processNormalApplicationSubmission($request);
        }

        
    }
    public function processImportExportApplicationSubmission(Request $request)
    {
        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $module_id = $request->input('module_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $keep_status = $request->input('keep_status');
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        $user_id = $this->user_id;
        $data = DB::table('wf_workflow_actions')
                ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                ->select('*')
                ->first();
                $table_name = returnTableNamefromModule($table_name,$module_id);
        if($data){
                $application_details = DB::table($table_name. ' as t1')
                ->select('t1.*', 't1.device_type_id')
                ->where('t1.id', $application_id)
                ->first();
                 $recommendation_table = $data->recommendation_table;
                 $update_portal_status = $data->update_portal_status;
                 $portal_status_id = $data->portal_status_id;
               
                $zone_id = $application_details->zone_id;
                $refno_generated = $application_details->refno_generated;
                $portal_id = $application_details->portal_id;

                 $recommendation_table = $data->recommendation_table;
                 $update_portal_status = $data->update_portal_status;
                 $portal_status_id = $data->portal_status_id;

                 $action_details = $this->getApplicationWorkflowActionDetails($action);
                 $keep_status = $action_details->keep_status;
                 $action_type = $action_details->action_type_id;
                 $sub_module_id = $application_details->sub_module_id;
                 $module_id = $application_details->sub_module_id;
                 if($update_portal_status == 1){
                    $proceed = updatePortalApplicationStatusWithCode($application_code, 'wb_disposal_applications',$portal_status_id);
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }      
                }
                if ($action_details->generate_refno == 1) {
                    if ($refno_generated != 1) {

                        $codes_array = $this->getImportExpApplicationReferenceCodes($application_details);
                       
                        $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  1, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);

                        if ($refno_details['success'] == false) {
                            echo json_encode($refno_details);
                            exit();
                        }
                        
                        $portal_params = array(
                            'reference_no' => $refno_details['ref_no']
                        );
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_disposal_applications', $portal_params, $portal_where);
                    }
                }
                if ($action_type == 2) {//initial query
                    $this->processReceivingQueriedApplicationSubmission($request);
                } else if ($action_type == 3) {//initial rejection
                    $this->processReceivingRejectedApplicationSubmission($request);
                } else if ($action_type == 6) {//recommendation submission
                    $recommendation_table = $action_details->recommendation_table;
                    $this->processRecommendationApplicationSubmission($request, $recommendation_table);
                }else{
                    $this->processNormalApplicationSubmission($request);
                }
        }
        else{
                 $this->processNormalApplicationSubmission($request);
        }

        
    }
    public function processImportExportManagersApplicationSubmission($request)
    {
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $keep_status = false;
        $data = DB::table('wf_workflow_actions')
                    ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                    ->select('*')
                    ->first();
        
        if($data){
                $keep_status = $data->keep_status;
                if($keep_status == 1){
                     $keep_status = true;
                }
        }
        
         $this->processNormalManagersApplicationSubmission($request, $keep_status);
    }

    public function updateQueriedImportExportApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_ImportExport_applications')
            ->where('id', $application_details->portal_id)
            ->update(array('application_status_id' => 6));
        $insert_remark = array(
            'application_id' => $application_details->portal_id,
            'remark' => $remarks,
            'urgency' => $urgency,
            'mis_created_by' => $user_id
        );
        $insert = $portal_db->table('wb_query_remarks')
            ->insert($insert_remark);
        if ($update > 0 && $insert > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function updateRejectedImportExportApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_ImportExport_applications')
            ->where('id', $application_details->portal_id)
            ->update(array('application_status_id' => 11));
        $insert_remark = array(
            'application_id' => $application_details->portal_id,
            'remark' => $remarks,
            'urgency' => $urgency,
            'mis_created_by' => $user_id
        );
        $insert = $portal_db->table('wb_rejection_remarks')
            ->insert($insert_remark);
        if ($update > 0 && $insert > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function processImportExportReturnApplicationSubmissionsWithChecklists($request, $checklist_category)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                return false;
            }
            inValidateApplicationChecklist($application_details->module_id, $application_details->sub_module_id, $application_details->section_id, $checklist_category, array($application_details->application_code));
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            return false;
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            return false;
        }
    }

    public function updateImportExportManagerQueryToCustomerPortal($portal_ids)
    {
        $portal_db = DB::connection('portal_db');
        //update portal status
        $update = $portal_db->table('wb_ImportExport_applications')
            ->whereIn('id', $portal_ids)
            ->update(array('application_status_id' => 8));
        if ($update < 1) {
            return false;
        } else {
            return true;
        }
    }

    public function singleNewImportExportApplicationApprovalSubmission($request)
    {
        $application_code = $request->input('application_code');
        try {
            $valid = $this->validateImportExportApprovalApplication($application_code);
            if ($valid == false) {
                $res = array(
                    'success' => false,
                    'message' => 'Please capture recommendation details first!!'
                );
                echo json_encode($res);
                return false;
            }
            $this->processNormalApplicationSubmission($request, true);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            return false;
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            return false;
        }
    }

    public function batchImportExportApplicationApprovalSubmission(Request $request)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name . ' as t1')
                ->join('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t1.*', 't2.decision_id')
                ->whereIn('t1.id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                return false;
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                return false;
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;

            //todo: check for allowed changes
            //1. Basic ImportExport info
            $permit_id = 'permit_id';
            $formAmendmentDetails = DB::table('tra_process_form_auth as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->select(DB::raw("CONCAT_WS(',',GROUP_CONCAT(t2.field_name),'$permit_id') AS changed"))
                ->where('t1.process_id', $process_id)
                ->first();
            //2. Personnel(id 2) and Business(id 3) details
            $othersAmendmentDetails = DB::table('tra_process_otherparts_auth as t1')
                ->select('t1.part_id')
                ->where('t1.process_id', $process_id)
                ->get();
            //end

            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $this->updateRegistrationTable($application_detail->reg_ImportExport_id, $application_detail->ImportExport_id, $module_id);
                  
                }
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'author' => $user_id,
                    'directive_id' => $directive_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $application_codes[] = array($application_detail->application_code);
            }
            //application update
            $update_params = array(
                'cc' => $to_stage
                //'application_status_id' => $application_status_id
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
            if ($app_update < 1) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                return false;
            }
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        echo json_encode($res);
        return true;
    }

    
    public function processImportExportApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails)
    {
        $user_id = $this->user_id;
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return $res;
            }
            $ImportExport_id = $application_details->ImportExport_id;
            $temp_details = DB::table('tra_ImportExport')
                ->where('id', $ImportExport_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)ImportExport details!!'
                );
                return $res;
            }
            $init_ImportExport_id = $temp_details->init_ImportExport_id;
            $current_permit_id = $temp_details->permit_id;
            //ImportExport log data
            $log_data = DB::table('tra_ImportExport as t1')
                ->select(DB::raw("t1.*,t1.id as ImportExport_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_ImportExport_id)
                ->first();
            //todo: update renewal changes
            //1. Basic ImportExport info
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic ImportExport info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $ImportExport_id, $init_ImportExport_id, $log_data);
            }
            //2. Personnel(id 2) and Business(id 3) details
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 2) {
                        //update personnel details
                        $this->updateAlterationPersonnelDetails($ImportExport_id, $init_ImportExport_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($ImportExport_id, $init_ImportExport_id);
                    }
                }
            }
            updateRenewalPermitDetails($init_ImportExport_id, $current_permit_id, 'tra_ImportExport');

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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
        return $res;
    }

    public function batchImportExportAlterationApplicationApprovalSubmission($request)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name . ' as t1')
                ->join('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t1.*', 't2.decision_id')
                ->whereIn('t1.id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                return false;
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                return false;
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //$application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $this->updateImportExportAlterationPermitDetails($application_detail->ImportExport_id);
                    $this->updateRegistrationTable($application_detail->reg_ImportExport_id, $application_detail->ImportExport_id, $module_id);
                    /* $response = $this->processAlterationImportExportApprovalApplicationSubmission($application_detail->id, $table_name);
                     $success = $response['success'];
                     if ($success == false) {
                         DB::rollBack();
                         echo json_encode($response);
                         return false;
                     }*/
                }
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'author' => $user_id,
                    'directive_id' => $directive_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $application_codes[] = array($application_detail->application_code);
            }
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage
                //'application_status_id' => $application_status_id
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
            if ($app_update < 1) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                return false;
            }
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        echo json_encode($res);
        return true;
    }

    public function updateImportExportAlterationPermitDetails($ImportExport_id)
    {
        $user_id = $this->user_id;
        try {
            //get application_details
            $current_details = DB::table('tra_ImportExport')
                ->where('id', $ImportExport_id)
                ->first();
            if (is_null($current_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (current)ImportExport details!!'
                );
                return $res;
            }
            $init_ImportExport_id = $current_details->init_ImportExport_id;
            $current_permit_id = $current_details->permit_id;
            //ImportExport log data
            $log_data = DB::table('tra_ImportExport as t1')
                ->select(DB::raw("t1.*,t1.id as ImportExport_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_ImportExport_id)
                ->first();
            $init_permit_id = $log_data->permit_id;

            $initPermitDetails = DB::table('tra_approval_recommendations as t1')
                ->select('t1.certificate_no', 't1.approval_date', 't1.expiry_date')
                ->where('t1.id', $init_permit_id)
                ->first();
            $initPermitDetails = convertStdClassObjToArray($initPermitDetails);

            DB::table('tra_approval_recommendations')
                ->where('id', $current_permit_id)
                ->update($initPermitDetails);

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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
        return $res;
    }

    public function processAlterationImportExportApprovalApplicationSubmission($application_id, $table_name)
    {
        $user_id = $this->user_id;
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return $res;
            }
            $ImportExport_id = $application_details->ImportExport_id;
            $application_code = $application_details->application_code;
            $temp_details = DB::table('tra_ImportExport')
                ->where('id', $ImportExport_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)ImportExport details!!'
                );
                return $res;
            }
            $init_ImportExport_id = $temp_details->init_ImportExport_id;
            $temp_permit_id = $temp_details->permit_id;
            //ImportExport log data
            $log_data = DB::table('tra_ImportExport as t1')
                ->select(DB::raw("t1.*,t1.id as ImportExport_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_ImportExport_id)
                ->first();
            $init_permit_id = $log_data->permit_id;
            //todo get alteration requests
            //1. Basic ImportExport info
            $formAmendmentDetails = DB::table('tra_alt_formparts_amendments as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->select(DB::raw("GROUP_CONCAT(t2.field_name) AS changed"))
                ->where('t1.application_code', $application_code)
                ->first();
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic ImportExport info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $ImportExport_id, $init_ImportExport_id, $log_data);
            }
            //2. Personnel(id 2) and Business(id 3) details
            $othersAmendmentDetails = DB::table('tra_alt_otherparts_amendments as t1')
                ->select('t1.part_id')
                ->where('t1.application_code', $application_code)
                ->get();
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 2) {
                        //update personnel details
                        $this->updateAlterationPersonnelDetails($ImportExport_id, $init_ImportExport_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($ImportExport_id, $init_ImportExport_id);
                    }
                }
            }
            //update permit details
            $this->updateAlterationPermitDetails($temp_permit_id, $init_permit_id);

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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
        return $res;
    }


    //VALIDATION FUNCTIONS
    public function validateImportExportReceivingQueriedApplication($application_id)
    {
        $return_val = true;
        //for queried there should be unclosed queries
        $unclosed_queries = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', '=', 't2.item_resp_id')
            ->where('t1.application_id', $application_id)
            ->where('t2.status', '<>', 4)
            ->count();
        if ($unclosed_queries < 1) {
            $return_val = false;
        }
        return $return_val;
    }

    public function validateImportExportInspectionApplication($application_code)
    {
        $return_val = true;
        //check if inspection details were captured
        $qry = DB::table('inspection_details as t1')
            ->join('inspection_inspectors as t2', 't1.id', '=', 't2.inspection_id')
            ->where('t1.application_code', $application_code);
        $count = $qry->count();
        if ($count < 1) {
            $return_val = false;
        }
        return $return_val;
    }
    
    public function validateImportExportApprovalApplication($application_code)
    {
        $return_val = true;
        //check if approval/recommendation details were captured
        $qry = DB::table('tra_approval_recommendations as t1')
            ->where('t1.application_code', $application_code);
        $count = $qry->count();
        if ($count < 1) {
            $return_val = false;
        }
        return $return_val;
    }
    
    public function saveDisposalpApplicationRecommendationDetails($request,$sub_module_id, $application_details)
    {
       
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
       
        if (is_null($application_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $qry = DB::table($table_name.'  as t1')
            ->where('t1.id', $application_id);
        $res = array();
        try { // 
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $application_details, &$res) {
                $ProductUpdateParams = array();
                $application_status_id = 0;
                $reference_no = $application_details->reference_no;
                $zone_id = $application_details->zone_id;
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
                $user_id = $this->user_id;
                
                $sub_module_id = $application_details->sub_module_id;
                $module_id = $application_details->module_id;
                $section_id = $application_details->section_id;
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
                    'certificate_issue_date' => $approval_date,
                    //'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );

                        $params['certificate_issue_date'] = $approval_date;
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
                          //  $prev_data_results[0]['record_id'] = $id;
                            $prev_data_results[0]['altered_by'] = $user_id;
                            unset($prev_data_results[0]['id']);
        
                            //permits no formats ref id 
                           
                            DB::table('tra_approval_recommendations')
                                ->insert($prev_data_results);
                            if ($decision_id == 1) {
                                $product_status_id = 6;
                                $portal_status_id = 10;
                                $application_status_id = 6;
                                $qry->update(array('application_status_id' => 6));
                                //permit
                                if ($prev_decision_id != 1) {
                                    
                                    
                                  
                                    $params['permit_no'] = $reference_no;
                                }
                                
                            } else {
                                $product_status_id = 3;
                                $portal_status_id = 11;
                                $application_status_id = 3;
                                $qry->update(array('application_status_id' => 7));
                                $params['permit_no'] = null;
                                
                            }

                            $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                       
                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            if ($decision_id == 1) {
                                $portal_status_id = 10;
                                $product_status_id = 6;
                                //permits
                                $application_status_id = 6;
                                
                               $params['permit_no'] = $reference_no;
                               
                                $params['expiry_date'] = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);

                                $qry->update(array('application_status_id' => 6));
                               

                            } else {
                                $portal_status_id = 11;
                                $product_status_id = 6;
                                $application_status_id = 7;
                                $qry->update(array('application_status_id' => 7));
                                $params['permit_no'] = '';
                                $params['expiry_date'] = null;
                              
                                
                            }
                            
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                          
                            $id = $res['record_id'];

                        }
                        
                        updatePortalApplicationStatusWithCode($application_code, 'wb_disposal_applications',$portal_status_id);

                        if($res['success']){
                            $app_data =  array('permit_id' => $id, 
                                                'application_code' => $application_code, 
                                                'application_status_id'=>$application_status_id,
                                                'dola' => Carbon::now(),
                                                'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_disposal_applications', $app_where);

                            $res = updateRecord('tra_disposal_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
                         
                        }
                        
            }, 5);
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

    public function savebatchpermitReleaseRecommendation(Request $request,$document_types)
    {  
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $qry = DB::table($table_name)
            ->where(array('application_code'=> $application_code));
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $res = array();


        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$document_types, &$res) {
                $premiseUpdateParams = array();
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
                $user_id = $this->user_id;
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                $sub_module_id = $app_details->sub_module_id;
                $module_id = $app_details->module_id;
                $section_id = $app_details->section_id;
                if($sub_module_id == 1){
                    $ref_id = 43;
                }
                else{$ref_id = 5;
                    
                }
                if($decision_id == 1){
                    $expiry_date =   getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);
                    
                }
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'decision_id' => $decision_id,
                    'comment' => $comment,
                    'approval_date' => $approval_date,
                    'expiry_date' => $expiry_date,
                    'appvalidity_status_id' =>2,
                    'appregistration_status_id' =>2,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                $premiseUpdateParams['certificate_issue_date'] = $approval_date;
                if (isset($id) && $id != '') {
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
                        $premise_reg_no = '';
                    if ($decision_id == 1) {
                        if ($app_details->sub_module_id == 2 || $app_details->sub_module_id == 108) {
                            $premise_reg_no = getSingleRecordColValue('registered_premises', array('id'=>$app_details->reg_premise_id), 'registration_no');
                        }
                        else{
                            $premise_reg_no= $app_details->reference_no;
                        }
                        $premiseUpdateParams['premise_reg_no'] = $premise_reg_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        if ($prev_decision_id != 1) {
                            $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id ,$sub_module_id);
                            $params['permit_no'] = $permit_no;
                        }
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['permit_no'] = null;
                    }
                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);


                } else {
                    //insert
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                $premise_reg_no = '';
                    if ($decision_id == 1) {
                        if ($app_details->sub_module_id == 2 || $app_details->sub_module_id == 108) {
                            $premise_reg_no = getSingleRecordColValue('registered_premises', array('id'=>$app_details->reg_premise_id), 'registration_no');
                        }
                        else{
                            $premise_reg_no= $app_details->reference_no;
                        }
                        
                        $premiseUpdateParams['premise_reg_no'] = $premise_reg_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        //permits
                        $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id ,$sub_module_id);
                        $params['permit_no'] = $permit_no;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['expiry_date'] = null;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
                $premiseUpdateParams['permit_id'] = $id;
               
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_premises_applications',$portal_status_id);

                if ($app_details->sub_module_id == 1 || $app_details->sub_module_id == 2 || $app_details->sub_module_id == 96 || $app_details->sub_module_id == 97) {//we only update premise validity status on new applications
                    $updates = array(
                        'validity_status_id' => $validity_status_id,
                        'registration_status_id' => $registration_status_id,
                        'registration_no' => $premise_reg_no,
                        'registration_date' => Carbon::now(),
                        'approval_date' => Carbon::now()
                    );
                    DB::table('registered_premises')
                        ->where('id', $app_details->reg_premise_id)
                        ->update($updates);
                }
                DB::table('tra_premises')
                    ->where('id', $app_details->premise_id)
                    ->update($premiseUpdateParams);
                DB::table('tra_premises_applications')
                    ->where('id', $application_id)
                    ->update(array('permit_id' => $id));
                    
                updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
            //log application Raw data to dump table
            // \App::call('Modules\AuditReport\Http\Controllers\AuditReportController@logPremiseApplicationDetails',[$application_id]);

            }, 5);

            
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
    public function saveImpExpApplicationRecommendationDetails($request,$sub_module_id, $application_details)
    {

        if (is_null($application_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        
        $selected_appcodes = $request->input('selected_appcodes');
      
        $res = array();

        
        try {
            if($selected_appcodes != ''){
                
                $selected_ids = json_decode($selected_appcodes);
               
                foreach ($selected_ids as $application_code) {
                   
                    $res = $this->saveImportExportApprovalRecommendation($application_id, $application_code, $table_name, $request, $res, $application_details);
                

                }
               
            }
            else{
                     $res = $this->saveImportExportApprovalRecommendation($application_id, $application_code, $table_name, $request, $res, $application_details);

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
    public function saveImportExportApprovalRecommendation($application_id, $application_code, $table_name, $request,  &$res, $application_details){
        $qry = DB::table($table_name.'  as t1')
            ->where('t1.id', $application_id);
        $res = array();
        try { // 
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $application_details, &$res) {
                $ProductUpdateParams = array();
                $reference_no = $application_details->reference_no;
                $zone_id = $application_details->zone_id;
                $licence_type_id = $application_details->licence_type_id;
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
                $user_id = $this->user_id;
                
                $sub_module_id = $application_details->sub_module_id;
                
                if($sub_module_id == 81){
                    $reg_importexport_id = $application_details->reg_importexport_id;
                    $reg_rec = DB::table('reg_importexport_registry')
                                ->where('id',$reg_importexport_id)
                                ->first();
                    if($reg_rec){
                        $approval_date = $reg_rec->approval_date;
                        
                    }
                }
                $module_id = $application_details->module_id;
                $section_id = $application_details->section_id;
                $directorate_director_id = getDefaultDirectorateDirector($section_id);
               
                $expiry_date = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$licence_type_id);
                 if (empty($expiry_date) || $expiry_date == ' ') {
                    $res = array(
                        'success' => false,
                        'message' => 'Expiry Details not set, Please Contact System admin!!'
                    );
                    return $res;
                }

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
                    'certificate_issue_date' => $approval_date,
                    'permit_no' => $reference_no,
                    'expiry_date' => $expiry_date,
                    'prepared_by_id' => $user_id,
                    'approved_by' => $directorate_director_id,
                    'permit_signatory' => $permit_signatory
                );

                        if($decision_id == 1){

                            $params['expiry_date'] = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);

                        }

                         if (empty($expiry_date) || $expiry_date == ' ') {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Expiry Details not set, Please Contact System admin!!'
                                );
                                return $res;
                            }
                                   
                        $params['certificate_issue_date'] = $approval_date;

                        if (validateIsNumeric($id)) {
                            //update
                            $where = array(
                                'id' => $id
                            );
                            $params['dola'] = Carbon::now();
                            $params['altered_by'] = $user_id;
                            $prev_data = getPreviousRecords('tra_managerpermits_review', $where);
                            if ($prev_data['success'] == false) {
                                return \response()->json($prev_data);
                            }
                            $prev_data_results = $prev_data['results'];
                            $prev_decision_id = $prev_data_results[0]['decision_id'];
                          //  $prev_data_results[0]['record_id'] = $id;
                            $prev_data_results[0]['altered_by'] = $user_id;
                            $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                            unset($prev_data_results[0]['id']);
        
                            //permits no formats ref id 
                           
                            if ($decision_id == 1) {
                                $product_status_id = 6;
                                $portal_status_id = 10;
                                $application_status_id = 6;
                                $validity_status_id = 2;
                                $qry->update(array('application_status_id' => 6));
                                //permit
                                if ($prev_decision_id != 1) {
                                    $params['permit_no'] = $reference_no;
                                }
                                
                            } else {
                                $product_status_id = 3;
                                $portal_status_id = 11;
                                $application_status_id = 3;
                                $validity_status_id = 4;
                                $qry->update(array('application_status_id' => 7));
                                $params['permit_no'] = null;
                                
                            }

                            $res = updateRecord('tra_managerpermits_review', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                       
                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            if ($decision_id == 1) {
                                $portal_status_id = 10;
                                $product_status_id = 6;
                                //permits
                                $application_status_id = 6;
                                
                                $validity_status_id = 2;
                               $params['permit_no'] = $reference_no;
                               
                                $params['expiry_date'] = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$licence_type_id);

                                $qry->update(array('application_status_id' => 6));
                               

                            } else {
                                $portal_status_id = 11;
                                $product_status_id = 6;
                                $application_status_id = 7;
                                $validity_status_id = 4;
                                $qry->update(array('application_status_id' => 7));
                                $params['permit_no'] = '';
                                $params['expiry_date'] = null;
                              
                                
                            }
                            
                            $res = insertRecord('tra_managerpermits_review', $params, $user_id);
                          
                            $id = $res['record_id'];

                        }
                        
                        updatePortalApplicationStatusWithCode($application_code, 'wb_importexport_applications',$portal_status_id);

                        if($res['success']){
                            $where_statement = array('app_application_code' => $application_code);
                            
                            $registration_data = array('validity_status_id'=>$validity_status_id,
                                                        'decision_id'=>$decision_id,
                                                        'application_status_id'=>$application_status_id,
                                                        'permit_no'=>$reference_no,
                                                        'approval_date'=>$approval_date,
                                                        'expiry_date'=>$expiry_date,
                                                        'app_sub_module_id'=>$sub_module_id,
                                                        'app_application_code'=>$application_code,
                                                        'created_by'=>$user_id
                                                    );
                            $res = saveApplicationRegistrationDetails('reg_importexport_registry',$registration_data,$where_statement,$user_id);
                    
                            $app_data =  array('permit_id' => $id, 
                                                'application_code' => $application_code, 
                                                'reg_importexport_id' => $res['record_id'], 
                                                'application_status_id'=>$application_status_id,
                                                'dola' => Carbon::now(),
                                                'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_importexport_applications', $app_where);

                            $res = updateRecord('tra_importexport_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
                            $where_data = array('application_code' => $application_code);
                            $current_data = array('reg_importexport_id' => $res['record_id']);
                            
                            DB::connection('portal_db')->table('wb_importexport_applications')
                            ->where($where_data)
                            ->update($current_data);
                        }
                        
            }, 5);
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
    public function saveDeclaredImportExportApplicationDetails(Request $request){
            try{
                $application_id = $request->input('application_id');
                $responsible_user = $request->input('responsible_user');
                $urgency = $request->input('urgency');
                $comment = $request->input('remarks');
                $user_id = $this->user_id;
        
                $status_type_id = $request->input('status_type_id');
                $application_code = $request->input('application_code');
                $sub_module_id = $request->input('sub_module_id');
                
                $next_stage = $request->input('next_stage');
                $applications_table = 'tra_importexport_applications';
            
                $app_previousdata = DB::table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
                
                                        if (is_null($app_previousdata)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting declared permit application details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $app_status = getApplicationInitialStatus($app_previousdata->module_id, $app_previousdata->sub_module_id);
                                        $app_status_id = $app_previousdata->application_status_id;
                                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                                        $where = array(
                                            'module_id' => $app_previousdata->module_id,
                                            'sub_module_id' => $app_previousdata->sub_module_id,
                                            'section_id' => $app_previousdata->section_id
                                        );
                                        $process_details = getTableData('wf_tfdaprocesses', $where);
                                        if (is_null($process_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                $view_id = generateApplicationViewID();
                $where2 = array(
                    'workflow_id' => $process_details->workflow_id,
                    'stage_status' => 1
                );
                $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
                if (is_null($workflow_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                    );
                    return $res;
                }
                $details = array(
                    'application_id' => $app_previousdata->id,
                    'application_code' => $application_code,
                    'view_id'=>$view_id,
                    'application_status' => $application_status,
                    'process_id' => $app_previousdata->process_id,
                    'process_name' => $process_details->name,
                    'workflow_stage_id' => $workflow_details->id,
                    'application_status_id' => $app_status_id,
                    'workflow_stage' => $workflow_details->name,
                    'module_id' => $results->module_id,
                    'sub_module_id' => $results->sub_module_id,
                    'section_id' => $results->section_id,
                    'applicant_id' => $applicant_id
                );
                //submissions
                $submission_params = array(
                    'application_id' => $application_insert['record_id'],
                    'process_id' => $process_details->id,
                    'application_code' => $application_code,
                    'tracking_no' => $tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $workflow_details->id,
                    'current_stage' => $workflow_details->id,
                    'module_id' => $results->module_id,
                    'sub_module_id' => $results->sub_module_id,
                    'section_id' => $results->section_id,
                    'application_status_id' => $app_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $applicant_id,
                    'remarks' => $comment, 'view_id'=>$view_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
    
                DB::table('tra_submissions')
                    ->insert($submission_params);
                DB::commit();
                //send email
                $vars = array(
                    '{tracking_no}' => $tracking_no
                );
                
                $res = array(
                    'success' => true,
                    'details' => $details,
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



    }
    public function saveMultiImportExportOnlineApplicationDetails(Request $request)
    {
        $res= array('success'=>false, 'message'=>'');
        $application_id = $request->input('application_id');
        $selected = $request->input('selected');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;

        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $sub_module_id = $request->input('sub_module_id');
        
        $next_stage = $request->input('next_stage');
        $applications_table = 'tra_importexport_applications';

        $selected_appCodes = $request->input('selected_appCodes');
        $selected_appCodes = json_decode($selected_appCodes);
        $selected_ids = json_decode($selected);
        foreach( $selected_appCodes as  $application_code){

            $res= $this->funcImpApplicationSubmission('',$responsible_user,$urgency,$comment,$user_id,$status_type_id,$application_code,$sub_module_id,$next_stage,$applications_table);

        }
        return $res;
    }

    public function saveImportExportOnlineApplicationDetails(Request $request)
    {


        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;

        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $sub_module_id = $request->input('sub_module_id');
        
        $next_stage = $request->input('next_stage');
        $applications_table = 'tra_importexport_applications';
        
        $res= $this->funcImpApplicationSubmission($application_id,$responsible_user,$urgency,$comment,$user_id,$status_type_id,$application_code,$sub_module_id,$next_stage,$applications_table);
        return $res;
    }
    function funcImpApplicationSubmission($application_id,$responsible_user,$urgency,$comment,$user_id,$status_type_id,$application_code,$sub_module_id,$next_stage,$applications_table){
        DB::beginTransaction();
        try {


           
            $app_previousdata = DB::table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
                                        $portal_db = DB::connection('portal_db');
                                        
                                        $qry = $portal_db->table('wb_importexport_applications as t1')
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
                                      
                                        $portal_application_id = $results->id;
                                        // if ($module_id == 4 || $module_id === 4) {
                                        //     $records = DB::connection('portal_db')
                                        //         ->table('wb_importexport_applications as t7')
                                        //         ->where('t7.application_code', $application_code)
                                        //         ->first(); // Retrieve the record
                                        
                                        //     if ($records) {
                                        //         $where = array(
                                        //             'module_id' => $results->module_id,
                                        //             'sub_module_id' => $results->sub_module_id,
                                        //             'importexport_permittype_id' => $records->licence_type_id, // Access 'licence_type_id' from $records
                                        //             'importexport_applicationtype_id' => $records->has_registered_premises, // Access 'has_registered_premises' from $records
                                        //         );
                                        //     }
                                        // } else {
                                        //     $where = array(
                                        //         'module_id' => $results->module_id,
                                        //         'sub_module_id' => $results->sub_module_id
                                        //         //'t1.section_id' => $records->section_id
                                        //     );
                                        // }

                                        $where = array(
                                                'module_id' => $results->module_id,
                                                'sub_module_id' => $results->sub_module_id
                                                //'t1.section_id' => $records->section_id
                                            );
                                        
                                        $process_details = getTableData('wf_tfdaprocesses', $where);


                                        if (is_null($process_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $process_id = $process_details->id;
                                        $where2 = array(
                                            'workflow_id' => $process_details->workflow_id,
                                            'stage_status' => 1
                                        );
                                        $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
                                        if (is_null($workflow_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                        
                               // dd($workflow_details);         
                    if($app_previousdata){

                       
                        $applicant_details = $portal_db->table('wb_trader_account')
                            ->where('id', $results->trader_id)
                            ->first();
                        
                           
                        if (is_null($applicant_details)) {
                            DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                            );
                            return $res;
                        }
                        $identification_no = $applicant_details->identification_no;
                        $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $identification_no), 'id');
                        
                        $applicant_email = $applicant_details->email;
                        
                        funcSaveOnlineImportExportOtherdetails($application_code, $user_id);
                        
                        $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                        $app_status_id = $app_status->status_id;
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                        $view_id = generateApplicationViewID();
                        $reference_no = '';
                        if($sub_module_id == 78 || $sub_module_id == 81){
                            $reference_no = $results->tracking_no;
                        }
                
                         $application_details = array(
                                'application_code' => $results->application_code,
                                'tracking_no' => $results->tracking_no,
                                'reference_no' => $reference_no,
                                'applicant_id' => $applicant_id,
                                'view_id' => $view_id,
                                'date_added' => Carbon::now(),
                                'submission_date' => $results->submission_date,
                                'sub_module_id' => $sub_module_id,
                                'module_id' => $module_id,
                                'section_id' => $results->section_id,
                                'vc_application_type_id' => $results->vc_application_type_id,
                                'is_registered' => $results->is_registered,
                                'importer_licence_number' => $results->importer_licence_number,
                                'applicant_contact_person' => $results->applicant_contact_person,
                                'reg_importexport_id' => $results->reg_importexport_id,
                                'importexport_product_range_id' => $results->importexport_product_range_id,
                                'contact_person_id' => $results->contact_person_id,
                                'importation_reason_id' => $results->importation_reason_id,
                                'product_category_id' => $results->product_category_id,
                                'applicant_as_consignee' => $results->applicant_as_consignee,
                                 'entry_country_id' => $results->entry_country_id,
                                'otherpermit_reason' => $results->otherpermit_reason,
                                'has_registered_premises' => $results->has_registered_premises,
                                'business_type_id' => $results->business_type_id,
                                'product_classification_id' => $results->product_classification_id,
                                'licence_type_id' => $results->licence_type_id,
                                'port_id' => $results->port_id,
                                'mode_oftransport_id' => $results->mode_oftransport_id,
                                'proforma_invoice_no' => $results->proforma_invoice_no,
                                'proforma_invoice_date' => formatDate($results->proforma_invoice_date),
                                'paying_currency_id' => $results->paying_currency_id, 'proforma_currency_id' => $results->proforma_currency_id,
                                'consignee_options_id' => $results->consignee_options_id,
                                'consignee_id' => $results->consignee_id,
                                'sender_receiver_id' => $results->sender_receiver_id,
                                'premise_id' => $results->premise_id,
                                'process_id' => $process_details->id,
                                'workflow_stage_id' => $workflow_details->id,
                                'application_status_id' => $app_status_id,
                                'portal_id' => $portal_application_id,
                                'created_on' => Carbon::now(),
                                'created_by' => $user_id
                            );
                                   
                        $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data);
                             $app_previousdata = $app_previousdata['results'];
                            $application_insert =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, '');


                        if ($application_insert['success'] == false) {
                            DB::rollBack();
                            //application_insert identification_no
                            return $application_insert;
                        }
                        if($sub_module_id==81 || $sub_module_id===81){
                            $portal_params = array(
                            'application_status_id' => 4
                        );
                        }else{
                            $portal_params = array(
                            'application_status_id' => 3
                        );
                        }
                        
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                       
                    }
                    else{
                        
                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                        
                        $application_code = $results->application_code;;
            
                        $applicant_details = $portal_db->table('wb_trader_account')
                            ->where('id', $results->trader_id)
                            ->first();
                        
                           
                        if (is_null($applicant_details)) {
                            DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                            );
                            return $res;
                        }
                        $identification_no = $applicant_details->identification_no;
                        
                        $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
                        
                        $applicant_email = $applicant_details->email;
                        
                        funcSaveOnlineImportExportOtherdetails($application_code, $user_id);
                        
                        $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                        $app_status_id = $app_status->status_id;
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                        $view_id = generateApplicationViewID();
                        $reference_no = '';
                        if($sub_module_id == 78 || $sub_module_id == 81){
                            $reference_no = $results->tracking_no;
                        }
                         $application_details = array(
                            'application_code' => $results->application_code,
                            'tracking_no' => $results->tracking_no,
                            'reference_no' => $reference_no,
                            'applicant_id' => $applicant_id,
                            'view_id' => $view_id,
                            'date_added' => Carbon::now(),
                            'submission_date' => $results->submission_date,
                            'sub_module_id' => $sub_module_id,
                            'module_id' => $module_id,
                            'section_id' => $results->section_id,
                            'vc_application_type_id' => $results->vc_application_type_id,
                            'is_registered' => $results->is_registered,
                            'importer_licence_number' => $results->importer_licence_number,
                            'reg_importexport_id' => $results->reg_importexport_id,
                            'importexport_product_range_id' => $results->importexport_product_range_id,
                            'otherpermit_reason' => $results->otherpermit_reason,
                            'has_registered_premises' => $results->has_registered_premises,
                            'contact_person_id' => $results->contact_person_id,
                            'importation_reason_id' => $results->importation_reason_id,
                            'product_category_id' => $results->product_category_id,
                            'business_type_id' => $results->business_type_id,
                            'product_classification_id' => $results->product_classification_id,
                            'licence_type_id' => $results->licence_type_id,
                            'port_id' => $results->port_id,
                            'applicant_contact_person' => $results->applicant_contact_person,
                            'mode_oftransport_id' => $results->mode_oftransport_id,
                            'proforma_invoice_no' => $results->proforma_invoice_no,
                            'proforma_invoice_date' => formatDate($results->proforma_invoice_date),
                            'paying_currency_id' => $results->paying_currency_id, 'proforma_currency_id' => $results->proforma_currency_id,
                            'applicant_as_consignee' => $results->applicant_as_consignee,
                            'entry_country_id' => $results->entry_country_id,
                            'consignee_options_id' => $results->consignee_options_id,
                            'consignee_id' => $results->consignee_id,
                            'sender_receiver_id' => $results->sender_receiver_id,
                            'premise_id' => $results->premise_id,
                            'process_id' => $process_details->id,
                            'workflow_stage_id' => $workflow_details->id,
                            'application_status_id' => $app_status_id,
                            'portal_id' => $portal_application_id,
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        
                        $application_insert = insertRecord('tra_importexport_applications', $application_details, $user_id);
                        if ($application_insert['success'] == false) {
                            DB::rollBack();
                            return $application_insert;
                        }
                        $application_id = $application_insert['record_id'];
                        $table_name = 'tra_importexport_applications';
                        $process_id = $process_details->id;
                        
                        $section_id =  $results->section_id;
                         $codes_array = $this->getImportExpApplicationReferenceCodes($results);
                           if($reference_no != ''){
                               $portal_params = array(
                                'reference_no' => $reference_no
                            );
                           }else{
                               
                            $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  1, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);
    
                            if ($refno_details['success'] == false) {
                                echo json_encode($refno_details);
                                exit();
                            }
                            
                            $portal_params = array(
                                'reference_no' => $refno_details['ref_no']
                            );
                           }
                            $portal_where = array(
                                'application_code' => $application_code
                            );
                            updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                         if($sub_module_id==81 || $sub_module_id===81){
                            $portal_params = array(
                            'application_status_id' => 4
                        );
                        }else{
                            $portal_params = array(
                            'application_status_id' => 3
                        );
                        }
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_importexport_applications', $portal_params, $portal_where);
                        
                      
                    }

                    $details = array(
                        'application_id' => $application_insert['record_id'],
                        'application_code' => $application_code,
                        'view_id'=>$view_id,
                        'application_status' => $application_status,
                        'process_id' => $process_details->id,
                        'process_name' => $process_details->name,
                        'workflow_stage_id' => $workflow_details->id,
                        'application_status_id' => $app_status_id,
                        'workflow_stage' => $workflow_details->name,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'section_id' => $results->section_id,
                        'applicant_id' => $applicant_id
                    );
                    //submissions
                    $submission_params = array(
                        'application_id' => $application_insert['record_id'],
                        'process_id' => $process_details->id,
                        'application_code' => $application_code,
                        'tracking_no' => $tracking_no,
                        'usr_from' => $user_id,
                        'usr_to' => $responsible_user,
                        'previous_stage' => $workflow_details->id,
                        'current_stage' => $workflow_details->id,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'section_id' => $results->section_id,
                        'application_status_id' => $app_status_id,
                        'urgency' => $urgency,
                        'applicant_id' => $applicant_id,
                        'remarks' => $comment, 'view_id'=>$view_id,
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                    DB::table('tra_submissions')
                        ->insert($submission_params);
                    DB::commit();
                    //send email
                    $vars = array(
                        '{tracking_no}' => $tracking_no
                    );
                    onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);

            //email 4 localagent_email
            $res = array(
                'success' => true,
                'details' => $details,
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
    }
    
    public function saveDisposalOnlineApplicationDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;

        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $sub_module_id = $request->input('sub_module_id');
        
        $next_stage = $request->input('next_stage');
        $applications_table = 'tra_disposal_applications';
        DB::beginTransaction();
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_disposal_applications as t1')
            ->select('t1.*')
            ->where('t1.id', $application_id);
       $results = $qry->first();

            $app_previousdata = DB::table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();

                                        $applicant_details = $portal_db->table('wb_trader_account')
                                            ->where('id', $results->trader_id)
                                            ->first();
                                          
                                       
                                            
                                            if (is_null($applicant_details)) {
                                                DB::rollBack();
                                                $res = array(
                                                    'success' => false,
                                                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                                                );
                                                return $res;
                                            }
                                      
                                       
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
                                        $process_details = getTableData('wf_tfdaprocesses', $where);
                                        if (is_null($process_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting process details, consult System Admin!!'
                                            );
                                            return $res;
                                        }
                                        $process_id = $process_details->id;
                                        $where2 = array(
                                            'workflow_id' => $process_details->workflow_id,
                                            'stage_status' => 1
                                        );
                                        $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));

                                        if (is_null($workflow_details)) {
                                            $res = array(
                                                'success' => false,
                                                'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                                            );
                                            return $res;
                                        }

                                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                                        $view_id = generateApplicationViewID();
                       
                                        $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                                        $app_status_id = $app_status->status_id;
                                        $identification_no = $applicant_details->identification_no;
                                        $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
                        
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
                                            'otherproposedmethod_of_disposal' => $results->otherproposedmethod_of_disposal,  
                                            'applicant_id'=>$applicant_id,
                                            'workflow_stage_id' => $workflow_details->id,
                                            'process_id' => $process_details->id,
                                            'workflow_stage_id' => $workflow_details->id,
                                            'application_status_id' => $app_status_id,
                                            'portal_id' => $portal_application_id,
                                            
                                        );  
 
                                                    
                    if($app_previousdata){

                        $application_details['dola'] = Carbon::now();
                        $application_details['altered_by'] = $user_id;
                        
                        $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
                        
                        $applicant_email = $applicant_details->email;
                        
                        funcSaveOnlineDisposalOtherdetails($application_code, $user_id);
                        
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                        $view_id = generateApplicationViewID();
                        
                        
                        $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data);
                             $app_previousdata = $app_previousdata['results'];
                            $application_update =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, '');


                        if ($application_update['success'] == false) {
                            DB::rollBack();
                            return $application_update;
                        } $record_id = $application_update['record_id'];
                        
                        $portal_params = array(
                            'application_status_id' => 3
                        );
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_disposal_applications', $portal_params, $portal_where);
                       
                    }
                    else{
                        $application_details['created_on'] = Carbon::now();
                        $application_details['created_by'] = $user_id;
                        $application_details['added_on'] = Carbon::now();
                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                        
                        $application_code = $results->application_code;;
            
                        $applicant_details = $portal_db->table('wb_trader_account')
                            ->where('id', $results->trader_id)
                            ->first();
                        
                           
                        if (is_null($applicant_details)) {
                            DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                            );
                            return $res;
                        }
                        
                       
                        $applicant_email = $applicant_details->email;
                        
                        funcSaveOnlineDisposalOtherdetails($application_code, $user_id);
                        
                        $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                        $app_status_id = $app_status->status_id;
                        $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                       
                        $application_insert = insertRecord($applications_table, $application_details, $user_id);
                        if ($application_insert['success'] == false) {
                            DB::rollBack();
                            return $application_insert;
                        }
                        $record_id = $application_insert['record_id'];
                        $portal_params = array(
                            'application_status_id' => 3
                        );
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_disposal_applications', $portal_params, $portal_where);
                        
                    }

                    $details = array(
                        'application_id' => $record_id,
                        'application_code' => $application_code,
                        'view_id'=>$view_id,
                        'application_status' => $application_status,
                        'process_id' => $process_details->id,
                        'process_name' => $process_details->name,
                        'workflow_stage_id' => $workflow_details->id,
                        'application_status_id' => $app_status_id,
                        'workflow_stage' => $workflow_details->name,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'section_id' => $results->section_id,
                        'applicant_id' => $applicant_id
                    );
                    //submissions
                    $submission_params = array(
                        'application_id' => $record_id,
                        'process_id' => $process_details->id,
                        'application_code' => $application_code,
                        'tracking_no' => $tracking_no,
                        'usr_from' => $user_id,
                        'usr_to' => $responsible_user,
                        'previous_stage' => $workflow_details->id,
                        'current_stage' => $workflow_details->id,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'section_id' => $results->section_id,
                        'application_status_id' => $app_status_id,
                        'urgency' => $urgency,
                        'applicant_id' => $applicant_id,
                        'remarks' => $comment, 'view_id'=>$view_id,
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
        
                    DB::table('tra_submissions')
                        ->insert($submission_params);

                    DB::commit();
                    //send email
                    $vars = array(
                        '{tracking_no}' => $tracking_no
                    );

                    onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);

            //email 4 localagent_email
            $res = array(
                'success' => true,
                'details' => $details,
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
    }
}