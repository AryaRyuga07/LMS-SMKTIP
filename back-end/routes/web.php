<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/lesson/{imageName}', function ($imageName) {
    return "test";
    $path = public_path('lessons/file/' . $imageName);

    if (file_exists($path)) {
        return response()->file($path);
    } else {
        abort(404); // Gambar tidak ditemukan
    }
});