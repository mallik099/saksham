import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, CreditCard, QrCode, User } from 'lucide-react';

interface StudentIdCardProps {
  studentData?: any;
}

const StudentIdCard: React.FC<StudentIdCardProps> = ({ studentData }) => {
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  
  const defaultStudentData = {
    name: 'Arjun Patel',
    rollNumber: 'CS21B001',
    course: 'Computer Science Engineering',
    department: 'Computer Science',
    semester: '6th Semester',
    section: 'A',
    admissionYear: '2021',
    email: 'arjun.patel@saksham.edu',
    phone: '+91 9876543210',
    bloodGroup: 'B+',
    emergencyContact: '+91 9876543200'
  };
  
  const student = studentData || defaultStudentData;

  const handleDownload = () => {
    console.log(`Downloading ID card for ${student.rollNumber}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              Digital Student ID Card
            </span>
            <div className="flex gap-2">
              <Button
                variant={cardSide === 'front' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCardSide('front')}
              >
                Front
              </Button>
              <Button
                variant={cardSide === 'back' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCardSide('back')}
              >
                Back
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="max-w-md mx-auto">
        {/* ID Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden transform transition-all duration-500 hover:scale-105">
          <CardContent className="p-0">
            {cardSide === 'front' ? (
              // Front Side
              <>
                {/* Header */}
                <div className="bg-white text-blue-800 p-4 text-center">
                  <h2 className="text-lg font-bold">CAMPUSFLOW COLLEGE</h2>
                  <p className="text-sm">Student Identity Card</p>
                </div>

                {/* Student Photo and Info */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-24 bg-white rounded border-2 border-white flex items-center justify-center overflow-hidden">
                      <User className="h-12 w-12 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{student.name}</h3>
                      <p className="text-blue-100 text-sm">{student.course}</p>
                      <Badge className="mt-1 bg-blue-100 text-blue-800 text-xs">
                        {student.semester}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Roll Number:</span>
                      <span className="font-semibold">{student.rollNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Department:</span>
                      <span className="font-semibold">{student.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Section:</span>
                      <span className="font-semibold">{student.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Admission Year:</span>
                      <span className="font-semibold">{student.admissionYear}</span>
                    </div>
                  </div>

                  {/* Barcode */}
                  <div className="mt-4 p-2 bg-white rounded">
                    <div className="h-8 bg-black bg-opacity-80 flex items-center justify-center">
                      <span className="text-white text-xs font-mono">{student.rollNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-blue-900 p-3 text-center">
                  <p className="text-xs text-blue-200">Valid for Academic Year 2023-24</p>
                </div>
              </>
            ) : (
              // Back Side
              <>
                {/* Header */}
                <div className="bg-white text-blue-800 p-4 text-center">
                  <h2 className="text-lg font-bold">EMERGENCY INFORMATION</h2>
                </div>

                {/* Emergency Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-blue-200 block">Email:</span>
                      <span className="font-semibold">{student.email}</span>
                    </div>
                    <div>
                      <span className="text-blue-200 block">Phone:</span>
                      <span className="font-semibold">{student.phone}</span>
                    </div>
                    <div>
                      <span className="text-blue-200 block">Blood Group:</span>
                      <span className="font-semibold text-red-300">{student.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-blue-200 block">Emergency Contact:</span>
                      <span className="font-semibold">{student.emergencyContact}</span>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="mt-6 text-center">
                    <div className="inline-block p-4 bg-white rounded">
                      <QrCode className="h-16 w-16 text-blue-800 mx-auto" />
                      <p className="text-xs text-blue-800 mt-2">Scan for Details</p>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-4 text-xs text-blue-200 space-y-1">
                    <p>• This card is property of CampusFlow College</p>
                    <p>• Report if lost immediately</p>
                    <p>• Valid only with photo ID</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-blue-900 p-3 text-center">
                  <p className="text-xs text-blue-200">For assistance: +91 80-12345678</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <Button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Digital ID Card
          </Button>
          <p className="text-xs text-gray-500 text-center">
            High-resolution PDF will be downloaded for printing
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentIdCard;