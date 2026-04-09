You are a senior full-stack engineer. Your task is to upgrade an existing project by implementing a scalable, production-ready Admin Dashboard using React (frontend) and Core PHP (backend).

⚠️ IMPORTANT RULES:
- DO NOT disturb or redesign the existing user-facing frontend UI.
- Only make existing pages dynamic by connecting them to the backend.
- Maintain current UI structure, styling, layout, and responsiveness.
- Code must be clean, modular, and future-scalable.

--------------------------------------------------

🏗️ TECH STACK:
Frontend: React (with modern folder structure, hooks, axios)
Backend: Core PHP (no framework, structured MVC-like pattern)
Database: MySQL
API Communication: REST APIs (JSON-based)

--------------------------------------------------

📁 PROJECT ARCHITECTURE:

Create a scalable structure:

Frontend (React):
/admin
  /components
  /pages
    - Login.jsx
    - ForgotPassword.jsx
    - Dashboard.jsx
    - Events.jsx
    - ContactEnquiries.jsx
  /services (API calls)
  /utils
  /assets

Backend (PHP):
/api
  /config (DB connection)
  /auth
  /events
  /contact
  /middleware
  /helpers

--------------------------------------------------

🔐 MODULE 1: ADMIN AUTHENTICATION

Features:
- Admin Login
- Forgot Password (Email-based reset)

Requirements:
- Secure login with hashed passwords (password_hash, password_verify)
- JWT or PHP session-based authentication
- Forgot password flow:
  1. Enter email
  2. Generate token
  3. Send reset link via email
  4. Reset password page
- Protect all admin routes (middleware)

Database Table: admins
- id
- email
- password
- reset_token
- token_expiry
- created_at

--------------------------------------------------

📅 MODULE 2: EVENTS (MAKE DYNAMIC)

Goal:
Convert existing static `/events` page into dynamic without changing UI.

Steps:
1. Analyze existing Events page UI structure.
2. Replace static content with dynamic API data.
3. Fetch event data using React API calls.

Admin Features:
- Add Event
- Edit Event
- Delete Event
- List Events (with pagination)

Database Table: events or as per requirements against UI on frontend
as per requirenments against UI on frontend

Backend APIs:
as per requirements against UI on frontend

Frontend:
- Map API data into existing UI components
- DO NOT change design

--------------------------------------------------

📩 MODULE 3: CONTACT PAGE (DYNAMIC)

Goal:
Store contact form submissions and manage via admin panel.

Frontend (Existing Contact Page):
- Submit form → send data to backend API

Backend:
- Store form data in DB

Database Table: contact_enquiries or as per requirements against UI on frontend
- id
- name
- email
- phone
- message
- created_at

Admin Panel Features:
- View all enquiries
- Delete enquiry
- Mark as read/unread

Backend APIs:
- POST /api/contact/submit
- GET /api/contact/list
- POST /api/contact/delete
- POST /api/contact/update-status

Frontend Admin Page:
- Table view with actions (Delete, Mark Read)

--------------------------------------------------

⚙️ GENERAL REQUIREMENTS:

✔️ Use reusable components in React
✔️ Use Axios for API calls
✔️ Proper error handling & validation (frontend + backend)
✔️ Use environment configs (.env)
✔️ Clean code with comments
✔️ Secure APIs (sanitize inputs, prevent SQL injection)
✔️ File upload support for event images
✔️ Pagination for admin tables
✔️ Loader + toast notifications

--------------------------------------------------

🚀 FUTURE SCALABILITY:

- Code should support adding modules like:
  - Blogs
  - Internships
  - Users
  - Payments
- Follow modular structure (each feature separate folder)
- Avoid hardcoding

--------------------------------------------------

🎯 FINAL DELIVERABLE:

1. Fully functional Admin Dashboard (React)
2. Core PHP backend APIs
3. Existing frontend connected dynamically
4. Authentication system working
5. Events module fully dynamic
6. Contact module fully dynamic
7. Clean, maintainable, scalable code

--------------------------------------------------

🎨 UI/UX (ADMIN PANEL):
- Modern, clean dashboard (inspired by Stripe / Linear)
- Sidebar navigation
- Responsive design
- Use consistent theme colors
- Cards, tables, modals for actions

--------------------------------------------------

Generate complete working code step-by-step with clear separation of frontend and backend.


Also gives the database schema for the above modules.
