<?php
/**
 * Update Media API
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

// Get media ID from URL
$media_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($media_id <= 0) {
    ResponseHelper::error('Invalid media ID');
}

// Get JSON input
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

if (!$data) {
    ResponseHelper::error('Invalid JSON input');
}

// Validate required fields
$required_fields = ['title', 'type', 'file_url'];
$validation_errors = Validator::validateRequired($data, $required_fields);

if (!empty($validation_errors)) {
    ResponseHelper::error('Validation failed: ' . implode(', ', $validation_errors));
}

// Validate media type
$valid_types = ['video', 'image', 'document', 'audio', 'ebook'];
if (!in_array($data['type'], $valid_types)) {
    ResponseHelper::error('Invalid media type. Must be one of: ' . implode(', ', $valid_types));
}

// Sanitize input
$sanitized_data = Validator::sanitizeInput($data);

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Check if media exists
    $checkQuery = "SELECT id FROM media WHERE id = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $media_id);
    $checkStmt->execute();

    if ($checkStmt->rowCount() === 0) {
        ResponseHelper::notFound('Media not found');
    }

    // Update media
    $query = "UPDATE media SET 
              title = :title, 
              description = :description, 
              type = :type, 
              category = :category, 
              file_url = :file_url, 
              thumbnail_url = :thumbnail_url, 
              file_size = :file_size, 
              duration = :duration, 
              video_id = :video_id, 
              download_url = :download_url, 
              external_url = :external_url, 
              featured = :featured, 
              status = :status,
              sort_order = :sort_order,
              updated_at = NOW()
              WHERE id = :id";
    
    $stmt = $db->prepare($query);
    
    // Bind parameters
    $stmt->bindParam(':id', $media_id);
    $stmt->bindParam(':title', $sanitized_data['title']);
    $stmt->bindParam(':type', $sanitized_data['type']);
    $stmt->bindParam(':file_url', $sanitized_data['file_url']);
    
    $description = isset($sanitized_data['description']) ? $sanitized_data['description'] : null;
    $stmt->bindParam(':description', $description);
    
    $category = isset($sanitized_data['category']) ? $sanitized_data['category'] : null;
    $stmt->bindParam(':category', $category);
    
    $thumbnail_url = isset($sanitized_data['thumbnail_url']) ? $sanitized_data['thumbnail_url'] : null;
    $stmt->bindParam(':thumbnail_url', $thumbnail_url);
    
    $file_size = isset($sanitized_data['file_size']) ? $sanitized_data['file_size'] : null;
    $stmt->bindParam(':file_size', $file_size);
    
    $duration = isset($sanitized_data['duration']) ? $sanitized_data['duration'] : null;
    $stmt->bindParam(':duration', $duration);
    
    $video_id = isset($sanitized_data['video_id']) ? $sanitized_data['video_id'] : null;
    $stmt->bindParam(':video_id', $video_id);
    
    $download_url = isset($sanitized_data['download_url']) ? $sanitized_data['download_url'] : null;
    $stmt->bindParam(':download_url', $download_url);
    
    $external_url = isset($sanitized_data['external_url']) ? $sanitized_data['external_url'] : null;
    $stmt->bindParam(':external_url', $external_url);
    
    $featured = isset($sanitized_data['featured']) ? (int)$sanitized_data['featured'] : 0;
    $stmt->bindParam(':featured', $featured);
    
    $status = isset($sanitized_data['status']) ? $sanitized_data['status'] : 'active';
    $stmt->bindParam(':status', $status);
    
    $sort_order = isset($sanitized_data['sort_order']) ? (int)$sanitized_data['sort_order'] : 0;
    $stmt->bindParam(':sort_order', $sort_order);
    
    $stmt->execute();

    // Get the updated media
    $selectQuery = "SELECT * FROM media WHERE id = :id";
    $selectStmt = $db->prepare($selectQuery);
    $selectStmt->bindParam(':id', $media_id);
    $selectStmt->execute();
    
    $media = $selectStmt->fetch(PDO::FETCH_ASSOC);
    
    // Parse boolean fields
    $media['featured'] = (bool)$media['featured'];

    ResponseHelper::success($media, 'Media updated successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
