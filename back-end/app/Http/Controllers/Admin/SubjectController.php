<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController
{

	function DataSubject(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Subject::all();
		} else {
			return Subject::query()->find($request->id);
		}
	}

	function deleteDataSubject(Request $request)
	{
		Subject::query()->find($request->id)->delete();
		return response()->json(['message' => 'Delete Data Success']);
	}

	function updateDataSubject(Request $request)
	{
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
		]);

		Subject::query()->find($request->id)->update([
			'name' => $request->name,
		]);
		return response()->json(['message' => 'Update Data Success']);
	}

	function addDataSubject(Request $request)
	{
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
		]);

		$Subject = new Subject();
		$Subject->name = $request->name;
		$Subject->save();
		return response()->json(['message' => 'Insert Data Success']);
	}
}
