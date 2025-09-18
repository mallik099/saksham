import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Building, Users, Bed, Download, Check, X, Plus, AlertTriangle,
  Wifi, Utensils, Car, Shield, Thermometer, Droplets, Zap, Phone,
  Mail, Calendar, Clock, TrendingUp, BarChart3, Settings, Bell,
  FileText, Camera, MapPin, Star, Activity, Wrench, DollarSign
} from 'lucide-react';

const EnhancedHostelManagement = () => {
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');

  const [hostelBlocks, setHostelBlocks] = useState([
    {
      id: 'BLK-A',
      name: 'Block A - Engineering Wing',
      floors: 4,
      totalRooms: 80,
      occupiedRooms: 68,
      capacity: 240,
      currentOccupancy: 195,
      warden: 'Dr. Rajesh Sharma',
      wardenPhone: '+91 9876543301',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Gym', 'Study Hall'],
      monthlyFee: 8000,
      securityDeposit: 15000,
      rooms: [
        { number: 'A101', type: 'Triple', floor: 1, occupancy: 3, maxOccupancy: 3, students: ['John Doe', 'Mike Wilson', 'Sam Brown'], fee: 8000, status: 'Occupied' },
        { number: 'A102', type: 'Double', floor: 1, occupancy: 2, maxOccupancy: 2, students: ['Sarah Davis', 'Emma Johnson'], fee: 10000, status: 'Occupied' },
        { number: 'A103', type: 'Single', floor: 1, occupancy: 0, maxOccupancy: 1, students: [], fee: 15000, status: 'Available' },
        { number: 'A201', type: 'Triple', floor: 2, occupancy: 2, maxOccupancy: 3, students: ['Alex Smith', 'Ryan Miller'], fee: 8000, status: 'Partially Occupied' }
      ]
    },
    {
      id: 'BLK-B',
      name: 'Block B - Science Wing',
      floors: 5,
      totalRooms: 100,
      occupiedRooms: 85,
      capacity: 300,
      currentOccupancy: 245,
      warden: 'Prof. Meera Patel',
      wardenPhone: '+91 9876543302',
      facilities: ['WiFi', 'Mess', 'Library', 'Recreation Room', 'Medical Room'],
      monthlyFee: 7500,
      securityDeposit: 12000,
      rooms: [
        { number: 'B101', type: 'Double', floor: 1, occupancy: 2, maxOccupancy: 2, students: ['Lisa Wilson', 'Kate Brown'], fee: 9000, status: 'Occupied' },
        { number: 'B102', type: 'Triple', floor: 1, occupancy: 3, maxOccupancy: 3, students: ['Tom Davis', 'Jack Miller', 'Ben Johnson'], fee: 7500, status: 'Occupied' },
        { number: 'B103', type: 'Single', floor: 1, occupancy: 1, maxOccupancy: 1, students: ['Amy Smith'], fee: 12000, status: 'Occupied' }
      ]
    },
    {
      id: 'BLK-C',
      name: 'Block C - Premium Suites',
      floors: 3,
      totalRooms: 45,
      occupiedRooms: 42,
      capacity: 90,
      currentOccupancy: 84,
      warden: 'Dr. Anita Gupta',
      wardenPhone: '+91 9876543303',
      facilities: ['WiFi', 'AC', 'Attached Bathroom', 'Mini Fridge', 'Study Table'],
      monthlyFee: 18000,
      securityDeposit: 25000,
      rooms: [
        { number: 'C101', type: 'Premium Single', floor: 1, occupancy: 1, maxOccupancy: 1, students: ['Priya Sharma'], fee: 18000, status: 'Occupied' },
        { number: 'C102', type: 'Premium Double', floor: 1, occupancy: 2, maxOccupancy: 2, students: ['Rahul Gupta', 'Arjun Patel'], fee: 15000, status: 'Occupied' }
      ]
    }
  ]);

  const [hostelRequests, setHostelRequests] = useState([
    { 
      id: 'REQ001', 
      studentName: 'Alex Johnson', 
      rollNo: 'CS21007', 
      course: 'Computer Science',
      year: '3rd Year',
      gender: 'Male',
      requestDate: '2024-03-01', 
      status: 'Pending', 
      preference: 'Single Room',
      budget: 15000,
      specialRequirements: 'Ground floor preferred',
      parentContact: '+91 9876543401',
      studentPhone: '+91 9876543501',
      email: 'alex.johnson@college.edu',
      address: 'Bangalore, Karnataka',
      emergencyContact: '+91 9876543601'
    },
    { 
      id: 'REQ002', 
      studentName: 'Emma Wilson', 
      rollNo: 'EC21008', 
      course: 'Electronics',
      year: '2nd Year',
      gender: 'Female',
      requestDate: '2024-03-02', 
      status: 'Pending', 
      preference: 'Double Sharing',
      budget: 10000,
      specialRequirements: 'Vegetarian mess',
      parentContact: '+91 9876543402',
      studentPhone: '+91 9876543502',
      email: 'emma.wilson@college.edu',
      address: 'Chennai, Tamil Nadu',
      emergencyContact: '+91 9876543602'
    }
  ]);

  const [complaints, setComplaints] = useState([
    { 
      id: 'CMP001', 
      studentName: 'John Doe', 
      rollNo: 'CS21001',
      room: 'A101', 
      block: 'Block A',
      complaint: 'AC not working properly', 
      category: 'Maintenance',
      priority: 'High',
      status: 'In Progress', 
      reportedDate: '2024-03-01',
      assignedTo: 'Maintenance Team A',
      estimatedResolution: '2024-03-03',
      description: 'Air conditioning unit making noise and not cooling effectively'
    },
    { 
      id: 'CMP002', 
      studentName: 'Sarah Davis', 
      rollNo: 'CS21002',
      room: 'A102', 
      block: 'Block A',
      complaint: 'Water leakage in bathroom', 
      category: 'Plumbing',
      priority: 'Medium',
      status: 'Resolved', 
      reportedDate: '2024-02-28',
      assignedTo: 'Plumbing Team',
      estimatedResolution: '2024-03-01',
      description: 'Continuous water dripping from bathroom tap'
    },
    { 
      id: 'CMP003', 
      studentName: 'Mike Wilson', 
      rollNo: 'CS21003',
      room: 'A101', 
      block: 'Block A',
      complaint: 'WiFi connectivity issues', 
      category: 'Network',
      priority: 'Low',
      status: 'Pending', 
      reportedDate: '2024-03-02',
      assignedTo: 'IT Support',
      estimatedResolution: '2024-03-04',
      description: 'Intermittent WiFi connection in room'
    }
  ]);

  const [visitors, setVisitors] = useState([
    { id: 'VIS001', visitorName: 'Mr. Rajesh Doe', studentName: 'John Doe', room: 'A101', purpose: 'Parent Visit', checkIn: '2024-03-01 10:00 AM', checkOut: '2024-03-01 6:00 PM', status: 'Checked Out' },
    { id: 'VIS002', visitorName: 'Mrs. Priya Wilson', studentName: 'Mike Wilson', room: 'A101', purpose: 'Family Visit', checkIn: '2024-03-01 2:00 PM', checkOut: null, status: 'Checked In' }
  ]);

  const [messMenu, setMessMenu] = useState([
    { day: 'Monday', breakfast: 'Idli, Sambar, Chutney, Tea', lunch: 'Rice, Dal, Sabji, Roti, Curd', dinner: 'Chapati, Paneer Curry, Rice, Dal' },
    { day: 'Tuesday', breakfast: 'Poha, Tea, Banana', lunch: 'Rice, Rajma, Aloo Sabji, Roti', dinner: 'Rice, Fish Curry, Dal, Papad' },
    { day: 'Wednesday', breakfast: 'Upma, Coconut Chutney, Coffee', lunch: 'Biryani, Raita, Pickle', dinner: 'Roti, Mixed Veg, Rice, Dal' }
  ]);

  const approveRequest = (id: string, roomNumber: string) => {
    setHostelRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved', allocatedRoom: roomNumber } : req
    ));
    alert(`Request approved! Room ${roomNumber} allocated successfully.`);
  };

  const rejectRequest = (id: string, reason: string) => {
    setHostelRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected', rejectionReason: reason } : req
    ));
    alert('Request rejected with notification sent to student.');
  };

  const updateComplaintStatus = (id: string, status: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id ? { ...complaint, status } : complaint
    ));
    alert(`Complaint status updated to ${status}!`);
  };

  const generateOccupancyReport = () => {
    const totalCapacity = hostelBlocks.reduce((sum, block) => sum + block.capacity, 0);
    const totalOccupancy = hostelBlocks.reduce((sum, block) => sum + block.currentOccupancy, 0);
    const occupancyRate = Math.round((totalOccupancy / totalCapacity) * 100);
    const totalRevenue = hostelBlocks.reduce((sum, block) => sum + (block.currentOccupancy * block.monthlyFee), 0);
    
    alert(`Hostel Occupancy Report:\n\nTotal Capacity: ${totalCapacity}\nCurrent Occupancy: ${totalOccupancy}\nOccupancy Rate: ${occupancyRate}%\nMonthly Revenue: ₹${totalRevenue.toLocaleString()}\nPending Requests: ${hostelRequests.filter(r => r.status === 'Pending').length}`);
  };

  const filteredBlocks = selectedBlock === 'all' ? hostelBlocks : hostelBlocks.filter(block => block.id === selectedBlock);

  return (
    <div className="space-y-6">
      {/* Enhanced Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Rooms</p>
                <p className="text-2xl font-bold text-blue-900">
                  {hostelBlocks.reduce((sum, block) => sum + block.totalRooms, 0)}
                </p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Occupied</p>
                <p className="text-2xl font-bold text-green-900">
                  {hostelBlocks.reduce((sum, block) => sum + block.occupiedRooms, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Occupancy Rate</p>
                <p className="text-2xl font-bold text-purple-900">
                  {Math.round((hostelBlocks.reduce((sum, block) => sum + block.currentOccupancy, 0) / hostelBlocks.reduce((sum, block) => sum + block.capacity, 0)) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Monthly Revenue</p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹{Math.round(hostelBlocks.reduce((sum, block) => sum + (block.currentOccupancy * block.monthlyFee), 0) / 100000) / 10}L
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Active Complaints</p>
                <p className="text-2xl font-bold text-red-900">
                  {complaints.filter(c => c.status !== 'Resolved').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="mess">Mess</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Hostel Blocks Overview
                </span>
                <div className="flex gap-2">
                  <Select value={selectedBlock} onValueChange={setSelectedBlock}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blocks</SelectItem>
                      {hostelBlocks.map((block) => (
                        <SelectItem key={block.id} value={block.id}>{block.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={generateOccupancyReport}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredBlocks.map((block) => (
                  <div key={block.id} className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{block.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Warden: {block.warden}</span>
                          <span>📞 {block.wardenPhone}</span>
                          <Badge variant="outline">{block.floors} Floors</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((block.currentOccupancy / block.capacity) * 100)}%
                        </div>
                        <p className="text-sm text-gray-600">Occupancy Rate</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-blue-600">{block.totalRooms}</p>
                        <p className="text-xs text-gray-600">Total Rooms</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-600">{block.occupiedRooms}</p>
                        <p className="text-xs text-gray-600">Occupied</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-orange-600">{block.currentOccupancy}</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-purple-600">₹{block.monthlyFee.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Monthly Fee</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg text-center">
                        <p className="text-lg font-bold text-yellow-600">₹{Math.round((block.currentOccupancy * block.monthlyFee) / 100000) / 10}L</p>
                        <p className="text-xs text-gray-600">Revenue</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Facilities Available
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {block.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {facility === 'WiFi' && <Wifi className="h-3 w-3" />}
                            {facility === 'Mess' && <Utensils className="h-3 w-3" />}
                            {facility === 'Gym' && <Activity className="h-3 w-3" />}
                            {facility === 'Laundry' && <Droplets className="h-3 w-3" />}
                            {facility === 'AC' && <Thermometer className="h-3 w-3" />}
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                      {block.rooms.slice(0, 4).map((room) => (
                        <div key={room.number} className={`p-4 rounded-lg border-2 ${
                          room.status === 'Available' ? 'border-green-200 bg-green-50' : 
                          room.status === 'Partially Occupied' ? 'border-yellow-200 bg-yellow-50' : 
                          'border-red-200 bg-red-50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-lg">{room.number}</span>
                            <Bed className="h-5 w-5" />
                          </div>
                          <div className="space-y-1 text-sm">
                            <p><strong>Type:</strong> {room.type}</p>
                            <p><strong>Floor:</strong> {room.floor}</p>
                            <p><strong>Occupancy:</strong> {room.occupancy}/{room.maxOccupancy}</p>
                            <p><strong>Fee:</strong> ₹{room.fee.toLocaleString()}</p>
                          </div>
                          {room.students.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium">Students:</p>
                              {room.students.map((student, idx) => (
                                <p key={idx} className="text-xs text-gray-600">{student}</p>
                              ))}
                            </div>
                          )}
                          <Badge 
                            variant={
                              room.status === 'Available' ? 'default' : 
                              room.status === 'Partially Occupied' ? 'secondary' : 'destructive'
                            }
                            className="mt-2 text-xs"
                          >
                            {room.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Hostel Allocation Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {hostelRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold">{request.studentName}</h4>
                          <Badge variant="outline">{request.course}</Badge>
                          <Badge variant="secondary">{request.gender}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Roll No:</strong> {request.rollNo}</p>
                            <p><strong>Year:</strong> {request.year}</p>
                            <p><strong>Request Date:</strong> {request.requestDate}</p>
                          </div>
                          <div>
                            <p><strong>Preference:</strong> {request.preference}</p>
                            <p><strong>Budget:</strong> ₹{request.budget.toLocaleString()}</p>
                            <p><strong>Special Req:</strong> {request.specialRequirements}</p>
                          </div>
                          <div>
                            <p><strong>Student:</strong> {request.studentPhone}</p>
                            <p><strong>Parent:</strong> {request.parentContact}</p>
                            <p><strong>Emergency:</strong> {request.emergencyContact}</p>
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        request.status === 'Approved' ? 'default' : 
                        request.status === 'Rejected' ? 'destructive' : 'secondary'
                      }>
                        {request.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📧 {request.email}</span>
                        <span>📍 {request.address}</span>
                      </div>
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Allocate Room to {request.studentName}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p>Select available room for allocation:</p>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Room" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="A103">A103 - Single Room (₹15,000)</SelectItem>
                                    <SelectItem value="B201">B201 - Double Room (₹10,000)</SelectItem>
                                    <SelectItem value="C102">C102 - Premium Double (₹15,000)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button onClick={() => approveRequest(request.id, 'A103')} className="w-full">
                                  Confirm Allocation
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="destructive" onClick={() => rejectRequest(request.id, 'No rooms available')}>
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Complaint Management
                </span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Complaint
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className={`border rounded-lg p-6 ${
                    complaint.status === 'Pending' ? 'border-red-200 bg-red-50' : 
                    complaint.status === 'In Progress' ? 'border-yellow-200 bg-yellow-50' : 
                    'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold">{complaint.studentName}</h4>
                          <Badge variant="outline">{complaint.room}</Badge>
                          <Badge variant={
                            complaint.priority === 'High' ? 'destructive' : 
                            complaint.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {complaint.priority} Priority
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Roll No:</strong> {complaint.rollNo}</p>
                            <p><strong>Block:</strong> {complaint.block}</p>
                            <p><strong>Category:</strong> {complaint.category}</p>
                          </div>
                          <div>
                            <p><strong>Reported:</strong> {complaint.reportedDate}</p>
                            <p><strong>Assigned To:</strong> {complaint.assignedTo}</p>
                            <p><strong>ETA:</strong> {complaint.estimatedResolution}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p><strong>Issue:</strong> {complaint.complaint}</p>
                          <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                        </div>
                      </div>
                      <Badge variant={
                        complaint.status === 'Resolved' ? 'default' : 
                        complaint.status === 'In Progress' ? 'secondary' : 'destructive'
                      }>
                        {complaint.status}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      {complaint.status === 'Pending' && (
                        <Button size="sm" onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}>
                          Start Work
                        </Button>
                      )}
                      {complaint.status === 'In Progress' && (
                        <Button size="sm" onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}>
                          Mark Resolved
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact Student
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" />
                        Add Photo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Visitor Management
                </span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Visitor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitors.map((visitor) => (
                  <div key={visitor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{visitor.visitorName}</h4>
                        <p className="text-sm text-gray-600">Visiting: {visitor.studentName} ({visitor.room})</p>
                        <p className="text-sm text-gray-600">Purpose: {visitor.purpose}</p>
                      </div>
                      <Badge variant={visitor.status === 'Checked In' ? 'default' : 'secondary'}>
                        {visitor.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Check-in: {visitor.checkIn}</span>
                      {visitor.checkOut && <span>Check-out: {visitor.checkOut}</span>}
                    </div>
                    {visitor.status === 'Checked In' && (
                      <Button size="sm" className="mt-2">Check Out</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Facilities & Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Common Facilities Status</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'WiFi Network', status: 'Active', usage: '95%', icon: Wifi },
                      { name: 'Laundry Service', status: 'Active', usage: '78%', icon: Droplets },
                      { name: 'Gymnasium', status: 'Active', usage: '65%', icon: Activity },
                      { name: 'Study Hall', status: 'Maintenance', usage: '0%', icon: BookOpen },
                      { name: 'Recreation Room', status: 'Active', usage: '82%', icon: Star }
                    ].map((facility, index) => {
                      const Icon = facility.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{facility.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">{facility.usage}</span>
                            <Badge variant={facility.status === 'Active' ? 'default' : 'destructive'}>
                              {facility.status}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance Schedule</h4>
                  <div className="space-y-3">
                    {[
                      { task: 'AC Servicing - Block A', date: '2024-03-05', status: 'Scheduled' },
                      { task: 'Plumbing Check - Block B', date: '2024-03-07', status: 'In Progress' },
                      { task: 'WiFi Router Replacement', date: '2024-03-10', status: 'Pending' },
                      { task: 'Gym Equipment Maintenance', date: '2024-03-12', status: 'Scheduled' }
                    ].map((task, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{task.task}</span>
                          <Badge variant={
                            task.status === 'Scheduled' ? 'default' : 
                            task.status === 'In Progress' ? 'secondary' : 'outline'
                          }>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Date: {task.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mess" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Mess Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Weekly Menu</h4>
                  <div className="space-y-3">
                    {messMenu.map((menu, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h5 className="font-bold text-lg mb-2">{menu.day}</h5>
                        <div className="space-y-2 text-sm">
                          <p><strong>Breakfast:</strong> {menu.breakfast}</p>
                          <p><strong>Lunch:</strong> {menu.lunch}</p>
                          <p><strong>Dinner:</strong> {menu.dinner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Mess Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">485</p>
                      <p className="text-sm text-gray-600">Daily Meals Served</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">₹85</p>
                      <p className="text-sm text-gray-600">Cost per Meal</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">4.2</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">12</p>
                      <p className="text-sm text-gray-600">Special Diets</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium">Recent Feedback</h5>
                    {[
                      { student: 'John Doe', rating: 4, comment: 'Good variety in lunch menu' },
                      { student: 'Sarah Wilson', rating: 5, comment: 'Excellent breakfast quality' },
                      { student: 'Mike Johnson', rating: 3, comment: 'Dinner could be improved' }
                    ].map((feedback, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{feedback.student}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Reports & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Standard Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Occupancy Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Fee Collection Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Complaint Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Visitor Log Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Maintenance Report
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">94%</p>
                      <p className="text-sm text-gray-600">Satisfaction Rate</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">₹28L</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">2.3</p>
                      <p className="text-sm text-gray-600">Avg Resolution Days</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">87%</p>
                      <p className="text-sm text-gray-600">Occupancy Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedHostelManagement;