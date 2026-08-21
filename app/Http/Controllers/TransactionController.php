<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\TransactionStoreRequest;

use App\Http\Resources\TransactionResource;
use App\Models\MasterBank;
use App\Models\MasterPembayaran;
use App\Models\Transaction;
use App\Services\DashboardService;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Illuminate\Routing\Attributes\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;
use Spatie\Permission\Middleware\RoleMiddleware;



class TransactionController extends Controller
{

    protected DashboardService $dashboardService;
    protected TransactionService $transactionService;


    public function __construct(DashboardService $dashboardService, TransactionService $transactionService)
    {
        $this->dashboardService = $dashboardService;
        $this->transactionService = $transactionService;
    }


    public function store(TransactionStoreRequest $request)
    {

        $transaction = $request->validated();
        $transaction['user_id'] = auth()->user()->id;
        Transaction::create($transaction);

        return redirect()->route('transaction.index');
    }

    // #[Middleware('permission:edit.transaksi')]
    public function update(TransactionStoreRequest $request, string $id, Transaction $transaction)
    {


        $req = $request->validated();
        $transaction->find($id)->update($req);
    }

    public function show(Request $request)
    {

        $dataMasterBank = MasterBank::select('id', 'name')->where('status', 'active')->get();
        $dataMasterPembayaran = MasterPembayaran::select('id', 'name')->get();
        $statistic = $this->dashboardService->getAdminFee($request);
        $transaksi = $this->transactionService->index($request);

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

    #[Authorize('delete.transaksi')]
    public function destroy(string $id)
    {
        Transaction::find($id)->delete();
    }

    public function search()
    {
        return;
    }
}
