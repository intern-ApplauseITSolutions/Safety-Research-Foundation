<?php
/**
 * Update Pledge Configuration API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle PUT request
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
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

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    ResponseHelper::error('Invalid JSON data');
}

try {
    // Database connection
    $database = new Database();
    $db = $database->getConnection();

    // Validate input
    $validator = new ValidatorHelper();
    $validator->string($data, ['title', 'description', 'year', 'sample_certificate_url']);
    $validator->number($data, ['pledge_count']);
    
    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    // Start transaction
    $db->beginTransaction();

    // Build update query dynamically
    $update_fields = [];
    $params = [];
    
    if (isset($data['title'])) {
        $update_fields[] = "title = :title";
        $params[':title'] = $data['title'];
    }
    if (isset($data['description'])) {
        $update_fields[] = "description = :description";
        $params[':description'] = $data['description'];
    }
    if (isset($data['year'])) {
        $update_fields[] = "year = :year";
        $params[':year'] = $data['year'];
    }
    if (isset($data['pledge_count'])) {
        $update_fields[] = "pledge_count = :pledge_count";
        $params[':pledge_count'] = $data['pledge_count'];
    }
    if (isset($data['sample_certificate_url'])) {
        $update_fields[] = "sample_certificate_url = :sample_certificate_url";
        $params[':sample_certificate_url'] = $data['sample_certificate_url'];
    }
    if (isset($data['status'])) {
        $update_fields[] = "status = :status";
        $params[':status'] = $data['status'];
    }
    
    if (empty($update_fields)) {
        ResponseHelper::error('No fields to update');
    }

    // Update pledge configuration
    $query = "UPDATE pledge_configs SET " . implode(', ', $update_fields) . " WHERE id = :id";
    $params[':id'] = $config_id;
    
    $stmt = $db->prepare($query);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to update pledge configuration');
    }

    // Update pledge content if provided
    if (!empty($data['contents']) && is_array($data['contents'])) {
        // Delete existing content
        $deleteQuery = "DELETE FROM pledge_content WHERE config_id = :config_id";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->bindParam(':config_id', $config_id);
        $deleteStmt->execute();

        // Insert new content
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
                throw new Exception('Failed to update pledge content');
            }
        }
    }

    // Commit transaction
    $db->commit();

    ResponseHelper::success(['id' => $config_id], 'Pledge configuration updated successfully');

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
