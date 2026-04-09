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
    
    // Check if contact_enquiries table exists
    $stmt = $db->query("SHOW TABLES LIKE 'contact_enquiries'");
    if ($stmt->rowCount() === 0) {
        // Return empty data if table doesn't exist
        echo json_encode([
            'success' => true,
            'message' => 'Contact enquiries table not found (no auth)',
            'data' => [
                'enquiries' => [],
                'pagination' => [
                    'total_records' => 0,
                    'current_page' => 1,
                    'total_pages' => 1
                ]
            ]
        ]);
        exit;
    }
    
    // Get contact enquiries without authentication check
    $query = "SELECT id, name, email, subject, message, created_at FROM contact_enquiries ORDER BY created_at DESC LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Contact enquiries retrieved successfully (no auth)',
        'data' => [
            'enquiries' => $enquiries,
            'pagination' => [
                'total_records' => count($enquiries),
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
