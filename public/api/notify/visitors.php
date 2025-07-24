<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__.'/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = ['success' => false];
$data = json_decode(file_get_contents('php://input'), true);

// Fichiers de stockage
$logFile = __DIR__.'/visitors.log';
$lastEmailFile = __DIR__.'/last_email.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data)) {
    try {
        // 1. Préparation des données
        $visitorInfo = [
            'Date/Heure' => $data['time'] ?? date('Y-m-d H:i:s'),
            'IP' => $data['ip'] ?? $_SERVER['REMOTE_ADDR'],
            'Pays' => $data['country'] ?? 'Inconnu',
            'Ville' => $data['city'] ?? 'Inconnu',
            'Région' => $data['region'] ?? 'Inconnu',
            'Coordonnées GPS' => $data['loc'] ?? null,
            'Navigateur' => $data['ue'] ?? 'Inconnu',
            'Écran' => $data['device']['screen'] ?? 'Inconnu',
            'Langue' => $data['device']['language'] ?? 'Inconnu',
            'Page' => $data['page'] ?? 'Inconnu'
        ];

        // 2. Sauvegarde systématique dans le fichier log
        file_put_contents($logFile, json_encode($visitorInfo).PHP_EOL, FILE_APPEND);

        // 3. Envoi d'email seulement si:
        // - Visite sur une page importante (contact, pricing, etc.)
        // - OU première visite de la journée
        // - OU visite internationale
        $importantPages = ['contact', 'pricing', 'order'];
        $isImportantVisit = in_array($visitorInfo['Page'], $importantPages);
        $isInternational = ($visitorInfo['Pays'] !== 'France');
        $lastEmailTime = @file_get_contents($lastEmailFile);
        $isFirstOfDay = (!$lastEmailTime || date('Y-m-d', $lastEmailTime) !== date('Y-m-d'));

        if ($isImportantVisit || $isInternational || $isFirstOfDay) {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPSecure = 'tls';
            $mail->SMTPAuth = true;
            $mail->Username = 'gentillenoir075@gmail.com';
            $mail->Password = 'igtv elqr rypn yzby';
            $mail->CharSet = 'UTF-8';

            $mail->setFrom('notifications@votresite.com', 'Site Vitrine');
            $mail->addAddress('gentillenoir075@gmail.com');
            
            if ($isImportantVisit) {
                $mail->Subject = 'Visite importante sur '.$visitorInfo['Page'];
            } elseif ($isInternational) {
                $mail->Subject = 'Visiteur international ('.$visitorInfo['Pays'].')';
            } else {
                $mail->Subject = 'Première visite du '.date('d/m/Y');
            }

            // Formatage HTML du message
            $htmlContent = "<h2>Détails de la visite</h2><ul>";
            foreach ($visitorInfo as $key => $value) {
                $htmlContent .= "<li><strong>$key:</strong> " . htmlspecialchars($value) . "</li>";
            }
            
            // Ajout des statistiques récentes
            $allVisits = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            $totalVisits = count($allVisits);
            $todayVisits = 0;
            foreach ($allVisits as $visit) {
                $visitData = json_decode($visit, true);
                if (strpos($visitData['Date/Heure'], date('Y-m-d')) !== false) {
                    $todayVisits++;
                }
            }
            
            $htmlContent .= "</ul><h3>Statistiques</h3>";
            $htmlContent .= "<p>Visites aujourd'hui: $todayVisits</p>";
            $htmlContent .= "<p>Total visites: $totalVisits</p>";

            $mail->isHTML(true);
            $mail->Body = $htmlContent;
            $mail->AltBody = strip_tags($htmlContent);

            if ($mail->send()) {
                file_put_contents($lastEmailFile, time());
            }
        }

        $response['success'] = true;
    } catch (Exception $e) {
        $response['error'] = "Erreur: ".$e->getMessage();
        error_log("Erreur PHPMailer: ".$e->getMessage());
    }
} else {
    $response['error'] = 'Données manquantes';
}

echo json_encode($response);