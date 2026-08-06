<?php

namespace App\Http\Controllers\Logs;

use App\Http\Controllers\Controller;
use App\Models\LogActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogActivityController extends Controller
{
    public function index()
    {
        $logactivity = LogActivity::orderBy('created_at', 'desc')->get();
        return Inertia::render('logs/log-activity', [
            'logactivity' => $logactivity
        ]);
    }
}
