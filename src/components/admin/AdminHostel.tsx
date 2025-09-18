import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Building, Users, Bed, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminHostel = () => {
  const hostelData = [
    { block: 'Block A', occupied: 45, total: 60, available: 15 },
    { block: 'Block B', occupied: 65, total: 80, available: 15 },
    { block: 'Block C', occupied: 38, total: 50, available: 12 }
  ];

  const rooms = [
    { number: 'A101', type: 'Single', occupant: 'John Doe', status: 'Occupied' },
    { number: 'A102', type: 'Double', occupant: 'Jane & Sarah', status: 'Occupied' },
    { number: 'A103', type: 'Single', occupant: null, status: 'Vacant' },
    { number: 'B201', type: 'Triple', occupant: 'Mike, Tom & Alex', status: 'Occupied' }
  ];

  const totalRooms = hostelData.reduce((sum, block) => sum + block.total, 0);
  const occupiedRooms = hostelData.reduce((sum, block) => sum + block.occupied, 0);
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hostel Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{totalRooms}</p>
            <p className="text-sm text-gray-600">Total Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{occupiedRooms}</p>
            <p className="text-sm text-gray-600">Occupied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{totalRooms - occupiedRooms}</p>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{occupancyRate}%</p>
            <p className="text-sm text-gray-600">Occupancy Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Block-wise Occupancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hostelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="block" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupied" fill="#3b82f6" name="Occupied" />
              <Bar dataKey="available" fill="#e5e7eb" name="Available" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Hostel Blocks Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostelData.map((block, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{block.block}</h4>
                    <Badge variant="secondary">
                      {Math.round((block.occupied / block.total) * 100)}% occupied
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-blue-600">{block.total}</p>
                      <p className="text-gray-600">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-green-600">{block.occupied}</p>
                      <p className="text-gray-600">Occupied</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-orange-600">{block.available}</p>
                      <p className="text-gray-600">Available</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rooms.map((room, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  room.status === 'Occupied' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{room.number}</p>
                      <p className="text-sm text-gray-600">{room.type} Room</p>
                      {room.occupant && (
                        <p className="text-sm text-gray-600">{room.occupant}</p>
                      )}
                    </div>
                    <Badge variant={room.status === 'Occupied' ? 'destructive' : 'default'}>
                      {room.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHostel;