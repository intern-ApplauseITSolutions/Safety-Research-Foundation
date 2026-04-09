<?php
/**
 * Email Service for Pledge Certificates
 * Safety Research Foundation
 */

class EmailService {
    private $fromEmail = 'noreply@safetyresearchfoundation.org';
    private $fromName = 'Safety Research Foundation';
    private $adminEmail = 'admin@safetyresearchfoundation.org';
    
    /**
     * Send pledge certificate email
     */
    public function sendPledgeCertificate($recipientEmail, $recipientName, $certificatePath, $pledgeTitle) {
        try {
            // Create email headers
            $headers = [
                'MIME-Version: 1.0',
                'Content-Type: multipart/mixed; boundary="boundary"',
                'From: ' . $this->fromName . ' <' . $this->fromEmail . '>',
                'Reply-To: ' . $this->adminEmail,
                'X-Mailer: PHP/' . phpversion()
            ];
            
            // Email subject
            $subject = "Your Road Safety Pledge Certificate - Safety Research Foundation";
            
            // Email body with HTML formatting
            $htmlBody = $this->getEmailTemplate($recipientName, $pledgeTitle);
            
            // Read certificate file
            $certificateContent = file_get_contents($certificatePath);
            $certificateName = basename($certificatePath);
            
            // Create email body with attachment
            $body = $this->createEmailWithAttachment($htmlBody, $certificateContent, $certificateName);
            
            // Send email
            $success = mail($recipientEmail, $subject, $body, implode("\r\n", $headers));
            
            if ($success) {
                return [
                    'success' => true,
                    'message' => 'Certificate sent successfully'
                ];
            } else {
                throw new Exception('Failed to send email');
            }
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Get HTML email template with proper formatting and logo
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
            <div style='width: 120px; height: 60px; margin: 0 auto; background: url(\"cid:logo\") center/contain no-repeat;'></div>
        </div>
    </div>
    
    <!-- Main content -->
    <div style='max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;'>
        
        <!-- Hero section -->
        <div style='background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 40px 30px; text-align: center; color: white;'>
            <div style='font-size: 48px; margin-bottom: 20px;'>🛡️</div>
            <h1 style='margin: 0; font-size: 28px; font-weight: bold;'>Congratulations!</h1>
            <p style='margin: 10px 0 0; font-size: 18px; opacity: 0.9;'>Your Road Safety Pledge Certificate</p>
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
                <h3 style='margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;'>📋 Your Certificate Details</h3>
                <ul style='margin: 0; padding-left: 20px; color: #555;'>
                    <li style='margin-bottom: 8px;'>Certificate of Commitment</li>
                    <li style='margin-bottom: 8px;'>Safety Ambassador Status</li>
                    <li style='margin-bottom: 8px;'>Valid for Lifetime</li>
                    <li style='margin-bottom: 0;'>Recognized by Safety Research Foundation</li>
                </ul>
            </div>
            
            <!-- Call to action -->
            <div style='background-color: #e8f5e8; border: 1px solid #d4edda; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;'>
                <h3 style='margin: 0 0 10px 0; color: #155724; font-size: 18px;'>🌟 Share Your Achievement</h3>
                <p style='margin: 0; color: #155724;'>
                    Share your certificate on social media to inspire others to take the pledge!
                </p>
            </div>
            
            <!-- Instructions -->
            <div style='margin-top: 30px; padding: 20px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;'>
                <h3 style='margin: 0 0 10px 0; color: #856404; font-size: 16px;'>📎 Important Information</h3>
                <ul style='margin: 0; padding-left: 20px; color: #856404; font-size: 14px;'>
                    <li style='margin-bottom: 5px;'>Your official certificate is attached to this email</li>
                    <li style='margin-bottom: 5px;'>Please save it for your records</li>
                    <li style='margin-bottom: 5px;'>You can use this certificate to showcase your commitment</li>
                    <li style='margin-bottom: 0;'>For any queries, reply to this email</li>
                </ul>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style='background-color: #2c3e50; padding: 30px; text-align: center; color: white;'>
            <h3 style='margin: 0 0 15px 0; font-size: 20px;'>Safety Research Foundation</h3>
            <p style='margin: 0 0 20px; opacity: 0.8; font-size: 14px;'>Making Roads Safer Through Education and Awareness</p>
            
            <!-- Contact info -->
            <div style='font-size: 12px; opacity: 0.7; line-height: 1.5;'>
                <p style='margin: 5px 0;'>📧 Email: info@safetyresearchfoundation.org</p>
                <p style='margin: 5px 0;'>🌐 Website: www.safetyresearchfoundation.org</p>
                <p style='margin: 5px 0;'>📱 Phone: +91-XXXXXXXXXX</p>
            </div>
            
            <!-- Social media links -->
            <div style='margin-top: 20px;'>
                <span style='margin: 0 10px; font-size: 20px;'>📘</span>
                <span style='margin: 0 10px; font-size: 20px;'>🐦</span>
                <span style='margin: 0 10px; font-size: 20px;'>📷</span>
                <span style='margin: 0 10px; font-size: 20px;'>💼</span>
            </div>
        </div>
    </div>
    
    <!-- Footer note -->
    <div style='text-align: center; padding: 20px; color: #666; font-size: 12px;'>
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>© 2025-26 Safety Research Foundation. All rights reserved.</p>
    </div>
    
</body>
</html>";
    }
    
    /**
     * Create email with attachment
     */
    private function createEmailWithAttachment($htmlBody, $attachmentContent, $attachmentName) {
        $boundary = "boundary";
        
        $message = "--$boundary\r\n";
        $message .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $message .= $htmlBody . "\r\n\r\n";
        
        // Add attachment
        $message .= "--$boundary\r\n";
        $message .= "Content-Type: application/pdf; name=\"$attachmentName\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"$attachmentName\"\r\n\r\n";
        $message .= chunk_split(base64_encode($attachmentContent)) . "\r\n\r\n";
        
        $message .= "--$boundary--";
        
        return $message;
    }
    
    /**
     * Send notification email to admin
     */
    public function notifyAdmin($submissionDetails) {
        try {
            $headers = [
                'MIME-Version: 1.0',
                'Content-Type: text/html; charset=ISO-8859-1',
                'From: ' . $this->fromName . ' <' . $this->fromEmail . '>',
                'Reply-To: ' . $this->adminEmail
            ];
            
            $subject = "New Pledge Submission - " . $submissionDetails['name'];
            
            $body = $this->getAdminNotificationTemplate($submissionDetails);
            
            $success = mail($this->adminEmail, $subject, $body, implode("\r\n", $headers));
            
            return $success;
            
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
