<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssignmentSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubmittedResult extends Controller
{
    public function getAttendance(Request $request)
    {
        $id = $request->id;
        if ($request->idClass == null) {
            $attendance = DB::table('attendance_submissions')
                ->join('attendances', function ($join) {
                    $join->on('attendance_submissions.attendance_id', '=', 'attendances.id');
                })
                ->join('subjects', function ($join) {
                    $join->on('attendances.subject_id', '=', 'subjects.id');
                })
                ->join('students', function ($join) {
                    $join->on('attendance_submissions.student_id', '=', 'students.user_id');
                })
                ->join('classrooms', function ($join) {
                    $join->on('students.classroom_id', '=', 'classrooms.id');
                })
                ->where('attendance_submissions.attendance_id', $id)
                ->select('attendances.title as att_id', 'students.full_name as student', 'attendance_submissions.status as status', 'attendance_submissions.file as file', 'attendance_submissions.created_at as date', 'subjects.name as subject', 'classrooms.name as classroom')
                ->get();
            return $attendance;
        } else {
            $attendance = DB::table('attendance_submissions')
                ->join('attendances', function ($join) {
                    $join->on('attendance_submissions.attendance_id', '=', 'attendances.id');
                })
                ->join('subjects', function ($join) {
                    $join->on('attendances.subject_id', '=', 'subjects.id');
                })
                ->join('students', function ($join) {
                    $join->on('attendance_submissions.student_id', '=', 'students.user_id');
                })
                ->join('classrooms', function ($join) {
                    $join->on('students.classroom_id', '=', 'classrooms.id');
                })
                ->where('attendance_submissions.attendance_id', $id)
                ->where('students.classroom_id', $request->idClass)
                ->select('attendances.title as att_id', 'students.full_name as student', 'attendance_submissions.status as status', 'attendance_submissions.file as file', 'attendance_submissions.created_at as date', 'subjects.name as subject', 'classrooms.name as classroom')
                ->get();
            return $attendance;
        }
    }
    public function getAssignment(Request $request)
    {
        $id = $request->id;
        if ($request->idClass == null) {
            $assignment = AssignmentSubmission::leftJoin('assignments', 'assignments_submissions.assignment_id', '=', 'assignments.id')
                ->leftJoin('subjects', 'assignments.subject_id', '=', 'subjects.id')
                ->leftJoin('students', 'assignments_submissions.student_id', '=', 'students.user_id')
                ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
                ->leftJoin('grades', 'grades.assignment_id', '=', 'assignments.id')
                ->where('assignments_submissions.assignment_id', $id)
                ->select(
                    'assignments.title as assign_id',
                    'subjects.name as subject',
                    'students.user_id as student_id',
                    'students.full_name as student',
                    'classrooms.name as classroom',
                    'assignments_submissions.comment',
                    'assignments_submissions.file',
                    'assignments_submissions.date',
                    'grades.grade'
                )
                ->get();
            return $assignment;
        } else {
            $assignment = AssignmentSubmission::leftJoin('assignments', 'assignments_submissions.assignment_id', '=', 'assignments.id')
                ->leftJoin('subjects', 'assignments.subject_id', '=', 'subjects.id')
                ->leftJoin('students', 'assignments_submissions.student_id', '=', 'students.user_id')
                ->leftJoin('classrooms', 'students.classroom_id', '=', 'classrooms.id')
                ->leftJoin('grades', 'grades.assignment_id', '=', 'assignments.id')
                ->where('assignments_submissions.assignment_id', $id)
                ->where('students.classroom_id', $request->idClass)
                ->select(
                    'assignments.title as assign_id',
                    'subjects.name as subject',
                    'students.user_id as student_id',
                    'students.full_name as student',
                    'classrooms.name as classroom',
                    'assignments_submissions.comment',
                    'assignments_submissions.file',
                    'assignments_submissions.date',
                    'grades.grade'
                )
                ->get();
            return $assignment;
        }
    }
}
