<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use App\Services\Student\PresenceService;
use Illuminate\Http\Request;
use function base64_decode;
use function redirect;
use function response;
use function str_starts_with;
use function strlen;
use function substr;
use function view;

class PresenceController extends Controller{

	public function submit(Presence $presence, Request $request) {
		if(PresenceService::getInstance()->hasSubmitted($presence, $request->user()->getUserId())) {
			return view('pages.error.simple', ['err' => 'Presence already submitted']);
		}
		$request->validate([
			'status' => 'required|in:present,sick,excused',
			'signature' => 'required'
		]);

		$signature = $request->post('signature');
		$prefix = 'data:image/png;base64,';
		if(!str_starts_with($signature, $prefix)) {
			return response('', 400);
		}
		$signature = substr($signature, strlen($prefix));
		$signature = base64_decode($signature, true);

		PresenceService::getInstance()->submit($presence, $request->user()->getUserId(), $request->post('status'), $signature, $request->ip(), $request->userAgent());
		$request->session()->flash('message', 'Presence submitted!');
		return redirect('/');
	}
}
