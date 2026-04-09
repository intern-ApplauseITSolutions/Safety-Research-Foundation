<?php
/**
 * Delete Contact Enquiry API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
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

    // Delete enquiry
    $query = "DELETE FROM contact_enquiries WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $enquiry_id);
    $stmt->execute();

    ResponseHelper::success(null, 'Contact enquiry deleted successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
