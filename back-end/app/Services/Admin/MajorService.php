<?php

declare(strict_types=1);

namespace App\Services\Admin;

use App\Models\Major;
use App\Traits\SingletonTrait;

class MajorService{

	use SingletonTrait;

	public function create(string $name) {
		$major = new Major();
		$major->name = $name;
		$major->save();
	}

	public function delete(Major|int $major) {
		Major::query()->find($major instanceof Major ? $major->id : $major)->delete();
	}

	public function update(Major|int $Major, string $name) {
		Major::query()->find($Major instanceof Major ? $Major->id : $Major)->update(['name' => $name]);
	}

	/**
	 * @return Major[]
	 */
	public function getAll() : array{
		return Major::query()->get()->all();
	}
}
