<?php

namespace Modules\Importexportpermits\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Importexportpermits\Traits\ImportexportpermitsTraits;

class ImportexportpermitsController extends Controller
{
    protected $user_id;
    protected $zone_id;
     use ImportexportpermitsTraits;
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
                        'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
                    );
                    echo json_encode($res);
                    exit();
                }
                $this->user_id = \Auth::user()->id;
                $this->zone_id = \Auth::user()->zone_id;
                return $next($request);
            });
        }
    }

    public function getonlineimportexportappdetails(Request $req)
    {
        $section_id = $req->input('section_id');
        $sub_module_id = $req->input('sub_module_id');
        try {
            $data = array();
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_importexport_applications as t1')
                ->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select(
                    't1.*',
                    't1.id as active_application_id',
                    't1.application_code',
                    't3.name as applicant_name',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't4.name as application_status',
                    't4.is_manager_query'
                )
                ->where('t1.sub_module_id', 60)

                ->whereIn('application_status_id', array(2, 13, 15, 21));

            $modulesData = getParameterItems('modules', '');
            $subModulesData = getParameterItems('sub_modules', '');
            $zoneData = getParameterItems('par_zones', '');

            $permitCategoryData = getParameterItems('par_permit_category', '');


            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
                $filters_section = [14];
                $filters_section[] = $section_id;
                $qry->whereIN('t1.section_id', $filters_section);
            }
            $records = $qry->get();

            foreach ($records as $rec) {
                $data[] = array(
                    'active_application_id' => $rec->active_application_id,
                    'application_code' => $rec->application_code,
                    'proforma_invoice_no' => $rec->proforma_invoice_no,
                    'proforma_invoice_date' => $rec->proforma_invoice_date,
                    'app_physical_address' => $rec->app_physical_address,
                    'application_status' => $rec->application_status,
                    'module_id' => $rec->module_id,
                    'sub_module_id' => $rec->sub_module_id,
                    'tracking_no' => $rec->tracking_no,
                    'applicant_id' => $rec->trader_id,
                    'section_id' => $rec->section_id,
                    'zone_id' => $rec->zone_id,
                    'date_added' => $rec->date_added,
                    'submission_date' => $rec->submission_date,

                    'module_name' => returnParamFromArray($modulesData, $rec->module_id),
                    'sub_module' => returnParamFromArray($subModulesData, $rec->sub_module_id),
                    'permit_category' => returnParamFromArray($permitCategoryData, $rec->permit_category_id),
                    'zone_name' => returnParamFromArray($zoneData, $rec->zone_id)
                );
            }

            $res = array(
                'success' => true,
                'results' => $data,
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
    public function getOnlineDisposalApplications(Request $req)
    {
        $section_id = $req->input('section_id');
        $sub_module_id = $req->input('sub_module_id');
        try {
            $data = array();
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_disposal_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->leftJoin('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select(
                    't1.*',
                    't1.id as active_application_id',
                    't1.application_code',
                    't3.name as applicant_name',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't4.name as application_status',
                    't4.is_manager_query'
                )
                ->whereIn('application_status_id', array(2, 13, 15, 21));

            $modulesData = getParameterItems('modules', '');
            $subModulesData = getParameterItems('sub_modules', '');
            $zoneData = getParameterItems('par_zones', '');


            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $records = $qry->get();

            foreach ($records as $rec) {
                $data[] = array(
                    'active_application_id' => $rec->active_application_id,
                    'application_code' => $rec->application_code,
                    'reason_for_disposal' => $rec->reason_for_disposal,
                    'total_weight' => $rec->total_weight,
                    'quantity' => $rec->quantity,
                    'application_status' => $rec->application_status,
                    'module_id' => $rec->module_id,
                    'sub_module_id' => $rec->sub_module_id,
                    'tracking_no' => $rec->tracking_no,
                    'applicant_id' => $rec->trader_id,
                    'section_id' => $rec->section_id,
                    'zone_id' => $rec->zone_id,
                    'date_added' => $rec->date_added,
                    'submission_date' => $rec->submission_date,
                    'market_value' => $rec->market_value,
                    'module_name' => returnParamFromArray($modulesData, $rec->module_id),
                    'sub_module' => returnParamFromArray($subModulesData, $rec->sub_module_id),
                    'zone_name' => returnParamFromArray($zoneData, $rec->zone_id)
                );
            }

            $res = array(
                'success' => true,
                'results' => $data,
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

    public function prepareOnlineImportExporPermitReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::connection('portal_db')->table('wb_importexport_applications as t1')
                ->leftJoin('wb_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    'q.status_type_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $results->importexport_product_range_id=json_decode($results->importexport_product_range_id);
            $manufacturing_site_id = $results->manufacturing_site_id;
             $premise_id = $results->premise_id;
            $has_registered_premises = $results->has_registered_premises;
            $business_type_id = $results->business_type_id;
            $consignee_id = $results->consignee_id;
            $sender_receiver_id = $results->sender_receiver_id;
            $contact_person_id = $results->contact_person_id;
            if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $results->manufacturing_site_name=$manufacturing_site_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $results->premises_name=$premises_name;
                 }
            }

            if (validateIsNumeric($consignee_id)) {
                $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                $results->consignee_name = $consignee_name;
            }
            if (validateIsNumeric($contact_person_id)) {
                $billing_person = getSingleRecordColValue('tra_personnel_information', array('id' => $contact_person_id), 'name');

                $results->billing_person = $billing_person;
            }


            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            // $qry3 = DB::table('tra_premises as t3')
            //     ->select('t3.*')
            //     ->where(array('id' => $premise_id));
            // $premisesDetails = $qry3->first();
            $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
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


    public function prepapreDisposalOnlineReceiving(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {

            $main_qry = DB::connection('portal_db')->table('wb_disposal_applications as t1')
                ->leftJoin('wb_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    'q.status_type_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $premise_id = $results->premise_id;

            $qry3 = DB::table('tra_premises as t3')
                ->select('t3.*')
                ->where(array('id' => $premise_id));
            $premisesDetails = $qry3->first();
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');

            $res = array(
                'success' => true,
                'results' => $results,
                'premisesDetails' => $premisesDetails,
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

    public function prepareImportExportInspectionSearchdetails(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $premise_id = $results->premise_id;
            $sender_receiver_id = $results->sender_receiver_id;
            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            $qry3 = DB::table('tra_premises as t3')
                ->select('t3.*')
                ->where(array('id' => $premise_id));
            $premisesDetails = $qry3->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
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
    public function prepareImportExporPermitReceivingStage(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->leftJoin('tra_approval_recommendations as t4', 't1.application_code', 't4.application_code')
                ->leftJoin('tra_prechecking_recommendations as t5', 't1.application_code', 't5.application_code')
                ->leftJoin('tra_managerpermits_review as t6', 't1.application_code', 't6.application_code')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')

                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't4.decision_id as approval_recommendation_id',
                    't5.recommendation_id as prechecking_recommendation_id',
                    't6.decision_id as review_recommendation_id',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $results->importexport_product_range_id=json_decode($results->importexport_product_range_id);
            $premise_id = $results->premise_id;
            $manufacturing_site_id = $results->manufacturing_site_id;
            $has_registered_premises = $results->has_registered_premises;
            $business_type_id = $results->business_type_id;
            $contact_person_id = $results->contact_person_id;
            $consignee_id = $results->consignee_id;


            if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $results->manufacturing_site_name=$manufacturing_site_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $results->premises_name=$premises_name;
                 }
            }
            $sender_receiver_id = $results->sender_receiver_id;
            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.id as applicant_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            // $qry3 = DB::table('tra_premises as t3')
            //     ->select('t3.*')
            //     ->where(array('id' => $premise_id));
            // $premisesDetails = $qry3->first();
            if (validateIsNumeric($consignee_id)) {
                $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                $results->consignee_name = $consignee_name;
            }

           if (validateIsNumeric($contact_person_id)) {
                $billing_person = getSingleRecordColValue('tra_personnel_information', array('id' => $contact_person_id), 'name');

            $results->billing_person = $billing_person;
            }
            $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);

            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
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

     public function getPremiseDetails($has_registered_premises,$business_type_id,$premise_id){

        if($has_registered_premises==1 || $has_registered_premises===1){
                if($business_type_id==5 || $business_type_id===5){
                     $qry = DB::table('tra_manufacturing_sites as t1')
                             ->leftJoin('tra_pharmacist_personnel as t6aa', 't1.psu_no', '=', 't6aa.psu_no')
                             ->select('t1.id as premise_id','t1.name as manufacturing_site_name','t1.psu_no','t6aa.name as supervising_name','t6aa.psu_date as supervising_registration_date','t6aa.telephone as supervising_telephone_no','t6aa.telephone2 as supervising_telephone_no2','t6aa.telephone3 as supervising_telephone_no3','t6aa.email as supervising_email_address','t6aa.email2 as supervising_email_address2','t6aa.email3 as supervising_email_address3','t6aa.qualification_id as supervising_qualification_id','t6aa.country_id as supervising_country_id','t6aa.region_id as supervising_region_id','t6aa.district_id as supervising_district_id','t6aa.physical_address as supervising_physical_address')
                             ->where('t1.id', $premise_id);
                     
                 }else{
                     $qry = DB::table('tra_premises as t1')
                              ->leftJoin('tra_pharmacist_personnel as t6aa', 't1.psu_no', '=', 't6aa.psu_no')
                             ->select('t1.id as premise_id','t1.name as premises_name','t1.psu_no','t6aa.name as supervising_name','t6aa.psu_date as supervising_registration_date','t6aa.telephone as supervising_telephone_no','t6aa.telephone2 as supervising_telephone_no2','t6aa.telephone3 as supervising_telephone_no3','t6aa.email as supervising_email_address','t6aa.email2 as supervising_email_address2','t6aa.email3 as supervising_email_address3','t6aa.qualification_id as supervising_qualification_id','t6aa.country_id as supervising_country_id','t6aa.region_id as supervising_region_id','t6aa.district_id as supervising_district_id','t6aa.physical_address as supervising_physical_address')
                             ->where('t1.id', $premise_id);
                 }
          }else{
             $qry = DB::table('tra_non_license_business_details as t1')  
                   ->select('t1.id as premise_id','t1.company_registration_no as premise_company_registration_no','t1.email as premise_email','t1.physical_address as premise_physical_address','t1.name as premise_name','t1.tpin_no as premise_tpin_no')     
                   ->where('t1.id', $premise_id);

          }
          $premisesDetails = $qry->first();
          return  $premisesDetails;

    }
    public function prepareReceivingpoeinspectionswizard(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->leftJoin('tra_poe_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't2.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't2.*',
                    't2.id as poe_application_id',
                    't2.port_id as poeport_id',
                    't1.custom_declaration_no',
                    't1.port_id'
                );

            $results = $qry1->first();
            $premise_id = $results->premise_id;
            $sender_receiver_id = $results->sender_receiver_id;
            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            $qry3 = DB::table('tra_premises as t3')
                ->select('t3.*')
                ->where(array('id' => $premise_id));
            $premisesDetails = $qry3->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
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

    public function prepareNarcoticsPermitReceivingStage(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $results->importexport_product_range_id=json_decode($results->importexport_product_range_id);
            $premise_id = $results->premise_id;
            $manufacturing_site_id = $results->manufacturing_site_id;
            $has_registered_premises = $results->has_registered_premises;
            $business_type_id = $results->business_type_id;

            if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $results->manufacturing_site_name=$manufacturing_site_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $results->premises_name=$premises_name;
                 }
            }
            $sender_receiver_id = $results->sender_receiver_id;
            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.id as applicant_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            // $qry3 = DB::table('tra_premises as t3')
            //     ->select('t3.*')
            //     ->where(array('id' => $premise_id));
            // $premisesDetails = $qry3->first();
            $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);

            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
                'message' => 'All is well'
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    public function prepareDisposalPermitReceivingStage(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_disposal_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $premise_id = $results->premise_id;

            $qry3 = DB::table('tra_premises as t3')
                ->select('t3.*')
                ->where(array('id' => $premise_id));
            $premisesDetails = $qry3->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'premisesDetails' => $premisesDetails,
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
    public function getInspectedPermitsProducts(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $poe_application_id = $req->poe_application_id;
            $data = array();
            //get the records 
            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('tra_product_applications as t3', 't1.product_id', '=', 't3.product_id')
                ->leftJoin('tra_managerpermits_review as t4', 't3.permit_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_weights_units as t6', 't1.weights_units_id', '=', 't6.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')

                ->leftJoin('par_product_categories as t8', 't1.product_category_id', '=', 't8.id')

                ->leftJoin('par_device_types as t9', 't1.device_type_id', '=', 't9.id')
                ->leftJoin('tra_trader_regulatedproducts as t10', 't1.regulated_prodpermit_id', '=', 't10.id')
                ->leftJoin('tra_product_information as t11', 't1.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id')
                ->leftJoin('tra_poe_permitsdata as t13', function ($join) use ($poe_application_id) {
                    $join->on('t1.id', '=', 't13.permits_product_id');
                })
                ->select(DB::raw("DISTINCT  t1.product_id, t1.id as permits_product_id, t1.quantity as permit_quantity,t2.section_id, t4.certificate_no,regulated_prodpermit_id,authorised_permit_no, t7.name as packaging_units,t6.name as weight_units,concat(t11.brand_name,t12.name) as brand_name,t13.remarks, t5.name as currency_name,t13.batch_numbers, t8.name as product_category,t9.name as device_type, (unit_price*quantity) as  total_value, (t1.quantity - COALESCE((SELECT SUM(q.poe_prod_quantity) FROM tra_poe_permitsdata q inner join tra_poe_applications k on q.poe_application_id = k.id WHERE q.permits_product_id = t1.id),0)) as balance, sum(poe_prod_quantity) as poe_prod_quantity,poe_application_id,t13.id"))
                ->where(array('t1.application_code' => $application_code))
                ->groupBy('t1.id')
                ->get();
            $res = array('success' => true, 'results' => $records);
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
    public function getPoePreviousPermitsInspection()
    {
    }

    public function getPoeInspectionPermitsProductsArchive(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $poe_application_id = $req->poe_application_id;
            $data = array();
            //get the records 
            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('tra_product_applications as t3', 't1.product_id', '=', 't3.product_id')
                ->leftJoin('tra_managerpermits_review as t4', 't3.permit_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_weights_units as t6', 't1.weights_units_id', '=', 't6.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')

                ->leftJoin('par_product_categories as t8', 't1.product_category_id', '=', 't8.id')

                ->leftJoin('par_device_types as t9', 't1.device_type_id', '=', 't9.id')
                ->leftJoin('tra_trader_regulatedproducts as t10', 't1.regulated_prodpermit_id', '=', 't10.id')
                ->leftJoin('tra_product_information as t11', 't1.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id')
                ->leftJoin('tra_poe_permitsdata as t13', function ($join) use ($poe_application_id) {
                    $join->where('t13.poe_application_id', $poe_application_id)
                        ->on('t1.id', '=', 't13.permits_product_id');
                })
                ->select(DB::raw("DISTINCT  t1.product_id, t1.id as permits_product_id, t1.quantity as permit_quantity,t2.section_id, t4.certificate_no,regulated_prodpermit_id,authorised_permit_no, t7.name as packaging_units,t6.name as weight_units,CONCAT(t11.brand_name,' ',COALESCE(t12.name,'')) as brand_name, t13.remarks, t5.name as currency_name,t13.batch_numbers, t8.name as product_category,t9.name as device_type, (unit_price*quantity) as  total_value, (t1.quantity - COALESCE((SELECT SUM(q.poe_prod_quantity) FROM tra_poe_permitsdata q inner join tra_poe_applications k on q.poe_application_id = k.id WHERE q.permits_product_id = t1.id),0)) as balance, poe_prod_quantity,poe_application_id,t13.id"))
                ->where(array('t1.application_code' => $application_code))
                ->groupBy('t1.id')
                ->get();
            $res = array('success' => true, 'results' => $records);
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
    public function getPoeInspectionPermitsProducts(Request $req)
    {



        try {
            $application_code = $req->application_code;
            $poe_application_id = $req->poe_application_id;
            $data = array();
            //get the records 

            //


            //   ->leftJoin('tra_approval_recommendations as t4', 't3.application_code','=','t4.application_code')
            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('tra_product_applications as t3', 't1.product_id', '=', 't3.product_id')
                ->leftJoin('tra_registered_products as t4', 't3.reg_product_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_weights_units as t6', 't1.weights_units_id', '=', 't6.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')
                ->leftJoin('par_product_categories as t8', 't1.product_category_id', '=', 't8.id')
                ->leftJoin('par_device_types as t9', 't1.device_type_id', '=', 't9.id')
                ->leftJoin('tra_trader_regulatedproducts as t10', 't1.regulated_prodpermit_id', '=', 't10.id')
                ->leftJoin('tra_product_information as t11', 't1.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id')
                ->leftJoin('par_countries as t14', 't1.country_oforigin_id', '=', 't14.id')
                ->leftJoin('tra_application_uploadeddocuments as t13', 't1.document_upload_id', 't13.id')
                ->leftJoin('tra_manufacturers_information as t15', 't1.manufacturer_id', 't15.id')
                ->leftJoin('par_prodinspection_recommendations as t16', 't1.prodinspection_recommendation_id', 't16.id')
                ->select(DB::raw("t1.*,t1.id as permits_product_id ,t1.prodinspection_recommendation_remarks as remarks ,t14.name as country_oforigin,t16.id as prodinspection_recommendation, t1.id as permit_prod_id, t13.node_ref, t1.document_upload_id as uploadeddocuments_id,t1.application_code,  t2.section_id,if(t11.brand_name IS NULL, t1.permitbrand_name, t11.brand_name) AS brand_name,if(t12.name is null, t1.permitcommon_name, t12.name) as common_name,  t4.registration_no as certificate_no,regulated_prodpermit_id,authorised_permit_no, t7.name as packaging_units,t6.name as weight_units, t5.name as currency_name,if(t1.manufacturer_name is null,t15.name,t1.manufacturer_name ) as manufacturer_name , t8.name as product_category,t9.name as device_type, (unit_price*quantity) as  total_value"))
                ->where(array('t1.application_code' => $application_code));
            $records = $records->get();


            $res = array('success' => true, 'results' => $records);
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

    public function getImportexportpermitsproductsDetails(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $data = array();
           
            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->select(DB::raw("t1.*,t2.sub_module_id, t2.vc_application_type_id, t2.section_id, '' as certificate_no,t2.licence_type_id as license_type_id,t2.importation_reason_id as import_reason_id,t2.product_category_id,t2.business_type_id as premise_type_id,t2.is_registered"))
                ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getProductsPermitDetails($records);

            $res = array('success' => true, 'results' => $data);

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



    public function getOnlineImportexportpermitsproductsDetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_permits_products as t1')
                ->join('wb_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->select(DB::raw("t1.*,t2.sub_module_id, t2.vc_application_type_id, t2.section_id, '' as certificate_no,t2.licence_type_id as license_type_id,t2.importation_reason_id as import_reason_id,t2.product_category_id,t2.business_type_id as premise_type_id,t2.is_registered"))
                ->where(array('t1.application_code' => $application_code))
                ->get();

            $data = $this->getProductsPermitDetails($records);
            $res = array('success' => true, 'results' => $data);
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
    //
    public function getDisposalpermitsproductsDetails(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::table('tra_disposal_products as t1')
                ->leftJoin('tra_disposal_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('tra_product_applications as t3', 't1.product_id', '=', 't3.product_id')
                ->select('t1.*', 't2.section_id')
                ->where(array('t1.application_code' => $application_code))
                ->get();
            //  $data = $this->getDisposalProductsPermitDetails($records);
            $res = array('success' => true, 'results' => $records);
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
    public function getOnlineDisposalpermitsproductsDetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_disposal_products as t1')
                ->join('wb_disposal_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->join('par_packaging_units as t3', 't1.packaging_unit_id', '=', 't3.id')
                ->select(DB::raw("t1.*, t2.section_id,t3.name as packaging_units, '' as certificate_no"))
                ->where(array('t1.application_code' => $application_code))
                ->get();
            $data = $this->getDisposalProductsPermitDetails($records);
            $res = array('success' => true, 'results' => $data);
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
    public function getDisposalInspectors(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::table('tra_disposal_inspectors as t1')
                ->join('par_disposal_inspectors_titles as t2', 't1.inspectors_title_id', '=', 't2.id')
                ->select(DB::raw("t1.*, t2.name as title"))
                ->where(array('t1.application_code' => $application_code))
                ->get();
            $res = array('success' => true, 'results' => $records);
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
    public function deleteDisposalInspectors(Request $req)
    {
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
    public function getDisposalProductsPermitDetails($records)
    {
        $data = array();

        $currencyData = getParameterItems('par_currencies', '');
        $weightsData = getParameterItems('par_weights_units', '');

        $packagingData = getParameterItems('par_packaging_units', '');


        foreach ($records as $rec) {

            $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name');

            $data[] = array(
                'application_code' => $rec->application_code,

                'product_id' => $rec->product_id,
                'quantity' => $rec->quantity,
                'currency_id' => $rec->currency_id,
                'packaging_unit_id' => $rec->packaging_unit_id,

                'brand_name' => $brand_name,
                'section_id' => $rec->section_id,
                'id' => $rec->id,
                'packaging_units' => returnParamFromArray($packagingData, $rec->packaging_unit_id),
                'currency_name' => returnParamFromArray($currencyData, $rec->currency_id),

            );
        }
        return $data;
    }
    public function getImportExportAppsdetails($req, $where_submodule)
    {
        $module_id = $req->input('module_id');
        $section_id = $req->input('section_id');
        $sub_module_id = $req->input('sub_module_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);

        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);


            $qry = DB::table('tra_importexport_applications as t1')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftjoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t7.date_received,t7.isDone, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t1.proforma_invoice_no,t1.proforma_invoice_date,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                     t1.*,t7.current_stage as workflow_stage_id")) //job t7.current_stage as workflow_stage_id due to bug on 0 process id on tra_import to fix later after demo
                ->whereNotIn('t1.is_dismissed', [1]);

            //users to causes no resulsts




            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);


            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            $qry->whereIn('t1.sub_module_id', $where_submodule);
            $qry->where('t7.isDone', 0);
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
        return $res;
    }

    public function getImportexportpermitsapps(Request $req)
    {
        // $where_submodule = array(12, 13, 14, 15, 16);
        $where_submodule = array(12, 13, 14, 15, 16, 78, 82, 81);
        $res = $this->getImportExportAppsdetails($req, $where_submodule);
        return \response()->json($res);
    }
    public function getHospitalPermitsNarcoticsApps(Request $req)
    {
        $where_submodule = array(61);
        $res = $this->getImportExportAppsdetails($req, $where_submodule);
        return \response()->json($res);
    }
    public function getNarcoticImportPermitsApps(Request $req)
    {
        $where_submodule = array(60);
        $res = $this->getImportExportAppsdetails($req, $where_submodule);
        return \response()->json($res);
    }
    public function getDisposalApplications(Request $req)
    {
        $module_id = $req->input('module_id');
        $section_id = $req->input('section_id');
        $sub_module_id = $req->input('sub_module_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);

        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);

            $qry = DB::table('tra_disposal_applications as t1')
                ->leftJoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftjoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                     t1.*"))
                ->whereNotIn('t1.is_dismissed', [1]);

            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);


            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
                //$qry->where("t7.id", "116304");
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
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
    public function getManagerEvaluationApplications(Request $request)
    {

        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');

        $section_id = $request->input('section_id');
        try {

            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', function ($join) {
                    $join->on('t1.application_code', '=', 't9.application_code');
                })
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->select(
                    't1.*',
                    't10.username as submitted_by',
                    't9.date_received as submitted_on',
                    't2.name as premises_name',
                    't3.name as applicant_name',
                    't4.name as application_status',
                    't6.name as approval_status',
                    't5.decision_id',
                    't1.id as active_application_id'
                )
                ->where(array('t9.current_stage' => $workflow_stage, 'isDone' => 0));
            //'t1.process_id'=>$process_id,
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
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
    public function getDisposalPermitApprovalApplications(Request $request)
    {

        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_inspection_recommendations as t11', function ($join) {
                    $join->on('t1.id', '=', 't11.application_id')
                        ->on('t1.application_code', '=', 't11.application_code');
                })
                ->leftJoin('par_disposal_verrecomendations as t12', 't1.disposal_verrecomendation_id', '=', 't12.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', function ($join) {
                    $join->on('t1.workflow_stage_id', '=', 't9.current_stage')
                        ->on('t1.application_code', '=', 't9.application_code');
                })
                ->join('users as t10', 't9.usr_from', '=', 't10.id')
                ->select(
                    't1.*',
                    't12.name as disposal_verificationrecommendation',
                    't5.decision_id as recommendation_id',
                    't10.username as submitted_by',
                    't9.date_received as submitted_on',
                    't2.name as premises_name',
                    't3.name as applicant_name',
                    't4.name as application_status',
                    't6.name as approval_status',
                    't5.decision_id',
                    't1.id as active_application_id'
                )
                ->where('t1.workflow_stage_id', $workflow_stage);

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


    public function onSaveImportPermitPremisesData(Request $req)
    {
        $application_code = $req->input('application_code');
        $premise_id = $req->input('premise_id');
        $applications_table = 'tra_importexport_applications';
        $app_data = array('premise_id' => $premise_id);
        $res =  $this->savepermitOtherDetails($app_data, $applications_table, $application_code);
        return \response()->json($res);
    }
    public function onSaveImportPermitSenderReceiverData(Request $req)
    {

        $application_code = $req->input('application_code');
        $sender_receiver_id = $req->input('sender_receiver_id');
        $applications_table = 'tra_importexport_applications';
        $app_data = array('sender_receiver_id' => $sender_receiver_id);
        $res = $this->savepermitOtherDetails($app_data, $applications_table, $application_code);
        return \response()->json($res);
    }
    public function getControlledImpproductsDetails(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $data = array();

            $records = DB::table('tra_permits_products as t1')
                ->leftJoin('tra_product_information as t3', 't1.product_id', '=', 't3.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_packaging_units as t7', 't1.drugspackaging_type_id', '=', 't7.id')
                ->leftJoin('par_prodclass_categories as t9', 't3.prodclass_category_id', '=', 't9.id')
                ->leftJoin('par_sections as t10', 't1.section_id', '=', 't10.id')
                ->leftJoin('par_common_names as t12', 't1.common_name_id', '=', 't12.id')
                ->leftJoin('par_controlleddrugs_types as t13', 't1.controlleddrugs_type_id', '=', 't13.id')
                ->leftJoin('par_controlled_drugssubstances as t14', 't1.controlled_drugssubstances_id', '=', 't14.id')
                ->leftJoin('par_controlleddrugs_basesalts as t15', 't1.controlleddrugs_basesalt_id', '=', 't15.id')
                ->leftJoin('par_dosage_forms as t16', 't1.dosage_form_id', '=', 't16.id')
                ->select(DB::raw("t1.*, t1.id as permit_prod_id, t1.permitbrand_name,t10.name as section_name, t12.name as common_name,  t1.product_registration_no as certificate_no,concat(t1.pack_unit,' ml ', t7.name) as packaging_units ,concat(t1.pack_unit,' ml ', t7.name) as pack_unitdetails,t13.name as controlleddrugs_type, t5.name as currency_name,t9.name as product_classcategory,t14.name as controlled_drugssubstances, (unit_price*quantity) as  total_value, t15.name as controlleddrugs_basesalt,t16.name as dosage_form"))
                ->where(array('t1.application_code' => $application_code))
                ->groupBy('t1.id');
            $records = $records->get();

            $res = array('success' => true, 'results' => $records);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }



    public function getControlledProductsPermitDetails($records)
    {
        $data = array();

        $currencyData = getParameterItems('par_currencies', '');

        $packagingData = getParameterItems('par_packaging_units', '', '');
        $controlDrugsTypesData = getParameterItems('par_controlleddrugs_types', '');
        $controlDrugsSubstanceData = getParameterItems('par_controlled_drugssubstances', '');
        $controlDrugsSaltData = getParameterItems('par_controlleddrugs_basesalts', '');
        $dosageFormData = getParameterItems('par_dosage_forms', '');



        foreach ($records as $rec) {
            $packaging_type = returnParamFromArray($packagingData, $rec->drugspackaging_type_id);

            $data[] = array(
                'application_code' => $rec->application_code,
                'product_id' => $rec->product_id,
                'quantity' => $rec->quantity,
                'drugspackaging_type_id' => $rec->drugspackaging_type_id,
                'pack_unit' => $rec->pack_unit,
                'controlleddrug_base' => $rec->controlleddrug_base,
                'strength_asgrams' => $rec->strength_asgrams,
                'drugs_content' => $rec->drugs_content,
                'gramsbasesiunit_id' => $rec->gramsbasesiunit_id,
                'controlleddrugs_basesalt_id' => $rec->controlleddrugs_basesalt_id,
                'controlleddrugs_type_id' => $rec->controlleddrugs_type_id,
                'controlled_drugssubstances_id' => $rec->controlled_drugssubstances_id,
                'is_registered_product' => $rec->is_registered_product,
                'purpose_of_drugsuse' => $rec->purpose_of_drugsuse,
                'country_oforigin_id' => $rec->country_oforigin_id,
                'product_registration_no' => $rec->product_registration_no,
                'pack_size' => $rec->pack_size,
                'pack_unit_id' => $rec->pack_unit_id,
                'conversion_unit' => $rec->conversion_unit,
                'unitpack_size' => $rec->unitpack_size,
                'unitpack_unit_id' => $rec->unitpack_unit_id,
                'product_strength' => $rec->product_strength,

                'dosage_form_id' => $rec->dosage_form_id,
                'product_packaging' => $rec->product_packaging,

                'brand_name' => $rec->permitbrand_name,
                'permitbrand_name' => $rec->permitbrand_name,
                'id' => $rec->id,
                'packaging_units' => $rec->pack_unit . ' ml ' . $packaging_type,
                'controlleddrugs_type' => returnParamFromArray($controlDrugsTypesData, $rec->controlleddrugs_type_id), 'controlled_drugssubstances' => returnParamFromArray($controlDrugsSubstanceData, $rec->controlled_drugssubstances_id),
                'controlleddrugs_basesalt' => returnParamFromArray($controlDrugsSaltData, $rec->controlleddrugs_basesalt_id), 'dosage_form' => returnParamFromArray($dosageFormData, $rec->dosage_form_id),
                'pack_unitdetails' => $rec->pack_unit . ' ml ' . $packaging_type,
                'unit_price' => $rec->unit_price,
                'total_value' => ($rec->unit_price * $rec->quantity),
            );
        }
        return $data;
    }
  

    public function funcDrugsContentsCalculations(Request $req)
    {

        try {
            $table_name =  $req->table_name;
            $controlleddrugs_type_id =  $req->controlleddrugs_type_id;
            $controlled_drugssubstances_id =  $req->controlled_drugssubstances_id;
            $controlleddrugs_basesalt_id =  $req->controlleddrugs_basesalt_id;
            $record = DB::table($table_name)
                ->where(array('controlleddrugs_type_id' => $controlleddrugs_type_id, 'controlled_drugssubstances_id' => $controlled_drugssubstances_id));
            if (validateIsNumeric($controlleddrugs_basesalt_id)) {
                $record->where(array('controlleddrugs_basesalt_id' => $controlleddrugs_basesalt_id));
            }
            $record = $record->first();
            if ($record) {

                //$res = $record;
                $res = array('success' => false, 'message' => 'Pure Anhydrous Drug contents ' . $record->appr_pureanhydrousdrug_contents, 'appr_pureanhydrousdrug_contents' => $record->appr_pureanhydrousdrug_contents);
            } else {
                $res = array('success' => false, 'appr_pureanhydrousdrug_contents' => 0);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;
    }


    static function getQuantityCategoryIds()
    {
        $quantity_category_obj = DB::table('par_containers')
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
    function getproductPackagingInformation($pack_size_id)
    {

            //
            $data = array();
            //get the records
            $data = DB::table('tra_product_packaging as t1')
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
                ->where(array('t1.id' => $pack_size_id))
                ->get();

             foreach ($data as $record) {
                    $packSize = '';
                    $packSizediluent = '';
                    $no_of_units_packs="";
                    $pack_id = $record->id;
                    $product_id = $record->product_id;
                    $is_quantity_category = $this->belongsToQuantityCategory($record->container_id);

                    // Calculate pack size
                    if ($is_quantity_category) {
                        $packSize = "{$record->no_of_packs}{$record->si_unit} {$record->container_name}";
                        $no_of_units_packs = $record->no_of_units;

                    } else {
                        $packSize = "{$record->no_of_units} {$record->container_name}";
                         $no_of_units_packs = $record->secondary_no_of_units*$record->no_of_units*$record->no_of_packs;

                    }

                    // Add secondary, tertiary, and shipper units if they exist
                    if ($record->secondary_no_of_units) {
                        $is_quantity_category = $this->belongsToQuantityCategory($record->secondary_container_id);
                            // Calculate pack size
                            if ($is_quantity_category) {
                                 $packSize = "{$record->secondary_no_of_packs}x" . $packSize;
                            } else {
                                 $packSize = "{$record->secondary_no_of_units}x" . $packSize;
                            }
                           // $packSize = "{$record->secondary_no_of_units}*" . $packSize;
                       
                    }
                    if ($record->tertiary_no_of_units) {
                         $is_quantity_category = $this->belongsToQuantityCategory($record->tertiary_container_id);
                            // Calculate pack size
                            if ($is_quantity_category) {
                                 $packSize = "{$record->tertiary_no_of_packs}x" . $packSize;
                            } else {
                                 $packSize = "{$record->tertiary_no_of_units}x" . $packSize;
                            }
                        //$packSize = "{$record->tertiary_no_of_units}*" . $packSize;
                    }
                    if ($record->shipper_no_of_units) {
                        $is_quantity_category = $this->belongsToQuantityCategory($record->shipper_container_id);
                            // Calculate pack size
                            if ($is_quantity_category) {
                                 $packSize = "{$record->shipper_no_of_packs}x" . $packSize;
                            } else {
                                 $packSize = "{$record->shipper_no_of_units}x" . $packSize;
                             }
                            
                        //$packSize = "{$record->shipper_no_of_units}*" . $packSize;
                    }
                    if ($record->other_no_of_units) {
                        $is_quantity_category = $this->belongsToQuantityCategory($record->other_container_id);
                         // Calculate pack size
                         if ($is_quantity_category) {
                                 $packSize = "{$record->other_no_of_packs}x" . $packSize;
                        } else {
                             $packSize = "{$record->other_no_of_units}x" . $packSize;
                         }
                             
                       // $packSize = "{$record->other_no_of_units}*" . $packSize;
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
                                $packSizediluent = "{$diluent_record->secondary_no_of_units}x{$diluent_record->no_of_packs}{$diluent_record->si_unit} {$diluent_record->container_name} {$diluent_record->diluent}";
                            } else {
                                $packSizediluent = "{$diluent_record->secondary_no_of_units}x{$diluent_record->no_of_units} {$diluent_record->container_name} {$diluent_record->diluent}";
                            }
                                $packSize .= ' + ' . $packSizediluent;
                            }

                    // Assign the calculated pack size to the record
                    $record->pack_size = $packSize;
                    $record->no_of_units_packs = $no_of_units_packs;
                }


        return $data;

            

    } 

    function savepermitOtherDetails($app_data, $applications_table, $application_code)
    {

        try {
            $user_id = $this->user_id;

            if (validateIsNumeric($application_code)) {


                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();

                $where_app = array('application_code' => $application_code);
                if (recordExists($applications_table, $where_app)) {

                    $prev_data = getPreviousRecords($applications_table, $where_app);
                    $previous_data = $prev_data['results'];
                    $res =  updateRecord($applications_table, $previous_data, $where_app, $app_data, $user_id);
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Application Details Not Found'
                );
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

    public function getPermitsApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        try {


            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $permit_details = $qry1->first();
            $premise_id = $permit_details->premise_id;
            $sender_receiver_id = $permit_details->sender_receiver_id;
            $permit_details->importexport_product_range_id=json_decode($permit_details->importexport_product_range_id);
            $premise_id = $permit_details->premise_id;
            $manufacturing_site_id = $permit_details->manufacturing_site_id;
            $has_registered_premises = $permit_details->has_registered_premises;
            $business_type_id = $permit_details->business_type_id;
            $consignee_id = $permit_details->consignee_id;
            $contact_person_id = $permit_details->contact_person_id;
             if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $permit_details->manufacturing_site_name=$manufacturing_site_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $permit_details->premises_name=$premises_name;
                 }
            }

             
            if (validateIsNumeric($consignee_id)) {
                $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                $permit_details->consignee_name = $consignee_name;
            }
            if (validateIsNumeric($contact_person_id)) {
                $billing_person = getSingleRecordColValue('tra_personnel_information', array('id' => $contact_person_id), 'name');

                $permit_details->billing_person = $billing_person;
            }

            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);

            $res = array(
                'success' => true,
                'permit_details' => $permit_details,
                'senderReceiverDetails' => $senderReceiverDetails,
                'premisesDetails' => $premisesDetails,
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
    public function getDisposalPermitsApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $applicant_id = $request->input('applicant_id');
        try {

            $main_qry = DB::table('tra_disposal_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.application_code', $application_code);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $permit_details = $qry1->first();
            $premise_id = $permit_details->premise_id;
            $destruction_exercise_sitesdata = DB::table('tra_destruction_exercisesites')
                ->select('destruction_site_id')
                ->where(array('application_code' => $application_code))
                ->get();

            $destruction_exercise_sitesdata = convertStdClassObjToArray($destruction_exercise_sitesdata);
            $destruction_exercise_sitesdata = convertAssArrayToSimpleArray($destruction_exercise_sitesdata, 'destruction_site_id');
            $permit_details->destruction_exercise_sites = $destruction_exercise_sitesdata;

            $methodsof_destructionsdata = DB::table('tra_methodsof_destructions')
                ->select('destructionmethod_id')
                ->where(array('application_code' => $application_code))
                ->get();
            $methodsof_destructionsdata = convertStdClassObjToArray($methodsof_destructionsdata);
            $methodsof_destructionsdata = convertAssArrayToSimpleArray($methodsof_destructionsdata, 'destructionmethod_id');
            $permit_details->methodsof_destructions = $methodsof_destructionsdata;

            $qry3 = DB::table('tra_premises as t3')
                ->select('t3.*')
                ->where(array('id' => $premise_id));
            $premisesDetails = $qry3->first();

            $res = array(
                'success' => true,
                'permit_details' => $permit_details,
                'results' => $permit_details,
                'premisesDetails' => $premisesDetails,
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

    public function onSavePermitinformation(Request $req)
    {
        try {
            try {
                $resp = "";
                $user_id = $this->user_id;
                $data = $req->all();

                $table_name = 'tra_importexport_applications';
                $record_id = $req->id;
                unset($data['table_name']);
                unset($data['model']);
                unset($data['consignee_name']);

                if (validateIsNumeric($record_id)) {
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);

                        $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);
                    }
                }
                if ($resp['success']) {
                    $res = array(
                        'success' => true,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => $resp['message']
                    );
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
    public function getregulatedProductsPermitData(Request $req)
    {
        try {
            $trader_id = $req->trader_id;

            $records = DB::table('tra_trader_regulatedproducts as t1')
                ->join('par_regulated_products  as t2', 't1.regulated_product_id', '=', 't2.id')
                ->select('t2.bramd_name', 't1.authorised_permit_no', 't1.id as trader_regulatedproduct_id')
                ->where(array('trader_id' => $mistrader_id))
                ->get();
            $res = array(
                'success' => false,
                'results' => $records
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

    public function saveControlDrugsReceivingBaseDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $applicant_id = $request->input('applicant_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $zone_id = $request->input('zone_id');
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');

           // $narcoticsdrug_type_id = $request->input('narcoticsdrug_type_id');

            $user_id = $this->user_id;


            $app_data = array(
                "process_id" => $request->input('process_id'),
                "workflow_stage_id" => $request->input('workflow_stage_id'),
                "applicant_id" => $request->input('applicant_id'),
                "sub_module_id" => $request->input('sub_module_id'),
                "module_id" => $request->input('module_id'),
                "section_id" => $request->input('section_id'),
                "sender_receiver_id" => $request->input('sender_receiver_id'),
                "premise_id" => $request->input('premise_id'),
                "has_registered_premises" => $request->input('has_registered_premises'),
                "business_type_id" => $request->input('business_type_id'),
                "licence_type_id" => $request->input('licence_type_id'),
                "product_classification_id" => $request->input('product_classification_id'),
                "importexport_product_range_id" => $request->input('importexport_product_range_id'),
                "zone_id" => $request->input('zone_id'),
            );

            $applications_table = 'tra_importexport_applications';

            if (validateIsNumeric($active_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $active_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }

                $application_code = $app_details[0]['application_code']; //$app_details->application_code;
                $ref_number = $app_details[0]['reference_no']; //$app_details->reference_no;

                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['ref_no'] = $ref_number;
            } else {


                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');

                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
               // $narcoticsdrug_typecode = getSingleRecordColValue('par_narcoticsdrug_types', array('id' => $narcoticsdrug_type_id), 'code');

                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
//narcoticsdrug_typecode' => $narcoticsdrug_typecode
                );

                $application_code = generateApplicationCode($sub_module_id, $applications_table);

                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);


                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);

                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];
                $reference_no = $tracking_details['tracking_no'];
                $reference_no = str_replace("TRC", 'TMDA', $reference_no);


                $view_id = generateApplicationViewID();
                //  'view_id'=>$view_id,
                $app_data['view_id'] = $view_id;

                $app_data['tracking_no'] = $tracking_no;
                $app_data['reference_no'] = $reference_no;
                $app_data['application_code'] = $application_code;
                $app_data['created_by'] = \Auth::user()->id;
                $app_data['created_on'] = Carbon::now();
                $app_data['date_added'] = Carbon::now();
                $app_data['submission_date'] = Carbon::now();


                $res = insertRecord($applications_table, $app_data, $user_id);

                $active_application_id = $res['record_id'];

                //add to submissions table
                $submission_params = array(
                    'application_id' => $active_application_id,
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
                    'applicant_id' => $applicant_id,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );

                $res = insertRecord('tra_submissions', $submission_params, $user_id);
                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['tracking_no'] = $tracking_no;
                //dms function 


                if ($res['success']) {
                    //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);

                } else {
                    $res = $response;
                }
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false, 'data' => $res,
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
    public function updateonlineImportPermittReceivingBaseDetails(Request $request)
    {

        try {
            $application_code = $request->input('application_code');

            $import_typecategory_id = $request->input('import_typecategory_id');

            $user_id = $this->user_id;

            $app_data = array(
                "permit_category_id" => $request->input('permit_category_id'),
                "import_typecategory_id" => $request->input('import_typecategory_id'),
                "permit_reason_id" => $request->input('permit_reason_id'),
                "proforma_invoice_no" => $request->input('proforma_invoice_no'),
                "proforma_invoice_date" => $request->input('proforma_invoice_date'),
                "paying_currency_id" => $request->input('paying_currency_id'),
                "zone_id" => $request->input('zone_id'),
                "port_id" => $request->input('port_id'),
            );

            $applications_table = 'wb_importexport_applications';
            $res = array("success" => false, 'message' => 'Pemrit Details failed to update');
            if (validateIsNumeric($application_code)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('application_code' => $application_code);
                if (recordExists($applications_table, $where_app, 'portal_db')) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app, 'portal_db');
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id, 'portal_db');
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
    public function saveImportPermittReceivingBaseDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $applicant_id = $request->input('applicant_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $zone_id = $request->input('zone_id');
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');
            $user_id = $this->user_id;
            $app_data = array(
                "process_id" => $request->input('process_id'),
                "workflow_stage_id" => $request->input('workflow_stage_id'),
                "applicant_id" => $request->input('applicant_id'),
                "sub_module_id" => $request->input('sub_module_id'),
                "module_id" => $request->input('module_id'),
                "section_id" => $request->input('section_id'),
                "sender_receiver_id" => $request->input('sender_receiver_id'),
                "premise_id" => $request->input('premise_id'),
                "has_registered_premises" => $request->input('has_registered_premises'),
                "business_type_id" => $request->input('business_type_id'),
                "licence_type_id" => $request->input('licence_type_id'),
                "product_classification_id" => $request->input('product_classification_id'),
                "importexport_product_range_id" => $request->input('importexport_product_range_id'),
                 "product_category_id" => $request->input('product_category_id'),

                 "importation_reason_id" => $request->input('importation_reason_id'),
                 "vc_application_type_id" => $request->input('vc_application_type_id'),
                "is_registered" => $request->input('is_registered'),
                "proforma_invoice_no" => $request->input('proforma_invoice_no'),

                "proforma_invoice_date" => $request->input('proforma_invoice_date'),
                "importer_licence_number" => $request->input('importer_licence_number'),
                "consignee_id" => $request->input('consignee_id'),
                "entry_country_id" => $request->input('entry_country_id'),
                "mode_oftransport_id" => $request->input('mode_oftransport_id'),
                "contact_person_id" => $request->input('contact_person_id'),
                 "port_id" => $request->input('port_id'),
                "applicant_as_consignee" => $request->input('applicant_as_consignee'),
                "applicant_contact_person" => $request->input('applicant_contact_person'),
            );

            $applications_table = 'tra_importexport_applications';

            if (validateIsNumeric($active_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $active_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }

                $application_code = $app_details[0]['application_code']; //$app_details->application_code;
                $ref_number = $app_details[0]['reference_no']; //$app_details->reference_no;
                $tracking_number = $app_details[0]['tracking_no'];

                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['ref_no'] = $ref_number;
                $res['tracking_no'] = $tracking_number;
            } else {


                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');

                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                // $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code');

                if ($section_id == 1 && $sub_module_id == 15) {

                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code,
                        'apptype_code' => $apptype_code,
                        
                    );
                } else {
                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code,
                        'apptype_code' => $apptype_code
                    );
                }

                $application_code = generateApplicationCode($sub_module_id, $applications_table);

                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');

                $tracking_no = generateProductsRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $view_id = generateApplicationViewID();
                //  'view_id'=>$view_id,
                $app_data['view_id'] = $view_id;
               // $app_data['reference_no'] = $ref_number;
                $app_data['tracking_no'] = $tracking_no;
                $app_data['application_code'] = $application_code;
                $app_data['created_by'] = \Auth::user()->id;
                $app_data['created_on'] = Carbon::now();


                $res = insertRecord($applications_table, $app_data, $user_id);

                $active_application_id = $res['record_id'];

                //add to submissions table
                $submission_params = array(
                    'application_id' => $active_application_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    //'reference_no' => $tracking_no,
                    'tracking_no' => $tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => $applicant_id,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );

                insertRecord('tra_submissions', $submission_params, $user_id);
                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;

               // $res['ref_no'] = $ref_number;
                $res['tracking_no'] = $tracking_no;
                //dms function 
                $nodetracking = str_replace("/", "-", $tracking_no);

                $node_details = array(
                    'name' => $nodetracking,
                    'nodeType' => 'cm:folder'
                );

                //   initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $user_id);



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
    public function savePOEInspectionPermitDetails(Request $request)
    {
        try {

            $application_code = $request->input('active_application_code');
            $poe_application_id = $request->input('poe_application_id');
            $tra_reg_number = $request->input('tra_reg_number');
            $custom_declaration_no = $request->input('custom_declaration_no');
            $clearing_agent_id = $request->input('clearing_agent_id');
            $poeport_id = $request->input('poeport_id');
            $tansad_no = $request->input('tansad_no');
            $inspected_on = $request->input('inspected_on');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $process_id = $request->input('process_id');
            $inspection_status_id = 1;
            $user_id = $this->user_id;

            $app_data = array(
                "application_code" => $application_code,
                "custom_declaration_no" => $custom_declaration_no,
                //"tra_reg_date" => $tra_reg_date,
                "clearing_agent_id" => $clearing_agent_id,
                "port_id" => $poeport_id,
                // "tansad_no" => $tansad_no,
                "inspected_on" => $inspected_on,
                "inspected_by" => $user_id,
                'inspection_status_id' => $inspection_status_id,
                'workflow_stage_id' => $workflow_stage_id,
                'process_id' => $process_id
            );

            $applications_table = 'tra_poe_applications';

            if (validateIsNumeric($poe_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $poe_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }
            } else {

                $app_data['created_by'] = \Auth::user()->id;
                $app_data['created_on'] = Carbon::now();


                $res = insertRecord($applications_table, $app_data, $user_id);

                $poe_application_id = $res['record_id'];
            }
            if ($res['success']) {
                //update the import export permits 
                $data = array(
                    "application_status_id" => 16,
                    'dola' => Carbon::now(),
                    'altered_by' => $user_id
                );

                $where_state = array('application_code' => $application_code);

                DB::table('tra_importexport_applications')->where($where_state)->update($data);

                $res = array(
                    'success' => true,
                    'message' => 'POE Application saved successfully',
                    'poe_application_id' => $poe_application_id
                );
            } else {
                $res = array(
                    'success' => true,
                    'message' => 'Error Occurrec, POE applications were not saved'
                );
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

    public function savePOEPermitVerificationRecommendations(Request $request)
    {
        try {

            $active_application_code = $request->input('active_application_code');
            $verification_remarks = $request->input('verification_remarks');
            $permit_verificationstatus_id = $request->input('permit_verificationstatus_id');
            $verification_status = getSingleRecordColValue('par_poeinspection_verificationrecommends', array('id' => $permit_verificationstatus_id), 'name');

            $user_id = $this->user_id;

            $app_data = array(
                "verification_remarks" => $verification_remarks,
                "permit_verificationstatus_id" => $permit_verificationstatus_id,
                "permit_verified_on" => Carbon::now(),
                "permitverified_by" => $user_id,
                "application_status_id" => 16
            );

            $applications_table = 'tra_importexport_applications';

            if (validateIsNumeric($active_application_code)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('application_code' => $active_application_code);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }
            }
            if ($res['success']) {

                $res = array(
                    'success' => true,
                    'message' => 'Permit verified successfully',
                    'verification_status' => $verification_status
                );
            } else {
                $res = array(
                    'success' => true,
                    'message' => 'Error Occurred, POE applications were not saved'
                );
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



    public function savePOEPermitProductDetail12s(Request $request)
    {
        try {
            $screening_details = $request->input('screening_details');
            $screening_details = json_decode($screening_details);

            $poe_permitsdata_id = $request->input('poe_permitsdata_id');
            $permits_product_id = $request->input('permits_product_id');
            $poe_prod_quantity = $request->input('poe_prod_quantity');
            $batch_numbers = $request->input('batch_numbers');

            $inspection_status_id = 1;

            $user_id = $this->user_id;

            $app_data = array(
                "permits_product_id" => $permits_product_id,
                "batch_numbers" => $batch_numbers,
                "poe_prod_quantity" => $poe_prod_quantity
            );

            $applications_table = 'tra_poe_permitsdata';

            if (validateIsNumeric($poe_permitsdata_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $poe_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }
            } else {

                $app_data['created_by'] = \Auth::user()->id;
                $app_data['created_on'] = Carbon::now();


                $res = insertRecord($applications_table, $app_data, $user_id);

                $poe_application_id = $res['record_id'];
            }
            if ($res['success']) {
                $res = array(
                    'success' => true,
                    'message' => 'POE Application saved successfully',
                    'poe_application_id' => $poe_application_id
                );
            } else {
                $res = array(
                    'success' => true,
                    'message' => 'Error Occurrec, POE applications were not saved'
                );
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
    public function savePOEPermitProductDetails(Request $request)
    {
        $poe_application_id = $request->input('poe_application_id');
        $poe_products = $request->input('poe_products');
        $poe_products = json_decode($poe_products);
        $table_name = 'tra_poe_permitsdata';
        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($poe_products as $poe_product) {

                $poe_permitsdata_id = $poe_product->poe_permitsdata_id;
                if (validateIsNumeric($poe_permitsdata_id)) {
                    $where = array(
                        'id' => $poe_permitsdata_id
                    );
                    $update_params = array(
                        'permits_product_id' => $poe_product->permits_product_id,
                        'poe_prod_quantity' => $poe_product->poe_prod_quantity,
                        'batch_numbers' => $poe_product->batch_numbers,

                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    $insert_params[] = array(
                        'permits_product_id' => $poe_product->permits_product_id,
                        'poe_prod_quantity' => $poe_product->poe_prod_quantity,
                        'poe_application_id' => $poe_application_id,
                        'batch_numbers' => $poe_product->batch_numbers,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                }
            }
            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
                'success' => true,
                'message' => 'POE Product Details saved successfully!!'
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
    public function updateDisposalApplicationDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $applicant_id = $request->input('applicant_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $zone_id = $request->input('zone_id');
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');

            $user_id = $this->user_id;

            $app_data = array(
                "applicant_id" => $request->input('applicant_id'),

                "reason_for_disposal" => $request->input('reason_for_disposal'),
                "total_weight" => $request->input('total_weight'),
                "quantity" => $request->input('quantity'),
                "packaging_unit_id" => $request->input('packaging_unit_id'),
                "weights_units_id" => $request->input('weights_units_id'),

                "market_value" => $request->input('market_value'),

                "market_value" => $request->input('market_value'),
                "currency_id" => $request->input('currency_id'),
                "zone_id" => $request->input('zone_id')
            );

            $applications_table = 'tra_disposal_applications';

            if (validateIsNumeric($active_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $active_application_id);
                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                } else {
                    $res =  array('success' => true, 'message' => 'Application not found!!');
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
    public function saveDisposalDestructionDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $destruction_exercise_sites = json_decode($request->input('destruction_exercise_sites'), true);
            $methodsofdesctruction_data = json_decode($request->input('methodsof_destructions'), true);
            $desctruction_data = array();
            $methodsofdesctructiondta = array();
            $user_id = $this->user_id;

            $app_data = array(
                "destruction_startdate" => $request->input('destruction_startdate'),
                "destruction_enddate" => $request->input('destruction_enddate'),
                "destruction_remarks" => $request->input('destruction_remarks'),
                "disposal_verrecomendation_id" => $request->input('disposal_verrecomendation_id')
            );

            $where_app =  array('id' => $active_application_id);
            $applications_table = 'tra_disposal_applications';
            $record = DB::table($applications_table)
                ->where($where_app)
                ->first();
            if ($record) {
                $application_code = $record->application_code;


                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $app_details = getPreviousRecords($applications_table, $where_app);

                foreach ($destruction_exercise_sites as $destruction_site_id) {

                    $desctruction_data[] = array(
                        'destruction_site_id' => $destruction_site_id,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'application_code' => $application_code
                    );
                }
                DB::table('tra_destruction_exercisesites')
                    ->where(array('application_code' => $application_code))
                    ->delete();
                DB::table('tra_destruction_exercisesites')
                    ->insert($desctruction_data);
                foreach ($methodsofdesctruction_data as $destructionmethod_id) {

                    $methodsofdesctructiondta[] = array(
                        'destructionmethod_id' => $destructionmethod_id,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'application_code' => $application_code
                    );
                }
                DB::table('tra_methodsof_destructions')
                    ->where(array('application_code' => $application_code))
                    ->delete();
                DB::table('tra_methodsof_destructions')
                    ->insert($methodsofdesctructiondta);

                if ($app_details['success'] == false) {
                    return $app_details;
                }
                $app_details = $app_details['results'];

                $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
            } else {
                $res =  array('success' => true, 'message' => 'Application not found!!');
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
    function getDisposalTotalWeightRange($disposal_weightinkgs)
    {
        $disposaltotal_weightrange_id = 0;
        $record = DB::table('par_disposaltotal_weightranges')
            ->whereRaw("$disposal_weightinkgs >= min_weight AND $disposal_weightinkgs <= max_weight")
            ->first();
        if ($record) {
            $disposaltotal_weightrange_id = $record->id;
        }

        return $disposaltotal_weightrange_id;
    }
    public function saveDisposalApplicationDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $applicant_id = $request->input('applicant_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $zone_id = $request->input('zone_id');
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');

            $user_id = $this->user_id;


            $conversion_unit = getSingleRecordColValue('par_weights_units', array('id' => $request->weights_units_id), 'conversion_unit');
            $disposal_weightinkgs = $request->input('total_weight') * $conversion_unit;

            $disposaltotal_weightrange_id = $this->getDisposalTotalWeightRange($disposal_weightinkgs);

            $app_data = array(
                "process_id" => $request->input('process_id'),
                "workflow_stage_id" => $request->input('workflow_stage_id'),
                "applicant_id" => $request->input('applicant_id'),
                "sub_module_id" => $request->input('sub_module_id'),
                "module_id" => $request->input('module_id'),
                "section_id" => $request->input('section_id'),
                "disposaltotal_weightrange_id" => $disposaltotal_weightrange_id,

                "total_weight" => $request->input('total_weight'),
                "weights_units_id" => $request->input('weights_units_id'),
                "disposal_siteoption_id" => $request->input('disposal_siteoption_id'),
                "proposed_destructionsite" => $request->input('proposed_destructionsite'),
                "destructionsite_location" => $request->input('destructionsite_location'),
                "proposed_destructiondate" => $request->input('proposed_destructiondate'),
                "reason_of_destruction_id" => $request->input('reason_of_destruction_id'),
                "reason_for_disposal" => $request->input('reason_for_disposal'),
                "product_particulars_description" => $request->input('product_particulars_description'),
                "otherproposedmethod_of_disposal" => $request->input('otherproposedmethod_of_disposal'),

                "market_value" => $request->input('market_value'),
                "proposedmethod_of_disposal_id" => $request->input('proposedmethod_of_disposal_id'),

                "currency_id" => $request->input('currency_id'),
                "zone_id" => $request->input('zone_id'),

            );

            $applications_table = 'tra_disposal_applications';

            if (validateIsNumeric($active_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $active_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }

                $application_code = $app_details[0]['application_code']; //$app_details->application_code;
                $ref_number = $app_details[0]['reference_no']; //$app_details->reference_no;
                $tracking_no = $app_details[0]['tracking_no']; //$app_details->reference_no;

                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['ref_no'] = $ref_number;
                $res['tracking_no'] = $tracking_no;
            } else {


                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');

                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');

                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'apptype_code' => $apptype_code
                );

                $application_code = generateApplicationCode($sub_module_id, $applications_table);

                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');

                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];
                $view_id = generateApplicationViewID();
                //  'view_id'=>$view_id,
                $app_data['tracking_no'] = $tracking_no;
                $app_data['view_id'] = $view_id;
                $app_data['application_code'] = $application_code;
                $app_data['created_by'] = \Auth::user()->id;
                $app_data['created_on'] = Carbon::now();


                $res = insertRecord($applications_table, $app_data, $user_id);


                $active_application_id = $res['record_id'];

                //add to submissions table
                $submission_params = array(
                    'application_id' => $active_application_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'tracking_no' => $tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => $applicant_id,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );

                $subm_insert = insertRecord('tra_submissions', $submission_params, $user_id);

                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['tracking_no'] = $tracking_no;

                if ($res['success']) {

                    // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);//Job to reinstate 4.03.2024
                }
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false, 'data' => $res,
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
    public function getRegisteredNonRegisteredProddetails(Request $req)
    {
        try {
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
            $applicant_id = $req->applicant_id;
            $search_field = $req->search_field;
            $search_value = $req->search_value;

            $start = $req->start;
            $limit = $req->limit;
            /*
                if($sub_module_id == 13 || $sub_module_id == 15 || $sub_module_id == 14 || $sub_module_id == 12){
                    $qry = DB::table('tra_product_information as t2')
                                ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                                ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                                ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                                ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                                ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                                ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                                ->select('t3.product_id','t4.certificate_no','t2.brand_name as permitbrand_name', 't4.certificate_no as product_registration_no','t2.id as product_id','t2.*', 't5.name as common_name', 't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id')
                                ->where(array('t2.section_id'=>$section_id));
    
                }
                else{
                    */
            $qry = DB::table('tra_product_applications as t3')
                ->join('tra_product_information as t2', 't3.product_id', '=', 't2.id')
                ->leftJoin('tra_registered_products as t1', 't3.product_id', '=', 't1.tra_product_id')
                ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=', 't4.application_code')
                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=', 't5.id')
                ->leftJoin('par_classifications as t6', 't2.classification_id', '=', 't6.id')
                ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=', 't8.id')
                ->select('t3.product_id', 't2.product_strength', 't2.brand_name as permitbrand_name', 't4.certificate_no as product_registration_no', 't4.certificate_no', 't2.id', 't2.brand_name', 't2.*', 't3.section_id', 't5.name as common_name', 't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id')
                ->where(array('t2.section_id' => $section_id))
                ->where("t1.registration_status_id", 2); //Job


            if ($search_value != '') {

                $qry =  $qry->where($search_field, 'like', '%' . $search_value . '%');
            }
            $totalCount  = $qry->count();
            $records = $qry->skip($start * $limit)->take($limit)->get();


            $res = array(
                'success' => true,
                'results' => $records,
                'totalCount' => $totalCount
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


    public function searchProductsInformation(Request $req)
    {
        try {
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
            $applicant_id = $req->applicant_id;
            $search_field = $req->search_field;
            $search_value = $req->search_value;

            $start = $req->start;
            $limit = $req->limit;

            $qry = DB::table('tra_product_information as t2')
                ->leftJoin('tra_registered_products as t1', 't1.tra_product_id', '=', 't2.id')
                ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=', 't4.application_code')
                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=', 't5.id')
                ->leftJoin('par_classifications as t6', 't2.classification_id', '=', 't6.id')
                ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=', 't7.id')
                ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=', 't8.id')
                ->select('t3.product_id', 't4.certificate_no', 't2.brand_name', 't2.id as product_id', 't2.*', 't5.name as common_name', 't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id')
                ->where(array('t2.section_id' => $section_id))
                ->orderBy('t2.id', 'desc');

            if ($search_value != '') {

                $qry =  $qry->where($search_field, 'like', '%' . $search_value . '%');
            }
            $totalCount  = $qry->count();
            $records = $qry->skip($start * $limit)->take($limit)->get();


            $res = array(
                'success' => true,
                'results' => $records,
                'totalCount' => $totalCount
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
    public function checkPermitUniformCurrency($application_code, $currency_id)
    {
        $record = DB::table('tra_permits_products')
            ->where(array('application_code' => $application_code))
            ->whereNotIn('currency_id', [$currency_id])
            ->get();

        if (count($record) > 0) {
            $res = array(
                'success' => false,
                'message' => 'Mismatc product permits currency, confirm the previous currency and make sure currencies match'
            );
            echo json_encode($res);
            exit();
        }
    }
    //getImportsInvoicingOtherDetails
    public function prepareImportInvoicingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,t3.paying_currency_id, t1.paying_currency_id as apppaying_currency_id, t3.id as invoice_id, t3.invoice_no,t3.isLocked,
                    t1.section_id,t1.module_id"))
                ->where('t1.id', $application_id);

            $results = $qry->first();
            if (!$results->invoice_id) {

                $results->paying_currency_id = $results->apppaying_currency_id;
            }
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
    public function prepareDisposalPermitsInvoicingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,t3.paying_currency_id, t1.paying_currency_id as apppaying_currency_id, t3.id as invoice_id, t3.invoice_no,t3.isLocked,
                    t1.section_id,t1.module_id"))
                ->where('t1.id', $application_id);

            $results = $qry->first();
            if (!$results->invoice_id) {

                $results->paying_currency_id = $results->apppaying_currency_id;
            }
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

    public function prepareNewImportExportPaymentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {

            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                    t1.section_id,t1.module_id,'' as product_details"))
                ->where('t1.application_code', $application_code);
            $results = $qry->first();
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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

    public function getImportsInvoicingOtherDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');

        $table_name = $request->input('table_name');

        try {

            $qry = DB::table($table_name . ' as t1')
                ->join('tra_permits_products as t2', 't1.application_code', '=', 't2.application_code')

                ->select(DB::raw("t2.currency_id as permit_currency_id,t1.id,sum(t2.unit_price * t2.quantity) as permit_fob_value "))
                ->where('t1.id', $application_id)
                ->groupBy('t1.id');
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

    public function getDisposalInvoicingOtherDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');

        $table_name = $request->input('table_name');

        try {

            $qry = DB::table($table_name . ' as t1')
                ->select(DB::raw("t1.currency_id as permit_currency_id,t1.id,t1.market_value as permit_fob_value "))
                ->where('t1.id', $application_id)
                ->groupBy('t1.id');
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
    public function onSavePermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;

            $application_code = $req->application_code;
            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;

            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $laboratory_no = $req->laboratory_no;
            $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;
            $permitprod_recommendation_id = $req->permitprod_recommendation_id;

            $product_batch_no = $req->product_batch_no;
            $product_expiry_date = $req->product_expiry_date;
            $product_manufacturing_date = $req->product_manufacturing_date;

            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 
            $record = DB::table('tra_permits_products')
                ->where(array('application_code' => $application_code))
                ->whereNotIn('currency_id', [$currency_id])
                ->get();

            if (!count($record) > 0) {
                $table_name = 'tra_permits_products';


                $data = array(
                    'unit_price' => $unit_price,
                    'currency_id' => $currency_id,
                    'product_batch_no' => $product_batch_no,
                    'product_expiry_date' => $product_expiry_date,
                    'product_manufacturing_date' => $product_manufacturing_date,
                    'section_id' => $req->section_id,
                    'productphysical_description' => $req->productphysical_description,
                    'packaging_unit_id' => $packaging_unit_id,
                    'quantity' => $quantity,
                    'permitbrand_name' => $req->permitbrand_name,
                    'product_registration_no' => $req->product_registration_no,
                    'common_name_id' => $req->common_name_id,
                    'country_oforigin_id' => $req->country_oforigin_id,
                    'classification_id' => $req->classification_id,
                    'product_category_id' => $req->product_category_id,
                    'product_subcategory_id' => $req->product_subcategory_id,
                    'product_strength' => $req->product_strength,
                    'weights_units_id' => $req->weights_units_id,
                    'total_weight' => $req->total_weight,
                    'device_type_id' => $device_type_id,
                    'product_id' => $product_id,
                    'prodclass_category_id' => $req->prodclass_category_id,
                    'unitpack_size' => $req->unitpack_size,
                    'unitpack_unit_id' => $req->unitpack_unit_id,
                    'application_code' => $req->application_code,
                    'dosage_form_id' => $req->dosage_form_id
                );

                if (validateIsNumeric($permitprod_recommendation_id)) {

                    $data['permitprod_recommendation_id'] = $req->permitprod_recommendation_id;
                    $data['permitprod_recommendation'] = $req->permitprod_recommendation;
                }

                if (validateIsNumeric($record_id)) {
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        $previous_data = $previous_data['results'];

                        $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                    }
                } else {

                    //insert 
                    $data['permitprod_recommendation_id'] = 1;
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();
                    $resp = insertRecord($table_name, $data, $user_id);

                    $record_id = $resp['record_id'];
                }
                if ($resp['success']) {
                    $res =  array(
                        'success' => true,
                        'record_id' => $record_id,
                        'message' => 'Saved Successfully'
                    );
                } else {
                    $res =  array(
                        'success' => false, 'message1' => $resp['message'],
                        'message' => $error_message
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Mis-match product permits currency, confirm the previous currency and make sure currencies match'
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'resp' => $resp,
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

    public function onSaveNarcoticsPermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;

            $application_code = $req->application_code;
            $product_category_id = $req->product_category_id;
            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;
            $weights_units_id = $req->weights_units_id;
            $total_weight = $req->total_weight;
            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $laboratory_no = $req->laboratory_no;
            $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;

            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 

            $table_name = 'tra_narcoticimport_products';
            $data = array(
                'application_code' => $application_code,
                'narcotics_product_id' => $req->narcotics_product_id,
                'dosage_form_id' => $req->dosage_form_id,
                'packaging_size' => $req->packaging_size,
                'common_name_id' => $req->common_name_id,
                'specification_type_id' => $req->specification_type_id,
                'strength' => $req->strength,
                'quantity' => $req->quantity,
                'authority_yearlyquantity' => $req->authority_yearlyquantity,
                'unit_price' => $req->unit_price,
                'section_id' => $req->section_id,
                'currency_id' => $req->currency_id,
                'packaging_unit_id' => $req->packaging_unit_id,
                'product_strength' => $req->product_strength
            );
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $previous_data = $previous_data['results'];

                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                }
            } else {
                //insert 
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_id);

                $record_id = $resp['record_id'];
            }
            if ($resp['success']) {
                $res =  array(
                    'success' => true,
                    'record_id' => $record_id,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res =  array(
                    'success' => false, 'message1' => $resp['message'],
                    'message' => $error_message
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'success' => $resp,
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
    public function onSaveDisposalPermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $application_code = $req->application_code;
            $brand_name = $req->brand_name;
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

            $table_name = 'tra_disposal_products';
            $data = array(
                'application_code' => $application_code,
                'product_description' => $product_description,
                'brand_name' => $brand_name,

                'currency_id' => $currency_id,
                'estimated_value' => $estimated_value,
                'packaging_unit_id' => $packaging_unit_id,
                'quantity' => $quantity,
                'product_id' => $product_id
            );
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $previous_data = $previous_data['results'];

                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                }
            } else {
                //insert 
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_id);

                $record_id = $resp['record_id'];
            }
            if ($resp['success']) {
                $res =  array(
                    'success' => true,
                    'record_id' => $record_id,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res =  array(
                    'success' => false, 'message1' => $resp['message'],
                    'message' => $error_message
                );
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

    public function onSaveDisposalinternalsupervisors(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;

            $application_code = $req->application_code;
            $inspectors_title_id = $req->inspectors_title_id;
            $inspector_name = $req->inspector_name;
            $record_id = $req->record_id;

            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 

            $table_name = 'tra_disposal_inspectors';
            $data = array(
                'application_code' => $application_code,
                'inspectors_title_id' => $inspectors_title_id,
                'inspector_name' => $inspector_name
            );
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);
                    $previous_data = $previous_data['results'];

                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
                }
            } else {
                //insert 
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_id);

                $record_id = $resp['record_id'];
            }
            if ($resp['success']) {
                $res =  array(
                    'success' => true,
                    'message' => 'Saved Successfully'
                );
            } else {
                $res =  array(
                    'success' => false, 'message1' => $resp['message'],
                    'message' => $error_message
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1' => $resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false, 'message1' => $resp,
                'message' => $throwable->getMessage()
            );
        }

        return response()->json($res);
    }
    public function getSenderreceiverinformation(Request $req)
    {
        try {
            $applicant_id = $req->applicant_id;

            $records = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.id as applicant_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't4.name as country_name',
                    't5.name as region_name',
                    't3.email as app_email'
                )
                ->leftJoin('par_countries as t4', 't3.country_id', '=', 't4.id')
                ->leftJoin('par_regions as t5', 't3.region_id', '=', 't5.id')
                ->orderBy('t3.id', 'desc');
            if (validateIsNumeric($applicant_id)) {
                $records->where('t3.id', $applicant_id);
            }
            $records = $records->get();
            $res = array(
                'success' => true,
                'results' => $records
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

    public function getAllNonLicensedPremises(Request $request)
    {
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
        $limit = $request->limit;
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tpin_no' :
                            $whereClauses[] = "t1.tpin_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'physical_address' :
                            $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'email' :
                            $whereClauses[] = "t1.email like '%" . ($filter->value) . "%'";
                            break;
                        case 'company_registration_no' :
                            $whereClauses[] = "t1.company_registration_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $qry = DB::table('tra_non_license_business_details as t1')
                ->select('t1.id as premised_id','t1.*');
       
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
           
            $totalCount  = $qry->count();
                $records = $qry->skip($start*$limit)->take($limit)->orderBy('t1.id','desc')->get();
                $res = array('success'=>true,
                                'results'=>$records,
                                'totalCount'=>$totalCount
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

    public function getTraderRegisteredPremisesDetails(Request $request){
        $premise_id = $request->input('premise_id');
        $application_code = $request->input('application_code');
        $region_id = $request->input('region_id');
        $section_id = $request->input('section_id');
        $business_type_id = $request->input('business_type_id');
        $is_nearest_premise=$request->input('is_nearest_premise');
        $is_inspection_nearest_premise=$request->input('is_inspection_nearest_premise');
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
        $limit = $request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'region_name' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'district_name' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'physical_address' :
                            $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }

        try {
                $qry = DB::table('registered_premises as t0')
             // $qry = DB::table('tra_premises_applications as t0')
                ->join('tra_premises as t1', 't0.tra_premise_id', '=', 't1.id')
                ->leftJoin('tra_premises_applications as t1a', 't0.tra_premise_id', '=', 't1a.premise_id')
                ->Join('tra_approval_recommendations as t2', 't1a.application_code', '=', 't2.application_code')
                ->leftJoin('wb_trader_account as t3', 't1a.applicant_id', '=', 't3.id')
                ->leftJoin('par_premise_regions as t4', 't1.region_id', '=', 't4.id') 
                ->leftJoin('par_premise_districts as t5', 't1.district_id', '=', 't5.id')
                ->leftJoin('tra_pharmacist_personnel as t6aa', 't1.psu_no', '=', 't6aa.psu_no')
                ->select('t1a.id as main_registered_id', 't1.id as premise_id','t1.id as ltr_id','t2.permit_no as link_permit_no','t1.name as ltr_name','t1.tpin_no as ltr_tin_no', 't1.physical_address as link_physical_address','t1.telephone as link_telephone','t1.id as manufacturing_site_id', 't1.*', 't2.permit_no','t2.permit_no as premise_no', 't3.name as applicant_name',
                    't3.id as applicant_id', 't3.contact_person', 't3.tin_no',
                    't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address','t4.name as region_name', 't5.name as district_name',
                    't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website','t6aa.name as supervising_name','t6aa.psu_date as supervising_registration_date','t6aa.telephone as supervising_telephone_no','t6aa.telephone2 as supervising_telephone_no2','t6aa.telephone3 as supervising_telephone_no3','t6aa.email as supervising_email_address','t6aa.email2 as supervising_email_address2','t6aa.email3 as supervising_email_address3','t6aa.qualification_id as supervising_qualification_id','t6aa.country_id as supervising_country_id','t6aa.region_id as supervising_region_id','t6aa.district_id as supervising_district_id','t6aa.physical_address as supervising_physical_address')
                        ->where('t1a.module_id', 2)
                        //->where('t1.business_type_id', 1)
            ->whereIn('t2.appvalidity_status_id', array(2, 4));
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($premise_id) && !validateIsNumeric($is_nearest_premise) && !validateIsNumeric($is_inspection_nearest_premise)) {
                $qry->where('t1.id', $premise_id);
            }if (validateIsNumeric($region_id)) {
                $qry->where('t1.region_id', $region_id);
            }
            if (validateIsNumeric($business_type_id)) {
                $qry->where('t1.business_type_id', $business_type_id);
            }
            if(validateIsNumeric($is_nearest_premise) || validateIsNumeric($is_inspection_nearest_premise)){
                if(validateIsNumeric($premise_id)){
                    $business_type_id = getSingleRecordColValue('tra_premises', ['id' =>$premise_id], 'business_type_id');

                    if($business_type_id!=7){
                      $qry->where('t1.business_type_id', $business_type_id);
                    }

                    $qry->whereIn('t1.business_type_id', array(1, 2));

                }



                if(validateIsNumeric($application_code)){
                    $premise_id = getSingleRecordColValue('tra_premises_applications', ['application_code' =>$application_code], 'premise_id');

                    $business_type_id = getSingleRecordColValue('tra_premises', ['id' =>$premise_id], 'business_type_id');


                    if($business_type_id!=7){
                      $qry->where('t1.business_type_id', $business_type_id);
                    }
                    $qry->whereIn('t1.business_type_id', array(1, 2));

                }




            }
           // $results = $qry->get();

            $totalCount  = $qry->count();
                $records = $qry->skip($start)->take($limit)->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
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
    public function getPreviousPreviousScreeningData(Request $req)
    {
        try {
            $reference_no  = '';
            $application_code = $req->application_code;
            $record = DB::connection('portal_db')->table('wb_importexport_applications')
                ->where(array('application_code' => $application_code))
                ->first();
            if ($record) {
                $reference_no = $record->reference_no;
            }
            $records = array();
            if ($reference_no != '') {
                $sql_statement = "select checklist_parameters.id as parameter_id,checklist_parameters.name as detail,screening_data.id as id,status,response,comments,query from checklist_parameters inner join screening_data on checklist_parameters.id=screening_data.parameter_id where reference_no='" . $reference_no . "'";
                $records = DB::connection('misv1_db')->select($sql_statement);


                foreach ($records as $row) {
                    $records[] = array(
                        'screening_id' => $row->id,
                        'parameter_id' => $row->parameter_id,
                        'grouo' => '',
                        'detail' => $row->detail,
                        'query_response' => $row->response,
                        'pass_status' => $row->status,
                        'comments' => $row->comments,
                        'query' => $row->query,
                        'success' => true
                    );
                }
            }

            $res = array(
                'success' => true,
                'results' => $records,
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
    public function getPreviousImportExportDocuploads(Request $req)
    {
        try {
            $reference_no  = '';
            $application_code = $req->application_code;
            $record = DB::connection('portal_db')->table('wb_importexport_applications')
                ->where(array('application_code' => $application_code))
                ->first();

            if ($record) {
                $reference_no = $record->reference_no;
            } else {
                $record = DB::connection('portal_db')->table('wb_product_applications')
                    ->where(array('application_code' => $application_code))
                    ->first();

                if ($record) {
                    $reference_no = $record->reference_no;
                }
            }

            $sql_statement = "SELECT T1.id, T1.reference_no,filetype, T1.initial_filename,T1.upload_date from portal.web_uploaded_documents T1 where T1.reference_no = '" . $reference_no . "'";
            $records = DB::connection('misv1_db')->select($sql_statement);

            $res = array(
                'success' => true,
                'results' => $records,
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
    public function prepapareImportpermitUniformStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $permit_details = '';
            $senderReceiverDetails = '';
            $premisesDetails = '';

            $qry = DB::table($table_name . ' as t1')

                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                )
                ->where('t1.application_code', $application_code);

            $data = (array)$qry->first();
            if ($data) {
                $module_id = $data['module_id'];
                if ($module_id == 15) {
                    $destruction_exercise_sitesdata = DB::table('tra_destruction_exercisesites')
                        ->select('destruction_site_id')
                        ->where(array('application_code' => $application_code))
                        ->get();

                    $destruction_exercise_sitesdata = convertStdClassObjToArray($destruction_exercise_sitesdata);
                    $destruction_exercise_sitesdata = convertAssArrayToSimpleArray($destruction_exercise_sitesdata, 'destruction_site_id');
                    $data['destruction_exercise_sites'] = $destruction_exercise_sitesdata;

                    $methodsof_destructionsdata = DB::table('tra_methodsof_destructions')
                        ->select('destructionmethod_id')
                        ->where(array('application_code' => $application_code))
                        ->get();
                    $methodsof_destructionsdata = convertStdClassObjToArray($methodsof_destructionsdata);
                    $methodsof_destructionsdata = convertAssArrayToSimpleArray($methodsof_destructionsdata, 'destructionmethod_id');
                    $data['methodsof_destructions'] = $methodsof_destructionsdata;
                }
                if ($module_id == 4 || $module_id == 12) {
                    $main_qry = DB::table('tra_importexport_applications as t1')
                        ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                        ->where('t1.application_code', $application_code);

                    $qry1 = clone $main_qry;
                    $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                        ->select(
                            't1.*',
                            'q.name as application_status',
                            't1.id as active_application_id',
                            't3.name as applicant_name',
                            't3.contact_person',
                            't3.tin_no',
                            't3.country_id as app_country_id',
                            't3.region_id as app_region_id',
                            't3.district_id as app_district_id',
                            't3.physical_address as app_physical_address',
                            't3.postal_address as app_postal_address',
                            't3.telephone_no as app_telephone',
                            't3.fax as app_fax',
                            't3.email as app_email',
                            't3.website as app_website'
                        );

                    $permit_details = $qry1->first();

                    $permit_details->importexport_product_range_id=json_decode($permit_details->importexport_product_range_id);
                    $premise_id = $permit_details->premise_id;
                    $manufacturing_site_id = $permit_details->manufacturing_site_id;
                    $has_registered_premises = $permit_details->has_registered_premises;
                    $business_type_id = $permit_details->business_type_id;
                    $consignee_id = $permit_details->consignee_id;
                    $contact_person_id = $permit_details->contact_person_id;

                    if($has_registered_premises==1 || $has_registered_premises===1){
                         if($business_type_id==5 || $business_type_id===5){
                            $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                            $permit_details->manufacturing_site_name=$manufacturing_site_name;

                         }else{
                            $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                            $permit_details->premises_name=$premises_name;
                         }
                    }
                    $sender_receiver_id = $permit_details->sender_receiver_id;
                    $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                        ->select(
                            't3.id as trader_id',
                            't3.id as applicant_id',
                            't3.name as applicant_name',
                            't3.contact_person',
                            't3.tin_no',
                            't3.country_id as app_country_id',
                            't3.region_id as app_region_id',
                            't3.district_id as app_district_id',
                            't3.physical_address as app_physical_address',
                            't3.postal_address as app_postal_address',
                            't3.telephone_no as app_telephone',
                            't3.email_address as app_email'
                        )
                        ->where(array('id' => $sender_receiver_id));
                      $senderReceiverDetails = $qry2->first();

                      
                        if (validateIsNumeric($consignee_id)) {
                            $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                            $permit_details->consignee_name = $consignee_name;
                        }

                         if (validateIsNumeric($contact_person_id)) {
                            $billing_person = getSingleRecordColValue('tra_personnel_information', array('id' => $contact_person_id), 'name');

                            $permit_details->billing_person = $billing_person;
                        }



                    // $qry3 = DB::table('tra_premises as t3')
                    //     ->select('t3.*')
                    //     ->where(array('id' => $premise_id));
                    // $premisesDetails = $qry3->first();
                    $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);
                }

                $res = array(
                    'success' => true,
                    'results' => $data,
                    'permit_details' => $permit_details,
                    'senderReceiverDetails' => $senderReceiverDetails,
                    'premisesDetails' => $premisesDetails,
                    'message' => 'All is well'
                );
            } else {
                $res = array(
                    'success' => true,
                    'message' => 'All is well'
                );
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

    public function getImportExportApprovedPermit(Request $req)
    {

        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $section_id = $req->input('section_id');
        $zone_id = $req->input('zone_id');
        $user_zoneid = $this->zone_id;



        $table_name = 'tra_importexport_applications';

        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_premises as t5', 't1.premise_id', '=', 't5.id')
                ->leftjoin('tra_submissions as t6', 't1.application_code', '=', 't6.application_code')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('par_approval_decisions as t8', 't7.decision_id', '=', 't8.id')
                ->leftJoin('tra_permitsrelease_recommendation as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('par_confirmations as t10', 't9.is_permit_verified', '=', 't10.id')
                ->leftJoin('par_business_types as t11', 't1.business_type_id', '=', 't11.id')
                 ->leftJoin('par_approval_decisions as t12', 't9.decision_id', '=', 't12.id')

                  ->leftJoin('tra_directorpermits_review as t13', function ($join) {
                    $join->on('t1.id', '=', 't13.application_id')
                        ->on('t1.application_code', '=', 't13.application_code');
                })
                ->leftJoin('par_approval_decisions as t14', 't13.decision_id', '=', 't14.id')

                ->leftJoin('par_vc_application_type as t15', 't1.vc_application_type_id', '=', 't15.id')
                ->leftJoin('par_import_registration_level as t16', 't1.is_registered', '=', 't16.id')
                ->leftJoin('par_importexport_reasons as t17', 't1.importation_reason_id', '=', 't17.id')
                ->leftJoin('par_importexport_product_category as t18', 't1.product_category_id', '=', 't18.id')

                ->select(
                    't1.*',
                    't1.id as application_id',
                    't3.name as applicant_name',
                    't4.name as application_status',
                    't9.id as release_recommendation_id',
                    't10.description as release_recommendation',
                    't1.id as active_application_id',
                    't8.name as recommendation',
                     't11.name as business_type',
                     't8.id as manager_recommendation_id',
                    't8.name as manager_recommendation',
                    't12.id as approval_recommendation_id',
                    't12.name as approval_recommendation',
                    't13.decision_id as director_recommendation_id',
                    't14.name as director_recommendation',
                    't15.name as vc_application_type',
                    't16.name as registration_level',
                    't17.name as importation_reason',
                    't18.name as product_category'
                )
            ->groupBy('t1.id')
            ->where(array('t6.current_stage' => $workflow_stage, 'isDone' => 0))
            ->orderBy('t1.id', 'desc');




            if (validateIsNumeric(($workflow_stage)) && validateIsNumeric(($section_id))) {
                $qry->where(array('t6.current_stage' => $workflow_stage, 'isDone' => 0, 't1.section_id' => $section_id));
            }


            if (validateIsNumeric($zone_id)) {
                //$qry->where(array('t1.zone_id'=>$zone_id));
            } else if (validateIsNumeric($user_zoneid)) {
                //$qry->where(array('t1.zone_id'=>$user_zoneid));
            }

            $results = $qry->get();
            foreach ($results as $result) {
             $premise_id = $result->premise_id;
             $manufacturing_site_id = $result->manufacturing_site_id;
             $has_registered_premises = $result->has_registered_premises;
              $business_type_id = $result->business_type_id;
             $result->date_added = formatDateWithSuffix($result->created_on);
             if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $premises_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $result->premises_name=$premises_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $result->premises_name=$premises_name;
                 }
            }else{
                $premises_name = getSingleRecordColValue('tra_non_license_business_details', array('id' => $premise_id), 'name');
                $result->premises_name=$premises_name;

            }
          }


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
    public function getPoeinspectionprocessdetails(Request $req)
    {

        $section_id = $req->input('section_id');
        $inspection_status_id = $req->input('inspection_status_id');
        try {
            $qry = DB::table('tra_importexport_applications as t2')
                ->leftJoin('tra_poe_applications as t1', 't1.application_code', '=', 't2.application_code')
                ->join('par_poeinspection_statuses as t3', 't1.inspection_status_id', '=', 't3.id')
                ->leftJoin('tra_managerpermits_review as t4', 't2.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't2.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't1.inspected_by', '=', 't7.id')
                // ->where("t1.id", 3836)
                ->where("t2.created_on", ">", "2024-02-01")
                ->select('t1.*', 't2.id as active_application_id', 't2.reference_no', 't2.tracking_no', 't4.permit_no', 't3.name as inspection_status', 't1.created_on as date_added', 't2.proforma_invoice_no', 't1.id as poe_application_id', 't5.name as permit_section', 't6.name as port_ofentryexit', DB::raw(" CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as inspection_by"));

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

    public function getInspectedPoeinspectionprocessdetails(Request $req)
    {

        $section_id = $req->input('section_id');
        $inspection_status_id = $req->input('inspection_status_id');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');

        $inspected_from = $req->input('inspected_from');
        $inspected_to = $req->input('inspected_to');
        $port_id = $req->input('port_id');
        $inspection_recommendation_id = $req->input('inspection_recommendation_id');
        $section_id = $req->input('section_id');
        $whereClauses = array();
        try {
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'proforma_invoice_no':
                                $whereClauses[] = "t2.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t2.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no':
                                $whereClauses[] = "t2.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'permit_no':
                                $whereClauses[] = "t4.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'permit_section':
                                $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                break;

                            case 'inspected_on':
                                $whereClauses[] = "date_format(inspected_on,'%Y-%m-%d') = '" . ($filter->value) . "'";
                                break;
                            case 'proforma_invoice_no':
                                $whereClauses[] = "t2.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tra_reg_number':
                                $whereClauses[] = "t1.tra_reg_number like '%" . ($filter->value) . "%'";
                                break;
                            case 'inspection_status':
                                $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }

            $qry_totals = DB::table('tra_importexport_applications as t2')
                ->leftJoin('tra_poe_applications as t1', 't1.application_code', '=', 't2.application_code')
                ->join('par_poeinspection_statuses as t3', 't1.inspection_status_id', '=', 't3.id')
                ->leftJoin('tra_managerpermits_review as t4', 't2.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't2.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't1.inspected_by', '=', 't7.id')
                ->distinct('t2.application_code')
                ->select(DB::raw("t2.application_code"))
                ->leftJoin('par_poeinspection_recommendation as t8', 't1.inspection_recommendation_id', '=', 't8.id');

            $qry = DB::table('tra_importexport_applications as t2')
                ->leftJoin('tra_poe_applications as t1', 't1.application_code', '=', 't2.application_code')
                ->join('par_poeinspection_statuses as t3', 't1.inspection_status_id', '=', 't3.id')
                ->leftJoin('tra_managerpermits_review as t4', 't2.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't2.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't1.inspected_by', '=', 't7.id')
                ->leftJoin('par_poeinspection_recommendation as t8', 't1.inspection_recommendation_id', '=', 't8.id')
                // ->select(DB::raw("DISTINCT t2.application_code, CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as inspection_by, t8.name as inspection_recommendation,t1.*,t1.id as active_application_id, t2.reference_no,t2.tracking_no, t4.permit_no,if(t1.inspection_status_id >0,t3.name, 'Not Inspected') as inspection_status,t1.created_on as date_added, t2.proforma_invoice_no, t1.id as poe_application_id,t5.name as permit_section, t6.name as port_ofentryexit"))->distinct('t2.application_code')->orderBy('t1.id','desc')->groupBy('t1.application_code');
                // ->where(array('t1.inspection_status_id'=>2));
                ->select(DB::raw("t2.application_code, CONCAT_WS(' ', decrypt(t7.first_name), decrypt(t7.last_name)) as inspection_by, t8.name as inspection_recommendation, t1.*, t1.id as active_application_id, t2.reference_no, t2.tracking_no, t4.permit_no, CASE WHEN t1.inspection_status_id > 0 THEN t3.name ELSE 'Not Inspected' end  as inspection_status, t1.created_on as date_added, t2.proforma_invoice_no, t1.id as poe_application_id, t5.name as permit_section, t6.name as port_ofentryexit"))
                ->orderBy('t1.id', 'desc')
                ->groupBy(
                    't2.application_code',
                    't1.application_code',
                    't1.custom_declaration_no',
                    't1.tra_reg_date',
                    't1.date_received',
                    't1.permit_reference_no',
                    't1.icd_port_id',
                    't1.tansad_no',
                    't1.remarks',
                    't1.inspected_on',
                    't2.reference_no',
                    't2.tracking_no',
                    't4.permit_no',
                    't3.name',
                    't1.created_on',
                    't2.proforma_invoice_no',
                    't1.id',
                    't5.name',
                    't6.name',
                    "t7.first_name",
                    "t7.last_name",
                    't8.name'
                );

            if (validateIsNumeric($port_id)) {

                $qry->where(array('t1.port_id' => $port_id));
                $qry_totals->where(array('t1.port_id' => $port_id));
            }
            if (validateIsNumeric($inspection_recommendation_id)) {

                $qry->where(array('t1.inspection_recommendation_id' => $inspection_recommendation_id));
                $qry_totals->where(array('t1.inspection_recommendation_id' => $inspection_recommendation_id));
            }
            if (validateIsNumeric($section_id)) {

                $qry->where(array('t2.section_id' => $section_id));
                $qry_totals->where(array('t2.section_id' => $section_id));
            }
            // /the inspected
            if ($inspected_from != '') {
                $qry->whereRAW(" inspected_on >= '" . $inspected_from . "' ");
                $qry_totals->whereRAW(" inspected_on >= '" . $inspected_from . "' ");
            }
            if ($inspected_to != '') {
                $qry->whereRAW(" inspected_on <= '" . $inspected_to . "' ");
                $qry_totals->whereRAW(" inspected_on <= '" . $inspected_to . "' ");
            }

            if ($filter_string != '') {

                $qry->whereRAW($filter_string);
                $qry_totals->whereRAW($filter_string);
            }


            $count = $qry_totals->count();


            $records = $qry->skip($start)->take($limit)->get();

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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
    public function getpermitinspectionbookingdashboardstr(Request $req)
    {
        try {
            $limit = $req->limit;
            $start = $req->start;

            $sub_module_id = $req->sub_module_id;
            $inspectionbooking_status_id = $req->inspectionbooking_status_id;
            $booking_from = $req->booking_from;
            $booking_to = $req->booking_to;

            $qry = DB::table("tesws_permitsgeneral_information as t1")
                ->leftJoin("par_teswspermitsubmission_statuses as t2", 't1.permitsubmission_status_id', 't2.id')
                ->leftJoin("tesws_clearingagents as t3", 't1.clearingAgents', 't3.id')
                ->leftJoin("tesws_importers as t4", 't1.importers', 't4.id')
                ->leftJoin("tesws_exporters as t5", 't1.exporters', 't5.id')
                ->join('tra_importexport_applications as t6', 't1.application_code', 't6.application_code')
                ->leftJoin('wb_trader_account as t7', 't6.applicant_id', 't7.id')
                ->leftJoin('tra_managerpermits_review as t8', 't6.application_code', 't8.application_code')
                ->leftJoin('par_approval_decisions as t9', 't8.decision_id', 't9.id')
                ->join('tesws_inspection_bookings as t10', 't1.application_code', 't10.application_code')
                ->join('tesws_inspectionbooking_statuses as t11', 't10.inspectionbooking_status_id', 't11.id')
                ->select(DB::raw("DISTINCT  t1.id, t1.id as permit_declaration_id,t1.*, t2.name as permitsubmission_status, t4.name as clearingAgents,t4.name as importer,t6.id as active_application_id, t5.name as exporter, t6.*, t7.name as applicant_name,t6.date_added as processed_on, t8.approval_date as permit_approval_date, t9.name as approval_recommendation, t10.*,t10.id as inspectionbooking_id, t11.name as inspectionbookingstatus"))
                ->orderBy('t1.id', 'desc');

            if (validateIsNumeric($sub_module_id)) {

                $qry->where(array('t6.sub_module_id' => $sub_module_id));
            }
            if (validateIsNumeric($inspectionbooking_status_id)) {

                $qry->where(array('inspectionbooking_status_id' => $inspectionbooking_status_id));
            }

            $where_filterdates = '';
            $where_filterdatesapproval = '';
            if ($booking_from != '' && $booking_to != '') {
                $where_filterdates  = " date_format(confimedBookedDate,'%Y-%m-%d') BETWEEN '" . formatDate($booking_from) . "' and  '" . formatDate($booking_to) . "'";
            } else if ($booking_from != '') {
                $where_filterdates  = " date_format(confimedBookedDate,'%Y-%m-%d') >= '" . formatDate($booking_from) . "'";
            } else if ($booking_to != '') {
                $where_filterdates  = " date_format(confimedBookedDate,'%Y-%m-%d') <= '" . formatDate($booking_to) . "'";
            }
            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }


            $filter = $req->input('filter');
            $whereClauses = array();
            $filter_string = '';

            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no':
                                $whereClauses[] = "t6.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'applicationReference':
                                $whereClauses[] = "t1.applicationReference like '%" . ($filter->value) . "%'";
                                break;

                            case 'applicant_name':
                                $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'clearingAgents':
                                $whereClauses[] = "t1.clearingAgents like '%" . ($filter->value) . "%'";
                                break;
                            case 'applicationReference':
                                $whereClauses[] = "t1.applicationReference like '%" . ($filter->value) . "%'";
                                break;
                            case 'invoiceNumber':
                                $whereClauses[] = "t1.invoiceNumber like '%" . ($filter->value) . "%'";
                                break;
                            case 'tansadNo':
                                $whereClauses[] = "tansadNo like '%" . ($filter->value) . "%'";
                                break;
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            $totals = $qry->count();
            $results = $qry->skip($start)->take($limit)->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'totals' => $totals,
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
    public function getPreviewPreviousPermitInvoicePayment(Request $req)
    {
        try {
            $prev_paycntrnum = $req->prev_paycntrnum;
            $type_id = $req->type_id;
            if ($type_id == 1) {
                $title = 'Invoice details';
                $rec = DB::table('tra_application_invoices')->where(array('PayCntrNum' => $prev_paycntrnum))->first();
            } else {
                $title = 'Payments details';
                $rec = DB::table('tra_payments')->where(array('PayCtrNum' => $prev_paycntrnum))->first();
            }
            if ($rec) {
                $res = array(
                    'success' => true,
                    'data' => $rec,
                    'message' => 'Details found'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $title . ' not found under the specified Payment Control Number'
                );
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
    public function getImportExportPermitDeclarations(Request $req)
    {
        try {
            $limit = $req->limit;
            $start = $req->start;

            $sub_module_id = $req->sub_module_id;
            $received_from = $req->received_from;
            $received_to = $req->received_to;
            $permit_approval_from = $req->permit_approval_from;
            $permit_approval_to = $req->permit_approval_to;

            $qry = DB::table("tesws_permitsgeneral_information as t1")
                ->leftJoin("par_teswspermitsubmission_statuses as t2", 't1.permitsubmission_status_id', 't2.id')
                ->leftJoin("tesws_clearingagents as t3", 't1.clearingAgents', 't3.id')
                ->leftJoin("tesws_importers as t4", 't1.importers', 't4.id')
                ->leftJoin("tesws_exporters as t5", 't1.exporters', 't5.id')
                ->leftJoin('tra_importexport_applications as t6', 't1.application_code', 't6.application_code')
                ->leftJoin('wb_trader_account as t7', 't6.applicant_id', 't7.id')
                ->leftJoin('tra_managerpermits_review as t8', 't6.application_code', 't8.id')
                ->leftJoin('par_approval_decisions as t9', 't8.decision_id', 't9.id')
                ->select(DB::raw("DISTINCT  t1.id, t1.id as permit_declaration_id,t1.*, t2.name as permitsubmission_status, t4.name as clearingAgents,t4.name as importer,t6.id as active_application_id, t5.name as exporter, t6.*, t7.name as applicant_name,t6.date_added as processed_on, t8.approval_date as permit_approval_date, t9.name as approval_recommendation"))
                ->orderBy('t1.id', 'desc');

            if (validateIsNumeric($sub_module_id)) {
                $where_section = array('t6.sub_module_id' => $sub_module_id);
            }
            $where_filterdates = '';
            $where_filterdatesapproval = '';
            if ($received_from != '' && $received_to != '') {
                $where_filterdates  = " date_format(t1.created_at,'%Y-%m-%d') BETWEEN '" . formatDate($received_from) . "' and  '" . formatDate($received_to) . "'";
            } else if ($received_from != '') {
                $where_filterdates  = " date_format(t1.created_at,'%Y-%m-%d') >= '" . formatDate($received_from) . "'";
            } else if ($received_to != '') {
                $where_filterdates  = " date_format(t1.created_at,'%Y-%m-%d') <= '" . formatDate($received_to) . "'";
            }
            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }
            if ($permit_approval_from != '' && $permit_approval_from != '') {
                $where_filterdatesapproval  = " date_format(t8.approval_date,'%Y-%m-%d') BETWEEN '" . formatDate($permit_approval_from) . "' and  '" . formatDate($permit_approval_to) . "'";
            } else if ($permit_approval_from != '') {
                $where_filterdatesapproval  = " date_format(t8.approval_date,'%Y-%m-%d') >= '" . formatDate($permit_approval_from) . "'";
            } else if ($permit_approval_to != '') {
                $where_filterdatesapproval  = " date_format(t9.approval_date) <= '" . formatDate($permit_approval_to) . "'";
            }

            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdatesapproval);
            }
            $filter = $req->input('filter');
            $whereClauses = array();
            $filter_string = '';

            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no':
                                $whereClauses[] = "t6.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'applicationReference':
                                $whereClauses[] = "t1.applicationReference like '%" . ($filter->value) . "%'";
                                break;

                            case 'applicant_name':
                                $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t1.clearingAgents like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t1.applicationReference like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t1.invoiceNumber like '%" . ($filter->value) . "%'";
                                break;
                            case 'tansadNumber':
                                $whereClauses[] = "t1.tansadNumber like '%" . ($filter->value) . "%'";
                                break;
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            //$totals =$qry->count();
            //$results = $qry->skip($start)->take($limit)->get();
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                //  'totals'=>$totals,
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
    public function getDeclaredPoeInspectionPermitsProducts(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $poe_application_id = $req->poe_application_id;
            $data = array();
            //get the records 
            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('tra_product_applications as t3', 't1.product_id', '=', 't3.product_id')
                ->leftJoin('tra_managerpermits_review as t4', 't3.permit_id', '=', 't4.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_weights_units as t6', 't1.weights_units_id', '=', 't6.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')

                ->leftJoin('par_product_categories as t8', 't1.product_category_id', '=', 't8.id')

                ->leftJoin('par_device_types as t9', 't1.device_type_id', '=', 't9.id')
                ->leftJoin('tra_trader_regulatedproducts as t10', 't1.regulated_prodpermit_id', '=', 't10.id')
                ->leftJoin('tra_product_information as t11', 't1.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id')
                ->leftJoin('tra_poe_permitsdata as t13', function ($join) use ($poe_application_id) {
                    $join->where('t13.poe_application_id', $poe_application_id)
                        ->on('t1.id', '=', 't13.permits_product_id');
                })
                ->select(DB::raw("DISTINCT  t1.product_id, t1.id as permits_product_id, t1.quantity as permit_quantity,t2.section_id, t4.certificate_no,regulated_prodpermit_id,authorised_permit_no, t7.name as packaging_units,t6.name as weight_units,concat(t11.permitbrand_name,t12.permitcommon_name) as brand_name,t13.remarks, t5.name as currency_name,t13.batch_numbers, t8.name as product_category,t9.name as device_type, (unit_price*quantity) as  total_value, (t1.quantity - COALESCE((SELECT SUM(q.poe_prod_quantity) FROM tra_poe_permitsdata q inner join tra_poe_applications k on q.poe_application_id = k.id WHERE q.permits_product_id = t1.id),0)) as balance, poe_prod_quantity,poe_application_id,t13.id"))
                ->where(array('t1.application_code' => $application_code))
                ->groupBy('t1.id')
                ->get();
            $res = array('success' => true, 'results' => $records);
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
    public function getInspectedPoeinspectionProductsdetails(Request $req)
    {

        $section_id = $req->input('section_id');
        $inspection_status_id = $req->input('inspection_status_id');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');

        $inspected_from = $req->input('inspected_from');
        $inspected_to = $req->input('inspected_to');
        $port_id = $req->input('port_id');
        $inspection_recommendation_id = $req->input('inspection_recommendation_id');
        $section_id = $req->input('section_id');
        $whereClauses = array();
        try {
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'proforma_invoice_no':
                                $whereClauses[] = "t2.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t2.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no':
                                $whereClauses[] = "t2.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'permit_no':
                                $whereClauses[] = "t4.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'permit_section':
                                $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                break;

                            case 'inspected_on':
                                $whereClauses[] = "date_format(inspected_on,'%Y-%m-%d') = '" . ($filter->value) . "'";
                                break;
                            case 'proforma_invoice_no':
                                $whereClauses[] = "t2.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'custom_declaration_no':
                                $whereClauses[] = "t1.custom_declaration_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'inspection_status':
                                $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                break;

                            case 'brand_name':
                                $whereClauses[] = "t11.brand_name like '%" . ($filter->value) . "%'";
                                break;
                            case 'common_name':
                                $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'prodcertificate_no':
                                $whereClauses[] = "t9.prodcertificate_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'batch_numbers':
                                $whereClauses[] = "t9.product_batch_no like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }

            $qry_totals = DB::table('tra_importexport_applications as t2')
                ->leftJoin('tra_poe_applications as t1', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('par_poeinspection_statuses as t3', 't1.inspection_status_id', '=', 't3.id')
                ->leftJoin('tra_managerpermits_review as t4', 't2.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't2.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't1.inspected_by', '=', 't7.id')
                ->distinct('t2.application_code')
                ->select(DB::raw("t2.application_code"))
                ->leftJoin('par_poeinspection_recommendation as t8', 't1.inspection_recommendation_id', '=', 't8.id')

                ->join('tra_permits_products as t9', 't1.application_code', '=', 't9.application_code')

                ->leftJoin('tra_product_information as t11', 't9.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id');

            $qry = DB::table('tra_importexport_applications as t2')
                ->leftJoin('tra_poe_applications as t1', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('par_poeinspection_statuses as t3', 't1.inspection_status_id', '=', 't3.id')
                ->leftJoin('tra_managerpermits_review as t4', 't2.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't2.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't1.inspected_by', '=', 't7.id')
                ->leftJoin('par_poeinspection_recommendation as t8', 't1.inspection_recommendation_id', '=', 't8.id')

                ->join('tra_permits_products as t9', 't1.application_code', '=', 't9.application_code')

                ->leftJoin('tra_product_information as t11', 't9.product_id', '=', 't11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id', '=', 't12.id')
                ->leftJoin('par_packaging_units as t14', 't9.packaging_unit_id', '=', 't14.id')
                //distinct t2.application_code 
                ->select(DB::raw("t2.application_code, CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as inspection_by, t8.name as inspection_recommendation,
                        t1.permit_references,t1.custom_declaration_no,t1.tra_reg_date,t1.date_received,t1.permit_reference_no,
                        t1.icd_port_id,t1.tansad_no,t1.remarks,t1.inspected_on,t1.id as active_application_id, t2.reference_no,t2.tracking_no, 
                        t2.reference_no as permit_no,case when t1.inspection_status_id >0 THEN  t3.name ELSE  'Not Inspected' END  as inspection_status,
                        t1.created_on as date_added, t2.proforma_invoice_no, t1.id as poe_application_id,t5.name as permit_section, t6.name as port_ofentryexit,
                        t9.quantity as permit_quantity , t9.quantity as poe_prod_quantity,t9.product_batch_no as batch_numbers,t11.brand_name,t12.name as common_name, 
                        t9.prodcertificate_no, t14.name as packaging_units, t9.unit_price, (t9.unit_price * t9.quantity) as total_value"))
                //->distinct('t2.application_code')
                ->orderBy('t1.id', 'desc')
                ->groupBy([ //Job
                    't9.id', //23-11-2023,psql
                    't2.application_code',
                    't7.first_name',
                    't7.last_name',
                    't8.name',
                    't1.permit_references',
                    't1.custom_declaration_no',
                    't1.tra_reg_date',
                    't1.date_received',
                    't1.permit_reference_no',
                    't1.icd_port_id',
                    't1.tansad_no',
                    't1.remarks',
                    't1.inspected_on',
                    't1.id',
                    't2.reference_no',
                    't2.tracking_no',
                    't2.reference_no',
                    't1.inspection_status_id',
                    't3.name',
                    't1.created_on',
                    't2.proforma_invoice_no',
                    't1.id',
                    't5.name',
                    't6.name',
                    't9.quantity',
                    't9.quantity',
                    't9.product_batch_no',
                    't11.brand_name',
                    't12.name',
                    't9.prodcertificate_no',
                    't14.name',
                    't9.unit_price',
                ]);

            // ->where(array('t1.inspection_status_id'=>2)); t13
            //job on 23/11/2023, removed distinct, psql does not allow used with group by at same time
            if (validateIsNumeric($port_id)) {

                $qry->where(array('t1.port_id' => $port_id));
                $qry_totals->where(array('t1.port_id' => $port_id));
            }
            if (validateIsNumeric($inspection_recommendation_id)) {

                $qry->where(array('t1.inspection_recommendation_id' => $inspection_recommendation_id));
                $qry_totals->where(array('t1.inspection_recommendation_id' => $inspection_recommendation_id));
            }
            if (validateIsNumeric($section_id)) {

                $qry->where(array('t2.section_id' => $section_id));
                $qry_totals->where(array('t2.section_id' => $section_id));
            }
            // /the inspected
            if ($inspected_from != '') {
                $qry->whereRAW(" inspected_on >= '" . $inspected_from . "' ");
                $qry_totals->whereRAW(" inspected_on >= '" . $inspected_from . "' ");
            }
            if ($inspected_to != '') {
                $qry->whereRAW(" inspected_on <= '" . $inspected_to . "' ");
                $qry_totals->whereRAW(" inspected_on <= '" . $inspected_to . "' ");
            }

            if ($filter_string != '') {

                $qry->whereRAW($filter_string);
                $qry_totals->whereRAW($filter_string);
            }


            $count = $qry_totals->count();


            $records = $qry->skip($start)->take($limit)->get();

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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

// FIXME REMOVE 1 RETURN 2nd without the s or solve why it wont send the application id in the params when you save the application  
    public function getImportExportApprovedPermitDetails(Request $req){

        try{
            $res = Db::table('tra_importexport_applications as t1')
                ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_premises as t3', 't1.premise_id', '=', 't3.id')
                ->where('t1.permit_verificationstatus_id', '=', 1)
                ->get();

                

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

    
    public function getImportExportApprovedPermitDetailss(Request $req)
    {
        $permit_no = $req->input('permit_no');
        $table_name = $req->input('table_name');
        try {
            if ($permit_no != '') {
                $main_qry = DB::table('tra_importexport_applications as t1')
                    ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                    ->leftJoin('tra_managerpermits_review as t6', 't1.application_code', '=', 't6.application_code')
                    ->leftJoin('par_poeinspection_verificationrecommends as t8', 't1.permit_verificationstatus_id', '=', 't8.id');
                $main_qry->whereRAW("(t1.reference_no like '" . $permit_no . "' OR t6.permit_no like '" . $permit_no . "' OR t1.tracking_no like '" . $permit_no . "' OR t1.tansadNumber like '" . $permit_no . "')");
                $qry1 = clone $main_qry;
                $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                    ->select(
                        DB::raw("t1.*,'Approved Permits' as application_status, t1.id as active_application_id,
                        t3.name as applicant_name, t3.contact_person,
                        t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                        t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t1.verification_remarks,t1.permit_verified_on, if(t8.name is null, 'New Permit Not Verified', t8.name) as verification_status,date_format(t6.expiry_date,'%Y-%m-%d') as expiry_date, if(t6.expiry_date < now(), 1,0) as is_permitexpired")
                    );


                $results = $qry1->first();
                if ($results) {
                    $premise_id = $results->premise_id;
                    $sender_receiver_id = $results->sender_receiver_id;
                    $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                        ->select(
                            't3.id as trader_id',
                            't3.name as applicant_name',
                            't3.contact_person',
                            't3.tin_no',
                            't3.country_id as app_country_id',
                            't3.region_id as app_region_id',
                            't3.district_id as app_district_id',
                            't3.physical_address as app_physical_address',
                            't3.postal_address as app_postal_address',
                            't3.telephone_no as app_telephone',
                            't3.email_address as app_email'
                        )
                        ->where(array('id' => $sender_receiver_id));
                    $senderReceiverDetails = $qry2->first();


                    $res = array(
                        'success' => true,
                        'results' => $results,
                        'senderReceiverDetails' => $senderReceiverDetails,
                        'message' => 'All is well'
                    );
                } else {

                    $res = array(
                        'success' => false,
                        'message' => 'Permit Details not found'
                    );
                }
            } else {

                $res = array(
                    'success' => false,
                    'message' => 'Permit Details not found'
                );
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


    public function getImportExportApprovedPermitDetailsArchived(Request $req)
    {

        $table_name = 'tra_importexport_applications';
        $permit_no = $req->input('permit_no');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');
        $section_id = $req->input('section_id');
        $zone_id = $req->input('zone_id');
        try {

            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'proforma_invoice_no':
                                $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no':
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no':
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            if ($permit_no != '') {
                $qry = DB::table($table_name . ' as t1')
                    ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                    ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                    ->leftJoin('tra_premises as t5', 't1.premise_id', '=', 't5.id')
                    ->join('tra_managerpermits_review as t6', 't1.application_code', '=', 't6.application_code')
                    ->join('wb_trader_account as t7', 't1.applicant_id', '=', 't7.id')
                    ->leftJoin('par_poeinspection_verificationrecommends as t8', 't1.permit_verificationstatus_id', '=', 't8.id')
                    ->select(DB::raw("t1.*,t1.id as permit_id, t3.name as applicant_name,t5.name as premises_name, t4.name as application_status,
                                t1.id as active_application_id,t6.permit_no, t6.approval_date, t3.*,t3.name as applicant_name, t3.contact_person,
                                t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                                t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website, t1.verification_remarks,t1.permit_verified_on, t8.name as verification_status,t6.expiry_date, if(t6.expiry_date < now(), 1,0) as is_permitexpired "));

                $qry->whereRAW("(t1.reference_no like '" . $permit_no . "' OR t6.permit_no like '" . $permit_no . "')");

                if (validateIsNumeric($section_id)) {

                    $qry->where('t1.section_id', $section_id);
                }
                $count = $qry->get()->count();
                $records = $qry->orderBy('t1.id', 'desc')->skip($start)->take($limit)->get();

                $res = array(
                    'success' => true,
                    'results' => $records,
                    'totals' => $count,
                    'message' => 'All is well'
                );
            } else {
                $res = array(
                    'success' => true,
                    'results' => array(),
                    'message' => 'All is well'
                );
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
    public function getISpecialmportExportApprovalApplications(Request $req)
    {

        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $decision_id = $req->decision_id;

        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_premises as t5', 't1.premise_id', '=', 't5.id')
                ->leftJoin('tra_approval_recommendations as t7', function ($join) {
                    $join->on('t1.id', '=', 't7.application_id')
                        ->on('t1.application_code', '=', 't7.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't7.decision_id', '=', 't6.id')
                ->select(
                    't1.*',
                    't3.name as applicant_name',
                    't5.name as premises_name',
                    't4.name as application_status',
                    't7.id as recommendation_id',
                    't6.name as recommendation',
                    't6.name as approval_status',
                    't1.id as active_application_id'
                )
                ->where(array('t1.workflow_stage_id' => $workflow_stage));
            if (validateIsNumeric($decision_id)) {

                $qry = $qry->where('decision_id', $decision_id);
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

    public function getNarcoticsDrugsPermitRelease(Request $req)
    {

        $table_name = 'tra_importexport_applications';
        $workflow_stage = $req->input('workflow_stage_id');
        $decision_id = $req->decision_id;

        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('par_narcoticsdrug_types as t5', 't1.narcoticsdrug_type_id', '=', 't5.id')
                ->join('tra_managerpermits_review as t7', function ($join) {
                    $join->on('t1.id', '=', 't7.application_id')
                        ->on('t1.application_code', '=', 't7.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't7.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->select(
                    't1.*',
                    't3.name as applicant_name',
                    't5.name as drugtype_category',
                    't4.name as application_status',
                    't7.id as recommendation_id',
                    't6.name as recommendation',
                    't6.name as approval_status',
                    't1.id as active_application_id'
                )
                ->where(array('t8.current_stage' => $workflow_stage, 'isDone' => 0));


            if (validateIsNumeric($decision_id)) {

                $qry = $qry->where('t7.decision_id', $decision_id);
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
    public function getNarcoticsPermitsManagerReviewApplications(Request $req)
    {

        $table_name = 'tra_importexport_applications';
        $workflow_stage = $req->input('workflow_stage_id');
        $decision_id = $req->decision_id;

        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('par_narcoticsdrug_types as t5', 't1.narcoticsdrug_type_id', '=', 't5.id')
                ->leftJoin('tra_managerpermits_review as t7', function ($join) {
                    $join->on('t1.id', '=', 't7.application_id')
                        ->on('t1.application_code', '=', 't7.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't7.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->select(
                    't1.*',
                    't3.name as applicant_name',
                    't5.name as drugtype_category',
                    't4.name as application_status',
                    't7.id as recommendation_id',
                    't6.name as recommendation',
                    't6.name as approval_status',
                    't1.id as active_application_id'
                )
                ->where(array('t8.current_stage' => $workflow_stage));
            if (validateIsNumeric($decision_id)) {

                $qry = $qry->where('t7.decision_id', $decision_id);
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

    public function getImportExportManagerReviewApplications(Request $req)
    {

        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $section_id = $req->input('section_id');
        $decision_id = $req->decision_id;

        try {

            $user_id = $this->user_id;
            $all_users = getAllUsersOnActingGroups($user_id);
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_premises as t5', 't1.premise_id', '=', 't5.id')
                ->leftJoin('tra_managerpermits_review as t7', function ($join) {
                    $join->on('t1.id', '=', 't7.application_id')
                        ->on('t1.application_code', '=', 't7.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't7.decision_id', '=', 't6.id')
                ->leftJoin('tra_approval_recommendations as t8', function ($join) {
                    $join->on('t1.id', '=', 't8.application_id')
                        ->on('t1.application_code', '=', 't8.application_code');
                })
                ->leftJoin('par_approval_decisions as t9', 't8.decision_id', '=', 't9.id')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('wf_workflow_stages as t11', 't10.current_stage', '=', 't11.id')

                ->leftJoin('users as t12', 't10.usr_from', '=', 't12.id')
                ->leftJoin('users as t13', 't10.usr_to', '=', 't13.id')
                ->leftJoin('tra_applications_comments as t14', function ($join) {
                    $join->on('t1.application_code', '=', 't14.application_code')
                        ->where('t14.is_current', 1)
                        ->where('t14.comment_type_id', 2);
                })
                ->join('wf_tfdaprocesses as t16', 't10.process_id', '=', 't16.id')
                ->leftJoin('par_evaluation_recommendations as t15', 't14.recommendation_id', '=', 't15.id')
                ->leftJoin('tra_imppremises_validation_recommendation as t17', 't1.application_code', '=', 't17.application_code')
                ->leftJoin('par_evaluation_recommendations as t18', 't17.recommendation_id', '=', 't18.id')
                ->leftJoin('tra_impproducts_validation_recommendations as t19', 't1.application_code', '=', 't19.application_code')
                ->leftJoin('par_evaluation_recommendations as t20', 't19.recommendation_id', '=', 't20.id')
                 ->leftJoin('par_business_types as t21', 't1.business_type_id', '=', 't21.id')
                  ->leftJoin('tra_directorpermits_review as t22', function ($join) {
                    $join->on('t1.id', '=', 't22.application_id')
                        ->on('t1.application_code', '=', 't22.application_code');
                })
                ->leftJoin('par_approval_decisions as t23', 't22.decision_id', '=', 't23.id')
                ->leftJoin('par_vc_application_type as t24', 't1.vc_application_type_id', '=', 't24.id')
                ->leftJoin('par_import_registration_level as t25', 't1.is_registered', '=', 't25.id')

                ->leftJoin('par_importexport_reasons as t26', 't1.importation_reason_id', '=', 't26.id')
                ->leftJoin('par_importexport_product_category as t27', 't1.product_category_id', '=', 't27.id')

                ->select(
                    't1.*',
                    't3.name as applicant_name',
                    't5.physical_address as prem_physical_address',
                    't5.premise_reg_no',
                    't9.name as special_caseapproval',
                    't8.decision_id as specialcaseapproval_id',
                    't4.name as application_status',
                    't7.id as recommendation_id',
                    't6.id as manager_recommendation_id',
                    't6.name as manager_recommendation',
                    't22.decision_id as director_recommendation_id',
                    't23.name as director_recommendation',
                    't1.id as active_application_id',
                    't21.name as business_type',
                    't24.name as vc_application_type',
                    't25.name as registration_level',
                    't26.name as importation_reason',
                    't27.name as product_category',
                    DB::raw("CONCAT_WS(' ',decrypt(t12.first_name),decrypt(t12.last_name)) as from_user,t16.name as process_name, t11.name as workflow_stage")
                )
                ->groupBy('t1.id')
                ->where(array('t10.current_stage' => $workflow_stage, 'isDone' => 0));
        
            if (validateIsNumeric($decision_id)) {

                $qry = $qry->where('t7.decision_id', $decision_id);
            }
            if (validateIsNumeric($section_id)) {

                $qry = $qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();

          foreach ($results as $result) {
             $premise_id = $result->premise_id;
             $manufacturing_site_id = $result->manufacturing_site_id;
             $has_registered_premises = $result->has_registered_premises;
             $business_type_id = $result->business_type_id;
             $result->date_added = formatDateWithSuffix($result->created_on);

          if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $premises_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $result->premises_name=$premises_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $result->premises_name=$premises_name;
                 }
            }else{
                $premises_name = getSingleRecordColValue('tra_non_license_business_details', array('id' => $premise_id), 'name');
                $result->premises_name=$premises_name;

            }
          }

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
    public function getImportExportPreviousPermitDetails(Request $req)
    {
        try {
            $previous_permit_no = $req->previous_permit_no;
            $record = DB::table('tra_importexport_applications as t1')
                ->leftJoin('tra_managerpermits_review as t2', 't1.application_code', 't2.application_code')
                ->select('t1.*', 't1.id as active_application_id')
                ->where(function ($query) use ($previous_permit_no) {

                    $query->where('t1.tracking_no', $previous_permit_no)
                        ->orWhere('t1.reference_no', $previous_permit_no)
                        ->orWhere('t2.permit_no', $previous_permit_no);
                })
                ->first();
            if ($record) {
                $res = array(
                    'success' => true,
                    'results' => (array)$record,
                    'message' => 'All is well'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Declared Permit Number not found, verify with the ICT department'
                );
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
    function funcGetReceivedApplications($table_name, $section_id, $sub_module_id)
    {

        $count = DB::table($table_name)
            ->where(array('section_id' => $section_id, 'sub_module_id' => $sub_module_id))
            ->count();

        return $count;
    }
    function funcGetApprovedApplications($table_name, $section_id, $sub_module_id)
    {

        $data = array('approved_applications' => 1, 'rejected_apps' => 3);

        return $data;
    }

    public function getSummaryReports(Request $req)
    {

        // $filters = $this->getProductsSummaryFilters($req);
        $module_id = 1;
        $section_id = 4;

        $sub_module_id = $req->sub_module_id;
        //get received approved rejected queried <div class="">
        $where_section = array();
        if (validateIsNumeric($section_id)) {
            $where_section = array('id' => $section_id);
        }
        $where_submodule = array();
        if (validateIsNumeric($sub_module_id)) {
            $where_submodule = array('id' => $sub_module_id);
        }
        $data = array();
        $section_data = DB::table('par_sections')
            ->where($where_section)
            ->get();

        foreach ($section_data as $sec_data) {
            //second loop for the sub+modules 
            $section_id = $sec_data->id;
            $submod_data = DB::table('sub_modules')
                ->where($where_submodule)
                ->where('module_id', $module_id)
                ->get();

            foreach ($submod_data as $sub_data) {


                $approved_applications = $this->funcGetApprovedApplications('tra_product_applications', $sec_data->id, $sub_data->id);
                $sub_module_id = $sub_data->id;
                $data[] = array(
                    'section_name' => $sec_data->name,
                    'sub_module_name' => $sub_data->name,
                    'received_applications' => $this->funcGetReceivedApplications('tra_product_applications', $sec_data->id, $sub_data->id),
                    'granted_applications' => $approved_applications['approved_applications'],
                    'rejected' => $approved_applications['rejected_apps'],
                    'queried' => 12,
                    'fast_tracked' => 7,
                    'query_response' => 1
                );
            }
        }
        echo json_encode($data);
    }

    public function saveSpecialpermitApprovalRecommendation(Request $request)
    {

        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');

        $qry = DB::table($table_name . '  as t1')
            ->where('t1.id', $application_id);
        $res = array();
        try { // 
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, &$res) {
                $ProductUpdateParams = array();
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
                    //'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                //application_status_id
                $where = array(
                    'application_code' => $application_code
                );

                $count = DB::table('tra_approval_recommendations')->where($where)->count();
                if (validateIsNumeric($id) && $count > 0) {
                    //update

                    $portal_status_id = 10;

                    $params['dola'] = Carbon::now();
                    $params['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords('tra_approval_recommendations', $where);
                    if ($prev_data['success'] == false) {
                        return \response()->json($prev_data);
                    }
                    $prev_data_results = $prev_data['results'];
                    $prev_decision_id = $prev_data_results[0]['decision_id'];

                    $prev_data_results[0]['altered_by'] = $user_id;
                    unset($prev_data_results[0]['id']);
                    if ($decision_id == 1 || $decision_id == 2) {

                        $application_status_id = 6;

                        $qry->update(array('application_status_id' => 6));
                    } else {

                        $application_status_id = 7;

                        $qry->update(array('application_status_id' => 7));
                    }
                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                } else {
                    //insert
                    $portal_status_id = 11;
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    if ($decision_id == 1) {

                        $application_status_id = 6;

                        $qry->update(array('application_status_id' => 6));
                    } else {

                        $application_status_id = 7;

                        $qry->update(array('application_status_id' => 7));
                    }

                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }

                updatePortalApplicationStatusWithCode($application_code, 'wb_importexport_applications', $portal_status_id);

                if ($res['success']) {

                    $app_data =  array(
                        'permit_id' => $id,
                        'application_code' => $application_code,
                        'application_status_id' => $application_status_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $app_where = array('id' => $application_id);
                    $appprev_data = getPreviousRecords('tra_importexport_applications', $app_where);

                    $res = updateRecord('tra_importexport_applications', $appprev_data['results'], $app_where, $app_data, $user_id);
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
    public function getAllImportExportAppsDetails(Request $req)
    {
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'reference_no':
                            $whereClauses[] = "(t1.reference_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'proforma_invoice_no':

                            $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'tracking_no':
                            $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no':
                            $whereClauses[] = "t7.permit_no like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $data = array();
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_permitsenderreceiver_data as t4', 't1.sender_receiver_id', '=', 't4.id')
                ->leftJoin('par_permit_category as t5', 't1.permit_category_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('par_business_types as t8', 't1.business_type_id', '=', 't8.id')
               ->leftJoin('tra_permitsrelease_recommendation as t9', 't1.application_code', 't9.application_code')
                ->select(
                    't1.*',
                    't1.id as active_application_id',
                    't1.id as application_id',
                    't1.application_code',
                    't3.name as applicant_name',
                    't3.tin_no',
                    't1.applicant_id',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't6.name as application_status',
                    't3.name as applicant_name',
                    't4.name as sender_receiver_name',
                    't7.permit_no',
                     't8.name as business_type',
                    DB::raw("date_format(t7.expiry_date, '%m/%d/%Y') as expiry_date")
                )
                ->groupBy('t1.id');

            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }

            $count = $qry->count();
            $records = $qry->orderBy('t1.id', 'desc')->skip($start)->take($limit)->get();

            foreach ($records as $record) {
             $premise_id = $record->premise_id;
             $manufacturing_site_id = $record->manufacturing_site_id;
             $has_registered_premises = $record->has_registered_premises;
             $business_type_id = $record->business_type_id;
             $record->date_added = formatDateWithSuffix($record->created_on);

             $record->expiry_date_formated = formatDateWithSuffix($record->expiry_date);
             if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $premises_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $record->premises_name=$premises_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $record->premises_name=$premises_name;
                 }
            }else{
                $premises_name = getSingleRecordColValue('tra_non_license_business_details', array('id' => $premise_id), 'name');
                $record->premises_name=$premises_name;

            }
          }

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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



    public function getApprovedLicenceApplicationDetails(Request $req)
    {
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');
        $section_id = $req->input('section_id');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'reference_no':
                            $whereClauses[] = "(t1.reference_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'proforma_invoice_no':

                            $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'tracking_no':
                            $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no':
                            $whereClauses[] = "t7.permit_no like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $data = array();

            $qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_permitsenderreceiver_data as t4', 't1.sender_receiver_id', '=', 't4.id')
                ->leftJoin('par_permit_category as t5', 't1.permit_category_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('tra_permitsrelease_recommendation as t8', 't1.application_code', '=', 't8.application_code')
                ->leftJoin('par_business_types as t9', 't1.business_type_id', '=', 't9.id')
                ->select(
                    't1.*',
                    't1.id as active_application_id',
                    't1.id as application_id',
                    't1.application_code',
                    't3.name as applicant_name',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't6.name as application_status',
                    't3.name as applicant_name',
                    't4.name as sender_receiver_name',
                    't7.permit_no',
                    't9.name as business_type',
                    DB::raw("date_format(t7.expiry_date, '%m/%d/%Y') as expiry_date")
                )
                ->where(array('t8.decision_id' => 1));

            if ($filter_string != '') {
                // $qry->whereRAW($filter_string);
            }

            $count = $qry->count();
            $records = $qry->orderBy('t1.id', 'desc')->skip($start)->take($limit)->get();
            foreach ($records as $record) {
             $premise_id = $record->premise_id;
             $has_registered_premises = $record->has_registered_premises;
             $business_type_id = $record->business_type_id;
             $manufacturing_site_id = $record->manufacturing_site_id;
             $record->date_added = formatDateWithSuffix($record->created_on);

             $record->expiry_date_formated = formatDateWithSuffix($record->expiry_date);
             if($has_registered_premises==1 || $has_registered_premises===1){
                 if($business_type_id==5 || $business_type_id===5){
                    $premises_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $record->premises_name=$premises_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $record->premises_name=$premises_name;
                 }
            }else{
                $premises_name = getSingleRecordColValue('tra_non_license_business_details', array('id' => $premise_id), 'name');
                $record->premises_name=$premises_name;

            }
          }


            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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
    public function saveImportExportEditionBaseDetails(Request $req)
    {
        $table_data = $req->all();
        $application_code = $req->application_code;
        
        if (validateIsNumeric($application_code)) {
            //update record
            $app_data = array();
           

            $app_data['sender_receiver_id'] = $table_data['sender_receiver_id'];
            $app_data['premise_id'] = $table_data['premise_id'];
            $app_data['has_registered_premises'] = $table_data['has_registered_premises'];
            $app_data['business_type_id'] = $table_data['business_type_id'];
            $app_data['licence_type_id']= $table_data['licence_type_id'];
            $app_data['product_classification_id'] = $table_data['product_classification_id'];
            $app_data['importexport_product_range_id'] = $table_data['importexport_product_range_id'];

            //app table update
            $app_table_name = 'tra_importexport_applications';
            $app_where = array(
                'application_code' => $application_code
            );

            $user_id = $this->user_id;

            $prev_appdata = getPreviousRecords($app_table_name, $app_where);

            if ($prev_appdata['success'] == true) {
                $previous_data = $prev_appdata['results'];
                $res = updateRecord($app_table_name, $previous_data, $app_where, $app_data, $user_id);
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Application not found, please contact administrator'
                );
            }
        } else {
            $res = array(
                'success' => false,
                'message' => 'Application not submitted, please contact administrator'
            );
        }
        return \response()->json($res);
    }
    public function getSenderReceiverList(Request $req)
    {
        $applicant_id = $req->applicant_id;

        $data = DB::table('tra_permitsenderreceiver_data as t1')
            ->leftJoin('par_countries as t2', 't1.country_id', 't2.id')
            ->leftJoin('par_regions as t3', 't1.region_id', 't3.id')
            ->select('t1.*', 't2.name as country_name', 't3.name as region_name');
        if (validateIsNumeric($applicant_id)) {
            $data->where('t1.id', $applicant_id);
            $data = $data->limit(1)->get();
        } else {
            $data = $data->get();
        }
        $res = array(
            'success' => true,
            'results' => $data,
            'message' => 'All is well'
        );
        return \response()->json($res);
    }
    public function getConsigneedetails(Request $req)
    {
        $applicant_id = $req->applicant_id;

        $data = DB::table('tra_consignee_data as t1')
            ->leftJoin('par_countries as t2', 't1.country_id', 't2.id')
            ->leftJoin('par_regions as t3', 't1.region_id', 't3.id')
            ->select('t1.*', 't2.name as country_name', 't3.name as region_name');
        if (validateIsNumeric($applicant_id)) {
            $data->where('t1.id', $applicant_id);
            $data = $data->limit(1)->get();
        } else {
            $data = $data->get();
        }
        $res = array(
            'success' => true,
            'results' => $data,
            'message' => 'All is well'
        );
        return \response()->json($res);
    }

    public function getImportationReasons(Request $req) {
    try {
        $business_type_id = $req->input('business_type_id');
        $licence_type_id = $req->input('licence_type_id');

        $records = DB::table('par_importexport_reasons as t1')
            ->join('par_importationreasons as t2', 't2.importation_reason_id', '=', 't1.id')
            ->where([
                't2.business_type_id' => $business_type_id,
                't2.licence_type_id' => $licence_type_id
            ])
            ->select('t1.id', 't1.name')
            ->get();

        $res = [
            'success' => true,
            'results' => $records,
            'message' => 'All is well'
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

public function getImportProductRange(Request $req) {
    try {
        $importexport_product_range_id = json_decode($req->input('importexport_product_range_id'));
        $records = DB::table('par_importexport_product_category as t1')
            ->whereIn('t1.importexport_product_range_id', $importexport_product_range_id)
            ->select('t1.*')
            ->get();

        $res = [
            'success' => true,
             'results' => $records,
            'message' => 'All is well'
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




    public function getNarcoticspermitsproductsDetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::table('tra_narcoticimport_products as t1')
                ->leftJoin('par_controlled_drugsdetails as t3', 't1.narcotics_product_id', '=', 't3.id')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')

                ->leftJoin('par_dosage_forms as t8', 't1.dosage_form_id', '=', 't8.id')

                ->leftJoin('par_specification_types as t9', 't1.specification_type_id', '=', 't9.id')
                ->leftJoin('par_common_names as t12', 't1.common_name_id', '=', 't12.id')
                ->select(DB::raw("t1.*, t1.section_id,t3.name as narcotic_product,t12.name as common_name, t7.name as packaging_units, t5.name as currency_name, t8.name as dosage_form,t9.name as specification_type, (unit_price*quantity) as  total_value"))
                ->where(array('t1.application_code' => $application_code))
                ->get();
            $res = array('success' => true, 'results' => $records);
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
    public function saveImportExportExtensionBaseDetails(Request $req)
    {
        $table_data = $req->all();
        $id = $req->id;
        $application_code = $req->application_code;
        $reference_no = $req->reference_no;
        $requested_by = $req->requested_by;
        $user_id = $this->user_id;
        $expiry_date = $this->getNewDate($table_data['prev_expiry_date'], $table_data['extension_period'], $table_data['timeline_duration_id']);
       // dd($table_data['prev_expiry_date']);
        $updated_data['expiry_date'] = $expiry_date;
        $table_data['expiry_date'] = $expiry_date;
        $table_data['application_code'] = $application_code;


        if ($requested_by == '') {

            $table_data['requested_by'] = $user_id;
        }
        unset($table_data['_token']);
        if (validateIsNumeric($application_code)) {
            if (!validateIsNumeric($id)) {

                $res = insertRecord('tra_permit_extensions', $table_data, $user_id);
                $res['expiry_date'] = $table_data['expiry_date']->format('m/d/Y');
                if ($res['success']) {
                    $app_where = array(
                        'application_code' => $application_code
                    );
                    $prev_apdata = getPreviousRecords('tra_managerpermits_review', $app_where);
                    updateRecord('tra_managerpermits_review', $prev_apdata['results'], $app_where, $updated_data, $user_id);
                }
            } else {
                //app table update
                $table_name = 'tra_permit_extensions';
                $app_where = array(
                    'application_code' => $application_code
                );
                unset($table_data['id']);
                $prev_appdata = getPreviousRecords($table_name, $app_where);

                if ($prev_appdata['success'] == true) {
                    $previous_data = $prev_appdata['results'];

                    $res = updateRecord($table_name, $previous_data, $app_where, $table_data, $user_id);
                    $res['expiry_date'] = $table_data['expiry_date']->format('m/d/Y');
                    //updated permit review table
                    $prev_permitdata = getPreviousRecords('tra_importexport_applications', $app_where);
                    //$application_code =  $prev_permitdata['results'][0]['application_code'];
                    $app_where = array(
                        'application_code' => $application_code
                    );
                    updateRecord('tra_managerpermits_review', $prev_permitdata['results'], $app_where, $updated_data, $user_id);
                } else {
                    $res = array(
                        'success' => false, 'data' => $prev_appdata,
                        'message' => 'Application not found, please contact administrator'
                    );
                }
            }
        } else {
            $res = array(
                'success' => false,
                'message' => 'Application not submitted, please contact administrator'
            );
        }
        return \response()->json($res);
    }
    public function getNewDate($oldDate, $extension_period, $duration_desc)
{
    // $date = Carbon::now();

     $date = Carbon::parse($oldDate);
    switch ($duration_desc) {
        case 1: // Years
            return $date->addYears($extension_period);
            break;
        case 2: // Months
            return $date->addMonths($extension_period);
            break;
        case 3: // Weeks
            return $date->addWeeks($extension_period);
            break;
        case 4: // Days

            // $date = Carbon::parse($oldDate);
            // $test=$date->addDays($extension_period);
            // dd($test);
           
            return $date->addDays($extension_period);
            break;
        default:
            return '0000-00-00 00:00:00';
            break;
    }
}


  public function savePersonalUsePermitReceivingBaseDetails(Request $request)
        {
            try {
                $active_application_id = $request->input('active_application_id');
                $applicant_id = $request->input('applicant_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $zone_id = $request->input('zone_id');
                $section_id = $request->input('section_id');
                $module_id = $request->input('module_id');
                $sub_module_id = $request->input('sub_module_id');
               
                
                $user_id = $this->user_id;
                
                
                $app_data = array(
                             "module_id" => $request->input('module_id'),
                             "sub_module_id" => $request->input('sub_module_id'),
                             "name" => $request->input('name'),
                             "email" => $request->input('email'),
                             'process_id' => $process_id,
                             "country_id" => $request->input('country_id'),
                             "district_id" => $request->input('district_id'),
                             'workflow_stage_id' => $request->input('workflow_stage_id'),
                             "region_id" => $request->input('region_id'),
                             "county_id" => $request->input('county_id'),
                             "sub_county_id" => $request->input('sub_county_id'),
                             "parish_id" => $request->input('parish_id'),
                             "village" => $request->input('village'),
                             "tpin_no" => $request->input('tpin_no'),
                             "telephone_no" => $request->input('telephone_no'),
                            "inspected_by" => $user_id,
                             "street" => $request->input('street'),
                             "physical_address" => $request->input('physical_address'),
                             "application_type_id" => $request->input('application_type_id'),
                             "has_medical_prescription" => $request->input('has_medical_prescription'),
                             "prescribling_hospital" => $request->input('prescribling_hospital'),  
                             //"date_received" => Carbon::now(),
                             "hospital_address" => $request->input('hospital_address'),
                             "prescribing_doctor" => $request->input('prescribing_doctor'),
                             "mode_oftransport_id" => $request->input('mode_oftransport_id'),
                             "port_id" => $request->input('port_id'),
                             "air_bill_no" => $request->input('air_bill_no'), 
                             "proforma_invoice_no" => $request->input('proforma_invoice_no'),
                             "proforma_invoice_date" => $request->input('proforma_invoice_date'),
                             "proforma_currency_id" => $request->input('proforma_currency_id'),
                             "tota_invoice_value" => $request->input('tota_invoice_value'),
                             "product_origin_id" => $request->input('product_origin_id'),
                             "applicant_contact_id" => $request->input('applicant_contact_id'),
                             "patients_fullnames" => $request->input('patients_fullnames'),
                             "patients_phone_no" => $request->input('patients_phone_no'),
                             "patients_email_address" => $request->input('patients_email_address'),
                             "patientscountry_id" => $request->input('patientscountry_id'), 
                             "patientsregion_id" => $request->input('patientsregion_id'),
                             "patientsdistrict_id" => $request->input('patientsdistrict_id'),
                             "patients_physical_address" => $request->input('patients_physical_address'),
                             "patient_tpin_no" => $request->input('patient_tpin_no'),
                             "inspected_on" => $request->input('inspected_on'),
                             "inspection_recommendation_id" => $request->input('inspection_recommendation_id'),
                             "remarks" => $request->input('remarks'),
                  );
 
                  $applications_table = 'tra_importexport_applications';
    
                if (validateIsNumeric($active_application_id)) {
                    //update
                    $app_data['dola'] = Carbon::now();
                    $app_data['altered_by'] = $user_id;
                    $app_details = array();
                    $where_app = array('id'=>$active_application_id);
                    if (recordExists($applications_table, $where_app)) {
                        //$app_details = getTableData($applications_table, $where_app);
                        $app_details = getPreviousRecords($applications_table, $where_app);
                        if ($app_details['success'] == false) {
                            return $app_details;
                        }
                        $app_details = $app_details['results'];
                       
                        $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
    
                    }
                    
                    $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                    $tracking_no = $app_details[0]['tracking_no'];//$app_details->reference_no;
    
                    $res['active_application_id'] = $active_application_id;
                    $res['application_code'] = $application_code;
                    $res['tracking_no'] = $tracking_no;
    
                } else {
 
                        $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                        $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                        
                        $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                      
                     
                                 $codes_array = array(
                                     'section_code' => $section_code,
                                     'zone_code' => $zone_code,
                                     'apptype_code'=>$apptype_code
                                 );
                                 
                        $application_code = generateApplicationCode($sub_module_id, $applications_table);
    
                        $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
    
 
                        $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
 
                         if ($tracking_details['success'] == false) {
                             return \response()->json($tracking_details);
                         }
                         $tracking_no = $tracking_details['tracking_no'];
                         
                        $view_id = generateApplicationViewID();
                       
                       

                        $app_data['tracking_no'] = $tracking_no;
                        $app_data['view_id'] = $view_id;
                        $app_data['application_code'] = $application_code;
                        $app_data['created_by'] = \Auth::user()->id;
                        $app_data['created_on'] = Carbon::now();
    
                       
                        $res = insertRecord($applications_table, $app_data, $user_id);

                     
                        $active_application_id = $res['record_id'];

                       //add to submissions table
                       $submission_params = array(
                           'application_id' => $active_application_id,
                           'process_id' => $process_id,
                           'application_code' => $application_code,
                           'reference_no' => $tracking_no,
                           'tracking_no' => $tracking_no,
                           'usr_from' => $user_id,
                           'usr_to' => $user_id,
                           'previous_stage' => $workflow_stage_id,
                           'current_stage' => $workflow_stage_id,
                           'module_id' => $module_id,
                           'sub_module_id' => $sub_module_id,
                           'section_id' => $section_id,
                           'application_status_id' => $application_status->status_id,
                           'urgency' => 1,
                           'applicant_id' => $applicant_id,
                           'remarks' => 'Initial save of the application',
                           'date_received' => Carbon::now(),
                           'created_on' => Carbon::now(),
                           'created_by' => $user_id
                       );
   
                       insertRecord('tra_submissions', $submission_params, $user_id);
                       $res['active_application_id'] = $active_application_id;
                       $res['application_code'] = $application_code;
                    
                      // $res['ref_no'] = $tracking_no;
                       $res['tracking_no'] = $tracking_no;
                       
                }
    
            } catch (\Exception $exception) {
                $res = array(
                    'success' => false,'data'=>$res,
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
     public function prepaprePersonalPermitsReceiving(Request $req){
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->where('t1.application_code', $application_code);


            $results = $main_qry->first();
            
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
    
    public function onSavePersonalUsePermitProductsDetails(Request $req){
        try{
            $resp =""; 
            $user_id = $this->user_id;
               
            $application_code = $req->application_code;
            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;
            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $product_id = $req->product_id;
            $record_id = $req->id;
            
            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 
            
                $table_name = 'tra_permits_products';
                $data = array('unit_price'=>$unit_price,
                                    'currency_id'=>$currency_id,
                                    'section_id'=>$req->section_id,
                                    'productphysical_description'=>$req->productphysical_description,
                                    'packaging_unit_id'=>$packaging_unit_id,
                                    'quantity'=>$quantity,
                                    'permitbrand_name'=>$req->permitbrand_name,
                                    'product_registration_no'=>$req->product_registration_no,
                                    'common_name_id'=>$req->common_name_id,
                                    'country_oforigin_id'=>$req->country_oforigin_id,
                                    'classification_id'=>$req->classification_id,
                                    'product_category_id'=>$req->product_category_id,
                                    'product_subcategory_id'=>$req->product_subcategory_id,
                                    'product_strength'=>$req->product_strength,
                                    'weights_units_id'=>$req->weights_units_id,
                                    'total_weight'=>$req->total_weight,
                                    //'device_type_id'=>$device_type_id,
                                    'product_id'=>$product_id,
                                    'prodclass_category_id'=>$req->prodclass_category_id,
                                    'unitpack_size'=>$req->unitpack_size,
                                    'unitpack_unit_id'=>$req->unitpack_unit_id,
                                    'application_code'=>$req->application_code,
                                    'dosage_form_id'=>$req->dosage_form_id,
                                    'no_of_packs_tertiary'=>$req->no_of_packs_tertiary,
                                    'no_of_packs_secondary'=>$req->no_of_packs_secondary,
                                    'no_of_packs'=>$req->no_of_packs,
                                    'no_of_units'=>$req->no_of_units,
                                    'container_type_id'=>$req->container_type_id,
                                    'batch_numbers'=>$req->batch_numbers,
                                    'manufacturer_id'=>$req->manufacturer_id,
                                    'product_type_id'=>$req->product_type_id,
                                    'product_strength'=>$req->product_strength,
                                    'si_unit_id'=>$req->si_unit_id,
                                    'atc_code_id'=>$req->atc_code_id,
                                    'atc_desciption'=>$req->atc_desciption,
                                    'gmdn_code'=>$req->gmdn_code,
                                    'gmdn_descriptor'=>$req->gmdn_descriptor,
                                    'therapeutic_group'=>$req->therapeutic_group,
                                    'distribution_category_id'=>$req->distribution_category_id,
                                    "route_of_administration_id" =>json_encode(json_decode($req->route_of_administration_id)),
                            );
                 
                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $user_id;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        $previous_data = $previous_data['results'];
                     
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);

                    }
                }
                else{
                    //insert 
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();
                    $resp = insertRecord($table_name, $data, $user_id);
              
                    $record_id = $resp['record_id'];  
                 
                } 
                if($resp['success']){
                    $res =  array('success'=>true,
                    'record_id'=>$record_id,
                    'message'=>'Saved Successfully');
    
                }
                else{
                    $res =  array('success'=>false,'message1'=>$resp['message'],
                    'message'=>$error_message);
    
                }
                
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$resp,
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
         public function  getPersonalUsepermitsproductsDetails(Request $req){
         
        try{
            $application_code = $req->application_code;
            $results = array();
            //get the records 
            $results = DB::table('tra_permits_products as t1')
                ->leftJoin('par_packaging_units as t2', 't1.packaging_unit_id','=','t2.id')
                ->leftJoin('par_currencies as t3', 't1.currency_id','=','t3.id')
                 ->leftJoin('par_importexport_product_category as t4', 't1.product_category_id','=','t4.id')
                ->select('t1.*', 't2.name as packaging_units', 't3.name as currency_name','t4.name as product_category')
                ->where(array('t1.application_code' => $application_code))
                ->get();
                
                if ($results->isNotEmpty()) { 
                    foreach ($results as $result) {
                        $result->route_of_administration_id = json_decode($result->route_of_administration_id);
                    }
                }
                            
                $res =array('success'=>true,'results'=> $results);
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
     public function getImportExportPersonalUsePermits(Request $req){
        try {

            $records = DB::table('tra_importexport_applications as t1')
                                ->leftJoin('par_poeinspection_recommendation as t2', 't1.inspection_recommendation_id', 't2.id')
                                ->leftjoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                                 ->leftjoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                                 ->leftjoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                                ->select(DB::raw("t1.*,t1.name as applicant_name,t1.id as active_application_id, t2.name as inspection_recommendation, t4.name as process_name, t5.name as workflow_stage,t4.id as prce_id"))
                                ->where(array('t1.module_id' => 25))
                                ->orderBy('t1.id', 'desc')
                                ->get();
                
                                $res = array(
                                    'success' => true,
                                    'results' => $records,
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
    public function getDeclaredOnlImportexportpermitsproductsDetails(Request $req)
    {

        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 

            $records = DB::table('tra_permits_products as t1')
                ->join('tra_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->leftJoin('par_currencies as t5', 't1.currency_id', '=', 't5.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id', '=', 't7.id')
                ->leftJoin('tra_product_information as t11', 't1.product_id', '=', 't11.id')
                ->select(DB::raw("t1.*, t2.section_id,t1.permitbrand_name as brand_name,t1.permitcommon_name  as common_name,  t1.prodcertificate_no as certificate_no, t7.name as packaging_units, t5.name as currency_name, (unit_price*quantity) as  total_value"))
                ->where(array('t1.application_code' => $application_code))
                ->groupBy('t1.id')
                ->get();

            $res = array('success' => true, 'results' => $records);
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

    public function prepapreDeclaredImportExportOnlineReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select(
                    't1.*',
                    'q.name as application_status',
                    't1.id as active_application_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website'
                );

            $results = $qry1->first();
            $sender_receiver_id = $results->sender_receiver_id;

            $consignee_id = $results->consignee_id;
            if (validateIsNumeric($consignee_id)) {
                $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                $results->consignee_name = $consignee_name;
            }


            $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
                ->select(
                    't3.id as trader_id',
                    't3.name as applicant_name',
                    't3.contact_person',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.email_address as app_email'
                )
                ->where(array('id' => $sender_receiver_id));
            $senderReceiverDetails = $qry2->first();

            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
            $res = array(
                'success' => true,
                'results' => $results,
                'senderReceiverDetails' => $senderReceiverDetails,
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
public function savepermitReleaseRecommendation(Request $request){
    $table_name = $request->input('table_name');
    $application_code = $request->input('application_code');
    $selected_appcodes = $request->input('selected_appcodes');
    $res = array();
    $user_id = \Auth::user()->id;

    try {
        if (!empty($selected_appcodes)) {
            $selected_appcodes = json_decode($selected_appcodes, true);

            foreach ($selected_appcodes as $app_code) {
                $this->processApplication($table_name, $app_code, $request, $user_id, $res);
            }
        } else {
            $this->processApplication($table_name, $application_code, $request, $user_id, $res);
        }

        return response()->json(['success' => true, 'message' => 'Permit Release Recommendation saved successfully.']);
    } catch (\Exception $exception) {
        return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
    } catch (\Throwable $throwable) {
        return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
    }
}

private function processApplication($table_name, $application_code, $request, $user_id, &$res)
{
    $qry = DB::table($table_name . ' as t1')
        ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
        ->where('t1.application_code', $application_code);

    try {
        DB::transaction(function () use ($qry, $application_code, $table_name, $request, $user_id, &$res) {
            $rec = $qry->first();
            if (!$rec) {
                return;
            }

            $reference_no = $rec->reference_no;
            $sub_module_id = $rec->sub_module_id;
            $module_id = $rec->module_id;
            $licence_type_id = $rec->licence_type_id;
            $business_type_id = $rec->business_type_id;
            $application_id = $rec->id; // Assume 'id' is the application ID
            
            $is_payment_verified = $request->input('is_payment_verified');
            $payment_verification_remarks = $request->input('payment_verification_remarks');
            $permit_release_remarks = $request->input('permit_release_remarks');
            $is_permit_verified = $request->input('is_permit_verified');
            $decision_id = $request->input('decision_id');
            $approval_date = $request->input('approval_date');
            $permit_signatory = $request->input('permit_signatory');
            $dg_signatory = $request->input('dg_signatory');
            $recommendation_id = $request->input('recommendation_id');

            $params = array(
                'application_code' => $application_code,
                'is_payment_verified' => $is_payment_verified,
                'decision_id' => $decision_id,
                'approval_date' => $approval_date,
                'permit_signatory' => $user_id,
                'dg_signatory' => $dg_signatory,
                'payment_verification_remarks' => $payment_verification_remarks,
                'permit_release_remarks' => $permit_release_remarks,
                'is_permit_verified' => $is_permit_verified
            );

            if ($decision_id == 1) {
                $portal_status_id = 26;
            } else {
                $portal_status_id = 11;
            }

            if (validateIsNumeric($recommendation_id)) {
                // Update
                $where = array(
                    'id' => $recommendation_id
                );

                $params['dola'] = Carbon::now();
                $params['altered_by'] = $user_id;
                $prev_data = getPreviousRecords('tra_permitsrelease_recommendation', $where);
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                $prev_data_results = $prev_data['results'];
                $prev_data_results[0]['altered_by'] = $user_id;
                unset($prev_data_results[0]['id']);
                $res = updateRecord('tra_permitsrelease_recommendation', $prev_data['results'], $where, $params, $user_id);
            } else {
                // Insert
                $params['created_on'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord('tra_permitsrelease_recommendation', $params, $user_id);
                $recommendation_id = $res['record_id'];
            }

            // Update the manager permits review 
            $record = DB::table('tra_managerpermits_review')
                ->where(array('application_code' => $application_code))
                ->first();
            if ($record) {
                $prevdecision_id = $record->decision_id;
                $id = $record->id;

                $where = array(
                    'id' => $id,
                    'application_code' => $application_code
                );
                $prev_data = getPreviousRecords('tra_managerpermits_review', $where);

                if ($decision_id == 1) {
                    if ($prevdecision_id == 2) {
                        $data = array('permit_no' => $reference_no, 'approval_date' => $approval_date, 'decision_id' => $decision_id);
                        if ($business_type_id == 14) {
                            $licence_type_id = 1;
                        }
                        $expiry_date = getApplicationExpiryDate($approval_date, $sub_module_id, $module_id, $licence_type_id);
                        if (empty($expiry_date) || $expiry_date == ' ') {
                            $res = array(
                                'success' => false,
                                'message' => 'Expiry Details not set, Please Contact System admin!!'
                            );
                            return $res;
                        }
                        $data['expiry_date'] = $expiry_date;
                    } else {
                        $data = array('permit_no' => $reference_no, 'approval_date' => $approval_date, 'decision_id' => $decision_id);
                        if ($business_type_id == 14) {
                            $licence_type_id = 1;
                        }
                        $expiry_date = getApplicationExpiryDate($approval_date, $sub_module_id, $module_id, $licence_type_id);
                        if (empty($expiry_date) || $expiry_date == ' ') {
                            $res = array(
                                'success' => false,
                                'message' => 'Expiry Details not set, Please Contact System admin!!'
                            );
                            return $res;
                        }
                        $data['expiry_date'] = $expiry_date;
                    }
                    updateRecord('tra_managerpermits_review', $prev_data['results'], $where, $data, $user_id);
                } else {
                    if ($prevdecision_id == 1) {
                        $data = array('permit_no' => '', 'approval_date' => $approval_date, 'decision_id' => $decision_id);
                        updateRecord('tra_managerpermits_review', $prev_data['results'], $where, $data, $user_id);
                    }
                }
            }
            updatePortalApplicationStatusWithCode($application_code, 'wb_importexport_applications', $portal_status_id);

            if ($res['success']) {
                $approval_decision = getSingleRecordColValue('par_approval_decisions', array('id' => $decision_id), 'name');
                $message = "Dear " . $rec->email . "</br>";
                if ($decision_id == 1) {
                    $message = "This is to notify you that the Application for the Import/Export Permit " . $rec->reference_no . " has been Approved for Permit Release, kindly print the permit from the online portal.</br>Attached is the Approved Permit";
                    $attachement_name = 'Import/Export Permit.pdf';
                    $document_root = $_SERVER['DOCUMENT_ROOT'];
                    $attachement = $document_root . '/' . Config('constants.dms.system_uploaddirectory') . date('Y-m-d H:i:s') . '.pdf';
                    // $this->generateImportExportPermit($application_code, 0, 'notify', $attachement);
                    // $response = sendMailNotification($rec->name, $rec->email, $rec->reference_no.' Permit Approval Recommendation: '.$approval_decision, $message, '', '', $attachement, $attachement_name);
                } else {
                    $message = "This is to notify you that the Application for the Import/Export Permit " . $rec->reference_no . " has been rejected, kindly print the rejection letter from the Self service Portal</br>";
                    sendMailNotification($rec->name, $rec->email, $rec->reference_no . ' Permit Approval Recommendation: ' . $approval_decision, $message);
                }
                $res['message'] = "Permit Release Recommendation saved successfully";
            }
        });
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
    }
}


    public function onSaveControlledDrugsPermitProductsDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $permitprod_recommendation_id = $req->permitprod_recommendation_id;
            $application_code = $req->application_code;
            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;
            $weights_units_id = $req->weights_units_id;
            $total_weight = $req->total_weight;
            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;

            $common_name_id = $req->common_name_id;
            $country_oforigin_id = $req->country_oforigin_id;

            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency 
            $record = DB::table('tra_permits_products')
                ->where(array('application_code' => $application_code))
                ->whereNotIn('currency_id', [$currency_id])
                ->get();

            if (!count($record) > 0 || validateisNumeric($record_id)) {
                $table_name = 'tra_permits_products';

                $data = array(
                    'application_code' => $application_code,
                    'quantity' => $quantity,
                    'product_strength' => $req->product_strength,
                    'product_registration_no' => $req->product_registration_no,
                    'product_id' => $product_id,
                    'conversion_unit' => $req->conversion_unit,
                    'country_oforigin_id' => $req->country_oforigin_id,

                    'is_registered_product' => $req->is_registered_product,
                    'unitpack_unit_id' => $req->unitpack_unit_id,
                    'dosage_form_id' => $req->dosage_form_id,
                    'purpose_of_drugsuse' => $req->purpose_of_drugsuse,
                    'controlleddrugs_type_id' => $req->controlleddrugs_type_id,
                    'controlled_drugssubstances_id' => $req->controlled_drugssubstances_id,
                    'controlleddrugs_basesalt_id' => $req->controlleddrugs_basesalt_id,
                    'gramsbasesiunit_id' => $req->gramsbasesiunit_id,
                    'drugs_content' => $req->drugs_content,
                    'strength_asgrams' => $req->strength_asgrams,
                    'controlleddrug_base' => $req->controlleddrug_base,
                    'pack_unit' => $req->pack_unit,
                    'unit_price' => $req->unit_price,
                    'drugspackaging_type_id' => $req->drugspackaging_type_id,
                );
                if (validateIsNumeric($permitprod_recommendation_id)) {

                    $data['permitprod_recommendation_id'] = $req->permitprod_recommendation_id;
                    $data['permitprod_recommendation'] = $req->permitprod_recommendation;
                }
                $data['permitbrand_name'] = $req->permitbrand_name;
                $res = $this->saveImportProductDetails($record_id, $data, $user_id, $table_name);
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Mis-match product permits currency, confirm the previous currency and make sure currencies match'
                );
            }
        } catch (\Exception $exception) {

            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }

        return response()->json($res);
    }
    function saveImportProductDetails($record_id, $data, $user_id, $table_name)
    {
        if (validateIsNumeric($record_id)) {
            $where = array('id' => $record_id);
            if (recordExists($table_name, $where)) {

                $data['dola'] = Carbon::now();
                $data['altered_by'] = $user_id;

                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];

                $resp = updateRecord($table_name, $previous_data, $where, $data, $user_id);
            }
        } else {
            //insert 
            $data['created_by'] = $user_id;
            $data['created_on'] = Carbon::now();
            $resp = insertRecord($table_name, $data, $user_id);

            $record_id = $resp['record_id'];
        }

        if ($resp['success']) {
            $res =  array(
                'success' => true,
                'record_id' => $record_id,
                'message' => 'Saved Successfully'
            );
        } else {
            $res =  array(
                'success' => false, 'message1' => $resp['message'],
                'message' => $error_message
            );
        }

        return  $res;
    }
    public function getOnlineControlDrugsImpermitsproductsDetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_permits_products as t1')
                ->join('wb_importexport_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->select(DB::raw("t1.*,t2.sub_module_id, t2.section_id, '' as certificate_no"))
                ->where(array('t1.application_code' => $application_code))
                ->get();

            $data = $this->getControlledProductsPermitDetails($records);
            $res = array('success' => true, 'results' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }
    //

    public function updateInspectionProductsrodrecommendtion12(Request $request)
    {

        $poe_application_id = $request->input('poe_application_id');
        $poe_application_id = $request->input('poe_application_id');
        $poe_products = $request->input('prod_details');
        $poe_products = json_decode($poe_products);
        $table_name = 'tra_poe_permitsdata';
        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($poe_products as $poe_product) {

                $poe_permitsdata_id = $poe_product->poe_permitsdata_id;
                if (validateIsNumeric($poe_permitsdata_id)) {
                    $where = array(
                        'id' => $poe_permitsdata_id
                    );
                    $update_params = array(
                        'permits_product_id' => $poe_product->permits_product_id,
                        'poe_prod_quantity' => $poe_product->poe_prod_quantity,
                        'batch_numbers' => $poe_product->batch_numbers,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    $insert_params[] = array(
                        'permits_product_id' => $poe_product->permits_product_id,
                        'poe_prod_quantity' => $poe_product->poe_prod_quantity,
                        'poe_application_id' => $poe_application_id,
                        'batch_numbers' => $poe_product->batch_numbers,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                }
            }
            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
                'success' => true,
                'message' => 'POE Product Details saved successfully!!'
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
    public function updateInspectionProductsrodrecommendtion(Request $request)
    {

        $application_code = $request->input('application_code');
        $prod_details = $request->input('prod_details');
        $prod_details = json_decode($prod_details);
        $table_name = 'tra_permits_products';

        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($prod_details as $prod_detail) {

                $permits_product_id = $prod_detail->permits_product_id;
                if (validateIsNumeric($permits_product_id)) {
                    $where = array(
                        'id' => $permits_product_id
                    );
                    $prodinspection_recommendation_id = $prod_detail->prodinspection_recommendation_id;
                    $remarks = $prod_detail->remarks;
                    $update_params = array(
                        'prodinspection_recommendation_id' => $prodinspection_recommendation_id,
                        'prodinspection_recommendation_remarks' => $remarks,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);

                    $res = updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                }
            }

            $res = array(
                'success' => true,
                'msg' => $res,
                'message' => 'Application Products details saved successfully!!'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }

    public function updatesPermitsProductsrodrecommendtion(Request $request)
    {

        $application_code = $request->input('application_code');
        $prod_details = $request->input('prod_details');
        $prod_details = json_decode($prod_details);
        $table_name = 'tra_permits_products';

        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($prod_details as $prod_detail) {

                $permit_prod_id = $prod_detail->permit_prod_id;
                if (validateIsNumeric($permit_prod_id)) {
                    $where = array(
                        'id' => $permit_prod_id
                    );


                    $permitprod_recommendation_id = $prod_detail->permitprod_recommendation_id;
                    $permitprod_recommendation_remarks = $prod_detail->permitprod_recommendation_remarks;

                   $prodregistrationvalidation_recommendation_id = $prod_detail->prodregistrationvalidation_recommendation_id ?? "";

                    $update_params = array(
                        'permitprod_recommendation_id' => $permitprod_recommendation_id,
                        'permitprod_recommendation_remarks' => $permitprod_recommendation_remarks,

                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);

                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                }
            }

            $res = array(
                'success' => true,
                'message' => 'Application Products details saved successfully!!'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }

    public function onIntiateLicenseApplication(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $table_name = 'tra_importexport_applications';
            $where = array('application_code' => $application_code);
            $workflow_stage_id =  $req->workflow_stage_id;
            $sub_module_id =  $req->sub_module_id;
            $vc_application_type_id =  $req->vc_application_type_id;
            $is_registered =  $req->is_registered;
            $permit_no =  $req->permit_no;
            $section_id = $req->section_id;
            $application_status_id = 1;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $trader_id = $req->trader_id;
            $rec = DB::table($table_name)->where($where)->first();
            $permit_productscategory_id = $req->input('permit_productscategory_id');


            $user_id = $this->user_id;
            if ($rec) {

                $section_id = $rec->section_id;
                $reg_importexport_id = $rec->reg_importexport_id;

                $record = DB::table('tra_importexport_applications')
                    ->where(array('reg_importexport_id' => $reg_importexport_id, 'sub_module_id' => $sub_module_id))
                    ->first();


                if (!$record && $reg_importexport_id != 0) {

                    $reference_no = $rec->reference_no;
                    $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id, 'section_id' => $section_id), 'id');
                    $view_id = generateApplicationViewID();
                    $app_data = array(
                        'sub_module_id' => $sub_module_id,
                        'vc_application_type_id' => $vc_application_type_id,
                        'is_registered' => $is_registered,
                        'importer_licence_number' => $permit_no,
                        'reg_importexport_id' => $rec->reg_importexport_id,
                        'module_id' => $rec->module_id, 
                        'section_id' => $rec->section_id,
                        'importexport_product_range_id' => $rec->importexport_product_range_id,
                        'otherpermit_reason' => $rec->otherpermit_reason,
                        'has_registered_premises' => $rec->has_registered_premises,
                        'business_type_id' => $rec->business_type_id,
                        'product_classification_id' => $rec->product_classification_id,
                        'licence_type_id' => $rec->licence_type_id,
                        'port_id' => $rec->port_id,
                        'process_id' => $process_id,
                        'view_id' => $view_id,
                        'mode_oftransport_id' => $rec->mode_oftransport_id,
                        'proforma_invoice_no' => $rec->proforma_invoice_no,
                        'proforma_invoice_date' => formatDate($rec->proforma_invoice_date),
                        'paying_currency_id' => $rec->paying_currency_id, 'proforma_currency_id' => $rec->proforma_currency_id,
                        'consignee_options_id' => $rec->consignee_options_id,
                        'consignee_id' => $rec->consignee_id,
                        'sender_receiver_id' => $rec->sender_receiver_id,
                        'premise_id' => $rec->premise_id,
                        'applicant_id' => $rec->applicant_id
                    );

                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no, $reg_importexport_id, $table_name, $sub_module_id, 'VC');

                    //$generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                    $generateapplication_code = generateApplicationCode($sub_module_id, 'tra_importexport_applications'); //Job from above as not in mis table

                    $app_data['reference_no'] = $reference_no;
                    $app_data['tracking_no'] = $reference_no;
                    $app_data['application_code'] = $generateapplication_code;
                    $app_data['application_status_id'] = $application_status_id;

                    $resp = insertRecord('tra_importexport_applications', $app_data, $trader_email);
                    if ($resp['success']) {

                        $this->saveApplicationSubmissionDetails($generateapplication_code, 'tra_importexport_applications', $workflow_stage_id, $view_id);

                        // $res = $this->saveImportPermitProducts($generateapplication_code, $application_code, $trader_email);

                        $res = $this->saveImportPermitDocuments($generateapplication_code, $application_code, $trader_email, $sub_module_id);
                        $res =  $this->getImportExportApplicationsDetails($generateapplication_code);
                    } else {
                        $res = $resp;
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is ' . $record->tracking_no
                    );
                }
            } else {

                $res = array(
                    'success' => false,
                    'message' => 'Permit Application do no exists, contact the authority for clarification'
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), '');
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), '');
        }
        return response()->json($res, 200);
    }
    function saveApplicationSubmissionDetails($generateapplication_code, $table_name, $workflow_stage_id, $view_id)
    {
        $user_id = $this->user_id;
        $record = DB::table($table_name)->where('application_code', $generateapplication_code)->first();
        if ($record) {

            $submission_params = array(
                'application_id' => $record->id,
                'process_id' => $record->process_id,
                'application_code' => $record->application_code,
                'tracking_no' => $record->tracking_no,
                'reference_no' => $record->reference_no,
                'usr_from' => $user_id,
                'view_id' => $view_id,
                'usr_to' => $user_id,
                'previous_stage' => $workflow_stage_id,
                'current_stage' => $workflow_stage_id,
                'module_id' => $record->module_id,
                'sub_module_id' => $record->sub_module_id,
                'section_id' => $record->section_id,
                'application_status_id' => $record->application_status_id,
                'urgency' => 1,
                'applicant_id' => $record->applicant_id,
                'remarks' => 'Initial save of the application',
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );

            $res = insertRecord('tra_submissions', $submission_params, $user_id);
        }
    }
    function getImportExportApplicationsDetails($generateapplication_code)
    {
        $main_qry = DB::table('tra_importexport_applications as t1')
            ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
            ->where('t1.application_code', $generateapplication_code);

        $qry1 = clone $main_qry;
        $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->select(
                't1.*',
                'q.name as application_status',
                't1.id as active_application_id',
                't3.name as applicant_name',
                't3.contact_person',
                't3.tin_no',
                't3.country_id as app_country_id',
                't3.region_id as app_region_id',
                't3.district_id as app_district_id',
                't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address',
                't3.telephone_no as app_telephone',
                't3.fax as app_fax',
                't3.email as app_email',
                't3.website as app_website'
            );

        $permit_details = $qry1->first();
        $permit_details->importexport_product_range_id=json_decode($permit_details->importexport_product_range_id);
        $premise_id = $permit_details->premise_id;
        $manufacturing_site_id = $permit_details->manufacturing_site_id;
        $has_registered_premises = $permit_details->has_registered_premises;
        $business_type_id = $permit_details->business_type_id;
         $consignee_id = $permit_details->consignee_id;
        $sender_receiver_id = $permit_details->sender_receiver_id;
            
        if($has_registered_premises==1 || $has_registered_premises===1){
                if($business_type_id==5 || $business_type_id===5){
                    $manufacturing_site_name = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $manufacturing_site_id), 'name');
                    $permit_details->manufacturing_site_name=$manufacturing_site_name;
                 }else{
                    $premises_name = getSingleRecordColValue('tra_premises', array('id' => $premise_id), 'name');
                    $permit_details->premises_name=$premises_name;
                 }
            }

            if (validateIsNumeric($consignee_id)) {
                $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $consignee_id), 'name');

                $permit_details->consignee_name = $consignee_name;
            }


        $qry2 = DB::table('tra_permitsenderreceiver_data as t3')
            ->select(
                't3.id as trader_id',
                't3.id as applicant_id',
                't3.name as applicant_name',
                't3.contact_person',
                't3.tin_no',
                't3.country_id as app_country_id',
                't3.region_id as app_region_id',
                't3.district_id as app_district_id',
                't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address',
                't3.telephone_no as app_telephone',
                't3.email_address as app_email'
            )
            ->where(array('id' => $sender_receiver_id));
        $senderReceiverDetails = $qry2->first();

        // $qry3 = DB::table('tra_premises as t3')
        //     ->select('t3.*')
        //     ->where(array('id' => $premise_id));
        // $premisesDetails = $qry3->first();
        $premisesDetails=$this->getPremiseDetails($has_registered_premises,$business_type_id,$premise_id);

        $res = array(
            'success' => true,
            'permit_details' => $permit_details,
            'senderReceiverDetails' => $senderReceiverDetails,
            'premisesDetails' => $premisesDetails,
            'message' => 'Permit Application status updated successfully'
        );
        return $res;
    }
    function generateImportPermitAmmendmentTrackingno($reference_no, $reg_importexport_id, $table_name, $sub_module_id, $acronym)
    {
        $where = array('reg_importexport_id' => $reg_importexport_id, 'sub_module_id' => $sub_module_id);

        $count = DB::table($table_name)->where($where)->count();
        if ($count > 0) {

            $count =  $count + 1;
        } else {

            $count =  1;
        }
        return $reference_no . '/' . $acronym . $count;
    }
    public function saveImportPermitProducts($generateapplication_code, $application_code, $trader_email)
    {
        $record = DB::table('tra_permits_products')
            ->where(array('application_code' => $application_code, 'permitprod_recommendation_id' => 2))->get();
        $res = '';

        foreach ($record as $rec) {

            $app_data = array(
                'ctrdrugslicense_permits_drugs_id' => $rec->id,
                'productphysical_description' => $rec->productphysical_description,
                'common_name_id' => $rec->common_name_id,
                'product_id' => $rec->product_id,
                'conversion_unit' => $rec->conversion_unit,
                'product_strength' => $rec->product_strength,
                'quantity' => $rec->quantity,
                'unit_price' => $rec->unit_price,
                'currency_id' => $rec->currency_id,
                'prodclass_category_id' => $rec->prodclass_category_id,
                'unitpack_size' => $rec->unitpack_size,
                'unitpack_unit_id' => $rec->unitpack_unit_id,
                'application_code' => $generateapplication_code,
                'section_id' => $rec->section_id,
                'dosage_form_id' => $rec->dosage_form_id,
                'pack_unit_id' => $rec->pack_unit_id,
                'permitbrand_name' => $rec->permitbrand_name,
                'permitcommon_name' => $rec->permitcommon_name,
                'product_registration_no' => $rec->product_registration_no,
                'country_oforigin_id' => $rec->country_oforigin_id,
                'is_registered_product' => $rec->is_registered_product,
                'purpose_of_drugsuse' => $rec->purpose_of_drugsuse,
                'controlleddrugs_type_id' => $rec->controlleddrugs_type_id,
                'controlled_drugssubstances_id' => $rec->controlled_drugssubstances_id,
                'controlleddrugs_basesalt_id' => $rec->controlleddrugs_basesalt_id,
                'gramsbasesiunit_id' => $rec->gramsbasesiunit_id,
                'drugs_content' => $rec->drugs_content,
                'strength_asgrams' => $rec->strength_asgrams,
                'controlleddrug_base' => $rec->controlleddrug_base, 'controlleddrug_baseunit_id' => $rec->controlleddrug_baseunit_id,
                'permitprod_recommendation_id' => $rec->permitprod_recommendation_id,
                'drugspackaging_type_id' => $rec->drugspackaging_type_id,
                'created_by' => 0,
                'created_on' => Carbon::now()
            );
            $res = insertRecord('tra_permits_products', $app_data, $trader_email);
        }
    }
    public function saveImportPermitDocuments($generateapplication_code, $application_code, $trader_email, $sub_module_id)
    {
        $record = DB::table('tra_application_uploadeddocuments')
            ->where(array('application_code' => $application_code))
            ->get();

        foreach ($record as $rec) {
            $document_data = array(
                'application_code' => $generateapplication_code,
                'document_requirement_id' => $rec->document_requirement_id,
                'uploaded_on' => Carbon::now(),
                'traderuploadby_id' => $rec->traderuploadby_id,
                'file_name' => $rec->file_name,
                'initial_file_name' => $rec->initial_file_name,
                'file_type' => $rec->file_type,
                'fileSize' => $rec->fileSize,
                'node_ref' => $rec->node_ref,
                'dola' => Carbon::now(),
                'altered_by' => $rec->traderuploadby_id,
                'dc_module_id' => $rec->dc_module_id,
                'dc_sub_module_id' => $rec->dc_sub_module_id,
                'portalapp_variationsdata_id' => $rec->portalapp_variationsdata_id,
                'is_synched' => 1
            );
            $res = insertRecord('tra_application_uploadeddocuments', $document_data, 0, 'mis_db');

            print_r($res);
        }
    }
    public function getDeclaredImportExportPermitsApps(Request $req)
    {
        $module_id = $req->input('module_id');
        $section_id = $req->input('section_id');
        $sub_module_id = $req->input('sub_module_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        $where_submodule = array();
        if (validateIsNumeric($sub_module_id)) {
            $where_submodule = array('id' => $sub_module_id);
        }

        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_importexport_applications as t1')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->join('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin("tesws_permitsgeneral_information as t10", 't1.application_code', 't10.application_code')

                ->leftJoin("par_teswspermitsubmission_statuses as t11", 't10.permitsubmission_status_id', 't11.id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t1.proforma_invoice_no,t1.proforma_invoice_date,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t10.applicationReference as declaration_reference_no,t11.name as declaration_status,
                     t1.*"));

            // $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);

            // if (validateIsNumeric($module_id)) {
            //     $qry->where('t1.module_id', $module_id);
            // }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            //$qry->whereIn('t1.sub_module_id', $where_submodule);
            $qry->where('t7.isDone', 0);
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

    public function getApprovedImportLicenseApplicationDetails(Request $req)
    {
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');
        $section_id = $req->input('section_id');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'reference_no':
                            $whereClauses[] = "(t1.reference_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'proforma_invoice_no':

                            $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'tracking_no':
                            $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no':
                            $whereClauses[] = "t7.permit_no like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $data = array();

            $qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_permitsenderreceiver_data as t4', 't1.sender_receiver_id', '=', 't4.id')
                ->leftJoin('par_permit_category as t5', 't1.permit_category_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('tra_permitsrelease_recommendation as t8', 't1.application_code', '=', 't8.application_code')
                ->select(
                    't1.*',
                    't1.id as active_application_id',
                    't1.id as application_id',
                    't1.application_code',
                    't3.name as applicant_name',
                    't3.tin_no',
                    't3.country_id as app_country_id',
                    't3.region_id as app_region_id',
                    't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address',
                    't3.telephone_no as app_telephone',
                    't3.fax as app_fax',
                    't3.email as app_email',
                    't3.website as app_website',
                    't3.name as applicant_name',
                    't4.name as sender_receiver_name',
                    't7.permit_no',
                    DB::raw("date_format(t7.expiry_date, '%m/%d/%Y') as expiry_date, 'Approved' as application_status")
                )
                ->whereIn('t1.sub_module_id', [61, 78, 79, 81, 82])
                ->where(array('t7.decision_id' => 1));

            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }

            $count = $qry->count();
            $records = $qry->orderBy('t1.id', 'desc')->skip($start)->take($limit)->get();

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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

    public function onIntiateLicenseInspectionApplication(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $workflow_stage_id = $req->workflow_stage_id;
            $sub_module_id = $req->sub_module_id;
            $user_id = $this->user_id;
            $process_id = $req->process_id;
            $table_name = 'tra_importexport_applications';
            $where = array('application_code' => $application_code);
            $sub_module_id = 49;
            $application_status_id = 1;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $trader_id = $req->trader_id;
            $rec = DB::table($table_name)->where($where)->first();

            if ($rec) {

                $section_id = $rec->section_id;
                $reg_importexport_id = $rec->reg_importexport_id;

                $record = DB::table('tra_importexport_applications')
                    ->where(array('reg_importexport_id' => $reg_importexport_id, 'sub_module_id' => $sub_module_id))
                    ->first();

                if (!$record && $reg_importexport_id != 0) {
                    $reference_no = $rec->reference_no;
                    $module_id = $rec->module_id;
                    $applicant_id = $rec->applicant_id;

                    $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id');
                    $app_data = array(
                        'importexport_permittype_id' => $rec->importexport_permittype_id,
                        'sub_module_id' => $sub_module_id,
                        'reg_importexport_id' => $rec->reg_importexport_id,
                        'module_id' => $rec->module_id, 'section_id' => $rec->section_id,
                        'permit_reason_id' => $rec->permit_reason_id,
                        'otherpermit_reason' => $rec->otherpermit_reason,

                        'permit_productscategory_id' => $rec->permit_productscategory_id,
                        'producttype_defination_id' => $rec->producttype_defination_id,
                        'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
                        'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
                        'document_upload_id' => $rec->document_upload_id,

                        'import_typecategory_id' => $rec->import_typecategory_id,
                        'permit_category_id' => $rec->permit_category_id,

                        'port_id' => $rec->port_id,
                        'process_id' => $process_id,
                        'poeinspection_recommendation_id' => 1,
                        'mode_oftransport_id' => $rec->mode_oftransport_id,
                        'proforma_invoice_no' => $rec->proforma_invoice_no,
                        'proforma_invoice_date' => formatDate($rec->proforma_invoice_date),
                        'paying_currency_id' => $rec->paying_currency_id, 'proforma_currency_id' => $rec->proforma_currency_id,
                        'consignee_options_id' => $rec->consignee_options_id,
                        'consignee_id' => $rec->consignee_id,
                        'sender_receiver_id' => $rec->sender_receiver_id,
                        'premise_id' => $rec->premise_id,
                        'applicant_id' => $rec->applicant_id
                    );
                    if ($rec->importexport_permittype_id == 4) {
                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                        $app_data['hospital_address'] = $rec->hospital_address;
                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                        $app_data['prescription_no'] = $rec->prescription_no;
                    }

                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no, $reg_importexport_id, $table_name, $sub_module_id, 'INSP');

                    $generateapplication_code = generateApplicationCode($sub_module_id, 'tra_importexport_applications');
                    $app_data['reference_no'] = $reference_no;
                    $app_data['tracking_no'] = $reference_no;
                    $app_data['application_code'] = $generateapplication_code;
                    $app_data['application_status_id'] = $application_status_id;

                    $resp = insertRecord('tra_importexport_applications', $app_data, $trader_email);
                    //save in the Intray


                    if ($resp['success']) {
                        $active_application_id = $resp['record_id'];

                        $res = $this->saveImportInspectionPermitProducts($generateapplication_code, $application_code, $trader_email);
                        $submission_params = array(
                            'application_id' => $active_application_id,
                            'process_id' => $process_id,
                            'application_code' => $generateapplication_code,
                            'reference_no' => $reference_no,
                            'tracking_no' => $reference_no,
                            'usr_from' => $user_id,

                            'previous_stage' => $workflow_stage_id,
                            'current_stage' => $workflow_stage_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'urgency' => 1,
                            'applicant_id' => $applicant_id,
                            'remarks' => 'Initial save of the application',
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );

                        insertRecord('tra_submissions', $submission_params, $user_id);

                        $res =  $this->getImportExportApplicationsDetails($generateapplication_code);
                    } else {
                        $res = array('success' => false, 'message' => $resp['message']);
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'The License Inspection Applicaton has already been initiated, check the dashboard and proceed, the tracking no is ' . $record->tracking_no
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Permit Application do no exists, contact the authority for clarification'
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), '');
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), '');
        }
        return response()->json($res, 200);
    }
    public function saveImportInspectionPermitProducts($generateapplication_code, $application_code, $trader_email)
    {
        $record = DB::table('tra_permits_products')->where(array('application_code' => $application_code))->get();
        $res = '';

        foreach ($record as $rec) {
            $app_data = array(
                'ctrdrugslicense_permits_drugs_id' => $rec->id,
                'productphysical_description' => $rec->productphysical_description,
                'common_name_id' => $rec->common_name_id,
                'product_id' => $rec->product_id,
                'conversion_unit' => $rec->conversion_unit,
                'product_strength' => $rec->product_strength,
                'quantity' => $rec->quantity,
                'consignment_quantity' => $rec->consignment_quantity,
                'document_upload_id' => $rec->document_upload_id,
                'visa_quantity' => $rec->quantity,
                'unit_price' => $rec->unit_price,
                'currency_id' => $rec->currency_id,
                'manufacturer_id' => $rec->manufacturer_id,
                'prodclass_category_id' => $rec->prodclass_category_id,
                'unitpack_size' => $rec->unitpack_size,
                'unitpack_unit_id' => $rec->unitpack_unit_id,
                'application_code' => $generateapplication_code,
                'section_id' => $rec->section_id,
                'pack_unit_id' => $rec->pack_unit_id,
                'permitbrand_name' => $rec->permitbrand_name,
                'permitcommon_name' => $rec->permitcommon_name,
                'product_batch_no' => $rec->product_batch_no,
                'product_manufacturing_date' => $rec->product_manufacturing_date,
                'product_expiry_date' => $rec->product_expiry_date,

                'product_registration_no' => $rec->product_registration_no,
                'country_oforigin_id' => $rec->country_oforigin_id,
                'created_by' => 0,
                'created_on' => Carbon::now()
            );
            $res = insertRecord('tra_permits_products', $app_data, $trader_email);
        }
        return $res;
    }
    public function savePOEPermitRecommendations(Request $request)
    {
        try {

            $poe_application_id = $request->input('poe_application_id');
            $remarks = $request->input('remarks');
            $workflow_stage_id = $request->input('workflow_stage_id');

            $application_code = $request->input('application_code');

            $inspection_recommendation_id = $request->input('inspection_recommendation_id');
            $process_id = $request->input('process_id');
            $application_code = $request->input('application_code');

            $inspection_status_id = 2;

            $user_id = $this->user_id;

            $app_data = array(
                "remarks" => $remarks,
                "inspection_recommendation_id" => $inspection_recommendation_id,
                "recommendation_by" => $user_id,
                'inspection_status_id' => $inspection_status_id,
                "inspected_by" => $user_id
            );

            $applications_table = 'tra_poe_applications';

            if (validateIsNumeric($poe_application_id)) {
                //update
                $app_data['dola'] = Carbon::now();
                $app_data['altered_by'] = $user_id;
                $app_details = array();
                $where_app = array('id' => $poe_application_id);
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res =  updateRecord($applications_table, $app_details, $where_app, $app_data, $user_id);
                }
                //save in the Poe recommendaitons table to have different recommendations
                $app_data = array(
                    "remarks" => $remarks,
                    "application_code" => $application_code,
                    "poe_application_id" => $poe_application_id,
                    "inspection_recommendation_id" => $inspection_recommendation_id,
                    "recommendation_by" => $user_id,
                    'inspection_status_id' => $inspection_status_id,
                    "inspected_by" => $user_id
                );
                $tra_poe_apptable = 'tra_poe_apprecommendations';
                $where_app = array(
                    'application_code' => $application_code,
                    "poe_application_id" => $poe_application_id,
                    "inspection_recommendation_id" => $inspection_recommendation_id,
                    'inspection_status_id' => $inspection_status_id
                );
                if (recordExists($tra_poe_apptable, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_data['altered_by'] = $user_id;
                    $app_data['dola'] = Carbon::now();
                    $app_details = getPreviousRecords($tra_poe_apptable, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res =  updateRecord($tra_poe_apptable, $app_details, $where_app, $app_data, $user_id);
                } else {
                    $app_data['created_by'] = $user_id;
                    $app_data['created_on'] = Carbon::now();
                    $res = insertRecord($tra_poe_apptable, $app_data, $user_id);
                }
            }
            //submission details 


            if ($res['success']) {
                //provide for the released permits 
                $app_record = DB::table('tra_importexport_applications')->where('application_code', $application_code)->first();

                if ($app_record) {
                    $workflowaction_type_id = getSingleRecordColValue('par_poeinspection_recommendation', array('id' => $inspection_recommendation_id), 'workflowaction_type_id');

                    $record = DB::table('wf_workflow_transitions as t1')
                        ->join('wf_workflow_actions as t2', 't1.action_id', 't2.id')
                        ->where(array('action_type_id' => $workflowaction_type_id, 't1.stage_id' => $workflow_stage_id))
                        ->select('t1.nextstage_id as next_stage_id')
                        ->first();

                    if ($record) {
                        $next_stage_id = $record->next_stage_id;
                        $submission_params = array(
                            'application_id' => $app_record->id,
                            'process_id' => $process_id,
                            'application_code' => $application_code,
                            'reference_no' => $app_record->reference_no,
                            'tracking_no' => $app_record->reference_no,
                            'usr_from' => $user_id,
                            'previous_stage' => $workflow_stage_id,
                            'current_stage' => $next_stage_id,
                            'module_id' => $app_record->module_id,
                            'sub_module_id' => $app_record->sub_module_id,
                            'section_id' => $app_record->section_id,
                            'urgency' => 1,
                            'isDone' => 0,
                            'isRead' => 0,
                            'applicant_id' => $app_record->applicant_id,
                            'remarks' => 'Inspection save of the application',
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        $res =  insertRecord('tra_submissions', $submission_params, $user_id);
                    }
                    updateInTraySubmissions($res['record_id'], $application_code, $workflow_stage_id, $user_id); //Job on 24.02.24

                    // updateInTraySubmissions($record->id, $application_code, $workflow_stage_id, $user_id);
                }


                $res = array(
                    'success' => true,
                    'message' => 'POE Application saved successfully',
                    'poe_application_id' => $poe_application_id
                );
            } else {
                $res = array(
                    'success' => true,
                    'message' => 'Error Occurrec, POE applications were not saved',

                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage(),
                "line" => $exception->getLine()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }


    public function saveDirectorBatchRecommendation(Request $request){
    try {
        $table_name = 'tra_directorpermits_review';
        $user_id = \Auth::user()->id;
        $selected_appcodes = $request->input('selected_appcodes');
        $selected_appIds = $request->input('selected_appIds');
        $res = array();

        if ($selected_appcodes != '') {
            $selected_appcodes = json_decode($selected_appcodes);
            $selected_appIds = json_decode($selected_appIds);
            
                foreach ($selected_appcodes as $index => $application_code) {
                    $application_id = $selected_appIds[$index];
                    
                    $where = array(
                        'application_code' => $application_code,
                    );
                    
                    $params = array(
                        'application_id' => $application_id,
                        'application_code' => $application_code,
                        'workflow_stage_id' => $request->input('workflow_stage_id'),
                        'module_id' => $request->input('module_id'),
                        'sub_module_id' => $request->input('sub_module_id'),
                        'decision_id' => $request->input('decision_id'),
                        'approval_date' => $request->input('approval_date'),
                        'certificate_issue_date' => $request->input('approval_date'),
                        'expiry_date' => $request->input('expiry_date'),
                        'prepared_by_id' => \Auth::user()->id,
                        'created_by' => \Auth::user()->id,
                        'created_on' => Carbon::now(),
                    );

                    if (recordExists($table_name, $where)) {
                        $prev_data = getPreviousRecords($table_name, $where);
                        $previous_data = $prev_data['results'];
                        $res = updateRecord($table_name, $previous_data, $where, $params, $user_id);
                    } else {
                        $res = insertRecord($table_name, $params, $user_id);
                    }
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

}
