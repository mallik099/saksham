import { toast } from 'sonner';

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  role: 'parent';
  childId: string;
}

export interface SecurityContext {
  parentId: string;
  childId: string;
  permissions: string[];
}

// Security service to ensure parents can only access their child's data
export class ParentSecurityService {
  private static instance: ParentSecurityService;
  private securityContext: SecurityContext | null = null;

  private constructor() {}

  public static getInstance(): ParentSecurityService {
    if (!ParentSecurityService.instance) {
      ParentSecurityService.instance = new ParentSecurityService();
    }
    return ParentSecurityService.instance;
  }

  public setSecurityContext(parentUser: ParentUser): void {
    this.securityContext = {
      parentId: parentUser.id,
      childId: parentUser.childId,
      permissions: [
        'view_child_academics',
        'view_child_attendance',
        'view_child_fees',
        'view_child_library',
        'download_receipts',
        'download_reports',
        'receive_notifications'
      ]
    };
  }

  public clearSecurityContext(): void {
    this.securityContext = null;
  }

  public validateChildAccess(requestedChildId: string): boolean {
    if (!this.securityContext) {
      toast.error('Security context not initialized');
      return false;
    }

    if (this.securityContext.childId !== requestedChildId) {
      toast.error('Access denied: You can only view your child\'s data');
      return false;
    }

    return true;
  }

  public hasPermission(permission: string): boolean {
    if (!this.securityContext) {
      return false;
    }

    return this.securityContext.permissions.includes(permission);
  }

  public getAuthorizedChildId(): string | null {
    return this.securityContext?.childId || null;
  }

  public validateDataAccess(data: any, childId: string): boolean {
    // Ensure all data belongs to the authorized child
    if (!this.validateChildAccess(childId)) {
      return false;
    }

    // Additional validation can be added here
    // For example, checking if data contains sensitive information
    // that should be filtered out for parents

    return true;
  }

  public filterSensitiveData(data: any): any {
    // Remove any sensitive information that parents shouldn't see
    const filteredData = { ...data };

    // Remove internal IDs, teacher comments, disciplinary records, etc.
    if (filteredData.student) {
      delete filteredData.student.internalId;
      delete filteredData.student.disciplinaryRecords;
      delete filteredData.student.teacherComments;
    }

    if (filteredData.academics && filteredData.academics.subjects) {
      filteredData.academics.subjects = filteredData.academics.subjects.map((subject: any) => ({
        name: subject.name,
        marks: subject.marks,
        total: subject.total,
        grade: subject.grade
        // Remove internal assessment details, teacher remarks, etc.
      }));
    }

    return filteredData;
  }

  public logAccess(action: string, childId: string): void {
    if (!this.securityContext) {
      return;
    }

    // In a real application, this would log to a security audit system
    console.log(`Parent Access Log: ${this.securityContext.parentId} performed ${action} for child ${childId} at ${new Date().toISOString()}`);
  }

  public validateFileDownload(fileType: string, childId: string): boolean {
    if (!this.validateChildAccess(childId)) {
      return false;
    }

    const allowedFileTypes = ['receipt', 'attendance_report', 'fee_report'];
    
    if (!allowedFileTypes.includes(fileType)) {
      toast.error('File type not allowed for download');
      return false;
    }

    if (!this.hasPermission('download_receipts') && fileType === 'receipt') {
      toast.error('Permission denied: Cannot download receipts');
      return false;
    }

    if (!this.hasPermission('download_reports') && (fileType === 'attendance_report' || fileType === 'fee_report')) {
      toast.error('Permission denied: Cannot download reports');
      return false;
    }

    return true;
  }

  public validateEmailNotification(notificationType: string, childId: string): boolean {
    if (!this.validateChildAccess(childId)) {
      return false;
    }

    if (!this.hasPermission('receive_notifications')) {
      toast.error('Permission denied: Cannot send notifications');
      return false;
    }

    const allowedNotificationTypes = ['fee-due', 'exam-alert', 'library-overdue'];
    
    if (!allowedNotificationTypes.includes(notificationType)) {
      toast.error('Notification type not allowed');
      return false;
    }

    return true;
  }
}

// Singleton instance
export const parentSecurity = ParentSecurityService.getInstance();

// Decorator function for securing parent API calls
export function secureParentAccess(childId: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!parentSecurity.validateChildAccess(childId)) {
        throw new Error('Access denied');
      }

      parentSecurity.logAccess(propertyName, childId);
      return method.apply(this, args);
    };
  };
}

// Utility functions for common security checks
export const securityUtils = {
  isParentAuthorized: (childId: string): boolean => {
    return parentSecurity.validateChildAccess(childId);
  },

  getSecureChildData: (data: any, childId: string): any => {
    if (!parentSecurity.validateDataAccess(data, childId)) {
      throw new Error('Data access validation failed');
    }
    return parentSecurity.filterSensitiveData(data);
  },

  canDownloadFile: (fileType: string, childId: string): boolean => {
    return parentSecurity.validateFileDownload(fileType, childId);
  },

  canSendNotification: (notificationType: string, childId: string): boolean => {
    return parentSecurity.validateEmailNotification(notificationType, childId);
  }
};