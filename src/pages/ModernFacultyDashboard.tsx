import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Home, User, Clock, DollarSign, CreditCard, Users, 
  FileText, Bell, Settings, LogOut, Download, Eye,
  Calendar, BookOpen, GraduationCap, MapPin, Bus
} from 'lucide-react';

// Import Faculty Components
import FacultyProfile from '../components/faculty/FacultyProfile';
import FacultyWorkingHours from '../components/faculty/FacultyWorkingHours';
import FacultyFinancialDetails from '../components/faculty/FacultyFinancialDetails';
import FacultyClassIncharge from '../components/faculty/FacultyClassIncharge';
import FacultyPostInfo from '../components/faculty/FacultyPostInfo';
import FacultyNotifications from '../components/faculty/FacultyNotifications';
import FacultySettings from '../components/faculty/FacultySettings';
import FacultyAttendance from '../components/faculty/FacultyAttendance';
import FacultyTimetable from '../components/faculty/FacultyTimetable';
import FacultyExams from '../components/faculty/FacultyExams';
import FacultyIdCard from '../components/faculty/FacultyIdCard';
import FacultyMenteeManagement from '../components/faculty/FacultyMenteeManagement';
import FacultyTransport from '../components/faculty/FacultyTransport';

const ModernFacultyDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock faculty data
  const facultyData = {
    name: 'Dr. Sarah Johnson',
    facultyId: 'FAC001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    email: 'sarah.johnson@college.edu',
    phone: '+91 9876543210',
    address: '123 Faculty Colony, College Campus',
    joiningDate: '2018-07-15',
    subjects: ['Data Structures', 'Database Systems', 'Software Engineering'],
    classes: ['CSE-3A', 'CSE-3B', 'CSE-2A'],
    workingHours: {
      thisMonth: 160,
      required: 180
    },
    salary: {
      basic: 75000,
      allowances: 15000,
      deductions: 5000,
      netPay: 85000
    },
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '****1234',
      ifscCode: 'SBIN0001234'
    },
    classIncharge: {
      className: 'CSE - 3rd Year - Section A',
      subjects: ['Data Structures', 'Database Systems'],
      studentCount: 45
    },
    post: 'Associate Professor',
    isHOD: false,
    isIncharge: true
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile Section', icon: User },
    { id: 'mentee-management', label: 'Mentee Management', icon: Users },
    { id: 'attendance', label: 'Attendance Management', icon: Users },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'exams', label: 'Exams & Grades', icon: BookOpen },
    { id: 'working-hours', label: 'Working Hours', icon: Clock },
    { id: 'financial', label: 'Financial Details', icon: DollarSign },
    { id: 'class-incharge', label: 'Class Incharge Info', icon: Users },
    { id: 'post-info', label: 'Post Information', icon: GraduationCap },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'id-card', label: 'ID Card', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Working Hours</p>
                <p className="text-2xl font-bold">{facultyData.workingHours.thisMonth}h</p>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
              <Clock className="h-8 w-8 text-role" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Salary</p>
                <p className="text-2xl font-bold">₹{facultyData.salary.netPay.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Current Month</p>
              </div>
              <DollarSign className="h-8 w-8 text-role" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-500">Unread</p>
              </div>
              <Bell className="h-8 w-8 text-role" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="text-2xl font-bold">{facultyData.classIncharge.studentCount}</p>
                <p className="text-xs text-gray-500">In My Class</p>
              </div>
              <Users className="h-8 w-8 text-role" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-role">
              <User className="h-5 w-5" />
              Faculty Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {facultyData.name}</p>
            <p><strong>Faculty ID:</strong> {facultyData.facultyId}</p>
            <p><strong>Department:</strong> {facultyData.department}</p>
            <p><strong>Designation:</strong> {facultyData.designation}</p>
            <div className="pt-2">
              <Button size="sm" variant="outline" onClick={() => setActiveTab('profile')}>
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-role">
              <DollarSign className="h-5 w-5" />
              Salary Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Basic Salary:</strong> ₹{facultyData.salary.basic.toLocaleString()}</p>
            <p><strong>Allowances:</strong> ₹{facultyData.salary.allowances.toLocaleString()}</p>
            <p><strong>Deductions:</strong> ₹{facultyData.salary.deductions.toLocaleString()}</p>
            <p><strong>Net Pay:</strong> ₹{facultyData.salary.netPay.toLocaleString()}</p>
            <div className="pt-2">
              <Button size="sm" variant="outline" onClick={() => setActiveTab('salary')}>
                <Download className="h-4 w-4 mr-1" />
                Download Slip
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-role">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="p-2 bg-white rounded border-l-4 border-red-400 cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab('notifications')}>
                <p className="text-sm font-medium">Salary slip available</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <div className="p-2 bg-white rounded border-l-4 border-blue-400 cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab('notifications')}>
                <p className="text-sm font-medium">Working hours updated</p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
              <div className="p-2 bg-white rounded border-l-4 border-green-400 cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab('notifications')}>
                <p className="text-sm font-medium">Faculty meeting scheduled</p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
            </div>
            <div className="pt-2">
              <Button size="sm" variant="outline" onClick={() => setActiveTab('notifications')}>
                <Bell className="h-4 w-4 mr-1" />
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab('working-hours')}>
              <Clock className="h-6 w-6" />
              Working Hours
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab('financial')}>
              <Download className="h-6 w-6" />
              Financial Details
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab('notifications')}>
              <Bell className="h-6 w-6" />
              Notifications
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab('settings')}>
              <Settings className="h-6 w-6" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Extra Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>9:00 AM • Data Structures (CSE-A)</span>
                <Badge className="badge-role" variant="secondary">Lecture</Badge>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>11:00 AM • Database Lab (CSE-Lab 2)</span>
                <Badge className="badge-role" variant="secondary">Lab</Badge>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>2:30 PM • Project Mentoring</span>
                <Badge className="badge-role" variant="secondary">Mentoring</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Upcoming Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Mid-term Papers • Data Structures</p>
                <p className="text-xs text-gray-500">Due in 2 days</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Assignment Review • DBMS</p>
                <p className="text-xs text-gray-500">Due Friday</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Project Proposal Shortlisting</p>
                <p className="text-xs text-gray-500">Next week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Add notifications state for dashboard access
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'profile': return <FacultyProfile facultyData={facultyData} />;
      case 'mentee-management': return <FacultyMenteeManagement />;
      case 'attendance': return <FacultyAttendance facultyData={facultyData} />;
      case 'timetable': return <FacultyTimetable facultyData={facultyData} />;
      case 'exams': return <FacultyExams facultyData={facultyData} />;
      case 'working-hours': return <FacultyWorkingHours facultyData={facultyData} />;
      case 'financial': return <FacultyFinancialDetails facultyData={facultyData} />;
      case 'class-incharge': return <FacultyClassIncharge facultyData={facultyData} />;
      case 'post-info': return <FacultyPostInfo facultyData={facultyData} />;
      case 'transport': return <FacultyTransport />;
      case 'id-card': return <FacultyIdCard facultyData={facultyData} />;
      case 'notifications': return <FacultyNotifications />;
      case 'settings': return <FacultySettings facultyData={facultyData} />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full theme-faculty">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Saksham ERP</h1>
          <p className="text-sm text-gray-600">Faculty Portal</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-72 p-6 border-t border-gray-200">
          <Button onClick={logout} variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-600">Welcome back, {facultyData.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveTab('notifications')}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">5</span>
                </Button>
                <Badge className="badge-role" variant="secondary">{facultyData.facultyId}</Badge>
                <Badge className="badge-role">{facultyData.designation}</Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ModernFacultyDashboard;
