<?php

declare(strict_types=1);

namespace App\Services\Student;

use App\Models\AssignmentSubmission;
use App\Models\AttendanceSubmission;
use App\Models\Lesson;
use App\Models\Subject;
use App\Traits\SingletonTrait;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use function public_path;
use Illuminate\Support\Str;

class SubmissionService{

	use SingletonTrait;

	public function submitAttendance(string $attendanceId, string $studentId, string $status, ?UploadedFile $file)
	{
		$attendance = new AttendanceSubmission();
		$attendance->attendance_id = $attendanceId;
		$attendance->student_id = $studentId;
		$attendance->status = $status;
        
        if($file !== null){
			$file->move(public_path('submission/attendance'), $fileName = Str::random(16) . '.' . $file->extension());
			$attendance->file = $fileName;
		}
		$attendance->save();
		return $status;
	}
	
    public function submitAssignment(int $assignmentId, int $studentId, Carbon $date, ?UploadedFile $file, string $comment)
	{
		$assignment = new AssignmentSubmission();
		$assignment->assignment_id = $assignmentId;
		$assignment->student_id = $studentId;
		$assignment->date = $date;
		$assignment->comment = $comment;
        
        if($file !== null){
			$file->move(public_path('submission/assignment'), $fileName = Str::random(16) . '.' . $file->extension());
			$assignment->file = $fileName;
		}
		$assignment->save();
	}
}
