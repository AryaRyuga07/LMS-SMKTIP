<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\Classroom;
use App\Models\Major;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use App\Traits\SingletonTrait;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use function public_path;

class UserCreationService
{

	use SingletonTrait;

	private function create(string $username, string $password, string $role): User
	{
		$user = new User();
		$user->name = $username;
		$user->setPassword($password);
		$user->role = $role;
		$user->save();
		return $user;
	}

	private function update(string $user, string $username, string $password, string $role)
	{
		$update = [
			'name' => $username,
			'role' => $role
		];
		if ($password !== "") {
			$update['password'] = Hash::make($password);
		}
		User::query()->find($user)->update($update);
		return $user;
	}

	public function createStudent(string $username, string $password, string $externalID, string $fullName, int $classroom): void
	{
		$user = $this->create($username, $password, User::ROLE_STUDENT);

		$student = new Student();
		$student->user_id = $user->id;
		$student->external_id = $externalID;
		$student->full_name = $fullName;

		// if($image !== null){
		// 	$image->move(public_path('images/student'), $fileName = Str::random(16) . '.' . $image->extension());
		// 	$student->image = $fileName;
		// }

		$student->classroom_id = $classroom;
		// $student->major_id = $major instanceof Major ? $major->id : $major;

		$student->save();
	}

	public function createTeacher(string $username, string $password, string $externalID, string $fullName): void
	{
		$user = $this->create($username, $password, User::ROLE_TEACHER);

		$teacher = new Teacher();
		$teacher->user_id = $user->id;
		$teacher->external_id = $externalID;
		$teacher->full_name = $fullName;
		// if($image !== null){
		// 	$image->move(public_path('images/teacher'), $fileName = Str::random(16) . '.' . $image->extension());
		// 	$teacher->image = $fileName;
		// }
		$teacher->save();
	}

	public function createAdmin(string $username, string $password): void
	{
		$this->create($username, $password, User::ROLE_ADMIN);
	}

	public function updateStudent(string $student, string $username, string $password, string|int $external_id, string $full_name, int $classroom): void
	{
		$this->update($student, $username, $password, User::ROLE_STUDENT);

		$updateStudent = [
			'external_id' => $external_id,
			'full_name' => $full_name,
		];

		if ($classroom !== "") {
			$updateStudent['classroom'] = $classroom;
		}

		Student::query()->find($student)
			->update($updateStudent);
	}

	public function updateTeacher(string $teacher, string $username, string $password, string|int $external_id, string $full_name): void
	{
		$this->update($teacher, $username, $password, User::ROLE_TEACHER);

		Teacher::query()->find($teacher)
			->update([
				'external_id' => $external_id,
				'full_name' => $full_name
			]);
	}
}
