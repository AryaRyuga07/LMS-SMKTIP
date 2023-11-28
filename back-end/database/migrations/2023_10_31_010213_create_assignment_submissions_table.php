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
        Schema::create('assignments_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignID('assignment_id')->references('id')->on('assignments')->cascadeOnDelete();
            $table->foreignID('student_id')->references('user_id')->on('students')->cascadeOnDelete();

			$table->dateTime('date');
			$table->string('file')->nullable();
			$table->string('comment');
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
