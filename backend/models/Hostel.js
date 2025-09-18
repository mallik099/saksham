const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  block: { type: String, required: true },
  capacity: { type: Number, required: true },
  occupied: { type: Number, default: 0 },
  students: [{ type: String, ref: 'Student' }],
  status: { type: String, enum: ['available', 'full', 'maintenance'], default: 'available' },
  facilities: [String],
  rent: { type: Number, required: true }
}, { timestamps: true });

// Update status based on occupancy
hostelSchema.pre('save', function(next) {
  if (this.occupied >= this.capacity) {
    this.status = 'full';
  } else if (this.occupied === 0) {
    this.status = 'available';
  }
  next();
});

module.exports = mongoose.model('Hostel', hostelSchema);