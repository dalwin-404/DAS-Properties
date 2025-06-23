# Technical Setup Instructions

## 🛠️ System Requirements

- Node.js 18+ 
- npm or yarn
- Python 3.x (for frontend server)
- Modern web browser

## 📦 Installation

### 1. Install Dependencies

```bash
# Navigate to Strapi backend
cd backend/strapi-cms
npm install

# No additional frontend dependencies needed
```

### 2. Database Setup

Strapi is configured with SQLite (no additional setup required)
- Database file: `backend/strapi-cms/.tmp/data.db`
- Automatically created on first run

## 🚀 Running the Application

### Start Strapi CMS (Backend)

```bash
cd backend/strapi-cms
npm run develop
```

- Admin panel: http://localhost:1337/admin
- API endpoint: http://localhost:1337/api

### Start Frontend Server

```bash
cd frontend
python3 -m http.server 8000
```

- Website: http://localhost:8000/index-strapi.html

## 🔐 Admin Account

**Default Admin Credentials:**
- Email: admin@dasproperties.com
- Password: DASProperties2024!

**⚠️ Important:** Change the password after first login for security.

## 📁 File Structure

```
das-properties-cms/
├── backend/
│   └── strapi-cms/              # Strapi CMS installation
│       ├── config/              # Configuration files
│       ├── src/
│       │   └── api/             # Content type definitions
│       │       ├── property/    # Property content type
│       │       ├── page/        # Page content type
│       │       ├── hero-slide/  # Hero slide content type
│       │       └── global-setting/ # Global settings
│       ├── public/uploads/      # Uploaded media files
│       └── .tmp/data.db         # SQLite database
├── frontend/
│   ├── index-strapi.html        # Strapi-integrated homepage
│   ├── strapi-client.js         # API integration client
│   ├── style.css                # Original styles
│   ├── script.js                # Original JavaScript
│   └── [other original files]   # All original website files
└── documentation/
    ├── README.md                # Main documentation
    ├── ADMIN-GUIDE.md           # User guide
    └── SETUP.md                 # This file
```

## 🔧 Configuration

### API Permissions

Public permissions are configured for:
- Properties: find, findOne
- Pages: find, findOne  
- Hero Slides: find, findOne
- Global Settings: find

### CORS Configuration

CORS is enabled in `config/middlewares.ts` for frontend access.

### Content Types

#### Property Schema
```json
{
  "title": "string",
  "location": "string", 
  "category": "string",
  "priceFrom": "string",
  "yield": "string",
  "description": "text",
  "heroImage": "media",
  "gallery": "media",
  "mapLatitude": "decimal",
  "mapLongitude": "decimal",
  "slug": "uid"
}
```

#### Page Schema
```json
{
  "title": "string",
  "content": "richtext",
  "heroImage": "media",
  "metaDescription": "text",
  "slug": "uid"
}
```

#### Hero Slide Schema
```json
{
  "title": "string",
  "subtitle": "text",
  "backgroundImage": "media",
  "buttonText": "string",
  "buttonLink": "string",
  "order": "integer"
}
```

#### Global Setting Schema
```json
{
  "siteTitle": "string",
  "siteDescription": "text",
  "contactPhone": "string",
  "contactEmail": "email",
  "address": "text"
}
```

## 🌐 API Endpoints

### Properties
- GET `/api/properties` - List all properties
- GET `/api/properties/:id` - Get single property

### Pages  
- GET `/api/pages` - List all pages
- GET `/api/pages/:id` - Get single page

### Hero Slides
- GET `/api/hero-slides` - List all hero slides

### Global Settings
- GET `/api/global-setting` - Get global settings

### Media
- GET `/uploads/:filename` - Access uploaded files

## 🔄 Development Workflow

### Making Schema Changes

1. Use Content-Type Builder in admin panel
2. Or edit schema files directly in `src/api/*/content-types/*/schema.json`
3. Restart Strapi to apply changes

### Adding New Content Types

1. Admin panel: Content-Type Builder → Create new collection type
2. Define fields and relationships
3. Configure permissions in Settings → Roles
4. Update frontend JavaScript to consume new API

### Customizing Frontend

1. Edit `strapi-client.js` for API integration
2. Modify HTML templates as needed
3. Update CSS for styling changes
4. Test with both original and Strapi-integrated versions

## 🚀 Production Deployment

### Strapi Backend

1. **Environment Variables:**
   ```bash
   NODE_ENV=production
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   JWT_SECRET=your-jwt-secret
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   ```

2. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

3. **Hosting Options:**
   - Strapi Cloud (recommended)
   - Heroku
   - DigitalOcean
   - AWS
   - Any Node.js hosting

### Frontend

1. **Static Hosting:**
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting

2. **Update API URLs:**
   - Change `STRAPI_URL` in `strapi-client.js`
   - Point to production Strapi instance

## 🛡️ Security Considerations

### Admin Access
- Change default admin password
- Use strong passwords
- Enable 2FA if available
- Restrict admin panel access by IP if possible

### API Security
- Review public permissions regularly
- Use API tokens for authenticated requests
- Enable rate limiting in production
- Use HTTPS in production

### File Uploads
- Configure file size limits
- Restrict file types
- Scan uploads for malware
- Use CDN for media delivery

## 📊 Monitoring & Maintenance

### Database Backup
```bash
# Backup SQLite database
cp backend/strapi-cms/.tmp/data.db backup-$(date +%Y%m%d).db

# Backup media files
tar -czf media-backup-$(date +%Y%m%d).tar.gz backend/strapi-cms/public/uploads/
```

### Log Monitoring
- Check Strapi logs for errors
- Monitor API response times
- Track content update frequency

### Updates
```bash
# Update Strapi
cd backend/strapi-cms
npm update

# Check for security updates
npm audit
npm audit fix
```

## 🆘 Troubleshooting

### Common Issues

**Strapi won't start:**
- Check Node.js version (18+)
- Delete `node_modules` and run `npm install`
- Check port 1337 isn't in use

**API returns 404:**
- Verify content type exists
- Check public permissions
- Ensure content is published

**Images not loading:**
- Check file permissions
- Verify upload directory exists
- Check file size limits

**Frontend can't connect to API:**
- Verify CORS configuration
- Check API URL in `strapi-client.js`
- Ensure Strapi is running

### Debug Mode

```bash
# Start Strapi in debug mode
cd backend/strapi-cms
npm run develop -- --debug
```

### Reset Admin Password

```bash
cd backend/strapi-cms
npm run strapi admin:reset-user-password --email=admin@dasproperties.com
```

## 📞 Support

### Documentation
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Community](https://strapi.io/community)

### Professional Support
- Strapi Enterprise Support
- Custom development services
- Hosting and maintenance services

---

**✅ Setup Complete! Your Strapi CMS integration is ready for production use.**

