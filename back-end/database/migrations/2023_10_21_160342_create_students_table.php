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
        Schema::create('students', function (Blueprint $table) {
            $table->foreignID('user_id')->primary()->references('id')->on('users')->cascadeOnDelete();

			$table->string('external_id')->index();
			$table->string('full_name');
			$table->string('image')->nullable();

			// $table->foreignID('major_id')->references('id')->on('majors');
			// $table->foreignID('class_id')->references('id')->on('class');

			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student');
    }
};
