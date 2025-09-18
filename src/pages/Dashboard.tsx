import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  Users, DollarSign, Home, BookOpen, GraduationCap, Calendar, 
  UserPlus, Building, ClipboardList, Settings, LogOut, Plus,
  TrendingUp, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import AdminStudents from '../components/admin/AdminStudents';
import AdminFaculty from '../components/admin/AdminFaculty';
import AdminStaff from '../components/admin/AdminStaff';
import AdminAdmissions from '../components/admin/AdminAdmissions';
import AdminFees from '../components/admin/AdminFees';
import AdminHostel from '../components/admin/AdminHostel';
import AdminLibrary from '../components/admin/AdminLibrary';
import AdminExams from '../components/admin/AdminExams';
import AdminAttendance from '../components/admin/AdminAttendance';
import AdminCertificates from '../components/admin/AdminCertificates';
import AdminSettings from '../components/admin/AdminSettings';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock admin data
  const adminData = {
    totalStudents: 1250,
    totalFaculty: 85,
    totalStaff: 45,
    hostelOccupancy: 78,
    libraryBooksIssued: 342,
    feesCollectedToday: 125000,
    feesCollectedMonth: 2850000,
    feesCollectedYear: 15600000,
    overallAttendance: 87
  };

  const recentAdmissions = [
    { id: 1, name: 'John Doe', course: 'Computer Science', dateApplied: '2024-03-01', status: 'Pending' },
    { id: 2, name: 'Jane Smith', course: 'Electronics', dateApplied: '2024-03-02', status: 'Approved' },
    { id: 3, name: 'Mike Johnson', course: 'Mechanical', dateApplied: '2024-03-03', status: 'Pending' }
  ];

  const feeData = [
    { name: 'Paid', value: 75, amount: 18750000 },
    { name: 'Due', value: 25, amount: 6250000 }
  ];

  const hostelData = [
    { block: 'Block A', occupied: 45, total: 60 },
    { block: 'Block B', occupied: 65, total: 80 },
    { block: 'Block C', occupied: 38, total: 50 }
  ];

  const attendanceData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 87 },
    { month: 'Mar', attendance: 89 },
    { month: 'Apr', attendance: 86 },
    { month: 'May', attendance: 88 }
  ];

  const issuedBooks = [
    { id: 1, student: 'Sarah Wilson', book: 'Data Structures', dueDate: '2024-03-15' },
    { id: 2, student: 'David Brown', book: 'Database Systems', dueDate: '2024-03-12' },
    { id: 3, student: 'Lisa Davis', book: 'Computer Networks', dueDate: '2024-03-18' }
  ];

  const pendingFees = [
    { student: 'Alex Johnson', amount: 25000, semester: '6th Semester' },
    { student: 'Emma Wilson', amount: 25000, semester: '6th Semester' },
    { student: 'Ryan Davis', amount: 25000, semester: '5th Semester' }
  ];

  const AdminDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-[#b1f2ff] to-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-blue-900">{adminData.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Faculty</p>
                <p className="text-3xl font-bold">{adminData.totalFaculty}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Staff</p>
                <p className="text-3xl font-bold">{adminData.totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Hostel Occupancy</p>
                <p className="text-3xl font-bold">{adminData.hostelOccupancy}%</p>
              </div>
              <Home className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Library Books Issued</p>
                <p className="text-2xl font-bold text-blue-600">{adminData.libraryBooksIssued}</p>
              </div>
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Fees Collected (Month)</p>
                <p className="text-2xl font-bold text-green-600">₹{(adminData.feesCollectedMonth / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Overall Attendance</p>
                <p className="text-2xl font-bold text-purple-600">{adminData.overallAttendance}%</p>
              </div>
              <ClipboardList className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admissions Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Recent Admissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAdmissions.map((admission) => (
                <div key={admission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{admission.name}</p>
                    <p className="text-sm text-gray-600">{admission.course}</p>
                    <p className="text-xs text-gray-500">{admission.dateApplied}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={admission.status === 'Approved' ? 'default' : 'secondary'}>
                      {admission.status}
                    </Badge>
                    {admission.status === 'Pending' && (
                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 px-2">✓</Button>
                        <Button size="sm" variant="destructive" className="h-7 px-2">✗</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Fee Collection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={feeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {pendingFees.slice(0, 3).map((fee, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{fee.student}</span>
                    <span className="text-red-600">₹{fee.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hostel Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Hostel Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hostelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="block" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupied" fill="#3b82f6" />
                <Bar dataKey="total" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Library Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Library Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{adminData.libraryBooksIssued}</p>
                <p className="text-sm text-gray-600">Active Issued Books</p>
              </div>
              <div className="space-y-2">
                {issuedBooks.map((book) => (
                  <div key={book.id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{book.student}</p>
                      <p className="text-gray-600">{book.book}</p>
                    </div>
                    <Badge variant="outline">{book.dueDate}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Attendance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col gap-2">
              <UserPlus className="h-5 w-5" />
              Add Student
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <GraduationCap className="h-5 w-5" />
              Add Faculty
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <Building className="h-5 w-5" />
              Allocate Room
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline">
              <BookOpen className="h-5 w-5" />
              Issue Book
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'fees', label: 'Fees', icon: DollarSign },
    { id: 'hostel', label: 'Hostel', icon: Building },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'certificates', label: 'Certificates', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminDashboard />;
      case 'students': return <AdminStudents />;
      case 'faculty': return <AdminFaculty />;
      case 'staff': return <AdminStaff />;
      case 'admissions': return <AdminAdmissions />;
      case 'fees': return <AdminFees />;
      case 'hostel': return <AdminHostel />;
      case 'library': return <AdminLibrary />;
      case 'exams': return <AdminExams />;
      case 'attendance': return <AdminAttendance />;
      case 'certificates': return <AdminCertificates />;
      case 'settings': return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#b1f2ff] rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CampusFlow ERP</h1>
                <p className="text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Admin</Badge>
              <Button onClick={logout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === item.id 
                        ? 'bg-[#b1f2ff] text-blue-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;