const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  studentId: { type: String, required: true, ref: 'Student' },
  bookTitle: { type: String, required: true },
  bookId: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: Date,
  status: { type: String, enum: ['issued', 'returned', 'overdue'], default: 'issued' },
  fine: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-calculate due date (14 days from issue)
librarySchema.pre('save', function(next) {
  if (!this.dueDate && this.issueDate) {
    this.dueDate = new Date(this.issueDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  }
  
  // Check if overdue
  if (this.status === 'issued' && new Date() > this.dueDate) {
    this.status = 'overdue';
    const daysOverdue = Math.ceil((new Date() - this.dueDate) / (1000 * 60 * 60 * 24));
    this.fine = daysOverdue * 5; // ₹5 per day fine
  }
  
  next();
});

module.exports = mongoose.model('Library', librarySchema);