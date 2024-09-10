<?php

namespace Modules\Pv\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait PvTrait
{
    public function onLoadMedicalHistoryDetails(Request $req){

        try{
            $application_code = $req->application_code;
            $qry = DB::table('tra_pv_medical_history as t1')
            ->leftJoin('par_confirmations as t2', 't1.is_family_history_id', '=', 't2.id')
             ->leftJoin('par_confirmations as t3', 't1.continueing_id', '=', 't3.id')
            ->leftJoin('par_pv_medra_levels as t4', 't1.relevant_history_meddra_level_id','=','t4.id')
            ->select(DB::raw("DISTINCT  t1.id,t1.*,t2.name as family_history,t3.name as continuing, t4.name as relevant_history_meddra_level_name")) 
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


}