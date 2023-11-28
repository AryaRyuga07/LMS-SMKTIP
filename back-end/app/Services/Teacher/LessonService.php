<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
use App\Models\DetailClassroom;
use App\Models\Lesson;
use App\Models\Teacher;
use App\Models\Subject;
use App\Traits\SingletonTrait;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use function public_path;
use Illuminate\Support\Str;

class LessonService{

	use SingletonTrait;

	private function createDetailClassroom(int $main_id, $classroom)
	{
		$id = $main_id;

		foreach ($classroom as $data) {
			$Detail = new DetailClassroom();
			$Detail->main_id = $id;
			$Detail->table = 'Lesson';
			$Detail->class_id = $data;
			$Detail->save();
		}
		return $Detail;
	}

	public function create(string $title, string $description, ?UploadedFile $file, int $teacherId, Subject|int $subject, array $classroom)
	{
		$Lesson = new Lesson();
		$Lesson->teacher_id = $teacherId;
		$Lesson->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Lesson->title = $title;
		$Lesson->description = $description;
        
        if($file !== null){
			$fileName = $file->storeAs('public/lessons', $file->hashName());
			$Lesson->content = $fileName;
		}
		$Lesson->save();

		$this->createDetailClassroom($Lesson->id, $classroom);
		return $Lesson;
	}

	public function update(Lesson|int $Lesson, string $title, string $description, Teacher|int $teacher, Subject|int $subject, Classroom|int $classroom) 
	{
		Lesson::query()->find($Lesson instanceof Lesson ? $Lesson->id : $Lesson)
			->update([
				'teacher_id' => $teacher instanceof Teacher ? $teacher->id : $teacher,
                'subject_id' => $subject instanceof Subject ? $subject->id : $subject,
                'classroom_id' => $classroom instanceof Classroom ? $classroom->id : $classroom,
				'title' => $title,
				'description' => $description,
			]);
	}
}
