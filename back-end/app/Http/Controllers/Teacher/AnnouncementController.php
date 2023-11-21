<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Services\Teacher\AnnouncementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnnouncementController extends Controller
{
    public function AnnouncementAll(Request $request)
    {
        $id = $request->id;

		if ($id == null) {
			return Announcement::all();
		} else {
			$announcement = DB::table('announcements')
                ->where('announcements.id', $request->id)
                ->select('announcements.id as id', 'announcements.title as title','announcements.description as description','announcements.subject_id as id_subject')
                ->get();

			$classroom = DB::table('announcements')
			->join('detail_classroom', function ($join) {
				$join->on('announcements.id', '=', 'detail_classroom.main_id');
			})
			->where('announcements.id', $request->id)
			->select('detail_classroom.class_id')
			->get();

			$data = [];

			foreach ($classroom as $detail) {
				$data[] = $detail->class_id;
			}

			foreach ($announcement as $item) {
				$item->class_id = $data;
			}

			return $announcement;
		}
    }

    public function createAnnouncement(Request $request) {
		$request->validate([
			'id_subject' => 'required',
			'title' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
			'description' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
		]);

        AnnouncementService::getInstance()->create(
			$request->title,
			$request->description,
            (int) $request->id_teacher,
			(int) $request->id_subject,
			$request->checkedItems,
		);
		
		return response()->json(['message' => 'Create Data Success']);
	}

    public function updateAnnouncement(Request $request) {
		$request->validate([
			'id_subject' => 'required',
			'title' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
			'description' => 'required|string|regex:/^[.,a-zA-Z0-9\s]*$/',
		]);

		AnnouncementService::getInstance()->update(
			$request->title,
			$request->description,
            (int) $request->id_teacher,
			(int) $request->id_subject,
			$request->checkedItems,
		);
		return response()->json(['message' => 'Update Data Success']);
	}

	public function deleteAnnouncement(Request $request) {
		Announcement::query()->find($request->id)->delete();;
		return response()->json(['message' => 'Delete Data Success']);
	}
}
