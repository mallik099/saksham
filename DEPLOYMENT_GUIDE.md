# CampusFlow ERP - Complete Deployment Guide

## 🚀 Backend Setup & Deployment

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### 1. Backend Installation
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusflow
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=production
UPLOAD_PATH=./uploads
BACKUP_PATH=./backups
```

### 3. Database Setup
```bash
# Start MongoDB service
mongod

# Create initial admin user (optional)
node scripts/createAdmin.js
```

### 4. Start Backend Server
```bash
# Development
npm run dev

# Production
npm start
```

### 5. Automated Backup
```bash
# Manual backup
npm run backup

# Setup daily backup (cron job)
0 2 * * * cd /path/to/backend && npm run backup
```

## 🎨 Frontend Setup & Deployment

### 1. Frontend Installation
```bash
cd campusflow-front
npm install
```

### 2. Environment Configuration
Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CURRENCY=INR
VITE_LOCALE=en-IN
VITE_PHONE_PREFIX=+91
```

### 3. Build & Deploy
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

### Backend Container
```bash
cd backend
docker build -t campusflow-backend .
docker run -p 5000:5000 --env-file .env campusflow-backend
```

### Full Stack with Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/campusflow
  
  frontend:
    build: ./
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## 🔐 Security Checklist

### Backend Security
- ✅ JWT authentication implemented
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Rate limiting enabled
- ✅ Helmet.js for security headers
- ✅ CORS configured
- ✅ Role-based access control

### Production Security
- [ ] Change JWT_SECRET to strong random string
- [ ] Enable HTTPS with SSL certificates
- [ ] Configure firewall rules
- [ ] Set up MongoDB authentication
- [ ] Regular security updates
- [ ] Monitor audit logs

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Student Management
- `POST /api/students` - Create student admission
- `GET /api/students` - Get all students (paginated)
- `GET /api/students/:id` - Get student by ID

### Fee Management
- `POST /api/fees` - Record fee payment
- `GET /api/fees` - Get fee records
- `GET /api/fees/stats` - Fee statistics

### Hostel Management
- `POST /api/hostel/assign` - Assign room
- `GET /api/hostel` - Get hostel data

### Library Management
- `POST /api/library/issue` - Issue book
- `PUT /api/library/return/:id` - Return book
- `GET /api/library` - Get library records

### Exam Management
- `POST /api/exams` - Register for exam
- `PUT /api/exams/:id/marks` - Record marks
- `GET /api/exams` - Get exam records

### Dashboard & Reports
- `GET /api/dashboard` - Dashboard statistics
- `GET /api/audit` - Audit logs (admin only)

## 🔧 System Features Implemented

### ✅ Complete ERP Functionality
1. **Student Admission System**
   - Online form with photo upload
   - Auto-generated student IDs
   - Academic info management

2. **Fee Payment System**
   - Payment recording with validation
   - Auto-generated PDF receipts
   - Payment history tracking

3. **Hostel Management**
   - Room allocation system
   - Occupancy tracking
   - Visual dashboard

4. **Library Management**
   - Book issue/return system
   - Fine calculation
   - Overdue tracking

5. **Exam Management**
   - Exam registration
   - Marks recording
   - Grade calculation

6. **Role-Based Access Control**
   - Admin: Full system access
   - Staff: Department management
   - Student: Personal data only

7. **Security & Audit**
   - Complete audit trail
   - Secure authentication
   - Data validation
   - Error handling

8. **Indian Localization**
   - Currency: ₹ (Rupees)
   - Phone: +91 format
   - Date: DD/MM/YYYY format

## 🚀 Production Deployment

### Cloud Deployment Options
1. **AWS/Azure/GCP**
   - EC2/VM instances
   - MongoDB Atlas
   - Load balancer
   - SSL certificates

2. **Heroku/Vercel**
   - Easy deployment
   - Automatic scaling
   - Built-in SSL

3. **VPS Deployment**
   - Ubuntu/CentOS server
   - Nginx reverse proxy
   - PM2 process manager
   - Let's Encrypt SSL

The system is now production-ready with complete ERP functionality, security measures, and deployment options!