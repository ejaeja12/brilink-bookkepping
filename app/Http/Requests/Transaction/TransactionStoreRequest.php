<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class TransactionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'bank_id' => 'required',
            'jenis_transaksi' => 'required',
            'nominal' => 'required',
            'biaya_layanan' => '',
            'jenis_pembayaran' => '',
            'biaya_admin' => 'required',
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'required' => ':attribute harus diisi.',
        ];
    }
}
