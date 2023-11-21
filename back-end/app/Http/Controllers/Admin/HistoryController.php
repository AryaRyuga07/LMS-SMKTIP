<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryData;
use App\Models\HistoryLog;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    function HistoryData()
    {
        return HistoryData::all();
    }
    
    function HistoryLog()
    {
        return HistoryLog::all();
    }
}
