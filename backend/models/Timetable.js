const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  semester: { type: Number, required: true },
  dayOfWeek: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], required: true },
  timeSlot: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  room: { type: String, required: true },
  type: { type: String, enum: ['lecture', 'lab', 'tutorial'], default: 'lecture' }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);