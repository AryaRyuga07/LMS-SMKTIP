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
        Schema::create('attendance_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignID('attendance_id')->references('id')->on('attendances')->cascadeOnDelete();
			$table->foreignID('student_id')->references('user_id')->on('students')->cascadeOnDelete();

			$table->unique(['attendance_id', 'student_id']);
			
            $table->enum('status', ['present', 'excused', 'sick']);
            $table->string('file')->nullable();
			$table->timestamps();
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
