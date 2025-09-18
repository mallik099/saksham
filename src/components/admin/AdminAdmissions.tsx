import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { UserPlus, Check, X, Eye, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const AdminAdmissions = () => {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', course: 'Computer Science', dateApplied: '2024-03-01', status: 'Pending', marks: 85, documents: 3 },
    { id: 2, name: 'Jane Smith', course: 'Electronics', dateApplied: '2024-03-02', status: 'Approved', marks: 92, documents: 3 },
    { id: 3, name: 'Mike Johnson', course: 'Mechanical', dateApplied: '2024-03-03', status: 'Pending', marks: 78, documents: 2 },
    { id: 4, name: 'Sarah Wilson', course: 'Civil', dateApplied: '2024-03-04', status: 'Rejected', marks: 65, documents: 3 }
  ]);

  const approveApplication = (id: number) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
  };

  const rejectApplication = (id: number) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Rejected' } : app
    ));
  };

  const ApplicationDetails = ({ application }: { application: any }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <p className="text-lg">{application.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Course</label>
          <p className="text-lg">{application.course}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Marks</label>
          <p className="text-lg">{application.marks}%</p>
        </div>
        <div>
          <label className="text-sm font-medium">Documents</label>
          <p className="text-lg">{application.documents} files</p>
        </div>
      </div>
      {application.status === 'Pending' && (
        <div className="flex gap-2">
          <Button onClick={() => approveApplication(application.id)} className="flex-1 bg-green-600">
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button onClick={() => rejectApplication(application.id)} variant="destructive" className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Reject
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admissions Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Admission Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{application.name}</h4>
                  <p className="text-sm text-gray-600">{application.course}</p>
                  <p className="text-sm text-gray-600">Applied: {application.dateApplied}</p>
                  <p className="text-sm text-gray-600">Marks: {application.marks}% | Documents: {application.documents}</p>
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
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                      </DialogHeader>
                      <ApplicationDetails application={application} />
                    </DialogContent>
                  </Dialog>
                  {application.status === 'Pending' && (
                    <>
                      <Button size="sm" onClick={() => approveApplication(application.id)} className="bg-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => rejectApplication(application.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAdmissions;