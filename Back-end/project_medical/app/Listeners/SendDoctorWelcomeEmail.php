<?php

namespace App\Listeners;

use App\Events\DoctorCreated;
use App\Mail\DoctorWelcomeMail;
use Illuminate\Support\Facades\Mail;

class SendDoctorWelcomeEmail
{
    /**
     * Handle the event.
     */
    public function handle(DoctorCreated $event): void
    {
        // Récupérer le doctor et le mot de passe temporaire depuis l'event
        $doctor = $event->doctor;
        $tempPassword = $event->tempPassword;

        Mail::to($doctor->user->email)->send(
            new DoctorWelcomeMail($doctor, $tempPassword)
        );
    }
}
