<?php

use App\Http\Controllers\MasterData\MasterBankController;
use App\Http\Controllers\MasterData\MasterPembayaranController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('tes', 'tess/TesPAge')->name('tes');

// Route::inertia('dashboard', 'dashboard')->name('dashboard');
Route::get('/dashboard', [TransactionController::class, 'show'])->name('dashboard');
Route::post('/transaction', [TransactionController::class, 'store'])->name('transaction.store');
Route::put('/transaction/{id}', [TransactionController::class, 'update', 'id'])->name('transaction.update');


//
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

Route::resource('master-banks', MasterBankController::class);
Route::resource('master-pembayarans', MasterPembayaranController::class);


require __DIR__ . '/settings.php';
