<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log_users', function (Blueprint $table) {
            // $table->id();
			$table->foreignID('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->string('username');
			$table->string('status');
			$table->dateTime('log_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
