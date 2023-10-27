<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $username = $request->post('username');
        $password = $request->post('password');

        $user = User::query()->where('name', '=', $username)->first();
        if ($user == null) {
            return response()->json(['message' => 'Login Failed Bro', 'role' => 'failed']);
        }
        
        if ($user->isAdmin()) {
            return response()->json(['message' => 'Login Success', 'role' => 'Admin']);
		}
        
		if ($user->isTeacher()) {
            return response()->json(['message' => 'Login Success', 'role' => 'Teacher']);
		}

		// Redirect non-admin users
        return response()->json(['message' => 'Login Success', 'role' => 'Student']);

    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out']);
    }
}
