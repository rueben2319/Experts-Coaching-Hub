<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_module_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('client_package_id')->constrained('client_packages')->cascadeOnDelete();
            $table->foreignUuid('module_id')->constrained('package_modules')->cascadeOnDelete();
            $table->enum('status', ['not_started', 'in_progress', 'completed']);
            $table->integer('completion_percentage')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Add indexes for common queries
            $table->index('client_package_id');
            $table->index('module_id');
            $table->index('status');
            $table->index('completion_percentage');
            $table->index('started_at');
            $table->index('completed_at');
            $table->index(['client_package_id', 'status']);
            $table->index(['module_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_module_progress');
    }
}; 