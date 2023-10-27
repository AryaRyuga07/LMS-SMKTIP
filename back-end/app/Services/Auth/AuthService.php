<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\Request;

class AuthService{

	public function set(Request $request, User $user) : void{
		$request->session()->put('authenticated_user', [
			'user_id' => $user->id,
			'name' => $user->name,
			'role' => $user->role,
		]);
	}

	public function get(Request $request) : ?AuthSession{
		$session = $request->session()->get('authenticated_user');
		if($session === null) {
			return null;
		}
		return new AuthSession($session['user_id'], $session['name'], $session['role']);
	}

	public function isAuthenticated(Request $request) : bool{
		return $this->get($request) !== null;
	}
}
