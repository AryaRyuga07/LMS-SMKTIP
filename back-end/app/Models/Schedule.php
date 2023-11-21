<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'schedules';

	protected $fillable = [
		'teacher_id',
		'subject_id',
		'classroom_id',
	];

	public function teacher()
	{
		return $this->hasMany(Teacher::class);
	}

	public function subject()
	{
		return $this->hasMany(Subject::class);
	}
	
    public function classroom()
	{
		return $this->hasMany(Classroom::class);
	}
}
