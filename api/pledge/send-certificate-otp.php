<?php
/**
 * Send OTP for existing pledge certificate access
 * Safety Research Foundation
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
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
    $validator->required($data, array('email'));
    $validator->string($data, array('email'));
    $validator->email($data, array('email'));

    if (isset($data['config_id']) && $data['config_id'] !== null && $data['config_id'] !== '') {
        $validator->number($data, array('config_id'));
    }

    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    $database = new Database();
    $db = $database->getConnection();
    $email = trim((string) $data['email']);

    $query = "SELECT ps.name, ps.mobile
              FROM pledge_submissions ps
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

    $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    $expiryTime = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    $createTableQuery = "CREATE TABLE IF NOT EXISTS otp_verifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_mobile (mobile)
    )";
    $db->exec($createTableQuery);

    $db->exec("DELETE FROM otp_verifications WHERE expires_at < NOW()");

    $deleteStmt = $db->prepare("DELETE FROM otp_verifications WHERE email = :email");
    $deleteStmt->bindValue(':email', $email);
    $deleteStmt->execute();

    $insertStmt = $db->prepare("INSERT INTO otp_verifications (email, mobile, otp, expires_at)
                                VALUES (:email, :mobile, :otp, :expires_at)");
    $insertStmt->bindValue(':email', $email);
    $insertStmt->bindValue(':mobile', $submission['mobile'] ?? '');
    $insertStmt->bindValue(':otp', $otp);
    $insertStmt->bindValue(':expires_at', $expiryTime);
    $insertStmt->execute();

    $mailService = new MailService();
    $emailResult = $mailService->sendOTP($email, $submission['name'] ?? 'Participant', $otp);

    if (empty($emailResult['success'])) {
        ResponseHelper::serverError($emailResult['error'] ?? 'Unable to send OTP email');
    }

    ResponseHelper::success(array(
        'otp_sent' => true,
        'email' => $email,
        'expires_at' => $expiryTime,
    ), 'OTP sent successfully');
} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
