import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Bed } from 'lucide-react';

interface HostelRoom {
  id: string;
  roomNumber: string;
  block: string;
  capacity: number;
  occupied: number;
  students: string[];
  status: 'available' | 'full' | 'maintenance';
}

const mockHostelRooms: HostelRoom[] = [
  {
    id: '1',
    roomNumber: 'A-204',
    block: 'A',
    capacity: 2,
    occupied: 2,
    students: ['Rahul Sharma', 'Amit Kumar'],
    status: 'full'
  },
  {
    id: '2',
    roomNumber: 'B-105',
    block: 'B',
    capacity: 3,
    occupied: 1,
    students: ['Priya Patel'],
    status: 'available'
  },
  {
    id: '3',
    roomNumber: 'A-301',
    block: 'A',
    capacity: 2,
    occupied: 0,
    students: [],
    status: 'maintenance'
  },
  {
    id: '4',
    roomNumber: 'C-102',
    block: 'C',
    capacity: 4,
    occupied: 3,
    students: ['Neha Singh', 'Ravi Patel', 'Suresh Kumar'],
    status: 'available'
  }
];

export function HostelOccupancyDetails() {
  const [rooms] = useState(mockHostelRooms);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.occupied > 0).length;
  const freeRooms = rooms.filter(r => r.status === 'available' && r.occupied < r.capacity).length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const totalOccupied = rooms.reduce((sum, r) => sum + r.occupied, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalRooms}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{occupiedRooms}</p>
                <p className="text-sm text-muted-foreground">Occupied Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Bed className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{freeRooms}</p>
                <p className="text-sm text-muted-foreground">Available Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{Math.round((totalOccupied / totalCapacity) * 100)}%</p>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.id} className="border">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{room.roomNumber}</h3>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Block:</span>
                      <span className="font-medium">{room.block}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacity:</span>
                      <span className="font-medium">{room.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Occupied:</span>
                      <span className="font-medium">{room.occupied}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-green-600">{room.capacity - room.occupied}</span>
                    </div>
                  </div>

                  {room.students.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium mb-1">Students:</p>
                      <div className="space-y-1">
                        {room.students.map((student, index) => (
                          <p key={index} className="text-xs text-muted-foreground">{student}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}