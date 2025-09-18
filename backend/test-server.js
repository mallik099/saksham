const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 4000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Simple test data
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Admin@123', 10),
    role: 'admin'
  },
  {
    id: '4',
    name: 'Student User',
    email: 'student@example.com',
    password: bcrypt.hashSync('Student@123', 10),
    role: 'student',
    studentId: 'STU001'
  }
];

const students = [
  {
    id: 'STU001',
    name: 'John Doe',
    email: 'student@example.com',
    phone: '+91-9876543210',
    course: 'Computer Science',
    semester: 3,
    status: 'active'
  }
];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, studentId: user.studentId },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      studentId: user.studentId 
    } 
  });
});

// Dashboard Routes
app.get('/api/dashboard/admin', authenticateToken, (req, res) => {
  res.json({
    totalStudents: 2,
    totalFees: 95000,
    collectedFees: 75000,
    pendingFees: 20000,
    hostelOccupancy: 50,
    attendanceRate: 85
  });
});

app.get('/api/dashboard/student/:id', authenticateToken, (req, res) => {
  res.json({
    student: students[0],
    attendanceRate: 85,
    totalSubjects: 2,
    averageMarks: 82,
    pendingFees: 20000,
    leaveApplications: 1
  });
});

// Student Routes
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(students);
});

app.post('/api/students', authenticateToken, (req, res) => {
  const newStudent = {
    id: `STU${String(students.length + 1).padStart(3, '0')}`,
    ...req.body,
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  students.push(newStudent);
  res.json(newStudent);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`✅ Test Server running on port ${PORT}`);
  console.log('🔗 Test URL: http://localhost:4000/api/test');
  console.log('📧 Demo Credentials:');
  console.log('   Admin: admin@example.com / Admin@123');
  console.log('   Student: student@example.com / Student@123');
  console.log('🚀 Server is ready for frontend connection!');
});