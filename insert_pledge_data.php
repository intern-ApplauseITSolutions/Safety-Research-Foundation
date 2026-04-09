<?php
/**
 * Quick script to insert pledge data
 * Run this script to populate the database with sample pledge data
 */

// Database configuration
$host = 'localhost';
$dbname = 'safety_research_foundation';
$username = 'root';
$password = '';

try {
    // Create database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h1>Inserting Pledge Data</h1>";
    
    // Check if pledge config already exists
    $checkQuery = "SELECT COUNT(*) FROM pledge_configs WHERE title = 'Road Safety Pledge 2025-26'";
    $stmt = $pdo->prepare($checkQuery);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        echo "<p style='color: green;'>✓ Pledge configuration already exists</p>";
    } else {
        // Insert pledge configuration
        $configQuery = "INSERT INTO pledge_configs (title, description, year, pledge_count, sample_certificate_url, status) VALUES 
                       ('Road Safety Pledge 2025-26', 'Join thousands of Indians in our commitment to make roads safer for everyone. Your pledge matters, your actions save lives.', '2025-26', 1247, '/assets/images/Road Safety Pledge.png', 'active')";
        
        $pdo->exec($configQuery);
        $configId = $pdo->lastInsertId();
        echo "<p style='color: green;'>✓ Pledge configuration inserted (ID: $configId)</p>";
        
        // Insert English content
        $englishContent = '[
            "I will always wear a helmet while riding a two-wheeler and ensure my pillion rider does the same.",
            "I will buckle up my seatbelt every time I am in a car, whether driving or as a passenger.",
            "I will ensure the safety of children by using proper child safety seats and encourage others to do the same.",
            "I will never drive under the influence of alcohol or drugs and motivate others to avoid drinking and driving.",
            "I will follow all traffic signals and road rules carefully and drive within speed limits.",
            "I will assist those in need during road emergencies and act as a Good Samaritan.",
            "I will promote road safety in my family, school, workplace, and community to inspire responsible behaviour on the roads.",
            "I commit to being a Safety Ambassador, spreading awareness, and working towards making our roads safer for everyone."
        ]';
        
        $englishQuery = "INSERT INTO pledge_content (config_id, language, pledge_title, pledge_points, form_instructions, status) VALUES 
                        (:config_id, 'English', 'Road Safety Pledge 2025-26', :content, 'Enter your details to take the road safety pledge and receive your certificate.', 'active')";
        
        $stmt = $pdo->prepare($englishQuery);
        $stmt->bindParam(':config_id', $configId);
        $stmt->bindParam(':content', $englishContent);
        $stmt->execute();
        echo "<p style='color: green;'>✓ English content inserted</p>";
        
        // Insert Hindi content
        $hindiContent = '[
            "मैं हमेशा दोपहिया वाहन चलाते समय हेलमेट पहनूंगा और सुनिश्चित करूंगा कि मेरा पीछे बैठने वाला भी ऐसा ही करे।",
            "मैं हर बार गाड़ी में बैठने पर सीटबेल्ट बांधूंगा, चाहे मैं ड्राइव कर रहा हो या यात्री हो।",
            "मैं बच्चों की सुरक्षा के लिए उचित चाइल्ड सेफ्टी सीट का उपयोग करूंगा और दूसरों को भी ऐसा करने के लिए प्रोत्साहित करूंगा।",
            "मैं कभी भी शराब या नशीली दवाओं के प्रभाव में वाहन नहीं चलाऊंगा और दूसरों को भी शराब पीकर गाड़ी न चलाने के लिए प्रेरित करूंगा।",
            "मैं सभी ट्रैफिक सिग्नल और सड़क नियमों का ध्यानपूर्वक पालन करूंगा और गति सीमा के भीतर वाहन चलाऊंगा।",
            "मैं सड़क आपात स्थितियों में जरूरतमंदों की मदद करूंगा और एक अच्छे समरिथन की तरह काम करूंगा।",
            "मैं अपने परिवार, स्कूल, कार्यस्थल और समुदाय में सड़क सुरक्षा को बढ़ावा दूंगा ताकि सड़कों पर जिम्मेदारी भरा व्यवहार प्रेरित हो सके।",
            "मैं एक सुरक्षा दूत बनने के लिए प्रतिबद्ध हूं, जागरूकता फैलाऊंगा और हमारी सड़कों को सभी के लिए सुरक्षित बनाने के लिए काम करूंगा।"
        ]';
        
        $hindiQuery = "INSERT INTO pledge_content (config_id, language, pledge_title, pledge_points, form_instructions, status) VALUES 
                      (:config_id, 'Hindi', 'सड़क सुरक्षा शपथ 2025-26', :content, 'सड़क सुरक्षा शपथ लेने और अपना प्रमाण पत्र प्राप्त करने के लिए अपना विवरण दर्ज करें।', 'active')";
        
        $stmt = $pdo->prepare($hindiQuery);
        $stmt->bindParam(':config_id', $configId);
        $stmt->bindParam(':content', $hindiContent);
        $stmt->execute();
        echo "<p style='color: green;'>✓ Hindi content inserted</p>";
    }
    
    // Verify data was inserted
    $verifyQuery = "SELECT pc.id, pc.title, pc.status, COUNT(pcc.id) as content_count 
                   FROM pledge_configs pc 
                   LEFT JOIN pledge_content pcc ON pc.id = pcc.config_id 
                   WHERE pc.status = 'active' 
                   GROUP BY pc.id";
    
    $stmt = $pdo->prepare($verifyQuery);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h2>Verification Results:</h2>";
    foreach ($results as $row) {
        echo "<div style='background: #f0f8ff; padding: 10px; margin: 5px 0; border-radius: 5px;'>";
        echo "<strong>ID:</strong> {$row['id']} | ";
        echo "<strong>Title:</strong> {$row['title']} | ";
        echo "<strong>Status:</strong> {$row['status']} | ";
        echo "<strong>Content Items:</strong> {$row['content_count']}";
        echo "</div>";
    }
    
    echo "<h2>Test API Endpoint:</h2>";
    echo "<p>Click here to test the public API: <a href='/api/public/pledge.php' target='_blank'>Test Pledge API</a></p>";
    
    echo "<div style='background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;'>";
        echo "<h2>✅ Setup Complete!</h2>";
        echo "<p><strong>Next Steps:</strong></p>";
        echo "<ol>";
        echo "<li>Visit the pledge page: <a href='/pledge'>/pledge</a></li>";
        echo "<li>Access admin panel: <a href='/admin'>/admin</a></li>";
        echo "<li>Configure pledge content in admin panel if needed</li>";
        echo "</ol>";
    echo "</div>";
    
} catch(PDOException $e) {
    echo "<p style='color: red;'>❌ Database Error: " . $e->getMessage() . "</p>";
    echo "<p>Please check your database connection settings and try again.</p>";
} catch(Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
}
?>
