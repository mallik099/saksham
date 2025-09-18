import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import {
  Users, DollarSign, Home, BookOpen, GraduationCap, Calendar,
  UserPlus, Building, ClipboardList, Settings, LogOut, Plus,
  TrendingUp, Menu, X, MessageSquare, FileText, ChevronLeft, ChevronRight
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
import AcademicCalendar from '../components/modules/AcademicCalendar';
import LeaveApplication from '../components/modules/LeaveApplication';
import FeedbackSystem from '../components/modules/FeedbackSystem';
import DocumentVault from '../components/modules/DocumentVault';
import { Widget } from '../components/ui/widget';

const Dashboard = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const AdminOverview = () => (
    <div className="space-y-6">
      {/* KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="widget">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{adminData.totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center shadow-md">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs text-gray-600">Total Faculty</p>
              <p className="text-3xl font-bold text-gray-900">{adminData.totalFaculty}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs text-gray-600">Total Staff</p>
              <p className="text-3xl font-bold text-gray-900">{adminData.totalStaff}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center shadow-md">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="widget">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs text-gray-600">Hostel Occupancy</p>
              <p className="text-3xl font-bold text-gray-900">{adminData.hostelOccupancy}%</p>
            </div>
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center shadow-md">
              <Home className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Widget title="Recent Admissions" icon={UserPlus}>
          <div className="space-y-3">
            {recentAdmissions.map((admission) => (
              <div key={admission.id} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/40">
                <div>
                  <p className="font-medium text-gray-900">{admission.name}</p>
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
        </Widget>

        <Widget title="Fee Collection Summary" icon={DollarSign}>
          <div className="space-y-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={feeData} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {pendingFees.slice(0, 3).map((fee, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{fee.student}</span>
                  <span className="text-red-600">₹{fee.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Widget>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Widget title="Hostel Occupancy" icon={Building}>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="block" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="occupied" fill="#3b82f6" />
                <Bar dataKey="total" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>

        <Widget title="Library Summary" icon={BookOpen}>
          <div className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">{adminData.libraryBooksIssued}</p>
              <p className="text-sm text-gray-600">Active Issued Books</p>
            </div>
            <div className="space-y-2">
              {issuedBooks.map((book) => (
                <div key={book.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{book.student}</p>
                    <p className="text-gray-600">{book.book}</p>
                  </div>
                  <Badge variant="outline">{book.dueDate}</Badge>
                </div>
              ))}
            </div>
          </div>
        </Widget>
      </div>

      <Widget title="Attendance Trend" icon={TrendingUp}>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Widget>


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
    { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
    { id: 'leaves', label: 'Leave Applications', icon: ClipboardList },
    { id: 'feedback', label: 'Feedback System', icon: MessageSquare },
    { id: 'documents', label: 'Document Vault', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminOverview />;
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
      case 'calendar': return <AcademicCalendar />;
      case 'leaves': return <LeaveApplication isAdmin={true} />;
      case 'feedback': return <FeedbackSystem isAdmin={true} />;
      case 'documents': return <DocumentVault isAdmin={true} />;
      case 'settings': return <AdminSettings />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      {/* Header */}
      <header className="glass-header">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Mobile menu */}
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              {/* Desktop collapse */}
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex">
                {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </Button>
              <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Saksham ERP</h1>
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

      <div className="flex relative">
        {/* Sidebar Navigation */}
        <nav
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:relative ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white/80 backdrop-blur-xl shadow-sm border-r min-h-screen z-50 transition-all duration-300 ease-in-out`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="font-semibold text-gray-900">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center gap-0' : 'gap-3'} px-3 py-2 text-left rounded-lg transition-colors ${
                      active ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
