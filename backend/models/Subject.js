const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: Number, required: true },
  credits: { type: Number, required: true },
  type: { type: String, enum: ['theory', 'practical', 'project'], required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  syllabus: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);