<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student;

use App\Models\Announcement;
use App\Models\Presence;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function redirect;
use function view;

class HomeController
{

	public function home(Request $request)
	{
		$student = Student::query()->find($request->id);
		$schedule = DB::table('schedules')
			->join('subjects', function ($join) {
				$join->on('schedules.subject_id', '=', 'subjects.id');
			})
			->join('teachers', function ($join) {
				$join->on('schedules.teacher_id', '=', 'teachers.user_id');
			})
			->where('schedules.classroom_id', $student->classroom_id)
			->select('subjects.id as id_subject', 'subjects.name as subject', 'teachers.full_name as teacher')
			->distinct()
			->get();

		return $schedule;
	}

	public function AnnouncementPage(Request $req)
	{
		return DB::table('announcements')
			->join('teachers', function ($join) {
				$join->on('teachers.user_id', '=', 'announcements.teacher_id');
			})
			->where('id', '=', $req->id)
			->get();
	}

	public function Announcement(Request $req)
	{
		$idSub = $req->idSub;
		if ($idSub == null) {
			$student = Student::query()->find($req->id);
			$announcement = DB::table('announcements')
				->join('detail_classroom', function ($join) {
					$join->on('detail_classroom.main_id', '=', 'announcements.id')
						->where('detail_classroom.table', '=', "Announcement");
				})
				->where('detail_classroom.class_id', $student->classroom_id)
				->where('announcements.subject_id', $req->subject)
				->select('announcements.id as ann_id', 'announcements.title as ann_title', 'announcements.description as ann_desc')
				->distinct()
				->get();
		} else {
			return DB::table('announcements')
				->join('teachers', function ($join) {
					$join->on('teachers.user_id', '=', 'announcements.teacher_id');
				})
				->where('id', '=', $idSub)
				->get();
		}

		return $announcement;
	}

	public function Attendance(Request $req)
	{
		$idSub = $req->idSub;
		if ($idSub == null) {
			$student = Student::query()->find($req->id);
			$attendance = DB::table('attendances')
				->join('detail_classroom', function ($join) {
					$join->on('detail_classroom.main_id', '=', 'attendances.id')
						->where('detail_classroom.table', '=', "attendance");
				})
				->where('detail_classroom.class_id', $student->classroom_id)
				->where('attendances.subject_id', $req->subject)
				->select('attendances.id as att_id', 'attendances.title as att_title', 'attendances.description as att_desc', 'attendances.end_at as att_end')
				->distinct()
				->get();
		} else {
			return DB::table('attendances')
				->join('teachers', function ($join) {
					$join->on('teachers.user_id', '=', 'attendances.teacher_id');
				})
				->where('id', '=', $idSub)
				->get();
		}

		return $attendance;
	}

	public function AttendancePage(Request $req)
	{
		return DB::table('attendances')
			->join('teachers', function ($join) {
				$join->on('teachers.user_id', '=', 'attendances.teacher_id');
			})
			->where('id', '=', $req->id)
			->get();
	}

	public function Lesson(Request $req)
	{
		$id_sub = $req->id_subject;
		$student = Student::query()->find($req->id);
		$lesson = DB::table('lessons')
			->join('detail_classroom', function ($join) {
				$join->on('detail_classroom.main_id', '=', 'lessons.id')
					->where('detail_classroom.table', '=', "lesson");
			})
			->where('detail_classroom.class_id', $student->classroom_id)
			->where('lessons.subject_id', $req->subject)
			->select('lessons.id as less_id', 'lessons.title as less_title', 'lessons.description as less_desc', 'lessons.content as less_content')
			->distinct()
			->get();

		return $lesson;
	}

	public function LessonPage(Request $req)
	{
		return DB::table('lessons')
			->join('teachers', function ($join) {
				$join->on('teachers.user_id', '=', 'lessons.teacher_id');
			})
			->where('id', '=', $req->id)
			->get();
	}

	public function Assignment(Request $req)
	{
		$student = Student::query()->find($req->id);
		$assignment = DB::table('assignments')
			->join('detail_classroom', function ($join) {
				$join->on('detail_classroom.main_id', '=', 'assignments.id')
					->where('detail_classroom.table', '=', "assignment");
			})
			->where('detail_classroom.class_id', $student->classroom_id)
			->where('assignments.subject_id', $req->subject)
			->select('assignments.id as assign_id', 'assignments.title as assign_title', 'assignments.description as assign_desc', 'assignments.content as assign_content', 'assignments.end_at as assign_end')
			->distinct()
			->get();

		return $assignment;
	}

	public function AssignmentPage(Request $req)
	{
		return DB::table('assignments')
			->join('teachers', function ($join) {
				$join->on('teachers.user_id', '=', 'assignments.teacher_id');
			})
			->where('id', '=', $req->id)
			->get();
	}
}
