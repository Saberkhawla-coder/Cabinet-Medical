<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\DoctorAvailability;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // User::factory()->create([
        //     'name' => 'Admin',
        //     'email' => 'admin@cabinet.com',
        //     'role' => 'admin',
        // ]);

        // Secrétaire
        // User::factory()->create([
        //     'name' => 'Secrétaire',
        //     'email' => 'secretariat@cabinet.com',
        //     'role' => 'secretaire',
        // ]);

        // Doctors
        Doctor::factory(5)->create();

        // Patients
        Patient::factory(15)->create();

        // Availabilities
        DoctorAvailability::factory(20)->create();

        // Appointments
        Appointment::factory(30)->create();
        }
}
