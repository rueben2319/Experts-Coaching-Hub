<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop foreign keys referencing the users table
        Schema::table('client_profiles', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::table('coach_profiles', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        // Add more tables if needed

        // Create a new users table with UUID
        Schema::create('users_new', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->string('password_hash');
            $table->foreignUuid('user_role_id')->constrained('user_roles')->onDelete('restrict');
            $table->boolean('is_active')->default(true);
            $table->boolean('email_verified')->default(false);
            $table->timestamp('last_login')->nullable();
            $table->string('reset_token')->nullable();
            $table->timestamp('reset_token_expires_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Copy data from old table to new table
        $defaultRoleId = DB::table('user_roles')->where('name', 'client')->value('id');
        
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            DB::table('users_new')->insert([
                'id' => Str::uuid(),
                'name' => $user->name,
                'email' => $user->email,
                'password_hash' => $user->password,
                'user_role_id' => $defaultRoleId,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'remember_token' => $user->remember_token,
            ]);
        }

        // Drop old table and rename new table
        Schema::drop('users');
        Schema::rename('users_new', 'users');

        // Re-add foreign keys
        Schema::table('client_profiles', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::table('coach_profiles', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        // Add more tables if needed
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Create old table structure
        Schema::create('users_old', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // Copy data back
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            DB::table('users_old')->insert([
                'name' => $user->name,
                'email' => $user->email,
                'password' => $user->password_hash,
                'remember_token' => $user->remember_token,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);
        }

        // Drop new table and rename old table
        Schema::drop('users');
        Schema::rename('users_old', 'users');
    }
}; 