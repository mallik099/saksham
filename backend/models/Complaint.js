const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, unique: true },
  complainant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['academic', 'hostel', 'transport', 'library', 'canteen', 'infrastructure', 'other'], required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [String],
  resolution: String,
  resolvedDate: Date,
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  }
}, { timestamps: true });

complaintSchema.pre('save', async function(next) {
  if (!this.complaintId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Complaint').countDocuments();
    this.complaintId = `CMP${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);