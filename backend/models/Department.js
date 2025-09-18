const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  budget: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);