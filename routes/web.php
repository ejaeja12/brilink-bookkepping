<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Logs\LogActivityController;
use App\Http\Controllers\MasterData\MasterBankController;
use App\Http\Controllers\MasterData\MasterPembayaranController;
use App\Http\Controllers\Reports\TransactionReportController;
use App\Http\Controllers\TransactionController;
use App\Models\LogActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// cron job buat vercel
Route::get('/api/cron', function (Request $request) {

    // if ($request->header('Authorization') !== 'Bearer ' . env('CRON_SECRET')) {
    //     abort(401);
    // }
    Artisan::call('migrate:refresh', ['--force' => true]);
    Artisan::call('db:seed', ['--force' => true]);
    return response()->json(['status' => 'success']);
});



Route::group(['middleware' => ['auth']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::get('/transaction/search', [TransactionController::class, 'search'])->name('transaction.search');
    Route::get('/transaction', [TransactionController::class, 'show'])->name('transaction.index');
    Route::post('/transaction', [TransactionController::class, 'store'])->name('transaction.store');
    Route::put('/transaction/{id}', [TransactionController::class, 'update', 'id'])->name('transaction.update');




    Route::resource('master-banks', MasterBankController::class);
    Route::resource('master-pembayarans', MasterPembayaranController::class);

    // Report
    Route::prefix('/reports')->name('report')->group(function () {
        Route::get('transaction/create-report', [TransactionReportController::class, 'createReport'])->name('transaction.create-report');
        Route::resource('transaction', TransactionReportController::class);
    });




    // log Activity
    Route::get('/log-activity', [LogActivityController::class, 'index'])->name('log-activity.index');
});


require __DIR__ . '/settings.php';
