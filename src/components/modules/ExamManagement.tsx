import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { GraduationCap, Plus, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const ExamManagement = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [resultData, setResultData] = useState({
    studentId: '',
    subject: '',
    marks: '',
    totalMarks: 100
  });

  useEffect(() => {
    fetchStudents();
    if (user?.role === 'student' && user?.studentId) {
      fetchStudentResults(user.studentId);
    } else {
      fetchAllResults();
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

  const fetchStudentResults = async (studentId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/results/${studentId}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const fetchAllResults = async () => {
    try {
      // For demo purposes, we'll show all results
      const allResults = [];
      for (const student of students) {
        const response = await axios.get(`http://localhost:4000/api/results/${student.id}`);
        allResults.push(...response.data.map((result: any) => ({
          ...result,
          studentName: student.name
        })));
      }
      setResults(allResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const grade = calculateGrade(parseInt(resultData.marks), resultData.totalMarks);
      await axios.post('http://localhost:4000/api/results', {
        ...resultData,
        marks: parseInt(resultData.marks),
        grade
      });
      toast.success('Result added successfully!');
      setIsResultDialogOpen(false);
      setResultData({ studentId: '', subject: '', marks: '', totalMarks: 100 });
      fetchAllResults();
    } catch (error) {
      toast.error('Error adding result');
    }
  };

  const calculateGrade = (marks: number, totalMarks: number) => {
    const percentage = (marks / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const StudentView = () => (
    <Card>
      <CardHeader>
        <CardTitle>My Exam Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-blue-700">{results.length}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Average Marks</p>
                  <p className="text-2xl font-bold text-green-700">
                    {results.length > 0 ? Math.round(results.reduce((sum: number, result: any) => sum + result.marks, 0) / results.length) : 0}%
                  </p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Highest Grade</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {results.length > 0 ? results.reduce((best: string, result: any) => 
                      result.grade < best ? result.grade : best, 'F') : 'N/A'}
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks Obtained</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{result.subject}</TableCell>
                <TableCell>{result.marks}</TableCell>
                <TableCell>{result.totalMarks}</TableCell>
                <TableCell>{Math.round((result.marks / result.totalMarks) * 100)}%</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-800' :
                    result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    result.grade === 'C' || result.grade === 'D' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.grade}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const FacultyView = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Exam Results Management</CardTitle>
          <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Result
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Exam Result</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="studentId">Student</Label>
                  <Select value={resultData.studentId} onValueChange={(value) => setResultData({ ...resultData, studentId: value })}>
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
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={resultData.subject} onValueChange={(value) => setResultData({ ...resultData, subject: value })}>
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
                  <Label htmlFor="marks">Marks Obtained</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={resultData.marks}
                    onChange={(e) => setResultData({ ...resultData, marks: e.target.value })}
                    max={resultData.totalMarks}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={resultData.totalMarks}
                    onChange={(e) => setResultData({ ...resultData, totalMarks: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Add Result</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{result.studentId}</TableCell>
                <TableCell>{result.studentName}</TableCell>
                <TableCell>{result.subject}</TableCell>
                <TableCell>{result.marks}</TableCell>
                <TableCell>{result.totalMarks}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-800' :
                    result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    result.grade === 'C' || result.grade === 'D' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.grade}
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

export default ExamManagement;