<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\Assignment;
use App\Models\Teacher;
use App\Models\Subject;
use App\Traits\SingletonTrait;
use Carbon\Carbon;

class AssignmentService{

	use SingletonTrait;

	public function create(string $title, string $description, int $teacherId, Subject|int $subject, Classroom|int $classroom, Carbon $startsAt, Carbon $endsAt) : Assignment{
		if($startsAt->greaterThan($endsAt)) {
			throw new \InvalidArgumentException("starts_at must after ends_at");
		}
		$Assignment = new Assignment();
		$Assignment->teacher_id = $teacherId;
		$Assignment->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Assignment->classroom_id = $classroom instanceof Classroom ? $classroom->id : $classroom;
		$Assignment->title = $title;
		$Assignment->description = $description;
		$Assignment->start_at = $startsAt;
		$Assignment->end_at = $endsAt;
		$Assignment->save();
		return $Assignment;
	}

	public function update(Assignment|int $Assignment, string $title, string $description, Teacher|int $teacher, Subject|int $subject, Classroom|int $classroom, Carbon $startsAt, Carbon $endsAt) {
		Assignment::query()->find($Assignment instanceof Assignment ? $Assignment->id : $Assignment)
			->update([
				'teacher_id' => $teacher instanceof Teacher ? $teacher->id : $teacher,
                'subject_id' => $subject instanceof Subject ? $subject->id : $subject,
                'classroom_id' => $classroom instanceof Classroom ? $classroom->id : $classroom,
				'title' => $title,
				'description' => $description,
				'starts_at' => $startsAt,
				'ends_at' => $endsAt
			]);
	}
}
