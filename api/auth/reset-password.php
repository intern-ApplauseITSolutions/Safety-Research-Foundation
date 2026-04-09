<?php
/**
 * Reset Password API
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
$required_fields = ['token', 'password'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

// Validate password
$password_error = Validator::validatePassword($sanitized_data['password']);
if ($password_error) {
    ResponseHelper::error($password_error);
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Find admin by reset token
    $query = "SELECT id, email, token_expiry FROM admins WHERE reset_token = :reset_token LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':reset_token', $sanitized_data['token']);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        ResponseHelper::error('Invalid or expired reset token');
    }

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if token has expired
    if (strtotime($admin['token_expiry']) < time()) {
        ResponseHelper::error('Reset token has expired');
    }

    // Hash new password
    $hashed_password = password_hash($sanitized_data['password'], PASSWORD_DEFAULT);

    // Update password and clear reset token
    $update_query = "UPDATE admins SET password = :password, reset_token = NULL, token_expiry = NULL WHERE id = :id";
    $update_stmt = $db->prepare($update_query);
    $update_stmt->bindParam(':password', $hashed_password);
    $update_stmt->bindParam(':id', $admin['id']);
    $update_stmt->execute();

    ResponseHelper::success(null, 'Password reset successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
