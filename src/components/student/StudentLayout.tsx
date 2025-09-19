import React, { useState } from 'react';
import { 
  User, Home, Calendar, ClipboardList, GraduationCap, CreditCard, 
  BookOpen, Building, Bus, Settings, LogOut, Bell, Download, Users
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../contexts/AuthContext';

interface StudentLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const { logout } = useAuth();

  const studentInfo = {
    name: 'Arjun Sharma',
    rollNo: 'CS21B001',
    course: 'Computer Science Engineering',
    year: '3rd Year',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'timetable', label: 'Time Table', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'hostel', label: 'Hostel', icon: Building },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={studentInfo.photo} 
              alt="Student" 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{studentInfo.name}</h3>
              <p className="text-sm text-gray-500">{studentInfo.rollNo}</p>
              <p className="text-xs text-gray-400">{studentInfo.year}</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Student Portal</h2>
              <p className="text-gray-600">Welcome back, {studentInfo.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Badge className="badge-role" variant="secondary">
                {studentInfo.course}
              </Badge>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
