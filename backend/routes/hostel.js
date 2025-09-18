const express = require('express');
const Hostel = require('../models/Hostel');
const { auth, authorize } = require('../middleware/auth');
const { logAudit } = require('../utils/auditLogger');

const router = express.Router();

router.post('/assign', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { roomNumber, studentId } = req.body;
    
    const room = await Hostel.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    if (room.occupied >= room.capacity) {
      return res.status(400).json({ message: 'Room is full' });
    }
    
    room.students.push(studentId);
    room.occupied += 1;
    await room.save();
    
    await logAudit(req, 'HOSTEL_ASSIGN', `Room ${roomNumber} assigned to ${studentId}`, 'Hostel', room._id);
    
    res.json({ message: 'Room assigned successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const rooms = await Hostel.find().populate('students', 'name studentId');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;