import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import IntroAnimation from '../components/IntroAnimation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', role: '' });
  const [showIntro, setShowIntro] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

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
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 flex items-center justify-center p-4 overflow-hidden relative animate-login-entrance">
      {/* Educational 3D Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Books */}
        <div className="absolute top-20 left-16 w-12 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-lg animate-float-book transform-gpu" style={{animationDelay: '0s'}}>
          <div className="w-full h-2 bg-white/30 mt-2 rounded"></div>
          <div className="w-3/4 h-1 bg-white/20 mt-1 ml-1 rounded"></div>
        </div>
        
        {/* Digital Device */}
        <div className="absolute top-32 right-20 w-16 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg animate-float-device transform-gpu" style={{animationDelay: '1s'}}>
          <div className="w-12 h-8 bg-white/20 m-2 rounded"></div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-float-shape transform-gpu opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 transform rotate-45 shadow-lg animate-pulse-shape transform-gpu opacity-70" style={{animationDelay: '1.5s'}}></div>
        
        {/* Educational Icons */}
        <div className="absolute top-1/4 left-1/8 animate-float-icon transform-gpu" style={{animationDelay: '0.5s'}}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute top-3/4 right-1/8 animate-float-icon transform-gpu" style={{animationDelay: '1.2s'}}>
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 animate-float-icon transform-gpu" style={{animationDelay: '2.1s'}}>
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute top-1/2 right-1/4 animate-float-icon transform-gpu" style={{animationDelay: '0.8s'}}>
          <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 brand-gradient rounded-3xl mb-4 shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold brand-gradient bg-clip-text text-transparent mb-2">Saksham ERP</h1>
          <p className="text-gray-600 text-lg">ERP Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 transform-gpu animate-card-entrance hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <Label htmlFor="email" className="text-gray-700 text-sm font-medium mb-2 block">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-white/80 border-gray-200 text-gray-800 placeholder:text-gray-400 rounded-2xl focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 hover:shadow-md"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="group">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-white/80 border-gray-200 text-gray-800 placeholder:text-gray-400 rounded-2xl focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 hover:shadow-md pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
            </div>

            {/* Role Selector */}
            <div className="group">
              <Label className="text-gray-700 text-sm font-medium mb-2 block">Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-14 bg-white/80 border-gray-200 text-gray-800 rounded-2xl focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 hover:shadow-md">
                  <SelectValue placeholder="Choose your role" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-white backdrop-blur-xl border-gray-200 rounded-xl shadow-xl">
                  <SelectItem value="admin" className="hover:bg-purple-50 transition-colors">👨💼 Admin</SelectItem>
                  <SelectItem value="faculty" className="hover:bg-purple-50 transition-colors">👨🏫 Faculty</SelectItem>
                  <SelectItem value="staff" className="hover:bg-purple-50 transition-colors">👥 Staff</SelectItem>
                  <SelectItem value="student" className="hover:bg-purple-50 transition-colors">🎓 Student</SelectItem>
                  <SelectItem value="parent" className="hover:bg-purple-50 transition-colors">👨👩 Parent</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role}</p>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-purple-600 hover:opacity-80 text-sm transition-colors duration-200 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 brand-gradient hover:opacity-90 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</div>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-gray-200 animate-fade-in-up delay-700 hover:bg-white/80 transition-all duration-300">
          <p className="text-gray-700 text-sm mb-3 flex items-center">💡 Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-600">Admin</div>
              <div>admin@example.com</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-600">Faculty</div>
              <div>faculty@example.com</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-2 hover:bg-pink-100 transition-colors">
              <div className="font-medium text-pink-600">Staff</div>
              <div>staff@example.com</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-2 hover:bg-pink-100 transition-colors">
              <div className="font-medium text-pink-600">Student</div>
              <div>student@example.com</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors col-span-2">
              <div className="font-medium text-blue-600">Parent</div>
              <div>parent@campus.edu / parent123</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm animate-fade-in-up delay-900">
          © 2024 Saksham ERP. Crafted with ❤️
        </div>
      </div>

      <style jsx>{`
        @keyframes float-book {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-15px) rotateZ(5deg);
          }
        }
        
        @keyframes float-device {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-12px) rotateX(10deg);
          }
        }
        
        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        
        @keyframes pulse-shape {
          0%, 100% {
            transform: rotate(45deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: rotate(45deg) scale(1.2);
            opacity: 0.9;
          }
        }
        
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-10px) rotateZ(180deg);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes login-entrance {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes card-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-float-book {
          animation: float-book 4s ease-in-out infinite;
        }
        
        .animate-float-device {
          animation: float-device 5s ease-in-out infinite;
        }
        
        .animate-float-shape {
          animation: float-shape 6s ease-in-out infinite;
        }
        
        .animate-pulse-shape {
          animation: pulse-shape 3s ease-in-out infinite;
        }
        
        .animate-float-icon {
          animation: float-icon 4s ease-in-out infinite;
        }
        
        .animate-login-entrance {
          animation: login-entrance 1s ease-out;
        }
        
        .animate-card-entrance {
          animation: card-entrance 0.6s ease-out both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-900 {
          animation-delay: 0.9s;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Login;
