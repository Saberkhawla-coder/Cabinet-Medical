<?php

namespace Database\Factories;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorAvailability>
 */
class DoctorAvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'doctor_id' => Doctor::inRandomOrder()->first()->id,
            'day_of_week' => fake()->randomElement(['mon','tue','wed','thu','fri']),
            'start_time' => '09:00',
            'end_time' => '17:00',
        ];
    }
}
