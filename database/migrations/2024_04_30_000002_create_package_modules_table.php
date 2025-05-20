<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_modules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('package_id')->constrained('packages')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->integer('order_index');
            $table->integer('estimated_duration_days');
            $table->timestamps();

            // Add indexes for common queries
            $table->index('package_id');
            $table->index('order_index');
            $table->index(['package_id', 'order_index']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_modules');
    }
}; 