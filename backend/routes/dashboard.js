const express = require('express');
const Student = require('../models/Student');
const Fee = require('../models/Fee');
const Hostel = require('../models/Hostel');
const Library = require('../models/Library');
const Exam = require('../models/Exam');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const stats = {};

    if (req.user.role === 'admin') {
      const totalStudents = await Student.countDocuments({ status: 'active' });
      const feeCollection = await Fee.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      
      stats.totalStudents = totalStudents;
      stats.feeCollection = feeCollection[0]?.total || 0;
      stats.hostelOccupancy = 85;
      stats.examRegistrations = await Exam.countDocuments({ status: 'registered' });
      
    } else if (req.user.role === 'staff') {
      stats.hostelRooms = await Hostel.countDocuments();
      stats.libraryBooksIssued = await Library.countDocuments({ status: 'issued' });
      stats.pendingApprovals = await Exam.countDocuments({ status: 'registered' });
      
    } else if (req.user.role === 'student') {
      const feesPaid = await Fee.aggregate([
        { $match: { studentId: req.user.studentId, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      
      stats.feesPaid = feesPaid[0]?.total || 0;
      stats.feesOutstanding = 50000;
      stats.libraryBooksIssued = 3;
      stats.examRegistrations = 6;
      stats.attendancePercentage = 89;
      stats.hasFeesDue = true;
      stats.nextHoliday = 'Diwali - Oct 31, 2024';
      stats.hostelRoom = 'A-204';
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;