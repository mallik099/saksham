import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication for demo
      const mockUsers = {
        'admin@example.com': { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        'faculty@example.com': { id: '2', name: 'Faculty User', email: 'faculty@example.com', role: 'faculty' },
        'staff@example.com': { id: '3', name: 'Staff User', email: 'staff@example.com', role: 'staff' },
        'student@example.com': { id: '4', name: 'John Doe', email: 'student@example.com', role: 'student', studentId: 'CS21001' }
      };
      
      const userData = mockUsers[email as keyof typeof mockUsers];
      if (!userData) {
        throw new Error('Invalid credentials');
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setToken(mockToken);
      setUser(userData);
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};