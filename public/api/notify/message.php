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
    // Récupération des données FormData
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
    $mail->SMTPDebug = 2; // Niveau de debug: 0 = off, 2 = détails
    $mail->Debugoutput = 'error_log'; // Envoie les logs dans les erreurs PHP

    try {
        // Paramètres SMTP Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls'; // TLS obligatoire pour Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'gentillenoir075@gmail.com';
        $mail->Password = 'igtv elqr rypn yzby'; // Mot de passe d'application
        
        // Encodage
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // Expéditeur et destinataire
        $mail->setFrom('contact@gentil.com', 'Site Vitrine'); // Utilisez un domaine que vous contrôlez
        $mail->addAddress('gentillenoir075@gmail.com', 'Gentil'); // Adresse Outlook comme destinataire
        $mail->addReplyTo($email, $name); // Permet de répondre directement à l'expéditeur

        // Contenu du message
        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message de ' . $name;
        $mail->Body = "
            <h1>Nouveau message depuis le formulaire de contact || Votre Site Vitrine</h1>
            <p><strong>Nom:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
        ";
        $mail->AltBody = strip_tags($message); // Version texte brut

        if ($mail->send()) {
            $response['success'] = true;
            $response['message'] = 'Message envoyé avec succès';
            error_log("Email envoyé à " . date('Y-m-d H:i:s'));
        } else {
            throw new Exception("Erreur lors de l'envoi");
        }
    } catch (Exception $e) {
        $error = "Erreur PHPMailer: " . $e->getMessage() . " | " . $mail->ErrorInfo;
        error_log($error);
        $response['message'] = "Erreur d'envoi. Veuillez réessayer plus tard.";
    }
} else {
    $response['message'] = 'Méthode non autorisée';
}

echo json_encode($response);
?>