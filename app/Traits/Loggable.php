<?php

namespace App\Traits;

trait Loggable
{
    public static function bootLoggable()
    {
        static::created(function ($test) {
            // dd([
            //     'par' => 'parameter pertama',
            //     'test' => $test,
            //     'class' => get_class($test),
            //     'id' => $test->id
            // ]);
        });

        static::updated(function ($test) {
            dd([
                'par' => 'parameter pertama',
                'test' => $test,
                'old' => $test->getOriginal(),
                'new' => $test->getChanges(),
                'class' => get_class($test),
                'id' => $test->id
            ]);
        });
    }
}
