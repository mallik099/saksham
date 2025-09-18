const express = require('express');
const { body, validationResult } = require('express-validator');
const Exam = require('../models/Exam');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Register for exam
router.post('/', auth, [
  body('examName').trim().isLength({ min: 2 }),
  body('subject').trim().isLength({ min: 2 }),
  body('examDate').isISO8601(),
  body('examTime').trim().isLength({ min: 1 }),
  body('venue').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exam = new Exam({
      ...req.body,
      userId: req.user._id
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's exam registrations
router.get('/my', auth, async (req, res) => {
  try {
    const exams = await Exam.find({ userId: req.user._id })
      .sort({ examDate: 1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all exam registrations (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const exams = await Exam.find(query)
      .populate('userId', 'name email studentId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ examDate: 1 });

    const total = await Exam.countDocuments(query);
    
    res.json({
      exams,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel exam registration
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const exam = await Exam.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam registration not found' });
    }

    if (exam.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed exam' });
    }

    exam.status = 'cancelled';
    await exam.save();
    
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;