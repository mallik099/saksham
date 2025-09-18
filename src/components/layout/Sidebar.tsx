import { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, 
  GraduationCap, FileText, Settings, Bell,
  ChevronLeft, ChevronRight, Home, User,
  ClipboardList, TrendingUp, MessageSquare
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'faculty' | 'student' | 'parent';
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: GraduationCap, label: 'Faculty', path: '/faculty' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
  faculty: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'My Classes', path: '/classes' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: FileText, label: 'Grades', path: '/grades' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
  ],
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: FileText, label: 'Grades', path: '/grades' },
    { icon: User, label: 'Profile', path: '/profile' },
  ],
  parent: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: User, label: 'Child Profile', path: '/child' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: MessageSquare, label: 'Teachers', path: '/teachers' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ],
};

export default function Sidebar({ userRole, isCollapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('/');
  const items = menuItems[userRole];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800">Saksham ERP</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => setActiveItem(item.path)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeItem === item.path
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}