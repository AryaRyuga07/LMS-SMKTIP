<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';
	protected $primaryKey = 'user_id';
	public $incrementing = false;

	protected $casts = [
		'user_id' => 'int',
		'major_id' => 'int',
		'classroom_id' => 'int'
	];

	protected $fillable = [
		'external_id',
		'full_name',
		'major_id',
		'classroom_id',
		'image',
	];

	public function classroom()
	{
		return $this->belongsTo(Classroom::class);
	}

	public function major()
	{
		return $this->belongsTo(Major::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
