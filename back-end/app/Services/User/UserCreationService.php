<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\Classroom;
use App\Models\Major;
use App\Models\Student;
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

	public function createStudent(string $username, string $password, string $externalID, string $fullName, ?UploadedFile $image, Classroom|int $classroom, Major|int $major) : void
	{
		$user = $this->create($username, $password, User::ROLE_STUDENT);

		$student = new Student();
		$student->user_id = $user->id;
		$student->external_id = $externalID;
		$student->full_name = $fullName;

		if($image !== null){
			$image->move(public_path('images/student'), $fileName = Str::random(16) . '.' . $image->extension());
			$student->image = $fileName;
		}

		$student->classroom_id = $classroom instanceof Classroom ? $classroom->id : $classroom;
		$student->major_id = $major instanceof Major ? $major->id : $major;

		$student->save();
	}

	public function createTeacher(string $username, string $password, string $externalID, string $fullName) : void
	{
		$user = $this->create($username, $password, User::ROLE_TEACHER);

		$teacher = new Teacher();
		$teacher->user_id = $user->id;
		$teacher->external_id = $externalID;
		$teacher->full_name = $fullName;
		$teacher->save();
	}

	public function createAdmin(string $username, string $password) : void
	{
		$this->create($username, $password, User::ROLE_ADMIN);
	}

	private function create(string $username, string $password, string $role) : User
	{
		$user = new User();
		$user->name = $username;
		$user->setPassword($password);
		$user->role = $role;
		$user->save();
		return $user;
	}

	public function updateStudent(Student|int $student, string $username, string $password, string|int $external_id, string $full_name, Classroom|int $classroom, Major|int $major) : void
	{
		$user = $this->update($student, $username, $password, User::ROLE_STUDENT);

		Student::query()->find($student instanceof Student ? $student->user_id : $student)
			->update([
				'user_id' => $user->id,
				'external_id' => $external_id,
				'full_name' => $full_name,
				'classroom_id' => $classroom instanceof Classroom ? $classroom->id : $classroom,
				'major_id' => $major instanceof Major ? $major->id : $major
			]);
	}

	public function updateTeacher(Teacher|int $teacher, string $username, string $password, string|int $external_id, string $full_name) : void
	{
		$user = $this->update($teacher, $username, $password, User::ROLE_TEACHER);

		Teacher::query()->find($teacher instanceof Teacher ? $teacher->user_id : $teacher)
			->update([
				'user_id' => $user->id,
				'external_id' => $external_id,
				'full_name' => $full_name
			]);
	}

	private function update(User|int $user, string $username, string $password, string $role) : User
	{
		$update = [
			'name' => $username,
			'role' => $role
		];
		if($password !== "") {
			$update['password'] = Hash::make($password);
		}
		User::query()->find($user instanceof User ? $user->id : $user)->update($update);
		if(!$user instanceof User) {
			/** @var User $ret */
			$ret = User::query()->find($user);
			return $ret;
		}
		return $user;
	}
}
