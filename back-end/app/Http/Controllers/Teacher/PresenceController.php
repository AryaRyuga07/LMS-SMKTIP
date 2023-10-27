<?php

declare(strict_types=1);

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use App\Services\Teacher\PresenceService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use function back;

class PresenceController extends Controller
{
	public function create(Request $request) {
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'classroom_id' => 'required|exists:classroom,id',
			'major_id' => 'required|exists:majors,id',
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
		]);

		PresenceService::getInstance()->create(
			$request->post('name'),
			$request->user()->getUserId(),
			(int) $request->get('classroom_id'),
			(int) $request->get('major_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('starts_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('ends_at')),
		);
		$request->session()->flash('message', 'Presence created');
		return back();
	}

	public function update(Presence $presence, Request $request) {
		$request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'teacher_id' => 'required|exists:teacher,id',
			'classroom_id' => 'required|exists:classroom,id',
			'major_id' => 'required|exists:majors,id',
			'starts_at' => 'required|date_format:m/d/Y H:i',
			'ends_at' => 'required|date_format:m/d/Y H:i',
		]);

		PresenceService::getInstance()->update(
			$presence,
			$request->post('name'),
			(int) $request->post('teacher_id'),
			(int) $request->post('classroom_id'),
			(int) $request->post('major_id'),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('starts_at')),
			Carbon::createFromFormat('m/d/Y H:i', $request->post('ends_at'))
		);
		$request->session()->flash('message', 'Presence updated');
		return back();
	}

	public function delete(Presence $presence, Request $request) {
		$presence->delete();

		$request->session()->flash('message', 'Presence deleted');
		return back();
	}
}
