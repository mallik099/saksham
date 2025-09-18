import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

interface StudentIdCardProps {
  studentData: any;
}

const StudentIdCard: React.FC<StudentIdCardProps> = ({ studentData }) => {
  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${studentData.rollNumber}_id_card.pdf`;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-white text-blue-800 p-4 text-center">
            <h2 className="text-lg font-bold">CAMPUSFLOW COLLEGE</h2>
            <p className="text-sm">Student Identity Card</p>
          </div>

          {/* Student Photo and Info */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-24 bg-gray-300 rounded border-2 border-white flex items-center justify-center">
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{studentData.name}</h3>
                <p className="text-blue-100">{studentData.course}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-200">Roll Number:</span>
                <span className="font-semibold">{studentData.rollNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Department:</span>
                <span className="font-semibold">{studentData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Semester:</span>
                <span className="font-semibold">{studentData.semester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Section:</span>
                <span className="font-semibold">{studentData.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Admission Year:</span>
                <span className="font-semibold">{studentData.admissionYear}</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="mt-4 p-2 bg-white rounded">
              <div className="h-8 bg-black bg-opacity-80 flex items-center justify-center">
                <span className="text-white text-xs font-mono">{studentData.rollNumber}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-900 p-3 text-center">
            <p className="text-xs text-blue-200">Valid for Academic Year 2023-24</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download ID Card
        </Button>
      </div>
    </div>
  );
};

export default StudentIdCard;