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
}
