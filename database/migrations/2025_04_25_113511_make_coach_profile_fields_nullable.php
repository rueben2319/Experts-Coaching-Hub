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
        Schema::table('coach_profiles', function (Blueprint $table) {
            $table->string('business_name')->nullable()->change();
            $table->string('specialty')->nullable()->change();
            $table->integer('years_experience')->nullable()->change();
            $table->string('custom_url_slug')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coach_profiles', function (Blueprint $table) {
            $table->string('business_name')->nullable(false)->change();
            $table->string('specialty')->nullable(false)->change();
            $table->integer('years_experience')->nullable(false)->change();
            $table->string('custom_url_slug')->nullable(false)->change();
        });
    }
}; 