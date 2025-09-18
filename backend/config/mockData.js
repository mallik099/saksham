const bcrypt = require('bcryptjs');

// Demo users with hardcoded credentials
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

// Mock students data
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

// Mock attendance data
const attendance = [
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Physics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-16', status: 'absent' },
  { studentId: 'STU002', subject: 'Chemistry', date: '2024-01-15', status: 'present' }
];

// Mock exam results
const examResults = [
  { studentId: 'STU001', subject: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
  { studentId: 'STU001', subject: 'Physics', marks: 78, totalMarks: 100, grade: 'B+' },
  { studentId: 'STU002', subject: 'Chemistry', marks: 92, totalMarks: 100, grade: 'A+' }
];

// Mock fee records
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

// Mock hostel data
const hostelRooms = [
  { roomNumber: 'A-101', block: 'A', capacity: 2, occupied: 1, students: ['STU001'] },
  { roomNumber: 'A-102', block: 'A', capacity: 2, occupied: 0, students: [] },
  { roomNumber: 'B-205', block: 'B', capacity: 3, occupied: 1, students: ['STU002'] }
];

// Mock library data
const libraryBooks = [
  { id: 'B001', title: 'Data Structures', author: 'Cormen', available: 5, total: 10 },
  { id: 'B002', title: 'Physics Fundamentals', author: 'Resnick', available: 3, total: 8 }
];

const bookIssues = [
  { studentId: 'STU001', bookId: 'B001', issueDate: '2024-01-10', dueDate: '2024-01-24', status: 'issued' }
];

// Mock leave applications
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

// Mock transport routes
const transportRoutes = [
  { id: 'Route-1', name: 'City Center Route', students: ['STU001'], capacity: 40 },
  { id: 'Route-2', name: 'Suburb Route', students: ['STU002'], capacity: 35 }
];

module.exports = {
  users,
  students,
  attendance,
  examResults,
  feeRecords,
  hostelRooms,
  libraryBooks,
  bookIssues,
  leaveApplications,
  transportRoutes
};