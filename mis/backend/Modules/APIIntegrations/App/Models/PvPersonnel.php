<?php

namespace Modules\APIIntegrations\App\Models;

use Illuminate\Database\Eloquent\Model;

class PvPersonnel extends Model
{
    protected $table = "tra_pv_personnel";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "first_name",
        "last_name",
        "organisation",
        "title_id",
    ];

}
