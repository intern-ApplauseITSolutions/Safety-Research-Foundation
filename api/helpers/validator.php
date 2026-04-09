<?php
/**
 * Input Validation Helper
 * Safety Research Foundation Admin Dashboard
 */

if (!class_exists('ValidatorHelper')) {
    class ValidatorHelper {
        public static function sanitize($input) {
            return htmlspecialchars(strip_tags(trim($input)));
        }

        public static function validateEmail($email) {
            return filter_var($email, FILTER_VALIDATE_EMAIL);
        }

        private $errors = [];
        
        public function required($data, $fields) {
            foreach ($fields as $field) {
                if (empty($data[$field])) {
                    $this->errors[$field] = ucfirst($field) . ' is required';
                }
            }
        }

        public function string($data, $fields) {
            foreach ($fields as $field) {
                if (isset($data[$field]) && !is_string($data[$field])) {
                    $this->errors[$field] = ucfirst($field) . ' must be a string';
                }
            }
        }

        public function email($data, $fields) {
            foreach ($fields as $field) {
                if (isset($data[$field]) && !filter_var($data[$field], FILTER_VALIDATE_EMAIL)) {
                    $this->errors[$field] = ucfirst($field) . ' must be a valid email';
                }
            }
        }

        public function number($data, $fields) {
            foreach ($fields as $field) {
                if (isset($data[$field]) && !is_numeric($data[$field])) {
                    $this->errors[$field] = ucfirst($field) . ' must be a number';
                }
            }
        }

        public function isValid() {
            return empty($this->errors);
        }

        public function getFirstError() {
            return $this->errors ? reset($this->errors) : null;
        }
        
        public static function validatePassword($password) {
            if (strlen($password) < 6) {
                return 'Password must be at least 6 characters long';
            }
            return null;
        }

        public static function sanitizeInput($data) {
            $sanitized = [];
            foreach ($data as $key => $value) {
                if (is_array($value)) {
                    $sanitized[$key] = array_map([self::class, 'sanitize'], $value);
                } else {
                    $sanitized[$key] = self::sanitize($value);
                }
            }
            return $sanitized;
        }
    }
}

if (!class_exists('Validator')) {
    class Validator extends ValidatorHelper {
        public static function validateRequired($data, $fields) {
            $errors = [];

            foreach ($fields as $field) {
                if (!isset($data[$field]) || $data[$field] === null || trim((string) $data[$field]) === '') {
                    $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
                }
            }

            return $errors;
        }
    }
}
?>
