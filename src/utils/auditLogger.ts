interface AuditLog {
  timestamp: string;
  userId: string;
  userRole: string;
  action: string;
  details: string;
  entityId?: string;
}

class AuditLogger {
  log(userId: string, userRole: string, action: string, details: string, entityId?: string) {
    const logEntry: AuditLog = {
      timestamp: new Date().toISOString(),
      userId,
      userRole,
      action,
      details,
      entityId
    };
    
    console.log('AUDIT LOG:', logEntry);
    
    const existingLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('auditLogs', JSON.stringify(existingLogs));
  }

  getLogs(): AuditLog[] {
    return JSON.parse(localStorage.getItem('auditLogs') || '[]');
  }
}

export const auditLogger = new AuditLogger();