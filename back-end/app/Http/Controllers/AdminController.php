<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Major;
use Illuminate\Support\Facades\Redis;

class AdminController extends Controller
{
    function DataMajor(Request $request)
    {
        $id = $request->id;
        if($id == null){
            return Major::all();
        } else {
            return Major::query()->find($request->id);
        }
    }

    function deleteDataMajor(Request $request)
    {
        Major::query()->find($request->id)->delete();
        return response()->json(['message' => 'Delete Data Success']);
    }

    function updateDataMajor(Request $request)
    {
        $request->validate([
            'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
        ]);

        Major::query()->find($request->id)->update([
            'name' => $request->name,
        ]);
        return response()->json(['message' => 'Update Data Success']);
    }

    function addDataMajor(Request $request)
    {
        $request->validate([
			'name' => 'required|string|regex:/^[a-zA-Z\s]*$/',
		]);

		$major = new Major();
		$major->name = $request->name;
		$major->save();
        return response()->json(['message' => 'Insert Data Success']);
    }
}
