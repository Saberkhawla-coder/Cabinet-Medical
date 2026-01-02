<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MessagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    // public function viewAny(User $user): bool
    // {
    //     //
        
    // }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Message $message): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, int $receiverId): bool
    {
        //
         $isDoctorPatientRelation =Appointment::where(function($q) use ($user, $receiverId){
            $q->where('doctor_id', $receiverId)
              ->where('patient_id', $user->id);
        })->exists();

        // L'utilisateur peut envoyer si c'est un patient vers son doctor ou un doctor vers son patient
        return $isDoctorPatientRelation;
    }

    /**
     * Determine whether the user can update the model.
     */
    // public function update(User $user, Message $message): bool
    // {
    //     //
    // }

    // /**
    //  * Determine whether the user can delete the model.
    //  */
    // public function delete(User $user, Message $message): bool
    // {
    //     //
    // }

    // /**
    //  * Determine whether the user can restore the model.
    //  */
    // public function restore(User $user, Message $message): bool
    // {
    //     //
    // }

    // /**
    //  * Determine whether the user can permanently delete the model.
    //  */
    // public function forceDelete(User $user, Message $message): bool
    // {
    //     //
    // }
}
