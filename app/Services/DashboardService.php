<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardService
{


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
}
