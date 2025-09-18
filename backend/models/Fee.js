const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  academicYear: { type: String, required: true },
  semester: { type: Number, required: true },
  feeStructure: {
    tuitionFee: { type: Number, required: true },
    labFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },
    hostelFee: { type: Number, default: 0 },
    transportFee: { type: Number, default: 0 },
    otherFees: { type: Number, default: 0 }
  },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  pendingAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paymentMode: { type: String, enum: ['cash', 'card', 'upi', 'netbanking', 'cheque'] },
  transactionId: String,
  paymentDate: Date,
  receiptNumber: { type: String, unique: true },
  status: { type: String, enum: ['pending', 'partial', 'completed', 'overdue', 'failed'], default: 'pending' },
  receiptPath: String,
  lateFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  scholarship: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-generate receipt number
feeSchema.pre('save', async function(next) {
  if (!this.receiptNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Fee').countDocuments();
    this.receiptNumber = `RCP${year}${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Fee', feeSchema);