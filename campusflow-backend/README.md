# CampusFlow Backend

Complete backend API for CampusFlow college management system.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm run dev
```

Server runs on: http://localhost:5000

## MongoDB Atlas Connection

Already configured with your Atlas cluster:
- Database: `campusflow`
- Connection string in `.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user

### Admissions
- `POST /api/admissions` - Submit application
- `GET /api/admissions/my` - Get my applications
- `GET /api/admissions` - Get all (admin)

### Fees
- `GET /api/fees/my` - Get my fees
- `POST /api/fees/:id/pay` - Pay fee
- `GET /api/fees` - Get all (admin)

### Exams
- `POST /api/exams` - Register for exam
- `GET /api/exams/my` - Get my registrations
- `GET /api/exams` - Get all (admin)

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (admin)

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://mallikkumark99_db_user:mallik1234@cluster0.509ucsd.mongodb.net/campusflow?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Features

✅ JWT Authentication  
✅ Role-based Authorization  
✅ MongoDB Atlas Integration  
✅ Input Validation  
✅ Error Handling  
✅ Security Middleware  
✅ Rate Limiting  
✅ CORS Protection