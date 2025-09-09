import { ReactNode } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface RoleBasedAccessProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleBasedAccess({ allowedRoles, children, fallback }: RoleBasedAccessProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}