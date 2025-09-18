import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Download, GraduationCap, FileText } from 'lucide-react';

interface StudentExamsProps {
  studentData: any;
}

const StudentExams: React.FC<StudentExamsProps> = ({ studentData }) => {
  const upcomingExams = [
    {
      subject: 'Data Structures',
      date: '2024-03-15',
      time: '10:00 AM - 1:00 PM',
      room: 'Exam Hall A',
      type: 'Mid Semester',
      syllabus: 'Chapters 1-5'
    },
    {
      subject: 'Database Systems',
      date: '2024-03-18',
      time: '2:00 PM - 5:00 PM',
      room: 'Exam Hall B',
      type: 'Mid Semester',
      syllabus: 'Chapters 1-6'
    },
    {
      subject: 'Computer Networks',
      date: '2024-03-22',
      time: '10:00 AM - 1:00 PM',
      room: 'Exam Hall C',
      type: 'Mid Semester',
      syllabus: 'Chapters 1-4'
    }
  ];

  const examResults = [
    {
      semester: '5th Semester',
      subjects: [
        { name: 'Data Structures', internal: 18, external: 42, total: 60, grade: 'A' },
        { name: 'Database Systems', internal: 20, external: 45, total: 65, grade: 'A+' },
        { name: 'Computer Networks', internal: 16, external: 38, total: 54, grade: 'B+' },
        { name: 'Software Engineering', internal: 19, external: 44, total: 63, grade: 'A' },
        { name: 'Operating Systems', internal: 17, external: 40, total: 57, grade: 'B+' }
      ],
      cgpa: 7.8,
      result: 'Pass'
    },
    {
      semester: '4th Semester',
      subjects: [
        { name: 'Java Programming', internal: 19, external: 43, total: 62, grade: 'A' },
        { name: 'Web Technologies', internal: 18, external: 41, total: 59, grade: 'B+' },
        { name: 'Computer Graphics', internal: 20, external: 46, total: 66, grade: 'A+' },
        { name: 'Microprocessors', internal: 17, external: 39, total: 56, grade: 'B+' }
      ],
      cgpa: 7.6,
      result: 'Pass'
    }
  ];

  const downloadMarksheet = (semester: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `marksheet_${semester.replace(' ', '_')}.pdf`;
    link.click();
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-600';
      case 'A': return 'bg-green-500';
      case 'B+': return 'bg-blue-500';
      case 'B': return 'bg-blue-400';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg">{exam.subject}</h4>
                  <Badge variant="secondary">{exam.type}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Date:</strong> {exam.date}</p>
                    <p><strong>Time:</strong> {exam.time}</p>
                  </div>
                  <div>
                    <p><strong>Room:</strong> {exam.room}</p>
                    <p><strong>Syllabus:</strong> {exam.syllabus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Exam Results & Marksheets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {examResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{result.semester}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant="default">CGPA: {result.cgpa}</Badge>
                      <Badge variant={result.result === 'Pass' ? 'default' : 'destructive'}>
                        {result.result}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => downloadMarksheet(result.semester)}
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Marksheet
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Subject</th>
                        <th className="text-center p-2">Internal</th>
                        <th className="text-center p-2">External</th>
                        <th className="text-center p-2">Total</th>
                        <th className="text-center p-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((subject, subIndex) => (
                        <tr key={subIndex} className="border-b">
                          <td className="p-2 font-medium">{subject.name}</td>
                          <td className="text-center p-2">{subject.internal}/20</td>
                          <td className="text-center p-2">{subject.external}/80</td>
                          <td className="text-center p-2 font-bold">{subject.total}/100</td>
                          <td className="text-center p-2">
                            <Badge className={`${getGradeColor(subject.grade)} text-white`}>
                              {subject.grade}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Bonafide Certificate</h4>
              <p className="text-sm text-gray-600 mb-3">
                Official certificate confirming your enrollment status
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Bonafide
              </Button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Transfer Certificate</h4>
              <p className="text-sm text-gray-600 mb-3">
                Official transfer certificate for administrative purposes
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download TC
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentExams;