<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Contact;
use App\Models\Doctor;
use App\Models\Message;
use App\Policies\ContactPolicy;
use App\Policies\DoctorPolicy;
use App\Policies\MessagePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
        Doctor::class=>DoctorPolicy::class,
        Message::class=>MessagePolicy::class,
        Contact::class=>ContactPolicy::class,
        \App\Models\Appointment::class => \App\Policies\AppointmentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
