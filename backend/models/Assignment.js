const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: Number, required: true },
  assignedDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  maxMarks: { type: Number, required: true },
  attachments: [String],
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submissionDate: { type: Date, default: Date.now },
    files: [String],
    marks: Number,
    feedback: String,
    status: { type: String, enum: ['submitted', 'graded', 'late'], default: 'submitted' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);