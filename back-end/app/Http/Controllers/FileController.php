<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function showLesson($filename)
    {
        $file_path = public_path('/lessons/file/' . $filename . '.jpg');
        
        if (file_exists($file_path)) {
            return $file_path;
            // return Response::download($file_path);
        } else {
            return response()->json(['error' => 'File not found.'], 404);
        }
    }
}
