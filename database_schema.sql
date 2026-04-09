-- Safety Research Foundation Database Schema
-- Created for Admin Dashboard System
-- Updated to support all event modules and media types

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS safety_research_foundation;
USE safety_research_foundation;

-- Admins table for authentication
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255) NULL,
    token_expiry DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events table for dynamic events management
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL COMMENT 'School Program, Safety Audit, Awareness Session, Public Awareness, etc.',
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    full_description TEXT NULL,
    image VARCHAR(500) NULL,
    images JSON NULL COMMENT 'Array of image paths',
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    event_type ENUM('upcoming', 'completed', 'ongoing') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Media table for videos, images, audio, documents, and ebooks
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    type ENUM('video', 'image', 'document', 'audio', 'ebook') NOT NULL,
    category VARCHAR(100) NULL COMMENT 'Optional categorization within media type',
    file_url VARCHAR(500) NOT NULL COMMENT 'URL to the media file',
    thumbnail_url VARCHAR(500) NULL COMMENT 'Thumbnail URL for videos/documents',
    file_size VARCHAR(50) NULL COMMENT 'File size (e.g., "2.5 MB")',
    duration VARCHAR(50) NULL COMMENT 'Duration for videos/audio (e.g., "15:30")',
    video_id VARCHAR(50) NULL COMMENT 'YouTube video ID for video type',
    download_url VARCHAR(500) NULL COMMENT 'Download URL for documents/ebooks',
    external_url VARCHAR(500) NULL COMMENT 'External link (for YouTube videos, etc.)',
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    sort_order INT DEFAULT 0 COMMENT 'Order for display',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact enquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pledge configurations table for managing pledge content
CREATE TABLE IF NOT EXISTS pledge_configs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT 'Main pledge title like "Road Safety Pledge 2025-26"',
    description TEXT NULL COMMENT 'Main pledge description',
    year VARCHAR(20) NOT NULL DEFAULT '2025-26',
    pledge_count INT DEFAULT 0 COMMENT 'Total number of pledges taken',
    sample_certificate_url VARCHAR(500) NULL COMMENT 'Sample certificate image URL',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pledge content table for managing pledge points in multiple languages
CREATE TABLE IF NOT EXISTS pledge_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_id INT NOT NULL,
    language ENUM('English', 'Hindi') NOT NULL DEFAULT 'English',
    pledge_title VARCHAR(255) NOT NULL COMMENT 'Title displayed in pledge form',
    pledge_points JSON NOT NULL COMMENT 'Array of pledge points',
    form_instructions TEXT NULL COMMENT 'Instructions displayed in form',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (config_id) REFERENCES pledge_configs(id) ON DELETE CASCADE
);

-- Pledge submissions table for storing user pledge data
CREATE TABLE IF NOT EXISTS pledge_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_id INT NOT NULL,
    title VARCHAR(50) NULL,
    name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Others') NULL,
    dob DATE NULL,
    pincode VARCHAR(10) NULL,
    state VARCHAR(255) NULL,
    district VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    language ENUM('English', 'Hindi') DEFAULT 'English',
    otp_verified BOOLEAN DEFAULT FALSE,
    certificate_sent BOOLEAN DEFAULT FALSE,
    certificate_path VARCHAR(500) NULL COMMENT 'Path to generated PDF certificate',
    status ENUM('pending', 'verified', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (config_id) REFERENCES pledge_configs(id) ON DELETE CASCADE
);

-- Insert sample pledge configuration data
INSERT INTO pledge_configs (title, description, year, pledge_count, sample_certificate_url, status) VALUES
('Road Safety Pledge 2025-26', 'Join thousands of Indians in our commitment to make roads safer for everyone. Your pledge matters, your actions save lives.', '2025-26', 1247, '/assets/images/Road Safety Pledge.png', 'active');

-- Insert pledge content for English and Hindi
INSERT INTO pledge_content (config_id, language, pledge_title, pledge_points, form_instructions, status) VALUES
(1, 'English', 'Road Safety Pledge 2025-26', 
'[
    "I will always wear a helmet while riding a two-wheeler and ensure my pillion rider does the same.",
    "I will buckle up my seatbelt every time I am in a car, whether driving or as a passenger.",
    "I will ensure the safety of children by using proper child safety seats and encourage others to do the same.",
    "I will never drive under the influence of alcohol or drugs and motivate others to avoid drinking and driving.",
    "I will follow all traffic signals and road rules carefully and drive within speed limits.",
    "I will assist those in need during road emergencies and act as a Good Samaritan.",
    "I will promote road safety in my family, school, workplace, and community to inspire responsible behaviour on the roads.",
    "I commit to being a Safety Ambassador, spreading awareness, and working towards making our roads safer for everyone."
]', 
'Enter your details to take the road safety pledge and receive your certificate.', 'active'),

(1, 'Hindi', 'सड़क सुरक्षा शपथ 2025-26', 
'[
    "मैं हमेशा दोपहिया वाहन चलाते समय हेलमेट पहनूंगा और सुनिश्चित करूंगा कि मेरा पीछे बैठने वाला भी ऐसा ही करे।",
    "मैं हर बार गाड़ी में बैठने पर सीटबेल्ट बांधूंगा, चाहे मैं ड्राइव कर रहा हो या यात्री हो।",
    "मैं बच्चों की सुरक्षा के लिए उचित चाइल्ड सेफ्टी सीट का उपयोग करूंगा और दूसरों को भी ऐसा करने के लिए प्रोत्साहित करूंगा।",
    "मैं कभी भी शराब या नशीली दवाओं के प्रभाव में वाहन नहीं चलाऊंगा और दूसरों को भी शराब पीकर गाड़ी न चलाने के लिए प्रेरित करूंगा।",
    "मैं सभी ट्रैफिक सिग्नल और सड़क नियमों का ध्यानपूर्वक पालन करूंगा और गति सीमा के भीतर वाहन चलाऊंगा।",
    "मैं सड़क आपात स्थितियों में जरूरतमंदों की मदद करूंगा और एक अच्छे समरिथन की तरह काम करूंगा।",
    "मैं अपने परिवार, स्कूल, कार्यस्थल और समुदाय में सड़क सुरक्षा को बढ़ावा दूंगा ताकि सड़कों पर जिम्मेदारी भरा व्यवहार प्रेरित हो सके।",
    "मैं एक सुरक्षा दूत बनने के लिए प्रतिबद्ध हूं, जागरूकता फैलाऊंगा और हमारी सड़कों को सभी के लिए सुरक्षित बनाने के लिए काम करूंगा।"
]', 
'सड़क सुरक्षा शपथ लेने और अपना प्रमाण पत्र प्राप्त करने के लिए अपना विवरण दर्ज करें।', 'active');

-- Insert default admin user (password: admin123)
INSERT INTO admins (email, password) VALUES
('admin@safetyresearchfoundation.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE email = email;

-- Insert sample events data based on existing static content
INSERT INTO events (title, date, location, category, excerpt, content, full_description, image, featured, event_type) VALUES
('Parent Awareness & Child Car Seat Safety Sessions', '20th – 21st December 2025', 'Bengaluru', 'Awareness Session', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use...', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use. Practical demonstrations helped address misconceptions and encouraged safer travel practices for children.', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use. Practical demonstrations helped address misconceptions and encouraged safer travel practices for children.\n\nThe sessions included comprehensive demonstrations on proper installation techniques for child car seats, understanding different types of seats for various age groups, and the critical importance of seatbelt usage for child safety. Parents received hands-on training with their own vehicles, ensuring they could correctly install and use child safety seats.\n\nKey Topics Covered:\n- Proper installation of child car seats (ISOFIX and seatbelt-mounted)\n- Age-appropriate seat selection for different weight and height groups\n- Common mistakes in child car seat usage and how to avoid them\n- Importance of rear-facing seats for infants and toddlers\n- Seatbelt safety for older children\n- Legal requirements and safety standards\n\nThe interactive format allowed parents to ask questions, practice installations, and gain confidence in protecting their children during travel. Many parents expressed gratitude for the practical, hands-on approach that made the learning experience memorable and immediately applicable.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Road Safety Mural & Employee Engagement Initiative', '17th January 2026', 'Bengaluru', 'Public Awareness', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police...', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police. The initiative created a permanent visual reminder of road safety while strengthening community and corporate engagement.', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police. The initiative created a permanent visual reminder of road safety while strengthening community and corporate engagement.\n\nThis unique initiative brought together diverse stakeholders - school students, corporate employees, and traffic police personnel - to create vibrant murals depicting road safety messages. The collaborative art project not only beautified public spaces but also served as a lasting educational tool for the community.\n\nKey Highlights:\n- Collaborative mural painting with students, Bosch India employees, and traffic police\n- Permanent visual road safety reminders in high-traffic areas\n- Community engagement through creative expression\n- Corporate social responsibility partnership with Bosch India\n- Interactive learning about road safety through art\n- Strengthening bonds between community, corporates, and law enforcement\n\nThe murals featured key road safety messages including helmet usage, pedestrian safety, traffic signal compliance, and safe driving practices. Participants expressed enthusiasm about contributing to road safety awareness through creative means, making the initiative both educational and enjoyable.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('National Road Safety Month 2026 – Community Outreach', '16th – 17th January 2026', 'Bengaluru', 'Public Awareness', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions...', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions. These high-visibility interventions promoted helmet use, pedestrian safety, and responsible road behaviour.', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions. These high-visibility interventions promoted helmet use, pedestrian safety, and responsible road behaviour.\n\nThe campaign utilized innovative approaches to reach diverse audiences across Bengaluru. Street plays performed at busy traffic signals captured the attention of commuters, while school competitions engaged young minds in road safety education. Community sessions provided platforms for interactive discussions on safe road practices.\n\nKey Activities:\n- Street plays (nukkad natak) at major traffic signals\n- Interactive community awareness sessions\n- School-level road safety competitions\n- Distribution of educational materials and safety gear\n- Engagement with traffic police and local authorities\n- Focus on helmet usage, pedestrian safety, and traffic rule compliance\n\nThe creative approach made road safety messages memorable and impactful. Commuters stopped to watch street plays, students enthusiastically participated in competitions, and community members engaged in meaningful discussions about improving road safety in their neighborhoods.\n\nImpact:\n- Reached thousands of road users across multiple locations\n- Created awareness about National Road Safety Month\n- Encouraged behavioral change through creative engagement\n- Strengthened community participation in road safety initiatives\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Driver & School Transport Staff Safety Training', '18th – 22nd November 2025', 'Bengaluru', 'School Program', 'As part of Project BRACE, SRF trained school bus drivers and support staff on defensive driving, danger zones, and emergency preparedness...', 'As part of Project BRACE, SRF trained school bus drivers and support staff on defensive driving, danger zones, and emergency preparedness. The sessions reinforced legal compliance and strengthened safety within daily school transport operations.', 'As part of Project BRACE, SRF trained school bus drivers and support staff on defensive driving, danger zones, and emergency preparedness. The sessions reinforced legal compliance and strengthened safety within daily school transport operations.\n\nRecognizing that school transport staff play a critical role in child safety, SRF designed comprehensive training modules covering technical driving skills, safety protocols, and emergency response procedures. The training emphasized the special responsibility of transporting children and the need for heightened safety awareness.\n\nTraining Modules:\n- Defensive driving techniques for urban environments\n- Understanding and avoiding danger zones around school buses\n- Emergency preparedness and evacuation procedures\n- Legal compliance - Motor Vehicle Act provisions for school transport\n- Child safety protocols during boarding and alighting\n- Vehicle maintenance and pre-trip inspection procedures\n- Communication with parents, schools, and authorities\n\nThe hands-on training included practical demonstrations, scenario-based learning, and interactive discussions. Drivers and support staff appreciated the focus on real-world situations they encounter daily, making the training immediately applicable to their work.\n\nImpact:\n- Enhanced safety awareness among school transport staff\n- Improved understanding of legal requirements and compliance\n- Better emergency preparedness for school transport operations\n- Strengthened safety culture in school transport ecosystem\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Safe School Zone Infrastructure Improvements', '1st – 3rd February 2026', 'Bengaluru', 'Safety Audit', 'Based on school zone audit findings, targeted infrastructure improvements were initiated, including safety signages and school zone markings...', 'Based on school zone audit findings, targeted infrastructure improvements were initiated, including safety signages and school zone markings. These interventions aim to improve visibility, reduce conflict points, and create safer, child-friendly environments around schools.', 'Based on school zone audit findings, targeted infrastructure improvements were initiated, including safety signages and school zone markings. These interventions aim to improve visibility, reduce conflict points, and create safer, child-friendly environments around schools.\n\nFollowing comprehensive road safety audits around school zones, SRF worked with authorities to implement evidence-based infrastructure improvements. The interventions focused on creating safer environments for children walking to and from school, addressing identified hazards and improving overall safety.\n\nInfrastructure Improvements:\n- Installation of school zone warning signages\n- Enhanced road markings for school zones\n- Improved pedestrian crossing facilities\n- Speed calming measures near school entrances\n- Better visibility improvements at conflict points\n- Child-friendly street design elements\n\nThe improvements were based on detailed audit findings that identified specific safety concerns at each location. By addressing these concerns systematically, the project aims to reduce risks for children and create more walkable, child-friendly school environments.\n\nExpected Outcomes:\n- Reduced vehicle speeds in school zones\n- Improved visibility of school zones to drivers\n- Safer pedestrian crossings for children\n- Reduced conflict points between vehicles and pedestrians\n- Enhanced overall safety in school neighborhoods\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('School Zone Road Safety Audits in Bengaluru', '27th – 31st January 2026', 'Bengaluru', 'Safety Audit', 'SRF carried out on-ground road safety audits around school zones to identify pedestrian risks, unsafe crossings, and infrastructure gaps...', 'SRF carried out on-ground road safety audits around school zones to identify pedestrian risks, unsafe crossings, and infrastructure gaps. The findings were shared with authorities to support safer school environments and child-friendly streets.', 'SRF carried out on-ground road safety audits around school zones to identify pedestrian risks, unsafe crossings, and infrastructure gaps. The findings were shared with authorities to support safer school environments and child-friendly streets.\n\nThe comprehensive audits employed scientific methodologies to assess road safety conditions around schools. SRF\'s team of road safety experts conducted detailed site assessments, analyzing traffic patterns, infrastructure conditions, and potential hazards that could endanger children.\n\nAudit Methodology:\n- Systematic site assessments of school zone areas\n- Traffic volume and speed studies during school hours\n- Pedestrian movement pattern analysis\n- Infrastructure condition assessment\n- Identification of conflict points and hazards\n- Stakeholder consultations with schools and parents\n- Photographic documentation of safety concerns\n\nKey Findings:\n- Inadequate pedestrian crossing facilities near school entrances\n- Missing or faded school zone signages\n- High vehicle speeds in school zones\n- Insufficient traffic calming measures\n- Poor visibility at key crossing points\n- Infrastructure gaps affecting child safety\n\nThe detailed audit reports were shared with traffic police, municipal authorities, and school administrations, providing evidence-based recommendations for improvements. The audits form the foundation for targeted interventions to create safer school zones.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Road Safety Awareness for School Children – Project BRACE', '27th – 31st January 2026', 'Bengaluru', 'School Program', 'Under Project BRACE, Safety Research Foundation conducted interactive road safety sessions across multiple Bengaluru schools, reaching thousands of students...', 'Under Project BRACE, Safety Research Foundation conducted interactive road safety sessions across multiple Bengaluru schools, reaching thousands of students. The sessions strengthened awareness on pedestrian safety, helmet use, road signs, and safe road behaviour.', 'Under Project BRACE, Safety Research Foundation conducted interactive road safety sessions across multiple Bengaluru schools, reaching thousands of students. The sessions strengthened awareness on pedestrian safety, helmet use, road signs, and safe road behaviour.\n\nProject BRACE (Building Road Awareness for Child Education) represents SRF\'s flagship school-based road safety education initiative. The program reached multiple schools across Bengaluru, delivering age-appropriate, interactive sessions that engaged students in learning about road safety through demonstrations, activities, and discussions.\n\nProgram Components:\n- Interactive presentations on road safety fundamentals\n- Pedestrian safety - safe crossing techniques and awareness\n- Importance of helmet use for two-wheeler riders\n- Understanding road signs and traffic signals\n- Safe behavior as passengers in vehicles\n- Bicycle safety rules and practices\n- Real-life examples and case studies\n\nThe sessions were designed to be highly interactive, encouraging student participation through questions, demonstrations, and activities. Students learned not just the rules, but the reasons behind them, fostering a deeper understanding of road safety principles.\n\nKey Topics Covered:\n- Pedestrian rights and responsibilities\n- Safe road crossing techniques (zebra crossings, signals)\n- Helmet usage and its life-saving importance\n- Reading and understanding road signs\n- Safe behavior in school buses and other vehicles\n- Dangers of distracted walking and cycling\n- Being a responsible road user\n\nImpact:\n- Reached thousands of students across multiple schools\n- Enhanced road safety awareness among children\n- Encouraged students to share learnings with families\n- Created a foundation for lifelong safe road behavior\n- Strengthened school-community partnerships for road safety\n\nThe program\'s success lies in its ability to make road safety education engaging and memorable for young learners, ensuring they carry these lessons throughout their lives.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Child Safety Seat Awareness Session', '11th January 2025', 'Tuljabhavani Housing Society, Ravet, Pune', 'Awareness Session', 'On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session...', 'On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session at Tuljabhavani Housing Society, Ravet, Pune. The session received an overwhelming response from parents, who actively participated by asking insightful questions and trying out the demonstration of child safety seats in their own cars.', 'On the occasion of National Road Safety Week, Safety Research Foundation (SRF) organized a Child Safety Seat Awareness session at Tuljabhavani Housing Society, Ravet, Pune. The session received an overwhelming response from parents, who actively participated by asking insightful questions and trying out the demonstration of child safety seats in their own cars.\n\nThe program included an engaging presentation on the types of child safety seats suitable for various age and weight groups, the risks associated with improper or non-usage, and live demonstrations of installation techniques for both ISOFIX and seatbelt-mounted car seats. Parents gained hands-on experience by trying the child seats in their own cars, ensuring a practical understanding of the correct usage.\n\nAttendees appreciated the efforts of SRF, expressing gratitude for organizing such a meaningful and impactful session that emphasized the need for child safety on the roads.\n\nGlimpses of Program', NULL, TRUE, 'completed');

-- Insert sample media data
INSERT INTO media (title, description, type, file_url, thumbnail_url, video_id, external_url, featured, sort_order) VALUES
('Road Safety Awareness - SRF', 'Road safety awareness video by Safety Research Foundation', 'video', '', '', 'dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', TRUE, 1),
('Child Safety Seat Demonstration', 'Demonstration of proper child safety seat installation', 'video', '', '', 'abc123xyz', 'https://www.youtube.com/watch?v=abc123xyz', FALSE, 2),
('BRACE Project Overview', 'Building Road Awareness for Child Education project overview', 'video', '', '', 'def456uvw', 'https://www.youtube.com/watch?v=def456uvw', FALSE, 3),
('Road Safety Training Session', 'Road safety training for school children', 'image', '/assets/images/road-safety-training.jpg', '/assets/images/road-safety-training-thumb.jpg', NULL, NULL, TRUE, 1),
('School Zone Audit', 'School zone road safety audit in progress', 'image', '/assets/images/school-audit.jpg', '/assets/images/school-audit-thumb.jpg', NULL, NULL, FALSE, 2),
('Safety Infrastructure', 'New safety infrastructure installation', 'image', '/assets/images/infrastructure.jpg', '/assets/images/infrastructure-thumb.jpg', NULL, NULL, FALSE, 3),
('BRACE Handbook', 'Comprehensive road safety handbook for schools', 'ebook', '/assets/ebooks/BRACE-Handbook.pdf', '/assets/images/brace-handbook-cover.png', NULL, NULL, TRUE, 1),
('Roadwise Kannada Guide', 'Road safety guide in Kannada language', 'ebook', '/assets/ebooks/ROADWISE-Kannada.pdf', '/assets/images/roadwise-kannada-cover.png', NULL, NULL, FALSE, 2),
('BOSCH Creative Audio 01', 'Road safety awareness audio jingle', 'audio', '/assets/audio/bosch-creative-01.mp3', NULL, NULL, NULL, FALSE, 1),
('BOSCH Creative Audio 02', 'Road safety awareness audio jingle', 'audio', '/assets/audio/bosch-creative-02.mp3', NULL, NULL, NULL, FALSE, 2),
('Times of India Coverage', 'SRF featured in Times of India', 'document', '/assets/documents/toi-coverage.pdf', '/assets/images/toi-coverage-thumb.jpg', NULL, NULL, FALSE, 1),
('Indian Express Article', 'Road safety awareness article', 'document', '/assets/documents/indian-express.pdf', '/assets/images/indian-express-thumb.jpg', NULL, NULL, FALSE, 2);

-- Insert sample pledge configuration data
INSERT INTO pledge_configs (title, description, year, pledge_count, sample_certificate_url, status) VALUES
('Road Safety Pledge 2025-26', 'Join thousands of Indians in our commitment to make roads safer for everyone. Your pledge matters, your actions save lives.', '2025-26', 1247, '/assets/images/Road Safety Pledge.png', 'active');

-- Insert pledge content for English and Hindi
INSERT INTO pledge_content (config_id, language, pledge_title, pledge_points, form_instructions, status) VALUES
(1, 'English', 'Road Safety Pledge 2025-26', 
'[
    "I will always wear a helmet while riding a two-wheeler and ensure my pillion rider does the same.",
    "I will buckle up my seatbelt every time I am in a car, whether driving or as a passenger.",
    "I will ensure the safety of children by using proper child safety seats and encourage others to do the same.",
    "I will never drive under the influence of alcohol or drugs and motivate others to avoid drinking and driving.",
    "I will follow all traffic signals and road rules carefully and drive within speed limits.",
    "I will assist those in need during road emergencies and act as a Good Samaritan.",
    "I will promote road safety in my family, school, workplace, and community to inspire responsible behaviour on the roads.",
    "I commit to being a Safety Ambassador, spreading awareness, and working towards making our roads safer for everyone."
]', 
'Enter your details to take the road safety pledge and receive your certificate.', 'active'),

(1, 'Hindi', 'सड़क सुरक्षा शपथ 2025-26', 
'[
    "मैं हमेशा दोपहिया वाहन चलाते समय हेलमेट पहनूंगा और सुनिश्चित करूंगा कि मेरा पीछे बैठने वाला भी ऐसा ही करे।",
    "मैं हर बार गाड़ी में बैठने पर सीटबेल्ट बांधूंगा, चाहे मैं ड्राइव कर रहा हो या यात्री हो।",
    "मैं बच्चों की सुरक्षा के लिए उचित चाइल्ड सेफ्टी सीट का उपयोग करूंगा और दूसरों को भी ऐसा करने के लिए प्रोत्साहित करूंगा।",
    "मैं कभी भी शराब या नशीली दवाओं के प्रभाव में वाहन नहीं चलाऊंगा और दूसरों को भी शराब पीकर गाड़ी न चलाने के लिए प्रेरित करूंगा।",
    "मैं सभी ट्रैफिक सिग्नल और सड़क नियमों का ध्यानपूर्वक पालन करूंगा और गति सीमा के भीतर वाहन चलाऊंगा।",
    "मैं सड़क आपात स्थितियों में जरूरतमंदों की मदद करूंगा और एक अच्छे समरिथन की तरह काम करूंगा।",
    "मैं अपने परिवार, स्कूल, कार्यस्थल और समुदाय में सड़क सुरक्षा को बढ़ावा दूंगा ताकि सड़कों पर जिम्मेदारी भरा व्यवहार प्रेरित हो सके।",
    "मैं एक सुरक्षा दूत बनने के लिए प्रतिबद्ध हूं, जागरूकता फैलाऊंगा और हमारी सड़कों को सभी के लिए सुरक्षित बनाने के लिए काम करूंगा।"
]', 
'सड़क सुरक्षा शपथ लेने और अपना प्रमाण पत्र प्राप्त करने के लिए अपना विवरण दर्ज करें।', 'active');

-- Insert default admin user (password: admin123)
INSERT INTO admins (email, password) VALUES 
('admin@safetyresearchfoundation.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE email = email;

-- Insert sample events data based on existing static content
INSERT INTO events (title, date, location, category, excerpt, content, full_description, image, featured, event_type) VALUES 
('Parent Awareness & Child Car Seat Safety Sessions', '20th – 21st December 2025', 'Bengaluru', 'Awareness Session', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use...', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use. Practical demonstrations helped address misconceptions and encouraged safer travel practices for children.', 'SRF conducted hands-on parent awareness sessions focusing on child car seat safety and seatbelt use. Practical demonstrations helped address misconceptions and encouraged safer travel practices for children.\n\nThe sessions included comprehensive demonstrations on proper installation techniques for child car seats, understanding different types of seats for various age groups, and the critical importance of seatbelt usage for child safety. Parents received hands-on training with their own vehicles, ensuring they could correctly install and use child safety seats.\n\nKey Topics Covered:\n- Proper installation of child car seats (ISOFIX and seatbelt-mounted)\n- Age-appropriate seat selection for different weight and height groups\n- Common mistakes in child car seat usage and how to avoid them\n- Importance of rear-facing seats for infants and toddlers\n- Seatbelt safety for older children\n- Legal requirements and safety standards\n\nThe interactive format allowed parents to ask questions, practice installations, and gain confidence in protecting their children during travel. Many parents expressed gratitude for the practical, hands-on approach that made the learning experience memorable and immediately applicable.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('Road Safety Mural & Employee Engagement Initiative', '17th January 2026', 'Bengaluru', 'Public Awareness', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police...', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police. The initiative created a permanent visual reminder of road safety while strengthening community and corporate engagement.', 'SRF, with support from Bosch India, organised a road safety mural painting activity involving students, employees, and traffic police. The initiative created a permanent visual reminder of road safety while strengthening community and corporate engagement.\n\nThis unique initiative brought together diverse stakeholders - school students, corporate employees, and traffic police personnel - to create vibrant murals depicting road safety messages. The collaborative art project not only beautified public spaces but also served as a lasting educational tool for the community.\n\nKey Highlights:\n- Collaborative mural painting with students, Bosch India employees, and traffic police\n- Permanent visual road safety reminders in high-traffic areas\n- Community engagement through creative expression\n- Corporate social responsibility partnership with Bosch India\n- Interactive learning about road safety through art\n- Strengthening bonds between community, corporates, and law enforcement\n\nThe murals featured key road safety messages including helmet usage, pedestrian safety, traffic signal compliance, and safe driving practices. Participants expressed enthusiasm about contributing to road safety awareness through creative means, making the initiative both educational and enjoyable.\n\nGlimpses of Program', NULL, TRUE, 'completed'),

('National Road Safety Month 2026 – Community Outreach', '16th – 17th January 2026', 'Bengaluru', 'Public Awareness', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions...', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions. These high-visibility interventions promoted helmet use, pedestrian safety, and responsible road behaviour.', 'During National Road Safety Month, SRF led creative public awareness activities including street plays at traffic signals, community sessions, and school competitions. These high-visibility interventions promoted helmet use, pedestrian safety, and responsible road behaviour.\n\nThe campaign utilized innovative approaches to reach diverse audiences across Bengaluru. Street plays performed at busy traffic signals captured the attention of commuters, while school competitions engaged young minds in road safety education. Community sessions provided platforms for interactive discussions on safe road practices.\n\nKey Activities:\n- Street plays (nukkad natak) at major traffic signals\n- Interactive community awareness sessions\n- School-level road safety competitions\n- Distribution of educational materials and safety gear\n- Engagement with traffic police and local authorities\n- Focus on helmet usage, pedestrian safety, and traffic rule compliance\n\nThe creative approach made road safety messages memorable and impactful. Commuters stopped to watch street plays, students enthusiastically participated in competitions, and community members engaged in meaningful discussions about improving road safety in their neighborhoods.\n\nImpact:\n- Reached thousands of road users across multiple locations\n- Created awareness about National Road Safety Month\n- Encouraged behavioral change through creative engagement\n- Strengthened community participation in road safety initiatives\n\nGlimpses of Program', NULL, TRUE, 'completed');
