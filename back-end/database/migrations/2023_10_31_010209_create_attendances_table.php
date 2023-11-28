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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignID('subject_id')->references('id')->on('subjects')->cascadeOnDelete();
            $table->foreignID('teacher_id')->references('user_id')->on('teachers')->cascadeOnDelete();
            
			$table->string('title');
			$table->string('description');
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
