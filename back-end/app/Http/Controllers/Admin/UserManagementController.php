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

class UserManagementController extends Controller{

	public function all(Request $request){
		User::query()->paginate(20);
	}

	public function deleteStudent(Student $student, Request $request) {
		$student->delete();
		$student->user()->delete();
		return back();
	}

	public function deleteTeacher(Teacher $teacher, Request $request) {
		$teacher->delete();
		$teacher->user()->delete();
		return back();
	}

	public function deleteAdmin(User $user, Request $request) {
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
			'major_id' => 'required|exists:majors,id'
		]);

		UserCreationService::getInstance()->updateStudent($student->user_id,
			$request->post('username'),
			$request->post('password'),
			$request->post('external_id'),
			$request->post('full_name'),
			(int) $request->post('classroom_id'),
			(int) $request->post('major_id'),
		);

		$request->session()->flash('message', 'Student updated.');
		return back();
	}

	public function updateTeacher(Teacher $teacher, Request $request)
	{
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'nullable',
			'full_name' => 'required|regex:/^[a-zA-Z\s]*$/',
			'external_id' => 'required'
		]);

		UserCreationService::getInstance()->updateTeacher($teacher->user_id,
			$request->post('username'),
			$request->post('password'),
			$request->post('external_id'),
			$request->post('full_name')
		);

		$request->session()->flash('message', 'Teacher updated.');
		return back();
	}
}
