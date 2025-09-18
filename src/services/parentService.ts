import { toast } from 'sonner';
import { parentSecurity, securityUtils } from './parentSecurity';

export interface ChildData {
  student: {
    id: string;
    name: string;
    class: string;
    section: string;
    rollNo: string;
    photo?: string;
  };
  attendance: {
    percentage: number;
    present: number;
    absent: number;
    total: number;
  };
  academics: {
    subjects: Array<{
      name: string;
      marks: number;
      total: number;
      grade: string;
    }>;
    average: number;
    rank: number;
    totalStudents: number;
  };
  fees: {
    history: Array<{
      id: number;
      type: string;
      amount: number;
      status: 'Paid' | 'Due';
      date: string;
      receiptId?: string;
    }>;
    totalPaid: number;
    totalDue: number;
  };
  library: {
    books: Array<{
      id: number;
      title: string;
      author: string;
      issueDate: string;
      dueDate: string;
      status: 'Active' | 'Returned' | 'Overdue';
    }>;
  };
  notifications: Array<{
    id: number;
    type: 'fee' | 'exam' | 'library';
    title: string;
    message: string;
    date: string;
    read: boolean;
  }>;
}

// Mock data service - in real app, this would fetch from API
export const getChildData = async (childId: string): Promise<ChildData> => {
  // Security check
  if (!securityUtils.isParentAuthorized(childId)) {
    throw new Error('Access denied: Unauthorized child access');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data for STU001
  if (childId === 'STU001') {
    return {
      student: {
        id: 'STU001',
        name: 'Alex Johnson',
        class: '10th Grade',
        section: 'A',
        rollNo: 'STU001'
      },
      attendance: {
        percentage: 92,
        present: 184,
        absent: 16,
        total: 200
      },
      academics: {
        subjects: [
          { name: 'Mathematics', marks: 85, total: 100, grade: 'A' },
          { name: 'Physics', marks: 78, total: 100, grade: 'B+' },
          { name: 'Chemistry', marks: 92, total: 100, grade: 'A+' },
          { name: 'English', marks: 88, total: 100, grade: 'A' },
          { name: 'Computer Science', marks: 95, total: 100, grade: 'A+' }
        ],
        average: 87.6,
        rank: 3,
        totalStudents: 45
      },
      fees: {
        history: [
          { id: 1, type: 'Tuition Fee', amount: 15000, status: 'Paid', date: '2024-01-15', receiptId: 'RCP001' },
          { id: 2, type: 'Lab Fee', amount: 2500, status: 'Paid', date: '2024-01-20', receiptId: 'RCP002' },
          { id: 3, type: 'Library Fee', amount: 1000, status: 'Due', date: '2024-02-15' },
          { id: 4, type: 'Sports Fee', amount: 3000, status: 'Due', date: '2024-02-20' }
        ],
        totalPaid: 17500,
        totalDue: 4000
      },
      library: {
        books: [
          { id: 1, title: 'Advanced Mathematics', author: 'Dr. Smith', issueDate: '2024-01-10', dueDate: '2024-02-10', status: 'Returned' },
          { id: 2, title: 'Physics Fundamentals', author: 'Prof. Johnson', issueDate: '2024-01-15', dueDate: '2024-02-15', status: 'Active' },
          { id: 3, title: 'Chemistry Lab Manual', author: 'Dr. Brown', issueDate: '2024-01-20', dueDate: '2024-01-25', status: 'Overdue' }
        ]
      },
      notifications: [
        { id: 1, type: 'fee', title: 'Library Fee Due', message: 'Library fee of ₹1,000 is due on Feb 15, 2024', date: '2024-02-10', read: false },
        { id: 2, type: 'exam', title: 'Mid-term Exams', message: 'Mid-term examinations will start from March 1, 2024', date: '2024-02-08', read: false },
        { id: 3, type: 'library', title: 'Book Overdue', message: 'Chemistry Lab Manual is overdue. Please return immediately.', date: '2024-01-26', read: true }
      ]
    };
    
    const mockData = {
    };
    
    // Apply security filtering
    return securityUtils.getSecureChildData(mockData, childId);
  }
  
  throw new Error('Child not found');
};

export const downloadReceipt = async (receiptId: string, childId?: string): Promise<void> => {
  try {
    // Security check
    const authorizedChildId = parentSecurity.getAuthorizedChildId();
    if (!authorizedChildId || (childId && !securityUtils.canDownloadFile('receipt', childId))) {
      throw new Error('Access denied');
    }

    // Mock PDF generation
    const pdfContent = generateReceiptPDF(receiptId);
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success(`Receipt ${receiptId} downloaded successfully`);
  } catch (error) {
    toast.error('Failed to download receipt');
  }
};

export const generateAttendanceReport = async (childId: string): Promise<void> => {
  try {
    // Security check
    if (!securityUtils.canDownloadFile('attendance_report', childId)) {
      throw new Error('Access denied');
    }

    const childData = await getChildData(childId);
    const reportContent = generateAttendancePDF(childData);
    
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-report-${childId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success('Attendance report downloaded successfully');
  } catch (error) {
    toast.error('Failed to generate attendance report');
  }
};

export const generateFeeReport = async (childId: string): Promise<void> => {
  try {
    // Security check
    if (!securityUtils.canDownloadFile('fee_report', childId)) {
      throw new Error('Access denied');
    }

    const childData = await getChildData(childId);
    const reportContent = generateFeePDF(childData);
    
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fee-report-${childId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success('Fee report downloaded successfully');
  } catch (error) {
    toast.error('Failed to generate fee report');
  }
};

// Mock PDF generation functions
const generateReceiptPDF = (receiptId: string): string => {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Fee Receipt ${receiptId}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;
};

const generateAttendancePDF = (childData: ChildData): string => {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 80
>>
stream
BT
/F1 12 Tf
72 720 Td
(Attendance Report for ${childData.student.name}) Tj
0 -20 Td
(Attendance: ${childData.attendance.percentage}%) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
350
%%EOF`;
};

const generateFeePDF = (childData: ChildData): string => {
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 90
>>
stream
BT
/F1 12 Tf
72 720 Td
(Fee Payment Report for ${childData.student.name}) Tj
0 -20 Td
(Total Paid: ₹${childData.fees.totalPaid}) Tj
0 -20 Td
(Total Due: ₹${childData.fees.totalDue}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
370
%%EOF`;
};

export const sendEmailNotification = async (type: string, childId: string): Promise<void> => {
  // Security check
  if (!securityUtils.canSendNotification(type, childId)) {
    throw new Error('Access denied');
  }

  // Mock email service
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  switch (type) {
    case 'fee-due':
      toast.success('Fee due reminder sent to parent email');
      break;
    case 'exam-alert':
      toast.success('Exam schedule notification sent to parent email');
      break;
    case 'library-overdue':
      toast.success('Library overdue reminder sent to parent email');
      break;
    default:
      toast.success('Notification sent to parent email');
  }
};

// Initialize security context when parent logs in
export const initializeParentSecurity = (parentUser: any): void => {
  if (parentUser.role === 'parent' && parentUser.childId) {
    parentSecurity.setSecurityContext({
      id: parentUser.id,
      name: parentUser.name,
      email: parentUser.email,
      role: 'parent',
      childId: parentUser.childId
    });
  }
};

// Clear security context when parent logs out
export const clearParentSecurity = (): void => {
  parentSecurity.clearSecurityContext();
};