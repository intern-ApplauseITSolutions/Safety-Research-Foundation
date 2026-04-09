<?php
/**
 * Forgot Password API
 * Safety Research Foundation Admin Dashboard
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
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

if (!$data) {
    ResponseHelper::error('Invalid JSON input');
}

// Validate required fields
$required_fields = ['email'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

// Validate email format
if (!Validator::validateEmail($sanitized_data['email'])) {
    ResponseHelper::error('Invalid email format');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Query admin by email
    $query = "SELECT id, email FROM admins WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $sanitized_data['email']);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        // Don't reveal if email exists or not for security
        ResponseHelper::success(null, 'If the email exists, a reset link has been sent');
    }

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Generate reset token
    $reset_token = bin2hex(random_bytes(32));
    $token_expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

    // Update admin record with reset token
    $update_query = "UPDATE admins SET reset_token = :reset_token, token_expiry = :token_expiry WHERE id = :id";
    $update_stmt = $db->prepare($update_query);
    $update_stmt->bindParam(':reset_token', $reset_token);
    $update_stmt->bindParam(':token_expiry', $token_expiry);
    $update_stmt->bindParam(':id', $admin['id']);
    $update_stmt->execute();

    // In a real application, you would send an email here
    // For now, we'll just return the token for testing
    $reset_link = "http://localhost:5173/admin/reset-password?token=" . $reset_token;

    ResponseHelper::success([
        'message' => 'Password reset link has been sent to your email',
        'reset_link' => $reset_link // Remove this in production
    ], 'Reset token generated successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
