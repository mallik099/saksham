import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ExamApplication {
  id: string;
  studentName: string;
  rollNo: string;
  examType: string;
  subject: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockApplications: ExamApplication[] = [
  { id: '1', studentName: 'Rahul Sharma', rollNo: '21CSE001', examType: 'Semester', subject: 'Data Structures', applicationDate: '2024-01-15', status: 'pending' },
  { id: '2', studentName: 'Priya Patel', rollNo: '21CSE002', examType: 'Makeup', subject: 'Algorithms', applicationDate: '2024-01-10', status: 'approved' },
  { id: '3', studentName: 'Amit Kumar', rollNo: '21ECE001', examType: 'Semester', subject: 'Digital Electronics', applicationDate: '2024-01-20', status: 'pending' },
];

export function ExamApprovals() {
  const [applications, setApplications] = useState(mockApplications);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id: string) => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    ));
  };

  const handleReject = (id: string) => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status: 'rejected' as const } : app
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{applications.filter(a => a.status === 'rejected').length}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{app.studentName}</p>
                  <p className="text-sm text-muted-foreground">{app.rollNo} - {app.examType} Exam</p>
                  <p className="text-sm text-muted-foreground">Subject: {app.subject}</p>
                  <p className="text-xs text-muted-foreground">Applied: {new Date(app.applicationDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  {app.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleApprove(app.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(app.id)}>
                        <XCircle className="h-4 w-4 mr-1" />Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}