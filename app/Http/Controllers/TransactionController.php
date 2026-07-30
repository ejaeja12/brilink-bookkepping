<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\TransactionStoreRequest;

use App\Http\Resources\TransactionResource;
use App\Models\MasterBank;
use App\Models\MasterPembayaran;
use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function store(TransactionStoreRequest $request)
    {

        $transaction = $request->validated();
        Transaction::create($transaction);

        return redirect()->route('dashboard');
    }

    public function update(TransactionStoreRequest $request, string $id, Transaction $transaction)
    {


        $req = $request->validated();
        $transaction->find($id)->update($req);
    }

    public function show()
    {
        $transaksi = Transaction::orderBy('created_at', 'desc')->get();
        $dataMasterBank = MasterBank::select('id', 'name')->where('status', 'active')->get();
        $dataMasterPembayaran = MasterPembayaran::select('id', 'name')->get();

        return Inertia::render(
            'dashboard',
            [
                'transaksi' => TransactionResource::collection($transaksi),
                'bankData' => $dataMasterBank,
                'pembayaranData' => $dataMasterPembayaran
            ]
        );
    }
}
