import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { RoleBasedAccess } from '@/components/auth/RoleBasedAccess';
import {
  UserPlus,
  CreditCard,
  Building2,
  BookOpen,
  FileText,
  BarChart3,
  GraduationCap,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: BarChart3,
    allowedRoles: ['admin', 'staff', 'student'] as UserRole[],
  },
  {
    title: 'Student Admission',
    href: '/admission',
    icon: UserPlus,
    allowedRoles: ['admin', 'staff'] as UserRole[],
  },
  {
    title: 'Fee Payment',
    href: '/fees',
    icon: CreditCard,
    allowedRoles: ['admin'] as UserRole[],
  },
  {
    title: 'Hostel Allocation',
    href: '/hostel',
    icon: Building2,
    allowedRoles: ['admin'] as UserRole[],
  },
  {
    title: 'Library',
    href: '/library',
    icon: BookOpen,
    allowedRoles: ['admin', 'staff', 'student'] as UserRole[],
  },
  {
    title: 'Exam Registration',
    href: '/exam',
    icon: FileText,
    allowedRoles: ['admin', 'staff', 'student'] as UserRole[],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-border bg-university-light">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-university-blue" />
          <span className="text-xl font-bold text-university-blue">College ERP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <RoleBasedAccess key={item.href} allowedRoles={item.allowedRoles}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </RoleBasedAccess>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground">
          <p>College ERP System</p>
          <p>Version 1.0</p>
        </div>
      </div>
    </div>
  );
}