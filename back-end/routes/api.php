<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\MajorController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassroomController;
use App\Http\Controllers\Admin\TeacherController;

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
    Route::post('/', [TeacherController::class, 'DataTeacher']);
    Route::post('/{id}', [TeacherController::class, 'DataTeacher']);
    Route::post('/update/{id}', [TeacherController::class, 'updateDataTeacher']);
    Route::post('/delete/{id}', [TeacherController::class, 'deleteDataTeacher']);
    Route::post('/data/add', [TeacherController::class, 'addDataTeacher']);
});
