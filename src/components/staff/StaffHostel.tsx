import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Building, Users, Bed, Download, Check, X } from 'lucide-react';

const StaffHostel = () => {
  const hostelRequests = [
    { id: 'HST001', studentName: 'Alex Johnson', rollNo: 'CS21007', course: 'Computer Science', year: '3rd Year', requestDate: '2024-03-01', status: 'Pending', preference: 'Single Room' },
    { id: 'HST002', studentName: 'Emma Wilson', rollNo: 'EC21008', course: 'Electronics', year: '2nd Year', requestDate: '2024-03-02', status: 'Pending', preference: 'Double Sharing' },
    { id: 'HST003', studentName: 'Ryan Davis', rollNo: 'ME21009', course: 'Mechanical', year: '1st Year', requestDate: '2024-03-03', status: 'Approved', preference: 'Triple Sharing' }
  ];

  const [requests, setRequests] = useState(hostelRequests);

  const hostelBlocks = [
    {
      block: 'A',
      floors: 3,
      totalRooms: 60,
      occupiedRooms: 45,
      rooms: [
        { number: 'A101', type: 'Single', occupancy: 1, maxOccupancy: 1, student: 'John Doe' },
        { number: 'A102', type: 'Double', occupancy: 2, maxOccupancy: 2, student: 'Mike & Tom' },
        { number: 'A103', type: 'Single', occupancy: 0, maxOccupancy: 1, student: null },
        { number: 'A104', type: 'Triple', occupancy: 3, maxOccupancy: 3, student: 'Sam, Joe & Ben' }
      ]
    },
    {
      block: 'B',
      floors: 4,
      totalRooms: 80,
      occupiedRooms: 65,
      rooms: [
        { number: 'B201', type: 'Double', occupancy: 1, maxOccupancy: 2, student: 'Sarah Wilson' },
        { number: 'B202', type: 'Single', occupancy: 1, maxOccupancy: 1, student: 'Lisa Brown' },
        { number: 'B203', type: 'Double', occupancy: 0, maxOccupancy: 2, student: null },
        { number: 'B204', type: 'Triple', occupancy: 2, maxOccupancy: 3, student: 'Amy & Kate' }
      ]
    }
  ];

  const approveRequest = (id: string, roomNumber: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved', allocatedRoom: roomNumber } : req
    ));
    alert(`Request approved and room ${roomNumber} allocated!`);
  };

  const rejectRequest = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
    alert('Request rejected.');
  };

  const exportOccupancyData = () => {
    alert('Hostel occupancy data exported successfully!');
  };

  const AllocationDialog = ({ request }: { request: any }) => {
    const [selectedBlock, setSelectedBlock] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    const availableRooms = hostelBlocks
      .find(block => block.block === selectedBlock)
      ?.rooms.filter(room => room.occupancy < room.maxOccupancy) || [];

    const handleAllocate = () => {
      if (!selectedRoom) {
        alert('Please select a room');
        return;
      }
      approveRequest(request.id, selectedRoom);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Student Name</p>
            <p className="font-medium">{request.studentName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Roll Number</p>
            <p className="font-medium">{request.rollNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Course</p>
            <p className="font-medium">{request.course}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Preference</p>
            <p className="font-medium">{request.preference}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Select value={selectedBlock} onValueChange={setSelectedBlock}>
            <SelectTrigger>
              <SelectValue placeholder="Select Block" />
            </SelectTrigger>
            <SelectContent>
              {hostelBlocks.map((block) => (
                <SelectItem key={block.block} value={block.block}>
                  Block {block.block} ({block.totalRooms - block.occupiedRooms} rooms available)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedBlock && (
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room.number} value={room.number}>
                    {room.number} - {room.type} ({room.maxOccupancy - room.occupancy} spaces available)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAllocate} className="flex-1 bg-green-600 hover:bg-green-700">
            Allocate Room
          </Button>
          <Button onClick={() => rejectRequest(request.id)} variant="destructive" className="flex-1">
            Reject Request
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {hostelBlocks.reduce((sum, block) => sum + block.totalRooms, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {hostelBlocks.reduce((sum, block) => sum + block.occupiedRooms, 0)}
              </p>
              <p className="text-sm text-gray-600">Occupied Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {hostelBlocks.reduce((sum, block) => sum + (block.totalRooms - block.occupiedRooms), 0)}
              </p>
              <p className="text-sm text-gray-600">Available Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((hostelBlocks.reduce((sum, block) => sum + block.occupiedRooms, 0) / hostelBlocks.reduce((sum, block) => sum + block.totalRooms, 0)) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hostel Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Hostel Allocation Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{request.studentName}</h4>
                    <p className="text-sm text-gray-600">{request.rollNo} - {request.course}</p>
                    <p className="text-xs text-gray-500">Requested: {request.requestDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      request.status === 'Approved' ? 'default' : 
                      request.status === 'Rejected' ? 'destructive' : 'secondary'
                    }>
                      {request.status}
                    </Badge>
                    {request.status === 'Pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Process Request</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Allocate Hostel Room</DialogTitle>
                          </DialogHeader>
                          <AllocationDialog request={request} />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <p><strong>Year:</strong> {request.year}</p>
                  <p><strong>Preference:</strong> {request.preference}</p>
                  {request.allocatedRoom && (
                    <p><strong>Allocated Room:</strong> {request.allocatedRoom}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hostel Occupancy Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Real-time Occupancy Dashboard
            </span>
            <Button onClick={exportOccupancyData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {hostelBlocks.map((block) => (
              <div key={block.block} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Block {block.block}</h3>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {block.floors} Floors
                    </Badge>
                    <Badge variant="default">
                      {block.occupiedRooms}/{block.totalRooms} Occupied
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {block.rooms.map((room) => (
                    <div key={room.number} className={`p-3 rounded-lg border ${
                      room.occupancy === 0 ? 'bg-green-50 border-green-200' : 
                      room.occupancy < room.maxOccupancy ? 'bg-yellow-50 border-yellow-200' : 
                      'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{room.number}</span>
                        <Bed className="h-4 w-4" />
                      </div>
                      <p className="text-xs text-gray-600">{room.type} Room</p>
                      <p className="text-xs">
                        {room.occupancy}/{room.maxOccupancy} occupied
                      </p>
                      {room.student && (
                        <p className="text-xs text-gray-500 mt-1">{room.student}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffHostel;