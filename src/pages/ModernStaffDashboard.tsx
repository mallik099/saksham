import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Home, ClipboardList, Calendar, Settings, LogOut, Bell, 
  DollarSign, Building, BookOpen, MessageSquare, FileText, Clock, 
  Users, CheckCircle, AlertCircle, Download, Upload, Phone, Mail, Bus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const ModernStaffDashboard = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const staffInfo = {
    name: 'Suresh Gupta',
    employeeId: 'STAFF001',
    department: 'Administration',
    designation: 'Administrative Officer',
    role: 'admin', // accounts, hostel, library, transport, admin
    phone: '+91 9876543210',
    email: 'suresh.gupta@saksham.edu',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    permissions: ['fee_management', 'hostel_management', 'library_management', 'transport_management'],
    joinDate: '2020-08-15',
    experience: '8 years',
    qualification: 'MBA in Administration'
  };

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'tasks', label: 'Task Management', icon: ClipboardList },
      { id: 'attendance', label: 'Attendance', icon: Clock },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const roleSpecificItems = [];
    if (staffInfo.role === 'accounts') {
      roleSpecificItems.push({ id: 'finance', label: 'Fee Management', icon: DollarSign });
    }
    if (staffInfo.role === 'hostel') {
      roleSpecificItems.push({ id: 'hostel', label: 'Hostel Management', icon: Building });
    }
    if (staffInfo.role === 'library') {
      roleSpecificItems.push({ id: 'library', label: 'Library Management', icon: BookOpen });
    }
    if (staffInfo.role === 'transport') {
      roleSpecificItems.push({ id: 'transport', label: 'Transport Management', icon: Bus });
    }
    // Add all modules for admin staff
    if (staffInfo.role === 'admin') {
      roleSpecificItems.push(
        { id: 'finance', label: 'Fee Management', icon: DollarSign },
        { id: 'hostel', label: 'Hostel Management', icon: Building },
        { id: 'library', label: 'Library Management', icon: BookOpen },
        { id: 'transport', label: 'Transport Management', icon: Bus }
      );
    }

    return [...baseItems.slice(0, 4), ...roleSpecificItems, ...baseItems.slice(4)];
  };

  const todayTasks = [
    { task: 'Process fee receipts', assignedBy: 'Admin', deadline: 'Today 5 PM', status: 'pending', priority: 'high' },
    { task: 'Update student records', assignedBy: 'Principal', deadline: 'Tomorrow', status: 'in-progress', priority: 'medium' },
    { task: 'Prepare monthly report', assignedBy: 'HOD', deadline: '3 days', status: 'pending', priority: 'low' }
  ];

  const recentNotifications = [
    { title: 'New Circular: Holiday Notice', time: '2 hours ago', type: 'info' },
    { title: 'Fee Collection Target Updated', time: '5 hours ago', type: 'important' },
    { title: 'Staff Meeting Tomorrow', time: '1 day ago', type: 'reminder' }
  ];

  const ProfileSection = () => (
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
                <Button size="sm" variant="outline">Change Photo</Button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-gray-900">{staffInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="text-gray-900">{staffInfo.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p className="text-gray-900">{staffInfo.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Designation</label>
                  <p className="text-gray-900">{staffInfo.designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <p className="text-gray-900">{staffInfo.experience}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Qualification</label>
                  <p className="text-gray-900">{staffInfo.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Join Date</label>
                  <p className="text-gray-900">{staffInfo.joinDate}</p>
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
                <label className="text-sm font-medium">Phone</label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900">{staffInfo.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-900">{staffInfo.email}</p>
                </div>
              </div>
              <Button className="w-full">Update Profile</Button>
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
            {['Appointment Letter', 'Experience Certificate', 'ID Card'].map((doc, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{doc}</span>
                  <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TaskManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Task Management</h3>
        <Button className="bg-[#b1f2ff] text-black hover:bg-[#9ee8f5]">
          Add Progress Update
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Task</th>
                  <th className="text-left p-2">Assigned By</th>
                  <th className="text-left p-2">Deadline</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todayTasks.map((task, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{task.task}</td>
                    <td className="p-2">{task.assignedBy}</td>
                    <td className="p-2">{task.deadline}</td>
                    <td className="p-2">
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">
                        {task.status === 'completed' ? 'View' : 'Mark Complete'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AttendanceSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Attendance Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Check-in Time</p>
                  <p className="text-sm text-gray-600">9:15 AM</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Check Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <select className="w-full p-2 border rounded">
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Textarea placeholder="Enter reason for leave" />
              </div>
              <Button className="w-full">Apply Leave</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">22</p>
              <p className="text-sm text-gray-600">Present Days</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-gray-600">Absent Days</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">1</p>
              <p className="text-sm text-gray-600">Late Arrivals</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-600">Leave Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TransportManagement = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Transport Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">Active Routes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">163</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">₹3.2L</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 text-left flex-col items-start">
              <span className="font-medium">Assign Student to Route</span>
              <span className="text-sm text-gray-600">Allocate transport facility</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Track Bus Location</span>
              <span className="text-sm text-gray-600">Real-time GPS tracking</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Generate Route Report</span>
              <span className="text-sm text-gray-600">Fee collection & occupancy</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Maintenance Schedule</span>
              <span className="text-sm text-gray-600">Bus maintenance tracking</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const FinanceManagement = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Fee Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Student Roll Number</label>
                <Input placeholder="Enter roll number" />
              </div>
              <Button className="w-full">Fetch Fee Details</Button>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Fee Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tuition Fee:</span>
                    <span>₹25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab Fee:</span>
                    <span>₹5,000</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>₹30,000</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <select className="w-full p-2 border rounded">
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                </select>
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Record Payment & Generate Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Today's Collection</h4>
                <p className="text-2xl font-bold text-blue-600">₹1,25,000</p>
                <p className="text-sm text-gray-600">45 payments received</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Daily Collection Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Outstanding Fee Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Monthly Collection Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const HostelManagement = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Hostel Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">225</p>
              <p className="text-sm text-gray-600">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">195</p>
              <p className="text-sm text-gray-600">Occupied</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">87%</p>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">₹28L</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 text-left flex-col items-start">
              <span className="font-medium">Process Room Requests</span>
              <span className="text-sm text-gray-600">5 pending allocations</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Manage Complaints</span>
              <span className="text-sm text-gray-600">3 active complaints</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Visitor Management</span>
              <span className="text-sm text-gray-600">Check-in/out visitors</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Facility Maintenance</span>
              <span className="text-sm text-gray-600">Schedule & track repairs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LibraryManagement = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Library Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2,850</p>
              <p className="text-sm text-gray-600">Total Books</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">1,420</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">285</p>
              <p className="text-sm text-gray-600">Issued</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 text-left flex-col items-start">
              <span className="font-medium">Issue/Return Books</span>
              <span className="text-sm text-gray-600">Process book transactions</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Manage Requests</span>
              <span className="text-sm text-gray-600">8 pending book requests</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Digital Resources</span>
              <span className="text-sm text-gray-600">Manage subscriptions</span>
            </Button>
            <Button className="h-16 text-left flex-col items-start" variant="outline">
              <span className="font-medium">Generate Reports</span>
              <span className="text-sm text-gray-600">Usage & analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Notifications & Communication</h3>
        <Button className="bg-[#b1f2ff] text-black hover:bg-[#9ee8f5]">
          Send Announcement
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.time}</p>
                    </div>
                    <Badge variant={notification.type === 'important' ? 'destructive' : 'secondary'}>
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Internal Messaging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Send to</label>
                <select className="w-full p-2 border rounded">
                  <option>Admin</option>
                  <option>Principal</option>
                  <option>HOD</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter subject" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Enter your message" />
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'tasks': return <TaskManagement />;
      case 'attendance': return <AttendanceSection />;
      case 'finance': return <FinanceManagement />;
      case 'hostel': return <HostelManagement />;
      case 'library': return <LibraryManagement />;
      case 'transport': return <TransportManagement />;
      case 'notifications': return <NotificationsSection />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Settings</h3>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Update Contact Details
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Manage Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card className="dashboard-card bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Today's Tasks</p>
                      <p className="text-2xl font-bold text-blue-900">{todayTasks.length}</p>
                    </div>
                    <ClipboardList className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-gradient-to-r from-green-50 to-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Pending Approvals</p>
                      <p className="text-2xl font-bold text-green-900">8</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-gradient-to-r from-orange-50 to-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Active Students</p>
                      <p className="text-2xl font-bold text-orange-900">1,245</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Notifications</p>
                      <p className="text-2xl font-bold text-purple-900">{recentNotifications.length}</p>
                    </div>
                    <Bell className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card bg-gradient-to-r from-red-50 to-red-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Urgent Issues</p>
                      <p className="text-2xl font-bold text-red-900">2</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Today's Assigned Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayTasks.map((task, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{task.task}</p>
                            <p className="text-sm text-gray-600">Assigned by: {task.assignedBy}</p>
                            <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                          </div>
                          <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentNotifications.map((notification, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.time}</p>
                          </div>
                          <Badge variant={notification.type === 'important' ? 'destructive' : 'secondary'}>
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Monthly report submission</span>
                      <span className="text-gray-500">3 days</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Dept. meeting notes</span>
                      <span className="text-gray-500">Tomorrow</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Fee reconciliation</span>
                      <span className="text-gray-500">Today 5 PM</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="h-12">New Task</Button>
                    <Button variant="outline" className="h-12">Mark Present</Button>
                    <Button variant="outline" className="h-12">Send Notice</Button>
                    <Button variant="outline" className="h-12">Upload Doc</Button>
                    <Button variant="outline" className="h-12">Export CSV</Button>
                    <Button variant="outline" className="h-12">Helpdesk</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={staffInfo.photo} 
              alt="Staff" 
              className="w-12 h-12 rounded-full object-cover border-2 border-[#b1f2ff]"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{staffInfo.name}</h3>
              <p className="text-sm text-gray-500">{staffInfo.employeeId}</p>
              <p className="text-xs text-gray-400">{staffInfo.designation}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {getNavigationItems().map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <Button onClick={logout} variant="ghost" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Staff Dashboard</h2>
              <p className="text-gray-600">Welcome back, {staffInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Badge className="badge-role" variant="secondary">
                {staffInfo.department}
              </Badge>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ModernStaffDashboard;

// Add enhanced staff theme styles
const staffThemeStyles = `
  .theme-staff {
    --staff-primary: #e91e63;
    --staff-secondary: #f8bbd9;
    --staff-accent: #b1f2ff;
    --staff-surface: #fce4ec;
  }
  
  .sidebar {
    @apply fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg;
  }
  
  .nav-item {
    @apply flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-700 cursor-pointer transition-all duration-200;
  }
  
  .nav-item.active {
    @apply bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md;
  }
  
  .dashboard-card {
    @apply hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1;
  }
  
  .badge-role {
    @apply bg-pink-100 text-pink-800 border-pink-200;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = staffThemeStyles;
  document.head.appendChild(styleSheet);
}
