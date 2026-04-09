<?php
/**
 * Submit Pledge API
 * Safety Research Foundation - Frontend Pledge Submission
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../services/CertificateGenerator.php';
require_once __DIR__ . '/../services/MailService.php';
require_once __DIR__ . '/../../vendor/autoload.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ResponseHelper::error('Method not allowed', 405);
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

    // Check if this is OTP verification step
    if (isset($data['step']) && $data['step'] === 'verify_otp') {
        // Validate required fields for OTP verification
        $validator = new ValidatorHelper();
        $validator->required($data, ['email', 'otp']);
        $validator->email($data, ['email']);
        $validator->string($data, ['email', 'otp']);
        
        if (!$validator->isValid()) {
            ResponseHelper::error($validator->getFirstError());
        }

        // Verify OTP
        $query = "SELECT * FROM otp_verifications 
                  WHERE email = :email AND otp = :otp AND expires_at > NOW() 
                  ORDER BY created_at DESC LIMIT 1";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':otp', $data['otp']);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            ResponseHelper::error('Invalid or expired OTP');
        }

        // Delete used OTP
        $otpData = $stmt->fetch(PDO::FETCH_ASSOC);
        $deleteQuery = "DELETE FROM otp_verifications WHERE id = :id";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->bindParam(':id', $otpData['id']);
        $deleteStmt->execute();

        ResponseHelper::success([
            'otp_verified' => true,
            'message' => 'OTP verified successfully'
        ], 'OTP verified');
    }

    // Validate required fields for pledge submission
    $validator = new ValidatorHelper();
    $validator->required($data, ['config_id', 'name', 'email', 'mobile']);
    $validator->string($data, ['title', 'name', 'gender', 'pincode', 'state', 'district', 'email', 'mobile', 'language']);
    $validator->email($data, ['email']);
    $validator->number($data, ['config_id']);
    
    if (!$validator->isValid()) {
        ResponseHelper::error($validator->getFirstError());
    }

    // Check if pledge configuration exists and is active
    $configQuery = "SELECT id, title FROM pledge_configs WHERE id = :config_id AND status = 'active'";
    $configStmt = $db->prepare($configQuery);
    $configStmt->bindParam(':config_id', $data['config_id']);
    $configStmt->execute();
    
    if ($configStmt->rowCount() === 0) {
        ResponseHelper::error('Invalid or inactive pledge configuration');
    }
    
    $config = $configStmt->fetch(PDO::FETCH_ASSOC);

    // Check for duplicate submission (same email and mobile for same config)
    $duplicateQuery = "SELECT id FROM pledge_submissions 
                      WHERE config_id = :config_id AND (email = :email OR mobile = :mobile)";
    $duplicateStmt = $db->prepare($duplicateQuery);
    $duplicateStmt->bindParam(':config_id', $data['config_id']);
    $duplicateStmt->bindParam(':email', $data['email']);
    $duplicateStmt->bindParam(':mobile', $data['mobile']);
    $duplicateStmt->execute();
    
    if ($duplicateStmt->rowCount() > 0) {
        ResponseHelper::error('You have already taken this pledge with this email or mobile number');
    }

    // Start transaction
    $db->beginTransaction();

    // Insert pledge submission
    $query = "INSERT INTO pledge_submissions (config_id, title, name, gender, dob, pincode, state, district, email, mobile, language, status) 
              VALUES (:config_id, :title, :name, :gender, :dob, :pincode, :state, :district, :email, :mobile, :language, :status)";
    
    $stmt = $db->prepare($query);
    $status = $data['status'] ?? 'pending';

    $stmt->bindValue(':config_id', $data['config_id']);
    $stmt->bindValue(':title', $data['title']);
    $stmt->bindValue(':name', $data['name']);
    $stmt->bindValue(':gender', $data['gender']);
    $stmt->bindValue(':dob', $data['dob']);
    $stmt->bindValue(':pincode', $data['pincode']);
    $stmt->bindValue(':state', $data['state']);
    $stmt->bindValue(':district', $data['district']);
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':mobile', $data['mobile']);
    $stmt->bindValue(':language', $data['language']);
    $stmt->bindValue(':status', $status);
    
    if (!$stmt->execute()) {
        throw new Exception('Failed to submit pledge');
    }

    $submission_id = $db->lastInsertId();

    // Update pledge count
    $updateCountQuery = "UPDATE pledge_configs SET pledge_count = pledge_count + 1 WHERE id = :config_id";
    $updateCountStmt = $db->prepare($updateCountQuery);
    $updateCountStmt->bindParam(':config_id', $data['config_id']);
    $updateCountStmt->execute();

    // Generate certificate using the same database connection so the
    // uncommitted submission row is visible inside the transaction.
    $certificateGenerator = new CertificateGenerator($db);
    $certificateResult = $certificateGenerator->generateCertificate($submission_id);
    
    if (!$certificateResult['success']) {
        throw new Exception('Certificate generation failed: ' . $certificateResult['error']);
    }
    
    // Commit transaction
    $db->commit();

    $mailService = new MailService();
    $certificatePath = $certificateResult['filepath'];
    $emailResult = [
        'success' => false,
        'message' => 'Certificate email was not sent'
    ];

    try {
        $emailResult = $mailService->sendPledgeCertificate(
            $data['email'],
            $data['name'],
            $certificatePath,
            $config['title']
        );

        if (!empty($emailResult['success'])) {
            $updateEmailQuery = "UPDATE pledge_submissions
                                 SET certificate_sent = TRUE, otp_verified = TRUE, status = 'completed'
                                 WHERE id = :id";
            $updateEmailStmt = $db->prepare($updateEmailQuery);
            $updateEmailStmt->bindParam(':id', $submission_id);
            $updateEmailStmt->execute();
        } else {
            $updateStatusQuery = "UPDATE pledge_submissions
                                  SET otp_verified = TRUE, status = 'verified'
                                  WHERE id = :id";
            $updateStatusStmt = $db->prepare($updateStatusQuery);
            $updateStatusStmt->bindParam(':id', $submission_id);
            $updateStatusStmt->execute();
        }
    } catch (Exception $e) {
        error_log('Certificate email failed: ' . $e->getMessage());
        $updateStatusQuery = "UPDATE pledge_submissions
                              SET otp_verified = TRUE, status = 'verified'
                              WHERE id = :id";
        $updateStatusStmt = $db->prepare($updateStatusQuery);
        $updateStatusStmt->bindParam(':id', $submission_id);
        $updateStatusStmt->execute();
        $emailResult = [
            'success' => false,
            'message' => 'Certificate generated but email sending failed',
            'error' => $e->getMessage()
        ];
    }

    $submissionDetails = [
        'name' => $data['name'],
        'email' => $data['email'],
        'mobile' => $data['mobile'],
        'state' => $data['state'],
        'district' => $data['district'],
        'language' => $data['language'],
        'created_at' => date('Y-m-d H:i:s')
    ];

    try {
        $mailService->sendAdminNotification($submissionDetails);
    } catch (Exception $e) {
        error_log('Admin notification failed: ' . $e->getMessage());
    }

    ResponseHelper::success([
        'submission_id' => $submission_id,
        'message' => 'Pledge submitted successfully',
        'certificate_generated' => true,
        'email_sent' => $emailResult['success'],
        'certificate_url' => $certificateResult['url']
    ], 'Pledge submitted successfully');

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
