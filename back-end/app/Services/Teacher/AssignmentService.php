<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\Assignment;
use App\Models\DetailClassroom;
use App\Models\Teacher;
use App\Models\Subject;
use App\Traits\SingletonTrait;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class AssignmentService{

	use SingletonTrait;

	private function createDetailClassroom(int $main_id, $classroom)
	{
		$id = $main_id;

		foreach ($classroom as $data) {
			$Detail = new DetailClassroom();
			$Detail->main_id = $id;
			$Detail->table = 'Assignment';
			$Detail->class_id = $data;
			$Detail->save();
		}
		return $Detail;
	}

	public function create(string $title, string $description, ?UploadedFile $file, int $teacherId, Subject|int $subject, array $classroom, Carbon $startsAt, Carbon $endsAt)
	{
		if ($startsAt->greaterThan($endsAt)) {
			throw new \InvalidArgumentException("starts_at must after ends_at");
		}
		$Assignment = new Assignment();
		$Assignment->teacher_id = $teacherId;
		$Assignment->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Assignment->title = $title;
		$Assignment->description = $description;
		$Assignment->start_at = $startsAt;
		$Assignment->end_at = $endsAt;
		if($file !== null){
			$file->move(public_path('assignment/file'), $fileName = Str::random(16) . '.' . $file->extension());
			$Assignment->content = $fileName;
		}
		$Assignment->save();

		$this->createDetailClassroom($Assignment->id, $classroom);

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
