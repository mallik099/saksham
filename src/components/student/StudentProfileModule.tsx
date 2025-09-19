import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  User, Mail, Phone, Calendar, Home, GraduationCap, 
  Download, Edit, MapPin, Users, Award, FileText, CreditCard, BookOpen 
} from 'lucide-react';
import StudentMarksheets from './StudentMarksheets';
import StudentBonafideCertificate from './StudentBonafideCertificate';
import StudentIdCard from './StudentIdCard';

const StudentProfileModule = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Arjun Patel',
    rollNumber: 'CS21B001',
    email: 'arjun.patel@saksham.edu',
    phone: '+91 9876543210',
    address: 'Koramangala, Bangalore, Karnataka 560034',
    course: 'Computer Science Engineering',
    department: 'Computer Science',
    year: '3rd Year',
    semester: '6th Semester',
    section: 'A',
    admissionYear: '2021',
    cgpa: '8.4',
    bloodGroup: 'B+',
    emergencyContact: '+91 9876543200'
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'marksheets':
        return <StudentMarksheets />;
      case 'bonafide':
        return <StudentBonafideCertificate />;
      case 'idcard':
        return <StudentIdCard studentData={profileData} />;
      default:
        return renderProfileContent();
    }
  };

  const renderProfileContent = () => (

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => handleTabChange('profile')}
              className="flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant={activeTab === 'marksheets' ? 'default' : 'outline'}
              onClick={() => handleTabChange('marksheets')}
              className="flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Marksheets
            </Button>
            <Button
              variant={activeTab === 'bonafide' ? 'default' : 'outline'}
              onClick={() => handleTabChange('bonafide')}
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Bonafide Certificate
            </Button>
            <Button
              variant={activeTab === 'idcard' ? 'default' : 'outline'}
              onClick={() => handleTabChange('idcard')}
              className="flex items-center"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Digital ID Card
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default StudentProfileModule;

    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.rollNumber}</p>
                <Badge className="mt-1 bg-blue-100 text-blue-800">{profileData.semester}</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleTabChange('idcard')}
                className="flex items-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                ID Card
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleTabChange('bonafide')}
                className="flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Bonafide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Personal Information</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={profileData.phone} />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={profileData.address} />
                    </div>
                    <Button className="w-full">Update Information</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{profileData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{profileData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{profileData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Course</p>
              <p className="font-medium">{profileData.course}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Year</p>
              <p className="font-medium">{profileData.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Section</p>
              <p className="font-medium">{profileData.section}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admission Year</p>
              <p className="font-medium">{profileData.admissionYear}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Documents & Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleTabChange('idcard')}
            >
              <CreditCard className="w-6 h-6 mb-2" />
              Digital ID Card
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleTabChange('bonafide')}
            >
              <FileText className="w-6 h-6 mb-2" />
              Bonafide Certificate
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => handleTabChange('marksheets')}
            >
              <BookOpen className="w-6 h-6 mb-2" />
              Marksheets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current CGPA</span>
                <span className="font-bold text-blue-800 text-lg">{profileData.cgpa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Class Rank</span>
                <span className="font-bold text-blue-800">5th</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Attendance</span>
                <span className="font-bold text-green-600">87%</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Achievements</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800">Dean's List</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Coding Champion</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Best Project</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Activities & Clubs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Technical Club</p>
                <p className="text-sm text-blue-600">Secretary - Coding Club</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-800">Sports</p>
                <p className="text-sm text-green-600">Cricket Team Captain</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-800">Cultural</p>
                <p className="text-sm text-purple-600">Drama Society Member</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  }