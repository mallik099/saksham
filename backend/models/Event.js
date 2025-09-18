const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['academic', 'cultural', 'sports', 'technical', 'workshop'], required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationRequired: { type: Boolean, default: false },
  maxParticipants: Number,
  registeredParticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  fee: { type: Number, default: 0 },
  poster: String,
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);