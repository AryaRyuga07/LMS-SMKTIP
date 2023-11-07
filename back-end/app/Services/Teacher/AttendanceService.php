<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\Attendance;
use App\Models\Teacher;
use App\Traits\SingletonTrait;
use Carbon\Carbon;

class AttendanceService{

	use SingletonTrait;

	public function create(string $title, string $description, int $teacherId, Classroom|int $classroom, Carbon $startsAt, Carbon $endsAt) : Attendance{
		if($startsAt->greaterThan($endsAt)) {
			throw new \InvalidArgumentException("starts_at must after ends_at");
		}
		$Attendance = new Attendance();
		$Attendance->classroom_id = $classroom instanceof Classroom ? $classroom->id : $classroom;
		$Attendance->teacher_id = $teacherId;
		$Attendance->title = $title;
		$Attendance->description = $description;
		$Attendance->start_at = $startsAt;
		$Attendance->end_at = $endsAt;
		$Attendance->save();
		return $Attendance;
	}

	public function update(Attendance|int $Attendance, string $title, string $description, Teacher|int $teacher, Classroom|int $classroom, Carbon $startsAt, Carbon $endsAt) {
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
