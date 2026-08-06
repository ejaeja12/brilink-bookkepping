<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class LogActivity extends Model
{
    protected $table = 'log_activities';

    protected $fillable = [
        'user_id',
        'user',
        'activity',
        'description',
        'target_id',
        'target_type',
        'new_values',
        'old_values'
    ];
}
