import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ClipboardList, Calendar, Download, Check, X, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const StaffLeaves = () => {
  const leaveApplications = [
    {
      id: 'LV001',
      studentName: 'John Doe',
      rollNo: 'CS21001',
      course: 'Computer Science',
      fromDate: '2024-03-10',
      toDate: '2024-03-12',
      days: 3,
      reason: 'Medical - Fever and cold',
      type: 'Medical',
      appliedDate: '2024-03-08',
      status: 'Pending',
      documents: ['Medical Certificate']
    },
    {
      id: 'LV002',
      studentName: 'Jane Smith',
      rollNo: 'CS21002',
      course: 'Computer Science',
      fromDate: '2024-03-15',
      toDate: '2024-03-15',
      days: 1,
      reason: 'Personal work - Family function',
      type: 'Personal',
      appliedDate: '2024-03-12',
      status: 'Pending',
      documents: []
    },
    {
      id: 'LV003',
      studentName: 'Mike Johnson',
      rollNo: 'CS21003',
      course: 'Computer Science',
      fromDate: '2024-03-05',
      toDate: '2024-03-07',
      days: 3,
      reason: 'Emergency - Family emergency',
      type: 'Emergency',
      appliedDate: '2024-03-04',
      status: 'Approved',
      documents: []
    },
    {
      id: 'LV004',
      studentName: 'Sarah Wilson',
      rollNo: 'EC21004',
      course: 'Electronics',
      fromDate: '2024-03-01',
      toDate: '2024-03-02',
      days: 2,
      reason: 'Medical - Doctor appointment',
      type: 'Medical',
      appliedDate: '2024-02-28',
      status: 'Rejected',
      documents: ['Medical Certificate']
    }
  ];

  const [applications, setApplications] = useState(leaveApplications);

  const approveLeave = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
    alert('Leave application approved!');
  };

  const rejectLeave = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Rejected' } : app
    ));
    alert('Leave application rejected.');
  };

  const generateLeaveReport = () => {
    alert('Leave applications report generated and downloaded!');
  };

  const LeaveDetailsDialog = ({ application }: { application: any }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Student Name</label>
          <p className="text-lg font-medium">{application.studentName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Roll Number</label>
          <p className="text-lg font-medium">{application.rollNo}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Course</label>
          <p>{application.course}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Leave Type</label>
          <Badge variant="secondary">{application.type}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">From Date</label>
          <p className="font-medium">{application.fromDate}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">To Date</label>
          <p className="font-medium">{application.toDate}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Duration</label>
        <p className="font-medium">{application.days} day(s)</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Reason</label>
        <p className="p-3 bg-gray-50 rounded-lg">{application.reason}</p>
      </div>

      {application.documents.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-600">Supporting Documents</label>
          <div className="mt-2 space-y-2">
            {application.documents.map((doc: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">{doc}</span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-600">Applied Date</label>
        <p>{application.appliedDate}</p>
      </div>

      {application.status === 'Pending' && (
        <div className="flex gap-2 pt-4 border-t">
          <Button 
            onClick={() => approveLeave(application.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve Leave
          </Button>
          <Button 
            onClick={() => rejectLeave(application.id)}
            variant="destructive"
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            Reject Leave
          </Button>
        </div>
      )}
    </div>
  );

  const pendingCount = applications.filter(app => app.status === 'Pending').length;
  const approvedCount = applications.filter(app => app.status === 'Approved').length;
  const rejectedCount = applications.filter(app => app.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              <p className="text-sm text-gray-600">Pending Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Student Leave Applications
            </span>
            <Button onClick={generateLeaveReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{application.studentName}</h4>
                    <p className="text-sm text-gray-600">{application.rollNo} - {application.course}</p>
                    <p className="text-xs text-gray-500">Applied: {application.appliedDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      application.status === 'Approved' ? 'default' : 
                      application.status === 'Rejected' ? 'destructive' : 'secondary'
                    }>
                      {application.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Leave Application Details</DialogTitle>
                        </DialogHeader>
                        <LeaveDetailsDialog application={application} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <p className="font-medium">{application.fromDate} to {application.toDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Days:</span>
                    <p className="font-medium">{application.days} day(s)</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <Badge variant="outline" className="ml-1">{application.type}</Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Documents:</span>
                    <p className="font-medium">{application.documents.length} attached</p>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-gray-600 text-sm">Reason:</span>
                  <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{application.reason}</p>
                </div>

                {application.status === 'Pending' && (
                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button 
                      size="sm"
                      onClick={() => approveLeave(application.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => rejectLeave(application.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Leave Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">
                {applications.filter(app => app.type === 'Medical').length}
              </p>
              <p className="text-sm text-gray-600">Medical Leaves</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">
                {applications.filter(app => app.type === 'Personal').length}
              </p>
              <p className="text-sm text-gray-600">Personal Leaves</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-xl font-bold text-orange-600">
                {applications.filter(app => app.type === 'Emergency').length}
              </p>
              <p className="text-sm text-gray-600">Emergency Leaves</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffLeaves;