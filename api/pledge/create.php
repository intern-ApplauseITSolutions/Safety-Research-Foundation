<?php
/**
 * Create Pledge Configuration API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
}

// Authenticate admin
$auth = new AuthMiddleware();
$admin = $auth->authenticate();

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    ResponseHelper::error('Invalid JSON data');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Validate required fields
    $validator = new ValidatorHelper();
    $validator->required($data, ['title', 'year']);
    $validator->string($data, ['title', 'description', 'year', 'sample_certificate_url']);
    $validator->number($data, ['pledge_count']);
    
    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    // Start transaction
    $db->beginTransaction();

    // Insert pledge configuration
    $query = "INSERT INTO pledge_configs (title, description, year, pledge_count, sample_certificate_url, status) 
              VALUES (:title, :description, :year, :pledge_count, :sample_certificate_url, :status)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':year', $data['year']);
    $stmt->bindParam(':pledge_count', $data['pledge_count']);
    $stmt->bindParam(':sample_certificate_url', $data['sample_certificate_url']);
    $stmt->bindParam(':status', $data['status'] ?? 'active');
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to create pledge configuration');
    }

    $config_id = $db->lastInsertId();

    // Insert pledge content if provided
    if (!empty($data['contents']) && is_array($data['contents'])) {
        foreach ($data['contents'] as $content) {
            if (empty($content['language']) || empty($content['pledge_points'])) {
                continue;
            }

            $contentQuery = "INSERT INTO pledge_content (config_id, language, pledge_title, pledge_points, form_instructions, status) 
                             VALUES (:config_id, :language, :pledge_title, :pledge_points, :form_instructions, :status)";
            
            $contentStmt = $db->prepare($contentQuery);
            $contentStmt->bindParam(':config_id', $config_id);
            $contentStmt->bindParam(':language', $content['language']);
            $contentStmt->bindParam(':pledge_title', $content['pledge_title']);
            $contentStmt->bindParam(':pledge_points', json_encode($content['pledge_points']));
            $contentStmt->bindParam(':form_instructions', $content['form_instructions']);
            $contentStmt->bindParam(':status', $content['status'] ?? 'active');
            
            if (!$contentStmt->execute()) {
                throw new Exception('Failed to create pledge content');
            }
        }
    }

    // Commit transaction
    $db->commit();

    ResponseHelper::success(['id' => $config_id], 'Pledge configuration created successfully');

} catch(PDOException $e) {
    if (isset($db) && $db->inTransaction()) {
        $db->rollBack();
    }
    ResponseHelper::serverError('Database error: ' . $e->getMessage());
} catch(Exception $e) {
    if (isset($db) && $db->inTransaction()) {
        $db->rollBack();
    }
    ResponseHelper::serverError('Server error: ' . $e->getMessage());
}
?>
