import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  GraduationCap, Calendar, Clock, MapPin, 
  TrendingUp, Award, FileText, Download 
} from 'lucide-react';

const StudentExamsModule = () => {
  const upcomingExams = [
    {
      subject: 'Mathematics',
      date: '2024-03-15',
      time: '10:00 AM - 1:00 PM',
      venue: 'Exam Hall A',
      type: 'Mid-term',
      syllabus: 'Chapters 1-5'
    },
    {
      subject: 'Physics',
      date: '2024-03-17',
      time: '2:00 PM - 5:00 PM',
      venue: 'Exam Hall B',
      type: 'Mid-term',
      syllabus: 'Units 1-3'
    },
    {
      subject: 'Chemistry',
      date: '2024-03-19',
      time: '10:00 AM - 1:00 PM',
      venue: 'Exam Hall C',
      type: 'Mid-term',
      syllabus: 'Organic Chemistry'
    },
    {
      subject: 'Computer Science',
      date: '2024-03-21',
      time: '2:00 PM - 5:00 PM',
      venue: 'Computer Lab',
      type: 'Practical',
      syllabus: 'Programming Lab'
    }
  ];

  const pastExamMarks = [
    {
      subject: 'Mathematics',
      marksObtained: 85,
      maxMarks: 100,
      grade: 'A',
      examType: 'Unit Test 1',
      date: '2024-02-15'
    },
    {
      subject: 'Physics',
      marksObtained: 78,
      maxMarks: 100,
      grade: 'B+',
      examType: 'Unit Test 1',
      date: '2024-02-17'
    },
    {
      subject: 'Chemistry',
      marksObtained: 92,
      maxMarks: 100,
      grade: 'A+',
      examType: 'Unit Test 1',
      date: '2024-02-19'
    },
    {
      subject: 'Computer Science',
      marksObtained: 88,
      maxMarks: 100,
      grade: 'A',
      examType: 'Practical',
      date: '2024-02-21'
    },
    {
      subject: 'English',
      marksObtained: 75,
      maxMarks: 100,
      grade: 'B',
      examType: 'Unit Test 1',
      date: '2024-02-23'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'Mid-term': return 'bg-blue-100 text-blue-800';
      case 'Final': return 'bg-red-100 text-red-800';
      case 'Practical': return 'bg-green-100 text-green-800';
      case 'Unit Test': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculatePercentage = (obtained: number, max: number) => {
    return Math.round((obtained / max) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Exam Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">83.6%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Grade</p>
                <p className="text-2xl font-bold text-gray-900">A+</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Exams Taken</p>
                <p className="text-2xl font-bold text-gray-900">{pastExamMarks.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Subject</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Exam Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Time</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Venue</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Syllabus</th>
                </tr>
              </thead>
              <tbody>
                {upcomingExams.map((exam, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{exam.subject}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {exam.date}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-green-500" />
                        {exam.time}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        {exam.venue}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getExamTypeColor(exam.type)}>
                        {exam.type}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{exam.syllabus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Past Exam Marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Past Exam Results
            </span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Subject</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Marks Obtained</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Max Marks</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Percentage</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Grade</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Exam Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {pastExamMarks.map((result, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{result.subject}</td>
                    <td className="p-3 font-bold text-blue-600">{result.marksObtained}</td>
                    <td className="p-3">{result.maxMarks}</td>
                    <td className="p-3 font-medium">
                      {calculatePercentage(result.marksObtained, result.maxMarks)}%
                    </td>
                    <td className="p-3">
                      <Badge className={`${getGradeColor(result.grade)} font-bold`}>
                        {result.grade}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {result.examType}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium">Strongest Subject</span>
                <span className="text-green-600 font-bold">Chemistry (92%)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-800 font-medium">Needs Improvement</span>
                <span className="text-yellow-600 font-bold">English (75%)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800 font-medium">Overall Trend</span>
                <span className="text-blue-600 font-bold">Improving ↗</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p className="font-medium text-purple-900">Top Performer</p>
                <p className="text-sm text-purple-700">Chemistry - Highest score in class</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-900">Consistent Performance</p>
                <p className="text-sm text-blue-700">Mathematics - Above 80% in all tests</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="font-medium text-green-900">Most Improved</p>
                <p className="text-sm text-green-700">Physics - 15% improvement from last term</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExamsModule;