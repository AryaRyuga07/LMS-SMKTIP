<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
	protected $table = 'lessons';

    protected $casts = [
		'teacher_id' => 'int',
		'subject_id' => 'int',
	];

	protected $fillable = [
		'teacher_id',
		'subject_id',
		'title',
        'description',
        'content',
        'start_at',
        'end_at',
	];
}
