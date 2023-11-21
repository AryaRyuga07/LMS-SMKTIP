<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Services\Teacher\LessonService;
use Carbon\Carbon;

class LessonController extends Controller
{
    public function LessonAll(Request $request)
    {
        $id = $request->id;

		if ($id == null) {
			return Lesson::all();
		} else {
			return Lesson::query()->find($request->id);
		}
    }

    public function createLesson(Request $request) {
		$request->validate([
			'subject_id' => 'required',
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'content' => 'nullable',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			// 'starts_at' => 'required|date_format:m/d/Y H:i',
			// 'ends_at' => 'required|date_format:m/d/Y H:i',
		]);

        LessonService::getInstance()->create(
			$request->title,
			$request->description,
            $request->file('content'),
            $request->teacher_id,
			(int) $request->subject_id,
			(int) $request->classroom_id,
			// Carbon::createFromFormat('m/d/Y H:i', $request->post('start_at')),
			// Carbon::createFromFormat('m/d/Y H:i', $request->post('end_at')),
		);
		return response()->json(['message' => 'Create Data Success']);
	}

    public function updateLesson(Request $request) {
		$request->validate([
			'subject_id' => 'required',
			'classroom_id' => 'required',
			'title' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			'description' => 'required|string|regex:/^[a-zA-Z\s]*$/',
			// 'content' => 'nullable',
		]);

		LessonService::getInstance()->update(
			$request->id,
			$request->title,
			$request->description,
			(int) $request->teacher_id,
			(int) $request->subject_id,
			(int) $request->classroom_id,
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteLesson(Lesson $Lesson, Request $request) {
		$Lesson->delete();

		return response()->json(['message' => 'Delete Data Success']);
	}
}
