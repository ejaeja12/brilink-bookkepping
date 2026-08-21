<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('master_banks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->enum('status', ['active', 'nonactive'])->default('active');
            $table->timestamps();

            $table->index('name');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('bank_id')->constrained('master_banks', 'id')->restrictOnDelete();
            $table->foreignId('user_id')->constrained('users', 'id')->restrictOnDelete();
            $table->string('nama_rekening')->nullable();
            $table->string('jenis_transaksi');
            $table->string('jenis_pembayaran')->nullable();
            $table->integer('nominal');
            $table->integer('biaya_layanan')->nullable();
            $table->integer('biaya_admin');
            $table->timestamps();

            $table->index('nominal');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('master_banks');
    }
};
