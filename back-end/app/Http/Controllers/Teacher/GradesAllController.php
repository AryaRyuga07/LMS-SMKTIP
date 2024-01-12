<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GradesAllController extends Controller
{
    public function getGrades()
    {
        return DB::table('grade_student')->get();
    }
    
    public function getGradesClassroom(Request $request)
    {
        return DB::table('grade_student')->where('Classroom', $request->classroom)->get();
    }

    public function getClassroom(Request $request)
    {
        $schedule = DB::table('schedules')
            ->join('classrooms', function ($join) {
                $join->on('schedules.classroom_id', '=', 'classrooms.id');
            })
            ->where('schedules.teacher_id', $request->id)
            ->where('schedules.subject_id', $request->id_subject)
            ->select('classrooms.id as id_classroom', 'classrooms.name as classroom')
            ->distinct()
            ->get();

        return $schedule;
    }

    public function getSubject(Request $request)
    {
        $schedule = DB::table('schedules')
            ->join('subjects', function ($join) {
                $join->on('schedules.subject_id', '=', 'subjects.id');
            })
            ->where('schedules.teacher_id', $request->id)
            ->where('schedules.subject_id', $request->id_subject)
            ->select('subjects.id as id_subject', 'subjects.name as subject')
            ->distinct()
            ->get();

        return $schedule;
    }
}
