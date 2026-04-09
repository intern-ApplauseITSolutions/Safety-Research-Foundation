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
    
    // Check if contact_enquiries table exists
    $stmt = $db->query("SHOW TABLES LIKE 'contact_enquiries'");
    if ($stmt->rowCount() === 0) {
        // Return empty data if table doesn't exist
        echo json_encode([
            'success' => true,
            'message' => 'Contact enquiries table not found (NO AUTH)',
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
    
    // Get contact enquiries without any authentication check
    $query = "SELECT id, name, email, subject, message, created_at FROM contact_enquiries ORDER BY created_at DESC LIMIT 5";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Contact enquiries retrieved successfully (NO AUTH)',
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
