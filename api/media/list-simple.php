<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Simple version without authentication for debugging
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get media without authentication check
    $query = "SELECT id, title, type, category, file_url, thumbnail_url, featured, status FROM media WHERE status = 'active' ORDER BY created_at DESC LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $media = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Media retrieved successfully (no auth)',
        'data' => [
            'media' => $media,
            'pagination' => [
                'total_records' => count($media),
                'current_page' => 1,
                'total_pages' => 1
            ]
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
