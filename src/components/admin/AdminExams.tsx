import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { GraduationCap, Calendar, Download, FileText } from 'lucide-react';

const AdminExams = () => {
  const examSchedule = [
    { id: 1, subject: 'Data Structures', date: '2024-03-15', time: '10:00 AM', duration: '3 hours', course: 'Computer Science', semester: '6th' },
    { id: 2, subject: 'Digital Electronics', date: '2024-03-18', time: '2:00 PM', duration: '3 hours', course: 'Electronics', semester: '4th' },
    { id: 3, subject: 'Thermodynamics', date: '2024-03-20', time: '10:00 AM', duration: '3 hours', course: 'Mechanical', semester: '4th' }
  ];

  const results = [
    { course: 'Computer Science', semester: '6th', students: 30, passed: 28, percentage: 93.3, status: 'Published' },
    { course: 'Electronics', semester: '4th', students: 25, passed: 22, percentage: 88.0, status: 'Published' },
    { course: 'Mechanical', semester: '4th', students: 28, passed: 25, percentage: 89.3, status: 'Pending' }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 15, percentage: 18 },
    { grade: 'A', count: 25, percentage: 30 },
    { grade: 'B+', count: 20, percentage: 24 },
    { grade: 'B', count: 15, percentage: 18 },
    { grade: 'C', count: 8, percentage: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exam Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{examSchedule.length}</p>
            <p className="text-sm text-gray-600">Upcoming Exams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{results.filter(r => r.status === 'Published').length}</p>
            <p className="text-sm text-gray-600">Results Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{results.filter(r => r.status === 'Pending').length}</p>
            <p className="text-sm text-gray-600">Results Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">90.2%</p>
            <p className="text-sm text-gray-600">Overall Pass Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Exam Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examSchedule.map((exam) => (
                <div key={exam.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{exam.subject}</h4>
                      <p className="text-sm text-gray-600">{exam.course} - {exam.semester}</p>
                    </div>
                    <Badge variant="outline">{exam.date}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Time: {exam.time}</p>
                    <p>Duration: {exam.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Exam Results Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{result.course}</h4>
                      <p className="text-sm text-gray-600">{result.semester}</p>
                    </div>
                    <Badge variant={result.status === 'Published' ? 'default' : 'secondary'}>
                      {result.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-blue-600">{result.students}</p>
                      <p className="text-gray-600">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-green-600">{result.passed}</p>
                      <p className="text-gray-600">Passed</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-purple-600">{result.percentage}%</p>
                      <p className="text-gray-600">Pass Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {gradeDistribution.map((grade, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{grade.grade}</div>
                <div className="text-lg font-medium">{grade.count}</div>
                <div className="text-sm text-gray-600">{grade.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminExams;