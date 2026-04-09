<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Check if database and table exist
    $stmt = $conn->query("SHOW TABLES LIKE 'admins'");
    $table_exists = $stmt->rowCount() > 0;
    
    if (!$table_exists) {
        echo json_encode([
            'success' => false,
            'message' => 'Admins table does not exist. Please run the database schema first.'
        ]);
        exit;
    }
    
    // Get admin user
    $stmt = $conn->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute(['admin@safetyresearchfoundation.org']);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        echo json_encode([
            'success' => false,
            'message' => 'Admin user not found. Please run the database schema first.'
        ]);
        exit;
    }
    
    // Test password verification
    $test_password = 'admin123';
    $password_valid = password_verify($test_password, $admin['password']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Admin user found',
        'admin' => [
            'email' => $admin['email'],
            'id' => $admin['id'],
            'password_hash' => $admin['password'],
            'password_test' => $password_valid ? 'Password matches' : 'Password does not match',
            'test_password' => $test_password
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error',
        'error' => $e->getMessage()
    ]);
}
?>
