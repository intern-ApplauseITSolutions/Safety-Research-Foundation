<?php
/**
 * Update Event API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle PUT request
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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

// Get JSON input
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

if (!$data) {
    ResponseHelper::error('Invalid JSON input');
}

// Validate required fields
$required_fields = ['title', 'date', 'location', 'category', 'excerpt', 'content'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

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

    // Update event
    $query = "UPDATE events SET 
              title = :title, 
              date = :date, 
              location = :location, 
              category = :category, 
              excerpt = :excerpt, 
              content = :content, 
              full_description = :full_description, 
              image = :image, 
              images = :images, 
              featured = :featured, 
              status = :status,
              updated_at = NOW
              WHERE id = :id";
    
    $stmt = $db->prepare($query);
    
    // Bind parameters
    $stmt->bindParam(':id', $event_id);
    $stmt->bindParam(':title', $sanitized_data['title']);
    $stmt->bindParam(':date', $sanitized_data['date']);
    $stmt->bindParam(':location', $sanitized_data['location']);
    $stmt->bindParam(':category', $sanitized_data['category']);
    $stmt->bindParam(':excerpt', $sanitized_data['excerpt']);
    $stmt->bindParam(':content', $sanitized_data['content']);
    
    $full_description = isset($sanitized_data['full_description']) ? $sanitized_data['full_description'] : null;
    $stmt->bindParam(':full_description', $full_description);
    
    $image = isset($sanitized_data['image']) ? $sanitized_data['image'] : null;
    $stmt->bindParam(':image', $image);
    
    $images = isset($sanitized_data['images']) ? json_encode($sanitized_data['images']) : null;
    $stmt->bindParam(':images', $images);
    
    $featured = isset($sanitized_data['featured']) ? (int)$sanitized_data['featured'] : 0;
    $stmt->bindParam(':featured', $featured);
    
    $status = isset($sanitized_data['status']) ? $sanitized_data['status'] : 'active';
    $stmt->bindParam(':status', $status);
    
    $stmt->execute();

    // Get the updated event
    $selectQuery = "SELECT * FROM events WHERE id = :id";
    $selectStmt = $db->prepare($selectQuery);
    $selectStmt->bindParam(':id', $event_id);
    $selectStmt->execute();
    
    $event = $selectStmt->fetch(PDO::FETCH_ASSOC);
    
    // Parse JSON fields if needed
    if (!empty($event['images'])) {
        $event['images'] = json_decode($event['images'], true);
    }
    $event['featured'] = (bool)$event['featured'];

    ResponseHelper::success($event, 'Event updated successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
