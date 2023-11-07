<?php

declare(strict_types=1);

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

/**
 * Class User
 *
 * @property int $id
 * @property string $name
 * @property string $password
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $role
 *
 * @property Student $student
 * @property Teacher $teacher
 *
 * @package App\Models
 */
class User extends Model
{
	const ROLE_STUDENT = 'student';
	const ROLE_TEACHER = 'teacher';
	const ROLE_ADMIN = 'admin';

	const ROLES = [
		self::ROLE_STUDENT,
		self::ROLE_TEACHER,
		self::ROLE_ADMIN
	];

	protected $table = 'users';

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'name',
		'role'
	];

	public function student()
	{
		return $this->hasOne(Student::class);
	}

	public function teacher()
	{
		return $this->hasOne(Teacher::class);
	}

	public function isPasswordValid(string $password) : bool{
		return Hash::check($password, $this->password);
	}

	/**
	 * Get the identifier that will be stored in the subject claim of the JWT.
	 *
	//  * @return mixed
	 */
	// public function getJWTIdentifier()
	// {
	// 	return $this->getKey();
	// }

	// /**
	//  * Return a key value array, containing any custom claims to be added to the JWT.
	//  *
	//  * @return array
	//  */
	// public function getJWTCustomClaims()
	// {
	// 	return [];
	// }

	public function isStudent() : bool{
		return $this->role === self::ROLE_STUDENT;
	}

	public function isTeacher() : bool{
		return $this->role === self::ROLE_TEACHER;
	}

	public function isAdmin() : bool{
		return $this->role === self::ROLE_ADMIN;
	}

	public function setPassword(string $password) : string{
		return $this->password = Hash::make($password);
	}
}
