<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('package_id')->constrained('packages')->cascadeOnDelete();
            $table->foreignUuid('client_id')->constrained('client_profiles')->cascadeOnDelete();
            $table->integer('rating');
            $table->text('review_text');
            $table->boolean('is_public')->default(true);
            $table->timestamps();

            // Add indexes for common queries
            $table->index('package_id');
            $table->index('client_id');
            $table->index('rating');
            $table->index('is_public');
            $table->index('created_at');
            $table->index(['package_id', 'rating']);
            $table->index(['package_id', 'is_public']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_reviews');
    }
}; 