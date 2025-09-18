const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  examTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'cancelled', 'completed'],
    default: 'registered'
  },
  result: {
    marksObtained: Number,
    grade: String,
    publishedAt: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);