<?php

namespace App\Http\Controllers;

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
        if ($user === null || !$user->isPasswordValid($password)) {
            return response()->json(['message' => 'Invalid username or password', 'role' => 'failed']);
		}
        
        if ($user->isAdmin()) {
            DB::statement('CALL logUser(?, ?, ?, ?)', array($user->id, $user->name, "login", Carbon::now()));
            return response()->json(['message' => 'Login Success', 'role' => 'admin', 'name' => $user->name, 'id' => $user->id]);
		}
        
		if ($user->isTeacher()) {
            DB::statement('CALL logUser(?, ?, ?, ?)', array($user->id, $user->name, "login", Carbon::now()));
            return response()->json(['message' => 'Login Success', 'role' => 'teacher', 'name' => $user->name, 'id' => $user->id]);
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
