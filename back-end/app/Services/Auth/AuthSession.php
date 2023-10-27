<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Models\User;

class AuthSession{

	private ?User $model = null;

	public function __construct(
		private int    $userId,
		private string $name,
		private string $role,
	){
	}

	public function getUserId() : int{
		return $this->userId;
	}

	public function getName() : string{
		return $this->name;
	}

	public function getRole() : string{
		return $this->role;
	}

	public function getModel() : User{
		if($this->model !== null) {
			return $this->model;
		}
		return $this->model = User::query()->find($this->userId);
	}
}
