<?php

namespace App\Http\Controllers\Student;

use App\Models\AssignmentSubmission;
use App\Models\AttendanceSubmission;
use App\Services\Student\SubmissionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubmissionController
{

    public function AttendanceSubmitted(Request $req)
    {
        $id = $req->id;
        $attId = $req->idAtt;
        return AttendanceSubmission::query()->where('student_id', $id)->where('attendance_id', $attId)->first();
    }
    
    public function AssignmentSubmitted(Request $req)
    {
        $id = $req->id;
        $assignId = $req->idAssign;
        return AssignmentSubmission::query()->where('student_id', $id)->where('assignment_id', $assignId)->first();
    }

    public function AttendanceSubmission(Request $req)
    {
        $req->validate([
            'status' => 'required|in:present,sick,excused',
            'file' => 'nullable',
        ]);
        if ($req->file('file') == null) {
            $file = null;
        } else {
            $file = $req->file('file');
        }
        SubmissionService::getInstance()->submitAttendance(
            $req->id,
            $req->student,
            $req->status,
            $file,
        );
        return response()->json(['message' => 'Submit Data Success']);
    }

    public function AssignmentSubmission(Request $req)
    {
        $req->validate([
            'file' => 'nullable',
            'comment' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
        ]);

        SubmissionService::getInstance()->submitAssignment(
            $req->id,
            $req->student,
            Carbon::createFromFormat('d-m-Y H:i', $req->date),
            $req->file('file'),
            $req->comment,
        );
        return response()->json(['message' => 'Submit Data Success']);
    }
}
