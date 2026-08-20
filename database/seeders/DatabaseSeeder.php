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
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class DatabaseSeeder extends Seeder
{
    // use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {



        Permission::create(['name' => 'add.transaksi']);
        Permission::create(['name' => 'edit.transaksi']);
        Permission::create(['name' => 'delete.transaksi']);
        Permission::create(['name' => 'add.master-data']);
        Permission::create(['name' => 'edit.master-data']);

        $ownerRole = Role::create(['name' => 'super-admin']);
        $adminRole = Role::create(['name' => 'admin']);

        $ownernAccount = User::create([
            'name' => 'Owner',
            'email' => 'owner@test.com',
            'password' => Hash::make('Test123456'),
            'email_verified_at' => now(),
        ]);

        $adminAccount = User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('Test123456'),
            'email_verified_at' => now(),
        ]);

        // $ownernAccount->givePermissionTo(Permission::all());
        $adminRole->givePermissionTo('add.transaksi');

        $ownernAccount->assignRole($ownerRole);
        $adminAccount->assignRole($adminRole);



        Auth::login($ownernAccount);
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


        $jenisTransaksi = ['pembayaran', 'setor_tunai', 'tarik_tunai'];
        $rows = [];
        for ($i = 100; $i >= 0; $i--) {
            $numberTransactions = random_int(20, 30);
            for ($j = 0; $j <= $numberTransactions; $j++) {
                $randBank = $createdBanks->random();
                $randPembayaran = array_rand($jenisTransaksi);
                $attributes = Transaction::factory()->state(
                    new Sequence([
                        'jenis_transaksi' => $jenisTransaksi[$randPembayaran],
                        'nominal' => random_int(1, 10) * 100000
                    ],)

                )->for($randBank)->make()->toArray();

                $attributes['created_at'] = now()->subDays($i);
                $attributes['updated_at'] = now()->subDays($i);

                $rows[] = $attributes;
            }
        }
        // dd($rows);
        Transaction::upsert($rows, ['id']);

        // insert ke log activity
        $activity = [];
        foreach ($rows as $index => $row) {
            $activity[] = [
                'id' => 'LOG' . date('ymd') . Str::random(8),
                'user_id' => 1,
                'user' => 'Admin User',
                'description' => 'create Transaksi ' . $row['jenis_transaksi'],
                'activity' => 'create ' . $row['jenis_transaksi'],
                'target_type' => 'Transaksi',
                'target_id' => $row['id'],
                'new_values' => json_encode($row),
                'updated_at' => $row['updated_at'],
                'created_at' => $row['created_at'],
            ];
        }
        LogActivity::insert($activity);
    }
}
