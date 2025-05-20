<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('module_content', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('module_id')->constrained('package_modules')->cascadeOnDelete();
            $table->string('title');
            $table->enum('content_type', ['video', 'audio', 'text', 'worksheet', 'assessment']);
            $table->string('content_url')->nullable();
            $table->text('content_text')->nullable();
            $table->integer('order_index');
            $table->integer('duration_minutes')->nullable();
            $table->boolean('is_required')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module_content');
    }
}; 