<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class patientController extends Controller
{
    //
    public function index(){
        $patients=Patient::with('user')->get();
        return response()->json(['patients'=>$patients]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email',
            'phone'      => 'required|string|max:20',
            'birth_date' => 'nullable|date',
            'genre'      => 'required|in:Homme,Femme,Enfants',
        ]);

       
        $user = \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('123456'),
        ]);

        $patient = Patient::create([
            'user_id'    => $user->id,
            'phone'      => $request->phone,
            'birth_date' => $request->birth_date,
            'genre'      => $request->genre,
        ]);

        return response()->json(['message' => 'Patient créé avec succès', 'patient' => $patient]);
    }
      public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);
        $request->validate([
            'name'       => 'sometimes|required|string|max:255',
            'email'      => 'sometimes|required|email|unique:users,email,' . $patient->user_id,
            'phone'      => 'sometimes|required|string|max:20',
            'birth_date' => 'nullable|date',
            'genre'      => 'sometimes|required|in:Homme,Femme,Enfants',
        ]);

        
        $patient->user->update([
            'name' => $request->name ?? $patient->user->name,
            'email' => $request->email ?? $patient->user->email,
        ]);

        $patient->update([
            'phone'      => $request->phone ?? $patient->phone,
            'birth_date' => $request->birth_date ?? $patient->birth_date,
            'genre'      => $request->genre ?? $patient->genre,
        ]);

        return response()->json(['message' => 'Patient mis à jour avec succès', 'patient' => $patient]);
    }



    public function destroy($id){
    $patient = Patient::findOrFail($id);
    $patient->delete();
    return response()->json([
        'message' => 'deleted',
        'id' => $id
    ]);
}

}
