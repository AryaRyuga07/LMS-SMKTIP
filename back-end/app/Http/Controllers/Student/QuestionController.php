<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\StudentAnswer;
use Illuminate\Http\Request;
use function back;
use function response;

class QuestionController extends Controller{

	public function get(Request $request) {
		$request->validate([
			'number' => 'required|integer'
		]);

		return back();
	}

	public function answer(Question $question, Request $request) {
		$request->validate([
			'answer' => 'required|in:A,B,C,D,E'
		]);

		$where = ['question_id' => $question->id, 'student_id' => $request->user()->getUserId()];

		if(StudentAnswer::query()
			->where($where)
			->exists()) {
			StudentAnswer::query()->where($where)->update(['answer' => $request->post('answer')]);
		}else{
			StudentAnswer::query()->create([
				'question_id' => $question->id,
				'student_id' => $request->user()->getUserId(),
				'subject_id' => $question->subject_id,
				'answer' => $request->post('answer'),
			]);
		}

		return response()->json(['status' => 'answered']);
	}
}
