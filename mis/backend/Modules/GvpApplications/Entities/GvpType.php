<?php
/**
 * Created by Spacestorm.
 * User: Jeff
 * Date: 5/14/2024
 * Time: 10:51 AM
 */

namespace Modules\GvpApplications\Entities;


use Illuminate\Database\Eloquent\Model;

class GvpType extends  Model
{
    protected $table = 'par_gvplocation_details';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}