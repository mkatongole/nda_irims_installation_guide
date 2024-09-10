<?php

namespace Modules\ImportExportApp\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ImportExportAppController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('importexportapp::index');
    }
	public function saveControlledDrugsImptPermitApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;
            $is_registered = $req->is_registered;
            $tracking_no = $req->tracking_no;
            $section_id = $req->section_id;
            $process_id= $req->process_id;
            $product_category_id= $req->product_category_id;
            $zone_id = $req->zone_id;
			$device_type_id = $req->device_type_id;
           // $section_id = 14;
            $application_code = $req->application_code;
            $license_application_code = $req->license_application_code;

            $app_data = array(
                            'section_id'=>$req->section_id,
                            'sub_module_id'=>$req->sub_module_id,
                            'module_id'=>$req->module_id,
                            'process_id'=>$process_id,
                            'permit_category_id'=>$req->permit_category_id,
                            'import_typecategory_id'=>$req->import_typecategory_id,
                            'permit_reason_id'=>$req->permit_reason_id,
                            'has_registered_outlets'=>$req->has_registered_outlets,
                            'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
                            'mode_oftransport_id'=>$req->mode_oftransport_id,
                            'product_classification_id'=>$req->product_classification_id,
                            'business_type_id'=>$req->business_type_id,
                            'premise_id'=>$req->premise_id,
                            'product_category_id'=>$req->product_category_id,
                            'manufacturing_site_id'=>$req->manufacturing_site_id,
                            'psu_no'=>$req->psu_no,
                            'pharmacist_id'=>$req->pharmacist_id,
                            'importer_licence_number' => $req->importer_licence_number,
                            'importexport_product_range_id'=>json_encode($req->importexport_product_range_id),
                            'reference_no' => $req->reference_no, 
                            'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
                            'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
                            'document_upload_id' => $req->document_upload_id,
                            'has_registered_premises' =>$req->has_registered_premises,
                            'licence_type_id' => $req->licence_type_id, 
                                    //business details
                            'tpin_no' => $req->tpin_no,
                            'physical_address' => $req->physical_address,
                            'email' => $req->email,
                            'company_registration_no' => $req->company_registration_no,
                            'name' => $req->name,
                            'tpin_id'=>$req->tpin_id,
                            'port_id'=>$req->port_id,
                            'proforma_invoice_no'=>$req->proforma_invoice_no,
                            'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                            'paying_currency_id'=>$req->paying_currency_id,
                            'proforma_currency_id'=>$req->proforma_currency_id,
                            'consignee_options_id'=>$req->consignee_options_id,
                            'consignee_id'=>$req->consignee_id,
                            'sender_receiver_id'=>$req->sender_receiver_id,
                            'permit_productscategory_id'=>$req->permit_productscategory_id,
                            'zone_id'=>$req->zone_id,
                            'trader_id'=>$trader_id
                                );

                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                        if(validateIsNumeric($application_id)){
                               $where_app = array('id'=>$application_id);
                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                  
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                $permittype_code = getSingleRecordColValue('par_importexport_permittypes', array('id' => $req->importexport_permittype_id), 'code','mis_db');
                                $ref_id = 0;
                                if($sub_module_id == 61){
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'importexport_permittype_id'=>$req->importexport_permittype_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');

                                }
                                else{
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                }
                               
                                $codes_array = array(
                                    'apptype_code'=>$apptype_code,
                                    'section_code'=>$section_code,
                                    'zone_code'=>$zone_code,
                                    'permittype_code'=>$permittype_code,
                                );
                                        
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                              
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
                               $app_data['process_id'] =   $process_id;
                                   
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                              
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                     // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                        saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                                //save Permits Import Products 
                                $res =$this->saveCOntrolDrugsImportPermitProducts($license_application_code,$application_code,$trader_email);
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                        'product_category_id'=>$product_category_id,
                                        'is_registered'=>$is_registered,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Permit Application Saved Successfully, with Tracking No: '.$tracking_no); 
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Permit Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			
			 return response()->json($res, 200);  

    }

public function getTradersRegisteredGMPApplications(Request $req){
    try{
        $trader_id = $req->mistrader_id;
        $section_id = $req->section_id;
        $validity_status = $req->section_id;
        $registration_status = $req->registration_status;
       DB::connection('mis_db')->enableQueryLog();
       $data = DB::connection('mis_db')->table('tra_manufacturing_sites as t1')
            ->leftJoin('registered_manufacturing_sites as t4','t1.id','=','t4.tra_site_id')
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

            ->select('t8.name as validity_status','t1.email', 't1.email as email_address','t15.name as registration_status','t1.name as manufacturing_site_name','t1.ltr_id as premise_id', 't18.gmp_type_id', 't7.name as local_agent_name','t20.start_date', 't9.name as premise_name','t5.name as country', 't6.name as region', 't1.*', 't2.permit_no', 't3.name as applicant_name',
                't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no',
                't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address','t1.applicant_as_ltr as trader_aslocal_agent', 
                't3.telephone_no as app_telephone','t17.name as manufacturer_name', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website','t1.id as initial_site_id','t4.id as registered_id')
            //->whereIn('t4.validity_status', array(2, 4))
            ->whereIn('t18.gmp_type_id', array(2));
            //->get();
            if (validateIsNumeric($validity_status)) {
                //$data =  $data->where('t4.validity_status', $validity_status);
            }
            if (validateIsNumeric($registration_status)) {
                //$data =   $data->where('t4.registration_status', $registration_status);
            }
           $data =  $data->groupBy('t4.id')->get();
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
                    t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t5.name as validity_status, t2.appvalidity_status_id as validity_status_id"))->where('t1.business_type_id',$business_type_id)->whereIn('t2.appvalidity_status_id', array(2, 4));
    

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

	public function getControlledImportPermitsApplicationLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            $sub_module_id = $req->sub_module_id;
            $application_status_ids = explode(',',  $application_status_id);
            
            $module_id = 12;
            $section_id = $req->section_id;
            $is_orderlocal_supply = $req->is_orderlocal_supply;

            $data = array();

            $records = DB::table('wb_importexport_applications as t1')
                ->select('t1.*','t7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('wb_processstatus_actions as t6',function($join){
                    $join->on('t1.application_status_id', '=', 't6.status_id')
                         ->on('t6.is_default_action', '=', DB::raw(1));
                })
                ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                ->where(array('t1.trader_id' => $trader_id))
                ->groupBy('t1.application_code')
                ->orderBy('t1.date_added','desc');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                }if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }
                if(validateIsNumeric($module_id)){
                    $records =  $records->where(array('t1.module_id'=>$module_id));
                }
				if($is_orderlocal_supply == 1){
                    $records->whereIn('t1.sub_module_id', [71]);
                }
                else{
                    $records->whereNotIn('t1.sub_module_id', [71]);

                }
                
                //the ilters 
                $records = $records->get();
                $data = $this->getPermitApplications($records);
                $res =array('success'=>true,'data'=> $data);
        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);

    }

    public function getDeclarationDetails(Request $req){
    $TrackingNumber = $req->TrackingNumber;
    $data = DB::table('wb_importexport_applications as t1')
                ->where(array('tracking_no'=>$TrackingNumber))
                ->get();
    return response()->json(array('data'=>$data));
}

public function getControlledSubstance(Request $req){
    $ControlledSubstance = $req->ControlledSubstance;
   // $data = DB::table('par_controlled_substance_convertion_factors as t1')
    $data = DB::connection('mis_db')->table('par_controlled_substance_convertion_factors as t1')
                ->where(array('controlled_substance_id'=>$ControlledSubstance))
                ->get();
    return response()->json(array('data'=>$data));
}

    
    public function getApprovedControlledLicensesApplicationLoading(Request $req){
        try{
            $mistrader_id = $req->mistrader_id;
            $application_status_id = $req->application_status_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_id = $req->sub_module_id;
            $module_id = 12;
            $section_id = $req->section_id;

            $data = array();

            $records = DB::connection('mis_db')->table('tra_importexport_applications as t1')
                ->select(DB::raw("t1.*,t3.name as application_type,t4.name as permit_reason,t5.name as port_name,t6.name as sender_receiver,t7.permit_no as controlled_drugslicense_no,t7.application_code as license_application_code, t1.date_added,t7.approval_date as approved_on  "))
                ->leftJoin('sub_modules as t3', 't1.sub_module_id','=','t3.id')
                ->leftJoin('par_permit_reasons as t4', 't1.permit_reason_id','=','t4.id')
                ->leftJoin('par_ports_information as t5', 't1.port_id','=','t5.id')
                ->leftJoin('tra_permitsenderreceiver_data as t6', 't1.sender_receiver_id','=','t6.id')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code','=','t7.application_code')
                ->where(array('t1.applicant_id' => $mistrader_id))
                ->orderBy('t1.date_added','desc');
                
                if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }
                   
                  
                //the ilters 
                $records = $records->get();

                //$data = $this->getPermitApplications($records);
                $res =array('success'=>true,'data'=> $records);
        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);

    }


    public function getImportExportAppSubmissionGuidelines(Request $req){
        
            $sub_module_id = $req->sub_module_id;
            $licence_type_id= $req->licence_type_id;
            $data = DB::table('wb_appsubmission_termscondition')
            ->where(array('sub_module_id',$sub_module_id,'licence_type_id',$licence_type_id))
            ->orderBy('order_no')
            ->get();  

        $res = array('data'=>$data,'success'=>true);

        return response()->json($res);
    }


public function updateImportExportApplication(Request $req){
    try{
        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_id = $req->application_id;
        $paying_currency_id = $req->paying_currency_id;
        $error_message = 'Error occurred, data not saved successfully';

        $table_name = 'wb_importexport_applications';

        $reportingapp_data  = array( 
                        'paying_currency_id'=>$paying_currency_id,
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
	public function saveControlDrugsLicensedetails(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
        $unit_price = $req->unit_price;
        $currency_id = $req->currency_id;
        $packaging_unit_id = $req->packaging_unit_id;
        $quantity = $req->quantity;
        $product_id = $req->product_id;
        $record_id = $req->id;
        
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        $section_id = 7;
       // $permit_prod =$this->getPermitBrandName($product_id);
      
        $table_name = 'wb_permits_products';
                $data = array('application_code'=>$application_code,
                           
                            'section_id'=>$section_id,
                            'quantity'=>$quantity,
                            'product_strength'=>$req->product_strength,
                            'product_registration_no'=>$req->product_registration_no,
                            'product_id'=>$product_id,
                            'conversion_unit'=>$req->conversion_unit,
                           
                            'is_registered_product'=>$req->is_registered_product,
                            'unitpack_unit_id'=>$req->unitpack_unit_id,
                            'dosage_form_id'=>$req->dosage_form_id,
                            'purpose_of_drugsuse'=>$req->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$req->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$req->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$req->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$req->gramsbasesiunit_id,
                            'drugs_content'=>$req->drugs_content,
                            'strength_asgrams'=>$req->strength_asgrams,
                            'controlleddrug_base'=>$req->controlleddrug_base,
                            'pack_unit'=>$req->pack_unit,
                            'unit_price'=>$req->unit_price,
                            'currency_id'=>$req->currency_id,
                            'drugspackaging_type_id'=>$req->drugspackaging_type_id,
                            );
							
                            $data['permitbrand_name'] = $req->brand_name;
               

                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                        
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);
                        $record_id = $resp['record_id'];     
                        if($resp['success']){
                            $res =  array('success'=>true,
                            'record_id'=>$record_id,
                            'message'=>'Saved Successfully');
            
                        }
                        else{
                            $res =  array('success'=>false,
                            'message'=>$error_message);
            
                        }
                    
                   
                } 
                
    } catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
}



public function getApprovedControlledDrugsPermits(Request $req){
        try{    
            $mistrader_id = $req->mistrader_id;
            $sub_module_id =  $req->sub_module_id;

        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
    }







	public function getOnlineControlDrugsImpermitsproductsDetails(Request $req){
        try{
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_permits_products as t1')
                ->join('wb_importexport_applications as t2', 't1.application_code','=','t2.application_code')
                ->select(DB::raw("t1.*,t2.sub_module_id, t2.section_id, '' as certificate_no"))
                ->where(array('t1.application_code' => $application_code))
                ->get();
			
                $data = $this->getControlledProductsPermitDetails($records);
                $res =array('success'=>true,'results'=> $data);
        }
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
       }
	   public function getControlledProductsPermitDetails($records){
        $data = array();
    
        $currencyData = getParameterItems('par_currencies','');
       
        $packagingData = getParameterItems('par_packaging_units','','');
        $controlDrugsTypesData = getParameterItems('par_controlleddrugs_types','');
        $controlDrugsSubstanceData = getParameterItems('par_controlled_drugssubstances','');
        $controlDrugsSaltData = getParameterItems('par_controlleddrugs_basesalts','');
        $dosageFormData = getParameterItems('par_dosage_forms','');
        
        
        
        foreach ($records as $rec) {
            $packaging_type = returnParamFromArray($packagingData,$rec->drugspackaging_type_id);
            
           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                           'pack_unit'=>$rec->pack_unit,
                           'controlleddrug_base'=>$rec->controlleddrug_base,
                           'strength_asgrams'=>$rec->strength_asgrams,
                           'drugs_content'=>$rec->drugs_content,
                           'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                           'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                           'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                           'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                           'is_registered_product'=>$rec->is_registered_product,
                           'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                           'country_oforigin_id'=>$rec->country_oforigin_id,
                           'product_registration_no'=>$rec->product_registration_no,
                           'pack_size'=>$rec->pack_size,
                           'pack_unit_id'=>$rec->pack_unit_id,
                           'conversion_unit'=>$rec->conversion_unit,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                           'product_strength'=>$rec->product_strength,
                           
                           'dosage_form_id'=>$rec->dosage_form_id,
                           'product_packaging'=>$rec->product_packaging,
    
                           'brand_name'=>$rec->permitbrand_name,
                           'permitbrand_name'=>$rec->permitbrand_name,
                           'id'=>$rec->id,
                           'packaging_units'=>$rec->pack_unit.' ml '. $packaging_type,
                           'controlleddrugs_type'=>returnParamFromArray($controlDrugsTypesData,$rec->controlleddrugs_type_id),'controlled_drugssubstances'=>returnParamFromArray($controlDrugsSubstanceData,$rec->controlled_drugssubstances_id),
                           'controlleddrugs_basesalt'=>returnParamFromArray($controlDrugsSaltData,$rec->controlleddrugs_basesalt_id),'dosage_form'=>returnParamFromArray($dosageFormData,$rec->dosage_form_id),
                           'pack_unitdetails'=>$rec->pack_unit.' ml '. $packaging_type,
                           'unit_price'=>$rec->unit_price,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
                
        }
        return $data;
       }
 public function getControlledDrugsLicensesProdDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        $records = DB::table('wb_permits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getControlledDrugsProductsDetails($records);

            $res =array('success'=>true,'data'=> $data);
    }
    catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
   }
   public function getControlledDrugsProductsDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
   
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $controlDrugsTypesData = getParameterItems('par_controlleddrugs_types','','mis_db');
    $controlDrugsSubstanceData = getParameterItems('par_controlled_drugssubstances','','mis_db');
    $controlDrugsSaltData = getParameterItems('par_controlleddrugs_basesalts','','mis_db');
    $dosageFormData = getParameterItems('par_dosage_forms','','mis_db');
    
    $parDrugsPackagingTypeData = getParameterItems('par_drugspackaging_types','','mis_db');

    
    foreach ($records as $rec) {
        $packaging_type = returnParamFromArray($packagingData,$rec->drugspackaging_type_id);
        
       $data[] = array('application_code'=>$rec->application_code,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                       'pack_unit'=>$rec->pack_unit,
                       'controlleddrug_base'=>$rec->controlleddrug_base,
                       'strength_asgrams'=>$rec->strength_asgrams,
                       'drugs_content'=>$rec->drugs_content,
                       'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                       'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                       'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                       'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                       'is_registered_product'=>$rec->is_registered_product,
                       'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                       'country_oforigin_id'=>$rec->country_oforigin_id,
                       'product_registration_no'=>$rec->product_registration_no,
                       'pack_size'=>$rec->pack_size,
                       'pack_unit_id'=>$rec->pack_unit_id,
                       'conversion_unit'=>$rec->conversion_unit,
                       'unitpack_size'=>$rec->unitpack_size,
                       'unitpack_unit_id'=>$rec->unitpack_unit_id,
                       'product_strength'=>$rec->product_strength,
                       
                       'dosage_form_id'=>$rec->dosage_form_id,
                       'product_packaging'=>$rec->product_packaging,

                       'brand_name'=>$rec->permitbrand_name,
                       'permitbrand_name'=>$rec->permitbrand_name,
                       'id'=>$rec->id,
                       'packaging_units'=>$rec->pack_unit.' ml '. $packaging_type,
                       'controlleddrugs_type'=>returnParamFromArray($controlDrugsTypesData,$rec->controlleddrugs_type_id),'controlled_drugssubstances'=>returnParamFromArray($controlDrugsSubstanceData,$rec->controlled_drugssubstances_id),
                       'controlleddrugs_basesalt'=>returnParamFromArray($controlDrugsSaltData,$rec->controlleddrugs_basesalt_id),'dosage_form'=>returnParamFromArray($dosageFormData,$rec->dosage_form_id),
                       'pack_unitdetails'=>$rec->pack_unit.' ml '. $packaging_type,
                       'unit_price'=>$rec->unit_price,
                       'total_value'=>($rec->unit_price*$rec->quantity),
                   );
            
    }
    return $data;
   }
    public function saveCOntrolDrugsImportPermitProducts($license_application_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$license_application_code))->get();
            $res = '';
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$application_code,
                            'product_packaging'=>$rec->product_packaging,'packaging_unit_id'=>$rec->packaging_unit_id,
                            'dosage_form_id'=>$rec->dosage_form_id,'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'is_registered_product'=>$rec->is_registered_product,
                            'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                            'drugs_content'=>$rec->drugs_content,
                            'strength_asgrams'=>$rec->strength_asgrams,
                            'controlleddrug_base'=>$rec->controlleddrug_base,
                            'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                            'created_by'=>$trader_email,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
                  
            }
    }
    public function saveImportExportApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = 4;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
			$device_type_id = $req->device_type_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference() 731
            $where_app = array('application_code'=>$application_code);
							if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
							//	initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Applicatio'.rand(0,1000), '');
							}
							$process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                            
                               
            $app_data = array(
                            'section_id'=>$req->section_id,
                            'sub_module_id'=>$req->sub_module_id,
                            'module_id'=>$req->module_id,
                            'process_id'=>$process_id,
                            'permit_category_id'=>$req->permit_category_id,
                            'import_typecategory_id'=>$req->import_typecategory_id,
                            'permit_reason_id'=>$req->permit_reason_id,
                            'has_registered_outlets'=>$req->has_registered_outlets,
                            'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
                            'mode_oftransport_id'=>$req->mode_oftransport_id,
                            'product_classification_id'=>$req->product_classification_id,
                            'business_type_id'=>$req->business_type_id,
                            'premise_id'=>$req->premise_id,
                            'product_category_id'=>$req->product_category_id,
                            'manufacturing_site_id'=>$req->manufacturing_site_id,
                            'psu_no'=>$req->psu_no,
                            'pharmacist_id'=>$req->pharmacist_id,
                            'importer_licence_number' => $req->importer_licence_number,
                            'importexport_product_range_id'=>json_encode($req->importexport_product_range_id),
                            'reference_no' => $req->reference_no, 
                            'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
                            'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
                            'document_upload_id' => $req->document_upload_id,
                            'has_registered_premises' =>$req->has_registered_premises,
                            'licence_type_id' => $req->licence_type_id, 
                                    //business details
                            'tpin_no' => $req->tpin_no,
                            'physical_address' => $req->physical_address,
                            'email' => $req->email,
                            'company_registration_no' => $req->company_registration_no,
                            'name' => $req->name,
                            'tpin_id'=>$req->tpin_id,
                            'port_id'=>$req->port_id,
                            'proforma_invoice_no'=>$req->proforma_invoice_no,
                            'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                            'paying_currency_id'=>$req->paying_currency_id,
                            'proforma_currency_id'=>$req->proforma_currency_id,
                            'consignee_options_id'=>$req->consignee_options_id,
                            'consignee_id'=>$req->consignee_id,
                            'sender_receiver_id'=>$req->sender_receiver_id,
                            'permit_productscategory_id'=>$req->permit_productscategory_id,
                            'zone_id'=>$req->zone_id,
                            'trader_id'=>$trader_id
                        );
            

						 if($sub_module_id == 49){

                            $app_data['shipment_date'] = $req->shipment_date;
                            $app_data['proposed_inspection_date'] = $req->proposed_inspection_date;
                            $app_data['clearing_agent'] = $req->clearing_agent;
                            $app_data['custom_declaration_no'] = $req->custom_declaration_no;

                        }
						if($sub_module_id == 87){


                            $app_data['name'] = $req->name;
                            $app_data['email'] = $req->email;
                            $app_data['country_id'] = $req->country_id;
                            $app_data['region_id'] = $req->region_id;
                            $app_data['district_id'] = $req->district_id;
                            $app_data['county_id'] = $req->county_id;
                            $app_data['sub_county_id'] = $req->sub_county_id;
                            $app_data['application_type_id'] = $req->application_type_id;
                            $app_data['parish_id'] = $req->parish_id;
                            $app_data['village'] = $req->village;
                            $app_data['street'] = $req->street;
                            $app_data['telephone_no'] = $req->telephone_no;
                            $app_data['applicant_contact_id'] = $req->applicant_contact_id;

                            $app_data['has_medical_prescription'] = $req->has_medical_prescription;
                            $app_data['patients_email_address'] = $req->patients_email_address;
                            $app_data['patients_fullnames'] = $req->patients_fullnames;
                            $app_data['patients_identification_no'] = $req->patients_identification_no;
                            $app_data['patients_phone_no'] = $req->patients_phone_no;
                            $app_data['patients_physical_address'] = $req->patients_physical_address;
                            $app_data['patientscountry_id'] = $req->patientscountry_id;
                            $app_data['patientsdistrict_id'] = $req->patientsdistrict_id;
                            $app_data['patientsregion_id'] = $req->patientsregion_id;
                            $app_data['hospital_address'] = $req->hospital_address;
                            $app_data['prescribing_doctor'] = $req->prescribing_doctor;
                            $app_data['prescribling_hospital'] = $req->prescribling_hospital;
                            $app_data['prescription_date'] = formatDate($req->prescription_date);
                            $app_data['prescription_no'] = $req->prescription_no;
                            $app_data['reason_for_authorisation'] = $req->reason_for_authorisation;

                        }
	
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;

                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);


                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);

                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                
                                $deviceTypecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code','mis_db');
                                $ref_id = 0;
                                
                                if($section_id == 4){
                                       
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code,
                                            'device_typecode'=>$deviceTypecode,
                                            'app_typecategory'=>$apptype_categorycode
                                        );
                               }
                               else{
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code
                                        );
                               }
                             
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                             
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
								
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no; 
                               $app_data['reference_no'] =   $tracking_no;
							   $app_data['importer_licence_number'] =   $tracking_no;
                               $app_data['application_status_id'] = 1;
                               $app_data['application_code'] =   $application_code;


                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);

                             
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                    //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                      //  saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Licence Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Licence Application not saved, it this persists contact the system Administrator');
                         }


                        //  if(validateIsNumeric($application_id)){

  
                        //     $importexport_productrange_data = array();
                        //     $importexport_product_range_id = $req->importexport_product_range_id;
                        //     DB::connection('mis_db')->table('par_importexport_productrange_details')->where(array('application_id'=>$application_id))->delete();
                        //     if(is_array($importexport_product_range_id)){
                        //         foreach($importexport_product_range_id as $importexport_product_range_id){
                                                            
                        //                 $importexport_productrange_data[] = array('importexport_product_range_id'=>$importexport_product_range_id, 
                        //                                 'application_id'=>$application_id, 
                        //                                 'created_by'=>$trader_id, 
                        //                                 'created_on'=>Carbon::now());
        
                        //         }
                        //         DB::connection('mis_db')->table('par_importexport_productrange_details')->insert($importexport_productrange_data);
        
                        //     }
                        // }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,//'resp'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
				//'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   

    }

    public function saveRenImportExportApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = 4;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
			$device_type_id = $req->device_type_id;
            
            $application_code = $req->application_code;
            $product_category_id = $req->product_category_id;
            $port_id = $req->port_id;
            $importation_reason_id = $req->importation_reason_id;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference() 731
            $where_app = array('application_code'=>$application_code);
							if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
							//	initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Applicatio'.rand(0,1000), '');
							}
							$process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                            
                               
             $app_data = array(
                'section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'process_id'=>$process_id,
                                    'permit_category_id'=>$req->permit_category_id,
                                    'import_typecategory_id'=>$req->import_typecategory_id,
                                    'permit_reason_id'=>$req->permit_reason_id,
                                    'has_registered_outlets'=>$req->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
                                    'mode_oftransport_id'=>$req->mode_oftransport_id,
                                    'product_classification_id'=>$req->product_classification_id,
                                    'business_type_id'=>$req->business_type_id,
                                    'premise_id'=>$req->premise_id,
                                    'reference_no' => $req->reference_no, 
                                    'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
                                    'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
                                    'document_upload_id' => $req->document_upload_id,
                                    'has_registered_premises' =>$req->has_registered_premises,
                                    'licence_type_id' => $req->licence_type_id, 
                                    'tpin_id' =>$req->tpin_id,
                                    'psu_no'=>$req->psu_no,
                                    'importer_licence_number' => $req->reference_no,
                                    'applicant_contact_person' =>$req->applicant_contact_person,
                                    'importexport_product_range_id'=>json_encode(json_encode($req->importexport_product_range_id)),

                                    //vc
                                     'vc_application_type_id' => $req->vc_application_type_id,
                                     'is_registered'=>$req->is_registered,
                                     'importation_reason_id' => $importation_reason_id,
                                    'product_category_id' =>$product_category_id,
                                      'entry_country_id' =>$req->entry_country_id,
                                     'port_of_exit_from_country_of_origin' =>$req->port_of_exit_from_country_of_origin,
                                     'contact_person_id' =>$req->contact_person_id,
                                     'applicant_as_consignee' =>$req->applicant_as_consignee,                                      
                                     'port_id'=>$req->port_id,
                                    'proforma_invoice_no'=>$req->proforma_invoice_no,
                                    'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                                    'paying_currency_id'=>$req->paying_currency_id,
                                     'proforma_currency_id'=>$req->proforma_currency_id,
                                    'consignee_options_id'=>$req->consignee_options_id,
                                    'consignee_id'=>$req->consignee_id,
                                    'consignee_name'=>$req->consignee_name,
                                    'sender_receiver_id'=>$req->sender_receiver_id,
                                    'permit_productscategory_id'=>$req->permit_productscategory_id,
                                    
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
                               // dd($app_data);
						 if($sub_module_id == 49){

                            $app_data['shipment_date'] = $req->shipment_date;
                            $app_data['proposed_inspection_date'] = $req->proposed_inspection_date;
                            $app_data['clearing_agent'] = $req->clearing_agent;
                            $app_data['custom_declaration_no'] = $req->custom_declaration_no;

                        }
						if($sub_module_id == 87){

                            $app_data['has_medical_prescription'] = $req->has_medical_prescription;
                            $app_data['patients_email_address'] = $req->patients_email_address;
                            $app_data['patients_fullnames'] = $req->patients_fullnames;
                            $app_data['patients_identification_no'] = $req->patients_identification_no;
                            $app_data['patients_phone_no'] = $req->patients_phone_no;
                            $app_data['patients_physical_address'] = $req->patients_physical_address;
                            $app_data['patientscountry_id'] = $req->patientscountry_id;
                            $app_data['patientsdistrict_id'] = $req->patientsdistrict_id;
                            $app_data['patientsregion_id'] = $req->patientsregion_id;
                            $app_data['hospital_address'] = $req->hospital_address;
                            $app_data['prescribing_doctor'] = $req->prescribing_doctor;
                            $app_data['prescribling_hospital'] = $req->prescribling_hospital;
                            $app_data['prescription_date'] = formatDate($req->prescription_date);
                            $app_data['prescription_no'] = $req->prescription_no;
                            $app_data['reason_for_authorisation'] = $req->reason_for_authorisation;

                        }
	
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                
                                $deviceTypecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code','mis_db');
                                $ref_id = 0;
                                
                                if($section_id == 4){
                                       
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code,
                                            'device_typecode'=>$deviceTypecode,
                                            'app_typecategory'=>$apptype_categorycode
                                        );
                               }
                               else{
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code
                                        );
                               }
                             
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                             
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
								
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no; 
							   $app_data['reference_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                             
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                    //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                      //  saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'product_category_id' =>$product_category_id,
                                         'importation_reason_id' =>$importation_reason_id,
                                         'port_id' =>$port_id,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'VC Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred VC Application not saved, it this persists contact the system Administrator');
                         }

                        //  if(validateIsNumeric($application_id)){

  
                        //     $importexport_productrange_data = array();
                        //     $importexport_product_range_id = $req->importexport_product_range_id;
                        //     DB::connection('mis_db')->table('par_importexport_productrange_details')->where(array('application_id'=>$application_id))->delete();
                        //     if(is_array($importexport_product_range_id)){
                        //         foreach($importexport_product_range_id as $importexport_product_range_id){
                                                            
                        //                 $importexport_productrange_data[] = array('importexport_product_range_id'=>$importexport_product_range_id, 
                        //                                 'application_id'=>$application_id, 
                        //                                 'created_by'=>$trader_id, 
                        //                                 'created_on'=>Carbon::now());
        
                        //         }
                        //         DB::connection('mis_db')->table('par_importexport_productrange_details')->insert($importexport_productrange_data);
        
                        //     }
                        // }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,//'resp'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
				//'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   

    }

    public function saveDeclarationImportExportApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = 4;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            $device_type_id = $req->device_type_id;
            $application_code = $req->application_code;
            $product_category_id = $req->product_category_id;
            $port_id = $req->port_id;
            $importation_reason_id = $req->importation_reason_id;
            $declaration_application_code = $req->declaration_application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference() 731
            $where_app = array('application_code'=>$application_code);
                            if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
                            //  initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Applicatio'.rand(0,1000), '');
                            }
                            $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                            
                               
             $app_data = array(
                'section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'process_id'=>$process_id,
                                    'permit_category_id'=>$req->permit_category_id,
                                    'import_typecategory_id'=>$req->import_typecategory_id,
                                    'permit_reason_id'=>$req->permit_reason_id,
                                    'has_registered_outlets'=>$req->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
                                    'mode_oftransport_id'=>$req->mode_oftransport_id,
                                    'product_classification_id'=>$req->product_classification_id,
                                    'business_type_id'=>$req->business_type_id,
                                    'premise_id'=>$req->premise_id,
                                    'reference_no' => $req->reference_no, 
                                    'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
                                    'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
                                    'document_upload_id' => $req->document_upload_id,
                                    'has_registered_premises' =>$req->has_registered_premises,
                                    'licence_type_id' => $req->licence_type_id,
                                    'tpin_id' =>$req->tpin_id,
                                    'psu_no'=>$req->psu_no,
                                    'importer_licence_number' => $req->reference_no,
                                    'applicant_contact_person' =>$req->applicant_contact_person,
                                    'importexport_product_range_id'=>json_encode($req->importexport_product_range_id),

                                    //vc
                                     'vc_application_type_id' => $req->vc_application_type_id,
                                     'is_registered'=>$req->is_registered,
                                     'importation_reason_id' => $importation_reason_id,
                                    'product_category_id' =>$product_category_id,
                                      'entry_country_id' =>$req->entry_country_id,
                                     'port_of_exit_from_country_of_origin' =>$req->port_of_exit_from_country_of_origin,
                                     'contact_person_id' =>$req->contact_person_id,
                                     'applicant_as_consignee' =>$req->applicant_as_consignee,
                                     'shipment_date' =>$req->shipment_date,                                      
                                     'port_id'=>$req->port_id,
                                    'proforma_invoice_no'=>$req->proforma_invoice_no,
                                    'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                                    'paying_currency_id'=>$req->paying_currency_id,
                                     'proforma_currency_id'=>$req->proforma_currency_id,
                                    'consignee_options_id'=>$req->consignee_options_id,
                                    'consignee_id'=>$req->consignee_id,
                                    'consignee_name'=>$req->consignee_name,
                                    'sender_receiver_id'=>$req->sender_receiver_id,
                                    'permit_productscategory_id'=>$req->permit_productscategory_id,
                                    
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );

                         if($sub_module_id == 49){

                            $app_data['shipment_date'] = $req->shipment_date;
                            $app_data['proposed_inspection_date'] = $req->proposed_inspection_date;
                            $app_data['custom_declaration_no'] = $req->custom_declaration_no;
                            $app_data['clearing_agent']=$req->clearing_agent;
                            $app_data['clearing_agent_no']=$req->clearing_agent_no;
                            $app_data['clearing_agent_email']=$req->clearing_agent_email;
                            $app_data['clearing_agent_firm']=$req->clearing_agent_firm;
                            $app_data['mode_oftransport_id']=$req->mode_oftransport_id;
                            $app_data['port_id']=$req->port_id;
                            $app_data['proforma_invoice_no']=$req->proforma_invoice_no;
                            $app_data['proforma_invoice_date']=$req->proforma_invoice_date;
                            $app_data['package_no']=$req->package_no;
                            $app_data['technical_declaration_id']=$req->technical_declaration_id;
                            $app_data['declaration_application_code']=$req->declaration_application_code;

                        }
                        if($sub_module_id == 87){

                            $app_data['has_medical_prescription'] = $req->has_medical_prescription;
                            $app_data['patients_email_address'] = $req->patients_email_address;
                            $app_data['patients_fullnames'] = $req->patients_fullnames;
                            $app_data['patients_identification_no'] = $req->patients_identification_no;
                            $app_data['patients_phone_no'] = $req->patients_phone_no;
                            $app_data['patients_physical_address'] = $req->patients_physical_address;
                            $app_data['patientscountry_id'] = $req->patientscountry_id;
                            $app_data['patientsdistrict_id'] = $req->patientsdistrict_id;
                            $app_data['patientsregion_id'] = $req->patientsregion_id;
                            $app_data['hospital_address'] = $req->hospital_address;
                            $app_data['prescribing_doctor'] = $req->prescribing_doctor;
                            $app_data['prescribling_hospital'] = $req->prescribling_hospital;
                            $app_data['prescription_date'] = formatDate($req->prescription_date);
                            $app_data['prescription_no'] = $req->prescription_no;
                            $app_data['reason_for_authorisation'] = $req->reason_for_authorisation;

                        }
    
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;

                   
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);


                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                        
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                
                                $deviceTypecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code','mis_db');
                                $ref_id = 0;
                                  
                                if($apptype_code == 4){
                                       
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code,
                                            'device_typecode'=>$deviceTypecode,
                                            'app_typecategory'=>$apptype_categorycode
                                        );
                               }
                               else{
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code
                                        );
                               }
                             
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no; 
                               $app_data['reference_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                             
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                    //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                      //  saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                        'product_category_id'=>$product_category_id,
                                         'port_id' =>$port_id,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'declaration_application_code'=>$declaration_application_code,
                                         'success'=>true,
                                         'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Application not saved, it this persists contact the system Administrator');
                         }

                        //  if(validateIsNumeric($application_id)){

  
                        //     $importexport_productrange_data = array();
                        //     $importexport_product_range_id = $req->importexport_product_range_id;
                        //     DB::connection('mis_db')->table('par_importexport_productrange_details')->where(array('application_id'=>$application_id))->delete();
                        //     if(is_array($importexport_product_range_id)){
                        //         foreach($importexport_product_range_id as $importexport_product_range_id){
                                                            
                        //                 $importexport_productrange_data[] = array('importexport_product_range_id'=>$importexport_product_range_id, 
                        //                                 'application_id'=>$application_id, 
                        //                                 'created_by'=>$trader_id, 
                        //                                 'created_on'=>Carbon::now());
        
                        //         }
                        //         DB::connection('mis_db')->table('par_importexport_productrange_details')->insert($importexport_productrange_data);
        
                        //     }
                        // }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,//'resp'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                //'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   
    }
    
    public function saveDisposalApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference()
            
            $app_data = array(
                                    'section_id'=>$req->section_id,
                                    'disposal_class_id'=>$req->disposal_class_id,
                                    'other_product_category'=>$req->other_product_category,
                                    'company_disposal_id'=>$req->company_disposal_id,
                                    'reason_for_disposal_id'=>$req->reason_for_disposal_id,
                                    'other_disposal_reasons'=>$req->other_disposal_reasons,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'reason_for_disposal'=>$req->reason_for_disposal,
                                    'hold_premise'=>$req->hold_premise,
                                    'total_weight'=>$req->total_weight,
                                    'weights_units_id'=>$req->weights_units_id,
                                    'market_value'=>$req->market_value,
                                    'proposedmethod_of_disposal_id'=>$req->proposedmethod_of_disposal_id,
                                    'reason_of_destruction_id'=>$req->reason_of_destruction_id,
                                   'otherproposedmethod_of_disposal'=>$req->otherproposedmethod_of_disposal,
                                   'product_particulars_description'=>$req->product_particulars_description,
                                   'destructionsite_location'=>$req->destructionsite_location,
                                   'proposed_destructionsite'=>$req->proposed_destructionsite,
                                   'disposal_siteoption_id'=>$req->disposal_siteoption_id,
                                    'proposed_destructiondate'=>$req->proposed_destructiondate,
                                    'premises_name'=>$req->premises_name,
                                    'premise_id'=>$req->premise_id,
                                    'currency_id'=>$req->currency_id,
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
                        /** Already Saved */ 
                        $table_name = 'wb_disposal_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_disposal_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_disposal_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_disposal_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                $ref_id = 0;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code
                                );
                               
                                $application_code = generateApplicationCode($sub_module_id, 'wb_disposal_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                              
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
                                    
                               $resp = insertRecord('wb_disposal_applications', $app_data, $trader_email);
                                
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                   // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                    saveApplicationSubmissionDetails($application_code,$table_name);  
                               }
                               
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Permit Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Permit Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'resp'=>$resp,
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
    public function checkPermitUniformCurrency($application_code,$currency_id){
        $record = DB::table('wb_permits_products')
                    ->where(array('application_code'=>$application_code))
                    ->whereNotIn('currency_id', [$currency_id])
                    ->get();
       
        if(count($record) > 0){
            $res = array(
                'success' => false,
                'message' => 'Mismatc product permits currency, confirm the previous currency and make sure currencies match'
            );
          //  echo json_encode($res);
            
            return response()->json($res);   
            exit();
            
        }

}

public function saveDisposalPermitProductdetails(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
        $product_description = $req->product_description;
        $estimated_value = $req->estimated_value;
        $currency_id = $req->currency_id;
        $packaging_unit_id = $req->packaging_unit_id;
        $quantity = $req->quantity;
        $product_id = $req->product_id;
        $record_id = $req->id;
        
        
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        
        
        $table_name = 'wb_disposal_products';
                $data = array('application_code'=>$application_code,
                            'generic_name'=>$req->generic_name,
                            'brand_name'=>$req->brand_name,
                            'product_description'=>$product_description,
                            'estimated_value'=>$estimated_value,
                            'currency_id'=>$currency_id,
                            'product_pack'=>$req->product_pack,
                            'batch_no'=>$req->batch_no,
                            'reason_for_disposal'=>$req->reason_for_disposal,
                            'packaging_unit_id'=>$packaging_unit_id,
                            'packaging_type_id'=>$req->packaging_type_id,
                            'quantity'=>$quantity,
                            'product_id'=>$product_id
                            );
                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                   
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);

                        $record_id = $resp['record_id']; 
    
                        if($resp['success']){
                            $res =  array('success'=>true,
                            'record_id'=>$record_id,
                            'message'=>'Saved Successfully');
            
                        }
                        else{
                            $res =  array('success'=>false,
                            'message'=>$error_message);
            
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

  public function onAddingNewProductDetails($req){
        $section_id = $req->section_id;
        $brand_name = $req->brand_name;
        $classification_id = $req->classification_id;
        $product_category_id = $req->product_category_id;
        $common_name_id = $req->common_name_id;
        $physical_description = $req->physical_description;
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'tra_product_information';
        $resp = false;
        $prod_data = array('brand_name' => $brand_name,
                           'section_id'=>$section_id,
                           'classification_id'=>$classification_id,
                           'product_category_id'=>$product_category_id,
                           'common_name_id'=>$common_name_id,
                           'physical_description'=>$physical_description
                        );
        $where_state = array('brand_name' => $brand_name,
                           'section_id'=>$section_id);
        $records = DB::connection('mis_db')
                    ->table($table_name)
                    ->where($where_state)
                    ->first();
        
        if(!$records){
                //delete functionality
                $prod_data['created_on'] =  Carbon::now();
                $prod_data['created_by'] = $trader_id;
                $resp = insertRecord( $table_name , $prod_data, $trader_id,'mis_db');
                if($resp['success']){
                    $product_id = $resp['record_id'];
                }   
                else{
                    $product_id = 0;
                }                
        }
        else{
           $product_id = $records->id;

        }
     return $product_id;
}
function getPermitBrandName($product_id){
	$record = DB::connection('mis_db')->table('tra_product_information as t1')
				->leftJoin('par_common_names as t2', 't1.common_name_id','t2.id')
				->select('t1.brand_name', 't2.name as common_name')
				->where('t1.id',$product_id)
				->first();
	return $record;
}
public function onUploadDocuments($req,$document_requirement_id){

        $application_code = $req->application_code;
        $module_id = $req->module_id;
        $sub_module_id = $req->sub_module_id;
        $document_requirement_id = 317;
        $file = $req->file('file');
            $document_upload_id = 0;
			$document_upload_id =0;
        $where_app = array('application_code'=>$application_code);
                       
        if ($req->hasFile('file')) {
			 if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
                            initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Permits details'.rand(0,1000), '');
                        }
                        
						
                    $document_type_id = getSingleRecordColValue('tra_documentupload_requirements', array('id'=>$document_requirement_id), 'document_type_id','mis_db');
                    $app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
                                            
                    $trader_email = $req->email_address;
                    $trader_id= $req->trader_id;
                    $app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id,$application_code,$document_type_id,$trader_email);

                    $table_name = 'tra_application_uploadeddocuments';
                    
                    if($app_rootnode){
                        $origFileName = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                                            $file_path = $file->getPathName();
                                            $extension = $file->getClientOriginalExtension();
                                            $document_rootupload =  Config('constants.dms.doc_rootupload') ;

                                            $destination = getcwd() .$document_rootupload;
                                            $savedName = str_random(3) . time() . '.' . $extension;

                                            $document_path = $destination.$savedName;
                                            //check if tje dpcument type has been mapped and not autoCreate the folder 
                                            $document_requirement = getParameterItem('tra_documentupload_requirements',$document_requirement_id,'mis_db');
                                        
                                            $uploadfile_name =  $document_requirement.str_random(5).'.'.$extension;
                                            $destination_node = $app_rootnode->node_ref;
                                    
                                            $response = dmsUploadNodeDocument($destination_node,$file_path, $uploadfile_name,'');
                                            $node_ref = $response['nodeRef'];
                                            $document_data = array('application_code'=>$application_code,
                                                                'document_requirement_id'=>$document_requirement_id,
                                                                'uploaded_on'=>Carbon::now(),
                                                                'uploaded_by'=>$trader_id,
                                                                'file_name'=>$uploadfile_name,
                                                                'initial_file_name'=>$origFileName,
                                                                'file_type'=>$extension,
                                                                'node_ref'=>$node_ref,
                                                                'created_on'=>Carbon::now(),
                                                                'created_by'=>$trader_id,
                                                                'dc_module_id'=>$module_id,
                                                                'dc_sub_module_id'=>$sub_module_id,	
                                                                'is_synched'=>1
                                                    );
                                            $res = insertRecord('tra_application_uploadeddocuments', $document_data, $trader_id,'mis_db');
                                            $document_upload_id = $res['record_id'];
                                            
                        

                }
        }
        return $document_upload_id;
        
}
    public function savePermitProductdetails(Request $req){
        try{

            $resp ="";
            $trader_id = $req->trader_id;
            $trader_email = $req->trader_email;
            $application_code = $req->application_code;
           // $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;
            //$weights_units_id = $req->weights_units_id;
            //$total_weight = $req->total_weight;
           // $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            //$laboratory_no = $req->laboratory_no;
           // $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $product_category_id = $req->product_category_id;
            $record_id = $req->id;
            $common_name_id = $req->common_name_id;
           //  $device_type_id = $req->device_type_id;
            
           //  $device_type_id = $req->device_type_id;
           //  $is_regulated_product = $req->is_regulated_product;
            
            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency  unitpack_unit_id unitpack_size unitpack_size
            if(!validateIsNumeric($product_id)){
				$product_id = $this->onAddingNewProductDetails($req);

			}
        $permit_prod =$this->getPermitBrandName($product_id);
		$document_requirement_id = 410;
         $document_upload_id = $this->onUploadDocuments($req,$document_requirement_id);

            $table_name = 'wb_permits_products';
			 $data = array(


                            'application_code'=>$application_code,
                            'product_category_id'=>$product_category_id,
                            'is_registered'=>$req->is_registered,
                            'product_registration_no'=>$req->product_registration_no,
                            'common_name_id'=>$req->common_name_id,
                            'brand_name'=>$req->brand_name,
                            'ingredient_id'=>$req->ingredient_id,
                            'dosage_form_id'=>$req->dosage_form_id,
                            'product_strength'=>$req->product_strength,
                            'product_origin_id'=>$req->product_origin_id,
                            'si_unit_id'=>$req->si_unit_id,
                            'specification_type_id'=>$req->specification_type_id,
                            'no_of_packs_tertiary'=>$req->no_of_packs_tertiary,
                            'no_of_packs_secondary'=>$req->no_of_packs_secondary,
                            'no_of_packs'=>$req->no_of_packs,
                            'no_of_units'=>$req->no_of_units,
                            'container_type_id'=>$req->container_type_id,
                            'total_units'=>$req->total_units,
                            'unit_price'=>$req->unit_price,
                            'currency_id'=>$currency_id,
                            'verification_fee_percent'=>$req->verification_fee_percent,
                            'total_value'=>$req->total_value,
                            'product_id'=>$product_id,
                            'gmdn_code'=>$req->gmdn_code,
                            'gmdn_descriptor'=>$req->gmdn_descriptor,
                            'medical_device_class_type'=>$req->medical_device_class_type,
                            'quantity'=>$quantity,
                            'units_for_quantity'=>$req->units_for_quantity,
                            'name_chemical_reference'=>$req->name_chemical_reference,
                            'name_of_material'=>$req->name_of_material,
                            'material_category'=>$req->material_category,
                            'equipment_purpose'=>$req->equipment_purpose,
                            'vc_quantity'=>$req->vc_quantity,
                            'declaration_quantity'=>$req->declaration_quantity,
                            'no_of_batches'=>$req->no_of_batches,
                            'qty_shipped'=>$req->qty_shipped,
                            'approved_qty'=>$req->approved_qty,
                            'unitpack_size'=>$req->unitpack_size,
                            'vc_no'=>$req->vc_no,
                            'proprietary_name'=>$req->proprietary_name,
                            'co_pack'=>$req->co_pack,
                            'single_fixed_dose'=>$req->single_fixed_dose,
                            'classification'=>$req->classification,
                            'class_category'=>$req->class_category,
                            'atc_code_id'=>$req->atc_code_id,
                            'atc_desciption'=>$req->atc_desciption,
                            'therapeutic_group'=>$req->therapeutic_group,
                            'distribution_category'=>$req->distribution_category,
                            'route_of_administarion'=>$req->route_of_administarion,
                            'total_weight'=>$req->total_weight,
                            'manufacturer_id'=>$req->manufacturer_id,
                            'declare_product_id'=>$req->declare_product_id,

                           
                            //'packaging_unit_id'=>$packaging_unit_id,
                            'controlled_substance_id'=>$req->controlled_substance_id,
                            'scheduled_number'=>$req->scheduled_number,
                            'convertion_factor'=>$req->convertion_factor,
                            'controlled_substance_schedule'=>$req->controlled_substance_schedule,
                            'product_batch_no'=>$req->product_batch_no,
                            'product_manufacturing_date'=>formatDate($req->product_manufacturing_date),
                            'packs_per_tertiary_pack'=>$req->packs_per_tertiary_pack,
                            'total_salt_quantity'=>$req->total_salt_quantity,
                            'total_narcotic_units'=>$req->total_narcotic_units,
                            'total_narcotic_base'=>$req->total_narcotic_base,
                            
                            
                            'permitbrand_name'=>$req->brand_name,
                            'productphysical_description'=>$req->productphysical_description,
                            
                            'document_upload_id'=>$document_upload_id,
                            'prodclass_category_id'=>$req->prodclass_category_id,
                             'pack_size'=>$req->unitpack_size,
                            // 'section_id'=>$req->section_id,
                            'prodcertificate_no'=>$req->prodcertificate_no,
                            'device_type_id'=>$req->device_type_id,
                            'product_category_id'=>$req->product_category_id,
                            'product_expiry_date'=>formatDate($req->product_expiry_date),
							'consignment_quantity'=>$req->consignment_quantity,
                            'consignment_quantity'=>$req->consignment_quantity,
                            
                            'weights_units_id'=>$req->weights_units_id
                    );
                   
					if($permit_prod){
						   
							$data['permitcommon_name'] = $permit_prod->common_name;
					}
					
					
                    // if(validateIsNumeric($record_id)){
                    //     $where = array('id'=>$record_id);
                    //     if (recordExists($table_name, $where)) {
                                        
                    //         $data['dola'] = Carbon::now();
                    //         $data['altered_by'] = $trader_email;
        
                    //         $previous_data = getPreviousRecords($table_name, $where);
                            
                    //         $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                    //         if($resp['success']){
                    //         $res =  array('success'=>true,
                    //         'record_id'=>$record_id,
                    //         'message'=>'Saved Successfully');
            
                    //     }
                    //     else{
                    //         $res =  array('success'=>false,
                    //         'message'=>$error_message);
            
                    //     }
                            
                    //     }
                    // }else{
                        //insert 
                        $record = DB::table('wb_permits_products')
                                ->where(array('application_code'=>$application_code))
                                ->whereNotIn('currency_id', [$currency_id])
                                ->get();


                
                        if(!count($record) > 0){
                            $data['created_by'] = $trader_email;
                            $data['created_on'] = Carbon::now();
                            $resp = insertRecord($table_name, $data, $trader_email);
                            $record_id = $resp['record_id'];     
                            if($resp['success']){
                                $res =  array('success'=>true,
                                'record_id'=>$record_id,
                                'common_name_id'=>$common_name_id,
                                'message'=>'Saved Successfully');
                
                            }
                            else{
                                $res =  array('success'=>false,
                                'message'=>$error_message);
                
                            }
                        }
                        else{

                            $res = array(
                                'success' => false,
                                'message' => 'Mis-Match Product licence currency, confirm the previous currency and make sure currencies match'
                            );
                    
                        }
                       
                  //  } 
                    
                    
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'resp'=>$resp,
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

    public function saveBatchProductdetails(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
       
        $product_id = $req->product_id;
        $record_id = $req->id;
       
        $device_type_id = $req->device_type_id;
       
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        if(!validateIsNumeric($product_id)){
            $product_id = $this->onAddingNewProductDetails($req);

        }
        
        $document_requirement_id = 100;
        $document_upload_id = 0;// $this->onUploadDocuments($req,$document_requirement_id);

        $table_name = 'wb_batch_permits_products';

        $data = array('application_code'=>$application_code,
                    
                        'batch_qty'=>$req->batch_qty,
                        'product_batch_no'=>$req->product_batch_no,
                        'product_expiry_date'=>formatDate($req->product_expiry_date),
                        'product_id'=>$product_id
                );  


        if(validateIsNumeric($record_id)){
            $where = array('id'=>$record_id);

            if (recordExists($table_name, $where)) {

                $data['dola'] = Carbon::now();
                $data['altered_by'] = $trader_email;
    
                $previous_data = getPreviousRecords($table_name, $where);
                        
                $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                if($resp){
                    $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'product_id'=>$product_id,
                        'message'=>'Saved Successfully');
        
                }else{
                    $res =  array('success'=>false,
                        'message'=>$error_message);
        
                }  
            }
                        
        }else{   
                    
            $data['created_by'] = $trader_email;
            $data['created_on'] = Carbon::now();
            $resp = insertRecord($table_name, $data, $trader_email);
            $record_id = $resp['record_id'];     
            if($resp){
                $res =  array('success'=>true,
                            'record_id'=>$record_id,
                            'product_id'=>$product_id,
                            'message'=>'Saved Successfully');
            
            }else{
                $res =  array('success'=>false,
                            'message'=>$error_message);
            
            }
                   
                
        }
                
                 
                
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,'resp'=>$resp,
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

    
    
    public function getDisposalApplicationsLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_disposal_applications as t1')
                ->select('t1.*', 't3.name as status','t6.name as action_name','t6.iconCls','t6.action','t3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
               ->leftJoin('wb_processstatus_actions as t5',function($join){
                        $join->on('t1.application_status_id', '=', 't5.status_id')
                             ->on('t5.is_default_action', '=', DB::raw(1));

                    })
               ->leftJoin('wb_statuses_actions as t6', 't5.action_id','t6.id')
                ->where(array('t1.trader_id' => $trader_id))
                ->orderBy('t1.date_added','desc')
                ->groupBy('t1.application_code');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                }if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }if(validateIsNumeric($section_id)){
                    $records =  $records->where(array('t1.section_id'=>$section_id));
                }

                //the ilters 
                $records = $records->get();

                $data = $this->getDisposalPermitApplications($records);
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
    function getDisposalPermitApplications($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();

        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        $classProductData = getParameterItems('par_disposalprodclass_category','','mis_db');

        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
           $prod_class = returnParamFromArray($classProductData,$rec->disposal_class_id);
           $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');
            
           $data[] = array('reference_no'=>$rec->reference_no,
                           'trader_id'=>$rec->trader_id,
                           'premise_id'=>$rec->premise_id,
                           'section_id'=>$rec->section_id,
                           'disposal_class_id'=>$rec->disposal_class_id,
                           'hold_premise'=>$rec->hold_premise,
                           'other_product_category'=>$rec->other_product_category,
                           'application_id'=>$rec->id,
                           'company_disposal_id'=>$rec->company_disposal_id,
                           'reason_for_disposal_id'=>$rec->reason_for_disposal_id,
                           'other_disposal_reasons'=>$rec->other_disposal_reasons,
                           'id'=>$rec->id,
                           'date_added'=>$rec->date_added,
                           'sub_module_id'=>$rec->sub_module_id,
                           'module_id'=>$rec->module_id,
                           'application_status_id'=>$rec->application_status_id,
                           //'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                           'section'=>$section,
                           'created_by'=>$rec->created_by,
                           'submission_date'=>$rec->submission_date,
                           'premises_name'=>$premises_name,
                           'section_name'=>$section,
                           'zone_id'=>$rec->zone_id,
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'proposed_destructiondate'=>$rec->proposed_destructiondate,
                            'product_particulars_description'=>$rec->product_particulars_description,
                           'process_title'=>$rec->process_title,
                           'reason_for_disposal'=>$rec->reason_for_disposal,
                           'total_weight'=>$rec->total_weight,
                           'market_value'=>$rec->market_value,
                           'quantity'=>$rec->quantity,'packaging_unit_id'=>$rec->packaging_unit_id,
                           'currency_id'=>$rec->currency_id,
               'action_name'=>$rec->action_name,
                           'action'=>$rec->action,
                           'iconCls'=>$rec->iconCls,
                           'weights_units_id'=>$rec->weights_units_id,
                           'application_code'=>$rec->application_code,
                           'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                       );
        }
        return $data;


   }

    public function getImportExpPermitsApplicationLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            $sub_module_id = $req->sub_module_id;
            $module_id = $req->module_id;
            //$licence_type_id = $req->licence_type_id;
            $isLicenced = $req->isLicenced;
            $port_of_declaration_id = $req->port_of_declaration_id;

            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_ids = explode(',',  $sub_module_id);
          //  $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
            $permit_type_id = $req->permit_type_id;
          
            //dd($licence_type_id);
    //         $records = DB::table('wb_contractmanufacturing_details as t1')
    //         ->leftJoin($mis_db.'.tra_personnel_information as t2', function($join) {
    //          $join->on('t2.name', '=', 't1.contact_person');
    //      })
    //  ->select(DB::raw('t1.*,t2.email_address,t2.telephone_no'))
    //  ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
    //   ->get();

            // 't9.name as importexport_product_range_id'

            $data = array();
            $mis_db = DB::connection('mis_db')->getDatabaseName();
            //get the records 
            $records = DB::table('wb_importexport_applications as t1')
                ->select('t1.*','t7.name as action_name', 't7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                 ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('wb_processstatus_actions as t6',function($join){
                    $join->on('t1.application_status_id', '=', 't6.status_id')
                         ->on('t6.is_default_action', '=', DB::raw(1));

                })
                ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                ->where(array('t1.trader_id' => $trader_id))
                ->orderBy('t1.date_added','desc');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);
              
                }
				if(is_array($sub_module_ids) && count($sub_module_ids) >0 && $sub_module_id != ''){
                        
                    $records =  $records->whereIn('t1.sub_module_id', $sub_module_ids);
                }
				
				if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }if(validateIsNumeric($section_id)){
                    $records =  $records->where(array('t1.section_id'=>$section_id));
                }if(validateIsNumeric($port_of_declaration_id)){
                    $records =  $records->where(array('t1.port_id'=>$port_of_declaration_id));
                }
				if(validateIsNumeric($permit_type_id)){
						$records->where(array('t1.sub_module_id'=>12));
				}
                if(isset($isLicenced)){
                if(validateIsNumeric($isLicenced) && $isLicenced == 1){
                        $records->whereIn('t1.licence_type_id', array(3, 4));
                }else{
                        $records->whereIn('t1.licence_type_id', array(1, 2));
                }
                }
                //the ilters 
                
                //groupBy('t1.application_code')->
                $records = $records->groupBy('t1.application_code')->get();
              //  $records = $records->groupBy('t1.application_id')->get();e

                $data = $this->getPermitApplications($records);
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
    
    
    function getPermitApplications($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();

        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        $prod_class_category_data = getParameterItems('par_premise_class','','mis_db');
        $business_type_data = getParameterItems('par_business_types', '', 'mis_db');
        $permitCategoryData = getParameterItems('par_permit_category','','mis_db');
        $product_type_data = getParameterItems('par_importexport_product_range','','mis_db');
        $importexport_app_type_data = getParameterItems('par_importexport_application_type','','mis_db');
        $license_type_id_data = getParameterItems('par_licence_type','','mis_db');
        $port_entry_exit_data = getParameterItems('par_ports_information','','mis_db');
        $registrationLevelData = getParameterItems('par_import_registration_level','','mis_db');
        $importReasonData = getParameterItems('par_importexport_reasons','','mis_db');
        $permitReasonData = getParameterItems('par_permit_reasons','','mis_db');
        
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
           $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');

           $sender_receiver = getSingleRecordColValue('tra_permitsenderreceiver_data', array('id' => $rec->sender_receiver_id), 'name','mis_db');
           $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $rec->consignee_id), 'name','mis_db');
           $contact_person = getSingleRecordColValue('tra_personnel_information', array('id' => $rec->contact_person_id), 'name','mis_db');
           $name = getSingleRecordColValue('wb_premises', array('id' => $rec->tpin_id), 'name');
           $email = getSingleRecordColValue('wb_premises', array('id' => $rec->tpin_id), 'email');
           $physical_address = getSingleRecordColValue('wb_premises', array('id' => $rec->tpin_id), 'physical_address');
           $tpin_no = getSingleRecordColValue('wb_premises', array('id' => $rec->tpin_id), 'tpin_no');
           $company_registration_no = getSingleRecordColValue('wb_premises', array('id' => $rec->tpin_id), 'company_registration_no');
           
           $data[] = array('reference_no'=>$rec->reference_no,
                            'tracking_no'=>$rec->tracking_no,
                           'trader_id'=>$rec->trader_id,
                           'premise_id'=>$rec->premise_id,
                           'section_id'=>$rec->section_id,
                           'mode_oftransport_id'=>$rec->mode_oftransport_id,
                           'application_id'=>$rec->id,
                           'id'=>$rec->id,
                           'date_added'=>$rec->date_added,
                           'sub_module_id'=>$rec->sub_module_id,
                           'module_id'=>$rec->module_id,
                           'application_status_id'=>$rec->application_status_id,
                           // 'importexport_product_range_id'=> $rec->importexport_product_range_id,
                          // 'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                           'section'=>$section,
                           'created_by'=>$rec->created_by,
                           'submission_date'=>$rec->submission_date,
                           'permit_category'=>returnParamFromArray($permitCategoryData,$rec->permit_category_id),
                           'permit_reason'=>returnParamFromArray($permitReasonData,$rec->permit_reason_id),
						   'has_registered_outlets'=>$rec->has_registered_outlets,
							
						   'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
						   'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
						   'document_upload_id' => $rec->document_upload_id,
						   'custom_declaration_no'=>$rec->custom_declaration_no,
                           'clearing_agent'=>$rec->clearing_agent,
                           'clearing_agent_no'=>$rec->clearing_agent_no,
                           'clearing_agent_firm'=>$rec->clearing_agent_firm,
                           'clearing_agent_email'=>$rec->clearing_agent_email,
                           'proposed_inspection_date'=>$rec->proposed_inspection_date,
                           'shipment_date'=>$rec->shipment_date,
                           'tpin_id'=>$rec->tpin_id,
                            'importexport_product_range_id' => json_decode(trim($rec->importexport_product_range_id, '""'), true) ?: [],


                           // $records->importexport_product_range_id=json_decode($records->importexport_product_range_id);
                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                           'proforma_currency_id'=>$rec->proforma_currency_id,
                            'permit_category_id'=>$rec->permit_category_id,
                           'product_category_id'=>$rec->product_category_id,
                           'import_typecategory_id'=>$rec->import_typecategory_id,
                           'permit_reason_id'=>$rec->permit_reason_id,
                           'proforma_invoice_no'=>$rec->proforma_invoice_no,
                           'proforma_invoice_date'=>$rec->proforma_invoice_date,
                           'premises_name'=>$premises_name,
                           'name'=>$name,
                           'email'=>$email,
                           'physical_address'=>$physical_address,
                           'tpin_no'=>$tpin_no,
                           'company_registration_no'=>$company_registration_no,
                           'psu_no'=>$rec->psu_no,
                           //'application_type_id' => $rec->application_type_id,
                           'business_type_id'=>$rec->business_type_id,
                           'product_classification_id'=>$rec->product_classification_id,
                           'port_id'=>$rec->port_id,
                           'package_no'=>$rec->package_no,
                           'technical_declaration_id'=>$rec->technical_declaration_id,
                           'declaration_application_code'=>$rec->declaration_application_code,

                           'vc_application_type_id' => $rec->vc_application_type_id,
                           'applicant_as_consignee' => $rec->applicant_as_consignee,
                           'product_category_id'=>$rec->product_category_id,
                           'importer_licence_number' =>$rec->importer_licence_number,
                           'proforma_invoice_date' =>$rec->proforma_invoice_date,
                           'entry_country_id' =>$rec->entry_country_id,
                           'port_of_exit_from_country_of_origin' =>$rec->port_of_exit_from_country_of_origin,
                           'applicant_contact_person'=>$rec->applicant_contact_person, 
                           'contact_person_id' =>$rec->contact_person_id,                        

                            'has_registered_premises' =>$rec->has_registered_premises,
                            'licence_type_id' => $rec->licence_type_id,
                            'contact_person' => $contact_person,
                                    
                                    
                           'paying_currency_id'=>$rec->paying_currency_id,
                           'sender_receiver_id'=>$rec->sender_receiver_id,
                           'sender_receiver'=>$sender_receiver,
                           'section_name'=>$section,
                           'zone_id'=>$rec->zone_id,
                           'consignee_options_id'=>$rec->consignee_options_id,
                           'consignee_id'=>$rec->consignee_id,
                           'consignee_name'=>$consignee_name,
                           'pay_currency_id'=>$rec->pay_currency_id,
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'process_title'=>$rec->process_title,
                           'action_name'=>$rec->action_name,
                           'action'=>$rec->action,
                           'iconCls'=>$rec->iconCls,
                           'is_registered'=>$rec->is_registered,
                           'importation_reason_id'=>$rec->importation_reason_id,
                           'application_code'=>$rec->application_code,
                          // 'importexport_product_range_id'=>$rec->importexport_product_range_id,
						//    'product_classification_id' => $rec->product_classification_id,
                            'product_classification' => returnParamFromArray($prod_class_category_data,$rec->product_classification_id),
                            // 'business_type_id' => $rec->business_type_id,
                            'business_type' => returnParamFromArray($business_type_data, $rec->business_type_id ),
                            'import_reason' => returnParamFromArray($importReasonData, $rec->importation_reason_id),
                            'registration_level' => returnParamFromArray($registrationLevelData, $rec->is_registered ),
                            'has_registered_premise' => returnParamFromArray($importexport_app_type_data, $rec->has_registered_premises),
                            'licence_type' => returnParamFromArray($license_type_id_data, $rec->licence_type_id),
                            'port_data' => returnParamFromArray($port_entry_exit_data, $rec->port_id),
                            //'importexport_product_range' => returnParamFromArray($product_range, $rec->importexport_product_range_id),
						   'ordered_by'=>$rec->ordered_by,
                           'qualifications'=>$rec->qualifications,
                           'qualification_license_no'=>$rec->qualification_license_no,
                           
                           'has_apppliedctrdrugs_license'=>$rec->has_apppliedctrdrugs_license,
                           'permit_productscategory_id'=>$rec->permit_productscategory_id,

                           'license_application_code'=>$rec->license_application_code,
                           'controlled_drugslicense_no'=>$rec->controlled_drugslicense_no,

                           'approximate_dateof_arrival'=>$rec->approximate_dateof_arrival,
                           'patients_email_address'=>$rec->patients_email_address,
                           'has_medical_prescription'=>$rec->has_medical_prescription,
                           'patients_fullnames'=>$rec->patients_fullnames,
                           'patients_identification_no'=>$rec->patients_identification_no,
                           'patients_phone_no'=>$rec->patients_phone_no,
                           'patients_physical_address'=>$rec->patients_physical_address,
                           'patientscountry_id'=>$rec->patientscountry_id,
                           'patientsdistrict_id'=>$rec->patientsdistrict_id,
                           'patientsregion_id'=>$rec->patientsregion_id,
                           'hospital_address'=>$rec->hospital_address,
                           'prescribing_doctor'=>$rec->prescribing_doctor,
                           'prescribling_hospital'=>$rec->prescribling_hospital,
                           'prescription_date'=>formatDate($rec->prescription_date),
                           'prescription_no'=>$rec->prescription_no,
                           'reason_for_authorisation'=>$rec->reason_for_authorisation,
						   
                           'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                       );

        }
       // dd($data);
        return $data;


   }
   //the permit products details 
   public function getPermitProductsDetails(Request $req){
    try{
         $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_permits_products as t1')
            ->leftjoin('wb_batch_permits_products as t2', 't2.application_code', '=', 't1.application_code')
            ->select('t1.*', 't2.batch_qty', 't2.product_batch_no', 't2.product_expiry_date')
            ->where(array('t1.application_code' => $application_code))
            ->get();

            $data = $this->getProductsPermitDetails($records);

            $res =array('success'=>true,
                'data'=> $data);


  
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
public function getImportProductRange(Request $req) {
    try {
        $importexport_product_range_id = $req->input('importexport_product_range_id');

        $records = DB::connection('mis_db')
            ->table('par_importexport_product_category as t1')
            ->whereIn('t1.importexport_product_range_id', $importexport_product_range_id)
            ->select('t1.*')
            ->get();

        $res = [
            'success' => true,
            'data' => $records
        ];
    } catch (\Exception $e) {
        $res = [
            'success' => false,
            'message' => $e->getMessage()
        ];
    } catch (\Throwable $throwable) {
        $res = [
            'success' => false,
            'message' => $throwable->getMessage()
        ];
    }

    return response()->json($res);
}


public function getDeclaredProductsDetails(Request $req)
{
    try {
        $declaration_application_code = $req->application_code;
        $data = array();

        // Get the records 
        $records = DB::table('wb_permits_products as t1')
            ->leftjoin('wb_batch_permits_products as t2', 't2.application_code', '=', 't1.application_code')
            ->select('t1.*', 't2.batch_qty', 't2.product_batch_no', 't2.product_expiry_date')
            ->where('t1.application_code', $declaration_application_code)
            ->get();

        // Continue processing the records
        $data = $this->getProductsPermitDetails($records);
        $res = ['success' => true, 'data' => $data];
    } catch (\Exception $e) {
        $res = ['success' => false, 'message' => $e->getMessage()];
    } catch (\Throwable $throwable) {
        $res = ['success' => false, 'message' => $throwable->getMessage()];
    }

    return response()->json($res);
}
    static function getQuantityCategoryIds()
    {
        $quantity_category_obj = DB::connection('mis_db')->table('par_containers')
            ->where('has_quantity', 1)
            ->get();
        $quantity_categories_ass = convertStdClassObjToArray($quantity_category_obj);
        $quantity_categories_simp = convertAssArrayToSimpleArray($quantity_categories_ass, 'id');
        return $quantity_categories_simp;
    }
    static function belongsToQuantityCategory($container_id)
        {
            $QuantityCategoryIDs = self::getQuantityCategoryIds();
            $container_id_array = is_array($container_id) ? $container_id : [$container_id];
            $arr_intersect = array_intersect($QuantityCategoryIDs, $container_id_array);
            if (count($arr_intersect) > 0) {
                return true;
            } else {
                return false;
            }
        }
public function getproductPackagingDetails(Request $req)
    {

        try {
            //
            $product_id = $req->product_id;
            $data = array();
            $data = DB::connection('mis_db')->table('tra_product_packaging as t1')
                ->select(DB::raw("t1.*,t2.name as container_name,t3.name as secondary_container_name,t4.name as tertiary_container_name,t5.name as shipper_container_name,t6.name as si_unit,t7.name as secondary_si_unit,t8.name as tertiary_si_unit,t9.name as shipper_si_unit,t10.description as generic_name"))
                ->leftJoin('par_containers as t2', 't1.container_id', '=', 't2.id')
                ->leftJoin('par_containers as t3', 't1.secondary_container_id', '=', 't3.id')
                ->leftJoin('par_containers as t4', 't1.tertiary_container_id', '=', 't4.id')
                ->leftJoin('par_containers as t5', 't1.shipper_container_id', '=', 't5.id')
                ->leftJoin('si_units as t6', 't1.si_unit_id', '=', 't6.id')
                ->leftJoin('si_units as t7', 't1.secondary_si_unit_id', '=', 't7.id')
                ->leftJoin('si_units as t8', 't1.tertiary_si_unit_id', '=', 't8.id')
                ->leftJoin('si_units as t9', 't1.shipper_si_unit_id', '=', 't9.id')
                 ->leftJoin('par_atc_codes as t10', 't1.active_common_name_id', '=', 't10.id')
                ->where(array('t1.product_id' => $product_id))
                ->get();


             foreach ($data as $record) {
                    $packSize = '';
                    $packSizediluent = '';
                    $pack_id = $record->id;
                    $is_quantity_category = $this->belongsToQuantityCategory($record->container_id);

                    // Calculate pack size
                    if ($is_quantity_category) {
                        $packSize = "{$record->no_of_packs}{$record->si_unit} {$record->container_name}";
                    } else {
                        $packSize = "{$record->no_of_units} {$record->container_name}";
                    }

                    // Add secondary, tertiary, and shipper units if they exist
                    if ($record->secondary_no_of_units) {
                        $packSize = "{$record->secondary_no_of_units}*" . $packSize;
                    }
                    if ($record->tertiary_no_of_units) {
                        $packSize = "{$record->tertiary_no_of_units}*" . $packSize;
                    }
                    if ($record->shipper_no_of_units) {
                        $packSize = "{$record->shipper_no_of_units}*" . $packSize;
                    }
                    if ($record->other_no_of_units) {
                        $packSize = "{$record->other_no_of_units}*" . $packSize;
                    }

                    // Retrieve diluent data
                    $diluent_data = DB::table('tra_product_diluent_packaging as t1')
                        ->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, retail_packaging_size as retail_packaging,t8.name as si_unit,t9.name as packaging_category,t10.name as diluent"))
                        ->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
                        ->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
                        ->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
                        ->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
                        ->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
                        ->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
                        ->leftJoin('si_units as t8', 't1.si_unit_id', '=', 't8.id')
                        ->leftJoin('par_container_categories as t9', 't1.packaging_category_id', '=', 't9.id')
                        ->leftJoin('par_diluents as t10', 't1.diluent_id', '=', 't10.id')
                        ->where(['t1.product_id' => $product_id, 't1.pack_id' => $pack_id])
                        ->get();

                    // Process each diluent record
                    foreach ($diluent_data as $diluent_record) {
                        
                         $is_quantity_category = $this->belongsToQuantityCategory($diluent_record->container_id);

                            // Calculate pack size
                            if ($is_quantity_category) {
                                $packSizediluent = "{$diluent_record->secondary_no_of_units}*{$diluent_record->no_of_packs}{$diluent_record->si_unit} {$diluent_record->container_name} {$diluent_record->diluent}";
                            } else {
                                $packSizediluent = "{$diluent_record->secondary_no_of_units}*{$diluent_record->no_of_units} {$diluent_record->container_name} {$diluent_record->diluent}";
                            }
                                $packSize .= ' + ' . $packSizediluent;
                            }

                    // Assign the calculated pack size to the record
                    $record->pack_size = $packSize;
                }

            $res = array('success' => true, 'data' => $data);

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
         ->leftJoin('par_countries as t20', 't7.product_origin_id', '=', 't20.id')
        ->leftJoin('tra_product_ingredients as t21', 't21.product_id', '=', 't7.id')
        ->leftJoin('tra_product_packaging as t22', 't22.product_id', '=', 't7.id')
        ->leftJoin('tra_secondary_packaging as t23', 't23.product_id', '=', 't22.product_id')
        ->leftJoin('tra_tertiary_packaging as t24', 't24.product_id', '=', 't22.product_id')
        ->leftJoin('par_containers as t25', 't25.id', '=', 't22.container_type_id')
        ->leftJoin('par_dosage_forms as t26', 't26.id', '=', 't7.dosage_form_id')
        ->select('t7.*','t1.*', 't1.tracking_no as product_registration_no','t16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id',  't3.name as applicant_name','t3.physical_address', 't17.name as dosage_form', 't19.name as manufacturing_site',  't9.name as local_agent', 't12.id as reg_product_id','t1.product_id as tra_product_id','t7.id as product_id',
            't13.name as storage_condition','t7.brand_name', 't7.id as product_id', 't12.tra_product_id','t8.name as common_name', 't20.name as product_origin', 't21.ingredient_id','t21.specification_type_id', 't24.no_of_packs_tertiary', 't23.no_of_packs_secondary', 't22.no_of_packs', 't22.no_of_units', 't22.container_type_id' , 't25.name as container_type' , 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
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
public function getproductUnRegisteredPackagingDetails(Request $req) {


 try {
    $data = array();
    $product_id = $req->product_id;

    // Fetch the primary record
    $record = DB::connection('mis_db')->table('tra_unregistered_products as t1')
        ->select(DB::raw("t1.*,t2.name as container_name, t6.name as si_unit"))
        ->leftJoin('par_containers as t2', 't1.container_id', '=', 't2.id')
        ->leftJoin('si_units as t6', 't1.si_unit_id', '=', 't6.id')
        ->where('t1.id', $product_id)
        ->first();

    if ($record) {
        // Get the container_id from the record
        $container_id = $record->container_id;

        // Fetch container details
        $container = DB::connection('mis_db')->table('par_containers as t1')
            ->select(DB::raw("t1.*"))
            ->where('t1.id', $container_id)
            ->first();

        if ($container) {
            $has_quantity = $container->has_quantity;

            if ($has_quantity == 1) {
                $pack_size = "{$record->secondary_no_of_units}x{$record->no_of_packs}{$record->si_unit} {$record->container_name}";
                $no_of_units_packs = $record->no_of_units;
            } else {
                $pack_size = "{$record->no_of_units} {$record->container_name}";
                $no_of_units_packs = $record->secondary_no_of_units * $record->no_of_units * $record->no_of_packs;
            }

            $data[] = array(
                'product_id' => $record->id,
                'container_id' => $record->container_id,
                'si_unit_id'=> $record->units_for_quantity,
                'no_of_units' => $record->no_of_units,
                'no_of_packs' => $record->no_of_packs,
                'container_material_id' => $record->container_material_id,
                'pack_size' => $pack_size,
                'no_of_units_packs' => $no_of_units_packs,
                'id' => $record->id,
            );
        }
    }

            $res = array('success' => true, 'data' => $data);

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


   public function getUnRegisteredProductsDetails(Request $req){
    try{
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
    
            if($req->searchValue != 'undefined'){
                $searchValue = explode(',',$searchValue);
                $searchValue =  $searchValue[2];
            }
            else{
                $searchValue =  '';
            }
          
                      $qry = DB::connection('mis_db')
                        ->table('tra_unregistered_products as t1')
                        ->leftjoin('par_si_units as t2','t1.si_unit_id','=','t2.id')
                        ->leftjoin('par_atc_codes as t3','t1.common_name_id','=','t3.id')
                        ->leftjoin('par_ingredients_details as t4','t1.ingredient_id','=','t4.id')

                        ->leftjoin('par_dosage_forms as t5','t1.dosage_form_id','=','t5.id')
                        ->leftjoin('par_countries as t6','t1.product_origin_id','=','t6.id')
                        ->leftjoin('par_medicaldevices_classification as t7','t1.medical_device_class_type','=','t7.id')
                        ->leftjoin('par_specification_types as t8','t1.specification_type_id','=','t8.id')
                        ->leftjoin('par_gmdn_codes as t9','t1.gmdn_code','=','t9.id')

                        ->leftjoin('si_units as t10','t1.units_for_quantity','=','t10.id')
                        ->leftjoin('par_hs_code as t11','t1.hs_code_id','=','t11.id')

                        ->select('t1.*','t1.id as product_id','t1.proprietary_name','t3.name as generic_name','t5.name as dosage_form','t6.name as country_of_origin','t9.code as gmdn_code','t9.name as gmdn_term','t9.description as gmdn_descriptor');
                                    

                                    if($searchValue != ''){
                                        $whereClauses = array();
                                        $whereClauses[] = "t1.proprietary_name like '%" . ($searchValue) . "%'";
                                        $whereClauses[] = "t1.email_address like '%" . ($searchValue) . "%'";
                                        $filter_string = implode(' OR ', $whereClauses);
                                        $qry->whereRAW($filter_string);
                                    }
                                    $records = $qry->skip($skip)->take($take)->get();

                                    $totalCount = $qry->count();
                                    $res = array('success' => true,
                                        'data' => $records,
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


   public function getBatchPermitProductsDetails(Request $req){
    try{

        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_batch_permits_products as t1')
            ->select('t1.*')
            ->where(['t1.application_code' => $application_code])
            ->get();

        $data = $this->getBatchProductsPermitDetails($records);
        $no_of_batches = 0;

         foreach ($records as $record) {
            if (isset($record->batch_qty)) {

                $no_of_batches += $record->batch_qty;

            }
        }

        $res = ['success' => true, 'data' => $data,'no_of_batches'=>$no_of_batches];

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

   public function getApprovedProductsDetails(Request $req){
    try {
        $mistrader_id = $req->mistrader_id;
       // $section_id = $req->section_id;
        $validity_status = $req->validity_status;
        $registration_status = $req->registration_status;
        $port_id = $req->port_id;
        
        $take = $req->take;
         $skip = $req->skip;
         $searchValue = $req->searchValue;
         $search_value =  '';
         if($req->searchValue != 'undefined'){
             $searchValue = explode(',',$searchValue);
             $search_value =  $searchValue[2];
         }
        
        $qry = DB::connection('mis_db')->table('tra_importexport_applications as t1')
        ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
        ->join('tra_permits_products as t4', 't1.application_code', '=', 't4.application_code')
        ->leftJoin('par_common_names as t5', 't4.common_name_id', '=', 't5.id')
       // ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
        ->leftJoin('tra_approval_recommendations as t6', 't1.permit_id', '=', 't6.id')
        ->leftJoin('par_ports_information as t7', 't4.port_id', '=', 't7.id')
        //->join('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
        // ->join('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
        // ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
        // ->leftJoin('tra_product_manufacturers as t14', function ($join) {
        //     $join->on('t7.id', '=', 't14.product_id')
        //         ->on('t14.manufacturer_role_id', '=', DB::raw(1))
        //         ->on('t14.manufacturer_type_id', '=', DB::raw(1));
        // })
       // ->leftJoin('par_man_sites as t19', 't14.man_site_id', '=', 't19.id')
        ->select('t4.*','t1.tracking_no as vc_no', 't3.name as applicant_name','t3.physical_address','t6.certificate_no', 't6.expiry_date','t5.name as common_name', 't7.name as port_id' );
        
        
     if (isset($port_id) && is_numeric($port_id)) {
         $qry->where('t1.port_id', $port_id);
     }
     // if (validateIsNumeric($validity_status)) {
     //     $qry->where('t12.validity_status_id', $validity_status);
     // }
     // if (validateIsNumeric($registration_status)) {
     //     $qry->where('t12.registration_status_id', $registration_status);
     // }
     // if (validateIsNumeric($mistrader_id)) {
     //     $qry->where('t12.applicant_id', $mistrader_id);
     // }
    //  if (validateIsNumeric($man_site_id)) {
    //  //   $qry->where('t14.man_site_id', $man_site_id);
    // }
     
     
     if($search_value != ''){
         $whereClauses = array();
         $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
         
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

   public function getPermitUploadedProductsDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_uploadpermits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getProductsPermitDetails($records);
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
  
   
   public function getDisposalPermitProductsDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_disposal_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getDisposalProductsPermitDetails($records);
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
   
   public function getDisposalProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $packagingTypeData= getParameterItems('packaging_units','','mis_db');
    $weightsData = getParameterItems('par_weights_units','','mis_db');
    
    foreach ($records as $rec) {
           $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name','mis_db');
       
       $data[] = array('application_code'=>$rec->application_code,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'dosage_form'=>$rec->dosage_form,
                       'generic_name'=>$rec->generic_name,
                       'batch_no'=>$rec->batch_no,
                       'product_pack'=>$rec->product_pack,
                       'product_description'=>$rec->product_description,
                       'pack_type'=>returnParamFromArray($packagingTypeData,$rec->packaging_type_id),
                       'currency_id'=>$rec->currency_id,
                       'packaging_unit_id'=>$rec->packaging_unit_id,
                       'reason_for_disposal'=>$rec->reason_for_disposal,
                       'brand_name'=>$rec->brand_name,
                       'estimated_value'=>$rec->estimated_value,
                       'id'=>$rec->id,
                       'packaging_units'=>returnParamFromArray($packagingData,$rec->packaging_unit_id),
                       'currency_name'=>returnParamFromArray($currencyData,$rec->currency_id)
                   );
    }
    return $data;
   }

   public function getBatchProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
    $weightsData = getParameterItems('par_weights_units','','mis_db');
    $siUnitsData = getParameterItems('par_si_units','','mis_db');
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $permitReasonData = getParameterItems('par_permit_category','','mis_db');
    $permitprodrecommendationsData = getParameterItems('par_permitprod_recommendations','','mis_db');
    $commonNamesData = getParameterItems('par_common_names', '', 'mis_db');
    $ingredientsData = getParameterItems('par_ingredients_details', '', 'mis_db');
    $specificationData = getParameterItems('par_specification_types', '', 'mis_db');
    $unitsOfStrength = getParameterItems('par_packaging_units', '', 'mis_db');
    $deviceType = getParameterItems('par_containers', '', 'mis_db');
    $dosageFormsData = getParameterItems('par_dosage_forms', '', 'mis_db');
    
    foreach ($records as $rec) {
         //$brand_name =  $rec->permitbrand_name;
        // if(validateIsNumeric($rec->product_id)){
        //   $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name','mis_db');
        // }
        $country_oforigin_id = '';
        $manufacturer_name = '';
      // if(validateIsNumeric($rec->manufacturer_id)){
      //      $manufacturer_rec = getSingleRecord('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'mis_db');
      //      $manufacturer_name = $manufacturer_rec->name;
      //      $country_oforigin_id = $manufacturer_rec->country_id;
           
      // }
      
       $document_upload_id = 0;
       $node_ref = '';
       // if(validateIsNumeric($rec->document_upload_id)){
       //   $document_rec = getSingleRecord('tra_application_uploadeddocuments', array('id' => $rec->document_upload_id), 'mis_db');
       //   $node_ref = $document_rec->node_ref;
       //   $document_upload_id = $rec->document_upload_id;
       // }
      
       $data[] = array('application_code'=>$rec->application_code,
                       'product_id'=>$rec->product_id,
                        'batch_qty'=>$rec->batch_qty,
                       'id'=>$rec->id,
                       'record_id'=>$rec->id,
                            'product_batch_no'=>$rec->product_batch_no,
                            'product_expiry_date'=>formatDate($rec->product_expiry_date),
                            // 'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                   
                   );
      // dd($data);
    }
    return $data;
   }
   
   public function getProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
    $weightsData = getParameterItems('par_weights_units','','mis_db');
    $siUnitsData = getParameterItems('par_si_units','','mis_db');
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $permitReasonData = getParameterItems('par_permit_category','','mis_db');
    $permitprodrecommendationsData = getParameterItems('par_permitprod_recommendations','','mis_db');
    $commonNamesData = getParameterItems('par_common_names', '', 'mis_db');
    $ingredientsData = getParameterItems('par_ingredients_details', '', 'mis_db');
    $specificationData = getParameterItems('par_specification_types', '', 'mis_db');
    $unitsOfStrength = getParameterItems('par_packaging_units', '', 'mis_db');
    $deviceType = getParameterItems('par_containers', '', 'mis_db');
    $dosageFormsData = getParameterItems('par_dosage_forms', '', 'mis_db');
    $confirmationData = getParameterItems('par_confirmations', '', 'mis_db');

    $doseData = getParameterItems('par_product_fdc', '', 'mis_db');
    $atcCodeData = getParameterItems('par_atc_codes', '', 'mis_db');
    $classificationData = getParameterItems('classification', '', 'mis_db');
    $categoriesData = getParameterItems('par_prodclass_categories', '', 'mis_db');
    $therapeuticData = getParameterItems('par_therapeutic_group', '', 'mis_db');
    $distributionData = getParameterItems('par_distribution_categories', '', 'mis_db');
    $administrationData = getParameterItems('par_route_of_administration', '', 'mis_db');
    $activeIngredientSalt = getParameterItems('par_controlled_substance_active_ingredient_salt', '', 'mis_db');
    
    foreach ($records as $rec) {
		 //$brand_name =  $rec->permitbrand_name;
		// if(validateIsNumeric($rec->product_id)){
		// 	 $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name','mis_db');
		// }
		$country_oforigin_id = '';
		$manufacturer_name = '';
      if(validateIsNumeric($rec->manufacturer_id)){
		   $manufacturer_rec = getSingleRecord('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'mis_db');
		   $manufacturer_name = $manufacturer_rec->name;
		   $country_oforigin_id = $manufacturer_rec->country_id;
		   
	  }
      
	   $document_upload_id = 0;
	   $node_ref = '';
	   if(validateIsNumeric($rec->document_upload_id)){
		 $document_rec = getSingleRecord('tra_application_uploadeddocuments', array('id' => $rec->document_upload_id), 'mis_db');
         $node_ref = $document_rec->node_ref;
         $document_upload_id = $rec->document_upload_id;
	   }
      
       $data[] = array('application_code'=>$rec->application_code,
                      // 'device_type_id'=>$rec->device_type_id,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'document_upload_id'=>$document_upload_id,
                       'node_ref'=>$node_ref,
                       'currency_id'=>$rec->currency_id,
                       'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                       'packaging_unit_id'=>$rec->packaging_unit_id,
                       'total_weight'=>$rec->total_weight,
                       'pack_size'=>$rec->pack_size,
                       'unitpack_size'=>$rec->unitpack_size,
                       'unitpack_unit_id'=>$rec->unitpack_unit_id,
                       'product_registration_no' =>$rec->product_registration_no,
					   'pack_unit'=>returnParamFromArray($siUnitsData,$rec->unitpack_unit_id),
						'weights_units_id'=>$rec->weights_units_id,
						'product_category_id'=>$rec->product_category_id,
                        'common_name_id'=>$rec->common_name_id,
                        'dosage_form_id'=>$rec->dosage_form_id,
                        'si_unit_id'=>$rec->si_unit_id,
						'container_type_id'=>$rec->container_type_id,
						'manufacturer_id'=>$rec->manufacturer_id,
						'country_oforigin_id'=>$country_oforigin_id,
						'manufacturer_name'=>$manufacturer_name,
                       'brand_name'=>$rec->brand_name,
                       'gmdn_code'=>$rec->gmdn_code,
                       'gmdn_descriptor'=>$rec->gmdn_descriptor,
                       'medical_device_class_type'=>$rec->medical_device_class_type,
                       'name_chemical_reference'=>$rec->name_chemical_reference,
                        'name_of_material'=>$rec->name_of_material,
                        'equipment_purpose'=>$rec->equipment_purpose,
                        'batch_qty'=>$rec->batch_qty,
                       //'specification_type_id'=>$specification_type_id,
                      // 'ingredient_id' =>$ingredient_id,
                       'id'=>$rec->id,
					   'record_id'=>$rec->id,
                       'no_of_packs_tertiary'=>$rec->no_of_packs_tertiary,
                       'no_of_packs_secondary'=>$rec->no_of_packs_secondary,
                       'no_of_packs'=>$rec->no_of_packs,
                       'no_of_units'=>$rec->no_of_units,
                       'no_of_units'=>$rec->no_of_units,
                       'total_units'=>$rec->total_units,
                       'total_units'=>$rec->total_units,
                       'verification_fee_percent'=>$rec->verification_fee_percent,
                       'controlled_substance_id'=>$rec->controlled_substance_id,
                       'scheduled_number'=>$rec->scheduled_number,
                        'convertion_factor'=>$rec->convertion_factor,
                        'controlled_substance_schedule'=>$rec->controlled_substance_schedule,
                        'packs_per_tertiary_pack'=>$rec->packs_per_tertiary_pack,
                        'total_salt_quantity'=>$rec->total_salt_quantity,
                        'total_narcotic_units'=>$rec->total_narcotic_units,
                        'total_narcotic_base'=>$rec->total_narcotic_base,
                            
                       'total_value'=>$rec->total_value,
                       'vc_quantity'=>$rec->vc_quantity,
                       'declaration_quantity'=>$rec->declaration_quantity,
                       'vc_no'=>$rec->vc_no,
                       'declare_product_id'=>$rec->declare_product_id,
                       'approved_qty'=>$rec->approved_qty,
                       'qty_shipped'=>$rec->qty_shipped,
                       'no_of_batches'=>$rec->no_of_batches,
                       'proprietary_name'=>$rec->proprietary_name,
                       'atc_desciption'=>$rec->atc_desciption,
                       'controlled_substance'=>returnParamFromArray($activeIngredientSalt,$rec->controlled_substance_id),
                       'common_name'=>returnParamFromArray($commonNamesData,$rec->common_name_id),
                       'si_unit'=>returnParamFromArray($unitsOfStrength,$rec->si_unit_id),
                       'copack'=>returnParamFromArray($confirmationData,$rec->co_pack),
                       'dose'=>returnParamFromArray($doseData,$rec->single_fixed_dose),
                       'atc_code'=>returnParamFromArray($atcCodeData,$rec->atc_code_id),
                       'classifications'=>returnParamFromArray($classificationData,$rec->classification),
                       'classcategory'=>returnParamFromArray($categoriesData,$rec->class_category),
                       'therapeuticgroup'=>returnParamFromArray($therapeuticData,$rec->therapeutic_group),
                       'distributioncategory'=>returnParamFromArray($distributionData,$rec->distribution_category),
                       'routeofadministarion'=>returnParamFromArray($administrationData,$rec->route_of_administarion),
                       'units_for_quantity'=>returnParamFromArray($unitsOfStrength,$rec->units_for_quantity),
                       'container_type'=>returnParamFromArray($deviceType,$rec->container_type_id),
                       'packaging_units'=>returnParamFromArray($packagingData,$rec->packaging_unit_id),
                       'material_category'=>returnParamFromArray($deviceType,$rec->material_category),
                      'weight_units'=>returnParamFromArray($weightsData,$rec->weights_units_id),
                       'currency_name'=>returnParamFromArray($currencyData,$rec->currency_id),
                         'specification_type_id'=>returnParamFromArray($specificationData,$rec->specification_type_id),
                       'ingredient_id' =>returnParamFromArray($ingredientsData, $rec->ingredient_id),
                       'dosage_form'=>returnParamFromArray($dosageFormsData,$rec->dosage_form_id),
                       'permitprod_recommendation'=>returnParamFromArray($permitprodrecommendationsData,$rec->permitprod_recommendation_id),
                       'unit_price'=>$rec->unit_price,
                       'product_strength'=>$rec->product_strength,
					'consignment_quantity'=>$rec->consignment_quantity,
                            'prodcertificate_no'=>$rec->prodcertificate_no,
                            'device_type_id'=>$rec->device_type_id,
                            'product_batch_no'=>$rec->product_batch_no,
                            'product_expiry_date'=>formatDate($rec->product_expiry_date),
                            'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                            //'is_validated'=>$rec->is_validated,
                            //'errors_list'=>$rec->errors_list,
                       //'total_value'=>($rec->unit_price*$rec->quantity),
                   );
      // dd($data);
    }
    return $data;
   }
   public function getApplicationCounterDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        
        $data = array();
        //get the records 
        $resp = false;
        $table_name = 'wb_importexport_applications as t1';
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
    
public function onPermitApplicationArchive(Request $req){
    try{
        $tracking_no = $req->tracking_no;
        $application_id = $req->application_id;
        $status_id = $req->status_id;
        $trader_id = $req->trader_id;
        $remarks = $req->remarks;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'wb_importexport_applications';
        $resp = false;
        $where_state = array('application_id' => $application_id, 'tracking_no'=>$tracking_no);
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
            $res = array('success'=>true, 'message'=>'Application has been archived successfully.');

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
public function onAddNewProductinformation(Request $req){
    try{
        $section_id = $req->section_id;
        $brand_name = $req->brand_name;
        $classification_id = $req->classification_id;
        $product_category_id = $req->product_category_id;
        $common_name_id = $req->common_name_id;
        $physical_description = $req->physical_description;
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'tra_product_information';
        $resp = false;
        $prod_data = array('brand_name' => $brand_name,
                           'section_id'=>$section_id,
                           'classification_id'=>$classification_id,
                           'product_category_id'=>$product_category_id,
                           'common_name_id'=>$common_name_id,
                           'physical_description'=>$physical_description
                        );
        $where_state = array('brand_name' => $brand_name,
                 'section_id'=>$section_id);
        $records = DB::connection('mis_db')
                    ->table($table_name)
                    ->where($where_state)
                    ->get();
        
        if(count($records) === 0){
                //delete functionality
                $prod_data['created_on'] =  Carbon::now();
                $prod_data['created_by'] = $trader_id;
                $resp = insertRecord( $table_name , $prod_data, $trader_id,'mis_db');
                if($resp['success']){

                    $res = array('success'=>true, 'record_id'=>$resp['record_id'],
                                'message'=>'Product Details have been saved successsfully.');
        
                }   
                else{
                    $res = array('success'=>false,'data'=>$resp['message'], 'message'=>'Product Details have not been saved, try again or contact TFDA Authority');
                }                
        }
        else{
            $res = array('success'=>false, 'message'=>'Product Information Exists, search details to proceed.');


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
public function getImportationReasons(Request $req) {
    try {
        $business_type_id = $req->input('business_type_id');
        $licence_type_id = $req->input('licence_type_id');

        $records = DB::connection('mis_db')
            ->table('par_importexport_reasons as t1')
            ->join('par_importationreasons as t2', 't2.importation_reason_id', '=', 't1.id')
            ->where([
                't2.business_type_id' => $business_type_id,
                't2.licence_type_id' => $licence_type_id
            ])
            ->select('t1.id', 't1.name')
            ->get();

        $res = [
            'success' => true,
            'data' => $records
        ];
    } catch (\Exception $e) {
        $res = [
            'success' => false,
            'message' => $e->getMessage()
        ];
    } catch (\Throwable $throwable) {
        $res = [
            'success' => false,
            'message' => $throwable->getMessage()
        ];
    }

    return response()->json($res);
}
    public function getSenderreceiversDetails(Request $req){
        
        try{

            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
             $table_name = $req->table_name;
              $qry = DB::connection('mis_db')
                            ->table( $table_name.' as t1')
                            ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                            ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                            ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                            ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                            ->orderBy('id', 'DESC');

                            if($search_value != ''){
                                $whereClauses = array();
                                $whereClauses[] = "t1.name like '%" . ($search_value) . "%'";
                                
                                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
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
      public function onAddUniformApplicantDataset(Request $req){
        try{
            $resp ="";
            $trader_id = $req->trader_id;
            $traderemail_address = $req->traderemail_address;
            $email_address = $req->email_address;
            $email = $req->email;
            $error_message = 'Error occurred, data not saved successfully';

            $data = $req->all();
            $table_name = $req->table_name;
            $record_id = $req->id;
            $product_id = $req->product_id;
            unset($data['table_name']);
            unset($data['traderemail_address']);
           
            if(isset($data['trader_id'])){
                 unset($data['trader_id']);
            }
            if(isset($data['product_id'])){
                 unset($data['product_id']);
            }
            if(validateIsNumeric($record_id)){
                $where = array('id'=>$record_id);
                if (recordExists($table_name, $where,'mis_db')) {
                                
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $traderemail_address;
                    $data['trader_id'] = $trader_id;

                    $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                    
                    $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);
                    
                }
            }
            else{
                //insert 
                $data['created_by'] = $traderemail_address;
                $data['trader_id'] = $trader_id;

                $data['created_on'] = Carbon::now();
                
                    $resp = insertRecord($table_name, $data, $traderemail_address,'mis_db');
                   
                    $record_id = $resp['record_id'];           
               
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
                'messa1'=>$resp,
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

      public function getSenderreceiversInvestigatorDetails(Request $req){
        
        try{
            $trader_id =$req->trader_id;
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
             $table_name = $req->table_name;
              $qry = DB::connection('mis_db')
                            ->table( $table_name.' as t1')
                            ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                            ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                            ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                            ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                            ->where('t1.trader_id', $trader_id)
                            ->orderBy('id', 'DESC');

                            if($search_value != ''){
                                $whereClauses = array();
                                $whereClauses[] = "t1.name like '%" . ($search_value) . "%'";
                                
                                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
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
    public function getAuthorisedProductsApplications(Request $req){
        try{
            $trader_id = $req->trader_id;
            $mistrader_id = $req->mistrader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            $identification_no = getSingleRecordColValue('wb_trader_account', array('id' => $mistrader_id), 'identification_no','mis_db');
            $section_id = $req->section_id;
            $search_value = $req->search_value;

            $qry = DB::connection('mis_db')
                    ->table('tra_product_information as t2')
                    ->join('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                    ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                    ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                    ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                    ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                    ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                    ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                    ->leftJoin('par_sections as t9', 't3.section_id', '=','t9.id')
                    ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                    ->leftJoin('wb_trader_account as t12', 't3.local_agent_id', '=','t12.id')
                    ->leftJoin('tra_trader_productauthorization as t11', function ($join) use($identification_no) {
                        $join->on('t1.id', '=', 't11.reg_product_id')
                             ->where('t11.status_id', '=', 1)
                             ->where('authorisedidentification_no', '=', $identification_no);
                    })
                    ->select('t3.product_id','t10.name as registrant','t12.name as localtechnical_representative',  't1.id as reg_product_id','t4.certificate_no as regcertificate_no','t2.id as product_id','t2.*','t2.brand_name', 't5.name as common_name','t9.name as section_name',  't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id')
                    ->where(function ($query) use ($trader_id,$mistrader_id) {
                        return $query->where('applicant_id', '=', $mistrader_id)
                                     ->orWhere('local_agent_id', '=', $mistrader_id);
                    })
                    ->where(array('t1.validity_status_id'=>2, 'registration_status_id'=>2));
                  
            if(validateIsNumeric($section_id)){

                $qry =  $qry->where('t3.section_id',$section_id);


            }
           
        
            $totalCount = $qry->count();
         
                $records = $qry->get();
           
            $dataset = array();
                foreach($records as $rec){
                        $retention_data = getProductRetentionStatus($rec->section_id,$rec->reg_product_id);

                        if($section_id == 2){

                        }
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'certificate_no'=>$rec->regcertificate_no,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant,
                                        'validity_status'=>$rec->validity_status,
                                        'retention_status'=>$retention_data['retention_status'],
                                        'retention_status_id'=>$retention_data['retention_status_id'],
                                        'validity_status_id'=>$rec->validity_status_id,
                                        'localtechnical_representative'=>$rec->localtechnical_representative
                                );

                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
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

    public function getSupervisingPharmacist(Request $req){
        $pharmacist_id = $req->pharmacist_id;
        $data = DB::connection('mis_db')->table('tra_pharmacist_personnel as t1')
                    ->where(array('id'=>$pharmacist_id))
                    ->get();
        return response()->json(array('data'=>$data));
    }

    
    public function getAllRegisteredNonRedProducts(Request $req){
        try{
            $trader_id = $req->trader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
			$total_qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
							
                            ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                           ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
							->select(DB::raw("count(t2.id) as total_rows"));
							DB::connection('mis_db')->enableQueryLog();
                $qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
							->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                           ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9', 't2.section_id', '=','t9.id') 
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->select(DB::raw("DISTINCT t3.product_id,t10.name as registrant, t4.certificate_no, t1.id as reg_product_id,t2.id as product_id,t2.*,t2.brand_name, t5.name as common_name, t9.name as section_name, t6.name as classification_name, t7.name as validity_status, t1.validity_status_id") );

           
            if(validateIsNumeric($section_id)){

                $qry->where('t2.section_id',$section_id);

              $total_qry->where('t2.section_id',$section_id);

            }
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                
                $whereClauses[] = "t2.brand_name  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t4.certificate_no  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
                //$qry->whereRAW($filter_string);
				$qry->where(function ($query) use ($filter_string) {
                        return $query->whereRAW($filter_string);
                });
				
				//$total_qry->whereRAW($filter_string);
				
				$total_qry->where(function ($query) use ($filter_string) {
                        return $query->whereRAW($filter_string);
                });
            }
        
            $totalCount = $total_qry->first()->total_rows;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
                $records = $qry->get();
            }
			//print_r(DB::connection('mis_db')->getQueryLog());
            $dataset = array();
               
                $res = array('success' => true,
                    'data' => $records,'totalCount'=>$totalCount 
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
    public function getRegisteredNonRegisteredProducts(Request $req){
 
        try{
            $trader_id = $req->trader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
           DB::connection('mis_db')->enableQueryLog();
            //seperate the registrable and non registrable 
           /* if($sub_module_id == 13 || $sub_module_id == 15 || $sub_module_id == 14){
$total_query =  DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            //->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                           // ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
							->select(DB::raw("count(t2.id) as total_acount"));
                $qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                            ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9', 't1.registration_status_id', '=','t9.id') 
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t2.id as product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status, t1.validity_status_id") );

            }
            else{
				*/
			if($sub_module_id == 78){
				$total_query =  DB::connection('mis_db')
                            ->table('tra_registered_products as t1')
                            ->join('tra_product_information as t2', 't1.tra_product_id','=','t2.id')
                            ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_product_applications as t3')
                            ->join('tra_product_information as t2', 't3.product_id','=','t2.id')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't4.appvalidity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't4.appregistration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9','t3.section_id', '=','t9.id')
                            ->leftJoin('tra_product_manufacturers as t11','t11.product_id', '=','t3.product_id')
                            ->leftJoin('tra_manufacturers_information as t12','t11.manufacturer_id' ,'=','t12.id')
                           
                            ->leftJoin('wb_trader_account as t10','t3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t3.product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status,t11.manufacturer_id, t12.name as manufacturer_name, t12.country_id as country_oforigin_id, t2.product_strength, t2.common_name_id, t2.product_category_id, t1.registration_status_id, t4.appvalidity_status_id as validity_status_id") )
							->groupBy('t3.product_id');
							
			}
			else{
				$total_query =  DB::connection('mis_db')
                            ->table('tra_registered_products as t1')
                            ->join('tra_product_information as t2', 't1.tra_product_id','=','t2.id')
                            ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_product_applications as t3')
                            ->join('tra_product_information as t2', 't3.product_id','=','t2.id')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id', '=', 't2.id')
                            ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't4.appvalidity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't4.appregistration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9','t3.section_id', '=','t9.id')
                            ->leftJoin('tra_product_manufacturers as t11','t11.product_id', '=','t3.product_id')
                            ->leftJoin('tra_manufacturers_information as t12','t11.manufacturer_id' ,'=','t12.id')
                           
                            ->leftJoin('wb_trader_account as t10','t3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t3.product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status,t11.manufacturer_id, t12.name as manufacturer_name, t12.country_id as country_oforigin_id, t2.product_strength, t2.common_name_id, t2.product_category_id, t1.registration_status_id, t4.appvalidity_status_id as validity_status_id") )
							->groupBy('t3.product_id');
				
			}
				
                          //  ->where(array('validity_status_id'=>2));
							/*
 ->where(function ($query) use ($trader_id,$mistrader_id) {
                                return $query->where('applicant_id', '=', $mistrader_id)
                                             ->orWhere('local_agent_id', '=', $mistrader_id);
                            })
							*/
          //  }

            
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                
                $whereClauses[] = "t2.brand_name  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t4.certificate_no  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
				
				$qry->where(function ($query) use ($filter_string) {
                                return $query->whereRAW($filter_string);
                            });
            }
			if(validateIsNumeric($section_id)){
				if($section_id == 1){
					
					   $qry->whereIn('t2.section_id',[1,7,8,9]);
					   $total_query->whereIn('t2.section_id',[1,7,8,9]);
				
						

				}
				else{
					    $qry->where('t2.section_id',$section_id);
						$total_query->where('t2.section_id',$section_id);

					
				}

            }
            $totalCount = $total_query->first()->total_acount;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
        
                $records = $qry->get();
            }
            $dataset = array();
                foreach($records as $rec){
                        $retention_data = getProductRetentionStatus($rec->section_id,$rec->reg_product_id);

                        if($section_id == 2){

                        }
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'certificate_no'=>$rec->certificate_no,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant,
                                        'validity_status'=>$rec->validity_status,
                                        'retention_status'=>$retention_data['retention_status'],
                                        'retention_status_id'=>$retention_data['retention_status_id'],
                                        'validity_status_id'=>$rec->validity_status_id,
                                        'registration_status_id'=>$rec->registration_status_id,
                                        'product_category_id'=>$rec->product_category_id,
                                        'common_name_id'=>$rec->common_name_id,
                                        'product_strength'=>$rec->product_strength,
                                        'manufacturer_name'=>$rec->manufacturer_name,
										'country_oforigin_id'=>$rec->country_oforigin_id,
                                        'manufacturer_id'=>$rec->manufacturer_id
                                );
                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
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
    public function getregulatedProductsPermitData(Request $req){
        try{
            $mistrader_id = $req->mistrader_id;

                $records = DB::connection('mis_db')->table('tra_trader_regulatedproducts as t1')
                            ->join('par_regulated_products  as t2', 't1.regulated_product_id', '=', 't2.id')
                            ->select('t2.bramd_name', 't1.authorised_permit_no', 't1.id as trader_regulatedproduct_id')
                            ->where(array('trader_id'=>$mistrader_id))
                            ->get();
                            $res = array(
                                'success' => false,
                                'data' => $records
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

    public function onDeletePermitdetails(Request $req){
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
		
		public function funcControlledDrugsInitiateLicenseApplication(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 61;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                          ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
                                          ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 
										'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                        'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,
										'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'LIC');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){
											$where_app = array('application_code'=>$generateapplication_code);
											if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
												initializeApplicationDMS(7, $module_id, $sub_module_id, $generateapplication_code, 'Application'.rand(0,1000), '');
											}
                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
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
        public function funcInitiateLicenseApplication(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 82;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                          ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
										  ->where('application_status_id', 1)
                                          ->first();
											
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $module_id = $rec->module_id;
								
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
								
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 
										'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                        'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
										'permit_category_id'=>$rec->permit_category_id,
										'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                       // 'proforma_invoice_no'=>$rec->proforma_invoice_no,
//'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,
										'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'LIC');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){
											$where_app = array('application_code'=>$generateapplication_code);
											if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
												initializeApplicationDMS(7, $module_id, $sub_module_id, $generateapplication_code, 'Application'.rand(0,1000), '');
											}
                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
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
        public function initiateRequestforPermitAmmendment(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 12;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                                ->where(array('reg_importexport_id'=>$reg_importexport_id, 'application_status_id'=>$application_status_id))
                                                ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                       // 'application_type_id' => $rec->application_type_id,
                                        'business_type_id'=>$rec->business_type_id,
                                        'product_classification_id'=>$rec->product_classification_id,

                                    'has_registered_premises' =>$rec->has_registered_premises,
                                    'licence_type_id' => $rec->licence_type_id,

                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'A');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){

                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
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
        function generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,$acronym){
            $where = array('reg_importexport_id'=>$reg_importexport_id,'sub_module_id'=>$sub_module_id);

            $count = DB::connection('mis_db')->table($table_name)->where($where)->count();
            if($count > 0){

                    $count =  $count+1;

            }else{

                $count =  1;
            }
            return $reference_no.'/'.$acronym.$count;

        }
			
		 public function saveImportInspectionPermitProducts($generateapplication_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$application_code))->get();
            $res = '';
			
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
                            'consignment_quantity'=>$rec->consignment_quantity,
							 'document_upload_id'=>$rec->document_upload_id,
                            'vc_quantity'=>$rec->quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'prodclass_category_id'=>$rec->prodclass_category_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$generateapplication_code,
                            'section_id'=>$rec->section_id,
                            'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_batch_no'=>$rec->product_batch_no,
                            'product_manufacturing_date'=>$rec->product_manufacturing_date,
                            'product_expiry_date'=>$rec->product_expiry_date,
							
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'created_by'=>0,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
				
            }
			return $res;
			
    }
		 
        public function saveImportPermitProducts($generateapplication_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$application_code))->get();
            $res = '';
			
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
							 'document_upload_id'=>$rec->document_upload_id,
                            'vc_quantity'=>$rec->quantity,
                            'declaration_quantity'=>$rec->declaration_quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'specification_type_id'=>$rec->specification_type_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'prodclass_category_id'=>$rec->prodclass_category_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$generateapplication_code,
                            'section_id'=>$rec->section_id,
							 'product_batch_no'=>$rec->product_batch_no,
                            'product_manufacturing_date'=>$rec->product_manufacturing_date,
                            'product_expiry_date'=>$rec->product_expiry_date,
                            //'product_packaging'=>$rec->product_packaging,//'packaging_unit_id'=>$rec->packaging_unit_id,
                           // 'dosage_form_id'=>$rec->dosage_form_id,
                            'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'is_registered_product'=>$rec->is_registered_product,
                            'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                            'drugs_content'=>$rec->drugs_content,
                            'strength_asgrams'=>$rec->strength_asgrams,
                            'controlleddrug_base'=>$rec->controlleddrug_base, 
							'controlleddrug_baseunit_id'=>$rec->controlleddrug_baseunit_id,
                            'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                            'created_by'=>0,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
                  
            }
			return $res;
			
    }
    public function saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id){
        $record = DB::connection('mis_db')->table('tra_application_uploadeddocuments')
                                ->where(array('application_code'=>$application_code))
                                ->get();
		$res = array();
        foreach($record as $rec){
                $document_data = array('application_code'=>$generateapplication_code,
                                'document_requirement_id'=>$rec->document_requirement_id,
                                'uploaded_on'=>Carbon::now(),
                                'file_name'=>$rec->file_name,
                                'initial_file_name'=>$rec->initial_file_name,
                                'file_type'=>$rec->file_type,
                                'fileSize'=>$rec->fileSize,
                                'node_ref'=>$rec->node_ref,
                                'dola'=>Carbon::now(),
                                'dc_module_id'=>$rec->dc_module_id,
                                'dc_sub_module_id'=>$rec->dc_sub_module_id,
                                'portalapp_variationsdata_id'=>$rec->portalapp_variationsdata_id,
                                'is_synched'=>1
                );
                $res = insertRecord('tra_application_uploadeddocuments', $document_data, 0,'mis_db');
                         
        }
		
}
public function getImportExportApplicationsDetails($application_code){
    $records = DB::table('wb_importexport_applications as t1')
    ->select('t1.*', 't7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
    ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
        $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
        $join->on('t1.importexport_permittype_id', '=', 't4.importexport_permittype_id');
        $join->on('t1.application_status_id', '=', 't4.status_id');
    })
    ->leftJoin('wb_processstatus_actions as t6',function($join){
        $join->on('t1.application_status_id', '=', 't6.status_id')
             ->on('t6.is_default_action', '=', DB::raw(1));
    })
    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
    
    ->orderBy('t1.date_added','desc');
    $records =  $records->where(array('t1.application_code'=>$application_code));
    $data = $records->get();
    $data = $this->getSinglePermitApplications($data);

    return $data;
}
function getSinglePermitApplications($records){
		
    $actionColumnData = returnContextMenuActions();
    $data = array();

    $subModuleData = getParameterItems('sub_modules','','mis_db');
    $sectionsData = getParameterItems('par_sections','','mis_db');
    
    $permitCategoryData = getParameterItems('par_permit_category','','mis_db');
    $permitReasonData = getParameterItems('par_permit_reasons','','mis_db');
    $permitTypeData = getParameterItems('par_importexport_permittypes','','mis_db');
    $portData = getParameterItems('par_ports_information','','mis_db');
    
    foreach ($records as $rec) {
       $section = returnParamFromArray($sectionsData,$rec->section_id);
       $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');
       $sender_receiver = getSingleRecordColValue('tra_permitsenderreceiver_data', array('id' => $rec->sender_receiver_id), 'name','mis_db');
       $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $rec->consignee_id), 'name','mis_db');
       $contact_person = getSingleRecordColValue('tra_personnel_information', array('id' => $rec->contact_person_id), 'name','mis_db');
       
	  
	   
       $data = array('reference_no'=>$rec->reference_no,
                       'trader_id'=>$rec->trader_id,
                       'premise_id'=>$rec->premise_id,
                       'section_id'=>$rec->section_id,
                       'reg_importexport_id'=>$rec->reg_importexport_id,
                       'application_id'=>$rec->id,
                       'id'=>$rec->id,
					   
					   										'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
					     'custom_declaration_no'=>$rec->custom_declaration_no,
                           'clearing_agent'=>$rec->clearing_agent,
                           'proposed_inspection_date'=>$rec->proposed_inspection_date,
                           'shipment_date'=>$rec->shipment_date,
                       'date_added'=>$rec->date_added,
                       'sub_module_id'=>$rec->sub_module_id,
                       'module_id'=>$rec->module_id,
                       'application_status_id'=>$rec->application_status_id,
                       //'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                       'section'=>$section,
                       'created_by'=>$rec->created_by,
                       'submission_date'=>$rec->submission_date,
                        'otherpermit_reason'=>$rec->otherpermit_reason,
                        'importexport_permittype_id'=>$rec->importexport_permittype_id,
                       'permit_reason'=>returnParamFromArray($permitReasonData,$rec->permit_reason_id),
                       'importexport_permittype'=>returnParamFromArray($permitTypeData,$rec->importexport_permittype_id),
                       'proforma_currency_id'=>$rec->proforma_currency_id,
						'has_registered_outlets'=>$rec->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                       'permit_reason_id'=>$rec->permit_reason_id,
                       'proforma_invoice_no'=>$rec->proforma_invoice_no,
                       'proforma_invoice_date'=>$rec->proforma_invoice_date,
                       'has_nonregisteredprod_provision'=>returnColumnParamFromArray($permitTypeData,$rec->importexport_permittype_id,'has_nonregisteredprod_provision' ),   
                       	'permit_category_id'=>$rec->permit_category_id,
                       'premises_name'=>$premises_name,
                      // 'application_type_id' => $rec->application_type_id,
                           'business_type_id'=>$rec->business_type_id,
                           'product_classification_id'=>$rec->product_classification_id,
                                    'has_registered_premises' =>$rec->has_registered_premises,
                                    'licence_type_id' => $rec->licence_type_id,
                                    'contact_person' => $contact_person,
                                    'contact_person_id' => $rec->contact_person,

                       'paying_currency_id'=>$rec->paying_currency_id,
                       'sender_receiver_id'=>$rec->sender_receiver_id,
                       'sender_receiver'=>$sender_receiver,
                       'section_name'=>$section,
                       'zone_id'=>$rec->zone_id,
                       'port_id'=>$rec->port_id,
                       'port_name'=>returnParamFromArray($portData,$rec->port_id),
                       'mode_oftransport_id'=>$rec->mode_oftransport_id,
                       'consignee_options_id'=>$rec->consignee_options_id,
                       'consignee_id'=>$rec->consignee_id,
                       'consignee_name'=>$consignee_name,
                       'pay_currency_id'=>$rec->pay_currency_id,
                       'added_by'=>$rec->created_by,
                       'tracking_no'=>$rec->tracking_no,
                       'status_name'=>$rec->status_name,
                       'router_link'=>$rec->router_link,
                       'process_title'=>$rec->process_title,
                       'action_name'=>$rec->action_name,
                       'action'=>$rec->action,
                       'iconCls'=>$rec->iconCls,

                       'has_apppliedctrdrugs_license'=>$rec->has_apppliedctrdrugs_license,

                       'license_application_code'=>$rec->license_application_code,
                       'controlled_drugslicense_no'=>$rec->controlled_drugslicense_no,

                       'approximate_dateof_arrival'=>$rec->approximate_dateof_arrival,
                       'application_code'=>$rec->application_code,
                       'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                   );
    }
    return $data;

    
}
 public function funcInitiateInspectionBooking(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 49;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                                ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
                                                ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                        'module_id'=>$rec->module_id, 'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										
										
                                        'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
										'permit_category_id'=>$rec->permit_category_id,
										
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'poeinspection_recommendation_id'=>1,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }

                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'INSP');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){

                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');
                                            //check the porducts 

                                            $res = $this->saveImportInspectionPermitProducts($generateapplication_code,$application_code,$trader_email);

                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                   
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
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

   public function getPersonalOneYearImportAuthorisationapplication(Request $req){
    try{
        $trader_id = $req->trader_id;
        $application_status_id = $req->application_status_id;
        
        $application_status_ids = explode(',',  $application_status_id);
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;

        $data = array();
        //get the records 
       
        $records = DB::table('wb_importexport_applications as t1')
            ->select('t1.*','t7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
            ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
            ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                $join->on('t1.application_status_id', '=', 't4.status_id');
            })
            ->leftJoin('wb_processstatus_actions as t6',function($join){
                $join->on('t1.application_status_id', '=', 't6.status_id')
                     ->on('t6.is_default_action', '=', DB::raw(1));

            })
            ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
            ->where(array('t1.trader_id' => $trader_id))
            ->orderBy('t1.date_added','desc');
            
            if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                    
                $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

            }if(validateIsNumeric($sub_module_id)){
                $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
            }if(validateIsNumeric($section_id)){
                $records =  $records->where(array('t1.section_id'=>$section_id));
            }

            //the ilters 
            $records = $records->get();

            $data = $this->getPersonalOneYearImportAuthorisationdetails($records);
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

    
function getPersonalOneYearImportAuthorisationdetails($records){
        
    $actionColumnData = returnContextMenuActions();
    $data = array();

    $subModuleData = getParameterItems('sub_modules','','mis_db');
    $sectionsData = getParameterItems('par_sections','','mis_db');
    
    foreach ($records as $rec) {
       $section = returnParamFromArray($sectionsData,$rec->section_id);
       $prem_record = getSingleRecord('tra_premises', array('id' => $rec->premise_id),'mis_db');
        
       $data[] = array('reference_no'=>$rec->reference_no,
                       'trader_id'=>$rec->trader_id,
                       'premise_id'=>$rec->premise_id,
                       'section_id'=>$rec->section_id,
                       'application_id'=>$rec->id,
                       'id'=>$rec->id,
                       'date_added'=>$rec->date_added,
                       'sub_module_id'=>$rec->sub_module_id,
                       'module_id'=>$rec->module_id,
                       'reason_for_authorisation'=>$rec->reason_for_authorisation,
                       'application_status_id'=>$rec->application_status_id,
                      // 'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).'   Application',
                       'section'=>$section,
                      // 'application_type_id' => $rec->application_type_id,
                       'created_by'=>$rec->created_by,
                       'submission_date'=>$rec->submission_date,
                       'premises_name'=>$prem_record->name,
                       'premises_physical_address'=>$prem_record->physical_address,
                       'section_name'=>$section,
                       'zone_id'=>$rec->zone_id,
                       'added_by'=>$rec->created_by,
                       'tracking_no'=>$rec->tracking_no,
                       'status_name'=>$rec->status_name,
                       'router_link'=>$rec->router_link,
                       'process_title'=>$rec->process_title,
                       'action_name'=>$rec->action_name,
                       'action'=>$rec->action,
                       'iconCls'=>$rec->iconCls,
                       'application_code'=>$rec->application_code,
                       
                       'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                   );
    }
    
    return $data;


}

    public function saveOneYearAuthorisationApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            $application_code = $req->application_code;
            $app_data = array('section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'reason_for_authorisation'=>$req->reason_for_authorisation,
                                    'premise_id'=>$req->premise_id,
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
                      
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $ref_id = 0;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                $codes_array = array(
                                    'section_code' => $section_code,
                                    'zone_code' => $zone_code,
                                    'apptype_code'=>$apptype_code
                                );
                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['reference_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                              
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                     initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                        saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
				//'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   

    }
public function savepersonalAuthorisedProductsData(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
       
        $product_id = $req->product_id;
        $record_id = $req->id;
       
        $device_type_id = $req->device_type_id;
       
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        if(!validateIsNumeric($product_id)){
            $product_id = $this->onAddingNewProductDetails($req);

        }
        $document_requirement_id = 100;
        $document_upload_id = 0;// $this->onUploadDocuments($req,$document_requirement_id);

        $table_name = 'wb_personauthorised_products';
        $data = array('application_code'=>$application_code,
                        'section_id'=>$req->section_id,
                        'permitbrand_name'=>$req->brand_name,
                        'productphysical_description'=>$req->productphysical_description,
                        'manufacturer_id'=>$req->manufacturer_id,'country_oforigin_id'=>$req->country_oforigin_id,
                        'product_id'=>$product_id
                );

                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                    
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);
                        $record_id = $resp['record_id'];     
                        if($resp['success']){
                            $res =  array('success'=>true,
                            'record_id'=>$record_id,
                            'message'=>'Saved Successfully');
            
                        }
                        else{
                            $res =  array('success'=>false,
                            'message'=>$error_message);
            
                        }
                   
                } 
                
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,'resp'=>$resp,
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
 public function getpersonalAuthorisedProductsData(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_personauthorised_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getpersonalAuthorisedProductsDetails($records);
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
   
   public function getpersonalAuthorisedProductsDetails($records){
    $data = array();
    foreach ($records as $rec) {

       $prod_record = getSingleRecord('tra_product_information', array('id' => $rec->product_id),'mis_db');
       
       $common_name = getSingleRecordColValue('par_common_names', array('id' => $prod_record->common_name_id), 'name','mis_db');
       $classification_name = getSingleRecordColValue('par_classifications', array('id' => $prod_record->classification_id), 'name','mis_db');
       $product_category = getSingleRecordColValue('par_product_categories', array('id' => $prod_record->product_category_id), 'name','mis_db');
       $manufacturer_name = getSingleRecordColValue('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'name','mis_db');
       $data[] = array('application_code'=>$rec->application_code,
                      
                       'product_id'=>$rec->product_id,
                       'brand_name'=>$prod_record->brand_name,
                       'common_name'=>$common_name,
                       'classification_name'=>$classification_name,
                       'manufacturer_name'=>$manufacturer_name,
                       'product_category'=>$product_category,
                       'common_name_id'=>$prod_record->common_name_id,
                       'country_oforigin_id'=>$rec->country_oforigin_id,
                       'device_type_id'=>$prod_record->device_type_id,
                       'manufacturer_id'=>$rec->manufacturer_id,
                       'product_category_id'=>$prod_record->product_category_id,
                       'product_strength'=>$prod_record->product_strength,
                       'product_subcategory_id'=>$prod_record->product_subcategory_id,
                       'productdosage_id'=>$prod_record->dosage_form_id,
                       'productclassification_id'=>$prod_record->classification_id,
                       'productphysical_description'=>$rec->productphysical_description,
                       'id'=>$rec->id,
                       
                   );
    }
    return $data;
   }
  public function getPersonalisedApprovedAuthorisedProducts(Request $req){
 
        try{
           
            $mistrader_id = $req->mistrader_id;
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
           DB::connection('mis_db')->enableQueryLog();
          
$total_query =  DB::connection('mis_db')
                            ->table('tra_importexport_applications as t1')
                            ->join('tra_personauthorised_products as t2', 't1.application_code','=','t2.application_code')
                            ->join('tra_product_information as t3', 't2.product_id', '=', 't3.id')
                            ->join('tra_managerpermits_review as t4', 't1.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_importexport_applications as t3')
                            ->join('tra_personauthorised_products as t2', 't3.application_code','=','t2.application_code')
                            ->leftJoin('tra_product_information as t1', 't2.product_id', '=', 't1.id')
                            ->leftJoin('tra_managerpermits_review as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't1.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't1.classification_id', '=','t6.id')
                            ->leftJoin('par_sections as t9', 't2.section_id', '=','t9.id')
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->leftJoin('par_permitprod_recommendations as t11', 't2.permitprod_recommendation_id', '=','t11.id')
                            ->select(DB::raw(" DISTINCT t4.certificate_no,t10.name as registrant, t1.id as product_id,t3.section_id,t1.common_name_id, t2.id,t9.name as section_name, t5.name as common_name,t1.brand_name,t2.manufacturer_id,t2.permitprod_recommendation_id,t4.decision_id, t2.country_oforigin_id, t6.name as classification_name"));
                           // ->where(array('applicant_id'=>$mistrader_id));
                          //  ->where(array('t2.permitprod_recommendation_id'=>2))
                            //->where(array('t4.decision_id'=>1));


            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.brand_name  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
				
				$qry->where(function ($query) use ($filter_string) {
                                return $query->whereRAW($filter_string);
                            });
            }
			if(validateIsNumeric($section_id)){

               // $qry->where('t1.section_id',$section_id);
				
			//	$total_query->where('t1.section_id',$section_id);

            }
            $totalCount = $total_query->first()->total_acount;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
        
                $records = $qry->get();
            }
            $dataset = array();
                foreach($records as $rec){
                       
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                                        'common_name_id'=>$rec->common_name_id,
                                        'manufacturer_id'=>$rec->manufacturer_id,
                                        'country_oforigin_id'=>$rec->country_oforigin_id,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant
                                );

                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
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
    public function getApprrovedVisaProducts(Request $req){
        try{
            $application_code = $req->application_code;
            $reg_importexport_id = getSingleRecordColValue('wb_importexport_applications', array('application_code' => $req->application_code), 'reg_importexport_id');
            
            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_permits_products as t1')
                    ->join('par_currencies as t2', 't1.currency_id', 't2.id')
                    ->leftJoin('par_weights_units as t3', 't1.weights_units_id', 't3.id')
                    ->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
                    ->leftJoin('par_permitprod_recommendations as t5', 't1.permitprod_recommendation_id', 't5.id')
                    ->leftJoin('tra_product_information as t6', 't1.product_id', 't6.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', 't7.id')
                    ->leftJoin('tra_importexport_applications as t8', 't1.application_code', 't8.application_code')
                ->select('t1.*','t8.reg_importexport_id', 't1.id as approvedvisa_product_id', 't2.name as currency_name','t3.name as weight_name', 't4.name as packaging_unit', 't5.name as recommendation', 't6.brand_name', 't7.name as manufacture_name')
                ->where(array('t8.reg_importexport_id' => $reg_importexport_id, 'sub_module_id'=>12))
                ->get();
                $data = $this->getApprovedVisaProductsPermitDetails($records);
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
       public function funcGetVisaProductQty($vc_quantity, $reg_importexport_id,$approvedvisa_product_id, $sub_module_id){
                $total_qty = 0;
                $license_qty = DB::table('wb_permits_products as t1')
                                    ->join('wb_importexport_applications as t2', 't1.application_code', 't2.application_code')
                                    
                                    ->select(DB::raw('sum(t1.quantity) as total_qty'))
                                    ->where(array('t2.reg_importexport_id'=>$reg_importexport_id, 't1.approvedvisa_product_id'=>$approvedvisa_product_id))
                                    ->where('t2.sub_module_id', '<>', $sub_module_id)
                                    ->first();
                    if($license_qty){
                        $total_qty = $license_qty->total_qty;

                    }

                return ($vc_quantity - $total_qty);
       }
       public function getApprovedVisaProductsPermitDetails($records){
        $data = array();
        
        foreach ($records as $rec) {
             $brand_name =  $rec->permitbrand_name;
            if(validateIsNumeric($rec->product_id)){
                 $brand_name = $rec->brand_name;
            }
            $country_oforigin_id = '';
            $manufacturer_name = '';
            $visabalance_quantity = $this->funcGetVisaProductQty($rec->quantity, $rec->reg_importexport_id,$rec->approvedvisa_product_id, 82);

           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'currency_id'=>$rec->currency_id,
                           'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                           'permitprod_recommendation_remarks'=>$rec->permitprod_recommendation_remarks,
                           'packaging_unit_id'=>$rec->packaging_unit_id,
                           'total_weight'=>$rec->total_weight,
                           'pack_size'=>$rec->pack_size,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'weights_units_id'=>$rec->weights_units_id,
                            'vc_quantity'=>$rec->quantity,
                            'visabalance_quantity'=>$visabalance_quantity,
                            'product_category_id'=>$rec->product_category_id,
                            'common_name_id'=>$rec->common_name_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'country_oforigin_id'=>$country_oforigin_id,
                            'manufacturer_name'=>$manufacturer_name,
                           'brand_name'=>$brand_name,

                           'packaging_units'=>$rec->packaging_unit,
                            'weight_units'=>$rec->weight_name,
                           'currency_name'=>$rec->currency_name,
                           'permitprod_recommendation'=>$rec->recommendation,
                           'unit_price'=>$rec->unit_price,
                            'dosage_form_id'=>$rec->dosage_form_id,
                             'consignment_quantity'=>$rec->consignment_quantity,
                                'prodcertificate_no'=>$rec->prodcertificate_no,
                                'device_type_id'=>$rec->device_type_id,
                                'product_batch_no'=>$rec->product_batch_no,
                                'product_expiry_date'=>formatDate($rec->product_expiry_date),
                                'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                                'approvedvisa_product_id'=>$rec->approvedvisa_product_id,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
        }
        return $data;
       }

       
       public function getApprrovedLicensesProducts(Request $req){
        try{
            $application_code = $req->application_code;
            $reg_importexport_id = getSingleRecordColValue('wb_importexport_applications', array('application_code' => $req->application_code), 'reg_importexport_id');
            
            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_permits_products as t1')
                    ->join('par_currencies as t2', 't1.currency_id', 't2.id')
                    ->leftJoin('par_weights_units as t3', 't1.weights_units_id', 't3.id')
                    ->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
                    ->leftJoin('par_permitprod_recommendations as t5', 't1.permitprod_recommendation_id', 't5.id')
                    ->leftJoin('tra_product_information as t6', 't1.product_id', 't6.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', 't7.id')
                    ->leftJoin('tra_importexport_applications as t8', 't1.application_code', 't8.application_code')
                ->select('t1.*','t8.reg_importexport_id', 't1.id as approvedlicense_product_id', 't2.name as currency_name','t3.name as weight_name', 't4.name as packaging_unit', 't5.name as recommendation', 't6.brand_name', 't7.name as manufacture_name')
                ->where(array('t8.reg_importexport_id' => $reg_importexport_id))
                ->whereIn('t8.sub_module_id', [78,81,82])
                ->get();
                //'sub_module_id'=>12
                $data = $this->getApprovedLicenseProductsPermitDetails($records);
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
       public function getApprovedLicenseProductsPermitDetails($records){
        $data = array();
        
        foreach ($records as $rec) {
             $brand_name =  $rec->permitbrand_name;
            if(validateIsNumeric($rec->product_id)){
                 $brand_name = $rec->brand_name;
            }
            $country_oforigin_id = '';
            $manufacturer_name = '';
            $licensebalance_quantity = $this->funcGetLicensesProductQty($rec->quantity, $rec->reg_importexport_id,$rec->approvedlicense_product_id, 49);

           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'currency_id'=>$rec->currency_id,
                           'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                           'permitprod_recommendation_remarks'=>$rec->permitprod_recommendation_remarks,
                           'packaging_unit_id'=>$rec->packaging_unit_id,
                           'total_weight'=>$rec->total_weight,
                           'pack_size'=>$rec->pack_size,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'weights_units_id'=>$rec->weights_units_id,
                            'vc_quantity'=>$rec->quantity,
                            'licensebalance_quantity'=>$licensebalance_quantity,
                            'product_category_id'=>$rec->product_category_id,
                            'common_name_id'=>$rec->common_name_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'country_oforigin_id'=>$country_oforigin_id,
                            'manufacturer_name'=>$manufacturer_name,
                           'brand_name'=>$brand_name,
                           'packaging_units'=>$rec->packaging_unit,
                            'weight_units'=>$rec->weight_name,
                           'currency_name'=>$rec->currency_name,
                           'permitprod_recommendation'=>$rec->recommendation,
                           'unit_price'=>$rec->unit_price,
                            'dosage_form_id'=>$rec->dosage_form_id,
                             'consignment_quantity'=>$rec->consignment_quantity,
                                'prodcertificate_no'=>$rec->prodcertificate_no,
                                'device_type_id'=>$rec->device_type_id,
                                'product_batch_no'=>$rec->product_batch_no,
                                'product_expiry_date'=>formatDate($rec->product_expiry_date),
                                'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                                'approvedvisa_product_id'=>$rec->approvedvisa_product_id,
                                'approvedlicense_product_id'=>$rec->approvedlicense_product_id,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
        }
        return $data;
       }
       public function funcGetLicensesProductQty($vc_quantity, $reg_importexport_id,$approvedlicense_product_id, $sub_module_id){
        $total_qty = 0;
        $license_qty = DB::table('wb_permits_products as t1')
                            ->join('wb_importexport_applications as t2', 't1.application_code', 't2.application_code')
                            
                            ->select(DB::raw('sum(t1.quantity) as total_qty'))
                            ->where(array('t2.reg_importexport_id'=>$reg_importexport_id, 't1.approvedlicense_product_id'=>$approvedlicense_product_id))
                            ->where('t2.sub_module_id', 49)
                            ->first();
            if($license_qty){
                $total_qty = $license_qty->total_qty;

            }

        return ($vc_quantity - $total_qty);
}
}