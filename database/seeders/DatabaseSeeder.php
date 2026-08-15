<?php

namespace Database\Seeders;

use App\Actions\Fortify\CreateNewUser;
use App\Models\LogActivity;
use App\Models\MasterBank;
use App\Models\MasterPembayaran;
use App\Models\Transaction;
use App\Models\User;
use Database\Factories\TransactionFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    // use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('password'),
        // ]);

        // Transaction::factory(5)->create();

        $user = User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('Tes123456'),
            'email_verified_at' => now(),
        ]);

        Auth::login($user);
        /**
         * sqlite tidak auto generate uuid, nanti klo dah pake sql hapus aja  str->uuid
         * @id
         */
        $banks = [
            ['id' => str()->uuid(), 'name' => 'Mandiri', 'status' => 'active'],
            ['id' => str()->uuid(), 'name' => 'BSI', 'status' => 'active'],
            ['id' => str()->uuid(), 'name' => 'Seabank', 'status' => 'active'],
        ];


        $pembayaran = [
            ['id' => str()->uuid(), 'name' => 'PDAM'],
            ['id' => str()->uuid(), 'name' => 'PLN'],
            ['id' => str()->uuid(), 'name' => 'VA'],
            ['id' => str()->uuid(), 'name' => 'Telkom'],
        ];

        MasterBank::insert($banks);
        $createdBanks = MasterBank::all();

        MasterPembayaran::insert($pembayaran);


        // Buat transaksi untuk setiap bank
        // for ($i = 100; $i >= 0; $i--) {
        //     foreach ($createdBanks as $bank) {
        //         Transaction::factory()->count(3)->state(
        //             new Sequence(
        //                 ['jenis_transaksi' => 'pembayaran'],
        //                 ['jenis_transaksi' => 'setor_tunai'],
        //                 ['jenis_transaksi' => 'tarik_tunai'],
        //             )

        //         )->for($bank)->create([
        //             'created_at' => now()->subDays($i)
        //         ]);
        //     }
        // }

        $jenisTransaksi = ['pembayaran', 'setor_tunai', 'tarik_tunai'];

        for ($i = 30; $i >= 0; $i--) {
            $numberTransactions = random_int(20, 30);
            for ($j = 0; $j <= $numberTransactions; $j++) {
                $randBank = $createdBanks->random();
                $randPembayaran = array_rand($jenisTransaksi);
                Transaction::factory()->state(
                    new Sequence(
                        [
                            'jenis_transaksi' => $jenisTransaksi[$randPembayaran],
                            'nominal' => random_int(1, 10) * 100000
                        ],

                    )
                )->for($randBank)->create([
                    'created_at' => now()->subDays($i)
                ]);
            }
        }
    }
}
