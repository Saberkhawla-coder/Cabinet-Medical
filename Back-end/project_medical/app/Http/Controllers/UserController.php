<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index(){
        $users=User::all();
        return response()->json(['users'=>$users]);
    }
    public function store(Request $request){
        $validateInfo=$request->validate([
            'name'=>'required|string|max:250',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6'
        ]);
        $validateInfo['password']= bcrypt($validateInfo['password']);
        $user=User::create($validateInfo);
        return response()->json(['user'=>$user], 201);
    }
    public function update(Request $request, $id){
        $validateInfo=$request->validate([
            'name'=>'sometimes|string|max:250',
            'email'=>'sometimes|email|unique:users,email'. $id,
            'password'=>'sometimes|min:6'
        ]);
         $user=User::findOrFail($id);
         if($request->has('password')){
            $validateInfo['password']= bcrypt($validateInfo['password']);
         }
         
         $user->update($validateInfo);
         return response()->json(['message'=>'updated', 'user'=> $user]);
    }

    public function destroy($id){
        $user=User::findOrFail($id);
        $user->delete();
        return response()->json(['message'=>'deleted'],200);
    }
}
