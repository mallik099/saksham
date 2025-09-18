import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserPlus, Download, Eye, Check, X } from 'lucide-react';

const StaffAdmissions = () => {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const admissionApplications = [
    {
      id: 'ADM001',
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      course: 'Computer Science Engineering',
      department: 'Computer Science',
      appliedDate: '2024-03-01',
      status: 'Pending',
      documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate'],
      marks: { physics: 85, chemistry: 88, mathematics: 92 }
    },
    {
      id: 'ADM002',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      course: 'Electronics Engineering',
      department: 'Electronics',
      appliedDate: '2024-03-02',
      status: 'Pending',
      documents: ['10th Certificate', '12th Certificate', 'Migration Certificate'],
      marks: { physics: 90, chemistry: 85, mathematics: 88 }
    },
    {
      id: 'ADM003',
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      course: 'Mechanical Engineering',
      department: 'Mechanical',
      appliedDate: '2024-02-28',
      status: 'Approved',
      documents: ['10th Certificate', '12th Certificate', 'Character Certificate'],
      marks: { physics: 87, chemistry: 89, mathematics: 91 }
    }
  ];

  const [applications, setApplications] = useState(admissionApplications);

  const approveApplication = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
    alert('Application approved successfully!');
  };

  const rejectApplication = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'Rejected' } : app
    ));
    alert('Application rejected.');
  };

  const generateAdmissionSlip = (application: any) => {
    alert(`Admission confirmation slip generated for ${application.name}`);
  };

  const exportRecords = () => {
    alert('Admission records exported successfully!');
  };

  const ApplicationDetails = ({ application }: { application: any }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <p className="text-lg">{application.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Application ID</label>
          <p className="text-lg">{application.id}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <p>{application.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <p>{application.phone}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Course</label>
          <p>{application.course}</p>
        </div>
        <div>
          <label className="text-sm font-medium">Department</label>
          <p>{application.department}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Academic Marks</label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Physics</p>
            <p className="text-xl font-bold">{application.marks.physics}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <p className="text-sm text-gray-600">Chemistry</p>
            <p className="text-xl font-bold">{application.marks.chemistry}%</p>
          </div>
          <div className="p-3 bg-purple-50 rounded">
            <p className="text-sm text-gray-600">Mathematics</p>
            <p className="text-xl font-bold">{application.marks.mathematics}%</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Documents Submitted</label>
        <div className="mt-2 space-y-2">
          {application.documents.map((doc: string, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>{doc}</span>
              <Badge variant="default">Verified</Badge>
            </div>
          ))}
        </div>
      </div>

      {application.status === 'Pending' && (
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => approveApplication(application.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button 
            onClick={() => rejectApplication(application.id)}
            variant="destructive"
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      )}

      {application.status === 'Approved' && (
        <Button 
          onClick={() => generateAdmissionSlip(application)}
          className="w-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Generate Admission Slip
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter(app => app.status === 'Pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(app => app.status === 'Approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(app => app.status === 'Rejected').length}
              </p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{applications.length}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Admission Applications
            </span>
            <Button onClick={exportRecords} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Records
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{application.name}</h4>
                    <p className="text-sm text-gray-600">{application.course}</p>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Application Details - {application.name}</DialogTitle>
                        </DialogHeader>
                        <ApplicationDetails application={application} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <p><strong>Email:</strong> {application.email}</p>
                  <p><strong>Phone:</strong> {application.phone}</p>
                  <p><strong>Department:</strong> {application.department}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAdmissions;