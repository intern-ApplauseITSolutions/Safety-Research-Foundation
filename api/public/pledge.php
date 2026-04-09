<?php
/**
 * Public Pledge API
 * Safety Research Foundation - Frontend Pledge Data
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    ResponseHelper::error('Method not allowed', 405);
}

// Set proper UTF-8 encoding header
header('Content-Type: application/json; charset=utf-8');

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Get active pledge configuration
    $query = "SELECT * FROM pledge_configs WHERE status = 'active' ORDER BY created_at DESC LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        ResponseHelper::notFound('No active pledge configuration found');
    }
    
    $config = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Get pledge content for this configuration
    $contentQuery = "SELECT * FROM pledge_content WHERE config_id = :config_id ORDER BY language";
    $contentStmt = $db->prepare($contentQuery);
    $contentStmt->bindParam(':config_id', $config['id']);
    $contentStmt->execute();
    
    $contents = [];
    while ($row = $contentStmt->fetch(PDO::FETCH_ASSOC)) {
        // Parse JSON fields if needed
        if (!empty($row['pledge_points'])) {
            $row['pledge_points'] = json_decode($row['pledge_points'], true) ?? [];
        }
        $contents[$row['language']] = $row;
    }
    
    // Prepare response data
    $responseData = [
        'config' => [
            'id' => $config['id'],
            'title' => $config['title'],
            'description' => $config['description'],
            'year' => $config['year'],
            'pledge_count' => (int)$config['pledge_count'],
            'sample_certificate_url' => $config['sample_certificate_url']
        ],
        'content' => $contents
    ];
    
    ResponseHelper::success($responseData, 'Pledge data retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
