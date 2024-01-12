<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    function DataSchedule(Request $request)
    {
        $id = $request->id;

        if ($id == null) {
            $schedule = DB::table('schedules')
                ->join('teachers', function ($join) {
                    $join->on('schedules.teacher_id', '=', 'teachers.user_id');
                })
                ->join('subjects', function ($join) {
                    $join->on('schedules.subject_id', '=', 'subjects.id');
                })
                ->join('classrooms', function ($join) {
                    $join->on('schedules.classroom_id', '=', 'classrooms.id');
                })
                ->select('schedules.id', 'teachers.full_name as teacher', 'subjects.name as subject', 'classrooms.name as classroom')
                ->get();

            return $schedule;
        } else {
            $schedule = DB::table('schedules')
                ->join('teachers', function ($join) {
                    $join->on('schedules.teacher_id', '=', 'teachers.user_id');
                })
                ->join('subjects', function ($join) {
                    $join->on('schedules.subject_id', '=', 'subjects.id');
                })
                ->join('classrooms', function ($join) {
                    $join->on('schedules.classroom_id', '=', 'classrooms.id');
                })
                ->where('schedules.id', $request->id)
                ->select('schedules.id', 'teachers.full_name as teacher', 'subjects.name as subject', 'classrooms.name as classroom')
                ->first();

            return $schedule;
        }
    }

    function deleteDataSchedule(Request $request)
    {
        Schedule::query()->find($request->id)->delete();
        return response()->json(['message' => 'Delete Data Success']);
    }

    function updateDataSchedule(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'classroom_id' => 'required',
        ]);

        Schedule::query()->find($request->id)->update([
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'classroom_id' => $request->classroom_id,
        ]);
        return response()->json(['message' => 'Update Data Success']);
    }

    function addDataSchedule(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'classroom_id' => 'required',
        ]);

        $existingSchedule = DB::table('schedules')
            ->where('teacher_id', $request->teacher_id)
            ->where('subject_id', $request->subject_id)
            ->where('classroom_id', $request->classroom_id)
            ->exists();

        // Mengecek apakah classroom_id sudah ada pada jadwal lain
        $classroomExists = DB::table('schedules')
            ->where('classroom_id', $request->classroom_id)
            ->exists();

        if ($existingSchedule && $classroomExists) {
            return response()->json(['error' => 'Jadwal sudah ada.'], 422);
        }

        $Schedule = new Schedule();
        $Schedule->teacher_id = $request->teacher_id;
        $Schedule->subject_id = $request->subject_id;
        $Schedule->classroom_id = $request->classroom_id;
        $Schedule->save();
        return response()->json(['message' => 'Insert Data Success']);
    }
}
