<?php

namespace App\Services;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardService
{
    protected Transaction $transaction;

    public function __construct()
    {
        $this->transaction = new Transaction();
    }


    public function getAdminFee(Request $request)
    {
        $qTransaksi = Transaction::query();
        $day = match ($request->days) {
            '3d' => 3,
            'w' => 7,
            'm' => 30,
            default => 0
        };

        // cek param query days
        $qTransaksi->when(
            $request->missing('days'),
            fn($query) => $query->whereDate('created_at', now()),
            fn($query) => $query->whereDate('created_at', '>=', now()->subDays((int) $day))
        );

        // pakai clone, kalau gak cuma query terakhir yang jalan karena dia merujuk ke $qtransaksi yang sama

        $saldoMasuk = (clone $qTransaksi)->where('jenis_transaksi', 'tarik_tunai')->sum('nominal');

        $saldoKeluar = (clone $qTransaksi)->whereIn('jenis_transaksi', ['pembayaran', 'setor_tunai'])->sum('nominal');

        $biayaAdmin = (clone $qTransaksi)->sum('biaya_admin');



        return [
            'biaya_admin' => $biayaAdmin,
            'saldo_keluar' => $saldoKeluar,
            'saldo_masuk' => $saldoMasuk,
        ];
    }

    public function totalSumDashboard()
    {
        $qTransaction = $this->transaction->whereDate('created_at', '=', now());

        $totalTransaction = (clone $qTransaction)->count();
        $totalUangMasuk = (clone $qTransaction)->where('jenis_transaksi', '=', 'tarik_tunai')->sum('nominal');
        $totalUangKeluar = (clone $qTransaction)->whereIn('jenis_transaksi', ['pembayaran', 'setor_tunai'])->sum('nominal');
        $totalAdminFee = (clone $qTransaction)->sum('biaya_admin');

        return [
            'totalTransaction' => $totalTransaction,
            'saldoMasuk' => $totalUangMasuk,
            'saldoKeluar' => $totalUangKeluar,
            'totalAdminFee' => $totalAdminFee
        ];
    }

    public function recentTransaction()
    {
        // return $this->transaction->latest()->limit(5)->get();
        return TransactionResource::collection($this->transaction->latest()->limit(4)->get())->toArray(request());
    }

    public function transactionCount()
    {
        // ambil jumlah dari masing-masing jenis transakasi dalam 7 hari terakhir
        $arrData = [];

        for ($i = 7; $i >= 1; $i--) {
            $arrData[] = [
                'date' => now()->subDays($i)->format('d M'),
                'count' => $this->transaction->whereDate('created_at', '=', now()->subDays($i))->count()
            ];
        }
        json_encode($arrData);
        return $arrData;
    }

    public function transactionTypeCount()
    {
        // ambil jumlah dari masing-masing jenis transakasi dalam 7 hari terakhir
        $arrData = [];

        for ($i = 7; $i >= 1; $i--) {
            $query = $this->transaction->whereDate('created_at', '=', now()->subDays($i));
            $arrData[] = [
                'date' => now()->subDays($i)->format('d M'),
                'tarik_tunai' => (clone $query)->where('jenis_transaksi', '=', 'tarik_tunai')->count(),
                'setor_tunai' => (clone $query)->where('jenis_transaksi', '=', 'setor_tunai')->count(),
                'pembayaran' => (clone $query)->where('jenis_transaksi', '=', 'pembayaran')->count()
            ];
        };
        json_encode($arrData);
        return $arrData;
    }

    public function adminFeeSum()
    {
        // ambil jumlah dari masing-masing jenis transakasi dalam 7 hari terakhir
        $arrData = [];

        for ($i = 90; $i >= 1; $i--) {
            $query = $this->transaction->whereDate('created_at', '=', now()->subDays($i));
            $arrData[] = [
                'date' => now()->subDays($i)->format('Y-m-d'),
                'admin_fee' => (clone $query)->sum('biaya_admin'),

            ];
        };
        json_encode($arrData);
        return $arrData;
    }
}
