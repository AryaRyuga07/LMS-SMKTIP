<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $table = 'classroom';

	protected $casts = [
		'major_id' => 'int'
	];

	protected $fillable = [
		'name',
		'major_id'
	];

	public function major()
	{
		return $this->belongsTo(Major::class);
	}

	public function students()
	{
		return $this->hasMany(Student::class);
	}
}
