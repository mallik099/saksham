const express = require('express');
const Exam = require('../models/Exam');
const { auth, authorize } = require('../middleware/auth');
const { logAudit } = require('../utils/auditLogger');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { subject, examType, examDate } = req.body;
    
    const studentId = req.user.role === 'student' ? req.user.studentId : req.body.studentId;
    
    const exam = new Exam({ studentId, subject, examType, examDate });
    await exam.save();
    
    await logAudit(req, 'EXAM_REGISTER', `Exam registered for ${subject} by ${studentId}`, 'Exam', exam._id);
    
    res.status(201).json({ message: 'Exam registered successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/marks', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { marks, attendance } = req.body;
    
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    exam.marks = marks;
    exam.attendance = attendance;
    exam.status = attendance ? 'appeared' : 'absent';
    await exam.save();
    
    await logAudit(req, 'EXAM_MARKS', `Marks ${marks} recorded for exam ${exam.subject}`, 'Exam', exam._id);
    
    res.json({ message: 'Marks recorded successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    let query = {};
    
    if (req.user.role === 'student') {
      query.studentId = req.user.studentId;
    } else if (studentId) {
      query.studentId = studentId;
    }
    
    const exams = await Exam.find(query).sort({ examDate: -1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;