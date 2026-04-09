<?php
/**
 * Response Helper Functions
 * Safety Research Foundation Admin Dashboard
 */

if (!class_exists('ResponseHelper')) {
    class ResponseHelper {
        public static function success($data = null, $message = 'Success') {
            http_response_code(200);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => true,
                'message' => $message,
                'data' => $data
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        public static function error($message = 'Error', $statusCode = 400) {
            http_response_code($statusCode);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'message' => $message,
                'data' => null
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        public static function unauthorized($message = 'Unauthorized access') {
            self::error($message, 401);
        }

        public static function forbidden($message = 'Forbidden access') {
            self::error($message, 403);
        }

        public static function notFound($message = 'Resource not found') {
            self::error($message, 404);
        }

        public static function serverError($message = 'Internal server error') {
            self::error($message, 500);
        }
    }
}
?>
