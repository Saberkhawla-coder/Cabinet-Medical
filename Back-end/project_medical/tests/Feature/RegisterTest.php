<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
   
       use RefreshDatabase;

    public function test_register_user_success()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Saber',
            'email' => 'saber@example.com',
            'password' => '123456',
            'password_confirmation' => '123456',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'user' => ['id', 'name', 'email', 'created_at', 'updated_at']
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'saber@example.com',
        ]);
    }

    // public function test_register_user_validation_error()
    // {
    //     $response = $this->postJson('/api/register', [
    //         'name' => 'Zineb',
    //         'email' => 'zineb@gmail.com',
    //         'password' => '1234567',
    //         'password_confirmation' => '1234567',
    //     ]);

    //     $response->assertStatus(422)
    //              ->assertJsonValidationErrors(['name', 'email', 'password']);
    // }
    
}
