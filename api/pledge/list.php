<?php
/**
 * List Pledge Configurations API
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

    // Get pledge configurations with content count
    $query = "SELECT pc.*, 
                     (SELECT COUNT(*) FROM pledge_content WHERE config_id = pc.id) as content_count,
                     (SELECT COUNT(*) FROM pledge_submissions WHERE config_id = pc.id) as submission_count
              FROM pledge_configs pc 
              ORDER BY pc.created_at DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $configs = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['content_count'] = (int)$row['content_count'];
        $row['submission_count'] = (int)$row['submission_count'];
        $row['pledge_count'] = (int)$row['pledge_count'];
        $row['status'] = $row['status'];
        $configs[] = $row;
    }
    
    ResponseHelper::success($configs, 'Pledge configurations retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
