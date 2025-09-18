import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', role: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '', role: '' });
    
    if (!email) setErrors(prev => ({ ...prev, email: 'Email is required' }));
    if (!password) setErrors(prev => ({ ...prev, password: 'Password is required' }));
    if (!role) setErrors(prev => ({ ...prev, role: 'Role is required' }));
    
    if (!email || !password || !role) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      
      // Route based on selected role
      if (role === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid credentials, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#b1f2ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CampusFlow</h1>
          <p className="text-gray-600">College Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email or Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 rounded-lg border-gray-300 focus:border-[#b1f2ff] focus:ring-[#b1f2ff]"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg border-gray-300 focus:border-[#b1f2ff] focus:ring-[#b1f2ff] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Role Selector */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1 h-12 rounded-lg border-gray-300 focus:border-[#b1f2ff] focus:ring-[#b1f2ff]">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm text-[#007bff] hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-[#b1f2ff] hover:bg-[#9ee8f5] text-gray-800 font-medium rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/80 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3">ℹ️ For demo use:</p>
          <div className="space-y-2 text-xs">
            <div><strong>Admin</strong> → admin@example.com / Admin@123</div>
            <div><strong>Faculty</strong> → faculty@example.com / Faculty@123</div>
            <div><strong>Staff</strong> → staff@example.com / Staff@123</div>
            <div><strong>Student</strong> → student@example.com / Student@123</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          © 2024 CampusFlow College. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;