<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\patientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

 Route::get('/doctors', [DoctorController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/doctors', [DoctorController::class, 'store']);
    Route::put('/doctors/{id}', [DoctorController::class, 'update']);
    Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);
    Route::get('/doctor/my', [DoctorController::class, 'my']);
    Route::get('/doctor/patients', [DoctorController::class, 'myPatients']);
    Route::get('/doctor/appointments', [DoctorController::class, 'myAppointments']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/messages/{id}', [MessageController::class,'getMessages']);
    Route::post('/chat/send', [MessageController::class,'sendMessage']);
    Route::post('/chat/mark-read/{userId}', [MessageController::class, 'markAsRead']);
});

Route::post('/contact', [ContactController::class, 'send']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts/read-all', [ContactController::class, 'markAllRead']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/patients', [patientController::class, 'index']);
    Route::delete('/patients/{id}', [patientController::class, 'destroy']);
    Route::post('patients', [PatientController::class, 'store']);
    Route::put('patients/{id}', [PatientController::class, 'update']);
});



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/my', [AppointmentController::class, 'my']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
});


