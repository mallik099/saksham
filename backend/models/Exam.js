const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  examType: { type: String, enum: ['semester', 'internal', 'makeup', 'assignment', 'project'], required: true },
  examDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, min: 0 },
  grade: String,
  gpa: Number,
  attendance: { type: Boolean, default: false },
  examCenter: String,
  seatNumber: String,
  invigilator: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  status: { type: String, enum: ['scheduled', 'registered', 'appeared', 'absent', 'cancelled'], default: 'scheduled' },
  remarks: String
}, { timestamps: true });

// Auto-calculate grade and GPA
examSchema.pre('save', function(next) {
  if (this.obtainedMarks !== undefined && this.totalMarks) {
    const percentage = (this.obtainedMarks / this.totalMarks) * 100;
    
    if (percentage >= 90) {
      this.grade = 'A+';
      this.gpa = 10;
    } else if (percentage >= 80) {
      this.grade = 'A';
      this.gpa = 9;
    } else if (percentage >= 70) {
      this.grade = 'B+';
      this.gpa = 8;
    } else if (percentage >= 60) {
      this.grade = 'B';
      this.gpa = 7;
    } else if (percentage >= 50) {
      this.grade = 'C';
      this.gpa = 6;
    } else if (percentage >= 40) {
      this.grade = 'D';
      this.gpa = 5;
    } else {
      this.grade = 'F';
      this.gpa = 0;
    }
  }
  next();
});

module.exports = mongoose.model('Exam', examSchema);