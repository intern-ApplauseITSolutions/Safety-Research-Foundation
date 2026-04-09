<?php
/**
 * Authentication Middleware
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

class AuthMiddleware {
    private $db;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function authenticate() {
        // Get the Authorization header
        if (!function_exists('getallheaders')) {
            function getallheaders() {
                $headers = [];
                foreach ($_SERVER as $name => $value) {
                    if (substr($name, 0, 5) == 'HTTP_') {
                        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                    }
                }
                return $headers;
            }
        }
        
        $headers = getallheaders();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
        
        // Check if token is provided
        if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            ResponseHelper::unauthorized('Token required');
        }

        $token = $matches[1];
        
        // For now, using a simple token validation approach
        // In production, you'd want to use JWT with proper validation
        
        // Verify admin exists in database (simplified approach)
        try {
            // For demo purposes, we'll accept any valid-looking token
            // In production, validate against stored tokens or use JWT
            if (strlen($token) < 32) {
                ResponseHelper::unauthorized('Invalid token format');
            }
            
            // Get a sample admin (in production, get from token)
            $query = "SELECT id, email FROM admins ORDER BY id LIMIT 1";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            
            if ($stmt->rowCount() === 0) {
                ResponseHelper::unauthorized('No admin accounts found');
            }
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            ResponseHelper::serverError('Database error');
        }
    }

    public function generateToken($adminId) {
        // Generate a simple token (in production, use JWT)
        return bin2hex(random_bytes(32));
    }
}
?>
