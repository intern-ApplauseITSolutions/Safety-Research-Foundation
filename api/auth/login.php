<?php
/**
 * Admin Login API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../middleware/auth.php';

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
$required_fields = ['email', 'password'];
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
    $query = "SELECT id, email, password FROM admins WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $sanitized_data['email']);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        ResponseHelper::error('Invalid email or password');
    }

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password
    if (!password_verify($sanitized_data['password'], $admin['password'])) {
        ResponseHelper::error('Invalid email or password');
    }

    // Generate token
    $auth = new AuthMiddleware();
    $token = $auth->generateToken($admin['id']);

    // Start session and store admin info
    session_start();
    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_email'] = $admin['email'];
    $_SESSION['token'] = $token;
    $_SESSION['login_time'] = time();

    // Return success response
    ResponseHelper::success([
        'admin' => [
            'id' => $admin['id'],
            'email' => $admin['email']
        ],
        'token' => $token
    ], 'Login successful');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
