import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Bus, Users, MapPin, Download, Plus } from 'lucide-react';

const StaffTransport = () => {
  const busRoutes = [
    {
      id: 'RT001',
      routeName: 'Route 1 - City Center',
      driver: 'Rajesh Kumar',
      busNumber: 'KA-01-AB-1234',
      capacity: 50,
      currentOccupancy: 35,
      stops: ['City Center', 'Mall Road', 'Railway Station', 'College'],
      fee: 2000,
      students: [
        { rollNo: 'CS21001', name: 'John Doe', stop: 'City Center', feeStatus: 'Paid' },
        { rollNo: 'CS21002', name: 'Jane Smith', stop: 'Mall Road', feeStatus: 'Pending' },
        { rollNo: 'EC21003', name: 'Mike Johnson', stop: 'Railway Station', feeStatus: 'Paid' }
      ]
    },
    {
      id: 'RT002',
      routeName: 'Route 2 - Suburb Area',
      driver: 'Suresh Patel',
      busNumber: 'KA-01-CD-5678',
      capacity: 45,
      currentOccupancy: 28,
      stops: ['Suburb Area', 'Market Square', 'Bus Stand', 'College'],
      fee: 1800,
      students: [
        { rollNo: 'ME21004', name: 'Sarah Wilson', stop: 'Suburb Area', feeStatus: 'Paid' },
        { rollNo: 'CS21005', name: 'David Brown', stop: 'Market Square', feeStatus: 'Paid' }
      ]
    },
    {
      id: 'RT003',
      routeName: 'Route 3 - Industrial Area',
      driver: 'Amit Singh',
      busNumber: 'KA-01-EF-9012',
      capacity: 40,
      currentOccupancy: 22,
      stops: ['Industrial Area', 'Tech Park', 'Hospital', 'College'],
      fee: 2200,
      students: [
        { rollNo: 'EC21006', name: 'Lisa Davis', stop: 'Industrial Area', feeStatus: 'Pending' },
        { rollNo: 'ME21007', name: 'Tom Wilson', stop: 'Tech Park', feeStatus: 'Paid' }
      ]
    }
  ];

  const [routes, setRoutes] = useState(busRoutes);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const unassignedStudents = [
    { rollNo: 'CS21008', name: 'Alex Johnson', course: 'Computer Science' },
    { rollNo: 'EC21009', name: 'Emma Wilson', course: 'Electronics' },
    { rollNo: 'ME21010', name: 'Ryan Davis', course: 'Mechanical' }
  ];

  const assignStudentToRoute = () => {
    if (!selectedRoute || !selectedStudent) {
      alert('Please select both route and student');
      return;
    }

    const student = unassignedStudents.find(s => s.rollNo === selectedStudent);
    if (!student) return;

    setRoutes(prev => prev.map(route => 
      route.id === selectedRoute 
        ? {
            ...route,
            currentOccupancy: route.currentOccupancy + 1,
            students: [...route.students, {
              rollNo: student.rollNo,
              name: student.name,
              stop: route.stops[0],
              feeStatus: 'Pending'
            }]
          }
        : route
    ));

    alert(`${student.name} assigned to ${routes.find(r => r.id === selectedRoute)?.routeName}`);
    setSelectedRoute('');
    setSelectedStudent('');
  };

  const generateTransportReport = () => {
    alert('Transport fee collection report generated!');
  };

  const AssignStudentDialog = () => (
    <div className="space-y-4">
      <Select value={selectedRoute} onValueChange={setSelectedRoute}>
        <SelectTrigger>
          <SelectValue placeholder="Select Route" />
        </SelectTrigger>
        <SelectContent>
          {routes.map((route) => (
            <SelectItem key={route.id} value={route.id}>
              {route.routeName} ({route.capacity - route.currentOccupancy} seats available)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStudent} onValueChange={setSelectedStudent}>
        <SelectTrigger>
          <SelectValue placeholder="Select Student" />
        </SelectTrigger>
        <SelectContent>
          {unassignedStudents.map((student) => (
            <SelectItem key={student.rollNo} value={student.rollNo}>
              {student.rollNo} - {student.name} ({student.course})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={assignStudentToRoute} className="w-full">
        Assign to Route
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{routes.length}</p>
              <p className="text-sm text-gray-600">Active Routes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {routes.reduce((sum, route) => sum + route.currentOccupancy, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {routes.reduce((sum, route) => sum + route.capacity, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Capacity</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ₹{routes.reduce((sum, route) => sum + (route.fee * route.currentOccupancy), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bus Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Bus Routes Management
            </span>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Assign Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Student to Route</DialogTitle>
                  </DialogHeader>
                  <AssignStudentDialog />
                </DialogContent>
              </Dialog>
              <Button onClick={generateTransportReport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {routes.map((route) => (
              <div key={route.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{route.routeName}</h3>
                    <p className="text-sm text-gray-600">Driver: {route.driver}</p>
                    <p className="text-sm text-gray-600">Bus: {route.busNumber}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {route.currentOccupancy}/{route.capacity} seats
                    </Badge>
                    <p className="text-sm text-gray-600">Monthly Fee: ₹{route.fee}</p>
                  </div>
                </div>

                {/* Route Stops */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Route Stops
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="flex items-center">
                        <Badge variant="outline">{stop}</Badge>
                        {index < route.stops.length - 1 && (
                          <span className="mx-2 text-gray-400">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assigned Students */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Assigned Students ({route.students.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {route.students.map((student, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.rollNo}</p>
                        <p className="text-xs text-gray-500">Stop: {student.stop}</p>
                        <Badge 
                          variant={student.feeStatus === 'Paid' ? 'default' : 'destructive'}
                          className="mt-1 text-xs"
                        >
                          {student.feeStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Route Statistics */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <p className="text-lg font-bold text-blue-600">
                      {Math.round((route.currentOccupancy / route.capacity) * 100)}%
                    </p>
                    <p className="text-xs text-gray-600">Occupancy Rate</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <p className="text-lg font-bold text-green-600">
                      {route.students.filter(s => s.feeStatus === 'Paid').length}
                    </p>
                    <p className="text-xs text-gray-600">Fees Paid</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded">
                    <p className="text-lg font-bold text-orange-600">
                      ₹{(route.fee * route.currentOccupancy).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Monthly Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unassigned Students */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Unassigned Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unassignedStudents.map((student) => (
              <div key={student.rollNo} className="p-4 border rounded-lg">
                <h4 className="font-medium">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.rollNo}</p>
                <p className="text-sm text-gray-600">{student.course}</p>
                <Badge variant="secondary" className="mt-2">Unassigned</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTransport;