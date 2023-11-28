<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
  use HasFactory;

  protected $table = 'attendances';

  protected $casts = [
    'teacher_id' => 'int'
  ];

  protected $fillable = [
    'teacher_id',
    'title',
    'description',
    'start_at',
    'end_at',
  ];
}
