import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ClipboardList, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminAttendance = () => {
  const attendanceData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 87 },
    { month: 'Mar', attendance: 89 },
    { month: 'Apr', attendance: 86 },
    { month: 'May', attendance: 88 }
  ];

  const courseAttendance = [
    { course: 'Computer Science', attendance: 89, students: 120 },
    { course: 'Electronics', attendance: 85, students: 95 },
    { course: 'Mechanical', attendance: 87, students: 110 },
    { course: 'Civil', attendance: 83, students: 85 }
  ];

  const lowAttendanceStudents = [
    { name: 'John Doe', rollNo: 'CS21001', course: 'Computer Science', attendance: 65, status: 'Critical' },
    { name: 'Jane Smith', rollNo: 'EC21002', course: 'Electronics', attendance: 72, status: 'Warning' },
    { name: 'Mike Johnson', rollNo: 'ME21003', course: 'Mechanical', attendance: 68, status: 'Critical' }
  ];

  const dailyAttendance = [
    { date: '2024-03-01', present: 380, total: 410, percentage: 92.7 },
    { date: '2024-03-02', present: 375, total: 410, percentage: 91.5 },
    { date: '2024-03-03', present: 385, total: 410, percentage: 93.9 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-600">Overall Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">410</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{lowAttendanceStudents.length}</p>
            <p className="text-sm text-gray-600">Low Attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">93.9%</p>
            <p className="text-sm text-gray-600">Today's Attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Course-wise Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="attendance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Attendance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowAttendanceStudents.map((student, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  student.status === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.rollNo} - {student.course}</p>
                      <p className="text-sm font-medium">Attendance: {student.attendance}%</p>
                    </div>
                    <Badge variant={student.status === 'Critical' ? 'destructive' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyAttendance.map((day, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{day.date}</h4>
                    <Badge variant="default">{day.percentage}%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Present: <span className="font-medium text-green-600">{day.present}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total: <span className="font-medium text-blue-600">{day.total}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAttendance;