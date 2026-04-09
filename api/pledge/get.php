<?php
/**
 * Get Single Pledge Configuration API
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

// Get pledge configuration ID from URL
$config_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($config_id <= 0) {
    ResponseHelper::error('Invalid pledge configuration ID');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Get pledge configuration
    $query = "SELECT * FROM pledge_configs WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $config_id);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        ResponseHelper::notFound('Pledge configuration not found');
    }

    $config = $stmt->fetch(PDO::FETCH_ASSOC);
    $config['pledge_count'] = (int)$config['pledge_count'];

    // Get pledge content for this configuration
    $contentQuery = "SELECT * FROM pledge_content WHERE config_id = :config_id ORDER BY language";
    $contentStmt = $db->prepare($contentQuery);
    $contentStmt->bindParam(':config_id', $config_id);
    $contentStmt->execute();
    
    $contents = [];
    while ($row = $contentStmt->fetch(PDO::FETCH_ASSOC)) {
        $row['pledge_points'] = json_decode($row['pledge_points'], true) ?? [];
        $contents[] = $row;
    }
    
    $config['contents'] = $contents;

    ResponseHelper::success($config, 'Pledge configuration retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
