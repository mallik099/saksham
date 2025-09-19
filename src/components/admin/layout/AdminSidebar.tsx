import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calculator,
  Building2,
  Home,
  Library,
  Bus,
  MessageSquare,
  BarChart2,
  Settings
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Student Management',
    href: '/admin/students',
    icon: Users,
    subItems: [
      { name: 'Student List', href: '/admin/students' },
      { name: 'Add Student', href: '/admin/students/add' },
      { name: 'Attendance', href: '/admin/students/attendance' },
      { name: 'Documents', href: '/admin/students/documents' }
    ]
  },
  {
    name: 'Faculty Management',
    href: '/admin/faculty',
    icon: GraduationCap,
    subItems: [
      { name: 'Faculty List', href: '/admin/faculty' },
      { name: 'Add Faculty', href: '/admin/faculty/add' },
      { name: 'Attendance', href: '/admin/faculty/attendance' }
    ]
  },
  {
    name: 'Academic Management',
    href: '/admin/academics',
    icon: BookOpen,
    subItems: [
      { name: 'Courses', href: '/admin/academics/courses' },
      { name: 'Timetable', href: '/admin/academics/timetable' },
      { name: 'Exams', href: '/admin/academics/exams' }
    ]
  },
  {
    name: 'Finance Management',
    href: '/admin/finance',
    icon: Calculator,
    subItems: [
      { name: 'Fee Collection', href: '/admin/finance/fees' },
      { name: 'Expenses', href: '/admin/finance/expenses' },
      { name: 'Reports', href: '/admin/finance/reports' }
    ]
  },
  {
    name: 'Infrastructure',
    href: '/admin/infrastructure',
    icon: Building2,
    subItems: [
      { name: 'Classrooms', href: '/admin/infrastructure/classrooms' },
      { name: 'Labs', href: '/admin/infrastructure/labs' },
      { name: 'Maintenance', href: '/admin/infrastructure/maintenance' }
    ]
  },
  {
    name: 'Hostel Management',
    href: '/admin/hostel',
    icon: Home,
    subItems: [
      { name: 'Room Allocation', href: '/admin/hostel/rooms' },
      { name: 'Mess Management', href: '/admin/hostel/mess' }
    ]
  },
  {
    name: 'Library Management',
    href: '/admin/library',
    icon: Library,
    subItems: [
      { name: 'Books', href: '/admin/library/books' },
      { name: 'Issue/Return', href: '/admin/library/transactions' },
      { name: 'Members', href: '/admin/library/members' }
    ]
  },
  {
    name: 'Transport Management',
    href: '/admin/transport',
    icon: Bus,
    subItems: [
      { name: 'Routes', href: '/admin/transport/routes' },
      { name: 'Vehicles', href: '/admin/transport/vehicles' },
      { name: 'Drivers', href: '/admin/transport/drivers' }
    ]
  },
  {
    name: 'Communication Center',
    href: '/admin/communication',
    icon: MessageSquare,
    subItems: [
      { name: 'Announcements', href: '/admin/communication/announcements' },
      { name: 'Messages', href: '/admin/communication/messages' },
      { name: 'Notices', href: '/admin/communication/notices' }
    ]
  },
  {
    name: 'Reports & Analytics',
    href: '/admin/reports',
    icon: BarChart2
  },
  {
    name: 'System Settings',
    href: '/admin/settings',
    icon: Settings
  }
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = true, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Saksham ERP</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose && onClose()}
                  className="flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;