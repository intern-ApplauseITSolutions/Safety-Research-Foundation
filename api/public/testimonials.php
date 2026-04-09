<?php
/**
 * Public Testimonials API
 * Safety Research Foundation - For Frontend Consumption
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    ResponseHelper::error('Method not allowed', 405);
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Build base query - only return active testimonials
    $baseQuery = "SELECT id, name, role, rating, text, featured, created_at FROM testimonials WHERE status = 'active' ORDER BY sort_order ASC, created_at DESC";
    
    // Get testimonials
    $stmt = $db->prepare($baseQuery);
    $stmt->execute();
    $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Parse data and format for frontend
    foreach ($testimonials as &$testimonial) {
        $testimonial['featured'] = (bool)$testimonial['featured'];
        $testimonial['rating'] = (int)$testimonial['rating'];
        
        // Format date if needed
        $testimonial['formatted_date'] = date('F j, Y', strtotime($testimonial['created_at']));
    }

    ResponseHelper::success([
        'testimonials' => $testimonials,
        'total' => count($testimonials)
    ], 'Testimonials retrieved successfully');

} catch(PDOException $e) {
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
