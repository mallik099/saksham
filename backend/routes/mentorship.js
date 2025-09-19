const express = require('express');
const router = express.Router();

// Mock data for testing
const mockFaculty = [
  { id: 1, name: 'Dr. Sarah Johnson', designation: 'Associate Professor', specialization: ['Data Structures', 'AI'], availableSlots: 3 },
  { id: 2, name: 'Prof. Michael Chen', designation: 'Assistant Professor', specialization: ['Database', 'Web Dev'], availableSlots: 2 }
];

const mockMentees = [
  { id: 1, name: 'John Doe', rollNumber: 'CS2021001', branch: 'Computer Science', semester: 5, attendance: 85, marks: 78, backlogs: 0 },
  { id: 2, name: 'Jane Smith', rollNumber: 'CS2021002', branch: 'Computer Science', semester: 5, attendance: 92, marks: 85, backlogs: 1 }
];

router.get('/faculty', (req, res) => {
  res.json(mockFaculty);
});

router.get('/mentees/:facultyId', (req, res) => {
  res.json(mockMentees);
});

router.post('/assign', (req, res) => {
  res.json({ message: 'Mentor assigned successfully' });
});

router.post('/note', (req, res) => {
  res.json({ message: 'Note added successfully' });
});

router.post('/feedback', (req, res) => {
  res.json({ message: 'Feedback added successfully' });
});

router.post('/meeting', (req, res) => {
  res.json({ message: 'Meeting scheduled successfully' });
});

module.exports = router;