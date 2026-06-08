# MNPIEPL 3D Animation Website - Setup & Deployment Guide

## Overview
This is a complete, production-ready 3D animated website for MNPIEPL with a Flask backend and responsive HTML5 frontend featuring advanced CSS3D animations, parallax scrolling, and interactive mouse-tracking effects.

## Project Structure
```
backend/
├── app.py                          # Flask application
├── requirements.txt                # Python dependencies
├── .env                           # Environment variables
├── .env.example                   # Example env file
├── contact_form.py                # Contact form handler
├── email_service.py              # Email utilities
├── firebase_init.py              # Firebase configuration
├── encode_firebase.py            # Firebase encoding
├── our_projects.py               # Projects management
└── mnpiepl-frontend/              # Frontend application
    ├── index.html                 # Main website (single file)
    ├── favicon.svg                # Website icon
    ├── icons.svg                  # Icon library
    ├── package.json               # npm configuration
    ├── vite.config.js             # Vite configuration
    ├── README.md                  # Frontend documentation
    ├── .gitignore                 # Git ignore rules
    └── assets/                    # Compiled/generated assets
```

## Prerequisites
- Python 3.8+
- pip (Python package manager)
- Node.js 16+ (optional, for development builds)
- Git

## Installation

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file with configuration
cp .env.example .env

# Edit .env with your settings:
# - FLASK_DEBUG=True (for development)
# - SMTP configuration (Gmail, SendGrid, etc.)
# - Firebase credentials
# - Admin email
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```env
FLASK_DEBUG=False
ALLOWED_ORIGINS=*

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@mnpiepl.com
CLIENT_NAME=MNPIEPL

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# Firebase Service Account (JSON content, escaped)
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

## Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
python app.py
# Server runs on http://localhost:5000

# Terminal 2 - Frontend (optional, with live reload)
cd backend/mnpiepl-frontend
npm install
npm run dev
# Dev server runs on http://localhost:3000
```

### Production Mode
```bash
# Install dependencies
pip install -r requirements.txt

# Run Flask app
python app.py
# Access at http://localhost:5000
```

## Features

### Frontend (3D Animation Website)
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **3D Animations**
  - Rotating 3D logo block
  - 3D card transforms with perspective
  - Mouse-tracking 3D effects
  - Parallax scrolling
  - Floating animations
  - Counter animations for statistics

✅ **Performance**
  - No external JavaScript frameworks
  - GPU-accelerated CSS animations
  - Optimized for fast loading
  - Lazy image loading with fallbacks

✅ **Accessibility**
  - Semantic HTML
  - Proper color contrast
  - Keyboard navigation
  - ARIA labels (can be enhanced)

✅ **SEO**
  - Meta tags
  - Semantic markup
  - Fast load times
  - Mobile responsive

### Backend (Flask API)
✅ **REST API Endpoints**
  - `GET /` - Serve frontend
  - `POST /api/contact` - Submit contact form
  - `GET /api/health` - Health check
  - `GET /api/firebase-config` - Firebase config

✅ **Features**
  - CORS enabled for frontend
  - Contact form submission
  - Email notification (admin + user)
  - Firebase Realtime Database integration
  - Thread pool for async email sending

## API Documentation

### Contact Form Endpoint
**URL:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-XXXX-XXXX-XXX",
  "subject": "Project Inquiry",
  "message": "I'm interested in your construction services..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message received!"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Customization

### Changing Colors
Edit the CSS in `index.html`:
```css
/* Primary brand color (red) */
--primary: #c41e3a;

/* Text color */
--text: #0a0a0a;

/* Background colors */
--bg: #fff;
--bg-light: #f9f9f9;
```

### Modifying Content
1. Open `mnpiepl-frontend/index.html`
2. Find the section you want to edit
3. Update text, images, or HTML structure
4. No build process needed - changes apply immediately

### Adding Services
Add a new service card in the Services Grid section:
```html
<div class="svc-card">
  <div class="svc-num">06</div>
  <span class="svc-icon">🎨</span>
  <h3>Service Name</h3>
  <p>Service description...</p>
  <a href="#contact" class="svc-link">Learn more →</a>
</div>
```

### Adding Projects
Add a new project in the Projects section:
```html
<div class="project-card">
  <div class="project-image">🏭</div>
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Project description...</p>
    <a href="#contact" class="svc-link">View Details →</a>
  </div>
</div>
```

## Deployment

### Deploy to Render.com (Recommended)
1. Push code to GitHub
2. Create account on Render.com
3. Connect GitHub repository
4. Create new Web Service
5. Set environment variables
6. Deploy

### Deploy to Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create mnpiepl-app

# Set environment variables
heroku config:set FLASK_DEBUG=False
heroku config:set SMTP_USER=your-email@gmail.com
# ... set other variables ...

# Deploy
git push heroku main
```

### Deploy to AWS, DigitalOcean, or VPS
1. Install Python and dependencies
2. Create systemd service for Flask
3. Configure Nginx or Apache as reverse proxy
4. Set up SSL with Let's Encrypt
5. Configure firewall and security

Example Nginx config:
```nginx
server {
    listen 80;
    server_name mnpiepl.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Troubleshooting

### 3D Animations Not Working
- Check browser console for errors
- Verify CSS 3D transform support in browser
- Try a different browser (Chrome, Firefox, Safari)

### Contact Form Not Submitting
- Check if backend is running on port 5000
- Verify SMTP credentials are correct
- Check Firebase database URL and credentials
- Look at browser console and server logs for errors

### Frontend Not Loading
- Ensure `mnpiepl-frontend/index.html` exists
- Check Flask static folder configuration
- Verify file permissions

### Email Not Sending
- Verify SMTP credentials (Gmail requires app password)
- Check email address format
- Ensure firewall allows port 587
- Check Gmail account security settings

### Firebase Errors
- Verify Firebase credentials in .env
- Check Firebase database rules allow reads/writes
- Ensure network connectivity to Firebase

## Security Checklist

✅ **Before Production:**
- [ ] Set `FLASK_DEBUG=False`
- [ ] Use strong SMTP password (app-specific for Gmail)
- [ ] Keep Firebase credentials secure
- [ ] Configure CORS properly (don't use `*` in production)
- [ ] Enable HTTPS
- [ ] Add rate limiting to API endpoints
- [ ] Validate and sanitize all form inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable Firebase security rules
- [ ] Add monitoring and logging
- [ ] Regular backups of database

## Performance Tips

1. **Image Optimization**
   - Compress logo.jpg before uploading
   - Use appropriate formats (JPEG, WebP, SVG)

2. **Caching**
   - Configure browser caching headers
   - Use CDN for static assets

3. **Database**
   - Index Firebase fields for faster queries
   - Archive old contact submissions

4. **Monitoring**
   - Use error tracking (Sentry)
   - Monitor server performance
   - Set up alerts for critical errors

## Support & Contact

For issues or questions:
- Email: info@mnpiepl.com
- Phone: +91-XXXX-XXXX-XXX
- Address: Andhra Pradesh, Telangana

## License
© 2024 MNPIEPL. All rights reserved.

---

Last Updated: 2024
Version: 1.0.0
