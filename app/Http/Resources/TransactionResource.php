<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array


    {
        $bankName = $this->masterBank()->first();

        return [
            'id' => $this->id,
            'transaksi' => $this->formatTransaction($this->jenis_transaksi, $bankName->name, $this->jenis_pembayaran, $this->nama_rekening),
            'bank' => $bankName,
            'jenis_transaksi' => $this->jenis_transaksi,
            'nama_rekening' => $this->nama_rekening,
            'jenis_pembayaran' => $this->jenis_pembayaran,
            'nominal' => $this->nominal,
            'biaya_layanan' => $this->biaya_layanan,
            'biaya_admin' => $this->biaya_admin,
            'created_at' => $this->created_at
        ];
    }

    protected function formatTransaction(string $transaction, string $bank, string | null $paymentType, string | null $rekName): string
    {
        $rekName = $rekName ?? ' - ';
        $result =  match ($transaction) {
            'setor_tunai' => "Setor Tunai ke {$rekName}, Bank sumber : {$bank}",
            'tarik_tunai' => "Tarik Tunai dari {$rekName}, Bank penampung : {$bank}",
            'pembayaran' => "Pembayaran {$paymentType} atas nama {$rekName}, via : {$bank}",
            default => 'Belum diketahui'
        };
        return $result;
    }
}
