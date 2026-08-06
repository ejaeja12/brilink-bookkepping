<?php

namespace App\Services;

use App\Models\Transaction;

class DashboardService
{


    public function getAdminFee()
    {
        return [
            'biaya_admin' => Transaction::sum('biaya_admin'),
            'saldo_keluar' => Transaction::whereIn('jenis_transaksi', ['pembayaran', 'setor_tunai'])->sum('nominal'),
            'saldo_masuk' => Transaction::where('jenis_transaksi', 'tarik_tunai')->sum('nominal'),
        ];
    }
}
