import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, Calendar, Home, GraduationCap } from 'lucide-react';

interface StudentProfileProps {
  studentData: any;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ studentData }) => {
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
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold">{studentData.name}</h3>
            <p className="text-gray-600">{studentData.rollNumber}</p>
            <Badge className="mt-2">{studentData.semester}</Badge>
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
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{studentData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{studentData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Admission Year</p>
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
              <p className="text-sm text-gray-600">Course</p>
              <p className="font-medium">{studentData.course}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium">{studentData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Semester</p>
              <p className="font-medium">{studentData.semester}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Section</p>
              <p className="font-medium">{studentData.section}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Hostel Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Room Number</p>
              <p className="font-medium">{studentData.hostelRoom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupancy Status</p>
              <Badge variant="secondary">Occupied</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transport Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-medium">{studentData.transportRoute}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;