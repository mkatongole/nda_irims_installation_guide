<?php

namespace Modules\GvpApplications\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\GvpApplications\Traits\GvpApplicationsTrait;

class GvpApplicationsController extends Controller
{
    protected $user_id;
    use GvpApplicationsTrait;

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
                return $next($request);
            });
        }
    }

    public function index()
    {
        return view('gvpapplications::index');
    }

    public function getGvpApplicationParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\GvpApplications\\Entities\\' . $model_name;
            if (isset($strict_mode) && $strict_mode == 1) {
                $results = $model::where('is_enabled', 1)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function getGvpCommonParams(Request $request)
    {
        $section_id = $request->input('section_id');
        $model_name = $request->input('model_name');
        try {
            $model = 'Modules\\GvpApplications\\Entities\\' . $model_name;
            if (isset($section_id) && $section_id != '') {
                $qry = $model::where('section_id', $section_id)->get();
            } else {
                $qry = $model::all();
            }
            $results = $qry->toArray();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function saveGvpApplicationCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }

            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
            if (isset($id) && $id != "") {
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


    public function saveGVPOnlineAssessmentdetails(Request $req)
     {
         try{
             DB::beginTransaction();
             $table_name= $req->table_name;
             $active_application_code = $req->active_application_code;
             $record_id = $req->id;
             $user_id = \Auth::user()->id;
             $post_data= $req->all();
             $post_data= $req->all();
             unset($post_data['sub_module_id']);
             unset($post_data['active_application_code']);
             $Sub_cat_data =array();
             $items_data = [];
             $cat_data=[];
             $sanitizedArray=[];

            
            foreach ($post_data as $key =>$value) {
                 $v=explode('-',$key);
                // dd($v);
                 if($v[1] == 'workspace' || $v[1] == 'comment'){
                     $Sub_cat_data[] = array(
                          'sub_category_id'=>$v[0],
                          $v[1]=>$value
                     ); 
                 }
                 else if($v[1] == 'itemcheck' || $v[1] == 'item'){
                  $item_data[] = array(
                      'item_id'=>$v[0],
                      $v[1]=>$value
                 );
                 }
                
               }
           foreach ($item_data as  $items_data) {
               // dd($items_data);
               $items_data['active_application_code'] = $active_application_code;
              $previous_data = getPreviousRecords('par_gvp_assessment_items_details', ['active_application_code'=>$active_application_code, 'item_id' => $items_data['item_id']]);
              if ($previous_data['success'] == false) {
                  return $previous_data;
              }
              $previous_data = $previous_data['results'];
              deleteRecord('par_gvp_assessment_items_details',$previous_data, ['active_application_code'=>$active_application_code, 'item_id' => $items_data['item_id']], $user_id);
              insertRecord('par_gvp_assessment_items_details', $items_data,$user_id);
           }
              //restructure sub cat data
          $count = 0;
          foreach ($Sub_cat_data as $value) {
             $sub_category_id =$value['sub_category_id'];
             $arr = array_filter($Sub_cat_data, function($ar) use($sub_category_id) {
                 return ($ar['sub_category_id'] == $sub_category_id);
              });
             
             //delete that array
             $Sub_cat_data = \array_filter($Sub_cat_data, static function ($ar) use($sub_category_id) {
                  return $ar['sub_category_id'] != $sub_category_id;
              });
             

             //data for insert
             $res = array(
                   'success' => true,
                   'message' => 'Details saved successfully!!'
               );
             
             if(isset($arr[$count]) && validateIsNumeric($arr[$count]['sub_category_id'])){ //incase where there is no category

                 if(isset($arr[$count]['workspace'])){
                   $arr = ['sub_category_id' => $arr[$count]['sub_category_id'], 'workspace'=>$arr[$count]['workspace'], 'comment'=>$arr[$count+1]['comment'], 'active_application_code'=>$active_application_code];
                  }
                  else if(isset($arr[$count+1]['workspace'])){
                    $arr = ['sub_category_id' => $arr[$count]['sub_category_id'], 'workspace'=>$arr[$count+1]['workspace'], 'comment'=>$arr[$count]['comment'], 'active_application_code'=>$active_application_code];
                  }else{
                      $arr = ['sub_category_id' => $arr[$count]['sub_category_id'], 'workspace'=>$arr[$count]['workspace'], 'comment'=>$arr[$count+1]['comment'], 'active_application_code'=>$active_application_code];
                  }
                  $previous_data = getPreviousRecords('par_gvp_assessment_category_details', ['sub_category_id' => $arr['sub_category_id'], 'active_application_code'=>$active_application_code]);
                  if ($previous_data['success'] == false) {
                      return $previous_data;
                  }
                  $previous_data = $previous_data['results'];
                  deleteRecord('par_gvp_assessment_category_details',$previous_data, ['sub_category_id' => $arr['sub_category_id'], 'active_application_code'=>$active_application_code], $user_id);
                  $res = insertRecord('par_gvp_assessment_category_details', $arr, $user_id);
                  $count++;
              }else{
                 $count--; 
              }
              $count++;
          }
          DB::commit();
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

    public function deleteGvpApplicationRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            if($table_name=='tra_manufacturing_sites_blocks'){
              $where_line = array(
                  'manufacturingsite_block_id' => $record_id
              );

              $previous_data = getPreviousRecords('gvp_productline_details', $where_line);
              if ($previous_data['success'] == false) {
                  return $previous_data;
              }
              $previous_data = $previous_data['results'];
              $res = deleteRecord('gvp_productline_details', $previous_data, $where_line, $user_id);


              $where = array(
                  'id' => $record_id
              );

              $previous_data = getPreviousRecords($table_name, $where);
              if ($previous_data['success'] == false) {
                  return $previous_data;
              }
              $previous_data = $previous_data['results'];
              $res = deleteRecord($table_name, $previous_data, $where, $user_id);
            }else{
                  $where = array(
                'id' => $record_id
                 );
                $previous_data = getPreviousRecords($table_name, $where);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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


    public function getManufacturingSitesList(Request $request){
        try {
            $qry = DB::table('tra_gvp_sites as t1')
            ->leftJoin('par_countries as t3', 't1.country_id', '=', 't3.id')
            ->leftJoin('par_regions as t4', 't1.region_id', '=', 't4.id')
            ->select('t1.*', 't3.name as country', 't4.name as region');
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

    // public function getManufacturingSitesList(Request $request)
    // {
    //     $premise_id = $request->input('premise_id');
    //     $section_id = $request->input('section_id');
    //     $gvp_type_id = $request->input('gvp_type_id');
    //     $manufacturer_id = $request->input('manufacturer_id');
    //     $filter = $request->input('filter');
    //     $whereClauses = array();
    //     $filter_string = '';
    //     if (isset($filter)) {
    //         $filters = json_decode($filter);
    //         if ($filters != NULL) {
    //             foreach ($filters as $filter) {
    //                 switch ($filter->property) {
    //                     case 'manufacturer_name' :
    //                         $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
    //                         break;
    //                     case 'name' :
    //                         $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
    //                         break;
    //                     case 'applicant_name' :
    //                         $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
    //                         break;
    //                     case 'premise_reg_no' :
    //                         $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
    //                         break;
    //                     case 'permit_no' :
    //                         $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
    //                         break;
    //                 }
    //             }
    //             $whereClauses = array_filter($whereClauses);
    //         }
    //         if (!empty($whereClauses)) {
    //             $filter_string = implode(' AND ', $whereClauses);
    //         }
    //     }
    //     try {
    //         $qry = DB::table('registered_manufacturing_sites as t0')
    //             ->join('tra_manufacturing_sites as t1', 't0.tra_site_id', '=', 't1.id')
    //             ->leftJoin('tra_approval_recommendations as t2', 't1.permit_id', '=', 't2.id')
    //             ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
    //             ->join('tra_gvp_applications as t4', 't0.tra_site_id', '=', 't4.manufacturing_site_id')
    //             ->leftJoin('par_gvplocation_details as t5', 't4.gvp_type_id', '=', 't5.id')
    //             ->leftJoin('tra_manufacturers_information as t6', 't1.manufacturer_id', '=', 't6.id')
    //             ->leftJoin('wb_trader_account as t7', 't1.ltr_id', '=', 't7.id')
    //             ->leftJoin('tra_personnel_information as t8', 't1.contact_person_id', '=', 't8.id')
    //             ->select('t1.id as manufacturing_site_id', 't1.*', 't2.permit_no', 't3.name as applicant_name',
    //                 't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no', 't2.permit_no as gvp_cert_no',
    //                 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
    //                 't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address',
    //                 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't5.name as gvp_type_txt', 't0.id as registered_manufacturing_site_id',
    //                 't6.name as manufacturer_name', 't6.email_address as manufacturer_email_address', 't6.physical_address as manufacturer_physical_address', 't6.country_id as manufacturer_country_id',
    //                 't7.id as ltr_id', 't7.name as ltr_name', 't7.tin_no', 't7.country_id as ltr_country_id', 't7.region_id as ltr_region_id', 't7.district_id as ltr_district_id', 't7.physical_address as ltr_physical_address',
    //                 't7.postal_address as ltr_postal_address', 't7.telephone_no as ltr_telephone', 't7.email as ltr_email', 't7.website as ltr_website',
    //                 't8.name as contact_name', 't8.postal_address as contact_postal_address', 't8.telephone_no as contact_telephone_no', 't8.email_address as contact_email_address',
    //                 't1.applicant_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date', 't4.gvp_type_id', 't4.device_type_id', 't4.assessment_type_id');
    //             //->whereIn('t0.validity_status', array(1, 2));
    //         if (isset($section_id) && $section_id != '') {
    //             //$qry->where('t4.section_id', $section_id);
    //         }
    //         if (isset($gvp_type_id) && $gvp_type_id > 0) {
    //             $qry->where('t4.gvp_type_id', $gvp_type_id);
    //         }
    //         if ($filter_string != '') {
    //             $qry->whereRAW($filter_string);
    //         }
    //         if (isset($manufacturer_id) && $manufacturer_id != '') {
    //             $qry->where('t1.manufacturer_id', $manufacturer_id);
    //         }
    //         $results = $qry->get();
    //         $res = array(
    //             'success' => true,
    //             'results' => $results,
    //             'message' => 'All is well'
    //         );
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
    //     return \response()->json($res);
    // }

    public function getManufacturingSiteGvpInspectionLineDetails(Request $request)
    {
        $site_id = $request->input('site_id');
        $section_id = $request->input('section_id');
        try {
           // $results = $this->getGvpProductLineDetails($site_id);
           $qry = DB::table('gvp_product_lines as t2')
           ->join('gvp_productline_details as t1', function ($join) use ($site_id) {
                    $join->on('t2.id', '=', 't1.product_line_id')
                             ->where('t1.manufacturing_site_id', $site_id);
           })
           ->leftJoin('gvp_product_categories as t3', 't2.gvp_product_categories_id', '=', 't3.id')
           ->leftJoin('gvp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
           ->leftJoin('gvp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
           ->leftJoin('tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
           ->leftJoin('gvp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
           ->leftJoin('gvp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
           ->select('t1.*','t2.id as product_line_id', 't3.id as gvp_product_categories_id', 't2.name as product_line_name', 't3.name as product_line_category', 't1.product_line_description',
               't7.name as block', 't6.name as product_line_status', 't5.name as inspection_recommendation', 't8.name as tc_recommendation', 't9.name as dg_recommendation');
            if(validateIsNumeric($section_id)){

                $qry->where(array('t3.section_id'=>$section_id));
            }
             $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getManSitesList(Request $request)
    {
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $manufacturer_id = $request->input('manufacturer_id');
        $filter = $request->input('filter');
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'manufacturer_name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'name' :
                            $whereClauses[] = "t0.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
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
            $qry = DB::table('par_man_sites as t0')
                ->join('tra_manufacturers_information as t1', 't0.manufacturer_id', '=', 't1.id')
                ->join('par_countries as t2', 't0.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't0.region_id', '=', 't3.id')
                ->join('par_countries as t4', 't1.country_id', '=', 't4.id')
                ->leftjoin('wb_trader_account as t5', 't0.applicant_id', '=', 't5.id')
                ->select('t0.*', 't1.name as manufacturer_name', 't1.email_address as manufacturer_email_address', 't1.physical_address as manufacturer_physical_address', 't1.country_id as manufacturer_country_id',
                    't0.id as man_site_id', 't2.name as country', 't3.name as region', 't5.name as applicant_name');
            if (isset($section_id) && $section_id != '') {
               // $qry->where('t0.section_id', $section_id);
            }
            if (isset($manufacturer_id) && $manufacturer_id != '') {
               // $qry->where('t0.manufacturer_id', $manufacturer_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id > 0) {
                // $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
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

    public function getGvpApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_gvp_applications as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->join('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->join('users as t9', 't8.usr_from', '=', 't9.id')
                ->leftJoin('users as t10', 't8.usr_to', '=', 't10.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,t7.name as gvp_type_txt,
                     CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as from_user,CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as to_user"));
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t8.current_stage', $assigned_stages);
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t8.current_stage', $workflow_stage_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            $qry->where('t8.isDone', 0);
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

    public function getDismissedGvpApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $gvp_type_id = $request->input('gvp_type_id');
        try {
            $qry = DB::table('tra_dismissed_applications as t11')
                ->join('tra_gvp_applications as t1', 't11.application_code', '=', 't1.application_code')
                ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_applicationdismissal_reasons as t6', 't11.dismissal_reason_id', '=', 't6.id')
                ->join('sub_modules as t7', 't1.sub_module_id', '=', 't7.id')
                ->join('users as t8', 't11.dismissal_by', '=', 't8.id')
                ->select(DB::raw("t1.*, t2.name as site_name, t3.name as applicant_name, t4.name as application_status,
                    t7.name as sub_module_name,t1.id as active_application_id,t5.name as workflow_stage,t6.name as dismissal_reason,
                    t11.dismissal_date,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as author"));
            if (validateIsNumeric($section_id)) {
                $qry->where('t11.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t11.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($gvp_type_id)) {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $inspection_type_id = $request->input('inspection_type_id');
        if (!$table_name) {
            $table_name = 'tra_gvp_applications';
        }

        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('par_gvpinspection_activities as t8', 't1.gvp_activities_id', '=', 't8.id')
                ->leftJoin('assigned_gvpinspections as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->leftjoin('par_countries as t14', 't2.country_id', '=', 't14.id')
                ->leftJoin('par_regions as t15', 't2.region_id', '=', 't15.id')
                
                ->leftJoin('gvp_inspectionteam_details as t16', 't9.inspection_id', '=', 't16.id')
                ->leftJoin('tra_gvp_inspection_dates as t17', 't1.application_code', '=', 't17.application_code')
                ->leftJoin('gvp_inspectorsdetails as t18', 't9.inspection_id', '=', 't18.inspection_id')
                ->leftJoin('users as t19', 't18.inspector_id', '=', 't19.id')
                ->leftJoin('par_inspectors_roles as t20', 't18.role_id', '=', 't20.id')
                ->select('t1.*','t2.id as premise_id','t2.name as premise_name','t2.name as site_name','t3.name as applicant_name','t4.name as application_status','t14.name as country_name','t15.name as region_name','t8.name as inspection_type','t6.name as approval_status','t5.decision_id','t1.id as active_application_id','t7.name as gvp_type_txt','t9.inspection_id',DB::raw("CONCAT(t16.inspectionteam_name,':Travel Date(',CONCAT_WS('& return date ', DATE_FORMAT(t16.travel_date,'%d/%m/%Y'), DATE_FORMAT(t16.return_date, '%d/%m/%Y')),'), Inspectors:',(SELECT GROUP_CONCAT(CONCAT(CONCAT_WS(' ', decrypt(first_name), decrypt(last_name)), '-', name)SEPARATOR ',') FROM gvp_inspectorsdetails k LEFT JOIN users l ON k.inspector_id = l.id  LEFT JOIN par_inspectors_roles as f ON k.role_id = f.id WHERE inspection_id = t9.inspection_id)) as inspection_details"),'t17.end_date','t17.start_date','t17.inspection_days','t17.client_rejection_reason','t17.client_preferred_start_date')

                ->groupBy('t1.id')
                ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0));

            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }


            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($country_id) && $country_id != '') {
                $qry->where('t2.country_id', $country_id);
            }
            if (isset($region_id) && $region_id != '') {
                $qry->where('t2.region_id', $region_id);
            }
            if (isset($inspection_type_id) && $inspection_type_id != '') {
                $inspection_type_id = explode(',',$inspection_type_id);
                $qry->whereIn('t1.inspection_type_id', $inspection_type_id);
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

    public function getGvpInspectionSchedulingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $inspection_type_id = $request->input('inspection_type_id');
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('par_gvp_inspection_types as t8', 't1.inspection_type_id', '=', 't8.id')
                ->leftJoin('assigned_gvpinspections as t9', function ($join) use ($inspection_id) {
                    $join->on('t1.application_code', '=', 't9.application_code');
                    //->where('t9.inspection_id', $inspection_id);
                })
                ->leftJoin('gvp_inspectionteam_details as t10', 't9.inspection_id', '=', 't10.id')
                ->join('tra_submissions as t11', 't1.application_code', '=', 't11.application_code')
            
                ->leftjoin('par_countries as t14', 't2.country_id', '=', 't14.id')
                ->leftJoin('par_regions as t15', 't2.region_id', '=', 't15.id')
                ->leftJoin('tra_gvp_inspection_dates as t16', 't1.application_code', '=', 't16.application_code')
                ->select(DB::raw("t1.*, t2.id as premise_id, t2.name as premise_name, t3.name as applicant_name, t4.name as application_status,t9.inspection_id,
                      t10.inspectionteam_name, t8.name as inspection_type, t6.name as approval_status, t5.decision_id, t1.id as active_application_id, t7.name as gvp_type_txt,t14.name as country_name,t15.name as region_name,
                      CONCAT(t10.inspectionteam_name,':Travel Date(',CONCAT_WS('& return date ',DATE_FORMAT(t10.travel_date,'%d/%m/%Y'),DATE_FORMAT(t10.return_date,'%d/%m/%Y')),')') as inspection_details, t16.end_date,t16.start_date,t16.inspection_days,t10.id as assigned_inspection_id"))
                      ->groupBy('t1.id')
                     ->where(array('t11.current_stage'=> $workflow_stage,'isDone'=>0));
               
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($inspection_type_id) && $inspection_type_id != '') {
                $qry->where('t1.inspection_type_id', $inspection_type_id);
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

    public function getManagerInspectionApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $inspection_type_id = $request->input('inspection_type_id');
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('par_gvp_inspection_types as t8', 't1.inspection_type_id', '=', 't8.id')
                ->leftJoin('assigned_gvpinspections as t9', function ($join) use ($inspection_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.inspection_id', $inspection_id);
                })
                ->leftJoin('gvp_inspectionteam_details as t10', 't9.inspection_id', '=', 't10.id')
                ->leftJoin('tra_submissions as t11', 't1.application_code', '=', 't11.application_code')
                ->leftjoin('par_countries as t14', 't2.country_id', '=', 't14.id')
                ->leftJoin('par_regions as t15', 't2.region_id', '=', 't15.id')
                ->leftJoin('tra_gvp_inspection_dates as t16', 't1.application_code', '=', 't16.application_code')
                ->select('t1.*','t2.name as gvp_site','t3.name as applicant_name','t4.name as application_status','t10.inspectionteam_name','t8.name as inspection_type','t6.name as approval_status','t5.decision_id','t1.id as active_application_id','t7.name as gvp_type_txt','t14.name as country_name','t15.name as region_name',DB::raw('CONCAT(t10.inspectionteam_name, ": Travel Date(", CONCAT_WS("& return date ", DATE_FORMAT(t10.travel_date,"%d/%m/%Y"), DATE_FORMAT(t10.return_date,"%d/%m/%Y")), ")") as inspection_details'), 't16.end_date','t16.start_date','t16.inspection_days')
          
                     ->where(array('t11.current_stage'=> $workflow_stage,'isDone'=>0))
                     ->groupBy('t1.id');


               
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($inspection_type_id) && $inspection_type_id != '') {
                $qry->where('t1.inspection_type_id', $inspection_type_id);
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
    public function getTCMeetingSchedulingReviewApplications(Request $request){
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $inspection_type_id = $request->input('inspection_type_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })

                
               ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
            ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('par_gvp_inspection_types as t8', 't1.inspection_type_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', 't1.application_code', '=', 't9.application_code')
                
                ->leftJoin('tra_inspection_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->leftJoin('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')

                ->leftJoin('tra_submissions as t16', 't1.application_code', '=', 't16.application_code')
                ->select('t1.*', 't2.id as premise_id', 't2.name as gvp_site_name', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id',    't1.id as active_application_id', 't7.name as gvp_type_txt',  't15.name as tc_recomm', 't12.name as inspection_recommendation','t14.decision_id','t8.name as inspection_type', 't6.name as approval_status')
                   
                
                     ->where(array('t16.current_stage'=> $workflow_stage,'isDone'=>0));
               
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($inspection_type_id) && $inspection_type_id != '') {
                $qry->where('t1.inspection_type_id', $inspection_type_id);
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
    public function getTCMeetingSchedulingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $inspection_type_id = $request->input('inspection_type_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('par_gvp_inspection_types as t8', 't1.inspection_type_id', '=', 't8.id')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
               ->leftjoin('par_countries as t14', 't2.country_id', '=', 't14.id')
                ->leftJoin('par_regions as t15', 't2.region_id', '=', 't15.id')
                ->leftJoin('tra_gvp_inspection_dates as t16', 't1.application_code', '=', 't16.application_code')
          
                ->select('t1.*', 't2.id as premise_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't8.name as inspection_type', 't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id', 't7.name as gvp_type_txt',DB::raw("t14.name as country_name,t15.name as region_name,
                    t16.end_date,t16.start_date,t16.inspection_days,t10.id as assigned_inspection_id"))
                ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0) );
                /*
                ->whereNotIn('t1.application_code', function ($query) use ($table_name, $workflow_stage, $meeting_id) {
                    $query->select(DB::raw('t8.application_code'))
                        ->from('tc_meeting_applications as t8')
                        ->join($table_name . ' as t9', 't8.application_code', '=', 't9.application_code')
                        ->join('tra_submissions as t11', 't8.application_code', '=', 't11.application_code')
                        ->where('t11.current_stage', $workflow_stage)
                        ->where('t8.meeting_id', '<>', $meeting_id);
                });*/
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($inspection_type_id) && $inspection_type_id != '') {
                $qry->where('t1.inspection_type_id', $inspection_type_id);
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

    public function getGvpApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftjoin('par_system_statuses as t4', function ($join) {//should be inner
                    $join->on('t1.application_status_id', '=', 't4.id');
                    //->on('t1.process_id', '=', 't4.process_id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_gvpapproval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->leftJoin('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->leftJoin('par_gvplocation_details as t9', 't1.gvp_type_id', '=', 't9.id')
                ->join('tra_submissions as t10', 't1.application_code','t10.application_code')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't2.id as premise_id', 't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.id as recommendation_id', 't6.name as recommendation',
                    't9.name as gvp_type_txt')
                ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0));
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
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

    public function getGvpWithdrawalApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftjoin('par_system_statuses as t4', function ($join) {//should be inner
                    $join->on('t1.application_status_id', '=', 't4.id');
                    //->on('t1.process_id', '=', 't4.process_id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->leftJoin('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->leftJoin('par_gvplocation_details as t9', 't1.gvp_type_id', '=', 't9.id')
                ->join('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't2.id as premise_id', 't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.id as recommendation_id', 't6.name as recommendation',
                    't9.name as gvp_type_txt')
                 ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0));
                //->where('t1.workflow_stage_id', $workflow_stage);
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
            }
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->withdrawal_reasons = _withdrawalReasons($result->application_code);
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

    public function getGvpApplicationsForInspection(Request $request)
    {
        $table_name = $request->input('table_name');
        $inspection_id = $request->input('inspection_id');
        $section_id = $request->input('section_id');
        $gvp_type_id = $request->input('gvp_type_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->join('sub_modules as t5', 't1.sub_module_id', '=', 't5.id')
                ->leftJoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftJoin('assigned_gvpinspections as t8', 't1.application_code', '=', 't8.application_code')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->select('t1.*', 't2.id as premise_id', 't2.name as premise_name', 't3.name as applicant_name', 't4.name as application_status',
                    't1.id as active_application_id', 't7.name as gvp_type_txt', 't5.name as sub_module_name')
                ->whereIn('t10.current_stage', array(120, 121, 130, 131))
                ->whereNull('t8.id');
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            if (isset($gvp_type_id) && $gvp_type_id != '') {
                $qry->where('t1.gvp_type_id', $gvp_type_id);
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

    

    public function saveNewGvpReceivingBaseDetails(Request $request)
    {
        $gvp_type_id = $request->input('gvp_type_id');
        return $this->saveNewDomesticReceivingBaseDetails($request);
    }

    public function saveNewDomesticReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $assessment_type_id = $request->input('assessment_type_id');
        $gvp_site_id = $request->input('gvp_site_id');
        $applicant_id = $request->input('applicant_id');
        $ltr_id = $request->input('ltr_id');
        $applicant_as_ltr = $request->input('applicant_as_ltr');
        $billing_person_id = $request->input('billing_person_id');
        $applicant_as_billingperson = $request->input('applicant_as_billingperson');
        $applicant_contact_person = $request->input('applicant_contact_person');
        $contact_person_id = $request->input('contact_person_id');
        $contact_person_startdate = $request->input('contact_person_startdate');
        $contact_person_enddate = $request->input('contact_person_enddate');
        $process_id = $request->input('process_id');
        $section_id = $request->input('section_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $gvp_activities_id = $request->input('gvp_activities_id');
        $region_id = $request->input('region_id');
        $country_id = $request->input('country_id');
        $gvp_region_code=''; 
        $user_id = $this->user_id;
        $zone_id = getZoneIdFromRegion($region_id);


        try {
            //par_man_sites can be used to fetch a list of manufacturing sites
            $manufacturing_site_table = 'tra_gvp_sites';
            $contractmanufacturing_activity_table = 'tra_gvp_contractmanufacturing_sites';
            $applications_table = 'tra_gvp_applications';

            $where_gvp_site = array(
                'id' => $gvp_site_id
            );
            $where_app = array(
                'id' => $application_id
            );

            if (isset($application_id) && $application_id != "") {//Edit
                $where_gvp_site = array(
                    'id' => $gvp_site_id
                );
                //Application_edit

                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'gvp_type_id' => $gvp_type_id,
                    'gvp_site_id' => $gvp_site_id,
                    'zone_id' => $zone_id,
                    'applicant_as_ltr' => $applicant_as_ltr,
                    'ltr_id' => $ltr_id,
                    'applicant_as_billingperson' => $applicant_as_billingperson,
                    'billing_person_id' => $billing_person_id,
                    'applicant_as_contact_person' => $applicant_contact_person,
                    'contact_person_id' => $contact_person_id,
                    'assessment_type_id' => $assessment_type_id,
                    'gvp_type_id' => $gvp_type_id,
                    'gvp_activities_id' => $gvp_activities_id,
                );
                $app_details = array();

                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res= updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                }
                $application_code = $app_details[0]['application_code'];
                $tracking_no = $app_details[0]['tracking_no'];
                
                
                // $previous_data = getPreviousRecords($manufacturing_site_table, $where_gvp_site);
                // if ($previous_data['success'] == false) {
                //     echo json_encode($previous_data);
                //     exit();
                // }
                // $previous_data = $previous_data['results'];
                // $res = updateRecord($manufacturing_site_table, $previous_data, $where_gvp_site, $gvp_site_params, $user_id);


            } else {        
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $gvp_code = getSingleRecordColValue('par_gvplocation_details', array('id' => $gvp_type_id), 'location_code');
                $gvp_location = DB::table('par_countries as t1')
                ->join('par_gvpcountries_regions as t2', 't1.gvpcountries_region_id', 't2.id')
                ->select('t2.code')
                ->where(array('t1.id'=>$country_id))
                 ->first();
                if ($gvp_location) {
                  $gvp_region_code = $gvp_location->code;
                }
       
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'gvp_type' => $gvp_code,
                    'gvp_region_code' => $gvp_region_code
                );
                $view_id = generateApplicationViewID();
                
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];

                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'view_id' => $view_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'gvp_type_id' => $gvp_type_id,
                    'zone_id' => $zone_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'gvp_site_id' => $gvp_site_id,
                    'assessment_type_id' => $assessment_type_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'tracking_no' => $tracking_no,
                    'application_status_id' => $application_status->status_id,
                    'ltr_id' => $ltr_id,
                    'billing_person_id' => $billing_person_id,
                    'contact_person_id' => $contact_person_id,
                    'assessment_type_id' => $assessment_type_id,
                    'applicant_as_ltr' => $applicant_as_ltr,
                    'applicant_as_billingperson' => $applicant_as_billingperson,
                    'applicant_as_contact_person' => $applicant_contact_person,
                    'gvp_type_id' => $gvp_type_id,
                    'gvp_activities_id' => $gvp_activities_id,
                );
                $res = insertRecord($applications_table, $application_params, $user_id);
                if ($res['success'] == false) {
                    return $res;
                }
                $application_id = $res['record_id'];
          
              //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
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
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['gvp_site_id'] = $gvp_site_id;
            $res['tracking_no'] = $tracking_no;
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

    public function getIndexGvpContractManufacturerDetails(Request $r){
        $id = $r->input('gvp_site_id');
        try{
            $res = Db::table('tra_gvp_sites as t1')
                ->where('t1.id', $id)
                ->select('t1.name as contract_manufacturer_name', 't1.physical_address as contract_physical_address',
                          't1.country_id as contract_country_id', 't1.region_id as contract_region_id',
                            't1.contact_person as contract_personnel_name', 't1.telephone_no as contract_telephone_no',
                            't1.email  as contract_email_address' )
                ->first(); 
            
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


    public function deleteGvpUnnestedData(Request $r){
        $table_name = $r->input('table_name');
        $id = $r->input('id');
        $user_id = \Auth::user()->id;
        try{
            
            $where = array(
                'id' => $id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);

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

    public function getGvpContractManufacturerDetails(Request $r){
        $application_code = $r->input('application_code');

        try{

        $res = Db::table('tra_gvp_contractmanufacturing_sites as t1')
            ->leftJoin('tra_gvp_sites as t2', 't1.man_site_id', '=', 't2.id')

            ->leftJoin('par_countries as t3', 't2.country_id', '=', 't3.id')
            ->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
            ->leftJoin('par_gvpinspection_activities as t5', 't1.gvp_activity_id', '=', 't5.id')
            ->leftJoin('par_gvp_contractdetails as t6', 't1.contracted_or_contractor_id', '=', 't6.id')
            ->where('t1.application_code', $application_code)
            ->select('t1.*', 't1.man_site_id as gvp_site_id', 't2.name as gvp_site_name', 't3.name as country', 't4.name as region', 't5.name as gvp_activity', 't6.name as contract_activity')
            ->get();

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

    public function saveGvpSitesContractManufacturers(Request $r)
    {
        $application_code = $r->input('application_code');
        $man_site_id = $r->input('man_site_id');
        $gvp_activity_id = $r->input('gvp_activity_id');
        $contracted_or_contractor_id = $r->input('contracted_or_contractor_id');
        $id = $r->input('cmd_id');

        $user_id = $this->user_id;
        $contractmanufacturing_table = 'tra_gvp_contractmanufacturing_sites';
        
        $contracted_manufacturer_params = array(
            'application_code' => $application_code,
            'man_site_id' => $man_site_id,
            'gvp_activity_id'=> $gvp_activity_id,
            'contracted_or_contractor_id'=> $contracted_or_contractor_id,
        );
            try{

            if($id){
                $where_id = array(
                    'id'=> $id,
                );

                if (recordExists($contractmanufacturing_table, $where_id)) {

                    $contractmanufacturer_details = getPreviousRecords($contractmanufacturing_table, $where_id);
                    if ($contractmanufacturer_details['success'] == false) {
                        return $contractmanufacturer_details;
                    }
                    $contractmanufacturer_details = $contractmanufacturer_details['results'];
                    $res = updateRecord($contractmanufacturing_table, $contractmanufacturer_details, $where_id, $contracted_manufacturer_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                    $res = array(
                    'success' => true,
                    'results' => $res,
                    'message' => 'Data updated successfully!'
                    );
                }
                
            }else{
                $res = insertRecord($contractmanufacturing_table, $contracted_manufacturer_params, $user_id);
                if ($res['success'] == false) {
                    return $res;
                }
                $res = array(
                    'success' => true,
                    'results' => $res,
                    'message' => 'Data saved successfully!'
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


    public function saveNewOverseaReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $site_id = $request->input('manufacturing_site_id');
        $manufacturer_id = $request->input('manufacturer_id');
        $applicant_id = $request->input('applicant_id');
        $ltr_id = $request->input('ltr_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        $assessment_type_id = $request->input('assessment_type_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $zone_id = getHQZoneId();
        $user_id = $this->user_id;
        $site_params = array(
            'name' => $request->input('name'),
            'applicant_id' => $applicant_id,
            'section_id' => $section_id,
            'manufacturer_id' => $manufacturer_id,
            'ltr_id' => $ltr_id,
            'gvp_type_id' => $gvp_type_id,
            'country_id' => $request->input('country_id'),
            'region_id' => $request->input('region_id'),
            'district_id' => $request->input('district_id'),
            'street' => $request->input('street'),
            'telephone' => $request->input('telephone'),
            'fax' => $request->input('fax'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'physical_address' => $request->input('physical_address'),
            'postal_address' => $request->input('postal_address'),
            'business_scale_id' => $request->input('business_scale_id'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude')
        );
        try {
            $site_table = 'tra_manufacturing_sites';
            $applications_table = 'tra_gvp_applications';

            $where_site = array(
                'id' => $site_id
            );
            $where_app = array(
                'id' => $application_id
            );
            //$portal_applicant_id = getSingleRecordColValue('wb_trader_account', array('id' => $applicant_id), 'portal_id');
            if (isset($application_id) && $application_id != "") {//Edit
                //Application_edit
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'gvp_type_id' => $gvp_type_id,
                    'zone_id' => $zone_id,
                    'assessment_type_id' => $assessment_type_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($app_res['success'] == false) {
                        return $app_res;
                    }
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;
                //Premise_edit
                if (recordExists($site_table, $where_site)) {
                    $site_params['dola'] = Carbon::now();
                    $site_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($site_table, $where_site);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($site_table, $previous_data, $where_site, $site_params, $user_id);
                    //update portal also
                    /* unset($site_params['created_by']);
                     unset($site_params['created_on']);
                     unset($site_params['dola']);
                     unset($site_params['altered_by']);
                     $premise_params['mis_dola'] = Carbon::now();
                     $premise_params['mis_altered_by'] = $user_id;
                     $premise_params['applicant_id'] = $portal_applicant_id;
                     $portal_premise_id = getSingleRecordColValue('tra_premises', $where_premise, 'portal_id');
                     $portal_db = DB::connection('portal_db');
                     $portal_db->table('wb_premises')
                         ->where('id', $portal_premise_id)
                         ->update($premise_params);*/
                }
            } else {//Create
                //Premise_create
                $site_res = insertRecord($site_table, $site_params, $user_id);
                if ($site_res['success'] == false) {
                    return \response()->json($site_res);
                }
                $site_id = $site_res['record_id'];
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $gvp_code = getSingleRecordColValue('par_gvplocation_details', array('id' => $gvp_type_id), 'location_code');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'gvp_type' => $gvp_code
                );
                $view_id = generateApplicationViewID();
                $ref_number = generatePremiseRefNumber(9, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'view_id' => $view_id,
                    'assessment_type_id' => $assessment_type_id,
                    'module_id' => $module_id,
                    'gvp_type_id' => $gvp_type_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'zone_id' => $zone_id,
                    'manufacturing_site_id' => $site_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'reference_no' => $ref_number,
                    'application_status_id' => $application_status->status_id
                );
                $res = insertRecord($applications_table, $application_params, $user_id);
                $application_id = $res['record_id'];

                //insert registration table
                $reg_params = array(
                    'tra_site_id' => $site_id,
                    'status_id' => 1,
                    'created_by' => $user_id
                );
                createInitialRegistrationRecord('registered_manufacturing_sites', $applications_table, $reg_params, $application_id, 'reg_site_id');
                //DMS
                initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $user_id);
                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_number,
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
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['premise_id'] = $site_id;
            $res['ref_no'] = $ref_number;
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

    public function saveRenewalGvpReceivingBaseDetails(Request $request)
    {
        try {
            $res = array();
            DB::transaction(function () use ($request, &$res) {
                $application_id = $request->input('application_id');
                $registered_manufacturing_site_id = $request->input('registered_manufacturing_site_id');
                $init_site_id = $request->input('manufacturing_site_id');
                $applicant_id = $request->input('applicant_id');
                $ltr_id = $request->input('ltr_id');
                $billing_person_id = $request->input('billing_person_id');
                $applicant_as_billingperson = $request->input('applicant_as_billingperson');
                $contract_manufacturing_id = $request->input('contract_manufacturing_id');
                $applicant_as_ltr = $request->input('applicant_as_ltr');
                $applicant_contact_person = $request->input('applicant_contact_person');
                $contact_person_id = $request->input('contact_person_id');
                $contact_person_startdate = $request->input('contact_person_startdate');
                $contact_person_enddate = $request->input('contact_person_enddate');

                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $section_id = $request->input('section_id');
                $module_id = $request->input('module_id');
                $sub_module_id = $request->input('sub_module_id');
                $gvp_type_id = $request->input('gvp_type_id');
                $region_id = $request->input('region_id');
                $device_type_id = $request->input('device_type_id');
                $assessment_type_id = $request->input('assessment_type_id');
                $country_id= $request->input('country_id');
                $user_id = $this->user_id;
                if ($gvp_type_id == 1) {//oversea
                    $zone_id = getHQZoneId();
                } else {
                    $zone_id = getZoneIdFromRegion($region_id);
                }
                $site_table = 'tra_manufacturing_sites';
                $applications_table = 'tra_gvp_applications';

                $where_site = array(
                    'id' => $init_site_id
                );
                $where_app = array(
                    'id' => $application_id
                );
                $portal_applicant_id = getSingleRecordColValue('wb_trader_account', array('id' => $applicant_id), 'portal_id');
                if (isset($application_id) && $application_id != "") {//Edit
                    $site_id = $init_site_id;
                    //Application_edit
                    $application_params = array(
                        'applicant_id' => $applicant_id,
                        'gvp_type_id' => $gvp_type_id,
                        'manufacturing_site_id' => $site_id,
                        'zone_id' => $zone_id,
                        'assessment_type_id' => $assessment_type_id,
                        'device_type_id' => $device_type_id,
                        'reg_site_id' => $registered_manufacturing_site_id
                    );
                    $app_details = array();
                    if (recordExists($applications_table, $where_app)) {
                        //$app_details = getTableData($applications_table, $where_app);
                        $app_details = getPreviousRecords($applications_table, $where_app);
                        if ($app_details['success'] == false) {
                            return $app_details;
                        }
                        $app_details = $app_details['results'];
                        $app_res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                        if ($app_res['success'] == false) {
                            return $app_res;
                        }
                    }
                    $application_code = $app_details[0]['application_code'];
                    $tracking_no = $app_details[0]['tracking_no'];
                    //Site edit
                    $site_params = array(
                         'name' => $request->input('name'),
                          'applicant_id' => $applicant_id,
                          'country_id' => $request->input('country_id'),
                          'region_id' => $request->input('region_id'),
                          'district_id' => $request->input('district_id'),
                          'street' => $request->input('street'),
                          'telephone' => $request->input('telephone'),
                          'fax' => $request->input('fax'),
                          'email' => $request->input('email'),
                          'website' => $request->input('website'),
                          'physical_address' => $request->input('physical_address'),
                          'postal_address' => $request->input('postal_address'),
                          'business_scale_id' => $request->input('business_scale_id'),
                          'longitude' => $request->input('longitude'),
                          'latitude' => $request->input('latitude'),
                          'inspection_activities_id' => $request->input('inspection_activities_id'),
                          'intermediate_manufacturing_activity_id' => $request->input('intermediate_manufacturing_activity_id'),
                          'business_type_id' => $request->input('business_type_id'),
                          'dola' => Carbon::now(),
                          'altered_by' => $user_id,
                          'applicant_as_ltr' => $applicant_as_ltr,
                          'ltr_id' => $ltr_id,
                          'applicant_as_billingperson' => $applicant_as_billingperson,
                          'billing_person_id' => $billing_person_id,
                          'applicant_contact_person' => $applicant_contact_person,
                          'contact_person_id' => $contact_person_id,
                          'contract_manufacturing_id' => $contract_manufacturing_id,
                          'contact_person_startdate' => $contact_person_startdate,
                          'contact_person_enddate' => $contact_person_enddate
                         
                    );
                    if (recordExists($site_table, $where_site)) {//just to make sure record exists
                        $previous_data = getPreviousRecords($site_table, $where_site);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $res = updateRecord($site_table, $previous_data, $where_site, $site_params, $user_id);
                        //update portal also
                        unset($site_params['created_by']);
                        unset($site_params['created_on']);
                        unset($site_params['dola']);
                        unset($site_params['altered_by']);
                        $site_params['mis_dola'] = Carbon::now();
                        $site_params['mis_altered_by'] = $user_id;
                        $site_params['applicant_id'] = $portal_applicant_id;
                        $portal_site_id = getSingleRecordColValue('tra_manufacturing_sites', $where_site, 'portal_id');
                        $portal_db = DB::connection('portal_db');
                        /* $portal_db->table('wb_manufacturing_sites')
                             ->where('id', $portal_site_id)
                             ->update($site_params);*/
                    }
                } else {//Create
                    $anyOngoingApps = checkForOngoingApplications($registered_manufacturing_site_id, $applications_table, 'reg_site_id', $process_id);
                    if ($anyOngoingApps['exists'] == true) {
                        $res = array(
                            'success' => false,
                            'message' => 'There is an ongoing application of the same nature on the selected manufacturing site with tracking number ' . $anyOngoingApps['tracking_no']
                        );
                        return \response()->json($res);
                    }
                    $init_site_params = getTableData($site_table, $where_site);
                    if (is_null($init_site_params)) {
                        $res = array(
                            'success' => false,
                            'message' => 'Problem encountered while fetching target site details!!'
                        );
                        return \response()->json($res);
                    }
                    $site_params = convertStdClassObjToArray($init_site_params);
                    //Manufacturing site create
                    $site_params['manufacturer_id'] = $init_site_id;
                    unset($site_params['id']);
                    $site_res = insertRecord($site_table, $site_params, $user_id);
                    if ($site_res['success'] == false) {
                        echo json_encode($site_res);
                        exit();
                    }
                    $site_id = $site_res['record_id'];
                    //copy site personnel details, business details, site blocks and product line and gvp products details
                    $init_personnelDetails = DB::table('tra_manufacturing_sites_personnel as t1')
                        ->select(DB::raw("t1.personnel_id,t1.position_id,t1.qualification_id,t1.registration_no,t1.portal_id,t1.status_id,t1.study_field_id,
                           t1.institution,t1.start_date,t1.end_date,$user_id as created_by,t1.manufacturing_site_id as init_site_id,$site_id as manufacturing_site_id"))
                        ->where('manufacturing_site_id', $init_site_id)
                        ->get();
                    $init_personnelDetails = convertStdClassObjToArray($init_personnelDetails);
                    $init_businessDetails = DB::table('tra_mansite_otherdetails as t2')
                        ->select(DB::raw("t2.business_type_id,t2.business_type_detail_id,t2.portal_id,
                           $user_id as created_by,t2.manufacturing_site_id as init_site_id,$site_id as manufacturing_site_id"))
                        ->where('manufacturing_site_id', $init_site_id)
                        ->get();
                    $init_businessDetails = convertStdClassObjToArray($init_businessDetails);



                     DB::table('tra_manufacturing_sites_blocks')
                        ->where('manufacturing_site_id', $site_id)
                        ->delete();

                    $init_blockDetails = DB::table('tra_manufacturing_sites_blocks')
                        ->where('manufacturing_site_id', $init_site_id)
                        ->get();

                    foreach ($init_blockDetails as $init_blockDetail) {
                        $data = get_object_vars($init_blockDetail);
                        $init_site_id = $data['manufacturing_site_id'];
                        $init_block_id = $data['id'];
                        unset($data['manufacturing_site_id']);
                        unset($data['id']);
                        unset($data['init_site_id']);
                        unset($data['created_by']);
                        unset($data['created_on']);
                        unset($data['altered_by']);
                        unset($data['dola']);
                        unset($data['portal_id']);
                        $data['manufacturing_site_id'] = $site_id;
                        $data['created_by'] = $user_id;
                        $data['init_site_id'] = $init_site_id;
                        $block_id=DB::table('tra_manufacturing_sites_blocks')->insertGetId($data);

                        DB::table('gvp_productline_details')
                        ->where('manufacturingsite_block_id', $block_id)
                        ->delete();

                       $init_productLineDetails = DB::table('gvp_productline_details')
                        ->where('manufacturingsite_block_id', $init_block_id)
                        ->get();

                         foreach ($init_productLineDetails as $init_productLineDetail) {
                            $data = get_object_vars($init_productLineDetail);
                            $init_site_id = $data['manufacturing_site_id'];
                            $init_gvp_productline_id = $data['id'];
                            unset($data['manufacturingsite_block_id']);
                            unset($data['id']);
                            unset($data['init_site_id']);
                            unset($data['created_by']);
                            unset($data['created_on']);
                            unset($data['altered_by']);
                            unset($data['dola']);
                            unset($data['portal_id']);
                            $data['manufacturing_site_id'] = $site_id;
                            $data['manufacturingsite_block_id'] = $block_id;
                            $data['created_by'] = $user_id;
                            $data['init_site_id'] = $init_site_id;
                            $gvp_productline_id=DB::table('gvp_productline_details')->insertGetId($data);

                           
                           DB::table('tra_product_gvpinspectiondetails')
                            ->where('gvp_productline_id', $gvp_productline_id)
                            ->delete();

                           $init_gvpProductDetails = DB::table('tra_product_gvpinspectiondetails')
                            ->where('gvp_productline_id', $init_gvp_productline_id)
                            ->get();

                              foreach ($init_gvpProductDetails as $init_gvpProductDetail) {
                                  $data = get_object_vars($init_gvpProductDetail);
                                  $init_site_id = $data['manufacturing_site_id'];
                                  unset($data['gvp_productline_id']);
                                  unset($data['id']);
                                  unset($data['init_site_id']);
                                  unset($data['created_by']);
                                  unset($data['created_on']);
                                  unset($data['altered_by']);
                                  unset($data['status_id']);
                                  unset($data['dola']);
                                  unset($data['portal_id']);
                                  $data['manufacturing_site_id'] = $site_id;
                                  $data['gvp_productline_id'] = $gvp_productline_id;
                                  $data['created_by'] = $user_id;
                                  $data['init_site_id'] = $init_site_id;
                                  $gvp_productinspection_id=DB::table('tra_product_gvpinspectiondetails')->insertGetId($data);

                          }
                      }
                    }



                    DB::table('tra_manufacturing_sites_personnel')
                        ->insert($init_personnelDetails);
                    DB::table('tra_mansite_otherdetails')
                        ->insert($init_businessDetails);
                    //Applcation_create
                    $appCodeDetails = array(
                        'section_id' => $section_id,
                        'zone_id' => $zone_id,
                        'gvp_type_id' => $gvp_type_id,
                        'country_id' => $country_id,
                        'reg_site_id' => $registered_manufacturing_site_id
                    );

                    $appCodeDetails = (object)$appCodeDetails;
                    $counter_details = $this->getGvpApplicationTrackingCodes($sub_module_id, $appCodeDetails, $applications_table);

                   

             
                    $counter = $counter_details['alt_count'];

                     $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                    $gvp_code = getSingleRecordColValue('par_gvplocation_details', array('id' => $gvp_type_id), 'location_code');

                    $gvp_location = DB::table('par_countries as t1')
                      ->join('par_gvpcountries_regions as t2', 't1.gvpcountries_region_id', 't2.id')
                      ->select('t2.code')
                      ->where(array('t1.id'=>$country_id))
                       ->first();
                      if ($gvp_location) {
                        $gvp_region_code = $gvp_location->code;
                      }
             
                      $codes_array = array(
                          'section_code' => $section_code,
                          'zone_code' => $zone_code,
                          'gvp_type' => $gvp_code,
                          'gvp_region_code' => $gvp_region_code
                      );
                  
                    $view_id = generateApplicationViewID();
                    // $ref_number = generatePremiseRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                    $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                    if ($tracking_details['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    
                    $tracking_no = $tracking_details['tracking_no'].'/R'.$counter;

                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                    $application_params = array(
                        'applicant_id' => $applicant_id,
                        'view_id' => $view_id,
                        'module_id' => $module_id,
                        'sub_module_id' => $sub_module_id,
                        'section_id' => $section_id,
                        'application_code' => $application_code,
                        'zone_id' => $zone_id,
                        'manufacturing_site_id' => $site_id,
                        'reg_site_id' => $registered_manufacturing_site_id,
                        'gvp_type_id' => $gvp_type_id,
                        'assessment_type_id' => $assessment_type_id,
                        'device_type_id' => $device_type_id,
                        'process_id' => $process_id,
                        'workflow_stage_id' => $workflow_stage_id,
                        'tracking_no' => $tracking_no,
                        'application_status_id' => $application_status->status_id
                    );
                    $res = insertRecord($applications_table, $application_params, $user_id);
                    if ($res['success'] == false) {
                        echo json_encode($res);
                        exit();
                    }
                    $application_id = $res['record_id'];
                    //DMS
                   // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);
                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $application_id,
                        'view_id' => $view_id,
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
                    DB::table('tra_submissions')
                        ->insert($submission_params);
                }
                $res['record_id'] = $application_id;
                $res['application_code'] = $application_code;
                $res['manufacturing_site_id'] = $site_id;//should be manufacturing site
                $res['tracking_no'] = $tracking_no;
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
        return \response()->json($res);
    }

    public function prepareNewGvpOnlineReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');

            $main_qry = $portal_db->table('wb_gmp_applications as t1')
                ->join('wb_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->where('t1.id', $application_id);

            $qry = clone $main_qry;
            $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.name as app_status');
            $results = $qry->first();
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
            //Manufacturer details
            $manufacturer_details = getTableData('tra_manufacturers_information', array('id' => $results->manufacturer_id));
            if (!is_null($manufacturer_details)) {
                $results->manufacturer_name = $manufacturer_details->name;
                $results->manufacturer_email_address = $manufacturer_details->email_address;
                $results->manufacturer_physical_address = $manufacturer_details->physical_address;
                $results->manufacturer_country_id = $manufacturer_details->country_id;
            }
            $qry2 = clone $main_qry;
            $qry2->leftJoin('wb_premises as t3', 't2.ltr_id', '=', 't3.id')
                ->leftJoin('wb_premises_applications as t3a', 't3.id', '=', 't3a.premise_id')
               // ->Join('tra_approval_recommendations as t3b', 't3a.application_code', '=', 't3b.application_code')
                ->select('t3.id as ltr_id','t3.name as ltr_name','t3.tpin_no as ltr_tin_no', 't3.physical_address as link_physical_address');
            $ltrDetails = $qry2->first();

            $contactDetails = getTableData('tra_personnel_information', array('id' => $results->contact_person_id));
            $contactPersonDetails = array(
                'applicant_contact_person' => $results->applicant_contact_person,
                'start_date' => $results->contact_person_startdate,
                'end_date' => $results->contact_person_enddate
            );
            if(!is_null($contactDetails)){
                $contactPersonDetails['contact_name'] = $contactDetails->name;
                $contactPersonDetails['contact_postal_address'] = $contactDetails->postal_address;
                $contactPersonDetails['contact_telephone_no'] = $contactDetails->telephone_no;
                $contactPersonDetails['contact_email_address'] = $contactDetails->email_address;
            }

            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
                'contactPersonDetails' => $contactPersonDetails,
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

    public function getGvpCompareDetails(Request $request)
    {
        $portal_application_id = $request->input('portal_application_id');
        $mis_application_id = $request->input('mis_application_id');
        try {
            $portalDetails = $this->getPortalGvpDetails($portal_application_id);
            $misDetails = $this->getMisGvpDetails($mis_application_id);
            $res = array(
                'success' => true,
                'portalResults' => $portalDetails['results'],
                'portalContactPersonDetails' => $portalDetails['contactPersonDetails'],
                'portalLtrDetails' => $portalDetails['ltrDetails'],
                'misResults' => $misDetails['results'],
                'misContactPersonDetails' => $misDetails['contactPersonDetails'],
                'misLtrDetails' => $misDetails['ltrDetails'],
                'message' => 'Details fetched successfully!!'
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

    public function getPortalGvpDetails($application_id)
    {
        $portal_db = DB::connection('portal_db');

        $main_qry = $portal_db->table('wb_gmp_applications as t1')
            ->join('wb_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
            ->where('t1.id', $application_id);

        $qry = clone $main_qry;
        $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
            ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                't2.*', 't1.gvp_type_id', 't4.name as app_status');
        $results = $qry->first();
        //Manufacturer details
        $manufacturer_details = getTableData('tra_manufacturers_information', array('id' => $results->manufacturer_id));
        if (!is_null($manufacturer_details)) {
            $results->manufacturer_name = $manufacturer_details->name;
            $results->manufacturer_email_address = $manufacturer_details->email_address;
            $results->manufacturer_physical_address = $manufacturer_details->physical_address;
            $results->manufacturer_country_id = $manufacturer_details->country_id;
        }

        $qry2 = clone $main_qry;
        $qry2->leftJoin('tra_premises as t3', 't2.ltr_id', '=', 't3.id')
                ->leftJoin('tra_premises_applications as t3a', 't3.id', '=', 't3a.premise_id')
                ->Join('tra_approval_recommendations as t3b', 't3a.application_code', '=', 't3b.application_code')
                ->select('t3.id as ltr_id', 't3b.permit_no as link_permit_no','t3.name as ltr_name','t3.tpin_no as ltr_tin_no', 't3.physical_address as link_physical_address','t3.telephone as link_telephone');
        $ltrDetails = $qry2->first();

        $qry3 = DB::table('tra_personnel_information as t3')
            ->select('t3.*', 't3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address')
            ->where('id', $results->contact_person_id);
        $contactPersonDetails = $qry3->first();
        if (!is_null($contactPersonDetails)) {
            $contactPersonDetails->start_date = $results->contact_person_startdate;
            $contactPersonDetails->end_date = $results->contact_person_enddate;
            $contactPersonDetails->applicant_contact_person = $results->applicant_contact_person;
        } else {
            $contactPersonDetails = (object)array(
                'start_date' => $results->contact_person_startdate,
                'end_date' => $results->contact_person_enddate,
                'applicant_contact_person' => $results->applicant_contact_person
            );
        }

        $res = array(
            'results' => $results,
            'ltrDetails' => $ltrDetails,
            'contactPersonDetails' => $contactPersonDetails
        );
        return $res;
    }

    public function getMisGvpDetails($application_id)
    {
        $sharedQry = DB::table('tra_gvp_applications as t1')
            ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
            ->where('t1.id', $application_id);

        $qry = clone $sharedQry;
        $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
            ->join('tra_manufacturers_information as t5', 't2.manufacturer_id', '=', 't5.id')
            ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name', 't2.id as manufacturing_site_id',
                't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                't2.*', 't4.name as app_status', 't5.name as manufacturer_name', 't5.email_address as manufacturer_email_address', 't5.physical_address as manufacturer_physical_address', 't5.country_id as manufacturer_country_id');
        $results = $qry->first();

        $qryLtr = clone $sharedQry;

        $qryLtr->leftJoin('tra_premises as t3', 't1.ltr_id', '=', 't3.id')
                ->leftJoin('tra_premises_applications as t3a', 't3.id', '=', 't3a.premise_id')
                ->Join('tra_approval_recommendations as t3b', 't3a.application_code', '=', 't3b.application_code')
                ->select('t3.id as ltr_id', 't3b.permit_no as link_permit_no','t3.name as ltr_name','t3.tpin_no as ltr_tin_no', 't3.physical_address as link_physical_address','t3.telephone as link_telephone');
        $ltrDetails = $qryLtr->first();


        $qry3 = clone $sharedQry;
        $qry3->leftJoin('tra_personnel_information as t3', 't2.contact_person_id', '=', 't3.id')
            ->select('t3.*', 't2.applicant_contact_person', 't2.contact_person_startdate as start_date', 't2.contact_person_enddate as end_date');
        $contactPersonDetails = $qry3->first();

        $res = array(
            'results' => $results,
            'ltrDetails' => $ltrDetails,
            'contactPersonDetails' => $contactPersonDetails
        );
        return $res;
    }

    public function prepareNewGvpReceivingStage(Request $request)
    {
        //jose here
        $application_id = $request->input('application_id');
        try {
            $main_qry = DB::table('tra_gvp_applications as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->where('t1.id', $application_id);
            
            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->leftJoin('tra_approval_recommendations as t5', 't2.permit_id', '=', 't5.id')
                ->leftJoin('par_gvplocation_details as t6', 't1.gvp_type_id', '=', 't6.id')
                ->leftJoin('tra_manufacturers_information as t7', 't2.manufacturer_id', '=', 't7.id')
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name',
                    't3.name as applicant_name', 't3.contact_person', 't1.reg_site_id as registered_manufacturing_site_id',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't2.id as manufacturing_site_id', 't4.id as invoice_id', 't4.invoice_no', 't5.permit_no', 't5.permit_no as gvp_cert_no', 't6.name as gvp_type_txt', 't1.gvp_type_id',
                    't7.name as manufacturer_name', 't7.email_address as manufacturer_email_address', 't7.physical_address as manufacturer_physical_address', 't7.country_id as manufacturer_country_id');
            $results = $qry1->first();

            $qry2 = clone $main_qry;
            $qry2->leftJoin('tra_premises as t3', 't1.ltr_id', '=', 't3.id')
                ->leftJoin('tra_premises_applications as t4', 't3.id', '=', 't4.premise_id')
                ->select('t3.id as ltr_id', 't3.name as ltr_name', 't3.tpin_no as ltr_tin_no', 't3.country_id as link_country_id','t3.premise_reg_no as link_premise_reg_no','t3.physical_address as link_physical_address','t3.telephone as link_telephone');
            $ltrDetails = $qry2->first();
   
            
            $qry3 = clone $main_qry;
            $qry3->leftJoin('tra_personnel_information as t3', 't1.contact_person_id', '=', 't3.id')
                ->select('t3.*','t3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address',
                    't1.applicant_as_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date');
            $contactPersonDetails = $qry3->first();

            
            $qry5 = clone $main_qry;
            $qry5->leftJoin('tra_personnel_information as t5', 't1.billing_person_id', '=', 't5.id')
                ->select('t1.applicant_as_billingperson', 't5.name as contact_name', 't5.postal_address as contact_postal_address', 't5.telephone_no as contact_telephone_no', 't5.email_address as contact_email_address',
                    't2.billing_person_id');
            $billingPersonDetails = $qry5->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
                'contactPersonDetails' => $contactPersonDetails,
                'billingPersonDetails' => $billingPersonDetails,
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

    public function getGvpApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        $site_id = $request->input('site_id');
        try {
            
            $main_qry = DB::table('tra_gvp_applications as t1')
                ->join('tra_gvp_sites as t2', 't1.gvp_site_id', '=', 't2.id')
                ->where('t1.id', $application_id);
    
            $qry0 = clone $main_qry;
            $qry0->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*', 't1.id as active_application_id', 't2.name as premise_name','t3.name as applicant_name', 't3.contact_person','t1.reg_site_id as registered_manufacturing_site_id',
                't3.tin_no', 't3.country_id as app_country_id','t3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',);

            $applicantDetails = $qry0->first();
            
            $qry1 = clone $main_qry;
                $qry1->leftJoin('tra_approval_recommendations as t5', 't2.permit_id', '=', 't5.id')
                    ->leftJoin('tra_application_invoices as t4', function ($join) {
                        $join->on('t1.id', '=', 't4.application_id')
                            ->on('t4.application_code', '=', 't4.application_code');
                    })
                    ->leftJoin('par_gvplocation_details as t6', 't1.gvp_type_id', '=', 't6.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't2.manufacturer_id', '=', 't7.id')
                    ->select(
                        't1.gvp_activities_id','t2.*', 't2.id as manufacturing_site_id', 't4.id as invoice_id', 't4.invoice_no', 't5.permit_no', 't5.permit_no as gvp_cert_no', 't6.name as gvp_type_txt', 't1.gvp_type_id', 't1.assessment_type_id', 't7.name as manufacturer_name', 't7.email_address as manufacturer_email_address', 't7.physical_address as manufacturer_physical_address', 't7.country_id as manufacturer_country_id');
            $siteDetails = $qry1->first();


            $qry2 = clone $main_qry;
            $qry2->leftJoin('tra_premises as t3', 't1.ltr_id', '=', 't3.id')
                ->leftJoin('tra_premises_applications as t4', 't3.id', '=', 't4.premise_id')
                ->select('t3.id as ltr_id', 't3.name as ltr_name', 't3.tpin_no as ltr_tin_no', 't3.country_id as link_country_id','t3.premise_reg_no as link_premise_reg_no','t3.physical_address as link_physical_address','t3.telephone as link_telephone');
            $ltrDetails = $qry2->first();
   
            
            $qry3 = clone $main_qry;
            $qry3->leftJoin('tra_personnel_information as t3', 't1.contact_person_id', '=', 't3.id')
                ->select('t3.*','t3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address',
                    't1.applicant_as_contact_person', 't1.contact_person_startdate as start_date', 't1.contact_person_enddate as end_date');
            $contactPersonDetails = $qry3->first();

            
            $qry5 = clone $main_qry;
            $qry5->leftJoin('tra_personnel_information as t5', 't1.billing_person_id', '=', 't5.id')
                ->select('t1.applicant_as_billingperson', 't5.name as contact_name', 't5.postal_address as contact_postal_address', 't5.telephone_no as contact_telephone_no', 't5.email_address as contact_email_address',
                    't2.billing_person_id');
            $billingPersonDetails = $qry5->first();

            $res = array(
                'success' => true,
                'applicant_details' => $applicantDetails,
                'site_details' => $siteDetails,
                'ltrDetails' => $ltrDetails,
                'contactPersonDetails' => $contactPersonDetails,
                'billingPersonDetails' => $billingPersonDetails,
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

    public function prepareNewGvpInvoicingStage(Request $request)
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
                ->join('tra_gvp_sites as t4', 't1.gvp_site_id', '=', 't4.id')
                ->leftJoin('par_gvplocation_details as t5', 't1.gvp_type_id', '=', 't5.id')
                ->select(DB::raw("t1.applicant_id, t1.gvp_site_id, t1.gvp_type_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                    t1.paying_currency_id as app_paying_currency_id, t3.isLocked,t3.paying_currency_id,t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details,t5.name as gvp_type_txt,t1.is_fast_track"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            if (!validateIsNumeric($results->paying_currency_id)) {
                $results->paying_currency_id = $results->app_paying_currency_id;
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

    public function prepareNewGvpPaymentStage(Request $request)
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
                ->join('tra_gvp_sites as t4', 't1.gvp_site_id', '=', 't4.id')
                ->leftJoin('par_gvplocation_details as t5', 't1.gvp_type_id', '=', 't5.id')
                ->select(DB::raw("t1.applicant_id, t1.gvp_site_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.name,t4.postal_address) as premise_details,t5.name as gvp_type_txt, t1.gvp_type_id"))
                ->where('t1.id', $application_id);
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

    public function prepareNewGvpSmfUploadsStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->join('tra_gvp_sites as t3', 't1.gvp_site_id', '=', 't3.id')
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,
                        t1.gvp_site_id,CONCAT_WS(',',t3.name,t3.postal_address) as premise_details,t1.section_id,t1.module_id"))
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

    public function prepareNewGvpManagerInspectionStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('assigned_gvpinspections as t2', function ($join) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('gvp_inspectionteam_details as t3', 't2.inspection_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
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

    public function prepareNewGvpChecklistsStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_gvp_sites as t3', 't1.gvp_site_id', '=', 't3.id')
                ->leftJoin('par_gvplocation_details as t4', 't1.gvp_type_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id, t3.id as premise_id, CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,
                     t1.gvp_type_id, t1.gvp_site_id, t1.section_id,t1.module_id,CONCAT_WS(',',t3.name,t3.postal_address) as premise_details,t4.name as gvp_type_txt"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            
            $sharedQry = DB::table('tra_gvp_applications as t11')
            ->join('tra_gvp_sites as t1', 't11.gvp_site_id', '=', 't1.id')
            ->where('t11.id', $application_id);

                $qrySite = clone $sharedQry;
                $qrySite->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                    ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', '=', 't7.id')
                    ->select('t1.name as premise_name', 't1.id as premise_id', 't1.id as gvp_site_id', 't1.*','t11.applicant_id', 't11.gvp_type_id', 't11.device_type_id', 't11.assessment_type_id',
                        't7.name as manufacturer_name', 't7.email_address as manufacturer_email_address', 't7.physical_address as manufacturer_physical_address', 't7.country_id as manufacturer_country_id');
                $siteDetails = $qrySite->first();

                
                $qryLtr = clone $sharedQry;
                $qryLtr->leftJoin('tra_premises as t2', 't11.ltr_id', '=', 't2.id')
                ->leftJoin('tra_premises_applications as t2a', 't2.id', '=', 't2a.premise_id')
                ->Join('tra_approval_recommendations as t2b', 't2a.application_code', '=', 't2b.application_code')
                ->select('t11.ltr_id as ltr_id', 't2b.permit_no as link_permit_no','t2.name as ltr_name','t2.tpin_no as ltr_tin_no', 't2.physical_address as link_physical_address','t2.telephone as link_telephone');
               $ltrDetails = $qryLtr->first();


                $qry = DB::table($table_name . ' as t1')
                ->join('assigned_gvpinspections as t2', function ($join) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('gvp_inspectionteam_details as t3', 't2.inspection_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
                ->where('t1.id', $application_id);
                $inspectionDetails = $qry->first();

                $qry3 = clone $sharedQry;
                $qry3->leftJoin('tra_personnel_information as t3', 't11.contact_person_id', '=', 't3.id')
                    ->select('t3.*','t3.name as contact_name', 't3.postal_address as contact_postal_address', 't3.telephone_no as contact_telephone_no', 't3.email_address as contact_email_address',
                        't11.applicant_as_contact_person', 't11.contact_person_startdate as start_date', 't11.contact_person_enddate as end_date');
                $contactPersonDetails = $qry3->first();

        $applicant_id = $siteDetails->applicant_id;

        $qryApplicant = DB::table('wb_trader_account as t1')
                    ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                    ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                    ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.tin_no',
                        't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                        't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone',
                        't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name')
                    ->where('t1.id', $applicant_id);
                $applicantDetails = $qryApplicant->first();
                $res = array(
                    'success' => true,
                    'applicant_details' => $applicantDetails,
                    'site_details' => $siteDetails,
                    'ltr_details' => $ltrDetails,
                    'inspection_details' => $inspectionDetails,
                    'results' => $results,
                    'contact_details' => $contactPersonDetails,
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
    
    public function updateGvpApplicationsInspectionType(Request $request)
    {
        $post_data = $request->input();
        $inspection_type_id = $request->input('inspection_type_id');
        $remarks = $request->input('remark');
        unset($post_data['inspection_type_id']);
        unset($post_data['remark']);
        try {
            $log_params = array();
            foreach ($post_data as $post_datum) {
                $log_params[] = array(
                    'application_id' => $post_datum,
                    'author' => aes_decrypt(\Auth::user()->email),
                    'remarks' => $remarks,
                    'date_requested' => Carbon::now(),
                    'created_by' => $this->user_id
                );
            }
            DB::table('tra_gvpapps_categorization_dump')->insert($log_params);
            DB::table('tra_gvp_applications')
                ->whereIn('id', $post_data)
                ->update(array('inspection_type_id' => $inspection_type_id, 'inspection_type_remarks' => $remarks));
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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


    public function getSitePersonnelDetails(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                $results = $this->getOnlineAppGvpPersonnelDetails($request);
            } else {
                $results = $this->getMISSitePersonnelDetails($request);
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getMISSitePersonnelDetails(Request $request)
    {
        $manufacturing_site_id = $request->input('manufacturing_site_id');
        $qry = DB::table('tra_manufacturing_sites_personnel as t1')
            ->join('tra_personnel_information as t2', 't1.personnel_id', '=', 't2.id')
            ->join('par_personnel_studyfield as t4', 't1.study_field_id', '=', 't4.id')
            ->join('par_personnel_qualifications as t5', 't1.qualification_id', '=', 't5.id')
            ->join('par_personnel_positions as t6', 't1.position_id', '=', 't6.id')
            ->select(DB::raw("t1.manufacturing_site_id, t1.start_date, t1.registration_no,t1.institution, t1.end_date, t2.*,t1.position_id,t1.qualification_id,
                         t1.study_field_id,t5.name as qualification,t4.name as study_field,t6.name as position"))
            ->where('t1.manufacturing_site_id', $manufacturing_site_id);
        $results = $qry->get();
        return $results;
    }

    public function getOnlineAppGvpPersonnelDetails(Request $request)
    {
        $manufacturing_site_id = $request->input('manufacturing_site_id');
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_manufacturing_sites_personnel as t1')
            ->select('t1.*')
            ->where('manufacturing_site_id', $manufacturing_site_id);
        $results = $qry->get();
        foreach ($results as $key => $result) {
            $personnel_details = getTableData('tra_personnel_information', array('id' => $result->personnel_id));
            if (!is_null($personnel_details)) {
                $results[$key]->name = $personnel_details->name;
                $results[$key]->telephone_no = $personnel_details->telephone_no;
                $results[$key]->email_address = $personnel_details->email_address;
                $results[$key]->postal_address = $personnel_details->postal_address;
            }
            $results[$key]->study_field = getSingleRecordColValue('par_personnel_studyfield', array('id' => $result->study_field_id), 'name');
            $results[$key]->position = getSingleRecordColValue('par_personnel_positions', array('id' => $result->position_id), 'name');;
            $results[$key]->qualification = getSingleRecordColValue('par_personnel_qualifications', array('id' => $result->qualification_id), 'name');;
        }
        return $results;
    }

    public function getSiteOtherDetails(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                $results = $this->getOnlineAppGvpOtherDetails($request);
            } else {
                $results = $this->getMISSiteOtherDetails($request);
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getMISSiteOtherDetails(Request $request)
    {
        $site_id = $request->input('manufacturing_site_id');
        $qry = DB::table('tra_mansite_otherdetails as t1')
            ->join('par_business_types as t2', 't1.business_type_id', 't2.id')
            ->join('par_business_type_details as t3', 't1.business_type_detail_id', 't3.id')
            ->select('t1.*', 't2.name as business_type', 't3.name as business_type_detail', 't2.section_id')
            ->where('manufacturing_site_id', $site_id);
        $results = $qry->get();
        return $results;
    }

    public function getOnlineAppGvpOtherDetails(Request $request)
    {
        $site_id = $request->input('manufacturing_site_id');
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_mansite_otherdetails as t1')
            ->where('manufacturing_site_id', $site_id);
        $results = $qry->get();
        foreach ($results as $key => $result) {
            $results[$key]->business_type = getSingleRecordColValue('par_business_types', array('id' => $result->business_type_id), 'name');
            $results[$key]->business_type_detail = getSingleRecordColValue('par_business_type_details', array('id' => $result->business_type_detail_id), 'name');
        }
        return $results;
    }

    public function getSiteBlockDetails(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                //$results = $this->getOnlineSiteBlockDetails($request);
                $results = $this->getMISSiteBlockDetails($request);

            } else {
                $results = $this->getMISSiteBlockDetails($request);
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getMISSiteBlockDetails(Request $request)
    {
        $site_id = $request->input('manufacturing_site_id');
        $qry = DB::table('tra_manufacturing_sites_blocks as t1')
            ->leftJoin('par_manufacturinginspection_category as t2', 't1.inspection_category_id', '=', 't2.id')
           // ->leftJoin('par_gvpinspection_activities as t3', 't1.inspection_activities_id', '=', 't3.id')
            ->Join('gvp_productline_details as t4', 't4.manufacturingsite_block_id', '=', 't1.id')

            // ->Join('gvp_productline_details as t4', function ($join) use ($site_id) {
            //         $join->on('t1.id', '=', 't4.manufacturingsite_block_id')
            //       ->where('t4.manufacturing_site_id', $site_id);
            //   })
            ->select('t1.*', 't2.name as inspection_manufacturing_Category',DB::raw('COUNT(DISTINCT t4.id) as lines_no'))
            ->where('t1.manufacturing_site_id', $site_id)
            ->groupBy('t1.id');

        $results = $qry->get();
        return $results;
    }

 
   public function getOnlineSiteBlockDetails(Request $request)
    {
        $site_id = $request->input('manufacturing_site_id');
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_manufacturingsite_blocks as t1')
            ->where('manufacturing_site_id', $site_id);
        $results = $qry->get();
        return $results;
    }
 



    public function saveSiteOtherDetails(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $site_id = $post_data['manufacturing_site_id'];
            $business_type_id = $post_data['business_type_id'];
            $business_type_detail_id = $post_data['business_type_detail_id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $where2 = array(
                'manufacturing_site_id' => $site_id,
                'business_type_id' => $business_type_id,
                'business_type_detail_id' => $business_type_detail_id
            );
            if (DB::table($table_name)
                    ->where($where2)
                    ->count() > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'This combination already exists!!'
                );
                return \response()->json($res);
            };
            if (isset($id) && $id != "") {
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

    public function saveGvpInspectionLineDetails(Request $req)
    {
        $res = array();
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $site_id = $post_data['manufacturing_site_id'];
            $inspection_stage = $req->input('inspection_stage');
            $product_line = $post_data['product_line_id'];
            $product_category = $post_data['category_id'];
            $manufacturingsite_block_id =  $post_data['category_id'];
            $product_description = $post_data['prodline_description'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $where2 = array(
                'manufacturing_site_id' => $site_id,
                'product_line_id' => $product_line,
                'category_id' => $product_category,
                'manufacturingsite_block_id' => $manufacturingsite_block_id,
                'prodline_description' => $product_description
            );
            if (isset($inspection_stage) && $inspection_stage == 1) {
                unset($table_data['inspection_stage']);
            } else {
                if (DB::table($table_name)
                        ->where($where2)
                        ->count() > 0) {
                    $res = array(
                        'success' => false,
                        'message' => 'This combination already exists!!'
                    );
                    return \response()->json($res);
                };
            }
            if (isset($id) && $id != "") {
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

     public function getGvpInspectionLineDetails(Request $request)
    {
        $site_id = $request->input('site_id');
        $block_id = $request->input('block_id');
        try {
            $results = $this->getGvpProductLineDetails($site_id,$block_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }

    // public function getGvpInspectionLineDetails(Request $request)
    // {
    //     $site_id = $request->input('site_id');
    //     $section_id = $request->input('section_id');
    //     try {
    //        // $results = $this->getGvpProductLineDetails($site_id);
    //        $qry = DB::table('gvp_product_lines as t2')
    //        ->leftJoin('gvp_productline_details as t1', function ($join) use ($site_id) {
    //                 $join->on('t2.id', '=', 't1.product_line_id')
    //                          ->where('t1.manufacturing_site_id', $site_id);
    //        })
    //        ->leftJoin('gvp_product_categories as t3', 't2.gvp_product_categories_id', '=', 't3.id')
    //        ->leftJoin('gvp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
    //        ->leftJoin('gvp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
    //        ->leftJoin('tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
    //        ->leftJoin('gvp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
    //        ->leftJoin('gvp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
    //        ->select('t1.*','t2.id as product_line_id', 't3.id as gvp_product_categories_id', 't2.name as product_line_name', 't3.name as product_line_category', 't1.product_line_description',
    //            't7.name as block', 't6.name as product_line_status', 't5.name as inspection_recommendation', 't8.name as tc_recommendation', 't9.name as dg_recommendation');
    //         if(validateIsNumeric($section_id)){

    //             $qry->where(array('t3.section_id'=>$section_id));
    //         }
    //          $results = $qry->get();
    //         $res = array(
    //             'success' => true,
    //             'results' => $results,
    //             'message' => returnMessage($results)
    //         );
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


    public function getGvpProductLineDetails($site_id,$block_id)
    {   
        $qry = DB::table('gvp_productline_details as t1')
            ->leftJoin('gvp_product_lines as t2', 't1.product_line_id', '=', 't2.id')
            ->leftJoin('gvp_product_categories as t3', 't1.category_id', '=', 't3.id')
            ->leftJoin('gvp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
            ->leftJoin('gvp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
            ->leftJoin('tra_manufacturing_sites_blocks as t7', 't1.manufacturingsite_block_id', '=', 't7.id')
            ->leftJoin('gvp_productlinestatus as t8', 't1.prodline_tcmeetingstatus_id', '=', 't8.id')
            ->leftJoin('gvp_productlinestatus as t9', 't1.prodline_dgstatus_id', '=', 't9.id')
            ->leftJoin('par_manufacturing_activities as t10', 't1.manufacturing_activity_id', '=', 't10.id')
            ->leftJoin('par_gvpproduct_types as t11', 't1.category_id', '=', 't11.id')
            ->leftJoin('par_gvpproduct_types as t16', 't7.special_category_id', '=', 't16.id')
            ->leftJoin('par_activitity as t12', 't1.active_id', '=', 't12.id')
            ->leftJoin('par_sterility as t13', 't1.sterile_id', '=', 't13.id')
            ->leftJoin('par_invasivity as t14', 't1.invasive_id', '=', 't14.id')
            ->leftJoin('par_medics as t15', 't1.medicated_id', '=', 't15.id')
            ->where('t1.gvp_site_id', $site_id)
            ->select('t1.*','t2.name as product_line_name', 't11.name as product_line_category','t16.name as special_line_category',           't1.prodline_description as product_line_description',
                't7.name as block', 't6.name as product_line_status', 't5.name as inspection_recommendation', 't8.name as tc_recommendation', 't9.name as     dg_recommendation','t10.name as activities','t12.name as active','t13.name as sterility', 't14.name as invasive','t15.name as medicated');

         if (isset($block_id) && $block_id != '') {
                $qry->where('t1.manufacturingsite_block_id', $block_id);
            }
        $results = $qry->get();
        return $results;
    }




    public function getPreviousProductLineDetails(Request $request)
    {
        $site_id = $request->input('site_id');
        $block_id = $request->input('block_id');
        try {
            $init_site_id = DB::table('tra_manufacturing_sites')
                ->where('id', $site_id)
                ->value('init_site_id');
            $results = $this->getGvpProductLineDetails($init_site_id,$block_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

 

    public function getOnlineApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_gmp_applications as t1')
                ->join('wb_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code', 't2.name as premise_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.status_type_id', 't4.name as application_status', 't4.is_manager_query', 't1.gvp_type_id')
                ->whereIn('application_status_id', array(2, 13, 15, 17, 16));
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            $subModulesData = getParameterItems('sub_modules', '', '');
            foreach ($results as $key => $result) {
                $results[$key]->sub_module_name = returnParamFromArray($subModulesData, $result->sub_module_id);
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

    //  public function getMISSiteBlockDetails(Request $request)
    // {
    //     $site_id = $request->input('manufacturing_site_id');
    //     $qry = DB::table('tra_manufacturing_sites_blocks as t1')
    //     ->leftJoin('par_manufacturinginspection_category as t2', 't1.inspection_category_id', '=', 't2.id')
    //     ->leftJoin('par_gvpinspection_activities as t3', 't1.inspection_activities_id', '=', 't3.id')
        
    //      ->select('t1.*','t2.name as inspection_manufacturing_Category','t3.name as inspection_manufacturing_activity')
    //         ->where('manufacturing_site_id', $site_id);

    //     $results = $qry->get();
    //     return $results;
    // }



    public function getOnlineProductLineDetails(Request $request)
    {
        $site_id = $request->input('site_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_manufacturing_sites_blocks as as t1')
                ->select('t1.*')
                ->where('t1.manufacturing_site_id', $site_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->inspection_manufacturing_Category = getSingleRecordColValue('par_manufacturinginspection_category', array('id' => $result->inspection_category_id), 'name');
                $results[$key]->product_line_category = getSingleRecordColValue('par_gvpinspection_activities', array('id' => $result->inspection_manufacturing_activity), 'name');
                
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

    public function getGvpScheduleTeamDetails(Request $request)
    {
        $section_id = $request->input('section_id');
        $application_code = $request->input('application_code');
        $is_manager = $request->input('is_manager');
        try {
            $qry = DB::table('gvp_inspectionteam_details as t1')
                ->leftJoin('par_sections as t2', 't1.section_id', '=', 't2.id')
                ->select('t1.*', 't2.name as section_name');
            if (isset($section_id) && $section_id != '') {
                //$qry->where('t1.section_id', $section_id);
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

    public function saveGvpScheduleInspectionTypes(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        $inspection_type = $request->input('inspection_type_id');
        $user_id = $this->user_id;
        try {
            $where_check = array(
                'inspection_id' => $inspection_id,
                'inspection_type_id' => $inspection_type
            );
            if (DB::table('gvpschedule_ispection_types')->where($where_check)->count() > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'Inspection type added already!!'
                );
                return \response()->json($res);
            }
            $params = $where_check;
            $params['created_by'] = $user_id;
            $res = insertRecord('gvpschedule_ispection_types', $params, $user_id);
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

    public function getGvpScheduleInspectionTypes(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table('gvpschedule_ispection_types as t1')
                ->join('inspection_types as t2', 't1.inspection_type_id', '=', 't2.id')
                ->select('t1.*', 't2.name as inspection_type_name')
                ->where('t1.inspection_id', $inspection_id);
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

    public function saveGvpScheduleInspectors(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        $inspector_id = $request->input('inspector_id');
        $role_id = $request->input('role_id');
        $user_id = $this->user_id;
        try {
            $where_check = array(
                'inspection_id' => $inspection_id,
                'inspector_id' => $inspector_id
            );
            $params = $where_check;
            $params['role_id'] = $role_id;
            if (DB::table('gvp_inspectorsdetails')->where($where_check)->count() > 0) {
                $params['altered_by'] = $user_id;
                $prev_data = getPreviousRecords('gvp_inspectorsdetails', $where_check);
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                $res = updateRecord('gvp_inspectorsdetails', $prev_data['results'], $where_check, $params, $user_id);
            } else {
                $params['created_by'] = $user_id;
                $res = insertRecord('gvp_inspectorsdetails', $params, $user_id);
            }
            DB::table('gvp_inspectorsdetails')
                ->where('inspection_id', $inspection_id)
                ->where('role_id', 2)
                ->where('inspector_id', '<>', $inspector_id)
                ->update(array('role_id' => 1));
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

    public function getGvpScheduleInspectors(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table('gvp_inspectorsdetails as t1')
                ->join('users as t2', 't1.inspector_id', '=', 't2.id')
                ->leftJoin('par_inspectors_roles as t3', 't1.role_id', '=', 't3.id')
                ->select(DB::raw("t1.*, CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as inspector_name,t3.name as inspector_role"))
                ->where('t1.inspection_id', $inspection_id);
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

    public function getAssignedGvpInspections(Request $request)
    {
        $inspection_id = $request->input('inspection_id');
        try {
            $qry = DB::table('assigned_gvpinspections as t1')
                ->join('tra_gvp_applications as t2', 't1.application_code', '=', 't2.application_code')
                ->join('tra_manufacturing_sites as t3', 't2.manufacturing_site_id', '=', 't3.id')
                ->join('wb_trader_account as t4', 't2.applicant_id', '=', 't4.id')
                ->leftJoin('par_gvplocation_details as t5', 't2.gvp_type_id', '=', 't5.id')
                ->join('sub_modules as t6', 't2.sub_module_id', '=', 't6.id')
                ->select('t2.*', 't3.name as premise_name', 't4.name as applicant_name', 't5.name as gvp_type_txt',
                    't6.name as sub_module_name', 't1.id')
                ->where('t1.inspection_id', $inspection_id);
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

    public function addGvpApplicationsIntoInspectionSchedule(Request $request)//batch
    {
        //$inspection_id = $request->input('inspection_id');
        $details = $request->input();
        $inspection_id = $details['inspection_id'];
        unset($details['inspection_id']);
        try {
            /* DB::table('assigned_gvpinspections')
                 ->where('inspection_id', $inspection_id)
                 ->delete();*/
            DB::table('assigned_gvpinspections')
                ->insert($details);
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function addGvpApplicationIntoInspectionSchedule(Request $request)
    {
        $post_data = $request->input();
        $inspection_id = $request->input('inspection_id');
        $user_id = $this->user_id;
        unset($post_data['inspection_id']);
        try {
            foreach ($post_data as $application_code) {
                $params = array(
                    'inspection_id' => $inspection_id,
                    'application_code' => $application_code,
                    'created_by' => $user_id
                );
                $qry = DB::table('assigned_gvpinspections')
                    ->where('application_code', $application_code);
                $exists_qry = clone $qry;
                $count = $exists_qry->count();
                if ($count > 0) {
                    $update_qry = clone $qry;
                    $update_qry->update(array('inspection_id' => $inspection_id, 'altered_by' => $user_id));
                } else {
                    DB::table('assigned_gvpinspections')
                        ->insert($params);
                }
            }
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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

    public function saveGvpProductInfoLinkage(Request $request)
    {
        $post_data = $request->input();
        $gvp_site_id = $request->input('gvp_site_id');
        $reg_site_id = $request->input('reg_site_id');
        $user_id = $this->user_id;
        unset($post_data['gvp_site_id']);
        unset($post_data['reg_site_id']);
        try {
            $insert_arr = array();
            foreach ($post_data as $product) {
                $product_id = $product['product_id'];
                $reg_product_id = $product['reg_product_id'];
                $count = DB::table('tra_product_gvpinspectiondetails')
                    ->where(array('gvp_site_id' => $gvp_site_id, 'product_id' => $product_id))
                    ->count();
                if ($count == 0) {
                    $insert_arr[] = array(
                        'gvp_site_id' => $gvp_site_id,
                        'reg_site_id' => $reg_site_id,
                        'product_id' => $product_id,
                        'reg_product_id' => $reg_product_id,
                        'created_by' => $user_id,
                        'created_on' => Carbon::now()
                    );
                }
            }
            DB::table('tra_product_gvpinspectiondetails')
                ->insert($insert_arr);
            $res = array(
                'success' => true,
                'message' => 'Products added successfully!!'
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

    public function updateGvpProductInfoLinkage(Request $request)
    {
        $manufacturing_site_id = $request->input('manufacturing_site_id');
        $inspection_line_id = $request->input('inspection_line_id');
        $product_id = $request->input('product_id');
        $user_id = $this->user_id;
        try {
            $where = array(
                'manufacturing_site_id' => $manufacturing_site_id,
                'product_id' => $product_id
            );
            $params = array(
                'gvp_productline_id' => $inspection_line_id,
                'altered_by' => $user_id,
                'dola' => Carbon::now()
            );
            $prev_data = getPreviousRecords('tra_product_gvpinspectiondetails', $where);
            if ($prev_data['success'] == false) {
                return \response()->json($prev_data);
            }
            $res = updateRecord('tra_product_gvpinspectiondetails', $prev_data['results'], $where, $params, $user_id);
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

    public function getGvpProductInfoLinkage(Request $request)
    {
        $gvp_site_id = $request->input('site_id');
        try {
            $qry = DB::table('tra_product_gvpinspectiondetails as t1')
                ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('tra_product_applications as t2', 't7.id', '=', 't2.product_id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                ->leftJoin('tra_approval_recommendations as t11', 't2.permit_id', '=', 't11.id')
                ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                ->select('t7.*', 't1.*','t2.id as active_application_id','t2.product_id', 't2.applicant_id', 't2.application_code','t2.section_id', 't2.module_id','t2.sub_module_id','t13.name as storage_condition', 't7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name','t7.brand_name as sample_name', 't11.certificate_no', 't2.product_id');
            $qry->where('t1.gvp_site_id', $gvp_site_id);
            
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getGvpProductInfoLinkageOnline(Request $request)
    {
        $manufacturing_site_id = $request->input('site_id');
        $record = array();
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_product_gmpinspectiondetails as t1');
            if (isset($manufacturing_site_id) && is_numeric($manufacturing_site_id)) {
                $qry->where('t1.manufacturing_site_id', $manufacturing_site_id);
            }
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $qry = DB::table('tra_product_information as t7')
                    ->join('tra_product_applications as t2', 't7.id', '=', 't2.product_id')
                    ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                    ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                    ->leftJoin('tra_approval_recommendations as t11', 't2.permit_id', '=', 't11.id')
                    ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                    ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                    ->leftJoin('par_dosage_forms as t14', 't7.dosage_form_id', '=', 't14.id')
                    ->select('t7.*', 't13.name as storage_condition', 't7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name',
                        't7.brand_name as sample_name', 't11.certificate_no', 't14.name as dosage_form')
                    ->where('t7.id', $result->product_id)->first();
                    if($qry){

                        $record[] = $qry;
                    }
            }
            if(count($record) == 0){
                    $record = array();
            }
       
            $res = array(
                'success' => true,
                'results' => $record,
                'message' => returnMessage($record)
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

    public function saveManSitePersonnelLinkageDetails(Request $request)
    {
        $site_id = $request->input('manufacturing_site_id');
        $position_id = $request->input('position_id');
        $personnel_id = $request->input('id');
        $user_id = $this->user_id;
        try {
            $portal_db = DB::connection('portal_db');
            $portal_site_id = getSingleRecordColValue('tra_manufacturing_sites', array('id' => $site_id), 'portal_id');

            //PORTAL
            $where_p = array(
                'personnel_id' => $personnel_id,
                'manufacturing_site_id' => $portal_site_id,
                'position_id' => $position_id
            );
            $link_data_p = array(
                'qualification_id' => $request->input('qualification_id'),
                'position_id' => $position_id,
                'registration_no' => $request->input('registration_no'),
                'study_field_id' => $request->input('study_field_id'),
                'institution' => $request->input('institution'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
            );
            $qry_p = $portal_db->table('wb_manufacturing_sites_personnel')
                ->where($where_p);
            $portal_info = $qry_p->first();
            $portal_id = 0;
            if (is_numeric($portal_site_id) && $portal_site_id > 0) {//take care of null/zero portal premise ids
                if (is_null($portal_info)) {
                    $link_data_p['manufacturing_site_id'] = $portal_site_id;
                    $link_data_p['personnel_id'] = $personnel_id;
                    $link_data_p['mis_created_on'] = Carbon::now();
                    $link_data_p['mis_created_by'] = $user_id;
                    $portal_id = $portal_db->table('wb_manufacturing_sites_personnel')
                        ->insertGetId($link_data_p);
                } else {
                    $portal_id = $portal_info->id;
                    $link_data_p['mis_dola'] = Carbon::now();
                    $link_data_p['mis_altered_by'] = $user_id;
                    $qry_p->update($link_data_p);
                }
            }
            //MIS
            $where = array(
                'personnel_id' => $personnel_id,
                'manufacturing_site_id' => $site_id,
                'position_id' => $position_id
            );
            $link_data = array(
                'qualification_id' => $request->input('qualification_id'),
                'position_id' => $position_id,
                'registration_no' => $request->input('registration_no'),
                'study_field_id' => $request->input('study_field_id'),
                'institution' => $request->input('institution'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
            );
            $qry = DB::table('tra_manufacturing_sites_personnel')
                ->where($where);
            $count = $qry->count();
            if ($count > 0) {
                $link_data['dola'] = Carbon::now();
                $link_data['altered_by'] = $user_id;
                $link_data['portal_id'] = $portal_id;
                $prev_data = getPreviousRecords('tra_manufacturing_sites_personnel', $where);
                if ($prev_data['success'] == false) {
                    return \response()->json($prev_data);
                }
                $res = updateRecord('tra_manufacturing_sites_personnel', $prev_data['results'], $where, $link_data, $user_id);
            } else {
                $link_data['manufacturing_site_id'] = $site_id;
                $link_data['personnel_id'] = $personnel_id;
                $link_data['portal_id'] = $portal_id;
                $link_data['created_on'] = Carbon::now();
                $link_data['created_by'] = $user_id;
                $res = insertRecord('tra_manufacturing_sites_personnel', $link_data, $user_id);
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

    public function getNonComplianceObservations(Request $request)
    {
        $site_id = $request->input('gvp_site_id');
        try {
            $qry = DB::table('tra_gvp_noncompliance_observations as t1')
                ->join('par_gvp_noncompliance_categories as t2', 't1.category_id', '=', 't2.id')
                ->join('par_gvp_guidelines_references as t3', 't1.reference_id', '=', 't3.id')
                ->leftJoin('par_query_statuses as t4', 't1.status', '=', 't4.id')
                ->leftJoin('par_application_sections as t5', 't1.application_section_id', '=', 't5.id')
                ->select('t1.*', 't2.name as category', 't3.name as reference','t3.description as description', 't4.name as status_name', 't5.application_section')
                ->where('t1.gvp_site_id', $site_id);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function saveGvpDeskReviewScheduleDetails(Request $request)
    {
        $id = $request->input('id');
        $inspectionteam_name = $request->input('inspectionteam_name');
        $inspectionteam_desc = $request->input('inspectionteam_desc');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $selected = $request->input('selected');
        $selected_codes = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = array(
                'inspectionteam_name' => $inspectionteam_name,
                'inspectionteam_desc' => $inspectionteam_desc,
                'start_date' => $start_date,
                'end_date' => $end_date
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('gvp_inspectionteam_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('gvp_inspectionteam_details', $params, $user_id);
                $id = $insert_res['record_id'];
            }
            $params2 = array();
            foreach ($selected_codes as $selected_code) {
                $params2[] = array(
                    'inspection_id' => $id,
                    'application_code' => $selected_code,
                    'created_by' => $this->user_id
                );
            }
            DB::table('assigned_gvpinspections')
                ->where('inspection_id', $id)
                ->delete();
            DB::table('assigned_gvpinspections')
                ->insert($params2);
            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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
 public function getAllGvpApplications(Request $req)
    {
        $start = $req->start;
        $limit = $req->limit;
        $qry = DB::table('tra_gvp_applications as t1')
                ->leftjoin('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->leftjoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftjoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftjoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftjoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftjoin('par_gvplocation_details as t7', 't1.gvp_type_id', '=', 't7.id')
                ->leftjoin('tra_submissions as t8', 't1.application_code', '=', 't8.application_code')
                ->leftjoin('users as t9', 't8.usr_from', '=', 't9.id')
                ->leftJoin('users as t10', 't8.usr_to', '=', 't10.id')
                ->leftJoin('par_device_types as t11', 't1.device_type_id', '=', 't11.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as gvp_site_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*,t7.name as gvp_type,t11.name as device_type_txt"));
        $count = $qry->count();
        if(validateIsNumeric($start) && validateIsNumeric($limit)){
            $results = $qry->skip($start)->take($limit)->get();
        }else{
            $results = $qry->get();
        }
        
        $res = array(
                'success' => true,
                'results' => $results,
                'total' => $count,
                'message' => 'All is well'
            );
        return \response()->json($res);
    }
    public function saveGvpEditAppBaseDetails(Request $request){
        $application_id = $request->input('application_id');
        $assessment_type_id = $request->input('assessment_type_id');
        $manufacturing_site_id = $request->input('manufacturing_site_id');
        $man_site_id = $request->input('man_site_id');
        //$applicant_id = $request->input('applicant_id');
        $ltr_id = $request->input('ltr_id');
        $applicant_as_ltr = $request->input('applicant_as_ltr');
        $applicant_contact_person = $request->input('applicant_contact_person');
        $contact_person_id = $request->input('contact_person_id');
        $contact_person_startdate = $request->input('contact_person_startdate');
        $contact_person_enddate = $request->input('contact_person_enddate');
        $process_id = $request->input('process_id');
        $section_id = $request->input('section_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $gvp_type_id = $request->input('gvp_type_id');
        $region_id = $request->input('region_id');
        $device_type_id = $request->input('device_type_id');
        $user_id = $this->user_id;
        if ($gvp_type_id == 1) {//oversea
            $zone_id = getHQZoneId();
        } else {
            $zone_id = getZoneIdFromRegion($region_id);
        }
        try {
            $man_site_table = 'par_man_sites';
            $manufacturing_site_table = 'tra_manufacturing_sites';
            $applications_table = 'tra_gvp_applications';

            $where_man_site = array(
                'id' => $man_site_id
            );
            $where_app = array(
                'id' => $application_id
            );
            if (isset($application_id) && $application_id != "") {//Edit
                $where_manufacturing_site = array(
                    'id' => $manufacturing_site_id
                );
                //Application_edit
                $application_params = array(
                   //'applicant_id' => $applicant_id,
                    'gvp_type_id' => $gvp_type_id,
                    'manufacturing_site_id' => $manufacturing_site_id,
                    'zone_id' => $zone_id,
                    'assessment_type_id' => $assessment_type_id,
                    'device_type_id' => $device_type_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                }
                $application_code = $app_details[0]['application_code'];
                $tracking_no = $app_details[0]['tracking_no'];
                $registered_manufacturing_site_id = $app_details[0]['reg_site_id'];
                //Manufacturing Site edits
                $manufacturing_site_params = array(
                    'name' => $request->input('name'),
                    //'applicant_id' => $applicant_id,
                    'country_id' => $request->input('country_id'),
                    'region_id' => $request->input('region_id'),
                    'district_id' => $request->input('district_id'),
                    'street' => $request->input('street'),
                    'telephone' => $request->input('telephone'),
                    'fax' => $request->input('fax'),
                    'email' => $request->input('email'),
                    'website' => $request->input('website'),
                    'physical_address' => $request->input('physical_address'),
                    'postal_address' => $request->input('postal_address'),
                    'business_scale_id' => $request->input('business_scale_id'),
                    'longitude' => $request->input('longitude'),
                    'latitude' => $request->input('latitude'),

                    'dola' => Carbon::now(),
                    'altered_by' => $user_id,
                    'applicant_as_ltr' => $applicant_as_ltr,
                    'ltr_id' => $ltr_id,
                    'applicant_contact_person' => $applicant_contact_person,
                    'contact_person_id' => $contact_person_id,
                    'contact_person_startdate' => $contact_person_startdate,
                    'contact_person_enddate' => $contact_person_enddate,
                    'man_site_id' => $man_site_id
                );

                $previous_data = getPreviousRecords($manufacturing_site_table, $where_manufacturing_site);
                if ($previous_data['success'] == false) {
                    echo json_encode($previous_data);
                    exit();
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($manufacturing_site_table, $previous_data, $where_manufacturing_site, $manufacturing_site_params, $user_id);
            } 
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['manufacturing_site_id'] = $manufacturing_site_id;
            $res['registered_manufacturing_site_id'] = $registered_manufacturing_site_id;
            $res['tracking_no'] = $tracking_no;
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

    public function saveGvpproductlinedetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $product_lines = $request->input('product_lines');
        $product_lines = json_decode($product_lines);
        $table_name = 'gvp_productline_details';
        $user_id = $this->user_id;
        try {
            $insertproductline_data = array();
            foreach ($product_lines as $product_line) {
                
                $id = $product_line->id;
               
                $productline_data = array(
                    'manufacturing_site_id' => $product_line->manufacturing_site_id,
                    'product_line_namecheck'=> $product_line->product_line_namecheck,
                    'application_code' => $product_line->application_code,
                    'product_line_id' => $product_line->product_line_id,
                    'non_betalactam' => $product_line->non_betalactam,
                    'beta_lactam_id' => $product_line->beta_lactam_id,
                    'gvpproduct_type_id'=>$product_line->gvpproduct_type_id,
                    'gvp_product_categories_id' => $product_line->gvp_product_categories_id,
                    'product_line_description' => $product_line->product_line_description,
                    'no_ofproduction_lines' => $product_line->no_ofproduction_lines,
                    //'manufacturingsite_block_no' => $product_line->manufacturingsite_block_no,
                    'prodline_inspectionstatus_id' => $product_line->prodline_inspectionstatus_id,
                    'inspection_confirmation_id' => $product_line->inspection_confirmation_id,
                    'no_inspection_justification' => $product_line->no_inspection_justification
                );

                if (validateIsNumeric($id) ) {
                    $where = array(
                        'id' => $id
                    );
                    $productline_data['dola'] = Carbon::now();
                    $productline_data['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords($table_name, $where);
                    $ddd=updateRecord($table_name, $prev_data['results'], $where, $productline_data, $user_id);
                    
                } else {
                    $insertproductline_data =  $productline_data;
                    $productline_data['dola'] = Carbon::now();
                    $productline_data['altered_by'] = $user_id;
                }
            }
            if (count($insertproductline_data) > 0) {
                DB::table($table_name)
                    ->insert($insertproductline_data);
            }
            $res = array(
                'success' => true,
                'message' => 'Product Line Details details saved successfully!!'
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

    public function checkGvpInspectionScheduleDates(Request $payload){
        $application_code = $payload->input('application_code');
        $res = null;
        try{
            if(validateIsNumeric($application_code)){
            
                $rec = DB::table('tra_gvp_inspection_dates as t1')
                    ->select('t1.*')
                    ->where('t1.application_code', $application_code)
                    ->first();

                if($rec){

                    $res = array(
                        'success' => true,
                        'message' => 'Inspection dates for this application exist'
                    );
                }else {
                    return response()->json([
                        'success' => false,
                        'message' => 'No inspection dates found for this application code'
                    ]);
                }
            
            }else{
                $res = array(
                'success' => false,
                'message' => 'Invalid Application Code'
                );
            }

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



     public function saveInspectionDates(Request $request)
        {
            
            $inspection_sections = $request->input('inspection_sections');
            $inspection_sections = json_decode($inspection_sections);
            $table_name = 'tra_gvp_inspection_dates';
            $user_id = $this->user_id;
           
            try {
                foreach ($inspection_sections as $inspection_section) {
                    $id = ''; 
                    $application_code = $inspection_section->application_code;
                    $inspection_id = $inspection_section->inspection_id;
                    $gvp_site_id = $inspection_section->gvp_site_id;
                    $start_date = $inspection_section->start_date;
                    $inspection_days = $inspection_section->inspection_days;
                    $end_date = '';
                    
                    $startDateTime = new \DateTime($start_date);
                    $end_date = $this->calculateGvpInspectionReturnDate($startDateTime->format('Y-m-d'), $inspection_days);
                    


                    $inspection_section_data = array(
                        'application_code' => $application_code,
                        'gvp_site_id' => $gvp_site_id,
                        'inspection_id' => $inspection_id,
                        //'start_date' => $start_date,
                        'end_date' => $end_date,
                        'inspection_days' => $inspection_days
                    );

                    $where = array(
                        'gvp_site_id' => $gvp_site_id,
                        'application_code' => $application_code
                    );

                    if (recordExists($table_name, $where)) {
                        $existingRecord = getPreviousRecords($table_name, $where);
                        if ($existingRecord['success'] == false) {
                            return $existingRecord;
                        }

                        $inspection_section_data['start_date'] =$start_date;
                        $inspection_section_data['dola'] = Carbon::now();
                        $inspection_section_data['altered_by'] = $user_id;
                        updateRecord($table_name, $existingRecord['results'], $where, $inspection_section_data, $user_id);
                          $res = array(
                            'success' => true,
                            'message' => 'Inspection Dates report updated successfully!!'
                        );
                    } else {

                         // Check if there is a record in tra_gvp_inspection_dates
                        $lastInspectionDate = DB::table('tra_gvp_inspection_dates')
                              ->where('inspection_id', $inspection_id)
                              ->orderBy('created_on', 'desc')
                              ->first();

                        if ($lastInspectionDate) {
                              // If a record exists, get the end_date from the last record
                             $last_end_date = $lastInspectionDate->end_date;
                             $lastEndDateTime = new \DateTime($last_end_date);
                             $next_start_date = $this->calculateGvpInspectionReturnDate($lastEndDateTime->format('Y-m-d'), 1);
                            
                             if ($start_date >= $next_start_date) {
                              $inspection_section_data['start_date'] =$start_date;
                             }else{
                              $prev_mansite_application_code=$lastInspectionDate->application_code;
                              $tracking_no = getSingleRecordColValue('tra_gvp_applications', array('application_code' => $application_code), 'tracking_no');
                              $prev_mansite_tracking_no = getSingleRecordColValue('tra_gvp_applications', array('application_code' => $prev_mansite_application_code), 'tracking_no');

                              $res = array(
                                  'success' => false,
                                  'message' => 'Inspection start day for '.$tracking_no.' is supposed to be atleast ' .$next_start_date.'.This is based on '.$prev_mansite_tracking_no.' Inspection end date(' . $lastEndDateTime->format('Y-m-d').') !!'
                              );
                              echo json_encode($res);
                              exit();
                             }   
                        }else{
                          $inspection_section_data['start_date'] =$start_date;
                        }

                        // Insert as a new record
                        $inspection_section_data['dola'] = Carbon::now();
                        $inspection_section_data['created_by'] = $user_id;
                        DB::table($table_name)->insert($inspection_section_data);
                          $res = array(
                            'success' => true,
                            'message' => 'Inspection Dates saved successfully!!'
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

}
