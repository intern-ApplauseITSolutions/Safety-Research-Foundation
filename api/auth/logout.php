<?php
/**
 * Admin Logout API
 * Safety Research Foundation Admin Dashboard
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../middleware/auth.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
}

// Authenticate admin
$auth = new AuthMiddleware();
$admin = $auth->authenticate();

// Destroy session
session_start();
session_destroy();

ResponseHelper::success(null, 'Logout successful');
?>
