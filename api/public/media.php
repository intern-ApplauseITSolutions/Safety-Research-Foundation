<?php
/**
 * Public Media API
 * Safety Research Foundation - For Frontend Consumption
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    ResponseHelper::error('Method not allowed', 405);
}

// Get query parameters
$type = isset($_GET['type']) ? $_GET['type'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$featured = isset($_GET['featured']) ? $_GET['featured'] : '';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query - only return active media
    $baseQuery = "SELECT id, title, description, type, category, file_url, thumbnail_url, file_size, duration, video_id, download_url, external_url, featured, sort_order, created_at FROM media WHERE status = 'active'";
    $params = [];

    // Add type filter
    if (!empty($type)) {
        $baseQuery .= " AND type = :type";
        $params[':type'] = $type;
    }

    // Add category filter
    if (!empty($category)) {
        $baseQuery .= " AND category = :category";
        $params[':category'] = $category;
    }

    // Add featured filter
    if (!empty($featured) && $featured === 'true') {
        $baseQuery .= " AND featured = 1";
    }

    // Add ordering and limit
    $baseQuery .= " ORDER BY sort_order ASC, created_at DESC LIMIT $limit";

    // Get media
    $stmt = $db->prepare($baseQuery);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $media = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Parse data and format for frontend
    foreach ($media as &$item) {
        $item['featured'] = (bool)$item['featured'];
        
        // Format date if needed
        $item['formatted_date'] = date('F j, Y', strtotime($item['created_at']));
        
        // Build full URLs for videos
        if ($item['type'] === 'video' && !empty($item['video_id'])) {
            $item['embed_url'] = "https://www.youtube.com/embed/{$item['video_id']}";
            $item['thumbnail_url'] = "https://img.youtube.com/vi/{$item['video_id']}/maxresdefault.jpg";
        }
    }

    ResponseHelper::success([
        'media' => $media,
        'total' => count($media)
    ], 'Media retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
