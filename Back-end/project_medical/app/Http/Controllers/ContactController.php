<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;
use App\Models\Contact;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'name'=>'required|string',
            'email'=>'required|email',
            'phone' => 'nullable|string',
            'message' => 'required|string',
        ]);

       
        Contact::create($data);

        
        Mail::to('saberamine380@gmail.com')->send(new ContactMessage($data));

        return response()->json(['success' => true]);
    }
    public function index(){
        $contacts=Contact::all();
        $this->authorize('view',$contacts);
        return response()->json(['contacts'=>$contacts]);
    }
    public function markAllRead()
{
    Contact::where('read', false)->update(['read' => true]);
    return response()->json(['message' => 'All contacts marked as read']);
}
}
