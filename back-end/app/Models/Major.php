<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
  protected $table = 'majors';

	protected $fillable = [
		'name'
	];

	// public function classrooms()
	// {
	// 	return $this->hasMany(Classroom::class);
	// }

	// public function students()
	// {
	// 	return $this->hasMany(Student::class);
	// }
}
