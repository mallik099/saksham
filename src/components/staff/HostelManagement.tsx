import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, Bed, Plus } from 'lucide-react';

interface Room {
  id: string;
  number: string;
  block: string;
  capacity: number;
  occupied: number;
  students: string[];
  status: 'available' | 'full' | 'maintenance';
}

const mockRooms: Room[] = [
  { id: '1', number: 'A-204', block: 'A', capacity: 2, occupied: 2, students: ['Rahul Sharma', 'Amit Kumar'], status: 'full' },
  { id: '2', number: 'B-105', block: 'B', capacity: 3, occupied: 1, students: ['Priya Patel'], status: 'available' },
  { id: '3', number: 'A-301', block: 'A', capacity: 2, occupied: 0, students: [], status: 'maintenance' },
];

export function HostelManagement() {
  const [rooms] = useState(mockRooms);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{rooms.length}</p>
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
                <p className="text-2xl font-bold">{rooms.filter(r => r.occupied > 0).length}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Bed className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{rooms.filter(r => r.status === 'available').length}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Room Management</CardTitle>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Allocate Room</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.id} className="border">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{room.number}</h3>
                    <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Block:</span><span>{room.block}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacity:</span><span>{room.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Occupied:</span><span>{room.occupied}</span>
                    </div>
                  </div>
                  {room.students.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium mb-1">Students:</p>
                      {room.students.map((student, index) => (
                        <p key={index} className="text-xs text-muted-foreground">{student}</p>
                      ))}
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