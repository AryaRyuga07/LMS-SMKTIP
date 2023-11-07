<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use App\Services\User\UserCreationService;
use Illuminate\Http\Request;
use function back;

class UserManagementController extends Controller
{

	public function TeacherAll(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Teacher::all();
		} else {
			$user = User::query()->find($request->id);
			$teacher = Teacher::where('user_id', '=' , $request->id)->get();

			$data = [
				'user' => $user,
				'teachers' => $teacher,
				// 'username' => $user->username,
				// 'password' => $user->password,
				// 'external_id' => $teacher->external_id,
				// 'full_name' => $teacher->full_name,
			];

			return $data;
		}
	}
	
	public function StudentAll(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Student::all();
		} else {
			return Student::query()->find($request->id);
		}
	}

	public function deleteStudent(Student $student, Request $request)
	{
		$student->delete();
		$student->user()->delete();
		return back();
	}

	public function deleteTeacher(Request $request)
	{
		$teacher = Teacher::query()->find($request->id);
		$teacher->delete();
		$teacher->user()->delete();
		return back();
	}

	public function deleteAdmin(User $user, Request $request)
	{
		$user->user()->delete();
		return back();
	}

	public function updateStudent(Student $student, Request $request)
	{
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'nullable',
			'external_id' => 'required',
			'full_name' => 'required|regex:/^[a-zA-Z\s]*$/',
			'classroom_id' => 'required|exists:classroom,id',
			// 'major_id' => 'required|exists:majors,id'
		]);

		UserCreationService::getInstance()->updateStudent(
			$student->user_id,
			$request->post('username'),
			$request->post('password'),
			$request->post('external_id'),
			$request->post('full_name'),
			(int) $request->post('classroom_id'),
			// (int) $request->post('major_id'),
		);

		return response()->json(['message' => 'Update Data Success']);
	}

	public function updateTeacher(Teacher $teacher, Request $request)
	{
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'nullable',
			'full_name' => 'required|regex:/^[a-zA-Z\s]*$/',
			'external_id' => 'required'
		]);

		UserCreationService::getInstance()->updateTeacher(
			1,
			$request->username,
			$request->password,
			$request->external_id,
			$request->full_name,
		);

		return response()->json(['message' => 'Update Data Success']);
	}
}
