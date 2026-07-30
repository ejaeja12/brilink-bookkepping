<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterBank extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'status',
    ];

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }
}
