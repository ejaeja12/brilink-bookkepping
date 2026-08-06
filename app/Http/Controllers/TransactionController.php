<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\TransactionStoreRequest;

use App\Http\Resources\TransactionResource;
use App\Models\MasterBank;
use App\Models\MasterPembayaran;
use App\Models\Transaction;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{

    protected DashboardService $dashboardService;
    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }
    public function store(TransactionStoreRequest $request)
    {

        $transaction = $request->validated();
        Transaction::create($transaction);

        return redirect()->route('transaction.index');
    }

    public function update(TransactionStoreRequest $request, string $id, Transaction $transaction)
    {


        $req = $request->validated();
        $transaction->find($id)->update($req);
    }

    public function show(Request $request)
    {

        $dataMasterBank = MasterBank::select('id', 'name')->where('status', 'active')->get();
        $dataMasterPembayaran = MasterPembayaran::select('id', 'name')->get();
        $statistic = $this->dashboardService->getAdminFee();
        $queryTransaksi = Transaction::query();
        $queryTransaksi->when($request->filled('search'), function ($query) use ($request) {
            $query->where('nominal', 'like', '%' . $request->search . '%');
        });

        $queryTransaksi->when(
            $request->filled('startDate') && $request->filled('endDate'),
            function ($query) use ($request) {
                $query->whereDate('created_at', '>=', $request->startDate)
                    ->whereDate('created_at', '<=', $request->endDate);
            }
        );

        $transaksi = $queryTransaksi->get()->sortByDesc('created_at');

        return Inertia::render(
            'transaksi',
            [
                'transaksi' => TransactionResource::collection($transaksi),
                'bankData' => $dataMasterBank,
                'pembayaranData' => $dataMasterPembayaran,
                'statistic' => $statistic
            ]
        );
    }

    public function search()
    {
        return;
    }
}
