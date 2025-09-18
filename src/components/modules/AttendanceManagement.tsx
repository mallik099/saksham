import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AttendanceManagement = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [isMarkDialogOpen, setIsMarkDialogOpen] = useState(false);
  const [markData, setMarkData] = useState({
    studentId: '',
    subject: '',
    status: 'present'
  });

  useEffect(() => {
    fetchStudents();
    if (user?.role === 'student' && user?.studentId) {
      fetchStudentAttendance(user.studentId);
    } else {
      fetchAllAttendance();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentAttendance = async (studentId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/attendance/${studentId}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      // For demo purposes, we'll show all attendance records
      const allAttendance = [];
      for (const student of students) {
        const response = await axios.get(`http://localhost:4000/api/attendance/${student.id}`);
        allAttendance.push(...response.data.map((record: any) => ({
          ...record,
          studentName: student.name
        })));
      }
      setAttendance(allAttendance);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleMarkAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/attendance', markData);
      toast.success('Attendance marked successfully!');
      setIsMarkDialogOpen(false);
      setMarkData({ studentId: '', subject: '', status: 'present' });
      fetchAllAttendance();
    } catch (error) {
      toast.error('Error marking attendance');
    }
  };

  const calculateAttendanceRate = (studentId: string) => {
    const studentAttendance = attendance.filter((record: any) => record.studentId === studentId);
    if (studentAttendance.length === 0) return 0;
    const presentCount = studentAttendance.filter((record: any) => record.status === 'present').length;
    return Math.round((presentCount / studentAttendance.length) * 100);
  };

  const StudentView = () => {
    const attendanceRate = calculateAttendanceRate(user?.studentId || '');
    const totalClasses = attendance.length;
    const presentClasses = attendance.filter((record: any) => record.status === 'present').length;
    const absentClasses = totalClasses - presentClasses;

    return (
      <Card>
        <CardHeader>
          <CardTitle>My Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Attendance Rate</p>
                    <p className="text-2xl font-bold text-blue-700">{attendanceRate}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Present</p>
                    <p className="text-2xl font-bold text-green-700">{presentClasses}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600">Absent</p>
                    <p className="text-2xl font-bold text-red-700">{absentClasses}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Total Classes</p>
                    <p className="text-2xl font-bold text-purple-700">{totalClasses}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record: any, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const FacultyView = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Attendance Management</CardTitle>
          <Dialog open={isMarkDialogOpen} onOpenChange={setIsMarkDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mark Attendance</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleMarkAttendance} className="space-y-4">
                <div>
                  <Select value={markData.studentId} onValueChange={(value) => setMarkData({ ...markData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student: any) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.id} - {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={markData.subject} onValueChange={(value) => setMarkData({ ...markData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={markData.status} onValueChange={(value) => setMarkData({ ...markData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Mark Attendance</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Student Attendance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student: any) => {
              const rate = calculateAttendanceRate(student.id);
              return (
                <Card key={student.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.id}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          rate >= 80 ? 'text-green-600' :
                          rate >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {rate}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record: any, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell className="font-medium">{record.studentId}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return user?.role === 'student' ? <StudentView /> : <FacultyView />;
};

export default AttendanceManagement;