<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use App\Traits\Loggable;
use Ramsey\Uuid\Uuid;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    use HasUuids;

    use Loggable;

    /**
     * Generate a new UUID for the model.
     */


    protected $fillable = [
        'bank_id',
        'jenis_transaksi',
        'jenis_pembayaran',
        'nominal',
        'nama_rekening',
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
            return $value * 0.003;
        }
    }

    public function masterBank()
    {
        // Karena nama utk foreign key custom, bukan master_bank_id namun bank_id pada migrasi
        // maka perlu di inisiasi pada relasi sebeagai argumen ke dua di belongsTo
        return $this->belongsTo(MasterBank::class, 'bank_id');
    }

    protected function logAttribute(array $attribute)
    {
        if (array_key_exists('bank_id', $attribute) && $attribute['bank_id']) {
            $bank = $this->relationLoaded('masterBank') ? $this->masterBank : $this->masterBank()->first();
            $attribute['bank'] = $bank->name;
            unset($attribute['bank_id']);
        }

        return $attribute;
    }
}
