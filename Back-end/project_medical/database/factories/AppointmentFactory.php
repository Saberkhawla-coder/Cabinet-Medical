<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()->id,
            'patient_id' => Patient::inRandomOrder()->first()->id,
            'appointment_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'appointment_time' => fake()->randomElement([
                '09:00','09:15','09:30','10:00','10:30','11:00'
            ]),
            'status' => fake()->randomElement(['pending','confirmed']),
    ];
    }
}
