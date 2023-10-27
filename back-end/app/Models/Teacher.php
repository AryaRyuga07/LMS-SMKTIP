<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers';
	// protected $primaryKey = 'user_id';
	// public $incrementing = false;

	// protected $casts = [
	// 	'user_id' => 'int'
	// ];

	protected $fillable = [
		'external_id',
		'full_name',
		'username',
		'password'
	];

	// public function user()
	// {
	// 	return $this->belongsTo(User::class);
	// }
}
