<?php
/**
 * Get Single Event API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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

    // Get event
    $query = "SELECT * FROM events WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $event_id);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        ResponseHelper::notFound('Event not found');
    }

    $event = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Parse JSON fields if needed
    if (!empty($event['images'])) {
        $event['images'] = json_decode($event['images'], true);
    }
    $event['featured'] = (bool)$event['featured'];

    ResponseHelper::success($event, 'Event retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
