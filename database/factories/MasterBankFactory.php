<?php

namespace Database\Factories;

use App\Models\MasterBank;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MasterBank>
 */
class MasterBankFactory extends Factory
{



    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        return [
            'name' => 'Bank Name',
            'status' => 'active',
        ];
    }
}
