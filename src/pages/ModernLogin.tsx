import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, GraduationCap, Users, BookOpen, MessageSquare } from 'lucide-react';

const ModernLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', role: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { email: '', password: '', role: '' };
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: GraduationCap, title: 'Academic Excellence', desc: 'Manage students and academics' },
    { icon: Users, title: 'Faculty Management', desc: 'Streamlined operations' },
    { icon: BookOpen, title: 'Course Management', desc: 'Curriculum administration' },
    { icon: MessageSquare, title: 'Communication Hub', desc: 'Stay connected' },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left: Brand / Benefits */}
      <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12">
        <div className="m-auto max-w-md space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-white/15 flex items-center justify-center">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">Saksham ERP</h1>
              <p className="text-blue-100">Empowering colleges with smart automation</p>
            </div>
          </div>

          <div className="space-y-4">
            {features.slice(0, 3).map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md bg-white/15 p-2">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-blue-100">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Login Card */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden mb-6 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Saksham ERP</h2>
              <p className="text-sm text-gray-600">Empowering colleges with smart automation</p>
            </div>
          </div>

          <Card className="border shadow-sm">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <p className="text-sm text-muted-foreground">Sign in to continue</p>
            </CardHeader>

            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                      }}
                      className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Select role</Label>
                  <Select value={role} onValueChange={(value) => {
                    setRole(value);
                    if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
                  }}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              <details className="rounded-md border bg-muted/20 p-3">
                <summary className="cursor-pointer text-sm font-medium">Demo credentials</summary>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded border bg-background p-2">
                    <p className="font-medium text-blue-600">Admin</p>
                    <p className="text-muted-foreground">admin@college.edu</p>
                    <p className="text-muted-foreground">admin123</p>
                  </div>
                  <div className="rounded border bg-background p-2">
                    <p className="font-medium text-green-600">Faculty</p>
                    <p className="text-muted-foreground">faculty@college.edu</p>
                    <p className="text-muted-foreground">faculty123</p>
                  </div>
                  <div className="rounded border bg-background p-2">
                    <p className="font-medium text-cyan-600">Staff</p>
                    <p className="text-muted-foreground">staff@college.edu</p>
                    <p className="text-muted-foreground">staff123</p>
                  </div>
                  <div className="rounded border bg-background p-2">
                    <p className="font-medium text-purple-600">Student</p>
                    <p className="text-muted-foreground">student@college.edu</p>
                    <p className="text-muted-foreground">student123</p>
                  </div>
                  <div className="rounded border bg-background p-2">
                    <p className="font-medium text-orange-600">Parent</p>
                    <p className="text-muted-foreground">parent@college.edu</p>
                    <p className="text-muted-foreground">parent123</p>
                  </div>
                </div>
              </details>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;
