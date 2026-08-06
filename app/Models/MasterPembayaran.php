<?php

namespace App\Models;

use App\Traits\Loggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class MasterPembayaran extends Model
{
    use HasUuids;
    use Loggable;
    protected $fillable = [
        'name'
    ];

    protected function logAttribute(array $attribute)
    {
        return $attribute;
    }
}
