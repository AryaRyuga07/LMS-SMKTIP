<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\User\UserCreationService;
use Illuminate\Http\Request;
use function back;

class UserCreationController extends Controller{

	public function createAdmin(Request $request) {
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'required'
		]);

		$username = $request->post('username');
		$password = $request->post('password');

		UserCreationService::getInstance()->createAdmin($username, $password);

		$request->session()->flash('message', 'Admin created.');
		return back();
	}

	public function createTeacher(Request $request) {
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'required',
			'full_name' => 'required|regex:/^[a-zA-Z\s]*$/',
			'external_id' => 'required'
		]);

		UserCreationService::getInstance()->createTeacher(
			$request->post('username'),
			$request->post('password'),
			$request->post('external_id'),
			$request->post('full_name')
		);

		$request->session()->flash('message', 'Teacher created.');
		return back();
	}

	public function createStudent(Request $request) {
		$request->validate([
			'username' => 'required|regex:/^[a-zA-Z\s]*$/',
			'password' => 'required',
			'external_id' => 'required',
			'full_name' => 'required|regex:/^[a-zA-Z\s]*$/',
			'image' => 'nullable|mimes:png,jpg',
			'classroom_id' => 'required|exists:classroom,id',
			'major_id' => 'required|exists:majors,id'
		]);

		UserCreationService::getInstance()->createStudent(
			$request->post('username'),
			$request->post('password'),
			$request->post('external_id'),
			$request->post('full_name'),
			$request->file('image'),
			(int) $request->post('classroom_id'),
			(int) $request->post('major_id')
		);

		$request->session()->flash('message', 'Student created.');
		return back();
	}
}
