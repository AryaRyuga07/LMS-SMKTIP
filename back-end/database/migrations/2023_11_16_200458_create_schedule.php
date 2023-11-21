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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignID('teacher_id')->references('user_id')->on('teachers')->cascadeOnDelete();
            $table->foreignID('subject_id')->references('id')->on('subjects')->cascadeOnDelete();
            $table->foreignID('classroom_id')->references('id')->on('classrooms')->cascadeOnDelete();
			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule');
    }
};
