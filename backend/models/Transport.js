const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  driver: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true }
  },
  vehicle: {
    number: { type: String, required: true },
    type: { type: String, enum: ['bus', 'van'], required: true },
    capacity: { type: Number, required: true }
  },
  stops: [{
    name: { type: String, required: true },
    time: { type: String, required: true },
    fare: { type: Number, required: true }
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);