<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('coach_id')->constrained('coach_profiles')->cascadeOnDelete();
            $table->string('name');
            $table->text('description');
            $table->string('short_description');
            $table->string('featured_image_url')->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('billing_cycle', ['one-time', 'monthly', 'quarterly', 'annual']);
            $table->integer('duration_weeks');
            $table->integer('max_clients')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            // Add indexes for common queries
            $table->index('coach_id');
            $table->index('is_published');
            $table->index('is_featured');
            $table->index('price');
            $table->index('billing_cycle');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
}; 