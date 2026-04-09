<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Simple database connection without authentication
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
    // Get JSON input
    $json_input = file_get_contents('php://input');
    $data = json_decode($json_input, true);

    // Validate required fields
    if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Required fields are missing'
        ]);
        exit;
    }

    // Sanitize input
    $name = trim($data['name']);
    $email = trim($data['email']);
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    $subject = isset($data['subject']) ? trim($data['subject']) : '';
    $message = trim($data['message']);

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode([
            'success' => false,
            'message' => 'Name, email, and message are required'
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email address'
        ]);
        exit;
    }

    // Connect to database
    $database = new SimpleDatabase();
    $db = $database->getConnection();

    // Check if contact_enquiries table exists
    $stmt = $db->query("SHOW TABLES LIKE 'contact_enquiries'");
    if ($stmt->rowCount() === 0) {
        // Create the table if it doesn't exist
        $createTableSQL = "
            CREATE TABLE IF NOT EXISTS contact_enquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                subject VARCHAR(255),
                message TEXT NOT NULL,
                status ENUM('unread', 'read') DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ";
        $db->exec($createTableSQL);
    }

    // Insert contact enquiry
    $query = "INSERT INTO contact_enquiries (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, 'unread')";
    $stmt = $db->prepare($query);
    $stmt->execute([$name, $email, $phone, $subject, $message]);

    echo json_encode([
        'success' => true,
        'message' => 'Contact form submitted successfully. We will get back to you soon.'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
