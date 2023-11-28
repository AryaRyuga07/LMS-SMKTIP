<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Support\Facades\DB;

class GradeController extends Controller
{
    public function grade(Request $req) 
    {
        $data = [
            'assignment_id' => $req->id,
            'student_id' => $req->student,
            'grade' => $req->grade,
        ];

        Grade::updateOrInsert(['student_id' => $data['student_id']], $data);
        return response()->json(['message' => 'Grades Success']);
    }
}
