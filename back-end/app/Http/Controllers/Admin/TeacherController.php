<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use function response;

class TeacherController extends Controller
{
    function DataTeacher(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Teacher::all();
		} else {
			return Teacher::query()->find($request->id);
		}
	}

	function deleteDataTeacher(Request $request)
	{
		Teacher::query()->find($request->id)->delete();
		return response()->json(['message' => 'Delete Data Success']);
	}

	function updateDataTeacher(Request $request)
	{
		$request->validate([
			'full_name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'external_id' => 'required|int',
            'username' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'password' => 'required|string',
		]);

		Teacher::query()->find($request->id)->update([
			'external_id' => $request->external_id,
			'full_name' => $request->full_name,
			'username' => $request->username,
			'password' => $request->password,
		]);
		return response()->json(['message' => 'Update Data Success']);
	}

	function addDataTeacher(Request $request)
	{
		$request->validate([
			'external_id' => 'required',
			'full_name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'username' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'password' => 'required|string',
		]);

		$Teacher = new Teacher();
		$Teacher->external_id = $request->external_id;
		$Teacher->full_name = $request->full_name;
		$Teacher->username = $request->username;
		$Teacher->password = $request->password;
		$Teacher->save();
		return response()->json(['message' => 'Insert Data Success']);
	}
}
