const express = require('express');
const { body, validationResult } = require('express-validator');
const Fee = require('../models/Fee');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Create fee record (admin only)
router.post('/', auth, authorize('admin'), [
  body('studentId').trim().isLength({ min: 1 }),
  body('feeType').isIn(['tuition', 'hostel', 'library', 'lab', 'exam', 'other']),
  body('amount').isNumeric().isFloat({ min: 0 }),
  body('dueDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Pay fee
router.post('/:id/pay', auth, [
  body('paymentMode').isIn(['credit_card', 'debit_card', 'net_banking', 'upi', 'cash']),
  body('transactionId').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentMode, transactionId } = req.body;
    
    const fee = await Fee.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!fee) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    if (fee.status === 'paid') {
      return res.status(400).json({ message: 'Fee already paid' });
    }

    fee.paymentMode = paymentMode;
    fee.transactionId = transactionId;
    fee.status = 'paid';
    fee.paidAt = new Date();

    await fee.save();
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's fees
router.get('/my', auth, async (req, res) => {
  try {
    const fees = await Fee.find({ userId: req.user._id })
      .sort({ dueDate: 1 });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all fees (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const fees = await Fee.find(query)
      .populate('userId', 'name email studentId')
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

module.exports = router;