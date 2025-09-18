import React, { useState } from 'react';
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Overall Attendance
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Apply for Leave
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Leave Application</DialogTitle>
                </DialogHeader>
                <LeaveApplicationForm />
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600">{studentData.attendance}%</div>
            <p className="text-gray-600">Total Attendance</p>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{subject.subject}</h4>
                  <p className="text-sm text-gray-600">{subject.present}/{subject.total} classes</p>
                </div>
                <div className="text-right">
                  <Badge variant={subject.percentage >= 85 ? "default" : subject.percentage >= 75 ? "secondary" : "destructive"}>
                    {subject.percentage}%
                  </Badge>
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