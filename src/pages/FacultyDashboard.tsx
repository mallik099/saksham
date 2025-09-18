import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Home, User, ClipboardList, GraduationCap, Upload, 
  MessageSquare, LogOut, Bell, Calendar, IdCard, Clock, Bus, FileText
} from 'lucide-react';
import FacultyProfile from '../components/faculty/FacultyProfile';
import FacultyAttendance from '../components/faculty/FacultyAttendance';
import FacultyExams from '../components/faculty/FacultyExams';
import FacultyIdCard from '../components/faculty/FacultyIdCard';
import FacultyTimetable from '../components/faculty/FacultyTimetable';
import AcademicCalendar from '../components/modules/AcademicCalendar';
import LeaveApplication from '../components/modules/LeaveApplication';
import FeedbackSystem from '../components/modules/FeedbackSystem';
import DocumentVault from '../components/modules/DocumentVault';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock faculty data
  const facultyData = {
    name: 'Dr. Sarah Johnson',
    employeeId: 'FAC001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    email: 'faculty@example.com',
    phone: '+91 9876543210',
    joiningDate: '2018-07-15',
    subjects: ['Data Structures', 'Database Systems', 'Software Engineering'],
    classes: ['CS-6A', 'CS-6B', 'CS-5A'],
    attendance: 95,
    transportRoute: 'Route 2 - Faculty Quarter'
  };

  const todayClasses = [
    { time: '9:00-10:00', subject: 'Data Structures', class: 'CS-6A', room: 'CS-101' },
    { time: '11:00-12:00', subject: 'Database Systems', class: 'CS-6B', room: 'CS-102' },
    { time: '2:00-3:00', subject: 'Software Engineering', class: 'CS-5A', room: 'CS-103' }
  ];

  const notifications = [
    { id: 1, type: 'attendance', message: 'Attendance pending for CS-6A Data Structures', urgent: true },
    { id: 2, type: 'marks', message: 'Mid-semester marks entry deadline: March 20', urgent: true },
    { id: 3, type: 'leave', message: '3 leave applications pending approval', urgent: false },
    { id: 4, type: 'admin', message: 'Faculty meeting scheduled for March 15', urgent: false }
  ];

  const pendingTasks = [
    { task: 'Grade CS-6A assignments', count: 25, subject: 'Data Structures' },
    { task: 'Enter mid-sem marks', count: 30, subject: 'Database Systems' },
    { task: 'Upload study material', count: 2, subject: 'Software Engineering' }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'idcard', label: 'ID Card', icon: IdCard },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'exams', label: 'Exams & Marks', icon: GraduationCap },
    { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
    { id: 'leaves', label: 'Leave Applications', icon: ClipboardList },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">My Attendance</p>
                <p className="text-2xl font-bold">{facultyData.attendance}%</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Today's Classes</p>
                <p className="text-2xl font-bold">{todayClasses.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Tasks</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Subjects</p>
                <p className="text-2xl font-bold">{facultyData.subjects.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Faculty Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {facultyData.name}</p>
            <p><strong>Employee ID:</strong> {facultyData.employeeId}</p>
            <p><strong>Department:</strong> {facultyData.department}</p>
            <p><strong>Designation:</strong> {facultyData.designation}</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Leave Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Available:</strong> 15 days</p>
            <p><strong>Used:</strong> 3 days</p>
            <p><strong>Status:</strong> <Badge variant="secondary">Active</Badge></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              Transport Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Route:</strong> {facultyData.transportRoute}</p>
            <p><strong>Status:</strong> <Badge variant="secondary">Active</Badge></p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Classes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{classItem.subject}</h4>
                  <p className="text-sm text-gray-600">{classItem.class} - {classItem.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{classItem.time}</p>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{task.task}</h4>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                </div>
                <Badge variant="secondary">{task.count} items</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                notification.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
              }`}>
                <p className="text-sm">{notification.message}</p>
                {notification.urgent && (
                  <Badge variant="destructive" className="mt-1">Urgent</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'idcard': return <FacultyIdCard facultyData={facultyData} />;
      case 'timetable': return <FacultyTimetable facultyData={facultyData} />;
      case 'profile': return <FacultyProfile facultyData={facultyData} />;
      case 'attendance': return <FacultyAttendance facultyData={facultyData} />;
      case 'exams': return <FacultyExams facultyData={facultyData} />;
      case 'calendar': return <AcademicCalendar />;
      case 'leaves': return <LeaveApplication isAdmin={false} studentId={facultyData.employeeId} />;
      case 'feedback': return <FeedbackSystem isAdmin={false} userType="Faculty" />;
      case 'documents': return <DocumentVault isAdmin={false} />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 flex">
      {/* Sidebar */}
      <div className="w-72 glass-sidebar rounded-r-3xl">
        <div className="p-6 border-b">
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
                className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors rounded-xl mx-2 my-1 ${
                  activeTab === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-72 p-6 border-t border-white/40">
          <Button onClick={logout} variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="glass-header">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-600">Welcome back, {facultyData.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{facultyData.employeeId}</Badge>
                <Badge>{facultyData.designation}</Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
