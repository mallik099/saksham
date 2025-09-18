const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  designation: { type: String, required: true },
  qualification: [String],
  experience: { type: Number, default: 0 },
  salary: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  joiningDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

facultySchema.pre('save', async function(next) {
  if (!this.employeeId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.model('Faculty').countDocuments();
    this.employeeId = `${year}FAC${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Faculty', facultySchema);