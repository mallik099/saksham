const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Mock Data
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Admin@123', 10),
    role: 'admin'
  },
  {
    id: '2',
    name: 'Faculty User',
    email: 'faculty@example.com',
    password: bcrypt.hashSync('Faculty@123', 10),
    role: 'faculty'
  },
  {
    id: '3',
    name: 'Staff User',
    email: 'staff@example.com',
    password: bcrypt.hashSync('Staff@123', 10),
    role: 'staff'
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
    admissionDate: '2023-08-15',
    hostelRoom: 'A-101',
    busRoute: 'Route-1',
    status: 'active'
  },
  {
    id: 'STU002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91-9876543211',
    course: 'Electronics',
    semester: 2,
    admissionDate: '2024-01-10',
    hostelRoom: 'B-205',
    busRoute: 'Route-2',
    status: 'active'
  }
];

const attendance = [
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Physics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-16', status: 'absent' },
  { studentId: 'STU002', subject: 'Chemistry', date: '2024-01-15', status: 'present' }
];

const examResults = [
  { studentId: 'STU001', subject: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
  { studentId: 'STU001', subject: 'Physics', marks: 78, totalMarks: 100, grade: 'B+' },
  { studentId: 'STU002', subject: 'Chemistry', marks: 92, totalMarks: 100, grade: 'A+' }
];

const feeRecords = [
  {
    id: 'FEE001',
    studentId: 'STU001',
    amount: 50000,
    paidAmount: 30000,
    pendingAmount: 20000,
    semester: 3,
    dueDate: '2024-02-15',
    status: 'partial'
  },
  {
    id: 'FEE002',
    studentId: 'STU002',
    amount: 45000,
    paidAmount: 45000,
    pendingAmount: 0,
    semester: 2,
    dueDate: '2024-01-15',
    status: 'completed'
  }
];

const hostelRooms = [
  { roomNumber: 'A-101', block: 'A', capacity: 2, occupied: 1, students: ['STU001'] },
  { roomNumber: 'A-102', block: 'A', capacity: 2, occupied: 0, students: [] },
  { roomNumber: 'B-205', block: 'B', capacity: 3, occupied: 1, students: ['STU002'] }
];

const libraryBooks = [
  { id: 'B001', title: 'Data Structures', author: 'Cormen', available: 5, total: 10 },
  { id: 'B002', title: 'Physics Fundamentals', author: 'Resnick', available: 3, total: 8 }
];

const bookIssues = [
  { studentId: 'STU001', bookId: 'B001', issueDate: '2024-01-10', dueDate: '2024-01-24', status: 'issued' }
];

const leaveApplications = [
  {
    id: 'L001',
    studentId: 'STU001',
    reason: 'Medical',
    fromDate: '2024-01-20',
    toDate: '2024-01-22',
    status: 'pending',
    appliedDate: '2024-01-18'
  }
];

const transportRoutes = [
  { id: 'Route-1', name: 'City Center Route', students: ['STU001'], capacity: 40 },
  { id: 'Route-2', name: 'Suburb Route', students: ['STU002'], capacity: 35 }
];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CampusFlow ERP Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
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
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});

// Dashboard Routes
app.get('/api/dashboard/admin', authenticateToken, (req, res) => {
  try {
    const totalStudents = students.length;
    const totalFees = feeRecords.reduce((sum, fee) => sum + fee.amount, 0);
    const collectedFees = feeRecords.reduce((sum, fee) => sum + fee.paidAmount, 0);
    const hostelOccupancy = hostelRooms.reduce((sum, room) => sum + room.occupied, 0);
    const totalRooms = hostelRooms.length;
    
    res.json({
      totalStudents,
      totalFees,
      collectedFees,
      pendingFees: totalFees - collectedFees,
      hostelOccupancy: Math.round((hostelOccupancy / (totalRooms * 2)) * 100),
      attendanceRate: 85
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard error', error: error.message });
  }
});

app.get('/api/dashboard/student/:id', authenticateToken, (req, res) => {
  try {
    const studentId = req.params.id;
    const student = students.find(s => s.id === studentId);
    const studentAttendance = attendance.filter(a => a.studentId === studentId);
    const results = examResults.filter(r => r.studentId === studentId);
    const fees = feeRecords.find(f => f.studentId === studentId);
    const leaves = leaveApplications.filter(l => l.studentId === studentId);
    
    const attendanceRate = studentAttendance.length > 0 ? 
      Math.round((studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) * 100) : 0;
    
    res.json({
      student,
      attendanceRate,
      totalSubjects: results.length,
      averageMarks: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.marks, 0) / results.length) : 0,
      pendingFees: fees ? fees.pendingAmount : 0,
      leaveApplications: leaves.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Student dashboard error', error: error.message });
  }
});

// Student Routes
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(students);
});

app.post('/api/students', authenticateToken, (req, res) => {
  try {
    const newStudent = {
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
      ...req.body,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    students.push(newStudent);
    res.json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});

// Attendance Routes
app.get('/api/attendance/:studentId', authenticateToken, (req, res) => {
  const studentAttendance = attendance.filter(a => a.studentId === req.params.studentId);
  res.json(studentAttendance);
});

app.post('/api/attendance', authenticateToken, (req, res) => {
  try {
    const newAttendance = {
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    attendance.push(newAttendance);
    res.json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
});

// Exam Results Routes
app.get('/api/results/:studentId', authenticateToken, (req, res) => {
  const results = examResults.filter(r => r.studentId === req.params.studentId);
  res.json(results);
});

app.post('/api/results', authenticateToken, (req, res) => {
  try {
    examResults.push(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Error adding result', error: error.message });
  }
});

// Fee Routes
app.get('/api/fees/:studentId', authenticateToken, (req, res) => {
  const fees = feeRecords.filter(f => f.studentId === req.params.studentId);
  res.json(fees);
});

app.post('/api/fees/payment', authenticateToken, (req, res) => {
  try {
    const { studentId, amount } = req.body;
    const feeRecord = feeRecords.find(f => f.studentId === studentId);
    
    if (feeRecord) {
      feeRecord.paidAmount += amount;
      feeRecord.pendingAmount -= amount;
      feeRecord.status = feeRecord.pendingAmount === 0 ? 'completed' : 'partial';
    }
    
    const receipt = {
      id: `RCP${Date.now()}`,
      studentId,
      amount,
      date: new Date().toISOString().split('T')[0],
      receiptNumber: `RCP-${Date.now()}`
    };
    
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message });
  }
});

// Hostel Routes
app.get('/api/hostel/rooms', authenticateToken, (req, res) => {
  res.json(hostelRooms);
});

app.post('/api/hostel/allocate', authenticateToken, (req, res) => {
  try {
    const { roomNumber, studentId } = req.body;
    const room = hostelRooms.find(r => r.roomNumber === roomNumber);
    
    if (room && room.occupied < room.capacity) {
      room.students.push(studentId);
      room.occupied += 1;
      
      const student = students.find(s => s.id === studentId);
      if (student) {
        student.hostelRoom = roomNumber;
      }
    }
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Room allocation error', error: error.message });
  }
});

// Library Routes
app.get('/api/library/books', authenticateToken, (req, res) => {
  res.json(libraryBooks);
});

app.post('/api/library/issue', authenticateToken, (req, res) => {
  try {
    const { studentId, bookId } = req.body;
    const book = libraryBooks.find(b => b.id === bookId);
    
    if (book && book.available > 0) {
      book.available -= 1;
      
      const issue = {
        studentId,
        bookId,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'issued'
      };
      
      bookIssues.push(issue);
      res.json(issue);
    } else {
      res.status(400).json({ message: 'Book not available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Book issue error', error: error.message });
  }
});

app.post('/api/library/return', authenticateToken, (req, res) => {
  try {
    const { studentId, bookId } = req.body;
    const issue = bookIssues.find(i => i.studentId === studentId && i.bookId === bookId && i.status === 'issued');
    const book = libraryBooks.find(b => b.id === bookId);
    
    if (issue && book) {
      issue.status = 'returned';
      book.available += 1;
      res.json(issue);
    } else {
      res.status(400).json({ message: 'Issue record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Book return error', error: error.message });
  }
});

// Transport Routes
app.get('/api/transport/routes', authenticateToken, (req, res) => {
  res.json(transportRoutes);
});

app.post('/api/transport/assign', authenticateToken, (req, res) => {
  try {
    const { studentId, routeId } = req.body;
    const route = transportRoutes.find(r => r.id === routeId);
    const student = students.find(s => s.id === studentId);
    
    if (route && student) {
      route.students.push(studentId);
      student.busRoute = routeId;
      res.json({ route, student });
    } else {
      res.status(400).json({ message: 'Route or student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Transport assignment error', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('🚀 ================================');
  console.log('🎓 CampusFlow ERP Server Started!');
  console.log('🚀 ================================');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log('📧 Demo Credentials:');
  console.log('   👨‍💼 Admin: admin@example.com / Admin@123');
  console.log('   👨‍🏫 Faculty: faculty@example.com / Faculty@123');
  console.log('   👨‍💻 Staff: staff@example.com / Staff@123');
  console.log('   🎓 Student: student@example.com / Student@123');
  console.log('🚀 ================================');
  console.log('✅ Ready for frontend connection!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});