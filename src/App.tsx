import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ModernLogin from './pages/ModernLogin'
import ModernAdminDashboard from './pages/ModernAdminDashboard'
import ComprehensiveStudentDashboard from './pages/ComprehensiveStudentDashboard'
import ModernStaffDashboard from './pages/ModernStaffDashboard'
import ModernParentDashboard from './pages/ModernParentDashboard'
import ModernFacultyDashboard from './pages/ModernFacultyDashboard'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    const el = document.documentElement;
    const roles = ['admin', 'student', 'faculty', 'staff', 'parent'];
    roles.forEach(r => el.classList.remove(`theme-${r}`));
    if (user?.role && roles.includes(user.role)) {
      el.classList.add(`theme-${user.role}`);
    }
    return () => {
      roles.forEach(r => el.classList.remove(`theme-${r}`));
    };
  }, [user?.role]);

  if (user?.role === 'admin') return <ModernAdminDashboard />;
  if (user?.role === 'student') return <ComprehensiveStudentDashboard />;
  if (user?.role === 'faculty') return <ModernFacultyDashboard />;
  if (user?.role === 'staff') return <ModernStaffDashboard />;
  if (user?.role === 'parent') return <ModernParentDashboard />;

  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<ModernLogin />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
