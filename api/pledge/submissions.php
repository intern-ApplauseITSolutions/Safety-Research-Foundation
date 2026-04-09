<?php
/**
 * List Pledge Submissions API
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

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Get pagination parameters
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    // Get filter parameters
    $config_id = isset($_GET['config_id']) ? (int)$_GET['config_id'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $language = isset($_GET['language']) ? $_GET['language'] : null;

    // Build query
    $query = "SELECT ps.*, pc.title as pledge_title 
              FROM pledge_submissions ps 
              LEFT JOIN pledge_configs pc ON ps.config_id = pc.id 
              WHERE 1=1";
    
    $params = [];

    if ($config_id) {
        $query .= " AND ps.config_id = :config_id";
        $params[':config_id'] = $config_id;
    }

    if ($status) {
        $query .= " AND ps.status = :status";
        $params[':status'] = $status;
    }

    if ($language) {
        $query .= " AND ps.language = :language";
        $params[':language'] = $language;
    }

    // Add ordering and pagination
    $query .= " ORDER BY ps.created_at DESC LIMIT :limit OFFSET :offset";

    $stmt = $db->prepare($query);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    
    $submissions = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['otp_verified'] = (bool)$row['otp_verified'];
        $row['certificate_sent'] = (bool)$row['certificate_sent'];
        $submissions[] = $row;
    }

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM pledge_submissions WHERE 1=1";
    $countParams = [];

    if ($config_id) {
        $countQuery .= " AND config_id = :config_id";
        $countParams[':config_id'] = $config_id;
    }

    if ($status) {
        $countQuery .= " AND status = :status";
        $countParams[':status'] = $status;
    }

    if ($language) {
        $countQuery .= " AND language = :language";
        $countParams[':language'] = $language;
    }

    $countStmt = $db->prepare($countQuery);
    foreach ($countParams as $key => $value) {
        $countStmt->bindValue($key, $value);
    }
    $countStmt->execute();
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    $response = [
        'submissions' => $submissions,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => (int)$total,
            'pages' => ceil($total / $limit)
        ]
    ];

    ResponseHelper::success($response, 'Pledge submissions retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
