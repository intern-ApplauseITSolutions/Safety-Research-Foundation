# Dynamic Pledge Management System

A comprehensive pledge management system for the Safety Research Foundation with PDF certificate generation and email functionality.

## Features

- ✅ **Dynamic Pledge Configuration** - Admin can manage pledge content, titles, and descriptions
- ✅ **Bilingual Support** - English and Hindi content management
- ✅ **PDF Certificate Generation** - Automatic certificate creation with professional design
- ✅ **Email System** - Automated email delivery with certificates
- ✅ **Admin Dashboard** - Complete management interface
- ✅ **Submission Tracking** - Monitor and manage pledge submissions
- ✅ **Responsive Design** - Works on all devices

## Installation

### 1. Database Setup

Run the setup script or manually execute the database schema:

```bash
# Option 1: Use setup script
http://localhost/setup_pledge_system.php

# Option 2: Manual database import
mysql -u root -p safety_research_foundation < database_schema.sql
```

### 2. Install Dependencies

```bash
# Install mPDF for PDF generation
composer install
```

### 3. Configure Email

Update your `php.ini` file for email functionality:

```ini
[mail function]
; For Windows
SMTP = smtp.gmail.com
smtp_port = 587
sendmail_from = noreply@safetyresearchfoundation.org

; For Linux/Mac
sendmail_path = /usr/sbin/sendmail -t -i
```

### 4. File Permissions

Ensure these directories are writable:

```bash
chmod 755 uploads/
chmod 755 uploads/certificates/
chmod 755 uploads/temp/
```

## Configuration

### Email Settings

Update email configuration in `api/services/EmailService.php`:

```php
private $fromEmail = 'noreply@safetyresearchfoundation.org';
private $fromName = 'Safety Research Foundation';
private $adminEmail = 'admin@safetyresearchfoundation.org';
```

### Logo Path

Update the logo path in `api/services/CertificateGenerator.php`:

```php
background: url('/src/assets/images/SRF%20logo.png') center/contain no-repeat;
```

## Usage

### Admin Panel

1. Access: `http://localhost/admin`
2. Login with admin credentials
3. Navigate to "Pledge Management"
4. Configure pledge content:
   - Title and description
   - Pledge points (English & Hindi)
   - Certificate settings
   - Form instructions

### Frontend Pledge

Users can take pledges at: `http://localhost/pledge`

## API Endpoints

### Public APIs
- `GET /api/public/pledge.php` - Get active pledge data
- `POST /api/pledge/submit.php` - Submit pledge

### Admin APIs
- `GET /api/pledge/list.php` - List pledge configurations
- `GET /api/pledge/get.php?id={id}` - Get single configuration
- `POST /api/pledge/create.php` - Create configuration
- `PUT /api/pledge/update.php?id={id}` - Update configuration
- `GET /api/pledge/submissions.php` - View submissions

## File Structure

```
├── api/
│   ├── public/
│   │   └── pledge.php              # Public pledge API
│   ├── pledge/
│   │   ├── list.php                # List configurations
│   │   ├── get.php                 # Get single config
│   │   ├── create.php              # Create config
│   │   ├── update.php              # Update config
│   │   ├── submit.php              # Submit pledge
│   │   └── submissions.php         # View submissions
│   └── services/
│       ├── CertificateGenerator.php # PDF generation
│       └── EmailService.php         # Email functionality
├── admin/src/pages/
│   └── PledgeManagement.jsx        # Admin UI
├── src/
│   ├── pages/
│   │   └── PledgePage.jsx          # Frontend pledge page
│   └── services/
│       └── pledgeService.js        # Frontend API service
├── uploads/
│   └── certificates/               # Generated PDFs
├── database_schema.sql             # Database structure
├── composer.json                   # Dependencies
└── setup_pledge_system.php         # Setup script
```

## Email Templates

The system includes professional email templates:

- **Certificate Email**: Beautiful HTML email with certificate attachment
- **Admin Notification**: Email to admin for new submissions
- **Logo Integration**: SRF logo in email headers
- **Responsive Design**: Works on all email clients

## Certificate Design

Features professional certificate design with:

- SRF branding and logo
- Recipient name and title
- Pledge details
- Official seal and signatures
- Date of issuance
- Decorative borders and styling

## Troubleshooting

### PDF Generation Issues

1. Ensure mPDF is installed: `composer install`
2. Check PHP memory limits
3. Verify write permissions for uploads directory

### Email Issues

1. Check php.ini mail configuration
2. Verify SMTP settings
3. Test with different email providers
4. Check spam folders

### Database Issues

1. Verify database connection
2. Check table creation
3. Ensure proper permissions

## Support

For issues and support:

1. Check the setup script: `setup_pledge_system.php`
2. Review error logs
3. Verify all dependencies are installed
4. Test API endpoints individually

## Security Notes

- Input validation on all forms
- SQL injection protection
- File upload restrictions
- Email header injection prevention
- Rate limiting considerations

## Future Enhancements

- SMS notifications
- Advanced certificate customization
- Analytics dashboard
- Social media integration
- Multi-language support beyond English/Hindi
