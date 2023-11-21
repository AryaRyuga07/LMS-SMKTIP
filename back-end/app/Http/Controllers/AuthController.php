<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $username = $request->username;
        $password = $request->password;

        $user = User::query()->where('name', '=', $username)->first();

        $teacher = DB::table('schedules')
            ->join('subjects', function ($join) {
                $join->on('schedules.subject_id', '=', 'subjects.id');
            })
            ->join('teachers', function ($join) {
                $join->on('schedules.teacher_id', '=', 'teachers.user_id');
            })
            ->where('schedules.teacher_id', $user->id)
            ->select('teachers.user_id', 'teachers.full_name as name', 'subjects.name as subject')
            ->first();


        if ($user === null || !$user->isPasswordValid($password)) {
            return response()->json(['message' => 'Invalid username or password', 'role' => 'failed']);
        }

        if ($user->isAdmin()) {
            DB::statement('CALL logUser(?, ?, ?, ?)', array($user->id, $user->name, "login", Carbon::now()));
            return response()->json(['message' => 'Login Success', 'role' => 'admin', 'name' => $user->name, 'id' => $user->id]);
        }

        if ($user->isTeacher()) {
            if ($teacher == null) {
                return response()->json(['message' => 'Data not complete, contact our admin']);
            }
            DB::statement('CALL logUser(?, ?, ?, ?)', array($user->id, $user->name, "login", Carbon::now()));
            return response()->json(['message' => 'Login Success', 'role' => 'teacher', 'name' => $teacher->name, 'id' => $user->id, 'subject' => $teacher->subject]);
        }

        // Redirect non-admin users
        DB::statement('CALL logUser(?, ?, ?, ?)', array($user->id, $user->name, "login", Carbon::now()));
        return response()->json(['message' => 'Login Success', 'role' => 'student', 'name' => $user->name, 'id' => $user->id]);
    }

    public function logout(Request $request)
    {
        DB::statement('CALL logUser(?, ?, ?, ?)', array($request->id, $request->name, "logout", Carbon::now()));
        return response()->json(['message' => 'Logout Success']);
    }
}
