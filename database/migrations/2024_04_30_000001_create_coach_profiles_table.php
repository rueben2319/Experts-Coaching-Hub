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
        Schema::create('coach_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('business_name');
            $table->string('specialty');
            $table->integer('years_experience');
            $table->json('certification_info')->nullable();
            $table->boolean('public_profile')->default(false);
            $table->json('social_media_links')->nullable();
            $table->string('brand_color_primary')->nullable();
            $table->string('brand_color_secondary')->nullable();
            $table->string('custom_url_slug')->unique();
            $table->string('logo_image_url')->nullable();
            $table->string('banner_image_url')->nullable();
            $table->string('website_url')->nullable();
            $table->text('about_page_content')->nullable();
            $table->boolean('testimonials_enabled')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_profiles');
    }
}; 