<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// No authentication whatsoever - direct database connection
class SimpleDatabase {
    private $host = 'localhost';
    private $db_name = 'safety_research_foundation';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            echo json_encode([
                'success' => false,
                'message' => 'Connection error: ' . $exception->getMessage()
            ]);
            exit;
        }

        return $this->conn;
    }
}

try {
    $database = new SimpleDatabase();
    $db = $database->getConnection();
    
    // Get media without any authentication check
    $query = "SELECT id, title, type, category, file_url, thumbnail_url, featured, status FROM media WHERE status = 'active' ORDER BY created_at DESC LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $media = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Media retrieved successfully (NO AUTH)',
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
