<?php
namespace Modules\Promotionadverts\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait PromotionadvertsTraits
{
	
   public function funcPromotionaApplicationSubmission($application_code,$sub_module_id,$module_id,$req,$view_id,$next_stage)
    {
       
     
        $user_id = 0;
		$created_on=Carbon::now();
		$applications_table = 'tra_promotion_adverts_applications';
       // DB::beginTransaction();
        try {
           
            $portal_table = 'wb_promotion_adverts_applications';
            $qry = DB::table('wb_promotion_adverts_applications as t1')              
                ->where('t1.application_code', $application_code);
            $results = $qry->first();
		
			
            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return $res;
            }
            $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage), 'mis_db');
                        
                            if (is_null($workflow_details)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                                );
                                return $res;
                            }
            $portal_application_id = $results->id;
            $application_code = $results->application_code;
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where, 'mis_db');
            $app_previousdata = DB::connection('mis_db')->table($applications_table)
                                ->where('application_code',$application_code)
                                ->first();
				
                    $application_details = array(
                        'tracking_no' => $results->tracking_no,
                        'reference_no' => $results->reference_no,
                        'view_id' => $view_id,
                        'applicant_id' => $results->trader_id,
                        'application_code' => $application_code,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'zone_id' => $results->zone_id,
                        'section_id' => $results->section_id,
                        'process_id' => $process_details->id,
                        'workflow_stage_id' => $next_stage,
                        'portal_id' => $portal_application_id,
                        'events_responsible_person'=>$results->events_responsible_person,
						'advertisement_type_id'=>$results->advertisement_type_id,
                        'exhibition_start_date'=>formatDate($results->exhibition_start_date),
                        'exhibition_end_date'=>formatDate($results->exhibition_end_date),
                        'venue_of_exhibition'=>$results->venue_of_exhibition,
                        'target_audience_id'=>$results->target_audience_id,
                        'advert_language'=>$results->advert_language,
						'other_promotion_meetingtype'=>$results->other_promotion_meetingtype,
                        'physicaladdress_of_exhibition'=>$results->physicaladdress_of_exhibition,
                        'promotionameeting_other_information'=>$results->promotionameeting_other_information,
                        'other_promotion_materialtypes'=>$results->other_promotion_materialtypes,
                        'responsible_persons_contacts'=>$results->responsible_persons_contacts,
                        'responsible_persons_physicaladdress'=>$results->responsible_persons_physicaladdress,
                        'sponsor_id'=>$results->sponsor_id,
                        'promotionmaterial_category_id'=>$req->promotionmaterial_category_id,
                        'prommaterial_bookcatalogues_id'=>$req->prommaterial_bookcatalogues_id,
                        'applicant_as_sponsor'=>$results->applicant_as_sponsor,
                        'description_of_advert'=>$results->description_of_advert,
                        
                    );  
            
            if($app_previousdata){
				$application_id= $app_previousdata->id;
             //   $process_id = $app_previousdata->process_id;
                $process_name =$process_details->name;
                $workflow_id = $workflow_details->id;
                $workflowstage_name = $workflow_details->name;
                $applicant_id = $app_previousdata->applicant_id;
                $mis_application_id = $app_previousdata->id;
                $tracking_no = $app_previousdata->reference_no;
                $app_status_id = $app_previousdata->application_status_id;
                $application_details['dola'] = Carbon::now();
					
				$where_data = array('application_code'=>$application_code);
                           
                $app_previousdata = getPreviousRecords($applications_table, $where_data, 'mis_db');
                 
				 $promotion_product_particulars = DB::table('wb_promotion_prod_particulars')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw(" id,$application_id as application_id,brand_name,common_name_id,is_registered,registration_no,registrant_name,other_details,$user_id as created_by"))
                        ->get();
					DB::table('wb_promotion_prod_particulars')->where(array('application_id' => $portal_application_id))
					->delete();
                    foreach($promotion_product_particulars as $row){
                        
                        $portal_product_id=$row->id;
                        unset($row->id);
                        $promotion_product_particulars_insert = insertRecord('tra_promotion_prod_particulars', (Array)$row, $user_id, 'mis_db');
                        if ($promotion_product_particulars_insert['success'] == false) {
                            DB::rollBack();
                            return $promotion_product_particulars_insert;
                        }
                        
                    }
                    $promotion_materials_details = DB::table('wb_promotion_materials_details')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$application_id as application_id,material_id,remarks ,$user_id as created_by"))
                        ->get();
                    $promotion_materials_details = convertStdClassObjToArray($promotion_materials_details);
                   // $promotion_materials_details = unsetPrimaryIDsInArray($promotion_materials_details);
					  DB::connection('mis_db')->table('tra_promotion_materials_details')->where(array('application_id' => $application_id))
						->delete();
                    DB::connection('mis_db')->table('tra_promotion_materials_details')
                        ->insert($promotion_materials_details); 
					//meeting types 
					$wb_promotionmeetingtypes_details = DB::table('wb_promotionmeetingtypes_details')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$application_id as application_id,meeting_type_id,remarks ,$user_id as created_by"))
                        ->get();
                    $data = convertStdClassObjToArray($wb_promotionmeetingtypes_details);
                   // $promotion_materials_details = unsetPrimaryIDsInArray($promotion_materials_details);
					  DB::connection('mis_db')->table('tra_promotionmeetingtypes_details')->where(array('application_id' => $application_id))
						->delete();
                    DB::connection('mis_db')->table('tra_promotionmeetingtypes_details')
                        ->insert($data); 
						//wb_promotion_advertisement_channels
						$wb_promotion_advertisement_channels = DB::table('wb_promotion_advertisement_channels')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$application_id as application_id,advertisement_channel_id,remarks ,$user_id as created_by"))
                        ->get();
                    $data = convertStdClassObjToArray($wb_promotion_advertisement_channels);
                   // $promotion_materials_details = unsetPrimaryIDsInArray($promotion_materials_details);
					  DB::connection('mis_db')->table('tra_promotion_advertisement_channels')->where(array('application_id' => $application_id))
						->delete();
                    DB::connection('mis_db')->table('tra_promotion_advertisement_channels')
                        ->insert($data); 
						
						
						
                 $res =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, 'mis_db');

            }
            else{
                   
                    $tracking_no = $results->tracking_no;

                    $applicant_id = $results->trader_id;
                    //$app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                    $app_status_id = 3;//$app_status->status_id;

                    $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name', 'mis_db');
					$application_details['date_received'] = Carbon::now();
					$application_details['created_on'] = Carbon::now();

                    $application_insert = insertRecord('tra_promotion_adverts_applications', $application_details, $user_id, 'mis_db');

                    if ($application_insert['success'] == false) {
                        DB::rollBack();
                        return $application_insert;
                    }

                    $record_id=$application_insert['record_id'];
                    $application_id=$application_insert['record_id'];
                    //product particulars 

                    $promotion_product_particulars = DB::table('wb_promotion_prod_particulars')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw(" id,$record_id as application_id,brand_name,common_name_id,is_registered,registration_no,registrant_name,other_details,$user_id as created_by"))
                        ->get();

                    foreach($promotion_product_particulars as $row){
                        
                        $portal_product_id=$row->id;
                        unset($row->id);
                        $promotion_product_particulars_insert = insertRecord('tra_promotion_prod_particulars', (Array)$row, $user_id, 'mis_db');
                        if ($promotion_product_particulars_insert['success'] == false) {
                            DB::rollBack();
                            return $promotion_product_particulars_insert;
                        }
                        
                        
                    }
                    $promotion_materials_details = DB::table('wb_promotion_materials_details')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$record_id as application_id,material_id,remarks ,$user_id as created_by"))
                        ->get();
                    $promotion_materials_details = convertStdClassObjToArray($promotion_materials_details);
                    //$promotion_materials_details = unsetPrimaryIDsInArray($promotion_materials_details);
                    DB::connection('mis_db')->table('tra_promotion_materials_details')
                        ->insert($promotion_materials_details); 
						
						//meeting types 
					$wb_promotionmeetingtypes_details = DB::table('wb_promotionmeetingtypes_details')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$application_id as application_id,meeting_type_id,remarks ,$user_id as created_by"))
                        ->get();
                    $data = convertStdClassObjToArray($wb_promotionmeetingtypes_details);
                  
                    DB::connection('mis_db')->table('tra_promotionmeetingtypes_details')
                        ->insert($data); 
						//wb_promotion_advertisement_channels
						$wb_promotion_advertisement_channels = DB::table('wb_promotion_advertisement_channels')
                        ->where('application_id', $portal_application_id)
                        ->select(DB::raw("$application_id as application_id,advertisement_channel_id,remarks ,$user_id as created_by"))
                        ->get();
                    $data = convertStdClassObjToArray($wb_promotion_advertisement_channels);
                  
                    DB::connection('mis_db')->table('tra_promotion_advertisement_channels')
                        ->insert($data); 
            }
           
            $res = array(
                'success' => true,
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

?>