<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Models\Student;
use App\Services\Admin\StudentService;
use function response;

class StudentController{

	public function exportToCsv(Student $student) {
		return response(StudentService::getInstance()->exportToCsv($student), 201)
			->header('Content-Type', 'text/csv')
			->header('Content-Disposition', 'attachment; filename="report_' . $student->full_name . '.csv"');
	}
}
