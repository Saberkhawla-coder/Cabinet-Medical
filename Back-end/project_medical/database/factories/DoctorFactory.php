<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
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
            'user_id' => User::factory()->create([
            'role' => 'doctor'
            ])->id,
            'speciality' => fake()->randomElement([
                'Cardiologie',
                'Dentisterie',
                'Pédiatrie',
                'Ophtalmologie',
                'Médecine Générale'
            ]),
            'start_time' => '09:00',
            'end_time' => '17:00',
            'slot_duration' => 15,
            'is_active' => true,
        ];
       
    }
}
