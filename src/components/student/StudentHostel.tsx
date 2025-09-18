import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Building, Users, Wrench, Bed } from 'lucide-react';

interface StudentHostelProps {
  studentData: any;
}

const StudentHostel: React.FC<StudentHostelProps> = ({ studentData }) => {
  const roomDetails = {
    block: 'A',
    floor: '2nd Floor',
    roomNumber: '205',
    roomType: 'Double Sharing',
    roommate: 'Alex Johnson',
    warden: 'Mr. Robert Smith',
    wardenContact: '+91 9876543210'
  };

  const facilities = [
    { name: 'Wi-Fi', status: 'Active', icon: '📶' },
    { name: 'Water Cooler', status: 'Working', icon: '💧' },
    { name: 'Laundry', status: 'Available', icon: '👕' },
    { name: 'Mess', status: 'Open', icon: '🍽️' },
    { name: 'Study Room', status: 'Available', icon: '📚' },
    { name: 'Recreation Room', status: 'Open', icon: '🎮' }
  ];

  const maintenanceRequests = [
    { id: 1, issue: 'AC not working', status: 'In Progress', date: '2024-03-01' },
    { id: 2, issue: 'Bathroom tap leaking', status: 'Resolved', date: '2024-02-28' }
  ];

  const handleMaintenanceRequest = () => {
    alert('Maintenance request form opened. This is a demo.');
  };

  return (
    <div className="space-y-6">
      {/* Room Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Room Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Room Number</p>
                <p className="text-xl font-bold">{studentData.hostelRoom}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-medium">{roomDetails.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Floor</p>
                <p className="font-medium">{roomDetails.floor}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Roommate</p>
                <p className="font-medium">{roomDetails.roommate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Warden</p>
                <p className="font-medium">{roomDetails.warden}</p>
                <p className="text-sm text-gray-500">{roomDetails.wardenContact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupancy Status</p>
                <Badge variant="default">Occupied</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hostel Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Hostel Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{facility.icon}</span>
                <div>
                  <p className="font-medium">{facility.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {facility.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Requests
            </span>
            <Button onClick={handleMaintenanceRequest}>
              New Request
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{request.issue}</p>
                  <p className="text-sm text-gray-600">Requested on: {request.date}</p>
                </div>
                <Badge variant={request.status === 'Resolved' ? 'default' : 'secondary'}>
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Room Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="h-5 w-5" />
            Room Layout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-blue-200 p-4 rounded text-center">
                <Bed className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Bed 1</p>
                <p className="text-xs text-gray-600">You</p>
              </div>
              <div className="bg-green-200 p-4 rounded text-center">
                <Bed className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Bed 2</p>
                <p className="text-xs text-gray-600">{roomDetails.roommate}</p>
              </div>
              <div className="col-span-2 bg-yellow-200 p-4 rounded text-center">
                <p className="text-sm">Study Area</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHostel;