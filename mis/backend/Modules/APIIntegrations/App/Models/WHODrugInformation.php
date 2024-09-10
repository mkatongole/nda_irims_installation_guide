<?php

namespace Modules\APIIntegrations\App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WHODrugInformation extends Model
{
    use HasFactory;

    protected $table = "tra_whodrug_information";
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "drugName",
        "drugCode",
        "medicinalProductID",
        "isGeneric",
        "isPreferred",
        "countryOfSales",
        "activeIngredients",
        "atc_code",
        "atc_text",
        "atc_official_flag",
        "maHolder_name",
        "maHolder_medicinalProductID",
    ];
    
}
