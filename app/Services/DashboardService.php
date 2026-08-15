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
        // ambil jumlah dari  transakasi dalam 7 hari terakhir

        $data = $this->transaction
            ->where('created_at', '>=', now()->subDays(7))
            ->selectRaw("
                DATE(created_at) as date, COUNT(*) as count")
            ->groupBy('date')
            ->orderBy('date')
            ->get();
        json_encode($data);
        return $data;
    }

    public function transactionTypeCount()
    {

        $data = $this->transaction
            ->where('created_at', '>=', now()->subDays(7))
            ->selectRaw("
                DATE(created_at) as date,
                SUM(CASE WHEN jenis_transaksi = 'tarik_tunai' THEN 1 ELSE 0 END) as tarik_tunai,
                SUM(CASE WHEN jenis_transaksi = 'setor_tunai' THEN 1 ELSE 0 END) as setor_tunai,
                SUM(CASE WHEN jenis_transaksi = 'pembayaran' THEN 1 ELSE 0 END) as pembayaran
            ")
            ->groupBy('date')
            ->orderBy('date')
            ->get();
        json_encode($data);
        return $data;
    }

    public function adminFeeSum()
    {
        // ambil jumlah dari masing-masing jenis transakasi dalam 7 hari terakhir

        $data = $this->transaction
            ->where('created_at', '>=', now()->subDays(90))
            ->selectRaw('DATE(created_at) as date, SUM(biaya_admin) as admin_fee')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        json_encode($data);
        // dd($data);
        // json_encode($arrData);
        return $data;
    }
}
