<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    
     public function getMessages($doctorId)
    {
        $userId = auth()->id();
        $messages = Message::where(function($q) use($userId, $doctorId){
            $q->where('sender_id', $userId)->where('receiver_id', $doctorId);
        })->orWhere(function($q) use($userId, $doctorId){
            $q->where('sender_id', $doctorId)->where('receiver_id', $userId);
        })->orderBy('created_at')->get();

        return response()->json($messages);
    }

    
    public function sendMessage(Request $request)
{
    $request->validate([
        'receiver_id' => 'required|exists:users,id',
        'type' => 'required|in:text,image,file',
        'message' => 'nullable|string',
        'file' => 'nullable|file',
    ]);

    $messageData = [
        'sender_id' => auth()->id(),
        'receiver_id' => $request->receiver_id,
        'type' => $request->type,
    ];

    if ($request->type === 'text') {
        $messageData['message'] = $request->message;
    } else if ($request->hasFile('file')) {
        $path = $request->file('file')->store('messages', 'public');
        $messageData['message'] = '/storage/' . $path;
    }

    $msg = Message::create($messageData);

    // ⚠️ Retourner uniquement le message créé
    return response()->json($msg);
}


}
