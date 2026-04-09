<?php
/**
 * Delete Media API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    ResponseHelper::error('Method not allowed', 405);
}

// Authenticate admin
$auth = new AuthMiddleware();
$admin = $auth->authenticate();

// Get media ID from URL
$media_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($media_id <= 0) {
    ResponseHelper::error('Invalid media ID');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Check if media exists
    $checkQuery = "SELECT id FROM media WHERE id = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $media_id);
    $checkStmt->execute();

    if ($checkStmt->rowCount() === 0) {
        ResponseHelper::notFound('Media not found');
    }

    // Delete media
    $query = "DELETE FROM media WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $media_id);
    $stmt->execute();

    ResponseHelper::success(null, 'Media deleted successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
