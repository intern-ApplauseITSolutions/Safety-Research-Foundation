<?php
/**
 * Update Contact Enquiry Status API
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

// Authenticate admin
$auth = new AuthMiddleware();
$admin = $auth->authenticate();

// Get enquiry ID from URL
$enquiry_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($enquiry_id <= 0) {
    ResponseHelper::error('Invalid enquiry ID');
}

// Get JSON input
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

if (!$data) {
    ResponseHelper::error('Invalid JSON input');
}

// Validate required fields
$required_fields = ['status'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Validate status value
if (!in_array($data['status'], ['read', 'unread'])) {
    ResponseHelper::error('Invalid status. Must be "read" or "unread"');
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Check if enquiry exists
    $checkQuery = "SELECT id FROM contact_enquiries WHERE id = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $enquiry_id);
    $checkStmt->execute();

    if ($checkStmt->rowCount() === 0) {
        ResponseHelper::notFound('Contact enquiry not found');
    }

    // Update enquiry status
    $query = "UPDATE contact_enquiries SET status = :status, updated_at = NOW() WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $enquiry_id);
    $stmt->bindParam(':status', $sanitized_data['status']);
    $stmt->execute();

    // Get the updated enquiry
    $selectQuery = "SELECT * FROM contact_enquiries WHERE id = :id";
    $selectStmt = $db->prepare($selectQuery);
    $selectStmt->bindParam(':id', $enquiry_id);
    $selectStmt->execute();
    
    $enquiry = $selectStmt->fetch(PDO::FETCH_ASSOC);

    ResponseHelper::success($enquiry, 'Contact enquiry status updated successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
