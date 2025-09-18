import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Home, Users, CreditCard, Building, BookOpen, Bus, 
  ClipboardList, LogOut, Bell, UserPlus, FileText
} from 'lucide-react';
import StaffAdmissions from '../components/staff/StaffAdmissions';
import StaffFees from '../components/staff/StaffFees';
import StaffHostel from '../components/staff/StaffHostel';
import StaffLibrary from '../components/staff/StaffLibrary';
import StaffTransport from '../components/staff/StaffTransport';
import StaffLeaves from '../components/staff/StaffLeaves';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const pendingTasks = {
    admissions: 12,
    feePayments: 8,
    hostelRequests: 5,
    libraryRequests: 15,
    leaveApplications: 7
  };

  const notifications = [
    { id: 1, type: 'admission', message: '12 new admission applications pending review', urgent: true },
    { id: 2, type: 'fee', message: '8 fee payments awaiting confirmation', urgent: true },
    { id: 3, type: 'hostel', message: '5 hostel allocation requests pending', urgent: false },
    { id: 4, type: 'library', message: '3 books overdue - fines to be collected', urgent: false }
  ];

  const todayStats = {
    admissionsProcessed: 5,
    feesCollected: 125000,
    hostelAllocations: 3,
    booksIssued: 12
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'fees', label: 'Fee Collection', icon: CreditCard },
    { id: 'hostel', label: 'Hostel Management', icon: Building },
    { id: 'library', label: 'Library Management', icon: BookOpen },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'leaves', label: 'Leave Applications', icon: ClipboardList }
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Pending Admissions</p>
                <p className="text-2xl font-bold">{pendingTasks.admissions}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Fees Today</p>
                <p className="text-2xl font-bold">₹{todayStats.feesCollected.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Hostel Requests</p>
                <p className="text-2xl font-bold">{pendingTasks.hostelRequests}</p>
              </div>
              <Building className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Library Requests</p>
                <p className="text-2xl font-bold">{pendingTasks.libraryRequests}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{todayStats.admissionsProcessed}</p>
              <p className="text-sm text-gray-600">Admissions Processed</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">₹{todayStats.feesCollected.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Fees Collected</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{todayStats.hostelAllocations}</p>
              <p className="text-sm text-gray-600">Hostel Allocations</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{todayStats.booksIssued}</p>
              <p className="text-sm text-gray-600">Books Issued</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <span>New Admission Applications</span>
              </div>
              <Badge variant="secondary">{pendingTasks.admissions} pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>Fee Payment Confirmations</span>
              </div>
              <Badge variant="secondary">{pendingTasks.feePayments} pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-orange-600" />
                <span>Hostel Allocation Requests</span>
              </div>
              <Badge variant="secondary">{pendingTasks.hostelRequests} pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Library Book Requests</span>
              </div>
              <Badge variant="secondary">{pendingTasks.libraryRequests} pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-gray-600" />
                <span>Leave Applications</span>
              </div>
              <Badge variant="secondary">{pendingTasks.leaveApplications} pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

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
      case 'admissions': return <StaffAdmissions />;
      case 'fees': return <StaffFees />;
      case 'hostel': return <StaffHostel />;
      case 'library': return <StaffLibrary />;
      case 'transport': return <StaffTransport />;
      case 'leaves': return <StaffLeaves />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">CampusFlow</h1>
          <p className="text-sm text-gray-600">Staff Portal</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600' : 'text-gray-700'
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
                <p className="text-gray-600">Welcome back, Staff Member</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">Staff Portal</Badge>
                <Badge className="bg-orange-600">Non-Teaching</Badge>
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

export default StaffDashboard;