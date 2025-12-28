<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    //
    public function index(){
    $appointments = Appointment::with('doctor.user', 'patient.user')->get();
    return response()->json($appointments);
}
    public function store(Request $request ){
        $validateData=$request->validate([
              "doctor_id"=>"required|exists:doctors,id",
              "patient_id"=>"required|exists:patients,id",
              "appointment_date"=>"required|date|after_or_equal:today",
              'appointment_time'=>'required',
              'status'=> 'nullable|in:pending,confirmed,cancelled',    
        ]
        );
        $exists = Appointment::where('doctor_id', $request->doctor_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('appointment_time', $request->appointment_time)
            ->exists();

        if($exists){
            return response()->json([
                "message" => "This doctor already has an appointment at this time"
            ], 409);
        }
        $appointments=Appointment::create($validateData);
        return response()->json(['message'=>"Appointment created successfully", 'data'=>$appointments],201);
    }
   public function destroy($id){
    $appointment = Appointment::find($id);
        if(!$appointment){
            return response()->json(['message'=>'Not found'], 404);
        }
        $appointment->delete();
        return response()->json(['message'=>'deleted']);
    }
   public function update(Request $request, $id){
    $validateData = $request->validate([
        "doctor_id" => "sometimes|exists:doctors,id",
        "patient_id" => "sometimes|exists:patients,id",
        "appointment_date" => "sometimes|date|after_or_equal:today",
        "appointment_time" => "sometimes",
        "status" => "nullable|in:pending,confirmed,cancelled",
    ]);

    $appointment = Appointment::find($id);

    if (!$appointment) {
        return response()->json(['message' => 'Rendez-vous non trouvé'], 404);
    }

    $appointment->update($validateData);

    return response()->json([
        'message' => 'Updated successfully',
        'data' => $appointment
    ], 200);
}

}