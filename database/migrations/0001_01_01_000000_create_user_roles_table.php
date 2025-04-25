<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Insert default roles
        $roles = [
            [
                'id' => '01HRK7MWBP0000000000COACH',
                'name' => 'coach',
                'display_name' => 'Coach',
                'description' => 'Coaching professional who provides services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '01HRK7MWBP0000000000CLINT',
                'name' => 'client',
                'display_name' => 'Client',
                'description' => 'Client seeking coaching services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($roles as $role) {
            DB::table('user_roles')->insert($role);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
}; 