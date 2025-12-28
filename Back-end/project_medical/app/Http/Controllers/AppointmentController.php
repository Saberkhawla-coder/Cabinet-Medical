<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
  
    public function index()
    {
        $appointments = Appointment::with('doctor.user', 'patient.user')->get();
        return response()->json($appointments);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            "doctor_id" => "required|exists:doctors,id",
            "appointment_date" => "required|date|after_or_equal:today",
            "appointment_time" => "required",
            "status" => "nullable|in:pending,confirmed,cancelled",
        ]);

        $user = Auth::user();

        if ($user->role !== 'patient') {
            return response()->json(["message" => "You are not a patient"], 403);
        }

        $patient = $user->patient;
        if (!$patient) {
            $patient = Patient::create([
                'user_id' => $user->id,
                'phone' => '0000000000',
                'date_of_birth' => now()->format('Y-m-d')
            ]);
        }

        $exists = Appointment::where('doctor_id', $request->doctor_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('appointment_time', $request->appointment_time)
            ->exists();

        if ($exists) {
            return response()->json([
                "message" => "This doctor already has an appointment at this time"
            ], 409);
        }

        $appointment = Appointment::create([
            "doctor_id" => $request->doctor_id,
            "patient_id" => $patient->id,
            "appointment_date" => $request->appointment_date,
            "appointment_time" => $request->appointment_time,
            "status" => $request->status ?? "pending"
        ]);

        return response()->json([
            'message' => "Appointment created successfully",
            'data' => $appointment
        ], 201);
    }

    // Get appointments of the logged-in patient
    public function my()
    {
        $user = Auth::user();
        $patient = $user->patient;

        if (!$patient) {
            return response()->json([
                'message' => 'You are not registered as a patient'
            ], 403);
        }

        $appointments = Appointment::with(['doctor.user', 'patient.user'])
            ->where('patient_id', $patient->id)
            ->orderBy('appointment_date', 'asc')
            ->get();

        return response()->json($appointments);
    }

    // Update appointment (patients can only cancel their own appointments)
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $user = Auth::user();

        // Patients can only cancel their own appointments
        if ($user->role === 'patient') {
            $patient = $user->patient;
            if ($appointment->patient_id !== $patient->id) {
                return response()->json(['message' => 'Not authorized'], 403);
            }

            $request->validate([
                'status' => 'required|in:cancelled',
            ]);

            $appointment->update([
                'status' => 'cancelled'
            ]);

            return response()->json([
                'message' => 'Appointment cancelled successfully',
                'data' => $appointment
            ]);
        }

        // Admin or doctor can update normally
        $validateData = $request->validate([
            "doctor_id" => "sometimes|exists:doctors,id",
            "patient_id" => "sometimes|exists:patients,id",
            "appointment_date" => "sometimes|date|after_or_equal:today",
            "appointment_time" => "sometimes",
            "status" => "nullable|in:pending,confirmed,cancelled",
        ]);

        $appointment->update($validateData);

        return response()->json([
            'message' => 'Updated successfully',
            'data' => $appointment
        ], 200);
    }

    // Delete appointment (patients cannot delete, only admin or doctor)
    public function destroy($id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $user = Auth::user();

        // Only admin or doctor can delete
        if ($user->role === 'patient') {
            return response()->json(['message' => 'Not authorized'], 403);
        }

        $appointment->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
