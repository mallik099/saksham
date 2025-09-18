import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Phone, Mail, Upload } from 'lucide-react';

interface StaffProfileProps {
  staffInfo: {
    name: string;
    employeeId: string;
    department: string;
    designation: string;
    phone: string;
    email: string;
    photo: string;
  };
}

const StaffProfile: React.FC<StaffProfileProps> = ({ staffInfo }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Staff Profile</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <img src={staffInfo.photo} alt="Staff" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900 font-medium">{staffInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Employee ID</label>
                  <p className="text-gray-900 font-medium">{staffInfo.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Department</label>
                  <p className="text-gray-900 font-medium">{staffInfo.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Designation</label>
                  <p className="text-gray-900 font-medium">{staffInfo.designation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900 font-medium">{staffInfo.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900 font-medium">{staffInfo.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-gray-900 font-medium">Indiranagar, Bangalore, Karnataka - 560038</p>
              </div>
              <Button className="w-full bg-[#b1f2ff] text-black hover:bg-[#9ee8f5]">
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Offer Letter', uploaded: true },
              { name: 'Experience Certificate', uploaded: true },
              { name: 'ID Card', uploaded: true }
            ].map((doc, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{doc.name}</span>
                  <Download className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-800" />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {doc.uploaded ? 'Available' : 'Not uploaded'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProfile;