<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class LogActivity extends Model
{
    protected $table = 'log_activities';

    protected $fillable = [
        'id',
        'user_id',
        'user',
        'activity',
        'description',
        'target_id',
        'target_type',
        'new_values',
        'old_values'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = 'LOG' . date('ymd') . Str::random(8);
        });
    }
}
