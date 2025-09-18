const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userRole: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  entityType: String,
  entityId: String,
  ipAddress: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

// Index for efficient querying
auditSchema.index({ timestamp: -1 });
auditSchema.index({ userId: 1 });
auditSchema.index({ action: 1 });

module.exports = mongoose.model('Audit', auditSchema);