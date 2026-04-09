<?php
/**
 * Get Contact Enquiries List API
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
$status = isset($_GET['status']) ? $_GET['status'] : '';
$offset = ($page - 1) * $limit;

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query
    $baseQuery = "SELECT * FROM contact_enquiries WHERE 1=1";
    $countQuery = "SELECT COUNT(*) as total FROM contact_enquiries WHERE 1=1";
    $params = [];

    // Add search conditions
    if (!empty($search)) {
        $baseQuery .= " AND (name LIKE :search OR email LIKE :search OR subject LIKE :search OR message LIKE :search)";
        $countQuery .= " AND (name LIKE :search OR email LIKE :search OR subject LIKE :search OR message LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }

    if (!empty($status)) {
        $baseQuery .= " AND status = :status";
        $countQuery .= " AND status = :status";
        $params[':status'] = $status;
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

    // Get enquiries
    $stmt = $db->prepare($baseQuery);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $totalPages = ceil($total / $limit);

    ResponseHelper::success([
        'enquiries' => $enquiries,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_records' => $total,
            'per_page' => $limit
        ]
    ], 'Contact enquiries retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
