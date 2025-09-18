import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface LeaveApplication {
  id: number;
  studentName: string;
  studentId: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

const mockApplications: LeaveApplication[] = [
  { id: 1, studentName: 'John Doe', studentId: 'STU001', fromDate: '2024-02-20', toDate: '2024-02-22', reason: 'Family function', status: 'Approved', appliedDate: '2024-02-15' },
  { id: 2, studentName: 'Jane Smith', studentId: 'STU002', fromDate: '2024-02-25', toDate: '2024-02-26', reason: 'Medical appointment', status: 'Pending', appliedDate: '2024-02-18' }
];

const LeaveApplication = ({ isAdmin = false, studentId = 'STU001' }) => {
  const [applications, setApplications] = useState<LeaveApplication[]>(mockApplications);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication: LeaveApplication = {
      id: applications.length + 1,
      studentName: 'Current Student',
      studentId,
      ...formData,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, newApplication]);
    setFormData({ fromDate: '', toDate: '', reason: '' });
    setShowForm(false);
    toast.success('Leave application submitted successfully');
  };

  const updateStatus = (id: number, status: 'Approved' | 'Rejected') => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status } : app
    ));
    toast.success(`Application ${status.toLowerCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-3 h-3" />;
      case 'Rejected': return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const studentApplications = isAdmin ? applications : applications.filter(app => app.studentId === studentId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-blue-700">
            <FileText className="w-5 h-5 mr-2" />
            Leave Applications
          </CardTitle>
          {!isAdmin && (
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              Apply Leave
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showForm && !isAdmin && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="fromDate">From Date</Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="toDate">To Date</Label>
                <Input
                  id="toDate"
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Enter reason for leave"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" size="sm">Submit</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {studentApplications.map((app) => (
            <div key={app.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {isAdmin && <h4 className="font-medium text-gray-900">{app.studentName} ({app.studentId})</h4>}
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {app.fromDate} to {app.toDate}
                  </div>
                </div>
                <Badge className={getStatusColor(app.status)}>
                  {getStatusIcon(app.status)}
                  <span className="ml-1">{app.status}</span>
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-2">{app.reason}</p>
              <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
              
              {isAdmin && app.status === 'Pending' && (
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" onClick={() => updateStatus(app.id, 'Approved')} className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(app.id, 'Rejected')} className="text-red-600 border-red-200 hover:bg-red-50">
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveApplication;