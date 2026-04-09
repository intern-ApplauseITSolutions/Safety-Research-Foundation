<?php
/**
 * Existing pledge certificate lookup API
 * Safety Research Foundation
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../services/CertificateGenerator.php';
require_once __DIR__ . '/../services/MailService.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    ResponseHelper::error('Invalid JSON data');
}

try {
    $validator = new ValidatorHelper();
    $validator->required($data, array('email', 'otp', 'action'));
    $validator->string($data, array('email', 'otp', 'action'));
    $validator->email($data, array('email'));

    if (isset($data['config_id']) && $data['config_id'] !== null && $data['config_id'] !== '') {
        $validator->number($data, array('config_id'));
    }

    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    $action = trim((string) $data['action']);
    $otp = preg_replace('/\D/', '', trim((string) $data['otp']));
    if (!in_array($action, array('send_email', 'download'), true)) {
        ResponseHelper::error('Invalid certificate action');
    }

    $email = trim((string) $data['email']);
    $database = new Database();
    $db = $database->getConnection();

    $otpStmt = $db->prepare("SELECT * FROM otp_verifications WHERE email = :email ORDER BY created_at DESC LIMIT 1");
    $otpStmt->bindValue(':email', $email);
    $otpStmt->execute();
    $otpData = $otpStmt->fetch(PDO::FETCH_ASSOC);

    if (!$otpData || strtotime($otpData['expires_at']) < time() || (string) $otpData['otp'] !== (string) $otp) {
        ResponseHelper::error('Invalid or expired OTP');
    }

    $deleteOtpStmt = $db->prepare("DELETE FROM otp_verifications WHERE id = :id");
    $deleteOtpStmt->bindValue(':id', (int) $otpData['id'], PDO::PARAM_INT);
    $deleteOtpStmt->execute();

    $query = "SELECT ps.*, pc.title as pledge_title
              FROM pledge_submissions ps
              LEFT JOIN pledge_configs pc ON ps.config_id = pc.id
              WHERE ps.email = :email
              AND ps.status IN ('verified', 'completed')";

    if (!empty($data['config_id'])) {
        $query .= " AND ps.config_id = :config_id";
    }

    $query .= " ORDER BY ps.created_at DESC LIMIT 1";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':email', $email);

    if (!empty($data['config_id'])) {
        $stmt->bindValue(':config_id', (int) $data['config_id'], PDO::PARAM_INT);
    }

    $stmt->execute();
    $submission = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$submission) {
        ResponseHelper::notFound('No completed pledge found for this registered email address');
    }

    $certificateFile = $submission['certificate_path'] ?? '';
    $certificatePath = '';

    if ($certificateFile !== '') {
        $certificatePath = realpath(__DIR__ . '/../../uploads/certificates/' . $certificateFile) ?: '';
    }

    if ($certificatePath === '' || !file_exists($certificatePath)) {
        $certificateGenerator = new CertificateGenerator($db);
        $certificateResult = $certificateGenerator->generateCertificate((int) $submission['id']);

        if (empty($certificateResult['success'])) {
            ResponseHelper::serverError('Certificate generation failed: ' . $certificateResult['error']);
        }

        $certificateFile = $certificateResult['filename'];
        $certificatePath = $certificateResult['filepath'];
    }

    $basePath = '';
    if (!empty($_SERVER['SCRIPT_NAME'])) {
        $basePath = dirname(dirname(dirname($_SERVER['SCRIPT_NAME'])));
        if ($basePath === '\\' || $basePath === '/') {
            $basePath = '';
        }
    }
    $basePath = str_replace('\\', '/', $basePath);

    $scheme = 'http';
    if (
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
        (!empty($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] === 'https') ||
        (!empty($_SERVER['SERVER_PORT']) && (string) $_SERVER['SERVER_PORT'] === '443')
    ) {
        $scheme = 'https';
    }

    $baseUrl = rtrim($basePath, '/');
    if (!empty($_SERVER['HTTP_HOST'])) {
        $baseUrl = $scheme . '://' . $_SERVER['HTTP_HOST'] . $baseUrl;
    }

    $certificateUrl = $baseUrl . '/uploads/certificates/' . basename($certificateFile);

    if ($action === 'send_email') {
        $mailService = new MailService();
        $emailResult = $mailService->sendPledgeCertificate(
            $submission['email'],
            trim((string) (($submission['title'] ?? '') . ' ' . ($submission['name'] ?? ''))),
            $certificatePath,
            $submission['pledge_title'] ?? 'Road Safety Pledge'
        );

        if (empty($emailResult['success'])) {
            ResponseHelper::serverError($emailResult['error'] ?? 'Unable to send certificate email');
        }

        $updateStmt = $db->prepare("UPDATE pledge_submissions SET certificate_sent = TRUE, status = 'completed' WHERE id = :id");
        $updateStmt->bindValue(':id', (int) $submission['id'], PDO::PARAM_INT);
        $updateStmt->execute();

        ResponseHelper::success(array(
            'email' => $submission['email'],
            'certificate_url' => $certificateUrl,
        ), 'Certificate sent to your registered email');
    }

    ResponseHelper::success(array(
        'email' => $submission['email'],
        'certificate_url' => $certificateUrl,
    ), 'Certificate is ready to download');
} catch (PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch (Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
