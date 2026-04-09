<?php
/**
 * SMTP Mail Service for OTP and Certificate Emails
 * Safety Research Foundation
 */

require_once __DIR__ . '/../../vendor/autoload.php';

class MailService {
    private $smtpHost = 'smtp.gmail.com';
    private $smtpPort = 587;
    private $smtpUsername = 'applauseitdev@gmail.com';
    private $smtpPassword = 'okyc smgd vhdk vyah'; // App password
    private $fromEmail = 'applauseitdev@gmail.com';
    private $fromName = 'Safety Research Foundation';
    private $adminEmail = 'admin@safetyresearchfoundation.org';
    
    /**
     * Send OTP email
     */
    public function sendOTP($recipientEmail, $recipientName, $otp) {
        try {
            $subject = "Your OTP for Road Safety Pledge - Safety Research Foundation";
            $htmlBody = $this->getOTPTemplate($recipientName, $otp);
            
            return $this->sendEmail($recipientEmail, $subject, $htmlBody);
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Send pledge certificate email
     */
    public function sendPledgeCertificate($recipientEmail, $recipientName, $certificatePath, $pledgeTitle) {
        try {
            $subject = "Your Road Safety Pledge Certificate - Safety Research Foundation";
            $htmlBody = $this->getEmailTemplate($recipientName, $pledgeTitle);
            
            // Read certificate file
            $certificateContent = file_get_contents($certificatePath);
            $certificateName = basename($certificatePath);
            
            return $this->sendEmailWithAttachment($recipientEmail, $subject, $htmlBody, $certificateContent, $certificateName);
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Send email using PHPMailer with SMTP
     */
    private function sendEmail($toEmail, $subject, $htmlBody) {
        try {
            // Check if PHPMailer is available
            if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
                return $this->sendWithPHPMailer($toEmail, $subject, $htmlBody);
            } else {
                // Fallback to PHP mail with SMTP headers
                return $this->sendWithPHPMail($toEmail, $subject, $htmlBody);
            }
        } catch (Exception $e) {
            throw new Exception('Email sending failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Send email with attachment using PHPMailer
     */
    private function sendEmailWithAttachment($toEmail, $subject, $htmlBody, $attachmentContent, $attachmentName) {
        try {
            if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
                return $this->sendWithPHPMailerAttachment($toEmail, $subject, $htmlBody, $attachmentContent, $attachmentName);
            } else {
                // Fallback to PHP mail with attachment
                return $this->sendWithPHPMailAttachment($toEmail, $subject, $htmlBody, $attachmentContent, $attachmentName);
            }
        } catch (Exception $e) {
            throw new Exception('Email sending failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Send using PHPMailer (recommended)
     */
    private function sendWithPHPMailer($toEmail, $subject, $htmlBody) {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $this->smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $this->smtpUsername;
            $mail->Password = $this->smtpPassword;
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $this->smtpPort;
            
            // Recipients
            $mail->setFrom($this->fromEmail, $this->fromName);
            $mail->addAddress($toEmail);
            
            // Content
            $mail->CharSet = 'UTF-8';
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;
            $mail->AltBody = strip_tags($htmlBody);
            
            $mail->send();
            
            return ['success' => true, 'message' => 'Email sent successfully'];
            
        } catch (Exception $e) {
            throw new Exception('PHPMailer error: ' . $mail->ErrorInfo);
        }
    }
    
    /**
     * Send with attachment using PHPMailer
     */
    private function sendWithPHPMailerAttachment($toEmail, $subject, $htmlBody, $attachmentContent, $attachmentName) {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $this->smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $this->smtpUsername;
            $mail->Password = $this->smtpPassword;
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $this->smtpPort;
            
            // Recipients
            $mail->setFrom($this->fromEmail, $this->fromName);
            $mail->addAddress($toEmail);
            
            // Attachment
            $mail->addStringAttachment($attachmentContent, $attachmentName, 'base64', 'application/pdf');
            
            // Content
            $mail->CharSet = 'UTF-8';
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $htmlBody;
            $mail->AltBody = strip_tags($htmlBody);
            
            $mail->send();
            
            return ['success' => true, 'message' => 'Email with attachment sent successfully'];
            
        } catch (Exception $e) {
            throw new Exception('PHPMailer error: ' . $mail->ErrorInfo);
        }
    }
    
    /**
     * Fallback method using PHP mail with SMTP headers
     */
    private function sendWithPHPMail($toEmail, $subject, $htmlBody) {
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=ISO-8859-1',
            'From: ' . $this->fromName . ' <' . $this->fromEmail . '>',
            'Reply-To: ' . $this->adminEmail,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Transfer-Encoding: 8bit'
        ];
        
        $success = mail($toEmail, $subject, $htmlBody, implode("\r\n", $headers));
        
        if ($success) {
            return ['success' => true, 'message' => 'Email sent successfully'];
        } else {
            throw new Exception('PHP mail failed');
        }
    }
    
    /**
     * Fallback method with attachment
     */
    private function sendWithPHPMailAttachment($toEmail, $subject, $htmlBody, $attachmentContent, $attachmentName) {
        $boundary = "boundary_" . md5(time());
        
        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
            'From: ' . $this->fromName . ' <' . $this->fromEmail . '>',
            'Reply-To: ' . $this->adminEmail,
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $message = "--" . $boundary . "\r\n";
        $message .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $message .= $htmlBody . "\r\n\r\n";
        
        // Add attachment
        $message .= "--" . $boundary . "\r\n";
        $message .= "Content-Type: application/pdf; name=\"$attachmentName\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"$attachmentName\"\r\n\r\n";
        $message .= chunk_split(base64_encode($attachmentContent)) . "\r\n\r\n";
        
        $message .= "--" . $boundary . "--";
        
        $success = mail($toEmail, $subject, $message, implode("\r\n", $headers));
        
        if ($success) {
            return ['success' => true, 'message' => 'Email with attachment sent successfully'];
        } else {
            throw new Exception('PHP mail with attachment failed');
        }
    }
    
    /**
     * OTP email template
     */
    private function getOTPTemplate($recipientName, $otp) {
        $name = htmlspecialchars($recipientName);
        
        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>OTP Verification - Safety Research Foundation</title>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
    
    <!-- Header with logo -->
    <div style='background-color: #ffffff; padding: 20px 0; border-bottom: 3px solid #3498db;'>
        <div style='max-width: 600px; margin: 0 auto; text-align: center;'>
            <div style='font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: 0.3px;'>Safety Research Foundation</div>
        </div>
    </div>
    
    <!-- Main content -->
    <div style='max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;'>
        
        <!-- Hero section -->
        <div style='background-color: #c0392b; background-image: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 40px 30px; text-align: center; color: #ffffff;'>
            <div style='font-size: 40px; margin-bottom: 20px;'>&#128274;</div>
            <h1 style='margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;'>OTP Verification</h1>
            <p style='margin: 10px 0 0; font-size: 18px; opacity: 0.92; color: #ffffff;'>Your One-Time Password</p>
        </div>
        
        <!-- Content section -->
        <div style='padding: 40px 30px;'>
            
            <p style='font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;'>
                Dear <strong>{$name}</strong>,
            </p>
            
            <p style='font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;'>
                Thank you for taking the Road Safety Pledge. To complete your submission, please use the following One-Time Password (OTP):
            </p>
            
            <!-- OTP Display -->
            <div style='background-color: #f8f9fa; border: 2px dashed #3498db; padding: 30px; margin: 30px 0; text-align: center; border-radius: 10px;'>
                <h3 style='margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;'>Your OTP Code</h3>
                <div style='font-size: 36px; font-weight: bold; color: #3498db; letter-spacing: 8px; font-family: monospace; background: white; padding: 15px; border-radius: 5px; display: inline-block;'>
                    {$otp}
                </div>
            </div>
            
            <!-- Instructions -->
            <div style='background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; margin: 30px 0; border-radius: 8px;'>
                <h3 style='margin: 0 0 10px 0; color: #856404; font-size: 16px;'>&#128203; Important Instructions</h3>
                <ul style='margin: 0; padding-left: 20px; color: #856404; font-size: 14px;'>
                    <li style='margin-bottom: 5px;'>This OTP is valid for 10 minutes only</li>
                    <li style='margin-bottom: 5px;'>Do not share this OTP with anyone</li>
                    <li style='margin-bottom: 5px;'>Enter the OTP in the pledge form to complete submission</li>
                    <li style='margin-bottom: 0;'>If you didn't request this, please ignore this email</li>
                </ul>
            </div>
            
            <p style='font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;'>
                Thank you for your commitment to road safety!
            </p>
            
        </div>
        
        <!-- Footer -->
        <div style='background-color: #2c3e50; padding: 30px; text-align: center; color: white;'>
            <h3 style='margin: 0 0 15px 0; font-size: 20px;'>Safety Research Foundation</h3>
            <p style='margin: 0 0 20px; opacity: 0.8; font-size: 14px;'>Making Roads Safer Through Education and Awareness</p>
            
            <div style='font-size: 12px; opacity: 0.7; line-height: 1.5;'>
                <p style='margin: 5px 0;'>&#128231; Email: info@safetyresearchfoundation.org</p>
                <p style='margin: 5px 0;'>&#127760; Website: www.safetyresearchfoundation.org</p>
            </div>
        </div>
    </div>
    
    <!-- Footer note -->
    <div style='text-align: center; padding: 20px; color: #666; font-size: 12px;'>
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2025-26 Safety Research Foundation. All rights reserved.</p>
    </div>
    
</body>
</html>";
    }
    
    /**
     * Certificate email template (reusing from previous EmailService)
     */
    private function getEmailTemplate($recipientName, $pledgeTitle) {
        $name = htmlspecialchars($recipientName);
        $title = htmlspecialchars($pledgeTitle);
        
        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Road Safety Pledge Certificate</title>
</head>
<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
    
    <!-- Header with logo -->
    <div style='background-color: #ffffff; padding: 20px 0; border-bottom: 3px solid #3498db;'>
        <div style='max-width: 600px; margin: 0 auto; text-align: center;'>
            <div style='font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: 0.3px;'>Safety Research Foundation</div>
        </div>
    </div>
    
    <!-- Main content -->
    <div style='max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;'>
        
        <!-- Hero section -->
        <div style='background-color: #2980b9; background-image: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 40px 30px; text-align: center; color: #ffffff;'>
            <div style='font-size: 40px; margin-bottom: 20px;'>&#128737;&#65039;</div>
            <h1 style='margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;'>Congratulations!</h1>
            <p style='margin: 10px 0 0; font-size: 18px; opacity: 0.92; color: #ffffff;'>Your Road Safety Pledge Certificate</p>
        </div>
        
        <!-- Content section -->
        <div style='padding: 40px 30px;'>
            
            <p style='font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;'>
                Dear <strong>{$name}</strong>,
            </p>
            
            <p style='font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;'>
                Thank you for taking the <strong>{$title}</strong>. Your commitment to road safety makes a real difference in our community. As a Safety Ambassador, you're now part of a growing movement dedicated to making Indian roads safer for everyone.
            </p>
            
            <!-- Certificate info box -->
            <div style='background-color: #f8f9fa; border-left: 4px solid #3498db; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;'>
                <h3 style='margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;'>&#128203; Your Certificate Details</h3>
                <ul style='margin: 0; padding-left: 20px; color: #555;'>
                    <li style='margin-bottom: 8px;'>Certificate of Commitment</li>
                    <li style='margin-bottom: 8px;'>Safety Ambassador Status</li>
                    <li style='margin-bottom: 8px;'>Valid for Lifetime</li>
                    <li style='margin-bottom: 0;'>Recognized by Safety Research Foundation</li>
                </ul>
            </div>
            
            <!-- Attachment notice -->
            <div style='background-color: #e8f5e8; border: 1px solid #d4edda; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;'>
                <h3 style='margin: 0 0 10px 0; color: #155724; font-size: 18px;'>&#128206; Certificate Attached</h3>
                <p style='margin: 0; color: #155724;'>
                    Your official certificate is attached to this email as a PDF file.
                </p>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style='background-color: #2c3e50; padding: 30px; text-align: center; color: white;'>
            <h3 style='margin: 0 0 15px 0; font-size: 20px;'>Safety Research Foundation</h3>
            <p style='margin: 0 0 20px; opacity: 0.8; font-size: 14px;'>Making Roads Safer Through Education and Awareness</p>
            
            <div style='font-size: 12px; opacity: 0.7; line-height: 1.5;'>
                <p style='margin: 5px 0;'>&#128231; Email: info@safetyresearchfoundation.org</p>
                <p style='margin: 5px 0;'>&#127760; Website: www.safetyresearchfoundation.org</p>
            </div>
        </div>
    </div>
    
    <!-- Footer note -->
    <div style='text-align: center; padding: 20px; color: #666; font-size: 12px;'>
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2025-26 Safety Research Foundation. All rights reserved.</p>
    </div>
    
</body>
</html>";
    }
    
    /**
     * Send notification email to admin
     */
    public function sendAdminNotification($submissionDetails) {
        try {
            $headers = [
                'MIME-Version: 1.0',
                'Content-Type: text/html; charset=ISO-8859-1',
                'From: ' . $this->fromName . ' <' . $this->fromEmail . '>',
                'Reply-To: ' . $this->adminEmail
            ];
            
            $subject = "New Pledge Submission - " . $submissionDetails['name'];
            
            $body = $this->getAdminNotificationTemplate($submissionDetails);
            
            if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
                return $this->sendWithPHPMailer($this->adminEmail, $subject, $body);
            } else {
                $success = mail($this->adminEmail, $subject, $body, implode("\r\n", $headers));
                return $success;
            }
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    /**
     * Admin notification email template
     */
    private function getAdminNotificationTemplate($details) {
        return "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>New Pledge Submission</title>
</head>
<body style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
    <div style='max-width: 600px; margin: 20px auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>
        <h2 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>🛡️ New Pledge Submission</h2>
        
        <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
            <h3 style='margin: 0 0 15px 0; color: #2c3e50;'>Submission Details:</h3>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>Name:</td><td style='padding: 5px;'>{$details['name']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>Email:</td><td style='padding: 5px;'>{$details['email']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>Mobile:</td><td style='padding: 5px;'>{$details['mobile']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>State:</td><td style='padding: 5px;'>{$details['state']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>District:</td><td style='padding: 5px;'>{$details['district']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>Language:</td><td style='padding: 5px;'>{$details['language']}</td></tr>
                <tr><td style='padding: 5px; font-weight: bold; color: #555;'>Date:</td><td style='padding: 5px;'>{$details['created_at']}</td></tr>
            </table>
        </div>
        
        <p style='color: #666; font-size: 14px; margin-top: 20px;'>
            This is an automated notification from the Safety Research Foundation Pledge System.
        </p>
    </div>
</body>
</html>";
    }
}
?>


