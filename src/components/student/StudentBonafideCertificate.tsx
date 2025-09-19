import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Download, FileText, Calendar, User } from 'lucide-react';

const StudentBonafideCertificate = () => {
  const [certificateData, setCertificateData] = useState({
    purpose: '',
    additionalInfo: '',
    requestDate: new Date().toISOString().split('T')[0]
  });

  const studentData = {
    name: 'Arjun Patel',
    rollNumber: 'CS21B001',
    course: 'Bachelor of Technology in Computer Science Engineering',
    year: '3rd Year',
    semester: '6th Semester',
    admissionYear: '2021',
    fatherName: 'Rajesh Patel',
    address: 'Koramangala, Bangalore, Karnataka 560034'
  };

  const handleDownloadCertificate = () => {
    console.log('Downloading bonafide certificate...', certificateData);
  };

  const handleRequestCertificate = () => {
    console.log('Requesting new bonafide certificate...', certificateData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Bonafide Certificate
            </span>
            <Button 
              onClick={handleDownloadCertificate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Latest
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificate Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Certificate Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white border-2 border-gray-300 p-8 rounded-lg shadow-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-blue-800 mb-2">CAMPUSFLOW COLLEGE</h1>
                <p className="text-sm text-gray-600">Affiliated to Karnataka State University</p>
                <p className="text-sm text-gray-600">Bangalore, Karnataka - 560001</p>
                <div className="mt-4 border-b-2 border-blue-800 w-32 mx-auto"></div>
              </div>

              {/* Certificate Title */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">BONAFIDE CERTIFICATE</h2>
              </div>

              {/* Certificate Content */}
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  This is to certify that <strong>{studentData.name}</strong>, 
                  Roll Number: <strong>{studentData.rollNumber}</strong>, 
                  Son/Daughter of <strong>{studentData.fatherName}</strong> is a bonafide student of this institution.
                </p>

                <p>
                  He/She is currently pursuing <strong>{studentData.course}</strong> and 
                  is presently studying in <strong>{studentData.year}</strong> 
                  (<strong>{studentData.semester}</strong>) having taken admission in the year <strong>{studentData.admissionYear}</strong>.
                </p>

                <p>
                  His/Her residential address is: <strong>{studentData.address}</strong>
                </p>

                {certificateData.purpose && (
                  <p>
                    This certificate is issued for the purpose of <strong>{certificateData.purpose}</strong>.
                  </p>
                )}

                {certificateData.additionalInfo && (
                  <p>
                    Additional Information: {certificateData.additionalInfo}
                  </p>
                )}

                <p className="mt-6">
                  This certificate is issued on <strong>{new Date().toLocaleDateString('en-IN')}</strong> 
                  based on the records available in this office.
                </p>
              </div>

              {/* Signature Section */}
              <div className="mt-12 flex justify-between items-end">
                <div>
                  <p className="text-sm">Date: {new Date().toLocaleDateString('en-IN')}</p>
                  <p className="text-sm">Place: Bangalore</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 w-32 mb-1"></div>
                  <p className="text-sm font-semibold">Registrar</p>
                  <p className="text-xs">CampusFlow College</p>
                </div>
              </div>

              {/* College Seal */}
              <div className="mt-8 text-center">
                <div className="inline-block border-2 border-blue-800 rounded-full w-20 h-20 flex items-center justify-center">
                  <span className="text-xs text-blue-800 font-bold">COLLEGE<br/>SEAL</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request New Certificate */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm text-gray-600">Name</Label>
                <p className="font-medium">{studentData.name}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Roll Number</Label>
                <p className="font-medium">{studentData.rollNumber}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Course</Label>
                <p className="font-medium">{studentData.course}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Current Year</Label>
                <p className="font-medium">{studentData.year}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Request New Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="purpose">Purpose *</Label>
                <Input
                  id="purpose"
                  placeholder="e.g., Bank Loan, Passport Application, Scholarship"
                  value={certificateData.purpose}
                  onChange={(e) => setCertificateData({...certificateData, purpose: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional details to be included in the certificate"
                  value={certificateData.additionalInfo}
                  onChange={(e) => setCertificateData({...certificateData, additionalInfo: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="requestDate">Request Date</Label>
                <Input
                  id="requestDate"
                  type="date"
                  value={certificateData.requestDate}
                  onChange={(e) => setCertificateData({...certificateData, requestDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleRequestCertificate}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!certificateData.purpose}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request New Certificate
                </Button>
                
                <Button 
                  onClick={handleDownloadCertificate}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Current Certificate
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                <p>• Processing time: 2-3 working days</p>
                <p>• Certificate will be available for download once approved</p>
                <p>• You will receive an email notification when ready</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentBonafideCertificate;