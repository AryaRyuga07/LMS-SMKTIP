<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
	protected $table = 'assignments';

    protected $casts = [
		'teacher_id' => 'int',
		'subject_id' => 'int',
		'classroom_id' => 'int'
	];

	protected $fillable = [
		'teacher_id',
		'subject_id',
		'classroom_id',
		'title',
        'description',
        'start_at',
        'end_at',
	];
}
