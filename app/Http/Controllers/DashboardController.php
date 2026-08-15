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
            'totalSumTransaction' => $totalTransaction,
            'transactionCount' => $transactionCount,
            'recentTransaction' => $recentTransaction,
            'transactionTypeCount' => $transactionTypeCount,
            'adminFeeSum' => $adminFeeSum
        ]);
    }
}
