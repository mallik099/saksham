import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Home, ClipboardList, GraduationCap, CreditCard, 
  MessageSquare, Settings, LogOut, Bell, Calendar, TrendingUp, Award, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import ParentChildProfile from '../components/parent/ParentChildProfile';
import ParentAttendance from '../components/parent/ParentAttendance';
import ParentGrades from '../components/parent/ParentGrades';
import ParentFees from '../components/parent/ParentFees';
import ParentCommunication from '../components/parent/ParentCommunication';
import ParentEvents from '../components/parent/ParentEvents';
import ParentSettings from '../components/parent/ParentSettings';

const ModernParentDashboard = () => {
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const parentInfo = {
    name: 'Mr. Robert Johnson',
    relation: 'Father',
    phone: '+91 9876543210',
    email: 'robert.johnson@email.com'
  };

  const childInfo = {
    name: 'Alex Johnson',
    rollNo: 'CS21001',
    class: '6th Semester',
    course: 'Computer Science Engineering',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  const academicMetrics = [
    { title: 'Attendance', value: '87%', status: 'good', icon: ClipboardList, color: 'blue' },
    { title: 'Current CGPA', value: '8.4', status: 'excellent', icon: Award, color: 'green' },
    { title: 'Pending Fees', value: '₹5,000', status: 'warning', icon: CreditCard, color: 'orange' },
    { title: 'Rank in Class', value: '12/60', status: 'good', icon: TrendingUp, color: 'purple' }
  ];

  const recentGrades = [
    { subject: 'Machine Learning', grade: 'A', marks: '85/100', date: '2024-03-15' },
    { subject: 'Database Systems', grade: 'A-', marks: '78/100', date: '2024-03-10' },
    { subject: 'Software Engineering', grade: 'B+', marks: '72/100', date: '2024-03-05' }
  ];

  const attendanceData = [
    { subject: 'Machine Learning', present: 18, total: 20, percentage: 90 },
    { subject: 'Database Systems', present: 16, total: 20, percentage: 80 },
    { subject: 'Software Engineering', present: 19, total: 22, percentage: 86 },
    { subject: 'Computer Networks', present: 17, total: 18, percentage: 94 }
  ];

  const upcomingEvents = [
    { event: 'Parent-Teacher Meeting', date: '2024-03-25', time: '10:00 AM', type: 'meeting' },
    { event: 'Semester Exam', date: '2024-04-01', time: '9:00 AM', type: 'exam' },
    { event: 'Project Presentation', date: '2024-04-05', time: '2:00 PM', type: 'presentation' }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Child Profile', icon: User },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'grades', label: 'Grades & Results', icon: GraduationCap },
    { id: 'fees', label: 'Fee Management', icon: CreditCard },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
    { id: 'events', label: 'Events & Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'presentation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ParentChildProfile />;
      case 'attendance':
        return <ParentAttendance />;
      case 'grades':
        return <ParentGrades />;
      case 'fees':
        return <ParentFees />;
      case 'communication':
        return <ParentCommunication />;
      case 'events':
        return <ParentEvents />;
      case 'settings':
        return <ParentSettings />;
      default:
        return (
          <div className="space-y-6">
            {/* Academic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academicMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="dashboard-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-role-soft flex items-center justify-center">
                          <Icon className="w-6 h-6 text-role" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Grades */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Recent Grades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGrades.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{grade.subject}</p>
                          <p className="text-sm text-gray-600">{grade.marks}</p>
                          <p className="text-xs text-gray-500">{grade.date}</p>
                        </div>
                        <Badge 
                          variant={grade.grade.startsWith('A') ? 'default' : 'secondary'}
                          className="text-lg font-bold"
                        >
                          {grade.grade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Overview */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardList className="w-5 h-5 mr-2" />
                    Attendance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceData.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900">{subject.subject}</span>
                          <span className="text-gray-600">{subject.present}/{subject.total} ({subject.percentage}%)</span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events & Communication */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{event.event}</p>
                          <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection('communication')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Class Teacher
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection('events')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Parent Meeting
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection('fees')}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Pending Fees
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection('grades')}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Download Report Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full theme-parent">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={childInfo.photo} 
              alt="Child" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{childInfo.name}</h3>
              <p className="text-sm text-gray-500">{childInfo.rollNo}</p>
              <p className="text-xs text-gray-400">{childInfo.class}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Parent: {parentInfo.name}</p>
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
                {activeSection === 'dashboard' ? 'Parent Dashboard' : 
                 navigationItems.find(item => item.id === activeSection)?.label || 'Parent Dashboard'}
              </h2>
              <p className="text-gray-600">
                {activeSection === 'dashboard' 
                  ? `Monitoring ${childInfo.name}'s academic progress`
                  : `Managing ${childInfo.name}'s ${activeSection}`
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Badge className="badge-role" variant="secondary">{childInfo.course}</Badge>
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

export default ModernParentDashboard;
