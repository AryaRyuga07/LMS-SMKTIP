<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Services\Teacher\LessonService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    public function LessonAll(Request $request)
    {
        $id = $request->id;

		if ($id == null) {
			return Lesson::query()->where('teacher_id', $request->user)->get();
		} else {
			$lesson = DB::table('lessons')
                ->where('lessons.id', $request->id)
                ->select('lessons.id as id', 'lessons.title as title','lessons.description as description','lessons.subject_id as id_subject')
                ->get();

			$classroom = DB::table('lessons')
			->join('detail_classroom', function ($join) {
				$join->on('lessons.id', '=', 'detail_classroom.main_id');
			})
			->where('lessons.id', $request->id)
			->select('detail_classroom.class_id')
			->get();

			$data = [];

			foreach ($classroom as $detail) {
				$data[] = $detail->class_id;
			}

			foreach ($lesson as $item) {
				$item->class_id = $data;
			}

			return $lesson;
		}
    }

    public function createLesson(Request $request) {
		$request->validate([
			'id_subject' => 'required',
			'id_teacher' => 'required',
			'title' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
			'content' => 'nullable',
			'description' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
		]);

        LessonService::getInstance()->create(
			$request->title,
			$request->description,
            $request->file('content'),
            $request->id_teacher,
			(int) $request->id_subject,
			$request->checkedItems,
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

	public function deleteLesson(Request $request) {
		Lesson::query()->find($request->id)->delete();
		DB::table('detail_classroom')->where('main_id', $request->id)->where('data', 'Lesson')->delete();
		return response()->json(['message' => 'Delete Data Success']);
	}
}
