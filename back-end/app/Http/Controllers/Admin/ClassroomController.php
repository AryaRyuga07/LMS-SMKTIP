<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use Illuminate\Http\Request;
use function response;

class ClassroomController extends Controller
{

	function DataClassroom(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Classroom::all();
		} else {
			return Classroom::query()->find($request->id);
		}
	}

	function deleteDataClassroom(Request $request)
	{
		Classroom::query()->find($request->id)->delete();
		return response()->json(['message' => 'Delete Data Success']);
	}

	function updateDataClassroom(Request $request)
	{
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
		]);

		Classroom::query()->find($request->id)->update([
			'name' => $request->name,
			'major_id' => $request->major_id,
		]);
		return response()->json(['message' => 'Update Data Success']);
	}

	function addDataClassroom(Request $request)
	{
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'major_id' => 'required',
		]);

		$Classroom = new Classroom();
		$Classroom->name = $request->name;
		$Classroom->major_id = $request->major_id;
		$Classroom->save();
		return response()->json(['message' => 'Insert Data Success']);
	}
}
