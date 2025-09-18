import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, GraduationCap, DollarSign, BookOpen, Home, BarChart3, Settings,
  Search, Plus, Bell, LogOut, UserPlus, FileText, User, CheckCircle, XCircle,
  Edit, Trash2, Eye, Download, Filter, Calendar, Building, Award, Phone, Mail,
  MapPin, Clock, CreditCard, Upload, Save, X, Activity, AlertCircle
} from 'lucide-react';
import EnhancedReportsModule from '../components/admin/EnhancedReportsModule';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ModernAdminDashboard = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dashboard Data
  const summaryCards = [
    { title: 'Total Students', value: '2,847', subtitle: 'Active Enrolled', icon: Users, color: 'blue', trend: '+5.2%', trendUp: true },
    { title: 'Faculty Members', value: '156', subtitle: 'Teaching Staff', icon: GraduationCap, color: 'green', trend: '+2 new', trendUp: true },
    { title: 'Placement Rate', value: '78.1%', subtitle: 'Current Year', icon: Building, color: 'purple', trend: '-9.5%', trendUp: false },
    { title: 'Fee Collection', value: '93.9%', subtitle: '₹3.85Cr Collected', icon: DollarSign, color: 'orange', trend: '+1.2%', trendUp: true }
  ];

  const recentActivities = [
    { action: 'Student Admission Approved', user: 'John Doe - CS Dept', time: '2 hours ago', type: 'success' },
    { action: 'Faculty Bank Details Updated', user: 'Dr. Sarah Wilson', time: '4 hours ago', type: 'info' },
    { action: 'Placement Drive Added', user: 'TCS - April 2024', time: '6 hours ago', type: 'success' },
    { action: 'Notification Sent', user: 'Exam Schedule - All Years', time: '1 day ago', type: 'info' },
    { action: 'Student Record Updated', user: 'Alice Brown - Roll CS21001', time: '1 day ago', type: 'warning' }
  ];

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'placements', label: 'Placements', icon: Building },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Modal Functions
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
  };

  // Dummy Data
  const admissionRequests = [
    { id: 1, name: 'John Doe', course: 'Computer Science', email: 'john@email.com', phone: '+91 9876543210', status: 'pending', date: '2024-03-15' },
    { id: 2, name: 'Jane Smith', course: 'Mechanical Engineering', email: 'jane@email.com', phone: '+91 9876543211', status: 'approved', date: '2024-03-14' },
    { id: 3, name: 'Mike Johnson', course: 'Electronics', email: 'mike@email.com', phone: '+91 9876543212', status: 'rejected', date: '2024-03-13' },
    { id: 4, name: 'Sarah Wilson', course: 'Computer Science', email: 'sarah@email.com', phone: '+91 9876543213', status: 'pending', date: '2024-03-12' },
    { id: 5, name: 'David Brown', course: 'Civil Engineering', email: 'david@email.com', phone: '+91 9876543214', status: 'pending', date: '2024-03-11' }
  ];

  const students = [
    { id: 1, name: 'Alice Brown', rollNo: 'CS21001', branch: 'Computer Science', year: '3rd', status: 'active', email: 'alice@student.edu', phone: '+91 9876543220', address: '123 Main St, City' },
    { id: 2, name: 'Bob Wilson', rollNo: 'ME21002', branch: 'Mechanical', year: '2nd', status: 'active', email: 'bob@student.edu', phone: '+91 9876543221', address: '456 Oak Ave, City' },
    { id: 3, name: 'Carol Davis', rollNo: 'EC21003', branch: 'Electronics', year: '4th', status: 'active', email: 'carol@student.edu', phone: '+91 9876543222', address: '789 Pine Rd, City' },
    { id: 4, name: 'David Miller', rollNo: 'CV21004', branch: 'Civil', year: '1st', status: 'active', email: 'david@student.edu', phone: '+91 9876543223', address: '321 Elm St, City' },
    { id: 5, name: 'Eva Garcia', rollNo: 'CS21005', branch: 'Computer Science', year: '2nd', status: 'active', email: 'eva@student.edu', phone: '+91 9876543224', address: '654 Maple Dr, City' }
  ];

  const faculty = [
    { id: 1, name: 'Dr. Sarah Wilson', department: 'Computer Science', post: 'HOD', workingHours: 40, bank: 'SBI ***1234', salary: '₹85,000', email: 'sarah.wilson@college.edu', phone: '+91 9876543230' },
    { id: 2, name: 'Prof. John Smith', department: 'Mechanical', post: 'Professor', workingHours: 38, bank: 'HDFC ***5678', salary: '₹75,000', email: 'john.smith@college.edu', phone: '+91 9876543231' },
    { id: 3, name: 'Dr. Emily Davis', department: 'Electronics', post: 'Incharge', workingHours: 42, bank: 'ICICI ***9012', salary: '₹70,000', email: 'emily.davis@college.edu', phone: '+91 9876543232' },
    { id: 4, name: 'Prof. Michael Brown', department: 'Civil', post: 'Faculty', workingHours: 36, bank: 'AXIS ***3456', salary: '₹65,000', email: 'michael.brown@college.edu', phone: '+91 9876543233' },
    { id: 5, name: 'Dr. Lisa Johnson', department: 'Computer Science', post: 'Faculty', workingHours: 40, bank: 'PNB ***7890', salary: '₹68,000', email: 'lisa.johnson@college.edu', phone: '+91 9876543234' }
  ];

  const placementDrives = [
    { 
      id: 1, 
      company: 'TCS', 
      date: '2024-04-15', 
      targetYear: '4th', 
      studentsPlaced: 25,
      placedStudents: [
        { name: 'Alice Brown', rollNo: 'CS21001', package: '₹6.5 LPA', status: 'Accepted' },
        { name: 'Bob Wilson', rollNo: 'ME21002', package: '₹6.2 LPA', status: 'Pending' },
        { name: 'Carol Davis', rollNo: 'EC21003', package: '₹6.8 LPA', status: 'Accepted' }
      ]
    },
    { 
      id: 2, 
      company: 'Infosys', 
      date: '2024-04-20', 
      targetYear: '4th', 
      studentsPlaced: 18,
      placedStudents: [
        { name: 'David Miller', rollNo: 'CV21004', package: '₹5.8 LPA', status: 'Accepted' },
        { name: 'Eva Garcia', rollNo: 'CS21005', package: '₹6.0 LPA', status: 'Accepted' }
      ]
    },
    { 
      id: 3, 
      company: 'Wipro', 
      date: '2024-04-25', 
      targetYear: '3rd', 
      studentsPlaced: 12,
      placedStudents: [
        { name: 'Frank Wilson', rollNo: 'CS21006', package: '₹5.5 LPA', status: 'Pending' }
      ]
    }
  ];

  const notifications = [
    { id: 1, title: 'Exam Schedule Released', content: 'Mid-semester exams from April 1-10', targetYear: 'All', date: '2024-03-15' },
    { id: 2, title: 'Holiday Notice', content: 'College closed on March 25', targetYear: 'All', date: '2024-03-14' },
    { id: 3, title: 'Placement Drive', content: 'TCS recruitment on April 15', targetYear: '4th', date: '2024-03-13' }
  ];

  const chartData = {
    highMarks: [
      { subject: 'Mathematics', percentage: 92, students: 245 },
      { subject: 'Physics', percentage: 88, students: 198 },
      { subject: 'Chemistry', percentage: 85, students: 167 },
      { subject: 'Computer Science', percentage: 95, students: 289 },
      { subject: 'Electronics', percentage: 87, students: 156 },
      { subject: 'Mechanical', percentage: 84, students: 134 }
    ],
    backlogs: [
      { department: 'Computer Science', count: 1.2, total: 450 },
      { department: 'Mechanical', count: 2.1, total: 380 },
      { department: 'Electronics', count: 2.8, total: 320 },
      { department: 'Civil', count: 1.9, total: 290 },
      { department: 'Chemical', count: 2.5, total: 180 }
    ],
    placements: [
      { company: 'TCS', count: 25, color: '#3B82F6' },
      { company: 'Infosys', count: 18, color: '#10B981' },
      { company: 'Wipro', count: 12, color: '#F59E0B' },
      { company: 'Accenture', count: 15, color: '#EF4444' },
      { company: 'Cognizant', count: 10, color: '#8B5CF6' },
      { company: 'Others', count: 8, color: '#6B7280' }
    ],
    enrollmentTrend: [
      { month: 'Jan', students: 2400, faculty: 145 },
      { month: 'Feb', students: 2520, faculty: 148 },
      { month: 'Mar', students: 2680, faculty: 152 },
      { month: 'Apr', students: 2750, faculty: 154 },
      { month: 'May', students: 2847, faculty: 156 }
    ]
  };

  // Modal Component
  const Modal = ({ children }) => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h3>
            <Button variant="ghost" size="sm" onClick={closeModal}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'addStudent':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Roll Number" />
              <Input placeholder="Branch" />
              <select className="px-3 py-2 border rounded-md">
                <option>Select Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
              <Input placeholder="Email" type="email" />
              <Input placeholder="Phone" />
              <Input placeholder="Address" className="col-span-2" />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1"><Save className="w-4 h-4 mr-2" />Save Student</Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        );
      case 'viewStudent':
        return selectedItem ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Name:</strong> {selectedItem.name}</div>
              <div><strong>Roll No:</strong> {selectedItem.rollNo}</div>
              <div><strong>Branch:</strong> {selectedItem.branch}</div>
              <div><strong>Year:</strong> {selectedItem.year}</div>
              <div><strong>Email:</strong> {selectedItem.email}</div>
              <div><strong>Phone:</strong> {selectedItem.phone}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedItem.address}</div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Documents</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>ID Card</span>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Download</Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Bonafide Certificate</span>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Download</Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Marksheet</span>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Download</Button>
                </div>
              </div>
            </div>
          </div>
        ) : null;
      case 'updateBank':
        return selectedItem ? (
          <div className="space-y-4">
            <div><strong>Faculty:</strong> {selectedItem.name}</div>
            <div><strong>Current Bank:</strong> {selectedItem.bank}</div>
            <div className="space-y-3">
              <Input placeholder="Bank Name" />
              <Input placeholder="Account Number" />
              <Input placeholder="IFSC Code" />
              <Input placeholder="Branch Name" />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1"><Save className="w-4 h-4 mr-2" />Update Bank Details</Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        ) : null;
      case 'viewPlacedStudents':
        return selectedItem ? (
          <div className="space-y-4">
            <div><strong>Company:</strong> {selectedItem.company}</div>
            <div><strong>Total Placed:</strong> {selectedItem.studentsPlaced}</div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Student Name</th>
                    <th className="px-4 py-2 text-left">Roll No</th>
                    <th className="px-4 py-2 text-left">Package</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.placedStudents?.map((student, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.rollNo}</td>
                      <td className="px-4 py-2">{student.package}</td>
                      <td className="px-4 py-2">
                        <Badge variant={student.status === 'Accepted' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null;
      case 'addDrive':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Company Name" />
              <Input type="date" placeholder="Drive Date" />
              <select className="px-3 py-2 border rounded-md">
                <option>Target Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>All Years</option>
              </select>
              <Input placeholder="Expected Placements" type="number" />
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1"><Save className="w-4 h-4 mr-2" />Save Placement Drive</Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        );
      case 'addNotification':
        return (
          <div className="space-y-4">
            <Input placeholder="Notification Title" />
            <select className="px-3 py-2 border rounded-md w-full">
              <option>Target Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
              <option>All Years</option>
            </select>
            <textarea 
              className="w-full px-3 py-2 border rounded-md" 
              rows="4" 
              placeholder="Notification Content"
            ></textarea>
            <div className="flex space-x-2">
              <Button className="flex-1"><Save className="w-4 h-4 mr-2" />Send Notification</Button>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        );
      default:
        return <div>Content not available</div>;
    }
  };

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="dashboard-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs font-medium ${
                        card.trendUp ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {card.trend}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    card.color === 'blue' ? 'bg-blue-100' :
                    card.color === 'green' ? 'bg-green-100' :
                    card.color === 'purple' ? 'bg-purple-100' :
                    card.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      card.color === 'blue' ? 'text-blue-600' :
                      card.color === 'green' ? 'text-green-600' :
                      card.color === 'purple' ? 'text-purple-600' :
                      card.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Admin Activities (Last 10)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} name="Students" />
                  <Line type="monotone" dataKey="faculty" stroke="#10B981" strokeWidth={2} name="Faculty" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.backlogs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Backlog Rate']} />
                  <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Placement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.placements}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="count"
                    label={({ company, count }) => `${count}`}
                  >
                    {chartData.placements.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} students`, props.payload.company]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {chartData.placements.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span>{item.company}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Library Module</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Hostel Module</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Transport Module</span>
                <Badge variant="secondary">Offline</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Placement Module</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderProfile = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Admin Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-900 font-medium">Dr. Admin Kumar</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Employee ID</label>
                <p className="text-gray-900 font-medium">ADM001</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-gray-900 font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  admin@college.edu
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-900 font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  +91 9876543200
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-gray-900 font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  123 College Road, Education City, State - 123456
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Role</label>
                <p className="text-gray-900 font-medium">System Administrator</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Department</label>
                <p className="text-gray-900 font-medium">Administration</p>
              </div>
            </div>
            <Button className="w-full mt-4">
              <Edit className="w-4 h-4 mr-2" />
              Update Profile Information
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Manage Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">ID Proof (Aadhar Card)</p>
                  <p className="text-sm text-gray-600">Uploaded: 15 Mar 2024</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />Download
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Address Proof</p>
                  <p className="text-sm text-gray-600">Uploaded: 10 Mar 2024</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />Download
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Educational Certificates</p>
                  <p className="text-sm text-gray-600">Uploaded: 5 Mar 2024</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />Download
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdmissions = () => {
    const filteredRequests = admissionRequests.filter(request => 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Admission Requests Management</h3>
            <p className="text-gray-600">Review and process student admission applications</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search by name, course, or email..." 
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="px-3 py-2 border rounded-md">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Admission Applications ({filteredRequests.length})</span>
              <div className="flex space-x-2">
                <Badge variant="secondary">{admissionRequests.filter(r => r.status === 'pending').length} Pending</Badge>
                <Badge variant="default">{admissionRequests.filter(r => r.status === 'approved').length} Approved</Badge>
                <Badge variant="destructive">{admissionRequests.filter(r => r.status === 'rejected').length} Rejected</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-500">Applied: {request.date}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-900">{request.course}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 mr-1 text-gray-400" />
                          {request.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-1 text-gray-400" />
                          {request.phone}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={
                          request.status === 'approved' ? 'default' : 
                          request.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="w-4 h-4 mr-1" />Reject
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />View Details
                          </Button>
                        )}
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
  };

  const renderStudents = () => {
    const filteredStudents = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Student Management System</h3>
            <p className="text-gray-600">Manage student records, enrollment, and academic information</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search students..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'active').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CS Students</p>
                  <p className="text-2xl font-bold text-purple-600">{students.filter(s => s.branch === 'Computer Science').length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Final Year</p>
                  <p className="text-2xl font-bold text-orange-600">{students.filter(s => s.year === '4th').length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Student Records ({filteredStudents.length})</span>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Branches</option>
                  <option>Computer Science</option>
                  <option>Mechanical</option>
                  <option>Electronics</option>
                  <option>Civil</option>
                </select>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Years</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {student.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-mono text-gray-900">{student.rollNo}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-900">{student.branch}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">{student.year} Year</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => openModal('viewStudent', student)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
  };

  const [facultyActiveTab, setFacultyActiveTab] = useState('overview');

  const facultyTabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'leaves', label: 'Leave Management', icon: Calendar },
    { id: 'training', label: 'Training', icon: BookOpen }
  ];

  const facultyAttendance = [
    { id: 1, name: 'Dr. Sarah Wilson', department: 'CS', present: 22, absent: 3, late: 1, percentage: 88 },
    { id: 2, name: 'Prof. John Smith', department: 'ME', present: 24, absent: 1, late: 0, percentage: 96 },
    { id: 3, name: 'Dr. Emily Davis', department: 'EC', present: 20, absent: 4, late: 2, percentage: 80 },
    { id: 4, name: 'Prof. Michael Brown', department: 'CV', present: 23, absent: 2, late: 1, percentage: 92 }
  ];

  const leaveRequests = [
    { id: 1, name: 'Dr. Sarah Wilson', type: 'Medical Leave', from: '2024-04-01', to: '2024-04-03', days: 3, status: 'approved' },
    { id: 2, name: 'Prof. John Smith', type: 'Casual Leave', from: '2024-04-05', to: '2024-04-05', days: 1, status: 'pending' },
    { id: 3, name: 'Dr. Emily Davis', type: 'Conference', from: '2024-04-10', to: '2024-04-12', days: 3, status: 'approved' }
  ];

  const trainingPrograms = [
    { id: 1, title: 'AI & Machine Learning Workshop', instructor: 'External Expert', date: '2024-04-15', enrolled: 12, duration: '3 days' },
    { id: 2, title: 'Research Methodology', instructor: 'Dr. Sarah Wilson', date: '2024-04-20', enrolled: 8, duration: '2 days' },
    { id: 3, title: 'Digital Teaching Tools', instructor: 'Tech Team', date: '2024-04-25', enrolled: 15, duration: '1 day' }
  ];

  const renderFacultyOverview = () => {
    const filteredFaculty = faculty.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.post.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                  <p className="text-2xl font-bold text-blue-600">{faculty.length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  <p className="text-2xl font-bold text-green-600">142</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Leave</p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Salary</p>
                  <p className="text-2xl font-bold text-purple-600">₹72K</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Faculty Records ({filteredFaculty.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFaculty.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={member.post === 'HOD' ? 'default' : 'outline'}>{member.post}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{member.salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                        </div>
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
  };

  const renderFacultyAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600">89%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-orange-600">4</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Perfect Attendance</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Monthly Attendance Report</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {facultyAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{record.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">{record.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">{record.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600">{record.late}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={record.percentage >= 90 ? 'default' : record.percentage >= 80 ? 'secondary' : 'destructive'}>
                        {record.percentage}%
                      </Badge>
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

  const renderFacultyPayroll = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold text-green-600">₹1.12Cr</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processed</p>
                <p className="text-2xl font-bold text-blue-600">148</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bonuses</p>
                <p className="text-2xl font-bold text-purple-600">₹2.8L</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Salary Distribution by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { department: 'Computer Science', salary: 85000, count: 25 },
                { department: 'Mechanical', salary: 75000, count: 20 },
                { department: 'Electronics', salary: 70000, count: 18 },
                { department: 'Civil', salary: 68000, count: 15 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFacultyLeaves = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">28</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Leave Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.from} to {request.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.days}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </div>
                      )}
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

  const renderFacultyTraining = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Faculty</p>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Upcoming Training Programs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trainingPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{program.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{program.instructor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{program.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{program.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{program.enrolled} faculty</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
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

  const renderFacultyTabContent = () => {
    switch (facultyActiveTab) {
      case 'overview': return renderFacultyOverview();
      case 'attendance': return renderFacultyAttendance();
      case 'payroll': return renderFacultyPayroll();
      case 'leaves': return renderFacultyLeaves();
      case 'training': return renderFacultyTraining();
      default: return renderFacultyOverview();
    }
  };

  const renderFaculty = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Faculty Management System</h3>
          <p className="text-gray-600">Comprehensive faculty management and analytics</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search faculty..." 
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {facultyTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setFacultyActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  facultyActiveTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {renderFacultyTabContent()}
    </div>
  );

  const renderPlacements = () => {
    const totalPlacements = placementDrives.reduce((acc, drive) => acc + drive.studentsPlaced, 0);
    const avgPackage = '₹6.2 LPA';
    const topPackage = '₹12.5 LPA';

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Placement Drives Management</h3>
            <p className="text-gray-600">Track company visits, student placements, and recruitment statistics</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search companies..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Drives</p>
                  <p className="text-2xl font-bold text-blue-600">{placementDrives.length}</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students Placed</p>
                  <p className="text-2xl font-bold text-green-600">{totalPlacements}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Package</p>
                  <p className="text-2xl font-bold text-purple-600">{avgPackage}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dashboard-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Highest Package</p>
                  <p className="text-2xl font-bold text-orange-600">{topPackage}</p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Placement Drives ({placementDrives.length})</span>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Years</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Status</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Ongoing</option>
                </select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Drive Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students Placed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {placementDrives.map((drive) => {
                    const driveDate = new Date(drive.date);
                    const today = new Date();
                    const status = driveDate > today ? 'Upcoming' : 'Completed';
                    
                    return (
                      <tr key={drive.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{drive.company}</p>
                              <p className="text-sm text-gray-500">Technology Company</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            <span>{drive.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{drive.targetYear} Year</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="font-medium text-green-600">{drive.studentsPlaced}</span>
                            <span className="text-gray-500 ml-1">students</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={status === 'Completed' ? 'default' : 'secondary'}>
                            {status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => openModal('viewPlacedStudents', drive)}>
                              <Eye className="w-4 h-4 mr-1" />View Students
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderReports = () => <EnhancedReportsModule />;

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Notifications</h3>

      </div>
      
      <Card className="dashboard-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{notification.title}</td>
                    <td className="px-6 py-4">{notification.content}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{notification.targetYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
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

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">System Settings</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>College Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">College Name</label>
                <Input defaultValue="ABC Engineering College" />
              </div>
              <div>
                <label className="text-sm font-medium">Academic Year</label>
                <Input defaultValue="2023-2024" />
              </div>
              <Button>Update Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Academic Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Semester Start Date</label>
                <Input type="date" defaultValue="2024-01-15" />
              </div>
              <div>
                <label className="text-sm font-medium">Exam Start Date</label>
                <Input type="date" defaultValue="2024-05-01" />
              </div>
              <Button>Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'profile': return renderProfile();
      case 'admissions': return renderAdmissions();
      case 'students': return renderStudents();
      case 'faculty': return renderFaculty();
      case 'placements': return renderPlacements();
      case 'reports': return renderReports();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sakshaym ERP</h1>
              <p className="text-sm text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {navigationItems.map((item) => {
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
              <h2 className="text-2xl font-bold text-gray-900">
                {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      <Modal>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default ModernAdminDashboard;