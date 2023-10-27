<?php

declare(strict_types=1);

namespace App\Http\Controllers\Teacher;

use App\Models\Question;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use function back;
use function public_path;

class QuestionController{

	public function create(Subject $subject, Request $request) {
		$request->validate([
			'question' => 'required|string',
			'answer' => 'required|in:A,B,C,D,E',
			'image' => 'nullable|mimes:png,jpg',
			'score' => 'required|integer',
		]);

		$question = new Question();
		$question->question = $request->post('question');
		$question->answer = $request->post('answer');
		$question->score = $request->post('score');
		$question->subject_id = $subject->id;

		$image = $request->file('image');
		if($image !== null){
			$image->move(public_path('images/question'), $fileName = Str::random(16) . '.' . $image->extension());
			$question->image_path = $fileName;
		}

		$question->save();

		$request->session()->flash('message', 'Question created.');
		return back();
	}

	public function edit(Question $question, Request $request) {
		$request->validate([
			'question' => 'required|string',
			'answer' => 'required|in:A,B,C,D,E',
			'score' => 'required|integer',
			'image' => 'nullable|mimes:png,jpg',
			'delete_image' => 'boolean',
		]);

		$update = [
			'question' => $request->post('question'),
			'answer' => $request->post('answer'),
			'score' => $request->post('score'),
		];

		if($request->post('delete_image')) {
			if($question->image_path !== null){
				$update['image_path'] = null;
			}
		}

		$image = $request->file('image');
		if($image !== null){
			if($question->image_path !== null) {
				File::delete(public_path('images/question/' . $question->image_path));
			}

			$image->move(public_path('images/question'), $fileName = Str::random(16) . '.' . $image->extension());
			$update['image_path'] = $fileName;
		}

		Question::query()->find($question->id)->update($update);

		$request->session()->flash('message', 'Question edited.');
		return back();
	}

	public function delete(Question $question, Request $request) {
		$question->delete();
		$request->session()->flash('message', 'Question deleted.');
		return back();
	}
}
