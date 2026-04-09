<?php
/**
 * Submit Contact Enquiry API
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
$required_fields = ['name', 'email', 'subject', 'message'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Validate email format
if (!Validator::validateEmail($data['email'])) {
    ResponseHelper::error('Invalid email format');
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Insert contact enquiry
    $query = "INSERT INTO contact_enquiries (name, email, phone, subject, message, status, created_at, updated_at) 
              VALUES (:name, :email, :phone, :subject, :message, 'unread', NOW(), NOW())";
    
    $stmt = $db->prepare($query);
    
    // Bind parameters
    $stmt->bindParam(':name', $sanitized_data['name']);
    $stmt->bindParam(':email', $sanitized_data['email']);
    $stmt->bindParam(':subject', $sanitized_data['subject']);
    $stmt->bindParam(':message', $sanitized_data['message']);
    
    $phone = isset($sanitized_data['phone']) ? $sanitized_data['phone'] : null;
    $stmt->bindParam(':phone', $phone);
    
    $stmt->execute();

    $enquiry_id = $db->lastInsertId();

    // Get the created enquiry
    $selectQuery = "SELECT * FROM contact_enquiries WHERE id = :id";
    $selectStmt = $db->prepare($selectQuery);
    $selectStmt->bindParam(':id', $enquiry_id);
    $selectStmt->execute();
    
    $enquiry = $selectStmt->fetch(PDO::FETCH_ASSOC);

    ResponseHelper::success($enquiry, 'Contact enquiry submitted successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
