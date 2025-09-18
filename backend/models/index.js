// Core Models
const User = require('./User');
const Student = require('./Student');
const Faculty = require('./Faculty');
const Department = require('./Department');

// Academic Models
const Course = require('./Course');
const Subject = require('./Subject');
const Exam = require('./Exam');
const Assignment = require('./Assignment');
const Attendance = require('./Attendance');
const Timetable = require('./Timetable');

// Financial Models
const Fee = require('./Fee');

// Infrastructure Models
const Hostel = require('./Hostel');
const Transport = require('./Transport');

// Library Models
const Library = require('./Library');
const Book = require('./Book');

// Communication Models
const Notice = require('./Notice');
const Complaint = require('./Complaint');

// Event Models
const Event = require('./Event');

// Audit Model
const Audit = require('./Audit');

module.exports = {
  // Core
  User,
  Student,
  Faculty,
  Department,
  
  // Academic
  Course,
  Subject,
  Exam,
  Assignment,
  Attendance,
  Timetable,
  
  // Financial
  Fee,
  
  // Infrastructure
  Hostel,
  Transport,
  
  // Library
  Library,
  Book,
  
  // Communication
  Notice,
  Complaint,
  
  // Events
  Event,
  
  // System
  Audit
};