import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

interface FacultyIdCardProps {
  facultyData: any;
}

const FacultyIdCard: React.FC<FacultyIdCardProps> = ({ facultyData }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${facultyData.facultyId}_faculty_id.pdf`;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-white text-green-800 p-4 text-center">
            <h2 className="text-lg font-bold">CAMPUSFLOW COLLEGE</h2>
            <p className="text-sm">Faculty Identity Card</p>
          </div>

          {/* Faculty Photo and Info */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-24 bg-gray-300 rounded border-2 border-white flex items-center justify-center">
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{facultyData.name}</h3>
                <p className="text-green-100">{facultyData.designation}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-200">Employee ID:</span>
                <span className="font-semibold">{facultyData.facultyId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Department:</span>
                <span className="font-semibold">{facultyData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Designation:</span>
                <span className="font-semibold">{facultyData.designation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Joining Date:</span>
                <span className="font-semibold">{facultyData.joiningDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-200">Email:</span>
                <span className="font-semibold text-xs">{facultyData.email}</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="mt-4 p-2 bg-white rounded">
              <div className="h-8 bg-black bg-opacity-80 flex items-center justify-center">
                <span className="text-white text-xs font-mono">{facultyData.facultyId}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-green-900 p-3 text-center">
            <p className="text-xs text-green-200">Valid for Academic Year 2023-24</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Download ID Card
        </Button>
      </div>
    </div>
  );
};

export default FacultyIdCard;