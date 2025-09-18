import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { GraduationCap, Users, Crown, Calendar, FileText, Award } from 'lucide-react';

interface FacultyPostInfoProps {
  facultyData: any;
}

const FacultyPostInfo: React.FC<FacultyPostInfoProps> = ({ facultyData }) => {
  const postDetails = {
    currentPost: 'Associate Professor',
    department: 'Computer Science Engineering',
    appointmentDate: '2018-07-15',
    experience: '6 years',
    isHOD: false,
    isIncharge: true,
    responsibilities: [
      'Teaching undergraduate courses',
      'Research supervision',
      'Class incharge duties',
      'Curriculum development',
      'Student mentoring'
    ],
    achievements: [
      { year: '2023', title: 'Best Faculty Award', description: 'Outstanding teaching performance' },
      { year: '2022', title: 'Research Excellence', description: 'Published 5 research papers' },
      { year: '2021', title: 'Student Mentor', description: 'Guided 15 final year projects' }
    ]
  };

  const careerProgression = [
    { year: '2018', position: 'Assistant Professor', department: 'Computer Science', status: 'Completed' },
    { year: '2021', position: 'Associate Professor', department: 'Computer Science', status: 'Current' },
    { year: '2025', position: 'Professor (Expected)', department: 'Computer Science', status: 'Future' }
  ];

  const additionalRoles = [
    { role: 'Class Incharge', class: 'CSE 3rd Year Section A', since: '2023', active: true },
    { role: 'Exam Committee Member', department: 'CSE Department', since: '2022', active: true },
    { role: 'Placement Coordinator', department: 'CSE Department', since: '2021', active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Current Post Information */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <GraduationCap className="h-5 w-5" />
            Current Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-purple-800">{postDetails.currentPost}</h3>
              <p className="text-purple-600">{postDetails.department}</p>
              <Badge className="mt-2 bg-purple-600">Current Position</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Appointment Date</p>
                <p className="text-lg font-semibold">{postDetails.appointmentDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Experience</p>
                <p className="text-lg font-semibold">{postDetails.experience}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Employee ID</p>
                <p className="text-lg font-semibold">{facultyData.facultyId}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">HOD Status:</span>
                <Badge className={postDetails.isHOD ? 'bg-green-600' : 'bg-gray-400'}>
                  {postDetails.isHOD ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Class Incharge:</span>
                <Badge className={postDetails.isIncharge ? 'bg-green-600' : 'bg-gray-400'}>
                  {postDetails.isIncharge ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Career Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerProgression.map((career, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  career.status === 'Current' ? 'bg-blue-100' :
                  career.status === 'Completed' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <GraduationCap className={`h-6 w-6 ${
                    career.status === 'Current' ? 'text-blue-600' :
                    career.status === 'Completed' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{career.position}</h4>
                  <p className="text-gray-600">{career.department}</p>
                  <p className="text-sm text-gray-500">Since {career.year}</p>
                </div>
                <Badge className={
                  career.status === 'Current' ? 'bg-blue-600' :
                  career.status === 'Completed' ? 'bg-green-600' : 'bg-gray-400'
                }>
                  {career.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Responsibilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Key Responsibilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postDetails.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-medium">{responsibility}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Additional Roles & Responsibilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {additionalRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{role.role}</h4>
                  <p className="text-gray-600">{role.class || role.department}</p>
                  <p className="text-sm text-gray-500">Since {role.since}</p>
                </div>
                <Badge className={role.active ? 'bg-green-600' : 'bg-gray-400'}>
                  {role.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Awards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postDetails.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <Badge variant="secondary">{achievement.year}</Badge>
                  </div>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <FileText className="h-5 w-5" />
              View CV
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Award className="h-5 w-5" />
              Certificates
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Training Records
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <GraduationCap className="h-5 w-5" />
              Promotion Tracker
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyPostInfo;