<?php

namespace App\Http\Controllers;

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
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
		]);

		AssignmentService::getInstance()->create(
			$request->post('title'),
			$request->post('description'),
            $request->user()->getUserId(),
			(int) $request->post('subject_id'),
			(int) $request->post('classroom_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('start_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('end_at')),
		);
		return response()->json(['message' => 'Create Data Success']);
	}

	public function updateAssignment(Assignment $Assignment, Request $request) {
		$request->validate([
			'subject_id' => 'required',
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
			'teacher_id' => 'required',
		]);

		AssignmentService::getInstance()->update(
			$Assignment,
			$request->post('title'),
			$request->post('description'),
			$request->user()->getUserId(),
			(int) $request->post('subject_id'),
			(int) $request->post('classroom_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('start_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('end_at'))
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteAssignment(Assignment $Assignment, Request $request) {
		$Assignment->delete();

		return response()->json(['message' => 'Delete Data Success']);
	}
}
