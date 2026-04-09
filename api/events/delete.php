<?php
/**
 * Delete Event API
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

// Get event ID from URL
$event_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($event_id <= 0) {
    ResponseHelper::error('Invalid event ID');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Check if event exists
    $checkQuery = "SELECT id FROM events WHERE id = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $event_id);
    $checkStmt->execute();

    if ($checkStmt->rowCount() === 0) {
        ResponseHelper::notFound('Event not found');
    }

    // Delete event
    $query = "DELETE FROM events WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $event_id);
    $stmt->execute();

    ResponseHelper::success(null, 'Event deleted successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
