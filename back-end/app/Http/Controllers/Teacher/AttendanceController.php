<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Services\Teacher\AttendanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
	public function AttendanceAll(Request $request)
	{
		$id = $request->id;

		if ($id == null) {
			return Attendance::query()->where('teacher_id', $request->user)->get();
		} else {
			$attendance = DB::table('attendances')
				->where('attendances.id', $request->id)
				->select('attendances.id as id', 'attendances.title as title', 'attendances.description as description', 'attendances.subject_id as id_subject')
				->get();

			$classroom = DB::table('attendances')
				->join('detail_classroom', function ($join) {
					$join->on('attendances.id', '=', 'detail_classroom.main_id');
				})
				->where('attendances.id', $request->id)
				->select('detail_classroom.class_id')
				->get();

			$data = [];

			foreach ($classroom as $detail) {
				$data[] = $detail->class_id;
			}

			foreach ($attendance as $item) {
				$item->class_id = $data;
			}

			return $attendance;
		}
	}

	public function createAttendance(Request $request)
	{
		$request->validate([
			'id_subject' => 'required',
			'title' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
			'description' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
			'start_at' => 'required|date_format:d-m-Y H:i',
			'end_at' => 'required|date_format:d-m-Y H:i',
		]);
		
		AttendanceService::getInstance()->create(
			$request->title,
			$request->description,
			(int) $request->id_teacher,
			(int) $request->id_subject,
			$request->checkedItems,
			Carbon::createFromFormat('d-m-Y H:i', $request->start_at),
			Carbon::createFromFormat('d-m-Y H:i', $request->end_at),
		);

		return response()->json(['message' => 'Create Data Success']);
	}

	public function updateAttendance(Request $request)
	{
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

	public function deleteAttendance(Request $request)
	{
		Attendance::query()->find($request->id)->delete();
		DB::table('detail_classroom')->where('main_id', $request->id)->where('table', 'Attendance')->delete();
		return response()->json(['message' => 'Delete Data Success']);
	}
}
