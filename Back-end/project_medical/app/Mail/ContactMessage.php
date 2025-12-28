<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        // Crée le contenu texte de l'email
        $content = "Nom: {$this->data['name']}\n"
                 . "Email: {$this->data['email']}\n"
                 . "Téléphone: " . ($this->data['phone'] ?? 'N/A') . "\n"
                 . "Message:\n{$this->data['message']}";

        // Envoie le mail texte brut sans Blade
        return $this->subject('Nouveau message de contact')
                    ->html("<pre>{$content}</pre>"); // HTML minimal pour conserver le formatage
    }
}
