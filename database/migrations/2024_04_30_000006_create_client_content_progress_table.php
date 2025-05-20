<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('client_content_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('client_package_id')->constrained('client_packages')->cascadeOnDelete();
            $table->foreignUuid('content_id')->constrained('module_content')->cascadeOnDelete();
            $table->enum('status', ['not_started', 'in_progress', 'completed']);
            $table->integer('last_position')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('client_content_progress');
    }
}; 