<?php

declare(strict_types=1);

namespace App\Services\Admin;

use App\Models\Classroom;
use App\Models\Major;
use App\Traits\SingletonTrait;

class ClassroomService{

	use SingletonTrait;

	public function create(string $name, Major|int $major) {
		$classroom = new Classroom();
		$classroom->name = $name;
		$classroom->major_id = $major instanceof Major ? $major->id : $major;
		$classroom->save();
	}

	public function delete(Classroom|int $classroom) {
		Classroom::query()->find($classroom instanceof Classroom ? $classroom->id : $classroom)->delete();
	}

	public function update(Classroom|int $classroom, string $name, Major|int $major) {
		Classroom::query()->find($classroom instanceof Classroom ? $classroom->id : $classroom)
			->update([
				'name' => $name,
				'major_id' => $major instanceof Major ? $major->id : $major
			]);
	}

	/**
	 * @return Classroom[]
	 */
	public function getAll() : array{
		return Classroom::query()->get()->all();
	}
}
