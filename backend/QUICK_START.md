# 🚀 Quick Reference - MNPIEPL 3D Website

## Start in 3 Steps

### Step 1: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials:
# - SMTP settings
# - Firebase settings
# - Admin email
```

### Step 3: Run
```bash
python app.py
# Open browser to http://localhost:5000
```

Done! ✅

---

## What's New

✅ **Complete 3D Animation Website**
- Professional design matching reference site
- 6 types of 3D animations
- Fully responsive (mobile, tablet, desktop)
- Contact form integration
- Email notifications

✅ **File Locations**
- Website: `mnpiepl-frontend/index.html`
- Backend: `app.py`
- Docs: `DEPLOYMENT_GUIDE.md`

✅ **Key Features**
- No JavaScript framework needed
- Single HTML file (60KB)
- GPU-accelerated animations
- Fast loading (<3 seconds)
- Email notifications
- Firebase database

---

## Common Tasks

### Test Contact Form
1. Fill form with test data
2. Click "Send Message"
3. Check terminal for email output
4. Verify Firebase database

### Customize Colors
Edit `mnpiepl-frontend/index.html`:
```css
/* Change #c41e3a (red) to your color */
--primary: #YOUR_COLOR;
```

### Add Services
Add to Services Grid section:
```html
<div class="svc-card">
  <div class="svc-num">06</div>
  <span class="svc-icon">🎨</span>
  <h3>Your Service</h3>
  <p>Description...</p>
  <a href="#contact" class="svc-link">Learn more →</a>
</div>
```

### Update Company Info
Search for "MNPIEPL" in HTML and update:
- Company name
- Contact email
- Phone number
- Address

### Check 3D Animations
- Hover over service cards → 3D flip
- Hover over project cards → 3D scale
- Scroll page → Parallax effect
- Logo → Rotates continuously

---

## Environment Variables

Required in `.env`:

```bash
# Server
FLASK_DEBUG=False

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@mnpiepl.com

# Firebase
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
# ... see .env.example for complete list
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Website won't load | Check Flask is running on port 5000 |
| Contact form doesn't submit | Verify SMTP credentials in .env |
| 3D animations not showing | Update browser or try different browser |
| No email received | Check SMTP settings and app password |
| Firebase errors | Verify Firebase credentials and database URL |

---

## Deployment Links

- **Render:** https://render.com
- **Heroku:** https://heroku.com
- **See guide:** `DEPLOYMENT_GUIDE.md`

---

## File Structure

```
mnpiepl-frontend/
├── index.html ..................... Main website
├── favicon.svg .................... Icon
├── package.json ................... npm config

backend/
├── app.py ......................... Flask server
├── contact_form.py ................ Email handler
├── requirements.txt ............... Python packages
├── .env ........................... Secrets (not in git)
└── mnpiepl-frontend/ .............. Website folder
```

---

## Performance Tips

- Compress images before uploading
- Enable browser caching in production
- Use CDN for static files
- Monitor server performance
- Set up error tracking

---

## Security Checklist

✅ Use strong SMTP passwords  
✅ Keep Firebase credentials safe  
✅ Use HTTPS in production  
✅ Enable CORS properly  
✅ Validate all form inputs  
✅ Keep dependencies updated  

---

## Key Contacts

- **Developer:** You
- **Company:** MNPIEPL
- **Email:** info@mnpiepl.com
- **Support:** See documentation files

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure .env
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Monitor performance
6. ✅ Collect user feedback

---

## Documentation

- **Setup:** `DEPLOYMENT_GUIDE.md`
- **Features:** `COMPLETION_SUMMARY.md`
- **Testing:** `VERIFICATION_REPORT.md`
- **Frontend:** `mnpiepl-frontend/README.md`

---

## Questions?

See documentation files or email info@mnpiepl.com

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** 2024-05-24

Happy deploying! 🚀
