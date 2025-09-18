const express = require('express');
const Library = require('../models/Library');
const { auth, authorize } = require('../middleware/auth');
const { logAudit } = require('../utils/auditLogger');

const router = express.Router();

router.post('/issue', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { studentId, bookTitle, bookId } = req.body;
    
    const library = new Library({ studentId, bookTitle, bookId });
    await library.save();
    
    await logAudit(req, 'LIBRARY_ISSUE', `Book ${bookTitle} issued to ${studentId}`, 'Library', library._id);
    
    res.status(201).json({ message: 'Book issued successfully', library });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/return/:id', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    library.returnDate = new Date();
    library.status = 'returned';
    await library.save();
    
    await logAudit(req, 'LIBRARY_RETURN', `Book ${library.bookTitle} returned by ${library.studentId}`, 'Library', library._id);
    
    res.json({ message: 'Book returned successfully', library });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = studentId ? { studentId } : {};
    
    const records = await Library.find(query).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;