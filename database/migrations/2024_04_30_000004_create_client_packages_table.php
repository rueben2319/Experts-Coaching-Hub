<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('client_id')->constrained('client_profiles')->cascadeOnDelete();
            $table->foreignUuid('package_id')->constrained('packages')->cascadeOnDelete();
            $table->foreignUuid('coach_id')->constrained('coach_profiles')->cascadeOnDelete();
            $table->enum('status', ['active', 'completed', 'canceled', 'paused']);
            $table->timestamp('start_date');
            $table->timestamp('end_date')->nullable();
            $table->integer('progress_percentage')->default(0);
            $table->foreignUuid('current_module_id')->nullable()->constrained('package_modules');
            $table->enum('payment_status', ['paid', 'pending', 'failed']);
            $table->timestamps();

            // Add indexes for common queries
            $table->index('client_id');
            $table->index('package_id');
            $table->index('coach_id');
            $table->index('status');
            $table->index('payment_status');
            $table->index('start_date');
            $table->index('end_date');
            $table->index('current_module_id');
            $table->index(['client_id', 'status']);
            $table->index(['coach_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_packages');
    }
}; 