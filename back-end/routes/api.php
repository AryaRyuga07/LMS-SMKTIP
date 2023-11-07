<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\MajorController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassroomController;
use App\Http\Controllers\Admin\UserCreationController;
use App\Http\Controllers\Admin\UserManagementController;

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
Route::prefix('/student')->group(function () {
    Route::post('/', [UserManagementController::class, 'StudentAll']);
    Route::post('/{id}', [UserManagementController::class, 'StudentAll']);
    Route::post('/update/{id}', [UserManagementController::class, 'updateStudent']);
    Route::post('/delete/{id}', [UserManagementController::class, 'deleteStudent']);
    Route::post('/data/add', [UserCreationController::class, 'createStudent']);
});
Route::prefix('/attendance')->group(function () {
    Route::post('/', [AttendanceController::class, 'AttendanceAll']);
    Route::post('/{id}', [AttendanceController::class, 'AttendanceAll']);
    Route::post('/update/{id}', [AttendanceController::class, 'updateAttendance']);
    Route::post('/delete/{id}', [AttendanceController::class, 'deleteAttendance']);
    Route::post('/data/add', [UserCreationController::class, 'createAttendance']);
});
Route::prefix('/assignment')->group(function () {
    Route::post('/', [AssignmentController::class, 'AssignmentAll']);
    Route::post('/{id}', [AssignmentController::class, 'AssignmentAll']);
    Route::post('/update/{id}', [AssignmentController::class, 'updateAssignment']);
    Route::post('/delete/{id}', [AssignmentController::class, 'deleteAssignment']);
    Route::post('/data/add', [UserCreationController::class, 'createAssignment']);
});
