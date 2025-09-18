import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, Calendar, Home, GraduationCap } from 'lucide-react';

interface StudentProfileProps {
  studentData: any;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ studentData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(studentData);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">{studentData.name}</h3>
            <p className="text-gray-600">{studentData.rollNumber}</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">{studentData.semester}</Badge>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Email</p>
                <p className="font-medium">{studentData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Phone</p>
                <p className="font-medium">{studentData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Admission Year</p>
                <p className="font-medium">{studentData.admissionYear}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-blue-600">Course</p>
              <p className="font-medium">{studentData.course}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Department</p>
              <p className="font-medium">{studentData.department}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Current Semester</p>
              <p className="font-medium">{studentData.semester}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Section</p>
              <p className="font-medium">{studentData.section}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Hostel Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-blue-600">Room Number</p>
              <p className="font-medium">{studentData.hostelRoom}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Roommate</p>
              <p className="font-medium">Vikram Singh</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Warden</p>
              <p className="font-medium">Dr. Priya Sharma</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Occupied</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transport Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-blue-600">Route</p>
              <p className="font-medium">{studentData.transportRoute}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Bus Number</p>
              <p className="font-medium">KA-05-MN-2341</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Driver</p>
              <p className="font-medium">Ravi Kumar</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-blue-600">Father's Name</p>
              <p className="font-medium">Rajesh Sharma</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Contact</p>
              <p className="font-medium">+91 9876543200</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Mother's Name</p>
              <p className="font-medium">Sunita Sharma</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-600">Current CGPA</span>
                <span className="font-bold text-blue-800">8.7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600">Semester Rank</span>
                <span className="font-bold text-blue-800">5th</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600">Attendance</span>
                <span className="font-bold text-blue-800">92%</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-blue-600">Recent Achievements</p>
                <div className="space-y-1">
                  <Badge className="bg-green-100 text-green-800 mr-2">Dean's List</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Coding Winner</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Technical Club</p>
                <p className="text-sm text-blue-600">Secretary - Coding Club</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Sports</p>
                <p className="text-sm text-blue-600">Cricket Team Captain</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Cultural</p>
                <p className="text-sm text-blue-600">Drama Society Member</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;