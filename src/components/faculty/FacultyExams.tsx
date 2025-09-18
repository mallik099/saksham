import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GraduationCap, Upload, Download, Plus, FileText } from 'lucide-react';

interface FacultyExamsProps {
  facultyData: any;
}

const FacultyExams: React.FC<FacultyExamsProps> = ({ facultyData }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const students = [
    { id: 'CS21001', name: 'John Doe', rollNo: 'CS21001' },
    { id: 'CS21002', name: 'Jane Smith', rollNo: 'CS21002' },
    { id: 'CS21003', name: 'Mike Johnson', rollNo: 'CS21003' },
    { id: 'CS21004', name: 'Sarah Wilson', rollNo: 'CS21004' },
    { id: 'CS21005', name: 'David Brown', rollNo: 'CS21005' }
  ];

  const [marks, setMarks] = useState<any>({});

  const assignments = [
    { id: 1, title: 'Data Structures Assignment 1', subject: 'Data Structures', class: 'CS-6A', dueDate: '2024-03-15', submitted: 25, total: 30 },
    { id: 2, title: 'Database Design Project', subject: 'Database Systems', class: 'CS-6B', dueDate: '2024-03-20', submitted: 22, total: 28 },
    { id: 3, title: 'Software Requirements Analysis', subject: 'Software Engineering', class: 'CS-5A', dueDate: '2024-03-18', submitted: 20, total: 25 }
  ];

  const studyMaterials = [
    { id: 1, title: 'Data Structures Lecture Notes', subject: 'Data Structures', uploadDate: '2024-02-15', downloads: 45 },
    { id: 2, title: 'Database Normalization Guide', subject: 'Database Systems', uploadDate: '2024-02-20', downloads: 38 },
    { id: 3, title: 'SDLC Models Presentation', subject: 'Software Engineering', uploadDate: '2024-02-25', downloads: 32 }
  ];

  const updateMarks = (studentId: string, type: 'internal' | 'external', value: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: parseInt(value) || 0
      }
    }));
  };

  const calculateTotal = (studentId: string) => {
    const studentMarks = marks[studentId] || {};
    return (studentMarks.internal || 0) + (studentMarks.external || 0);
  };

  const calculateGrade = (total: number) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  const submitMarks = () => {
    if (!selectedClass || !selectedSubject) {
      alert('Please select class and subject');
      return;
    }
    alert('Marks submitted successfully!');
  };

  const publishResults = () => {
    alert('Results published successfully! Students can now view their marks.');
  };

  const AssignmentForm = () => {
    const [assignmentData, setAssignmentData] = useState({
      title: '',
      description: '',
      subject: '',
      class: '',
      dueDate: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Assignment created successfully!');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Assignment Title"
          value={assignmentData.title}
          onChange={(e) => setAssignmentData({...assignmentData, title: e.target.value})}
          required
        />
        <Textarea
          placeholder="Assignment Description"
          value={assignmentData.description}
          onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})}
          required
        />
        <Select value={assignmentData.subject} onValueChange={(value) => setAssignmentData({...assignmentData, subject: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {facultyData.subjects.map((subject: string) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assignmentData.class} onValueChange={(value) => setAssignmentData({...assignmentData, class: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {facultyData.classes.map((cls: string) => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={assignmentData.dueDate}
          onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})}
          required
        />
        <Button type="submit" className="w-full">Create Assignment</Button>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Marks Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Marks Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {facultyData.classes.map((cls: string) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {facultyData.subjects.map((subject: string) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClass && selectedSubject && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Student</th>
                      <th className="text-center p-2">Internal (20)</th>
                      <th className="text-center p-2">External (80)</th>
                      <th className="text-center p-2">Total</th>
                      <th className="text-center p-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => {
                      const total = calculateTotal(student.id);
                      const grade = calculateGrade(total);
                      return (
                        <tr key={student.id} className="border-b">
                          <td className="p-2">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-gray-600">{student.rollNo}</p>
                            </div>
                          </td>
                          <td className="text-center p-2">
                            <Input
                              type="number"
                              max="20"
                              min="0"
                              className="w-16 text-center"
                              onChange={(e) => updateMarks(student.id, 'internal', e.target.value)}
                            />
                          </td>
                          <td className="text-center p-2">
                            <Input
                              type="number"
                              max="80"
                              min="0"
                              className="w-16 text-center"
                              onChange={(e) => updateMarks(student.id, 'external', e.target.value)}
                            />
                          </td>
                          <td className="text-center p-2 font-bold">{total}</td>
                          <td className="text-center p-2">
                            <Badge variant={grade === 'F' ? 'destructive' : 'default'}>
                              {grade}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2">
                <Button onClick={submitMarks} className="flex-1">
                  Submit Marks
                </Button>
                <Button onClick={publishResults} variant="outline" className="flex-1">
                  Publish Results
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assignments
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                </DialogHeader>
                <AssignmentForm />
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <Badge variant="secondary">{assignment.subject}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <p><strong>Class:</strong> {assignment.class}</p>
                  <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                  <p><strong>Submissions:</strong> {assignment.submitted}/{assignment.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Study Materials
            </span>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm text-gray-600">{material.subject}</p>
                  <p className="text-xs text-gray-500">Uploaded: {material.uploadDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{material.downloads} downloads</p>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyExams;