<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bank_id' => 'BNI',
            'jenis_transaksi' => 'pembayaran',
            'nominal' => 10000,
            'biaya_layanan' => 1000,
            'biaya_admin' => 0,
        ];
    }
}
