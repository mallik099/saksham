const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mockData = require('./config/mockData');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

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

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = mockData.users.find(u => u.email === email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, studentId: user.studentId },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, studentId: user.studentId } });
});

// Dashboard Routes
app.get('/api/dashboard/admin', authenticateToken, (req, res) => {
  const totalStudents = mockData.students.length;
  const totalFees = mockData.feeRecords.reduce((sum, fee) => sum + fee.amount, 0);
  const collectedFees = mockData.feeRecords.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const hostelOccupancy = mockData.hostelRooms.reduce((sum, room) => sum + room.occupied, 0);
  const totalRooms = mockData.hostelRooms.length;
  
  res.json({
    totalStudents,
    totalFees,
    collectedFees,
    pendingFees: totalFees - collectedFees,
    hostelOccupancy: Math.round((hostelOccupancy / (totalRooms * 2)) * 100),
    attendanceRate: 85
  });
});

app.get('/api/dashboard/student/:id', authenticateToken, (req, res) => {
  const studentId = req.params.id;
  const student = mockData.students.find(s => s.id === studentId);
  const attendance = mockData.attendance.filter(a => a.studentId === studentId);
  const results = mockData.examResults.filter(r => r.studentId === studentId);
  const fees = mockData.feeRecords.find(f => f.studentId === studentId);
  const leaves = mockData.leaveApplications.filter(l => l.studentId === studentId);
  
  const attendanceRate = attendance.length > 0 ? 
    Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100) : 0;
  
  res.json({
    student,
    attendanceRate,
    totalSubjects: results.length,
    averageMarks: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.marks, 0) / results.length) : 0,
    pendingFees: fees ? fees.pendingAmount : 0,
    leaveApplications: leaves.length
  });
});

// Student Routes
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(mockData.students);
});

app.post('/api/students', authenticateToken, (req, res) => {
  const newStudent = {
    id: `STU${String(mockData.students.length + 1).padStart(3, '0')}`,
    ...req.body,
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  mockData.students.push(newStudent);
  res.json(newStudent);
});

// Attendance Routes
app.get('/api/attendance/:studentId', authenticateToken, (req, res) => {
  const attendance = mockData.attendance.filter(a => a.studentId === req.params.studentId);
  res.json(attendance);
});

app.post('/api/attendance', authenticateToken, (req, res) => {
  const newAttendance = {
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  mockData.attendance.push(newAttendance);
  res.json(newAttendance);
});

// Exam Results Routes
app.get('/api/results/:studentId', authenticateToken, (req, res) => {
  const results = mockData.examResults.filter(r => r.studentId === req.params.studentId);
  res.json(results);
});

app.post('/api/results', authenticateToken, (req, res) => {
  const newResult = req.body;
  mockData.examResults.push(newResult);
  res.json(newResult);
});

// Fee Routes
app.get('/api/fees/:studentId', authenticateToken, (req, res) => {
  const fees = mockData.feeRecords.filter(f => f.studentId === req.params.studentId);
  res.json(fees);
});

app.post('/api/fees/payment', authenticateToken, (req, res) => {
  const { studentId, amount } = req.body;
  const feeRecord = mockData.feeRecords.find(f => f.studentId === studentId);
  
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
});

// Hostel Routes
app.get('/api/hostel/rooms', authenticateToken, (req, res) => {
  res.json(mockData.hostelRooms);
});

app.post('/api/hostel/allocate', authenticateToken, (req, res) => {
  const { roomNumber, studentId } = req.body;
  const room = mockData.hostelRooms.find(r => r.roomNumber === roomNumber);
  
  if (room && room.occupied < room.capacity) {
    room.students.push(studentId);
    room.occupied += 1;
    
    const student = mockData.students.find(s => s.id === studentId);
    if (student) {
      student.hostelRoom = roomNumber;
    }
  }
  
  res.json(room);
});

// Library Routes
app.get('/api/library/books', authenticateToken, (req, res) => {
  res.json(mockData.libraryBooks);
});

app.post('/api/library/issue', authenticateToken, (req, res) => {
  const { studentId, bookId } = req.body;
  const book = mockData.libraryBooks.find(b => b.id === bookId);
  
  if (book && book.available > 0) {
    book.available -= 1;
    
    const issue = {
      studentId,
      bookId,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'issued'
    };
    
    mockData.bookIssues.push(issue);
    res.json(issue);
  } else {
    res.status(400).json({ message: 'Book not available' });
  }
});

app.post('/api/library/return', authenticateToken, (req, res) => {
  const { studentId, bookId } = req.body;
  const issue = mockData.bookIssues.find(i => i.studentId === studentId && i.bookId === bookId && i.status === 'issued');
  const book = mockData.libraryBooks.find(b => b.id === bookId);
  
  if (issue && book) {
    issue.status = 'returned';
    book.available += 1;
    res.json(issue);
  } else {
    res.status(400).json({ message: 'Issue record not found' });
  }
});

// Leave Routes
app.get('/api/leaves/:studentId', authenticateToken, (req, res) => {
  const leaves = mockData.leaveApplications.filter(l => l.studentId === req.params.studentId);
  res.json(leaves);
});

app.post('/api/leaves', authenticateToken, (req, res) => {
  const newLeave = {
    id: `L${String(mockData.leaveApplications.length + 1).padStart(3, '0')}`,
    ...req.body,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  mockData.leaveApplications.push(newLeave);
  res.json(newLeave);
});

app.put('/api/leaves/:id', authenticateToken, (req, res) => {
  const leave = mockData.leaveApplications.find(l => l.id === req.params.id);
  if (leave) {
    leave.status = req.body.status;
    res.json(leave);
  } else {
    res.status(404).json({ message: 'Leave application not found' });
  }
});

// Transport Routes
app.get('/api/transport/routes', authenticateToken, (req, res) => {
  res.json(mockData.transportRoutes);
});

app.post('/api/transport/assign', authenticateToken, (req, res) => {
  const { studentId, routeId } = req.body;
  const route = mockData.transportRoutes.find(r => r.id === routeId);
  const student = mockData.students.find(s => s.id === studentId);
  
  if (route && student) {
    route.students.push(studentId);
    student.busRoute = routeId;
    res.json({ route, student });
  } else {
    res.status(400).json({ message: 'Route or student not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Demo Credentials:');
  console.log('Admin: admin@example.com / Admin@123');
  console.log('Faculty: faculty@example.com / Faculty@123');
  console.log('Staff: staff@example.com / Staff@123');
  console.log('Student: student@example.com / Student@123');
});