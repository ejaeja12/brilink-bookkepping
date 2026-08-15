<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;
    public function __construct()
    {
        $this->dashboardService = new DashboardService();
    }
    public function index()
    {
        $totalTransaction = $this->dashboardService->totalSumDashboard();
        $recentTransaction = $this->dashboardService->recentTransaction();
        $transactionCount = $this->dashboardService->transactionCount();
        $transactionTypeCount = $this->dashboardService->transactionTypeCount();
        $adminFeeSum = $this->dashboardService->adminFeeSum();

        return Inertia::render('dashboard', [
            'totalSumTransaction' => Inertia::defer(fn() => $totalTransaction),
            'transactionCount' => Inertia::defer(fn() => $transactionCount),
            'recentTransaction' => Inertia::defer(fn() => $recentTransaction),
            'transactionTypeCount' => Inertia::defer(fn() => $transactionTypeCount),
            'adminFeeSum' => Inertia::defer(fn() => $adminFeeSum)
        ]);
        // return Inertia::render('dashboard');
    }
}
