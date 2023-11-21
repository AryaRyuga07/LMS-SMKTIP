<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Services\Teacher\AssignmentService;
use Carbon\Carbon;

class AssignmentController extends Controller
{
    public function AssignmentAll(Request $request)
    {
        $id = $request->id;

		if ($id == null) {
			return Assignment::all();
		} else {
			return Assignment::query()->find($request->id);
		}
    }

    public function createAssignment(Request $request) {
		$request->validate([
			'subject_id' => 'required',
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'start_at' => 'required|date_format:m/d/Y H:i',
			'end_at' => 'required|date_format:m/d/Y H:i',
		]);

		AssignmentService::getInstance()->create(
			$request->title,
			$request->description,
			(int) $request->teacher_id,
			(int) $request->subject_id,
			(int) $request->classroom_id,
			Carbon::createFromFormat('m/d/Y H:i', $request->start_at),
			Carbon::createFromFormat('m/d/Y H:i', $request->end_at),
		);
		return response()->json(['message' => 'Create Data Success']);
	}

	public function updateAssignment(Request $request) {
		$request->validate([
			'subject_id' => 'required',
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'start_at' => 'required|date_format:m/d/Y H:i',
			'end_at' => 'required|date_format:m/d/Y H:i',
			'teacher_id' => 'required',
		]);

		AssignmentService::getInstance()->update(
			$request->id,
			$request->title,
			$request->description,
			(int) $request->teacher_id,
			(int) $request->subject_id,
			(int) $request->classroom_id,
			Carbon::createFromFormat('m/d/Y H:i', $request->start_at),
			Carbon::createFromFormat('m/d/Y H:i', $request->end_at),
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteAssignment(Assignment $Assignment, Request $request) {
		$Assignment->delete();

		return response()->json(['message' => 'Delete Data Success']);
	}
}
