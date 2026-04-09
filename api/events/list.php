<?php
/**
 * Get Events List API
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

// Get query parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = isset($_GET['search']) ? $_GET['search'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$offset = ($page - 1) * $limit;

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query
    $baseQuery = "SELECT * FROM events WHERE 1=1";
    $countQuery = "SELECT COUNT(*) as total FROM events WHERE 1=1";
    $params = [];

    // Add search conditions
    if (!empty($search)) {
        $baseQuery .= " AND (title LIKE :search OR location LIKE :search OR excerpt LIKE :search)";
        $countQuery .= " AND (title LIKE :search OR location LIKE :search OR excerpt LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    if (!empty($category)) {
        $baseQuery .= " AND category = :category";
        $countQuery .= " AND category = :category";
        $params[':category'] = $category;
    }

    // Add ordering and pagination
    $baseQuery .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    $params[':limit'] = $limit;
    $params[':offset'] = $offset;

    // Get total count
    $countStmt = $db->prepare($countQuery);
    foreach ($params as $key => $value) {
        if ($key !== ':limit' && $key !== ':offset') {
            $countStmt->bindValue($key, $value);
        }
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

    // Parse JSON fields if needed
    foreach ($events as &$event) {
        if (!empty($event['images'])) {
            $event['images'] = json_decode($event['images'], true);
        }
        $event['featured'] = (bool)$event['featured'];
        $event['status'] = $event['status'];
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
