const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  duration: { type: Number, required: true }, // in semesters
  totalSeats: { type: Number, required: true },
  occupiedSeats: { type: Number, default: 0 },
  feeStructure: {
    tuitionFee: { type: Number, required: true },
    labFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },
    otherFees: { type: Number, default: 0 }
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);