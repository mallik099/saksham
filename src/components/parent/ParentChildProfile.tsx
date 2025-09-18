import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  User, Phone, Mail, MapPin, Calendar, Award, 
  TrendingUp, BookOpen, Clock, Heart, Star
} from 'lucide-react';

const ParentChildProfile = () => {
  const childProfile = {
    personalInfo: {
      name: 'Arjun Patel',
      rollNo: 'CS21001',
      admissionNo: 'ADM2021001',
      dateOfBirth: '2003-05-15',
      bloodGroup: 'O+',
      gender: 'Male',
      nationality: 'Indian',
      religion: 'Hindu',
      category: 'General',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    academicInfo: {
      course: 'Computer Science Engineering',
      semester: '6th Semester',
      batch: '2021-2025',
      section: 'A',
      currentCGPA: 8.4,
      totalCredits: 142,
      completedCredits: 120,
      classRank: 12,
      totalStudents: 60
    },
    contactInfo: {
      phone: '+91 9876543210',
      email: 'arjun.patel@saksham.edu',
      address: 'Koramangala, Bangalore, Karnataka - 560034',
      emergencyContact: '+91 9876543211',
      hostelRoom: 'Block A, Room 205'
    },
    parentInfo: {
      fatherName: 'Ramesh Patel',
      fatherOccupation: 'Software Engineer',
      fatherPhone: '+91 9876543210',
      motherName: 'Sunita Patel',
      motherOccupation: 'Teacher',
      motherPhone: '+91 9876543211',
      guardianName: 'Ramesh Patel',
      guardianRelation: 'Father'
    },
    achievements: [
      { title: 'Best Student Award', year: '2023', category: 'Academic Excellence' },
      { title: 'Coding Competition Winner', year: '2023', category: 'Technical' },
      { title: 'Sports Championship', year: '2022', category: 'Sports' },
      { title: 'Cultural Fest Winner', year: '2022', category: 'Cultural' }
    ],
    skills: [
      { name: 'Programming', level: 90 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Communication', level: 80 },
      { name: 'Leadership', level: 75 },
      { name: 'Teamwork', level: 88 }
    ],
    extracurricular: [
      { activity: 'Coding Club', position: 'Vice President', duration: '2022-Present' },
      { activity: 'Basketball Team', position: 'Team Captain', duration: '2021-Present' },
      { activity: 'Debate Society', position: 'Member', duration: '2021-2023' },
      { activity: 'Volunteer Club', position: 'Active Member', duration: '2021-Present' }
    ]
  };

  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-600';
    if (cgpa >= 8) return 'text-blue-600';
    if (cgpa >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header with Photo and Basic Info */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={childProfile.personalInfo.photo} 
                alt={childProfile.personalInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">{childProfile.personalInfo.name}</h2>
              <p className="text-lg text-gray-600 mb-2">{childProfile.academicInfo.course}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{childProfile.personalInfo.rollNo}</Badge>
                <Badge variant="outline">{childProfile.academicInfo.semester}</Badge>
                <Badge variant="outline">Section {childProfile.academicInfo.section}</Badge>
                <Badge className={`${getGradeColor(childProfile.academicInfo.currentCGPA)} bg-opacity-10`}>
                  CGPA: {childProfile.academicInfo.currentCGPA}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Admission No.</p>
                  <p className="font-semibold">{childProfile.personalInfo.admissionNo}</p>
                </div>
                <div>
                  <p className="text-gray-500">Batch</p>
                  <p className="font-semibold">{childProfile.academicInfo.batch}</p>
                </div>
                <div>
                  <p className="text-gray-500">Class Rank</p>
                  <p className="font-semibold">{childProfile.academicInfo.classRank}/{childProfile.academicInfo.totalStudents}</p>
                </div>
                <div>
                  <p className="text-gray-500">Blood Group</p>
                  <p className="font-semibold">{childProfile.personalInfo.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-semibold flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {childProfile.personalInfo.dateOfBirth}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-semibold">{childProfile.personalInfo.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-semibold">{childProfile.personalInfo.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Religion</p>
                <p className="font-semibold">{childProfile.personalInfo.religion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{childProfile.personalInfo.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-semibold flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                  {childProfile.personalInfo.bloodGroup}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-semibold flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {childProfile.contactInfo.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {childProfile.contactInfo.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {childProfile.contactInfo.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hostel Room</p>
              <p className="font-semibold">{childProfile.contactInfo.hostelRoom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergency Contact</p>
              <p className="font-semibold text-red-600">{childProfile.contactInfo.emergencyContact}</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Progress */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Academic Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Credits Completed</span>
              <span className="text-sm text-gray-600">
                {childProfile.academicInfo.completedCredits}/{childProfile.academicInfo.totalCredits}
              </span>
            </div>
            <Progress 
              value={(childProfile.academicInfo.completedCredits / childProfile.academicInfo.totalCredits) * 100} 
              className="h-3"
            />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{childProfile.academicInfo.currentCGPA}</p>
                <p className="text-sm text-gray-600">Current CGPA</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">#{childProfile.academicInfo.classRank}</p>
                <p className="text-sm text-gray-600">Class Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Assessment */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Skills Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {childProfile.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-600">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements & Awards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {childProfile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.category} • {achievement.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Extracurricular Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {childProfile.extracurricular.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.position}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parent/Guardian Information */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Parent/Guardian Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-900">Father's Details</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{childProfile.parentInfo.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="font-semibold">{childProfile.parentInfo.fatherOccupation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{childProfile.parentInfo.fatherPhone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-900">Mother's Details</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{childProfile.parentInfo.motherName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="font-semibold">{childProfile.parentInfo.motherOccupation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{childProfile.parentInfo.motherPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentChildProfile;