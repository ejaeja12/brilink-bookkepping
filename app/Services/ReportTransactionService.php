<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Http\Request;

class ReportTransactionService
{
    public function index(Request $request)
    {
        $queryTransaksi = Transaction::query();

        $qStartDate = now();
        $qEndDate = now();

        if ($request->filled('startdate')) {
            $qStartDate = $request->startdate;
        }
        if ($request->filled('enddate')) {
            $qEndDate = $request->enddate;
        }

        $queryTransaksi
            ->whereDate('created_at', '>=', $qStartDate)->whereDate('created_at', '<=', $qEndDate)
            ->when(
                $request->filled('search'),
                fn($query) => $query
                    ->where(
                        fn($q) => $q   // grouping query, karena ada orWhereHas
                            ->where('nominal', 'like', '%' . $request->search . '%')
                            ->orWhereHas('masterBank', fn($q2) => $q2->where('name', 'like', '%' . $request->search . '%'))
                    )
            );


        $transaksi = $queryTransaksi->paginate()->withQueryString();

        return $transaksi;
    }

    public function getDataReport(Request $request)
    {
        $queryTransaksi = Transaction::query();

        $qStartDate = now();
        $qEndDate = now();

        if ($request->filled('startdate')) {
            $qStartDate = $request->startdate;
        }
        if ($request->filled('enddate')) {
            $qEndDate = $request->enddate;
        }

        $queryTransaksi
            ->whereDate('created_at', '>=', $qStartDate)->whereDate('created_at', '<=', $qEndDate)
            ->when(
                $request->filled('search'),
                fn($query) => $query
                    ->where(
                        fn($q) => $q   // grouping query, karena ada orWhereHas
                            ->where('nominal', 'like', '%' . $request->search . '%')
                            ->orWhereHas('masterBank', fn($q2) => $q2->where('name', 'like', '%' . $request->search . '%'))
                    )
            );


        $transaksi = $queryTransaksi->get();

        return $transaksi;
    }
}
