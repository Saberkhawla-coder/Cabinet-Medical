<?php

namespace App\Mail;

use App\Models\Doctor;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DoctorWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public Doctor $doctor;
    public string $tempPassword;

    public function __construct(Doctor $doctor, string $tempPassword)
    {
        $this->doctor = $doctor;
        $this->tempPassword = $tempPassword;
    }

    public function build()
    {
        return $this
            ->subject('Welcome to Our Clinic')
            ->view('emails.doctor-welcome');
    }
}
