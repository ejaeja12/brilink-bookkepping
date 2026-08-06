<?php

namespace App\Traits;

use App\Models\LogActivity;
use Illuminate\Support\Arr;

trait Loggable
{


    protected function recordActivity(string $action, ?array $old, ?array $new)
    {

        $target_name = '';
        $jenis_transaksi = '';

        if (auth()->guest()) {
            return;
        }

        if ($old) {
            $old = $this->logAttribute($old);
        }
        if ($new) {
            $new = $this->logAttribute($new);
        }
        if (isset($this['jenis_transaksi'])) {
            $jenis_transaksi = $this->getAttribute('jenis_transaksi');
        }



        switch (class_basename($this)) {
            case 'Transaction':
                $target_name = 'Transaksi';
                break;

            case 'MasterPembayaran':
                $target_name = 'Data Jenis Pembayaran';
                break;
            case 'MasterBank':
                $target_name = 'Data Jenis Bank';
                break;
            default:
                $target_name =  'unknown';
                break;
        }

        LogActivity::create([
            'user_id' => auth()->user()->id,
            'user' => auth()->user()->name,
            'activity' => $action . ' ' . $target_name,
            'description' => $action . ' ' . $target_name . ' ' . $jenis_transaksi,
            'target_id' => $this->getAttribute('id'),
            'target_type' => $target_name,
            'old_values' => json_encode($old),
            'new_values' => json_encode($new)
        ]);
    }

    public static function bootLoggable()
    {

        static::created(function ($model) {
            $model->recordActivity('create', null, $model->getAttributes());
        });

        static::updated(function ($model) {
            $model->recordActivity('update', $model->getOriginal(), $model->getChanges());
        });
    }
}
