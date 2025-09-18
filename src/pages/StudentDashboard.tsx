import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Home, User, CreditCard, Building, BookOpen, Calendar, 
  ClipboardList, LogOut, Bell, GraduationCap, Bus, IdCard, Clock
} from 'lucide-react';
import StudentProfile from '../components/student/StudentProfile';
import StudentFees from '../components/student/StudentFees';
import StudentHostel from '../components/student/StudentHostel';
import StudentLibrary from '../components/student/StudentLibrary';
import StudentExams from '../components/student/StudentExams';
import StudentAttendance from '../components/student/StudentAttendance';
import StudentIdCard from '../components/student/StudentIdCard';
import StudentTimetable from '../components/student/StudentTimetable';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock student data
  const studentData = {
    name: 'John Doe',
    rollNumber: 'CS21001',
    course: 'Computer Science Engineering',
    semester: '6th Semester',
    section: 'A',
    department: 'Computer Science',
    email: 'student@example.com',
    phone: '+91 9876543210',
    admissionYear: '2021',
    hostelRoom: 'Block A - 205',
    transportRoute: 'Route 3 - City Center',
    attendance: 85,
    pendingFees: 15000,
    totalFees: 50000,
    paidFees: 35000
  };

  const notifications = [
    { id: 1, type: 'exam', message: 'Data Structures exam on 15th March', urgent: true },
    { id: 2, type: 'fee', message: 'Fee payment due in 5 days', urgent: true },
    { id: 3, type: 'holiday', message: 'College closed on 10th March - Holi', urgent: false },
    { id: 4, type: 'library', message: 'Return "Algorithm Design" by 12th March', urgent: false }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'idcard', label: 'ID Card', icon: IdCard },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'hostel', label: 'Hostel', icon: Building },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'exams', label: 'Exams', icon: GraduationCap }
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Attendance</p>
                <p className="text-2xl font-bold">{studentData.attendance}%</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Fees Paid</p>
                <p className="text-2xl font-bold">₹{studentData.paidFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Fees</p>
                <p className="text-2xl font-bold">₹{studentData.pendingFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Current Semester</p>
                <p className="text-2xl font-bold">{studentData.semester.split(' ')[0]}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Roll No:</strong> {studentData.rollNumber}</p>
            <p><strong>Course:</strong> {studentData.course}</p>
            <p><strong>Section:</strong> {studentData.section}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Hostel Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Room:</strong> {studentData.hostelRoom}</p>
            <p><strong>Status:</strong> <Badge variant="secondary">Occupied</Badge></p>
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
            <p><strong>Route:</strong> {studentData.transportRoute}</p>
            <p><strong>Status:</strong> <Badge variant="secondary">Active</Badge></p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
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
      case 'idcard': return <StudentIdCard studentData={studentData} />;
      case 'timetable': return <StudentTimetable studentData={studentData} />;
      case 'profile': return <StudentProfile studentData={studentData} />;
      case 'attendance': return <StudentAttendance studentData={studentData} />;
      case 'fees': return <StudentFees studentData={studentData} />;
      case 'hostel': return <StudentHostel studentData={studentData} />;
      case 'library': return <StudentLibrary studentData={studentData} />;
      case 'exams': return <StudentExams studentData={studentData} />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">CampusFlow</h1>
          <p className="text-sm text-gray-600">Student Portal</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <Button onClick={logout} variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-600">Welcome back, {studentData.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{studentData.rollNumber}</Badge>
                <Badge>{studentData.semester}</Badge>
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

export default StudentDashboard;