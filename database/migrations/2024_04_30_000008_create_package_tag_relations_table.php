<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_tag_relations', function (Blueprint $table) {
            $table->foreignUuid('package_id')->constrained('packages')->cascadeOnDelete();
            $table->foreignUuid('tag_id')->constrained('package_tags')->cascadeOnDelete();
            $table->primary(['package_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_tag_relations');
    }
}; 