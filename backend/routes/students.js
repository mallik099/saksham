const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');
const { logAudit } = require('../utils/auditLogger');

const router = express.Router();

// Multer config for photo upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `student_${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Create student admission
router.post('/', auth, authorize('admin', 'staff'), upload.single('photo'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^\+91-\d{10}$/).withMessage('Phone must be in format +91-XXXXXXXXXX'),
  body('dob').isISO8601().withMessage('Valid date of birth is required'),
  body('course').notEmpty().withMessage('Course is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentData = {
      ...req.body,
      photo: req.file ? req.file.filename : null,
      address: JSON.parse(req.body.address || '{}'),
      academicInfo: JSON.parse(req.body.academicInfo || '{}')
    };

    const student = new Student(studentData);
    await student.save();

    await logAudit(req, 'STUDENT_ADMISSION', `New student admitted: ${student.name}`, 'Student', student._id);

    res.status(201).json({ message: 'Student admitted successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all students
router.get('/', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const students = await Student.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Students can only view their own data
    if (req.user.role === 'student' && req.user.studentId !== student.studentId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;