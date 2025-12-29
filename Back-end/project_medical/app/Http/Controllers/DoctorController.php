<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Doctor::with('user')->get();
        return response()->json(['doctors' => $doctors]);
    }
    public function my() {
    $userId = Auth::id();
    $doctor = Doctor::with('user')->where('user_id', $userId)->first();
    if (!$doctor) {
        return response()->json([
            'error' => 'No doctor found',
            'user_id' => $userId
        ], 404);
    }
    return response()->json($doctor);
}
    public function store(Request $request)
    {
        
        $validateForm = $request->validate([
            'user_id' => 'required|exists:users,id',
            'speciality' => 'required|string|max:255',
            'img' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'start_time' => 'required',
            'end_time' => 'required',
            'slot_duration' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('img')) {
        $file = $request->file('img');
        $filename = time().'_'.$file->getClientOriginalName();
        $file->storeAs('public/doctors', $filename);
        $validateForm['img'] = 'doctors/'.$filename;
    }
        $doctor = Doctor::create($validateForm);

        return response()->json([
            'message' => 'Doctor créé avec succès',
            'doctor' => $doctor
        ], 201);
    }

    
    public function update(Request $request, $id)
{
    $doctor = Doctor::findOrFail($id);

    $validateForm = $request->validate([
        'speciality' => 'sometimes|string|max:255',
        'img' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        'start_time' => 'sometimes',
        'end_time' => 'sometimes',
        'slot_duration' => 'sometimes|integer',
        'is_active' => 'sometimes|boolean',
    ]);

    
    if ($request->hasFile('img')) {
        $file = $request->file('img');
        $filename = time().'_'.$file->getClientOriginalName();
        $file->storeAs('public/doctors', $filename);
        $validateForm['img'] = 'doctors/'.$filename;
    }

    $doctor->update($validateForm);

    return response()->json([
        'message' => 'Doctor mis à jour avec succès',
        'doctor' => $doctor
    ]);
}



    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();

        return response()->json([
            'message' => 'Doctor supprimé avec succès'
        ]);
    }
    public function myPatients() {
    $doctor = Doctor::where('user_id', Auth::id())->first();

    if(!$doctor) return response()->json(['error' => 'No doctor found'], 404);

    $patients = $doctor->appointments()
        ->with('patient.user')
        ->get()
        ->pluck('patient')
        ->unique('id')
        ->values();

    return response()->json($patients);
}

public function myAppointments() {
    $doctor = Doctor::where('user_id', Auth::id())->first();

    if(!$doctor) return response()->json(['error'=>'No doctor found'],404);

    return response()->json(
        $doctor->appointments()->with('patient.user')->get()
    );
}
}
