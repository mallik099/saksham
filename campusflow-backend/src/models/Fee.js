const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  feeType: {
    type: String,
    enum: ['tuition', 'hostel', 'library', 'lab', 'exam', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'cash'],
    required: true
  },
  transactionId: String,
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending'
  },
  paidAt: Date,
  receipt: {
    url: String,
    generatedAt: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fee', feeSchema);