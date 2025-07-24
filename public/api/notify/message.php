<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__.'/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Alternative si vous envoyez en FormData
    $name = $_POST['user_name'] ?? '';
    $email = $_POST['user_email'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = 'Tous les champs sont obligatoires';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Email invalide';
        echo json_encode($response);
        exit;
    }

    // Configuration PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Paramètres SMTP
        $mail->isSMTP();
        $mail->SMTPDebug = 3;
        $mail->Debugoutput = function($str, $level) {
            file_put_contents('mail_debug.log', "$level: $str\n", FILE_APPEND);
        };
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'gentillenoir075@gmail.com';
        $mail->Password = 'igtv elqr rypn yzby';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Ou 'ssl'
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('gentillenoir075@gmail.com', 'Site Vitrine');
        $mail->addAddress('gentillenoir075@email.com', 'Gentil'); // Email de destination
        $mail->addReplyTo($email, $name);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message de ' . $name;
        $mail->Body = "
            <h1>Nouveau message depuis le formulaire de contact</h1>
            <p><strong>Nom:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
        ";
        $mail->AltBody = strip_tags($message);

        $mail->send();
        $response['success'] = true;
        $response['message'] = 'Message envoyé avec succès';
    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = "Le message n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
    }
} else {
    $response['message'] = 'Méthode non autorisée';
}

echo json_encode($response);
?>