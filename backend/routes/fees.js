const express = require('express');
const { body, validationResult } = require('express-validator');
const Fee = require('../models/Fee');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');
const { logAudit } = require('../utils/auditLogger');
const { generateFeeReceipt } = require('../utils/pdfGenerator');

const router = express.Router();

// Record fee payment
router.post('/', auth, authorize('admin', 'staff', 'student'), [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('amount').isNumeric().withMessage('Amount must be numeric'),
  body('feeType').notEmpty().withMessage('Fee type is required'),
  body('paymentMode').notEmpty().withMessage('Payment mode is required'),
  body('transactionId').notEmpty().withMessage('Transaction ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { studentId, amount, feeType, paymentMode, transactionId } = req.body;

    // Verify student exists
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Students can only pay their own fees
    if (req.user.role === 'student' && req.user.studentId !== studentId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const fee = new Fee({
      studentId,
      amount,
      feeType,
      paymentMode,
      transactionId
    });

    await fee.save();

    // Generate PDF receipt
    try {
      const receiptFilename = await generateFeeReceipt(fee, student);
      fee.receiptPath = receiptFilename;
      await fee.save();
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
    }

    await logAudit(req, 'FEE_PAYMENT', `Fee payment of ₹${amount} recorded for ${studentId}`, 'Fee', fee._id);

    res.status(201).json({
      message: 'Fee payment recorded successfully',
      fee,
      receiptUrl: fee.receiptPath ? `/uploads/${fee.receiptPath}` : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get fee records
router.get('/', auth, async (req, res) => {
  try {
    const { studentId, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Students can only see their own fees
    if (req.user.role === 'student') {
      query.studentId = req.user.studentId;
    } else if (studentId) {
      query.studentId = studentId;
    }

    const fees = await Fee.find(query)
      .populate('studentId', 'name course')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Fee.countDocuments(query);

    res.json({
      fees,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get fee statistics
router.get('/stats', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const totalCollected = await Fee.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyCollection = await Fee.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$paymentDate' } },
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 12 }
    ]);

    res.json({
      totalCollected: totalCollected[0]?.total || 0,
      monthlyCollection
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;