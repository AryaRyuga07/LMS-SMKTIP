<?php

declare(strict_types=1);

namespace App\Http\Controllers\Teacher;

use App\Models\Subject;
use App\Services\Teacher\ScoreService;
use function response;

class ScoreController{

	public function exportToCsv(Subject $subject) {
		return response(ScoreService::getInstance()->exportToCsv($subject), 201)
			->header('Content-Type', 'text/csv')
			->header('Content-Disposition', 'attachment; filename="score_' . $subject->id . '.csv"');
	}
}
