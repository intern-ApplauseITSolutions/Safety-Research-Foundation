<?php
/**
 * Send OTP API
 * Safety Research Foundation - Pledge OTP System
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors, but log them

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../services/MailService.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    ResponseHelper::error('Invalid JSON data');
}

try {
    // Validate required fields
    $validator = new ValidatorHelper();
    $validator->required($data, ['email', 'mobile', 'name']);
    $validator->email($data, ['email']);
    $validator->string($data, ['email', 'mobile', 'name']);
    
    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Generate 6-digit OTP
    $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    $expiryTime = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    // Store OTP in database
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

    // Clean up expired OTPs
    $cleanupQuery = "DELETE FROM otp_verifications WHERE expires_at < NOW()";
    $db->exec($cleanupQuery);

    // Replace any existing OTP for this email before inserting a new one.
    $deleteExistingQuery = "DELETE FROM otp_verifications WHERE email = :email";
    $deleteStmt = $db->prepare($deleteExistingQuery);
    $deleteStmt->bindParam(':email', $data['email']);
    $deleteStmt->execute();

    $insertQuery = "INSERT INTO otp_verifications (email, mobile, otp, expires_at) 
                    VALUES (:email, :mobile, :otp, :expires_at)";

    $stmt = $db->prepare($insertQuery);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':mobile', $data['mobile']);
    $stmt->bindParam(':otp', $otp);
    $stmt->bindParam(':expires_at', $expiryTime);
    $stmt->execute();

    // Send OTP via email
    try {
        $mailService = new MailService();
        $emailResult = $mailService->sendOTP($data['email'], $data['name'], $otp);
        
        if (!$emailResult['success']) {
            // If email fails, still return OTP for testing
            ResponseHelper::success([
                'otp_sent' => false,
                'message' => 'Email sending failed, but OTP generated for testing',
                'otp' => $otp, // Remove this in production
                'expires_at' => $expiryTime,
                'error' => $emailResult['error'] ?? $emailResult['message'] ?? 'Email sending failed'
            ], 'OTP generated (email failed)');
        }
    } catch (Exception $e) {
        // If MailService fails, use fallback
        error_log('MailService error: ' . $e->getMessage());
        ResponseHelper::success([
            'otp_sent' => false,
            'message' => 'Email service unavailable, but OTP generated for testing',
            'otp' => $otp, // Remove this in production
            'expires_at' => $expiryTime,
            'error' => 'Mail service error'
        ], 'OTP generated (email service unavailable)');
    }

    ResponseHelper::success([
        'otp_sent' => true,
        'message' => 'OTP sent successfully to your email',
        'expires_at' => $expiryTime,
        'email' => $data['email']
    ], 'OTP sent successfully');

} catch(PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    error_log('Server error: ' . $e->getMessage());
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
