<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use Ramsey\Uuid\Uuid;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    use HasUuids;

    /**
     * Generate a new UUID for the model.
     */


    protected $fillable = [
        'bank_id',
        'jenis_transaksi',
        'jenis_pembayaran',
        'nominal',
        'biaya_layanan',
        'biaya_admin',
    ];

    public function setBiayaAdminAttribute($value)
    {
        $getNominal = $this->attributes['nominal'];
        $this->attributes['biaya_admin'] = $this->formatBiayaAdmin($getNominal);
    }

    protected function formatBiayaAdmin(int $value): int
    {
        if ($value == 0) {
            return 0;
        } else if ($value <= 1000000) {
            return 3000;
        } else if ($value <= 2500000) {
            return 5000;
        } else if ($value <= 4500000) {
            return 10000;
        } else if ($value <= 7000000) {
            return 15000;
        } else if ($value <= 10000000) {
            return 20000;
        } else {
            return $value * 0.05;
        }
    }

    public function masterBank()
    {
        // Karena nama utk foreign key custom, bukan master_bank_id namun bank_id pada migrasi
        // maka perlu di inisiasi pada relasi sebeagai argumen ke dua di belongsTo
        return $this->belongsTo(MasterBank::class, 'bank_id');
    }
}
