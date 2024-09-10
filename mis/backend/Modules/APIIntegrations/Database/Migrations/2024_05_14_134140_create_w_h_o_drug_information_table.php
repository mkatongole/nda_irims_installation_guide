<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tra_whodrug_information', function (Blueprint $table) {
            $table->id();
            $table->string('drugName');
            $table->string('drugCode');
            $table->integer('medicinalProductID');
            $table->boolean('isGeneric');
            $table->boolean('isPreferred');
            $table->string('countryOfSales')->nullable();
            $table->text('activeIngredients')->nullable();
            $table->string('atc_code')->nullable();
            $table->string('atc_text')->nullable();
            $table->string('atc_official_flag')->nullable();
            $table->string('maHolder_name')->nullable();
            $table->integer('maHolder_medicinalProductID')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tra_whodrug_information');
    }
};
