import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Home, Users, Bed } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const HostelManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [isAllocationDialogOpen, setIsAllocationDialogOpen] = useState(false);
  const [allocationData, setAllocationData] = useState({
    studentId: '',
    roomNumber: ''
  });

  useEffect(() => {
    fetchRooms();
    fetchStudents();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/hostel/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAllocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/hostel/allocate', allocationData);
      toast.success('Room allocated successfully!');
      setIsAllocationDialogOpen(false);
      setAllocationData({ studentId: '', roomNumber: '' });
      fetchRooms();
    } catch (error) {
      toast.error('Error allocating room');
    }
  };

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((room: any) => room.occupied > 0).length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Hostel Management</CardTitle>
          <Dialog open={isAllocationDialogOpen} onOpenChange={setIsAllocationDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Bed className="h-4 w-4 mr-2" />
                Allocate Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Allocate Room</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAllocation} className="space-y-4">
                <div>
                  <Select value={allocationData.studentId} onValueChange={(value) => setAllocationData({ ...allocationData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.filter((student: any) => !student.hostelRoom).map((student: any) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.id} - {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={allocationData.roomNumber} onValueChange={(value) => setAllocationData({ ...allocationData, roomNumber: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.filter((room: any) => room.occupied < room.capacity).map((room: any) => (
                        <SelectItem key={room.roomNumber} value={room.roomNumber}>
                          {room.roomNumber} - Block {room.block} ({room.occupied}/{room.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Allocate Room</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Rooms</p>
                  <p className="text-2xl font-bold text-blue-700">{totalRooms}</p>
                </div>
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Occupied</p>
                  <p className="text-2xl font-bold text-green-700">{occupiedRooms}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-purple-700">{occupancyRate}%</p>
                </div>
                <Bed className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Occupied</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room: any) => (
              <TableRow key={room.roomNumber}>
                <TableCell className="font-medium">{room.roomNumber}</TableCell>
                <TableCell>{room.block}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.occupied}</TableCell>
                <TableCell>{room.capacity - room.occupied}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.occupied === room.capacity 
                      ? 'bg-red-100 text-red-800' 
                      : room.occupied > 0 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {room.occupied === room.capacity ? 'Full' : room.occupied > 0 ? 'Partial' : 'Available'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HostelManagement;