<?php
/**
 * Verify OTP API
 * Safety Research Foundation - Pledge OTP System
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    ResponseHelper::error('Invalid JSON data');
}

$data['email'] = trim((string)($data['email'] ?? ''));
$data['otp'] = preg_replace('/\D/', '', trim((string)($data['otp'] ?? '')));

try {
    // Validate required fields
    $validator = new ValidatorHelper();
    $validator->required($data, ['email', 'otp']);
    $validator->email($data, ['email']);
    $validator->string($data, ['email', 'otp']);
    
    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Verify OTP
    $query = "SELECT * FROM otp_verifications 
              WHERE email = :email 
              ORDER BY created_at DESC LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        ResponseHelper::error('Invalid or expired OTP');
    }

    $otpData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (strtotime($otpData['expires_at']) < time()) {
        ResponseHelper::error('Invalid or expired OTP');
    }

    if ((string)$otpData['otp'] !== (string)$data['otp']) {
        ResponseHelper::error('Invalid or expired OTP');
    }

    // Mark OTP as used (optional - delete it)
    $deleteQuery = "DELETE FROM otp_verifications WHERE id = :id";
    $deleteStmt = $db->prepare($deleteQuery);
    $deleteStmt->bindParam(':id', $otpData['id']);
    $deleteStmt->execute();

    ResponseHelper::success([
        'verified' => true,
        'message' => 'OTP verified successfully',
        'email' => $data['email']
    ], 'OTP verified successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
