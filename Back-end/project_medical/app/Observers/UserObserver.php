<?php

namespace App\Observers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
        if($user->role==='doctor'){
            Doctor::create([
                "user_id"=>$user->id,
                'speciality' => 'General',
                'start_time' => '08:00',
                'end_time' => '17:00',
                'slot_duration' => 30,
            ]);
        }
        if($user->role==='patient'){
            Patient::create([
                "user_id"=>$user->id,
                'phone'=>'0606065544',
            ]);
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
