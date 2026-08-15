<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionService
{
    public function index(Request $request)
    {

        $qdays = 0;

        if ($request->filled('days')) {
            $days = $request->days;
            $qdays = match ($days) {
                '3d' => 3,
                'w' => 7,
                'm' => 30,
                default => 0
            };
        }

        $transaksi = Transaction::when(
            $request->missing('days'),
            fn($query) => $query->whereDate('created_at', '=', today())->orderBy('created_at', 'desc'), // tidak ada days
            fn($query) => $query->whereDate('created_at', '>=', now()->subDays((int) $qdays))->orderBy('created_at', 'asc') // ada days
        )->when(
            $request->filled('search'),
            fn($query) => $query
                ->where(
                    fn($q) => $q   // grouping query, karena ada orWhereHas
                        ->where('nominal', 'like', '%' . $request->search . '%')
                        ->orWhereHas('masterBank', fn($q2) => $q2->where('name', 'like', '%' . $request->search . '%'))
                )
        )->paginate(20)->withQueryString();




        return $transaksi;
    }
}
