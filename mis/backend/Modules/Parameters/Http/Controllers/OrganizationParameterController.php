<?php

namespace Modules\Parameters\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Parameters\Entities\Organizations\Directorate;
use Illuminate\Support\Facades\Validator;


class OrganizationParameterController extends BaseController
{
    public function __construct() {
        $this->invoker =  [
            "save-directorate" => function($request) {
                $validator = null;

                if($request->isMethod("PUT")) {
                    $validator = Validator::make($request -> all(), [
                        "id" => "required|Integer",
                        "name" => "required|max:255",
                        
                        "description" => "sometimes|max:255",
                        
                    ]);
                } else {
                    $validator = Validator::make($request->all(), [
                        "name" => "required|max:255",
                       
                        
                        "description" => "sometimes|max:255",
                        
                    ]);
                }

                if($validator -> fails()){
                    return response() -> json([
                        "success" =>  false,
                        "message" => "Form has errors",
                        "errors" => $validator -> errors()
                    ]);
                }

                return Directorate::saveDirectorate($request,
                    $request->input('id'));
            },
            "get-directorate" => function($start, $limit) {
                $records = [];
                if($start && $limit) {
                    $records = Directorate::latest()->skip($start) -> take($limit)->get();
                } else {
                    $records = Directorate::latest()->get();
                }

                return [
                    "records" => $records,
                    "total" => Directorate::all() -> count()
                ];
            },
            "merge-directorate" => function($request) {
                return Directorate::merge(
                    $request->input('mergeToId'),
                    "directorate_id",
                    "par_directorates",
                    $request->input('ids'));
            },
            "delete-directorate" => function($id, $action) {
                return Directorate::deleteData('par_directorates', $id, $action);
            }
        ];
    }
}
