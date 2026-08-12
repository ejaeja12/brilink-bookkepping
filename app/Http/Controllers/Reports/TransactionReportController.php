<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Services\ReportTransactionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionReportController extends Controller
{

    protected ReportTransactionService $report;
    public function __construct(ReportTransactionService $reportTransactionService)
    {
        $this->report = $reportTransactionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $transaksi = $this->report->index($request);
        return Inertia::render('reports/report-transaction', [
            'transaksi' => TransactionResource::collection($transaksi)
        ]);
    }

    public function createReport(Request $request)
    {
        $transaksi = $this->report->index($request);
        $reportTransaksi = $this->report->getDataReport($request);
        return  [
            'data' => TransactionResource::collection($reportTransaksi),
        ];
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
