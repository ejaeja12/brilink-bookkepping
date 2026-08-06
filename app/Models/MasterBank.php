<?php

namespace App\Models;

use App\Traits\Loggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterBank extends Model
{
    use HasFactory;
    use HasUuids;
    use Loggable;

    protected $fillable = [
        'name',
        'status',
    ];

    public function transaction()
    {
        return $this->hasMany(Transaction::class);
    }

    protected function logAttribute(array $attribute)
    {
        return $attribute;
    }
}
