<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\MajorController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassroomController;
use App\Http\Controllers\Admin\HistoryController;
use App\Http\Controllers\Admin\UserCreationController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Teacher\AnnouncementController;
use App\Http\Controllers\Teacher\AssignmentController;
use App\Http\Controllers\Teacher\AttendanceController;
use App\Http\Controllers\Teacher\LessonController;
use App\Http\Controllers\Teacher\ScheduleTeacherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::prefix('/major')->group(function () {
    Route::post('/', [MajorController::class, 'DataMajor']);
    Route::post('/{id}', [MajorController::class, 'DataMajor']);
    Route::post('/update/{id}', [MajorController::class, 'updateDataMajor']);
    Route::post('/delete/{id}', [MajorController::class, 'deleteDataMajor']);
    Route::post('/data/add', [MajorController::class, 'addDataMajor']);
});

Route::prefix('/subject')->group(function () {
    Route::post('/', [SubjectController::class, 'DataSubject']);
    Route::post('/{id}', [SubjectController::class, 'DataSubject']);
    Route::post('/update/{id}', [SubjectController::class, 'updateDataSubject']);
    Route::post('/delete/{id}', [SubjectController::class, 'deleteDataSubject']);
    Route::post('/data/add', [SubjectController::class, 'addDataSubject']);
});
Route::prefix('/classroom')->group(function () {
    Route::post('/', [ClassroomController::class, 'DataClassroom']);
    Route::post('/{id}', [ClassroomController::class, 'DataClassroom']);
    Route::post('/update/{id}', [ClassroomController::class, 'updateDataClassroom']);
    Route::post('/delete/{id}', [ClassroomController::class, 'deleteDataClassroom']);
    Route::post('/data/add', [ClassroomController::class, 'addDataClassroom']);
});
Route::prefix('/teacher')->group(function () {
    Route::post('/', [UserManagementController::class, 'TeacherAll']);
    Route::post('/{id}', [UserManagementController::class, 'TeacherAll']);
    Route::post('/update/{id}', [UserManagementController::class, 'updateTeacher']);
    Route::post('/delete/{id}', [UserManagementController::class, 'deleteTeacher']);
    Route::post('/data/add', [UserCreationController::class, 'createTeacher']);
});
Route::prefix('/self')->group(function () {
    Route::post('/', [UserManagementController::class, 'AdminAll']);
    Route::post('/{id}', [UserManagementController::class, 'AdminAll']);
    Route::post('/delete/{id}', [UserManagementController::class, 'deleteAdmin']);
    Route::post('/data/add', [UserCreationController::class, 'createAdmin']);
});
Route::prefix('/student')->group(function () {
    Route::post('/', [UserManagementController::class, 'StudentAll']);
    Route::post('/{id}', [UserManagementController::class, 'StudentAll']);
    Route::post('/update/{id}', [UserManagementController::class, 'updateStudent']);
    Route::post('/delete/{id}', [UserManagementController::class, 'deleteStudent']);
    Route::post('/data/add', [UserCreationController::class, 'createStudent']);
});
Route::prefix('/schedule')->group(function () {
    Route::post('/', [ScheduleController::class, 'DataSchedule']);
    Route::post('/{id}', [ScheduleController::class, 'DataSchedule']);
    Route::post('/update/{id}', [ScheduleController::class, 'updateDataSchedule']);
    Route::post('/delete/{id}', [ScheduleController::class, 'deleteDataSchedule']);
    Route::post('/data/add', [ScheduleController::class, 'addDataSchedule']);
});
Route::prefix('/history')->group(function () {
    Route::post('/data', [HistoryController::class, 'HistoryData']);
    Route::post('/log', [HistoryController::class, 'HistoryLog']);
});

Route::prefix('/teacher-schedule')->group(function () {
    Route::post('/subject/{id}', [ScheduleTeacherController::class, 'getSubject']);
    Route::post('/classroom/{id}', [ScheduleTeacherController::class, 'getClassroom']);
});



Route::prefix('/attendance')->group(function () {
    Route::post('/', [AttendanceController::class, 'AttendanceAll']);
    Route::post('/{id}', [AttendanceController::class, 'AttendanceAll']);
    Route::post('/update/{id}', [AttendanceController::class, 'updateAttendance']);
    Route::post('/delete/{id}', [AttendanceController::class, 'deleteAttendance']);
    Route::post('/data/add', [AttendanceController::class, 'createAttendance']);
});
Route::prefix('/assignment')->group(function () {
    Route::post('/', [AssignmentController::class, 'AssignmentAll']);
    Route::post('/{id}', [AssignmentController::class, 'AssignmentAll']);
    Route::post('/update/{id}', [AssignmentController::class, 'updateAssignment']);
    Route::post('/delete/{id}', [AssignmentController::class, 'deleteAssignment']);
    Route::post('/data/add', [AssignmentController::class, 'createAssignment']);
});
Route::prefix('/lesson')->group(function () {
    Route::post('/', [LessonController::class, 'LessonAll']);
    Route::post('/{id}', [LessonController::class, 'LessonAll']);
    Route::post('/update/{id}', [LessonController::class, 'updateLesson']);
    Route::post('/delete/{id}', [LessonController::class, 'deleteLesson']);
    Route::post('/data/add', [LessonController::class, 'createLesson']);
});
Route::prefix('/announcement')->group(function () {
    Route::post('/', [AnnouncementController::class, 'AnnouncementAll']);
    Route::post('/{id}', [AnnouncementController::class, 'AnnouncementAll']);
    Route::post('/update/{id}', [AnnouncementController::class, 'updateAnnouncement']);
    Route::post('/delete/{id}', [AnnouncementController::class, 'deleteAnnouncement']);
    Route::post('/data/add', [AnnouncementController::class, 'createAnnouncement']);
});
