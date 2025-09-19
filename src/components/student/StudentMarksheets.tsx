import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, GraduationCap, Calendar } from 'lucide-react';

interface MarksData {
  semester: string;
  subjects: Array<{
    code: string;
    name: string;
    credits: number;
    grade: string;
    marks: number;
  }>;
  sgpa: number;
  cgpa: number;
  result: string;
}

const StudentMarksheets = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('6');

  const marksData: MarksData[] = [
    {
      semester: '6',
      subjects: [
        { code: 'CS601', name: 'Software Engineering', credits: 4, grade: 'A', marks: 85 },
        { code: 'CS602', name: 'Database Management Systems', credits: 4, grade: 'A+', marks: 92 },
        { code: 'CS603', name: 'Computer Networks', credits: 3, grade: 'B+', marks: 78 },
        { code: 'CS604', name: 'Operating Systems', credits: 4, grade: 'A', marks: 88 },
        { code: 'CS605', name: 'Web Technologies', credits: 3, grade: 'A+', marks: 94 }
      ],
      sgpa: 8.7,
      cgpa: 8.4,
      result: 'PASS'
    },
    {
      semester: '5',
      subjects: [
        { code: 'CS501', name: 'Design and Analysis of Algorithms', credits: 4, grade: 'A', marks: 86 },
        { code: 'CS502', name: 'Computer Graphics', credits: 3, grade: 'B+', marks: 79 },
        { code: 'CS503', name: 'Compiler Design', credits: 4, grade: 'A', marks: 84 },
        { code: 'CS504', name: 'Machine Learning', credits: 3, grade: 'A+', marks: 91 },
        { code: 'CS505', name: 'Mobile Application Development', credits: 3, grade: 'A', marks: 87 }
      ],
      sgpa: 8.5,
      cgpa: 8.2,
      result: 'PASS'
    },
    {
      semester: '4',
      subjects: [
        { code: 'CS401', name: 'Data Structures and Algorithms', credits: 4, grade: 'A+', marks: 93 },
        { code: 'CS402', name: 'Object Oriented Programming', credits: 4, grade: 'A', marks: 88 },
        { code: 'CS403', name: 'Discrete Mathematics', credits: 3, grade: 'B+', marks: 76 },
        { code: 'CS404', name: 'Computer Organization', credits: 4, grade: 'A', marks: 85 },
        { code: 'CS405', name: 'Statistics and Probability', credits: 3, grade: 'A', marks: 89 }
      ],
      sgpa: 8.6,
      cgpa: 8.1,
      result: 'PASS'
    }
  ];

  const currentSemesterData = marksData.find(data => data.semester === selectedSemester);

  const handleDownloadMarksheet = (semester: string) => {
    console.log(`Downloading marksheet for semester ${semester}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Academic Results - All Semesters
            </span>
            <Button 
              onClick={() => handleDownloadMarksheet(selectedSemester)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Current
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Semester Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {marksData.map((data) => (
              <Button
                key={data.semester}
                variant={selectedSemester === data.semester ? "default" : "outline"}
                onClick={() => setSelectedSemester(data.semester)}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Semester {data.semester}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Semester Results */}
      {currentSemesterData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subjects and Marks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Semester {selectedSemester} - Subject Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Subject Code</th>
                        <th className="text-left p-2">Subject Name</th>
                        <th className="text-center p-2">Credits</th>
                        <th className="text-center p-2">Marks</th>
                        <th className="text-center p-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSemesterData.subjects.map((subject, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-mono text-sm">{subject.code}</td>
                          <td className="p-2">{subject.name}</td>
                          <td className="p-2 text-center">{subject.credits}</td>
                          <td className="p-2 text-center font-semibold">{subject.marks}</td>
                          <td className="p-2 text-center">
                            <Badge 
                              className={
                                subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                                subject.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {subject.grade}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Semester GPA</p>
                  <p className="text-2xl font-bold text-blue-800">{currentSemesterData.sgpa}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Cumulative GPA</p>
                  <p className="text-2xl font-bold text-green-800">{currentSemesterData.cgpa}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Result</p>
                  <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                    {currentSemesterData.result}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Credits: {currentSemesterData.subjects.reduce((sum, subject) => sum + subject.credits, 0)}</p>
                  <p className="text-sm font-medium">Subjects: {currentSemesterData.subjects.length}</p>
                </div>
                <Button 
                  onClick={() => handleDownloadMarksheet(selectedSemester)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Semester {selectedSemester}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* All Semesters Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marksData.map((data) => (
              <div key={data.semester} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Semester {data.semester}</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadMarksheet(data.semester)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>SGPA:</span>
                    <span className="font-semibold">{data.sgpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGPA:</span>
                    <span className="font-semibold">{data.cgpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subjects:</span>
                    <span>{data.subjects.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentMarksheets;