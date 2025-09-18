import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, ClipboardList, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface StudentAttendanceProps {
  studentData: any;
}

const StudentAttendance: React.FC<StudentAttendanceProps> = ({ studentData }) => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>;
  }

  const attendanceData = [
    { subject: 'Data Structures', present: 28, total: 32, percentage: 87.5 },
    { subject: 'Database Systems', present: 30, total: 34, percentage: 88.2 },
    { subject: 'Computer Networks', present: 25, total: 30, percentage: 83.3 },
    { subject: 'Software Engineering', present: 27, total: 31, percentage: 87.1 },
    { subject: 'Operating Systems', present: 26, total: 29, percentage: 89.7 }
  ];

  const attendanceHistory = [
    { date: '2024-03-01', subject: 'Data Structures', status: 'Present' },
    { date: '2024-03-01', subject: 'Database Systems', status: 'Present' },
    { date: '2024-02-29', subject: 'Computer Networks', status: 'Absent' },
    { date: '2024-02-29', subject: 'Software Engineering', status: 'Present' },
    { date: '2024-02-28', subject: 'Operating Systems', status: 'Present' }
  ];

  const LeaveApplicationForm = () => {
    const [leaveData, setLeaveData] = useState({
      fromDate: '',
      toDate: '',
      reason: '',
      type: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Leave application submitted:', leaveData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">From Date</label>
            <Input
              type="date"
              value={leaveData.fromDate}
              onChange={(e) => setLeaveData({...leaveData, fromDate: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">To Date</label>
            <Input
              type="date"
              value={leaveData.toDate}
              onChange={(e) => setLeaveData({...leaveData, toDate: e.target.value})}
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Leave Type</label>
          <Select value={leaveData.type} onValueChange={(value) => setLeaveData({...leaveData, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select leave type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sick">Sick Leave</SelectItem>
              <SelectItem value="personal">Personal Leave</SelectItem>
              <SelectItem value="emergency">Emergency Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Reason</label>
          <Textarea
            value={leaveData.reason}
            onChange={(e) => setLeaveData({...leaveData, reason: e.target.value})}
            placeholder="Enter reason for leave"
            required
          />
        </div>
        <Button type="submit" className="w-full">Submit Application</Button>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Overall Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{studentData.attendance}%</div>
              <p className="text-blue-600">Total Attendance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <p className="text-green-600">March 2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-600">Sick Leave:</span>
                <span className="font-bold">3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Personal:</span>
                <span className="font-bold">2 days</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-2" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Leave Application</DialogTitle>
                  </DialogHeader>
                  <LeaveApplicationForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-800">{subject.subject}</h4>
                  <p className="text-sm text-blue-600">{subject.present}/{subject.total} classes</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${subject.percentage}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={subject.percentage >= 85 ? 'bg-green-100 text-green-800' : subject.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                    {subject.percentage}%
                  </Badge>
                  <p className="text-xs text-blue-600 mt-1">
                    {subject.percentage >= 85 ? 'Good' : subject.percentage >= 75 ? 'Average' : 'Low'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Attendance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{record.subject}</p>
                  <p className="text-sm text-gray-600">{record.date}</p>
                </div>
                <Badge variant={record.status === 'Present' ? 'default' : 'destructive'}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;