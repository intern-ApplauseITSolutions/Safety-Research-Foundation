<?php
/**
 * Public Events API
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
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$featured = isset($_GET['featured']) ? $_GET['featured'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$offset = ($page - 1) * $limit;

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query - only return active events
    $baseQuery = "SELECT id, title, date, location, category, excerpt, content, image, featured, created_at FROM events WHERE status = 'active'";
    $countQuery = "SELECT COUNT(*) as total FROM events WHERE status = 'active'";
    $params = [];

    // Add featured filter
    if (!empty($featured) && $featured === 'true') {
        $baseQuery .= " AND featured = 1";
        $countQuery .= " AND featured = 1";
    }

    // Add category filter
    if (!empty($category)) {
        $baseQuery .= " AND category = :category";
        $countQuery .= " AND category = :category";
        $params[':category'] = $category;
    }

    // Add ordering and pagination
    $baseQuery .= " ORDER BY created_at DESC LIMIT $limit OFFSET $offset";

    // Get total count
    $countStmt = $db->prepare($countQuery);
    foreach ($params as $key => $value) {
        $countStmt->bindValue($key, $value);
    }
    $countStmt->execute();
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get events
    $stmt = $db->prepare($baseQuery);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Parse data
    foreach ($events as &$event) {
        $event['featured'] = (bool)$event['featured'];
        // Format date if needed
        $event['formatted_date'] = date('F j, Y', strtotime($event['created_at']));
    }

    $totalPages = ceil($total / $limit);

    ResponseHelper::success([
        'events' => $events,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_records' => $total,
            'per_page' => $limit
        ]
    ], 'Events retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
