<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Services\Teacher\AttendanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function AttendanceAll(Request $request)
    {
        $id = $request->id;

		if ($id == null) {
			return Attendance::all();
		} else {
			return Attendance::query()->find($request->id);
		}
    }

    public function createAttendance(Request $request) {
		$request->validate([
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z0-9\s]*$/',
			'start_at' => 'required|date_format:m/d/Y H:i',
			'end_at' => 'required|date_format:m/d/Y H:i',
		]);

		AttendanceService::getInstance()->create(
			$request->title,
			$request->description,
            (int) $request->teacher_id,
			(int) $request->classroom_id,
			Carbon::createFromFormat('m/d/Y H:i', $request->start_at),
			Carbon::createFromFormat('m/d/Y H:i', $request->end_at),
		);
		return response()->json(['message' => 'Create Data Success']);
	}

	public function updateAttendance(Request $request) {
		$request->validate([
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z0-9\s]*$/',
			'start_at' => 'required|date_format:m/d/Y H:i',
			'end_at' => 'required|date_format:m/d/Y H:i',
			'teacher_id' => 'required',
		]);

		AttendanceService::getInstance()->update(
			$request->id,
			$request->title,
			$request->description,
            (int) $request->teacher_id,
			(int) $request->classroom_id,
			Carbon::createFromFormat('m/d/Y H:i', $request->start_at),
			Carbon::createFromFormat('m/d/Y H:i', $request->end_at),
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteAttendance(Attendance $Attendance, Request $request) {
		$Attendance->delete();

		return response()->json(['message' => 'Delete Data Success']);
	}
}
