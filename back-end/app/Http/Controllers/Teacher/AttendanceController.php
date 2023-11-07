<?php

namespace App\Http\Controllers;

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
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
		]);

		AttendanceService::getInstance()->create(
			$request->post('title'),
			$request->post('description'),
            $request->user()->getUserId(),
			(int) $request->post('classroom_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('start_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('end_at')),
		);
		return response()->json(['message' => 'Create Data Success']);
	}

	public function updateAttendance(Attendance $Attendance, Request $request) {
		$request->validate([
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
			'teacher_id' => 'required',
		]);

		AttendanceService::getInstance()->update(
			$Attendance,
			$request->post('title'),
			$request->post('description'),
			$request->user()->getUserId(),
			(int) $request->post('classroom_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('start_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('end_at'))
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteAttendance(Attendance $Attendance, Request $request) {
		$Attendance->delete();

		return response()->json(['message' => 'Delete Data Success']);
	}
}
