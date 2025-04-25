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
        Schema::create('coach_custom_pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('coach_id')->constrained('coach_profiles')->onDelete('cascade');
            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->boolean('is_published')->default(false);
            $table->integer('order_index')->default(0);
            $table->timestamps();

            // Ensure slug is unique within each coach's pages
            $table->unique(['coach_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_custom_pages');
    }
}; 