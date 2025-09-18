import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ClipboardList, Users, CheckCircle, XCircle, Clock, Download } from 'lucide-react';

interface FacultyAttendanceProps {
  facultyData: any;
}

const FacultyAttendance: React.FC<FacultyAttendanceProps> = ({ facultyData }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState<any>({});

  const students = [
    { id: 'CS21001', name: 'John Doe', rollNo: 'CS21001' },
    { id: 'CS21002', name: 'Jane Smith', rollNo: 'CS21002' },
    { id: 'CS21003', name: 'Mike Johnson', rollNo: 'CS21003' },
    { id: 'CS21004', name: 'Sarah Wilson', rollNo: 'CS21004' },
    { id: 'CS21005', name: 'David Brown', rollNo: 'CS21005' }
  ];

  const attendanceHistory = [
    { date: '2024-03-01', subject: 'Data Structures', class: 'CS-6A', present: 28, total: 30 },
    { date: '2024-02-29', subject: 'Database Systems', class: 'CS-6B', present: 25, total: 28 },
    { date: '2024-02-28', subject: 'Software Engineering', class: 'CS-5A', present: 22, total: 25 }
  ];

  const leaveApplications = [
    { id: 1, student: 'John Doe', rollNo: 'CS21001', fromDate: '2024-03-05', toDate: '2024-03-07', reason: 'Medical', status: 'Pending' },
    { id: 2, student: 'Jane Smith', rollNo: 'CS21002', fromDate: '2024-03-03', toDate: '2024-03-03', reason: 'Personal', status: 'Pending' },
    { id: 3, student: 'Mike Johnson', rollNo: 'CS21003', fromDate: '2024-02-28', toDate: '2024-03-01', reason: 'Family Function', status: 'Approved' }
  ];

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = () => {
    if (!selectedClass || !selectedSubject) {
      alert('Please select class and subject');
      return;
    }
    alert('Attendance submitted successfully!');
    setAttendanceData({});
  };

  const approveLeave = (leaveId: number, action: 'approve' | 'reject') => {
    alert(`Leave application ${action}d successfully!`);
  };

  const generateReport = () => {
    alert('Attendance report generated and downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Take Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Take Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose class" />
                </SelectTrigger>
                <SelectContent>
                  {facultyData.classes.map((cls: string) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent>
                  {facultyData.subjects.map((subject: string) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedClass && selectedSubject && (
            <div className="space-y-4">
              <h4 className="font-medium">Students - {selectedClass}</h4>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.rollNo}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={attendanceData[student.id] === 'present' ? 'default' : 'outline'}
                        onClick={() => markAttendance(student.id, 'present')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={attendanceData[student.id] === 'absent' ? 'destructive' : 'outline'}
                        onClick={() => markAttendance(student.id, 'absent')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={attendanceData[student.id] === 'late' ? 'secondary' : 'outline'}
                        onClick={() => markAttendance(student.id, 'late')}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Late
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={submitAttendance} className="w-full">
                Submit Attendance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Attendance History
            </span>
            <Button onClick={generateReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{record.subject}</h4>
                  <p className="text-sm text-gray-600">{record.class} - {record.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{record.present}/{record.total}</p>
                  <Badge variant="secondary">
                    {Math.round((record.present / record.total) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Student Leave Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveApplications.map((leave) => (
              <div key={leave.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{leave.student}</h4>
                    <p className="text-sm text-gray-600">{leave.rollNo}</p>
                  </div>
                  <Badge variant={
                    leave.status === 'Approved' ? 'default' : 
                    leave.status === 'Rejected' ? 'destructive' : 'secondary'
                  }>
                    {leave.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">From: {leave.fromDate}</p>
                    <p className="text-sm text-gray-600">To: {leave.toDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
                  </div>
                </div>
                {leave.status === 'Pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => approveLeave(leave.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => approveLeave(leave.id, 'reject')}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyAttendance;