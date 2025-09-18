import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ClipboardList, Calendar, TrendingUp, AlertCircle, 
  Plus, Clock, CheckCircle, XCircle 
} from 'lucide-react';

const StudentAttendanceModule = () => {
  const [leaveForm, setLeaveForm] = useState({
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const attendanceData = {
    overall: 87,
    subjects: [
      { name: 'Mathematics', total: 45, attended: 42, percentage: 93 },
      { name: 'Physics', total: 40, attended: 35, percentage: 88 },
      { name: 'Chemistry', total: 38, attended: 32, percentage: 84 },
      { name: 'Computer Science', total: 50, attended: 48, percentage: 96 },
      { name: 'English', total: 30, attended: 25, percentage: 83 }
    ]
  };

  const leaveHistory = [
    { id: 1, fromDate: '2024-02-15', toDate: '2024-02-16', reason: 'Medical emergency', status: 'Approved', appliedOn: '2024-02-14' },
    { id: 2, fromDate: '2024-01-20', toDate: '2024-01-20', reason: 'Family function', status: 'Approved', appliedOn: '2024-01-18' },
    { id: 3, fromDate: '2024-03-05', toDate: '2024-03-05', reason: 'Personal work', status: 'Pending', appliedOn: '2024-03-04' }
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLeaveSubmit = () => {
    console.log('Leave application submitted:', leaveForm);
    setLeaveForm({ fromDate: '', toDate: '', reason: '' });
  };

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{attendanceData.overall}%</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <Progress value={attendanceData.overall} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes This Month</p>
                <p className="text-3xl font-bold text-gray-900">42</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Attended: 38</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Trend</p>
                <p className="text-3xl font-bold text-green-600">↗ +2%</p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">From last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="w-5 h-5 mr-2" />
            Subject-wise Attendance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Subject</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Total Classes</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Attended</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Percentage</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.subjects.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{subject.name}</td>
                    <td className="p-3">{subject.total}</td>
                    <td className="p-3">{subject.attended}</td>
                    <td className={`p-3 font-bold ${getAttendanceColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </td>
                    <td className="p-3">
                      {subject.percentage >= 75 ? (
                        <Badge className="bg-green-100 text-green-800">Good</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Low
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Leave Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Apply for Leave
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Leave
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fromDate">From Date</Label>
                      <Input 
                        id="fromDate" 
                        type="date" 
                        value={leaveForm.fromDate}
                        onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="toDate">To Date</Label>
                      <Input 
                        id="toDate" 
                        type="date" 
                        value={leaveForm.toDate}
                        onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea 
                        id="reason" 
                        placeholder="Enter reason for leave..."
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleLeaveSubmit} className="w-full">
                      Submit Application
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Leave Application Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Apply at least 1 day in advance</li>
                  <li>• Medical leaves require certificate</li>
                  <li>• Maximum 3 consecutive days without approval</li>
                  <li>• Emergency leaves can be applied same day</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Leave History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaveHistory.map((leave) => (
                <div key={leave.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {leave.fromDate} to {leave.toDate}
                    </span>
                    <Badge className={getStatusColor(leave.status)}>
                      {leave.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {leave.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                      {leave.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {leave.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{leave.reason}</p>
                  <p className="text-xs text-gray-500">Applied on: {leave.appliedOn}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Attendance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 mr-2 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-red-900">Low Attendance Warning</p>
                  <p className="text-xs text-red-700">English attendance is below 85%. Attend next 3 classes to improve.</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 mr-2 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Attendance Notice</p>
                  <p className="text-xs text-yellow-700">Chemistry attendance needs improvement. Current: 84%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendanceModule;