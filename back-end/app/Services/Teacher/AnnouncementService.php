<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\Announcement;
use App\Models\DetailClassroom;
use App\Models\Teacher;
use App\Models\Subject;
use App\Traits\SingletonTrait;
use Illuminate\Http\UploadedFile;

class AnnouncementService
{

	use SingletonTrait;

	private function createDetailClassroom(int $main_id, $classroom)
	{
		$id = $main_id;
		
		foreach ($classroom as $data) {
			$Detail = new DetailClassroom();
			$Detail->main_id = $id;
			$Detail->class_id = $data;
			$Detail->save();
		}
		return $Detail;
	}

	public function create(string $title, string $description, int $teacherId, Subject|int $subject, array $classroom)
	{
		$Announcement = new Announcement();
		$Announcement->teacher_id = $teacherId;
		$Announcement->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Announcement->title = $title;
		$Announcement->description = $description;
		$Announcement->save();

		$this->createDetailClassroom($Announcement->id, $classroom);

		return $Announcement;
	}

	public function update(Announcement|int $Announcement, string $title, string $description, Teacher|int $teacher, Subject|int $subject, Classroom|int $classroom)
	{
		Announcement::query()->find($Announcement instanceof Announcement ? $Announcement->id : $Announcement)
			->update([
				'teacher_id' => $teacher instanceof Teacher ? $teacher->id : $teacher,
				'subject_id' => $subject instanceof Subject ? $subject->id : $subject,
				'classroom_id' => $classroom instanceof Classroom ? $classroom->id : $classroom,
				'title' => $title,
				'description' => $description,
			]);
	}
}
