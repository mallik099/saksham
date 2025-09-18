import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, Calendar, GraduationCap, Building } from 'lucide-react';

interface FacultyProfileProps {
  facultyData: any;
}

const FacultyProfile: React.FC<FacultyProfileProps> = ({ facultyData }) => {
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
            <h3 className="text-xl font-bold">{facultyData.name}</h3>
            <p className="text-gray-600">{facultyData.employeeId}</p>
            <Badge className="mt-2 bg-green-600">{facultyData.designation}</Badge>
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
                <p className="font-medium">{facultyData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{facultyData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Joining Date</p>
                <p className="font-medium">{facultyData.joiningDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium">{facultyData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Designation</p>
              <p className="font-medium">{facultyData.designation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Employee ID</p>
              <p className="font-medium">{facultyData.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="font-medium">6 years</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teaching Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Assigned Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facultyData.subjects.map((subject: string, index: number) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">{subject}</p>
                  <p className="text-sm text-gray-600">
                    Classes: {facultyData.classes.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Qualifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Ph.D. in Computer Science</p>
              <p className="text-sm text-gray-600">Stanford University, 2016</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">M.Tech in Software Engineering</p>
              <p className="text-sm text-gray-600">IIT Delhi, 2012</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">B.Tech in Computer Science</p>
              <p className="text-sm text-gray-600">NIT Trichy, 2010</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research & Publications */}
      <Card>
        <CardHeader>
          <CardTitle>Research & Publications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Machine Learning Applications in Database Systems</h4>
              <p className="text-sm text-gray-600 mt-1">
                Published in IEEE Transactions on Knowledge and Data Engineering, 2023
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Optimizing Query Performance in Distributed Databases</h4>
              <p className="text-sm text-gray-600 mt-1">
                Published in ACM Computing Surveys, 2022
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Data Structures for Real-time Applications</h4>
              <p className="text-sm text-gray-600 mt-1">
                Published in Journal of Computer Science and Technology, 2021
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;