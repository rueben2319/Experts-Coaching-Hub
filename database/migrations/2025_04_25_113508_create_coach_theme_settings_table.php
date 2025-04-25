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
        Schema::create('coach_theme_settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('coach_id')->constrained('coach_profiles')->onDelete('cascade');
            $table->enum('theme_template', ['modern', 'classic', 'minimal', 'professional', 'creative']);
            $table->text('custom_css')->nullable();
            $table->string('font_primary');
            $table->string('font_secondary');
            $table->json('button_style');
            $table->json('layout_preferences');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_theme_settings');
    }
}; 