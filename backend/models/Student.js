const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, match: /^\+91-\d{10}$/ },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  semester: { type: Number, default: 1 },
  admissionDate: { type: Date, default: Date.now },
  photo: String,
  academicInfo: {
    previousEducation: String,
    marks: Number,
    board: String,
    entranceExam: {
      name: String,
      score: Number,
      rank: Number
    }
  },
  guardian: {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    occupation: String
  },
  hostel: {
    isHostelite: { type: Boolean, default: false },
    roomNumber: String,
    block: String
  },
  library: {
    cardNumber: String,
    booksIssued: { type: Number, default: 0 },
    fineAmount: { type: Number, default: 0 }
  },
  fees: {
    totalFee: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['active', 'inactive', 'graduated', 'suspended'], default: 'active' }
}, { timestamps: true });

// Auto-generate student ID
studentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.model('Student').countDocuments();
    this.studentId = `${year}STU${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);