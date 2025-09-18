import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Users, BookOpen, GraduationCap, Calendar, FileText, MessageSquare } from 'lucide-react';

interface FacultyClassInchargeProps {
  facultyData: any;
}

const FacultyClassIncharge: React.FC<FacultyClassInchargeProps> = ({ facultyData }) => {
  const classData = {
    className: 'CSE - 3rd Year - Section A',
    subjects: ['Data Structures', 'Database Systems', 'Software Engineering'],
    studentCount: 45,
    academicYear: '2023-24',
    semester: 'VI',
    classTeacher: facultyData.name
  };

  const studentStats = {
    present: 42,
    absent: 3,
    averageAttendance: 93.3,
    topPerformers: [
      { name: 'Rahul Sharma', rollNo: 'CSE2021001', percentage: 95.2 },
      { name: 'Priya Patel', rollNo: 'CSE2021002', percentage: 94.8 },
      { name: 'Amit Kumar', rollNo: 'CSE2021003', percentage: 93.5 }
    ]
  };

  const subjectDetails = [
    { 
      subject: 'Data Structures', 
      code: 'CS301', 
      credits: 4, 
      hoursPerWeek: 5,
      completedTopics: 8,
      totalTopics: 12,
      nextClass: '2024-03-15 10:00 AM'
    },
    { 
      subject: 'Database Systems', 
      code: 'CS302', 
      credits: 4, 
      hoursPerWeek: 4,
      completedTopics: 6,
      totalTopics: 10,
      nextClass: '2024-03-16 11:00 AM'
    },
    { 
      subject: 'Software Engineering', 
      code: 'CS303', 
      credits: 3, 
      hoursPerWeek: 3,
      completedTopics: 5,
      totalTopics: 8,
      nextClass: '2024-03-17 02:00 PM'
    }
  ];

  const recentActivities = [
    { date: '2024-03-10', activity: 'Conducted Unit Test - Data Structures', type: 'exam' },
    { date: '2024-03-08', activity: 'Parent-Teacher Meeting Scheduled', type: 'meeting' },
    { date: '2024-03-05', activity: 'Assignment Submitted - Database Systems', type: 'assignment' },
    { date: '2024-03-03', activity: 'Attendance Updated for Week 10', type: 'attendance' }
  ];

  if (!facultyData.isIncharge) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Not a Class Incharge</h3>
          <p className="text-gray-500">You are not currently assigned as a class incharge.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Class Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Users className="h-5 w-5" />
            Class Incharge Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">{classData.className}</h3>
              <p className="text-blue-600">Academic Year: {classData.academicYear}</p>
              <Badge className="mt-2 bg-blue-600">Semester {classData.semester}</Badge>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-800">{classData.studentCount}</h3>
              <p className="text-green-600">Total Students</p>
              <Badge className="mt-2 bg-green-600">Active</Badge>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-purple-800">{classData.subjects.length}</h3>
              <p className="text-purple-600">Subjects In-Charge</p>
              <Badge className="mt-2 bg-purple-600">Teaching</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects In-Charge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subjects In-Charge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {subjectDetails.map((subject, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{subject.subject}</h4>
                      <p className="text-sm text-gray-600">{subject.code} • {subject.credits} Credits</p>
                    </div>
                    <Badge variant="secondary">{subject.hoursPerWeek}h/week</Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Syllabus Progress</span>
                      <span>{subject.completedTopics}/{subject.totalTopics} topics</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(subject.completedTopics / subject.totalTopics) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-600">Next Class:</p>
                    <p className="font-medium">{subject.nextClass}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{studentStats.present}</p>
                  <p className="text-sm text-gray-600">Present Today</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{studentStats.absent}</p>
                  <p className="text-sm text-gray-600">Absent Today</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{studentStats.averageAttendance}%</p>
                  <p className="text-sm text-gray-600">Avg. Attendance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentStats.topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNo}</p>
                  </div>
                  <Badge className="bg-green-600">{student.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Class Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'exam' ? 'bg-red-100' :
                  activity.type === 'meeting' ? 'bg-blue-100' :
                  activity.type === 'assignment' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'exam' && <FileText className="h-5 w-5 text-red-600" />}
                  {activity.type === 'meeting' && <MessageSquare className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'assignment' && <BookOpen className="h-5 w-5 text-green-600" />}
                  {activity.type === 'attendance' && <Users className="h-5 w-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Class Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Users className="h-5 w-5" />
              View Students
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Mark Attendance
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <FileText className="h-5 w-5" />
              Create Assignment
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Notice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyClassIncharge;