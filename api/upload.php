<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];

// Check if file was uploaded successfully
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File upload error: ' . $file['error']]);
    exit;
}

// Validate file size (max 50MB)
$maxSize = 50 * 1024 * 1024; // 50MB in bytes
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large. Maximum size is 50MB']);
    exit;
}

// Create uploads directory if it doesn't exist
$uploadDir = '../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate unique filename
$fileName = uniqid() . '_' . basename($file['name']);
$filePath = $uploadDir . $fileName;

// Move uploaded file to target location
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Return the URL that can be used to access the file
    $fileUrl = '/uploads/' . $fileName;
    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully',
        'file_url' => $fileUrl,
        'file_name' => $fileName,
        'file_size' => $file['size']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
}
?>
