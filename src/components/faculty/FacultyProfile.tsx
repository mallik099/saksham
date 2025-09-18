import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { User, Mail, Phone, Calendar, GraduationCap, Building, MapPin, Download, IdCard } from 'lucide-react';

interface FacultyProfileProps {
  facultyData: any;
}

const FacultyProfile: React.FC<FacultyProfileProps> = ({ facultyData }) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-blue-800">{facultyData.name}</h2>
              <p className="text-xl text-blue-600 mb-2">{facultyData.designation}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-blue-600">{facultyData.facultyId}</Badge>
                <Badge variant="secondary">{facultyData.department}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button>
                <IdCard className="h-4 w-4 mr-2" />
                View Digital ID
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <User className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Full Name</p>
                <p className="font-medium">{facultyData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Email</p>
                <p className="font-medium">{facultyData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Phone</p>
                <p className="font-medium">{facultyData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Address</p>
                <p className="font-medium">{facultyData.address}</p>
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
              <p className="text-sm text-blue-600">Faculty ID</p>
              <p className="font-medium">{facultyData.facultyId}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Department</p>
              <p className="font-medium">{facultyData.department}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Designation</p>
              <p className="font-medium">{facultyData.designation}</p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-blue-600">Joining Date</p>
                <p className="font-medium">{facultyData.joiningDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents & ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">ID Proof</span>
                <Badge className="bg-green-600">Verified</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Certificates</span>
                <Badge className="bg-green-600">Uploaded</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Address Proof</span>
                <Badge className="bg-yellow-600">Pending</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Manage Documents
            </Button>
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
                  <p className="text-sm text-blue-600">
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
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">Ph.D. in Computer Science</p>
              <p className="text-sm text-blue-600">IIT Bangalore, 2016</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">M.Tech in Software Engineering</p>
              <p className="text-sm text-blue-600">IISc Bangalore, 2012</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">B.E. in Computer Science</p>
              <p className="text-sm text-blue-600">VTU Bangalore, 2010</p>
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
              <p className="text-sm text-blue-600 mt-1">
                Published in IEEE Transactions on Knowledge and Data Engineering, 2023
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Optimizing Query Performance in Distributed Databases</h4>
              <p className="text-sm text-blue-600 mt-1">
                Published in ACM Computing Surveys, 2022
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Data Structures for Real-time Applications</h4>
              <p className="text-sm text-blue-600 mt-1">
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