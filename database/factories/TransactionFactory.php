<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

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
            'id' => Uuid::uuid4()->toString(),
            'bank_id' => 'BNI',
            'jenis_transaksi' => 'pembayaran',
            'nama_rekening' => fake()->name(),
            'nominal' => 10000,
            'biaya_layanan' => 1000,
            'biaya_admin' => 0,
        ];
    }

    public function withCreatedAt($date): static
    {
        return $this->state(fn(array $attributes) => [
            'created_at' => $date,
            'updated_at' => $date, // opsional
        ]);
    }
}
