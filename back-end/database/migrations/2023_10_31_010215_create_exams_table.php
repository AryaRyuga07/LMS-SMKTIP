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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->foreignID('classroom_id')->references('id')->on('classrooms')->cascadeOnDelete();
            $table->foreignID('teacher_id')->references('user_id')->on('teachers')->cascadeOnDelete();
            $table->foreignID('subject_id')->references('id')->on('subjects')->cascadeOnDelete();

			$table->string('name');
            $table->dateTime('start_at');
            $table->dateTime('end_at');
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
