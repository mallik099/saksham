const bcrypt = require('bcryptjs');

// Demo users with hardcoded credentials
const users = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'admin@saksham.edu',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: '2',
    name: 'Prof. Priya Sharma',
    email: 'faculty@saksham.edu',
    password: bcrypt.hashSync('faculty123', 10),
    role: 'faculty'
  },
  {
    id: '3',
    name: 'Suresh Gupta',
    email: 'staff@saksham.edu',
    password: bcrypt.hashSync('staff123', 10),
    role: 'staff'
  },
  {
    id: '4',
    name: 'Arjun Patel',
    email: 'student@saksham.edu',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    studentId: 'STU001'
  },
  {
    id: '5',
    name: 'Mrs. Sunita Patel',
    email: 'parent@saksham.edu',
    password: bcrypt.hashSync('parent123', 10),
    role: 'parent',
    childId: 'STU001'
  }
];

// Mock students data
const students = [
  {
    id: 'STU001',
    name: 'Arjun Patel',
    email: 'arjun.patel@saksham.edu',
    phone: '+91-9876543210',
    course: 'Computer Science Engineering',
    semester: 6,
    admissionDate: '2021-08-15',
    hostelRoom: 'A-101',
    busRoute: 'Route-1',
    status: 'active',
    address: 'Koramangala, Bangalore, Karnataka - 560034'
  },
  {
    id: 'STU002',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@saksham.edu',
    phone: '+91-9876543211',
    course: 'Electronics & Communication',
    semester: 4,
    admissionDate: '2022-08-10',
    hostelRoom: 'B-205',
    busRoute: 'Route-2',
    status: 'active',
    address: 'Jayanagar, Bangalore, Karnataka - 560011'
  },
  {
    id: 'STU003',
    name: 'Rahul Singh',
    email: 'rahul.singh@saksham.edu',
    phone: '+91-9876543212',
    course: 'Mechanical Engineering',
    semester: 2,
    admissionDate: '2023-08-12',
    hostelRoom: 'A-102',
    busRoute: 'Route-1',
    status: 'active',
    address: 'Indiranagar, Bangalore, Karnataka - 560038'
  },
  {
    id: 'STU004',
    name: 'Priya Nair',
    email: 'priya.nair@saksham.edu',
    phone: '+91-9876543213',
    course: 'Civil Engineering',
    semester: 8,
    admissionDate: '2020-08-20',
    hostelRoom: 'B-301',
    busRoute: 'Route-2',
    status: 'active',
    address: 'BTM Layout, Bangalore, Karnataka - 560076'
  },
  {
    id: 'STU005',
    name: 'Amit Kumar',
    email: 'amit.kumar@saksham.edu',
    phone: '+91-9876543214',
    course: 'Information Technology',
    semester: 6,
    admissionDate: '2021-08-18',
    hostelRoom: null,
    busRoute: null,
    status: 'active',
    address: 'Whitefield, Bangalore, Karnataka - 560066'
  }
];

// Mock attendance data
const attendance = [
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Physics', date: '2024-01-15', status: 'present' },
  { studentId: 'STU001', subject: 'Mathematics', date: '2024-01-16', status: 'absent' },
  { studentId: 'STU001', subject: 'Computer Networks', date: '2024-01-17', status: 'present' },
  { studentId: 'STU002', subject: 'Chemistry', date: '2024-01-15', status: 'present' },
  { studentId: 'STU002', subject: 'Electronics', date: '2024-01-16', status: 'present' },
  { studentId: 'STU003', subject: 'Thermodynamics', date: '2024-01-15', status: 'absent' },
  { studentId: 'STU004', subject: 'Structural Analysis', date: '2024-01-15', status: 'present' },
  { studentId: 'STU005', subject: 'Database Systems', date: '2024-01-15', status: 'present' }
];

// Mock exam results
const examResults = [
  { studentId: 'STU001', subject: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
  { studentId: 'STU001', subject: 'Physics', marks: 78, totalMarks: 100, grade: 'B+' },
  { studentId: 'STU001', subject: 'Computer Networks', marks: 88, totalMarks: 100, grade: 'A' },
  { studentId: 'STU002', subject: 'Chemistry', marks: 92, totalMarks: 100, grade: 'A+' },
  { studentId: 'STU002', subject: 'Electronics', marks: 76, totalMarks: 100, grade: 'B+' },
  { studentId: 'STU003', subject: 'Thermodynamics', marks: 65, totalMarks: 100, grade: 'B' },
  { studentId: 'STU004', subject: 'Structural Analysis', marks: 94, totalMarks: 100, grade: 'A+' },
  { studentId: 'STU005', subject: 'Database Systems', marks: 82, totalMarks: 100, grade: 'A' }
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
  },
  {
    id: 'FEE003',
    studentId: 'STU003',
    amount: 48000,
    paidAmount: 0,
    pendingAmount: 48000,
    semester: 1,
    dueDate: '2024-03-01',
    status: 'pending'
  },
  {
    id: 'FEE004',
    studentId: 'STU004',
    amount: 52000,
    paidAmount: 52000,
    pendingAmount: 0,
    semester: 4,
    dueDate: '2024-01-10',
    status: 'completed'
  },
  {
    id: 'FEE005',
    studentId: 'STU005',
    amount: 49000,
    paidAmount: 25000,
    pendingAmount: 24000,
    semester: 3,
    dueDate: '2024-02-20',
    status: 'partial'
  }
];

// Mock hostel data
const hostelRooms = [
  { roomNumber: 'A-101', block: 'A', capacity: 2, occupied: 1, students: ['STU001'] },
  { roomNumber: 'A-102', block: 'A', capacity: 2, occupied: 1, students: ['STU003'] },
  { roomNumber: 'A-103', block: 'A', capacity: 2, occupied: 0, students: [] },
  { roomNumber: 'B-205', block: 'B', capacity: 3, occupied: 1, students: ['STU002'] },
  { roomNumber: 'B-301', block: 'B', capacity: 2, occupied: 1, students: ['STU004'] },
  { roomNumber: 'B-302', block: 'B', capacity: 3, occupied: 0, students: [] },
  { roomNumber: 'C-101', block: 'C', capacity: 2, occupied: 0, students: [] },
  { roomNumber: 'C-102', block: 'C', capacity: 2, occupied: 0, students: [] }
];

// Mock library data
const libraryBooks = [
  { id: 'B001', title: 'Data Structures', author: 'Cormen', available: 5, total: 10 },
  { id: 'B002', title: 'Physics Fundamentals', author: 'Resnick', available: 3, total: 8 },
  { id: 'B003', title: 'Database Systems', author: 'Silberschatz', available: 7, total: 12 },
  { id: 'B004', title: 'Computer Networks', author: 'Tanenbaum', available: 4, total: 9 },
  { id: 'B005', title: 'Operating Systems', author: 'Galvin', available: 6, total: 10 },
  { id: 'B006', title: 'Engineering Mathematics', author: 'Kreyszig', available: 8, total: 15 }
];

const bookIssues = [
  { studentId: 'STU001', bookId: 'B001', issueDate: '2024-01-10', dueDate: '2024-01-24', status: 'issued' },
  { studentId: 'STU002', bookId: 'B002', issueDate: '2024-01-12', dueDate: '2024-01-26', status: 'issued' },
  { studentId: 'STU003', bookId: 'B006', issueDate: '2024-01-08', dueDate: '2024-01-22', status: 'overdue' },
  { studentId: 'STU004', bookId: 'B003', issueDate: '2024-01-05', dueDate: '2024-01-19', status: 'returned' }
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
  },
  {
    id: 'L002',
    studentId: 'STU002',
    reason: 'Family Function',
    fromDate: '2024-02-05',
    toDate: '2024-02-07',
    status: 'approved',
    appliedDate: '2024-01-25'
  },
  {
    id: 'L003',
    studentId: 'STU003',
    reason: 'Personal Work',
    fromDate: '2024-01-15',
    toDate: '2024-01-16',
    status: 'rejected',
    appliedDate: '2024-01-12'
  }
];

// Mock transport routes
const transportRoutes = [
  { id: 'Route-1', name: 'City Center Route', students: ['STU001', 'STU003'], capacity: 40 },
  { id: 'Route-2', name: 'Suburb Route', students: ['STU002', 'STU004'], capacity: 35 },
  { id: 'Route-3', name: 'Tech Park Route', students: [], capacity: 45 }
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