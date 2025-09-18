import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Bus, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const TransportManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [students, setStudents] = useState([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [assignData, setAssignData] = useState({
    studentId: '',
    routeId: ''
  });

  useEffect(() => {
    fetchRoutes();
    fetchStudents();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/transport/routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
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

  const handleAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/transport/assign', assignData);
      toast.success('Route assigned successfully!');
      setIsAssignDialogOpen(false);
      setAssignData({ studentId: '', routeId: '' });
      fetchRoutes();
      fetchStudents();
    } catch (error) {
      toast.error('Error assigning route');
    }
  };

  const totalStudents = routes.reduce((sum: number, route: any) => sum + route.students.length, 0);
  const totalCapacity = routes.reduce((sum: number, route: any) => sum + route.capacity, 0);
  const utilizationRate = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Transport Management</CardTitle>
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Bus className="h-4 w-4 mr-2" />
                Assign Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Transport Route</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAssignment} className="space-y-4">
                <div>
                  <Select value={assignData.studentId} onValueChange={(value) => setAssignData({ ...assignData, studentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.filter((student: any) => !student.busRoute).map((student: any) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.id} - {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={assignData.routeId} onValueChange={(value) => setAssignData({ ...assignData, routeId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.filter((route: any) => route.students.length < route.capacity).map((route: any) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name} ({route.students.length}/{route.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Assign Route</Button>
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
                  <p className="text-sm text-blue-600">Total Routes</p>
                  <p className="text-2xl font-bold text-blue-700">{routes.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Students Using Transport</p>
                  <p className="text-2xl font-bold text-green-700">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Utilization Rate</p>
                  <p className="text-2xl font-bold text-purple-700">{utilizationRate}%</p>
                </div>
                <Bus className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Route Details</h3>
          {routes.map((route: any) => (
            <Card key={route.id} className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{route.name}</h4>
                    <p className="text-gray-600">Route ID: {route.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="text-xl font-bold">{route.students.length}/{route.capacity}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(route.students.length / route.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {route.students.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Assigned Students:</p>
                    <div className="flex flex-wrap gap-2">
                      {route.students.map((studentId: string) => {
                        const student = students.find((s: any) => s.id === studentId);
                        return (
                          <span 
                            key={studentId}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {student ? `${student.id} - ${student.name}` : studentId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Student Transport Status</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Assigned Route</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    {student.busRoute ? (
                      <span className="text-blue-600 font-medium">
                        {routes.find((r: any) => r.id === student.busRoute)?.name || student.busRoute}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.busRoute 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.busRoute ? 'Assigned' : 'Unassigned'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportManagement;