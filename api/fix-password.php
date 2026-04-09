<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Generate correct password hash for "admin123"
    $password = 'admin123';
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    // Update admin password
    $stmt = $conn->prepare("UPDATE admins SET password = ? WHERE email = ?");
    $stmt->execute([$password_hash, 'admin@safetyresearchfoundation.org']);
    
    // Verify the update
    $stmt = $conn->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute(['admin@safetyresearchfoundation.org']);
    $admin = $stmt->fetch();
    
    // Test password verification
    $password_valid = password_verify($password, $admin['password']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Password updated successfully',
        'password' => $password,
        'new_hash' => $password_hash,
        'verification' => $password_valid ? 'Password verification successful' : 'Password verification failed'
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error updating password',
        'error' => $e->getMessage()
    ]);
}
?>
