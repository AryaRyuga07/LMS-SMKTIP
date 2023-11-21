<?php

declare(strict_types=1);

namespace App\Services\Teacher;

use App\Models\Classroom;
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

	public function create(string $title, string $description, ?UploadedFile $file, int $teacherId, Subject|int $subject, Classroom|int $classroom)
	{
		$Lesson = new Lesson();
		$Lesson->teacher_id = $teacherId;
		$Lesson->subject_id = $subject instanceof Subject ? $subject->id : $subject;
		$Lesson->classroom_id = $classroom instanceof Classroom ? $classroom->id : $classroom;
		$Lesson->title = $title;
		$Lesson->description = $description;
        
        if($file !== null){
			$file->move(public_path('images/student'), $fileName = Str::random(16) . '.' . $file->extension());
			$Lesson->content = $fileName;
		}
		$Lesson->save();
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
