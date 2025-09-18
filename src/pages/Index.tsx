import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';

type UserRole = 'admin' | 'faculty' | 'student' | 'parent';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        userRole={userRole} 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          userRole={userRole}
          onRoleChange={setUserRole}
        />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Index;
