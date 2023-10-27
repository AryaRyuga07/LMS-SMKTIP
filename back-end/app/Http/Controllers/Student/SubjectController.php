<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Score;
use App\Models\Student;
use App\Models\StudentAnswer;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use function back;
use function count;
use function intval;
use function nl2br;
use function redirect;
use function response;
use function url;
use function view;

class SubjectController extends Controller
{

	public function view(Subject $subject, Request $request)
	{
		if($subject->starts_at->greaterThan(Carbon::now())) {
			return view('pages.error.simple', ['err' => 'Subject not started yet']);
		}
		if (Score::query()->where('student_id', '=', $request->user()->getUserId())->where('subject_id', '=', $subject->id)->exists()) {
			return view('pages.error.simple', ['err' => 'This subject is already submitted!']);
		}
		/** @var Student $student */
		$student = Student::query()->find($request->user()->getUserId());
		/** @var Question[] $question */
		$question = $subject->questions()->get();
		$totalQuestion = count($question);
		$no = $request->get('no', '1');
		if ($no > $totalQuestion) {
			return back();
		}
		/** @var StudentAnswer[] $answered */
		$answered = StudentAnswer::query()
			->where('student_id', '=', $student->user_id)
			->where('subject_id', '=', $subject->id)
			->get();
		$answeredNo = [];
		$curNo = 0;
		foreach ($question as $q) {
			$curNo++;
			$isAnswered = false;
			foreach ($answered as $ans) {
				if ($ans->question_id === $q->id) {
					$isAnswered = true;
					break;
				}
			}
			$answeredNo[$curNo] = $isAnswered;
		}
		$currentAnswer = null;
		/** @var Question $currentQuestion */
		$currentQuestion = Question::query()->where('subject_id', '=', $subject->id)->offset(intval($no) - 1)->first();
		foreach ($answered as $ans) {
			if ($ans->question_id === $currentQuestion->id) {
				$currentAnswer = $ans->answer;
			}
		}
		return view('pages.student.subject', [
			'student' => $student,
			'subject' => $subject,
			'totalQuestion' => $totalQuestion,
			'question' => $currentQuestion,
			'no' => $no,
			'answeredNo' => $answeredNo,
			'currentAnswer' => $currentAnswer
		]);
	}

	public function submit(Subject $subject, Request $request)
	{
		if($subject->starts_at->greaterThan(Carbon::now())) {
			return view('pages.error.simple', ['err' => 'Subject not started yet']);
		}
		if (Score::query()->where('student_id', '=', $request->user()->getUserId())->where('subject_id', '=', $subject->id)->whereNotNull('submitted_at')->first() !== null) {
			return view('pages.error.simple', ['err' => 'Already submitted!']);
		}

		/** @var StudentAnswer[] $answers */
		$answers = StudentAnswer::query()->where('subject_id', '=', $subject->id)->where('student_id', '=', $request->user()->getUserId())->get();
		/** @var Question[] $questions */
		$questions = $subject->questions()->get();
		$s = 0;
		$qzIds = [];
		foreach ($answers as $answer) {
			foreach ($questions as $q) {
				if ($q->id === $answer->question_id && $q->answer === $answer->answer && ($qzIds[$q->id] ?? null) !== true) {
					$s += $q->score;
					$qzIds[$q->id] = true;
				}
			}
		}

		$score = new Score();
		$score->student_id = $request->user()->getUserId();
		$score->subject_id = $subject->id;
		$score->score = $s;
		$score->submitted_at = Carbon::now();
		$score->save();

		$request->session()->flash('message', 'Answers submitted!');
		return redirect('/');
	}

	public function loadQuestions(Subject $subject, Request $request)
	{
		$result = [];
		/** @var Question $question */
		$i = 0;
		foreach ($subject->questions()->get() as $question) {
			$result[++$i] = [
				'id' => $question->id,
				'question' => nl2br($question->question),
				'image_path' => $question->image_path !== null ? url('images/question/' . $question->image_path) : null,
			];
		}
		return response()->json($result);
	}
}
