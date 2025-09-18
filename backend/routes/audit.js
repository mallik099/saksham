const express = require('express');
const Audit = require('../models/Audit');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 50, action, userId } = req.query;
    
    let query = {};
    if (action) query.action = action;
    if (userId) query.userId = userId;
    
    const logs = await Audit.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ timestamp: -1 });
    
    const total = await Audit.countDocuments(query);
    
    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;