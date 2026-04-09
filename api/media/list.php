<?php
/**
 * Get Media List API
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
$type = isset($_GET['type']) ? $_GET['type'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$featured = isset($_GET['featured']) ? $_GET['featured'] : '';
$offset = ($page - 1) * $limit;

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query
    $baseQuery = "SELECT * FROM media WHERE 1=1";
    $countQuery = "SELECT COUNT(*) as total FROM media WHERE 1=1";
    $params = [];

    // Add filter conditions
    if (!empty($type)) {
        $baseQuery .= " AND type = :type";
        $countQuery .= " AND type = :type";
        $params[':type'] = $type;
    }

    if (!empty($category)) {
        $baseQuery .= " AND category = :category";
        $countQuery .= " AND category = :category";
        $params[':category'] = $category;
    }

    if (!empty($featured) && $featured === 'true') {
        $baseQuery .= " AND featured = 1";
        $countQuery .= " AND featured = 1";
    }

    // Add ordering and pagination
    $baseQuery .= " ORDER BY sort_order ASC, created_at DESC LIMIT $limit OFFSET $offset";

    // Get total count
    $countStmt = $db->prepare($countQuery);
    foreach ($params as $key => $value) {
        $countStmt->bindValue($key, $value);
    }
    $countStmt->execute();
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get media items
    $stmt = $db->prepare($baseQuery);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $media = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Parse boolean fields
    foreach ($media as &$item) {
        $item['featured'] = (bool)$item['featured'];
        $item['status'] = $item['status'];
    }

    $totalPages = ceil($total / $limit);

    ResponseHelper::success([
        'media' => $media,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_records' => $total,
            'per_page' => $limit
        ]
    ], 'Media retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
