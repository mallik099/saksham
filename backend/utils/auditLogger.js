const Audit = require('../models/Audit');

const logAudit = async (req, action, details, entityType = null, entityId = null) => {
  try {
    await Audit.create({
      userId: req.user?.id || 'system',
      userRole: req.user?.role || 'system',
      action,
      details,
      entityType,
      entityId,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
  } catch (error) {
    console.error('Audit logging failed:', error);
  }
};

module.exports = { logAudit };