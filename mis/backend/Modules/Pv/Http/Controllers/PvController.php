<?php

namespace Modules\Pv\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Excel;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PDF;
use \Mpdf\Mpdf as mPDF;
use PhpOffice\PhpPresentation\Style\Alignment;
use PhpOffice\PhpPresentation\Style\Color;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Style\Font;
use PhpOffice\PhpWord\Shared\Converter;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Modules\Pv\Traits\PvTrait;

class PvController extends Controller
{
    use PvTrait;
    
    
    protected $user_id;

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

    public function getRelatedProblems(Request $request){
        $application_code = $request->input('application_code');
        try {
           $qry = DB::table('tra_additional_problems as t1')
                ->leftJoin('par_adr_related_problems as t2', 't1.adr_related_problems_id', '=', 't2.id')
                ->select('t1.*','t2.name as related_problem')
                ->groupBy('t1.id');
           
            $qry->Where('t1.application_code', $application_code);

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


public function getFacilityList(Request $request)
    {
        $region_id = $request->input('region_id');
        $district_id = $request->input('district_id');
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
                        case 'facility_name' :
                            $whereClauses[] = "t1.facility_name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_level' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_ownership' :
                            $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_authority' :
                            $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_hsd' :
                            $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_region' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'facility_district' :
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
    
                $qry = DB::table('pv_facility_cased as t1')
                ->leftJoin('par_pv_facilityauthority as t2', 't1.facility_authority_id', '=', 't2.id')
                ->leftJoin('par_facility_levels as t3', 't1.facility_level_id', '=', 't3.id')
                ->leftJoin('par_premise_regions as t4', 't1.region_id', '=', 't4.id')
                ->leftJoin('par_premise_districts as t5', 't1.district_id', '=', 't5.id')
                ->leftJoin('par_facility_ownership as t6', 't1.facility_ownership_id', '=', 't6.id')
                ->leftJoin('par_facility_hsd as t7', 't1.facility_hsd_id', '=', 't7.id')
                ->select('t1.*','t1.id as facility_id','t2.name as facility_authority','t4.name as facility_region','t3.name as facility_level','t5.name as facility_district','t6.name as facility_ownership','t7.name as facility_hsd');
           
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($region_id)) {
                $qry->where('t1.region_id', $region_id);
            }
            if (validateIsNumeric($district_id)) {
                $qry->where('t1.district_id', $district_id);
            }
       
            $totalCount  = $qry->count();
            $records = $qry->skip($start*$limit)->take($limit)->get();
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


public function updateAEFICategory(Request $req)
    {
        $application_code = $req->application_code;
        $selected = $req->selected;
        $selected_recs = json_decode($selected);
        $res = array('success' => true, 'message' => 'No record to update');
        try {
            foreach ($selected_recs as $selected) {
                $aefi_category_id = $selected->aefi_category_id;
                $reaction_id = $selected->reaction_id;
                $update_data = array(
                    'aefi_category_id' => $aefi_category_id,
                );
                $where = array(
                    'application_code' => $application_code,
                    'id' => $reaction_id
                );
                $res = updateRecordNoPrevious('tra_pv_reaction', $where, $update_data);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }



 public function getStudyDetails(Request $request){
        $application_code = $request->input('application_code');
        try {
           $qry = DB::table('tra_pv_study_details as t1')
                ->leftJoin('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->select('t1.*','t2.name as study_country')
                ->groupBy('t1.id');
           
            $qry->where('t1.application_code', $application_code);

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


public function getCasaultyAssessment(Request $request)
{
    $application_code = $request->input('application_code');
    $reaction_id = $request->input('reaction_id');

    try {
        $qry = DB::table('tra_pv_causality_assessment as t1')
            ->leftJoin('par_pv_causality_asssessment as t2', 't1.question_id', '=', 't2.id')
            ->leftJoin('par_pv_assessment_confirmation as t3', 't1.score_id', '=', 't3.id')
            ->where('t1.application_code', $application_code)
            ->select(DB::raw("DISTINCT t1.id, t1.*, t2.question,t2.quidelines,t3.name as score_option"));


            if(validateIsNumeric($reaction_id)){
                $qry->where('t1.reaction_id',$reaction_id);
            }

            $causalityReport_main = $qry->get();

        if ($causalityReport_main->isNotEmpty()) {
            $results = $causalityReport_main;
        } else {
            $templatereport_qry = DB::table('par_pv_causality_asssessment as t1')
                ->select(DB::raw("DISTINCT t1.id, t1.*, t1.id as question_id,'' as score_option "));
            $results = $templatereport_qry->get();
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



public function getWHOCasaultyAssessment(Request $request)
{
    $application_code = $request->input('application_code');
    $reaction_id = $request->input('reaction_id');

    try {
        $qry = DB::table('tra_pv_who_causality_assessment as t1')
            ->leftJoin('par_pv_who_causality_asssessment as t2', 't1.question_id', '=', 't2.id')
            ->leftJoin('par_confirmations as t3', 't1.score_id', '=', 't3.id')
            ->where('t1.application_code', $application_code)
            ->select(DB::raw("DISTINCT t1.id, t1.*, t2.question,t2.quidelines,t3.name as score_option"));


            if(validateIsNumeric($reaction_id)){
                $qry->where('t1.reaction_id',$reaction_id);
            }

            $causalityReport_main = $qry->get();

        if ($causalityReport_main->isNotEmpty()) {
            $results = $causalityReport_main;
        } else {
            $templatereport_qry = DB::table('par_pv_who_causality_asssessment as t1')
                ->select(DB::raw("DISTINCT t1.id, t1.*, t1.id as question_id,'' as score_option "));
            $results = $templatereport_qry->get();
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


    public function saveAssessmentReportdetails(Request $request)
        {
            $application_code = $request->input('application_code');
            $report_questions = $request->input('report_questions');
            $diagnosis_meddra_level_id = $request->input('diagnosis_meddra_level_id');
            $giagnosis_medra_id = $request->input('giagnosis_medra_id');
            $report_questions = json_decode($report_questions);
            $table_name = 'tra_pv_causality_assessment';
            $user_id = $this->user_id;

           

            try {
                foreach ($report_questions as $report_question) {
                    $id = ''; 
                    $question_id = $report_question->question_id;
                    $reaction_id = $report_question->reaction_id;
                    $score_id = $report_question->score_id;
                    $score = '';
                    $comment = isset($report_question->comment) ? $report_question->comment : '';
                    $reviewer_comment = isset($report_question->reviewer_comment) ? $report_question->reviewer_comment : '';
                    if (recordExists('tra_pv_who_causality_assessment', $where = array('application_code' => $application_code,'reaction_id' => $reaction_id))) {
                            $res = array(
                                'success' => false,
                                'message' => 'Causality Assessment already done using WHO Assessment Tool!!'
                             );
                            echo json_encode($res);
                            exit();
                    }

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
                        'reaction_id' => $reaction_id,
                        'question_id' => $question_id,
                        'application_code' => $application_code,
                        'score_id' => $score_id,
                        'comment' => $comment,
                        'reviewer_comment' => $reviewer_comment,
                        'score' => $score
                    );

                    $where = array(
                        'reaction_id' => $reaction_id,
                        'question_id' => $question_id,
                        'application_code' => $application_code
                    );

                    if (recordExists($table_name, $where)) {
                        $existingRecord = getPreviousRecords($table_name, $where);
                        if ($existingRecord['success'] == false) {
                            return $existingRecord;
                        }
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $user_id;
                        updateRecord($table_name, $existingRecord['results'], $where, $report_question_data, $user_id);
                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report updated successfully!!'
                        );
                    } else {

                        // Insert as a new record
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $user_id;
                        DB::table($table_name)->insert($report_question_data);

                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report saved successfully!!'
                        );
                    }

                     $update_data = array(
                            'diagnosis_meddra_level_id' => $diagnosis_meddra_level_id,
                            'giagnosis_medra_id' => $giagnosis_medra_id,
                        );
                        $where = array(
                        'application_code' => $application_code,
                        'id' => $reaction_id
                        );
                        $res = updateRecordNoPrevious('tra_pv_reaction', $where, $update_data);
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



        public function saveWHOAssessmentReportdetails(Request $request)
        {
            $application_code = $request->input('application_code');
            $report_questions = $request->input('report_questions');
            $diagnosis_meddra_level_id = $request->input('diagnosis_meddra_level_id');
            $giagnosis_medra_id = $request->input('giagnosis_medra_id');
            $report_questions = json_decode($report_questions);
            $table_name = 'tra_pv_who_causality_assessment';
            $user_id = $this->user_id;

            try {
                foreach ($report_questions as $report_question) {
                    $id = ''; 
                    $question_id = $report_question->question_id;
                    $reaction_id = $report_question->reaction_id;
                    $score_id = $report_question->score_id;
                    $comment = isset($report_question->comment) ? $report_question->comment : '';
                    $reviewer_comment = isset($report_question->reviewer_comment) ? $report_question->reviewer_comment : '';


                     if (recordExists('tra_pv_causality_assessment', $where = array('application_code' => $application_code,'reaction_id' => $reaction_id))) {
                            $res = array(
                                'success' => false,
                                'message' => 'Causality Assessment already done using Naranjo Assessment Tool!!'
                             );
                            echo json_encode($res);
                            exit();
                    }

                    $report_question_data = array(
                        'reaction_id' => $reaction_id,
                        'question_id' => $question_id,
                        'comment' => $comment,
                        'reviewer_comment' => $reviewer_comment,
                        'application_code' => $application_code,
                        'score_id' => $score_id
                    );


                    $where = array(
                        'reaction_id' => $reaction_id,
                        'question_id' => $question_id,
                        'application_code' => $application_code
                    );

                    if (recordExists($table_name, $where)) {

                        $existingRecord = getPreviousRecords($table_name, $where);
                        if ($existingRecord['success'] == false) {
                            return $existingRecord;
                        }
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $user_id;


                        $dd=updateRecord($table_name, $existingRecord['results'], $where, $report_question_data, $user_id);

                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report updated successfully!!'
                        );
                    } else {
                        // Insert as a new record
                        $report_question_data['dola'] = Carbon::now();
                        $report_question_data['altered_by'] = $user_id;
                        DB::table($table_name)->insert($report_question_data);

                          $res = array(
                            'success' => true,
                            'message' => 'Causality Assessment report saved successfully!!'
                        );
                    }


                      $update_data = array(
                            'diagnosis_meddra_level_id' => $diagnosis_meddra_level_id,
                            'giagnosis_medra_id' => $giagnosis_medra_id,
                        );
                        $where = array(
                        'application_code' => $application_code,
                        'id' => $reaction_id
                        );
                        $res = updateRecordNoPrevious('tra_pv_reaction', $where, $update_data);
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




    public function savePvReceivingBaseDetails(Request $req, $inCall = 0)
    {
        try {
            
            $active_application_id = $req->input('active_application_id');
            $process_id = $req->input('process_id');
            $workflow_stage_id = $req->input('workflow_stage_id');
           
            $section_id = $req->input('section_id');
            $module_id = $req->input('module_id');
            $sub_module_id = $req->input('sub_module_id');
            $applicant_id = $req->input('applicant_id');
            $user_id = $this->user_id;
            $pv_id = $req->input('pv_id');
            $reg_serial = $req->reg_serial;
            $data = $req->All();
            //unset data 
            unset($data['active_application_id']);
            unset($data['_token']);
            unset($data['pv_id']);
            unset($data['table_name']);
            // //check submodule 
            // if($sub_module_id == 77){ //variation/reevaluation
            //     return $this->saveReEvaluationApplication($req, $inCall);
            //      DB::commit();
            // }
            DB::beginTransaction();
            //data updates
            if (validateIsNumeric($active_application_id)) {
                //update
                $applications_table = 'tra_pv_applications';
                $where_app = array(
                    'id' => $active_application_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //update data
                    updateRecordNoPrevious($applications_table, $where_app, $data, $user_id);
                }

                //get existing data
                $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                    DB::rollBack();
                    return $app_details;
                }
                $app_details = $app_details['results'];

                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $tracking_no = $app_details[0]['tracking_no'];
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;

                //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(10,100), $user_id);

                $res['active_application_id'] = $active_application_id;
                $res['active_application_code'] = $application_code;
                $res['ref_no'] = $tracking_no;
                $res['tracking_no'] = $tracking_no;
                $res['success'] = true;
                $res['message'] = 'All is well';
                DB::commit();
            } else {

                    $data['created_by'] = \Auth::user()->id;
                    $data['created_on'] = Carbon::now();
                    $applications_table = 'tra_pv_applications';

                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                    $codes_array = array(
                        'section_code' => getSingleRecordColValue('par_sections', array('id' => $section_id), 'code'),
                        'adr_type' => getSingleRecordColValue('par_adr_types', array('id' => $req->adr_type_id), 'code')
                    );
                   $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, 1, $user_id);
                    if ($tracking_details['success'] == false) {
                        DB::rollBack();
                        return \response()->json($tracking_details);
                    }
                    $tracking_no = $tracking_details['tracking_no'];
                    

                    //registration serial
                    if(!validateIsNumeric($reg_serial)){
                        $reg_serial = getRegistrationSerial($module_id);
                    }                    
                    $view_id = generateApplicationViewID();
                    
                    //add autogenerated data
                    $data['application_code'] = $application_code;
                    $data['tracking_no'] = $tracking_no;
                    $data['view_id'] = $view_id;
                    $data['reg_serial'] = $reg_serial;
                    $data['date_added'] = Carbon::now();
                    $data['application_status_id'] = $application_status->status_id;

                    //application details

                    $res = insertRecord('tra_pv_applications', $data, $user_id);
                    if ($res['success'] == false) {
                            DB::rollBack();
                            return $res;
                        }
                    //duplicate to portal
                    // insertRecord('wb_product_applications', $app_data, $user_id, 'portal_db');

                    $active_application_id = $res['record_id'];
                   
                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $active_application_id,
                        'process_id' => $process_id,
                        'application_code' => $application_code,
                        "tracking_no" => $tracking_no,
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
                        'zone_id' => 1,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'is_fast_track' => 2,
                        'created_by' => $user_id
                    );

                    $sub_res = insertRecord('tra_submissions', $submission_params);
                    if(!$sub_res['success']){
                        return $sub_res;
                    }
                    $res['active_application_id'] = $active_application_id;
                    $res['active_application_code'] = $application_code;
                    $res['pv_id'] = $active_application_id;
                    $res['ref_no'] = $tracking_no;
                    $res['tracking_no'] = $tracking_no;

                    DB::commit();

                    // initialize function
                   //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(10,100), $user_id);
            }

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
    public function onLoadSuspectedDrugs(Request $req){
        try{
            $application_code = $req->application_code;
            $is_other_drugs_used = $req->is_other_drugs_used;

            $qry = DB::table('tra_pv_suspected_drugs as t1')
             ->leftJoin('par_adr_drugrole as t2', 't1.drug_role_id', '=', 't2.id') 
             ->leftJoin('par_adr_suspected_ingredients as t3', 't1.suspected_ingredient_id', '=', 't3.id') 
             
             ->select(DB::raw("DISTINCT  t1.id,t1.*,t2.name as drug_role,t3.name as suspected_ingredient"))
                    ->where('t1.application_code', $application_code);



            if(validateIsNumeric($is_other_drugs_used)){
                $qry->where('is_other_drugs_used', $is_other_drugs_used);
            }else{
                $qry->whereNull('is_other_drugs_used');
            }
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

       public function onLoadTestProcedures(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_test_procedures as t1')
             ->leftJoin('par_adr_test_result_signs as t2', 't1.test_logic_id', '=', 't2.id') 
             ->leftJoin('par_si_units as t3', 't1.test_si_unit_id', '=', 't3.id') 
             ->leftJoin('par_adr_test_code as t4', 't1.test_result_code_id', '=', 't4.id') 
             ->leftJoin('par_si_units as t5', 't1.lowvalue_si_unit_id', '=', 't5.id')
             ->leftJoin('par_si_units as t6', 't1.highvalue_si_unit_id', '=', 't6.id')  
             ->select(DB::raw("DISTINCT  t1.id,t1.*,CONCAT_WS(' ',t2.name,t1.no_of_tests,t3.name) as test_result,t4.name as test_result_code, CONCAT_WS(' ',t1.normal_low_value,t5.name) as low_value,CONCAT_WS(' ',t1.normal_high_value,t6.name) as high_value"))
                    ->where('t1.application_code', $application_code);
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

    public function onLoadReaction(Request $req)
    {
        try {
            $application_code = $req->application_code;
            // First Query: Retrieve results from tra_pv_reaction
            $results = DB::table('tra_pv_reaction as t1')
                ->leftJoin('par_adr_outcomes as t2', 't1.adr_outcome_id', '=', 't2.id')
                ->leftJoin('par_aefi_categories as t3', 't1.aefi_category_id', '=', 't3.id')
                ->select(
                    DB::raw("DISTINCT  t1.id,t1.*,t2.name as outcomes,t3.name as aefi_category")
                )
                ->where('t1.application_code', $application_code)
                ->get();

            // Iterate through each result and get the corresponding sum
            foreach ($results as $result) {
                $id = $result->id;
                $sumResult = DB::table('tra_pv_causality_assessment as t1')
                    ->leftJoin('par_pv_causality_asssessment as t2', 't1.question_id', '=', 't2.id')
                    ->where('t1.reaction_id', $id)
                    ->where('t1.application_code', $application_code)
                    ->select(DB::raw('SUM(t1.score) as causality_outcomes'))
                    ->first();

                // Set causality_outcomes based on the sum
                if ($sumResult && $sumResult->causality_outcomes !== null) {
                    $sum = $sumResult->causality_outcomes;
                    $message = 'Total Score: ' . $sum;
                    if ($sum > 9) {
                        $message .= ' (Definite)';
                    } else if ($sum >= 5 && $sum <= 8) {
                        $message .= ' (Probable)';
                    } else if ($sum >= 1 && $sum <= 4) {
                        $message .= ' (Possible)';
                    } else if ($sum <= 0) {
                        $message .= ' (Doubtful)-Naranjo';
                    }
                } else {
                    // Query for $scoreResult from another table
                    $scoreResult = DB::table('tra_pv_who_causality_assessment as t1')
                        ->leftJoin('par_pv_who_causality_asssessment as t2', 't1.question_id', '=', 't2.id')
                        ->where('t1.reaction_id', $id)
                        ->where('t1.application_code', $application_code)
                        ->select(DB::raw('t1.*'))
                        ->get();

                    // Logic to handle $scoreResult and set $message
                    if ($scoreResult->isEmpty()) {
                        // No records found in tra_pv_who_causality_assessment
                        $message = '<span style="color: red;">Pending Assessment</span>';
                    } else {
                        $outcomeCounts = [];
                        foreach ($scoreResult as $score) {
                            $questionId = $score->question_id;
                            $scoreId = $score->score_id;

                            if ($scoreId === 1) {
                                if (!array_key_exists($questionId, $outcomeCounts)) {
                                    $outcomeCounts[$questionId] = 0;
                                }
                                $outcomeCounts[$questionId]++;
                            }
                        }

              
                        $certainQuestionIds = [1, 2, 3, 4, 5];
                        $probableQuestionIds = [1, 2, 3, 4];
                        $possibleQuestionIds = [1, 4];
                        $unlikelyQuestionIds = [4];
                        $conditionalQuestionIds = [6,7];
                        $unassessableQuestionIds = [8];
                   
                        $maxOutcome = '';

                        if (array_intersect(array_keys($outcomeCounts), $certainQuestionIds) === $certainQuestionIds) {
                            $maxOutcome = 'Certain';
                        } else if (array_intersect(array_keys($outcomeCounts), $probableQuestionIds) === $probableQuestionIds) {
                            $maxOutcome = 'Probable / Likely';
                        } else if (array_intersect(array_keys($outcomeCounts), $possibleQuestionIds) === $possibleQuestionIds) {
                            $maxOutcome = 'Possible';
                        } else if (array_intersect(array_keys($outcomeCounts), $unlikelyQuestionIds) === $unlikelyQuestionIds) {
                            $maxOutcome = 'Unlikely';
                        } else if (array_intersect(array_keys($outcomeCounts), $conditionalQuestionIds) === $conditionalQuestionIds) {
                            $maxOutcome = 'Conditional / Unclassified';
                        } else if (array_intersect(array_keys($outcomeCounts), $unassessableQuestionIds) === $unassessableQuestionIds) {
                            $maxOutcome = 'Unassessable / Unclassifiable';
                        }

                       $message = $maxOutcome !== '' ? $maxOutcome . ' (WHO)' : 'Outcome Unknown (WHO)';
                    }
                }

                // Append suspected drug to result
                $suspectedDrug = DB::table('tra_pv_suspected_drugs')
                    ->where('application_code', $application_code)
                    ->where('drug_role_id', 1)
                    ->pluck('who_drug_name')
                    ->toArray();

                $result->suspected_drug = implode(', ', $suspectedDrug);

                // Assign the message to causality_outcomes
                $result->causality_outcomes = $message;
            }

            $res = [
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            ];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }

        return response()->json($res);
    }




       public function getIndication(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_indication as t1')
            ->where('t1.application_code', $application_code);
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

      public function onLoadStudyInformation(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_study_information as t1')
             ->leftJoin('par_clinical_phases as t2', 't1.study_type_id', '=', 't2.id') 
             ->select(DB::raw("DISTINCT  t1.id,t1.*,t2.name as study_type"))
                    ->where('t1.application_code', $application_code);
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

    public function onLoadMedicalHistory(Request $req){
        return $this->onLoadMedicalHistoryDetails($req);
    }

     public function onLoadPersonnel(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_personnel as t1')
            ->leftJoin('par_adr_reporter_types as t2', 't1.adr_reporter_type_id', '=', 't2.id')
            ->leftJoin('par_titles as t3', 't1.title_id', '=', 't3.id')
            ->leftJoin('par_cities as t4', 't1.city_id', '=', 't4.id')
            ->leftJoin('par_regions as t5', 't1.region_id', '=', 't5.id')
            ->leftJoin('par_districts as t6', 't1.district_id', '=', 't6.id')
            ->leftJoin('par_pv_reporter_qualifications as t7', 't1.qualification_id', '=', 't7.id')
            ->leftJoin('par_adr_reporter_categories as t8', 't1.reporter_category_id', '=', 't8.id')
            ->select(DB::raw("DISTINCT  t1.id,t1.*,t8.name as organization_category, t2.name as reporter_as,t3.name as title,t4.name as city,t5.name as region,t6.name as district,t7.name as qualification,  CASE WHEN t1.reporter_category_id = 1 THEN t1.facility_name WHEN t1.reporter_category_id = 2 THEN t1.ltr_name ELSE t1.organisation END AS organisation_details")) 
                    ->where('t1.application_code', $application_code);
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

    public function onLoadFrequentReporters(Request $req){
        $start = $req->start;
        $limit = $req->limit;
        $filter = $req->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'first_name' :
                            $whereClauses[] = "t1.first_name like '%" . ($filter->value) . "%'";
                            break;
                        case 'last_name' :
                            $whereClauses[] = "t1.last_name like '%" . ($filter->value) . "%'";
                            break;
                        case 'physical_address' :
                            $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                             break;
                        case 'telephone_no' :
                            $whereClauses[] = "t1.telephone_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'email_address' :
                            $whereClauses[] = "t1.email_address like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try{
         
            $qry = DB::table('tra_pv_personnel as t1')
            ->leftJoin('par_adr_reporter_types as t2', 't1.adr_reporter_type_id', '=', 't2.id')
            ->leftJoin('par_titles as t3', 't1.title_id', '=', 't3.id')
            ->leftJoin('par_cities as t4', 't1.city_id', '=', 't4.id')
            ->leftJoin('par_regions as t5', 't1.region_id', '=', 't5.id')
            ->leftJoin('par_districts as t6', 't1.district_id', '=', 't6.id')
            ->leftJoin('par_pv_reporter_qualifications as t7', 't1.qualification_id', '=', 't7.id')
            ->leftJoin('par_adr_reporter_categories as t8', 't1.reporter_category_id', '=', 't8.id')
            ->select(DB::raw("DISTINCT  t1.id,t1.*,t8.name as organization_category, t2.name as reporter_as,t3.name as title,t4.name as city,t5.name as region,t6.name as district,t7.name as qualification,  CASE WHEN t1.reporter_category_id = 1 THEN t1.facility_name WHEN t1.reporter_category_id = 2 THEN t1.ltr_name ELSE t1.organisation END AS organisation_details"));
           if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }

            $totalCount  = $qry->count();
            $records = $qry->skip($start*$limit)->take($limit)->get();
             // Iterate through each result and unset the undesired fields
            foreach ($records as $record) {
                unset($record->id, $record->pv_id, $record->application_code);
            }
            $res = array('success'=>true, 
                        'results'=>$records,
                        'totalCount'=>$totalCount
        );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        }
        return \response()->json($res);
    }



    public function onLoadSenderDetails(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_sender_details as t1')
             ->leftJoin('par_adr_reporter_types as t2', 't1.adr_reporter_type_id', '=', 't2.id')
            ->leftJoin('par_titles as t3', 't1.title_id', '=', 't3.id')
            ->leftJoin('par_cities as t4', 't1.city_id', '=', 't4.id')
            ->leftJoin('par_regions as t5', 't1.region_id', '=', 't5.id')
            ->leftJoin('par_districts as t6', 't1.district_id', '=', 't6.id')
            ->select(DB::raw("DISTINCT  t1.id,t1.*,t2.name as reporter_as,t3.name as title,t4.name as city,t5.name as region,t6.name as district")) 
                    ->where('t1.application_code', $application_code);
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


    public function onLoadDrugHistory(Request $req){
        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_drug_history as t1')
                    ->where('t1.application_code', $application_code);
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


     public function getDashboardApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_pv_applications as t1')
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
             
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user, CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name))  as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tpin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*"))

                ->where('t5.stage_status','<>',3)
                ->where('isDone', 0);

            if(!$is_super){
                $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
                $qry->whereNull('t1.usr_to');
            }
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
    public function prepareNewPvReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_pv_applications as t1')
                ->select('t1.*', 't1.id as pv_id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*','t1.id as pv_id', 't1.id as active_application_id',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't4.id as invoice_id', 't4.invoice_no');

            $results = $qry1->first(); 

            // $qry2 = clone $main_qry;
            // $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
            //     ->select('t3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
            //         't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
            //         't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            // $ltrDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                // 'ltrDetails' => $ltrDetails,
                'message' => 'All is well'
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }


   

    public function getStagePvApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $workflow_stage = $request->input('workflow_stage_id');
        $table_name = getTableName($module_id);
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('par_adr_types as t2', 't1.adr_type_id', '=', 't2.id')
                 ->leftJoin('par_adr_categories as t2a', 't1.report_category_id', '=', 't2a.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_gender as t6', 't1.gender_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('wf_workflow_stages as t12', 't9.current_stage', 't12.id')
                ->leftJoin('tra_evaluation_recommendations as t13', function ($join) use($workflow_stage) {
                    $join->on('t1.application_code', '=', 't13.application_code')
                        ->on('t12.stage_category_id', '=', 't13.stage_category_id')
                        ->where('t9.current_stage', $workflow_stage);
                })
                ->leftJoin('tra_approval_recommendations as t14', 't1.application_code', 't14.application_code')
               ->leftJoin('tra_pv_reporter_notification_logs as t15', 't1.application_code', 't15.application_code')
               ->join('tra_pv_personnel as t16', 't1.application_code', 't16.application_code')
                        ->leftJoin('par_titles as t7', 't16.title_id', '=', 't7.id')
                ->select('t1.*', 't1.id as pv_id', DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by, t16.email_address as reporter_email, CONCAT_WS(' ',t16.first_name,t16.last_name,'(',t7.name ,')') as reporter_name"), 't9.date_received as submitted_on', 't3.name as applicant_name', 't4.name as application_status','t2.name as adr_type','t6.name as gender',
                't1.id as active_application_id', 't12.stage_category_id','t13.id as recommendation_record_id','t13.recommendation_id','t13.remarks','t14.decision_id as approval_decision_id', 't1.treatment as final_recommendation', 't15.id as response_id','t15.response', 't15.subject','t2a.name as report_category')
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0) );
            $results = $qry->orderBy('t9.id','desc')->get();
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


    public function getPvApplicationMoreDetails(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            $qry = DB::table('tra_pv_applications as t1')
                ->select('t1.id as pv_id', 't1.*')
                ->where('t1.application_code', $application_code);

            $pv_details = $qry->first();

            $res = array(
                'success' => true,
                'pv_details' => $pv_details,
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
  public function sendReporterNotification(Request $request){
    $application_code = $request->input('application_code');
    $subject = $request->input('subject');
    $response = $request->input('response');
    $attachment = $request->file('uploaded_doc');
    $attachment_path = null;
    $selected_appcodes = $request->input('selected_appcodes');

    // Handle the attachment once
    if ($attachment) {
        $attachment_path = $this->handleAttachment($attachment);
    }

    if ($selected_appcodes != '') {
        $selected_appcodes = json_decode($selected_appcodes);

        foreach ($selected_appcodes as $application_code) {
            $this->sendMailAndLogNotification($application_code, $subject, $response, $attachment_path, $attachment);
        }
    } else {
        $this->sendMailAndLogNotification($application_code, $subject, $response, $attachment_path, $attachment);
    }

    // Clean up the attachment after all notifications are sent
    if ($attachment_path && file_exists($attachment_path)) {
       // unlink($attachment_path);
    }


    return response()->json(['success' => true, 'message' => 'Feedback sent successfully']);
}


public function handleAttachment($attachment)
{
    if ($attachment) {
        $attachment_name = $attachment->getClientOriginalName();
        $extension = $attachment->getClientOriginalExtension();
        $document_rootupload = Config('constants.dms.doc_rootupload');
        $destination = getcwd() . $document_rootupload;
        $savedName = str_random(3) . time() . '.' . $extension;
        $watermarkText = 'CONFIDENTIAL';
        $attachment->move($destination, $savedName);
        //$this->addWatermark($attachment, $destination, $watermarkText,$savedName);
        //$this->addExcelWatermark($attachment, $destination, $watermarkText,$savedName);
        return $destination . $savedName;
    }
    return null;
}


public function addExcelWatermark($attachment, $destination, $watermarkText, $savedName) {
    try {
        // Create a temporary file for the uploaded Excel
        $tempPath = tempnam(sys_get_temp_dir(), 'excel_');
        $attachment->move(dirname($tempPath), basename($tempPath));

        // Load the Excel file using the Xlsx reader
        $reader = IOFactory::createReader('Xlsx');
        $spreadsheet = $reader->load($tempPath);

        // Loop through all sheets and add the text watermark to each sheet
        foreach ($spreadsheet->getAllSheets() as $sheet) {
            // Add text watermark
            $sheet->getHeaderFooter()->setOddHeader('&L&G&F' . $watermarkText);
            $sheet->getHeaderFooter()->setEvenHeader('&L&G&F' . $watermarkText);
        }

        // Ensure the destination directory exists
        if (!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        // Form the full path for the output Excel file
        $outputPath = rtrim($destination, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $savedName;

        // Save the modified Excel file
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save($outputPath);

        // Remove the temporary file
        unlink($tempPath);

        return true; // Return true on success
    } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
        // Handle any exceptions that occur during the process
        echo 'Error: ' . $e->getMessage();
        return false; // Return false on failure
    }
}



public function addImageWatermark($sourceFile, $destination, $watermarkFile, $savedName) {
    // Create an Imagick object for the source image
    $image = new Imagick($sourceFile);

    // Create an Imagick object for the watermark image
    $watermark = new Imagick($watermarkFile);

    // Get the dimensions of the source image and the watermark image
    $imageWidth = $image->getImageWidth();
    $imageHeight = $image->getImageHeight();
    $watermarkWidth = $watermark->getImageWidth();
    $watermarkHeight = $watermark->getImageHeight();

    // Calculate the position to place the watermark (centered)
    $x = ($imageWidth - $watermarkWidth) / 2;
    $y = ($imageHeight - $watermarkHeight) / 2;

    // Composite the watermark on the source image
    $image->compositeImage($watermark, imagick::COMPOSITE_OVER, $x, $y);

    // Ensure the destination directory exists
    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    // Form the full path for the output image file
    $outputPath = rtrim($destination, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $savedName;

    // Write the new image to the destination
    $image->writeImage($outputPath);

    // Clean up
    $image->clear();
    $image->destroy();
    $watermark->clear();
    $watermark->destroy();
}


public function addWordWatermark($sourceFile, $destination, $watermarkText, $savedName) {
    // Load the Word document
    $phpWord = IOFactory::load($sourceFile);

    // Loop through all sections and add the watermark text to the header
    foreach ($phpWord->getSections() as $section) {
        $header = $section->addHeader();

        // Add a text watermark
        $watermark = $header->addWatermarkShape();
        $watermark->addText($watermarkText, [
            'font' => ['size' => 50, 'color' => 'C0C0C0', 'bold' => true],
            'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER,
            'rotate' => 45
        ]);

        // Alternatively, you can use an image as a watermark
        // $header->addImage('path/to/watermark/image.png', ['width' => 100, 'height' => 100, 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER, 'marginTop' => -80, 'wrappingStyle' => 'behind']);
    }

    // Ensure the destination directory exists
    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    // Form the full path for the output Word document
    $outputPath = rtrim($destination, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $savedName;

    // Save the modified Word document
    $writer = IOFactory::createWriter($phpWord, 'Word2007');
    $writer->save($outputPath);
}


public function addPptWatermark($sourceFile, $destination, $watermarkText, $savedName) {
    // Load the PowerPoint file
    $ppt = IOFactory::load($sourceFile);

    foreach ($ppt->getAllSlides() as $slide) {
        // Create a new rich text shape
        $shape = $slide->createRichTextShape()
            ->setHeight(100)
            ->setWidth(600)
            ->setOffsetX(170)
            ->setOffsetY(180);

        // Center the text
        $shape->getActiveParagraph()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Add the watermark text
        $textRun = $shape->createTextRun($watermarkText);
        $textRun->getFont()->setBold(true)
            ->setSize(60)
            ->setColor(new Color(Color::COLOR_GRAY));
    }

    // Ensure the destination directory exists
    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    // Form the full path for the output PowerPoint file
    $outputPath = rtrim($destination, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $savedName;

    // Save the modified PowerPoint file
    $writer = IOFactory::createWriter($ppt, 'PowerPoint2007');
    $writer->save($outputPath);
}

public function addWatermark($attachment, $destination, $watermarkText, $savedName) {
    $pdf = new \Mpdf\Mpdf();
    // Save the uploaded file to a temporary location
    $tempPath = tempnam(sys_get_temp_dir(), 'pdf_');
    $attachment->move(dirname($tempPath), basename($tempPath));

    // Set source file
    $pageCount = $pdf->setSourceFile($tempPath);

    for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
        // Import a page
        $tplId = $pdf->importPage($pageNo);
        $pdf->AddPage();
        $pdf->useTemplate($tplId);

        // Set watermark font and color
        $pdf->SetFont('Helvetica', 'B', 50);
        $pdf->SetTextColor(255, 192, 203);

        // Get page width and height
        $size = $pdf->getTemplateSize($tplId);
        $width = $size['width'];
        $height = $size['height'];

        // Add watermark text
        $pdf->StartTransform();
        $pdf->Rotate(45, $width / 2, $height / 2);
        $pdf->Text($width / 4, $height / 2, $watermarkText);
        $pdf->StopTransform();

         // Reset the transparency to default
        $pdf->SetAlpha(1);
    }

    // Ensure destination directory exists
    if (!is_dir($destination)) {
        mkdir($destination, 0755, true);
    }

    // Form the full path for the output PDF
    $outputPath = rtrim($destination, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $savedName;

    // Output the new PDF to the specified destination
    $pdf->Output($outputPath, 'F');

    // Clean up the temporary file
    unlink($tempPath);
}




public function sendMailAndLogNotification($application_code, $subject, $response, $attachment_path, $attachment)
{
    try {
        $reporter = DB::table('tra_pv_applications as t1')
            ->join('tra_pv_personnel as t2', 't1.application_code', '=', 't2.application_code')
            ->leftJoin('par_titles as t3', 't2.title_id', '=', 't3.id')
            ->select(DB::raw("t2.email_address as reporter_email, CONCAT_WS(' ',t2.first_name,t2.last_name,'(',t3.name ,')') as reporter_name"))
            ->where('t1.application_code', $application_code)
            ->first();

        if (isset($reporter->reporter_email)) {
            if ($attachment_path) {
                sendMailNotification($reporter->reporter_name, $reporter->reporter_email, $subject, $response, '', '', $attachment_path, $attachment->getClientOriginalName());
            } else {
                sendMailFromNotification($reporter->reporter_name, $reporter->reporter_email, $subject, $response, '', '');
            }
        }

        // Update DB
        $where = ['application_code' => $application_code];
        $update = ['is_reporter_notified' => 1];
        $res = updateRecordNoPrevious('tra_pv_applications', $where, $update);

        // Log notification
        if ($res['success']) {
            $data = [
                'application_code' => $application_code,
                'subject' => $subject,
                'response' => $response
            ];
            insertRecord('tra_pv_reporter_notification_logs', $data);
            }

        } catch (\Exception $exception) {
            sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id);
        }
    }


   public function publishReport(Request $request){
        $application_code = $request->input('application_code');
        $selected = $request->input('selected');

        try {
            if (!empty($selected)) {
                $selected_appcodes = json_decode($selected);

                foreach ($selected_appcodes as $application_code) {
                    $this->publishAndLog($application_code);
                }
            } else {
                $this->publishAndLog($application_code);
            }

            return response()->json(['success' => true, 'message' => 'Report published successfully.']);
        } catch (\Exception $exception) {
            return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
        } catch (\Throwable $throwable) {
            return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__), \Auth::user()->id));
        }
    }

public function publishAndLog($application_code){
        $where = ['application_code' => $application_code];
        $update = ['is_published' => 1];

        $res = updateRecordNoPrevious('tra_pv_applications', $where, $update);

        if ($res['success']) {
            $data = [
                'application_code' => $application_code,
                'published_by' => $this->user_id,
                'published_on' => Carbon::now()
            ];
            insertRecord('tra_pv_published_logs', $data);
        }
    }

    public function exportAdrReport(Request $req)
    {
        $selected = json_decode($req->selected);
        $res = array('success'=>false, 'message'=>'No applications passed');
        try {
            //declare excel
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            //sample record from list
            $data = DB::table('tra_pv_applications as t1')->where('application_code', $selected[0])->first();
            $excel_config_filter = array(
                'module_id' => $data->module_id,
                'sub_module_id' => $data->sub_module_id,
                'section_id' => $data->section_id,
                'adr_type_id' => $data->adr_type_id
            );
            //export columns
            $columns = DB::table('par_exceluploads_config')->get();
            $header = [];
            $excel_header = [];
            foreach ($columns as $column) {
                $header[] = $column->table_column;
                $excel_header[] = $column->excelcolumnname;
            }
            //add excel headers
            $sheet->fromArray($excel_header, null, "A1");
            $row = 8;
            $k = 0;
            $sortedData=array();
            $total=count($header);
            //get data and populate
            foreach ($selected as $application_code) {
                $data = DB::table('tra_pv_applications as t1')->where('application_code', $application_code)->first();
                for($v=0;$v<$total;$v++){
                    $temp1=$header[$v];
                    $sortedData[$k][]=$data->$temp1;
                }
                $k++;  
                //update db
                $where = array(
                    'application_code' => $application_code
                );
                $update = ['is_exported' => 1];

                $res = updateRecordNoPrevious('tra_pv_applications', $where, $update);

                //log export
            }
            $sheet->fromArray( $sortedData, null, "A2");
            // future reference to lead from excel
            // $rv = [];
            // foreach ($sheet->getColumnIterator() as $column) {
            //     $column_letter =$column->getColumnIndex();
            // }
            $writer = new Xlsx($spreadsheet);
            $response =  new StreamedResponse(
                function () use ($writer) {
                  $writer->save('php://output');
                }
            );
          $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          $response->headers->set('Content-Disposition', 'attachment;filename=test.xlsx');
          $response->headers->set('Cache-Control','max-age=0');

        } catch (\Exception $exception) {
            $response = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $response = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $response;
    }
    
    public function getPvRegisterApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('tra_pv_applications as t1')
                ->leftJoin('par_adr_types as t2', 't1.adr_type_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_gender as t6', 't1.gender_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('wf_workflow_stages as t12', 't9.current_stage', 't12.id')
                ->leftJoin('tra_evaluation_recommendations as t13', 't1.application_code', 't13.application_code')
                ->leftJoin('tra_approval_recommendations as t14', 't1.application_code', 't14.application_code')
               ->leftJoin('tra_pv_reporter_notification_logs as t15', 't1.application_code', 't15.application_code')
                ->select('t1.*', 't1.id as pv_id', DB::raw("CONCAT_WS(' ',decrypt(t10.first_name),decrypt(t10.last_name)) as submitted_by"), 't9.date_received as submitted_on', 't3.name as applicant_name', 't4.name as application_status','t2.name as adr_type','t6.name as gender',
                     't1.id as active_application_id', 't12.stage_category_id','t13.id as recommendation_record_id','t13.recommendation_id','t13.remarks','t14.decision_id as approval_decision_id', 't1.treatment as final_recommendation', 't15.id as response_id','t15.response', 't15.subject');
                //->where('t14.decision_id',1);
          
            $results = $qry->orderBy('t9.id','desc')->get();
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
