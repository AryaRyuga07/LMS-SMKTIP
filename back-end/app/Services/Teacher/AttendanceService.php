<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\Attendance;
use App\Models\DetailClassroom;
use App\Models\Subject;
use App\Models\Teacher;
use App\Traits\SingletonTrait;
use Carbon\Carbon;

class AttendanceService
{

	use SingletonTrait;

	private function createDetailClassroom(int $main_id, $classroom)
	{
		$id = $main_id;

		foreach ($classroom as $data) {
			$Detail = new DetailClassroom();
			$Detail->main_id = $id;
			$Detail->table = 'Attendance';
			$Detail->class_id = $data;
			$Detail->save();
		}
		return $Detail;
	}

	public function create(string $title, string $description, int $teacherId, Subject|int $subject, array $classroom, Carbon $startsAt, Carbon $endsAt)
	{
		if ($startsAt->greaterThan($endsAt)) {
			throw new \InvalidArgumentException("starts_at must after ends_at");
		}
		$Attendance = new Attendance();
		$Attendance->teacher_id = $teacherId;
		$Attendance->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Attendance->title = $title;
		$Attendance->description = $description;
		$Attendance->start_at = $startsAt;
		$Attendance->end_at = $endsAt;
		$Attendance->save();

		$this->createDetailClassroom($Attendance->id, $classroom);

		return $Attendance;
	}

	public function update(Attendance|int $Attendance, string $title, string $description, Teacher|int $teacher, Classroom|int $classroom, Carbon $startsAt, Carbon $endsAt)
	{
		Attendance::query()->find($Attendance instanceof Attendance ? $Attendance->id : $Attendance)
			->update([
				'classroom_id' => $classroom instanceof Classroom ? $classroom->id : $classroom,
				'teacher_id' => $teacher instanceof Teacher ? $teacher->id : $teacher,
				'title' => $title,
				'description' => $description,
				'start_at' => $startsAt,
				'end_at' => $endsAt
			]);
	}
}
