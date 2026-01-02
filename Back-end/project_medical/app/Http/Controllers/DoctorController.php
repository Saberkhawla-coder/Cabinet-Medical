<?php

namespace App\Http\Controllers;

use App\Events\DoctorCreated;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'speciality' => 'required|string|max:255',
            'img' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'start_time' => 'required',
            'end_time' => 'required',
            'slot_duration' => 'integer',
            'is_active' => 'boolean',
        ]);
        $tempPassword = Str::random(8);
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($tempPassword),
            'role'=>'doctor',
        ]);

       
        $imgPath = null;
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/doctors', $filename);
            $imgPath = 'doctors/' . $filename;
        }

      
        $doctor = Doctor::create([
            'user_id' => $user->id,
            'speciality' => $validatedData['speciality'],
            'img' => $imgPath,
            'start_time' => $validatedData['start_time'],
            'end_time' => $validatedData['end_time'],
            'slot_duration' => $validatedData['slot_duration'],
            'is_active' => $validatedData['is_active'] ?? true,
        ]);

        
        $doctor->load('user');
        event(new DoctorCreated($doctor, $tempPassword));
        
        return response()->json([
            'message' => 'Doctor créé avec succès',
            'doctor' => $doctor
        ], 201);
    }
    


    
    public function update(Request $request, $id)
{
    $doctor = Doctor::findOrFail($id);
    $this->authorize('update',$doctor);
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
        $this->authorize('delete', $doctor);
        $doctor->delete();

        return response()->json([
            'message' => 'Doctor supprimé avec succès'
        ]);
    }

    public function myPatients()
{
    $doctor = Doctor::where('user_id', Auth::id())->first();

    if (!$doctor) {
        return response()->json(['error' => 'No doctor found'], 404);
    }

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
