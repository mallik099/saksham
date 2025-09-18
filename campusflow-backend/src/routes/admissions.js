const express = require('express');
const { body, validationResult } = require('express-validator');
const Admission = require('../models/Admission');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Submit admission application
router.post('/', auth, [
  body('fullName').trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('contactNumber').isMobilePhone(),
  body('course').trim().isLength({ min: 2 }),
  body('academicScore').isNumeric().isFloat({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admission = new Admission({
      ...req.body,
      userId: req.user._id
    });

    await admission.save();
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's admissions
router.get('/my', auth, async (req, res) => {
  try {
    const admissions = await Admission.find({ userId: req.user._id });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all admissions (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const admissions = await Admission.find(query)
      .populate('userId', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Admission.countDocuments(query);
    
    res.json({
      admissions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update admission status (admin only)
router.patch('/:id/status', auth, authorize('admin'), async (req, res) => {
  try {
    const { status, comments } = req.body;
    
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        comments,
        reviewedBy: req.user._id,
        reviewedAt: new Date()
      },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;