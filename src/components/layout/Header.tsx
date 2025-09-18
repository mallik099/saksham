import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  userRole: 'admin' | 'faculty' | 'student' | 'parent';
  onRoleChange: (role: 'admin' | 'faculty' | 'student' | 'parent') => void;
}

const roleColors = {
  admin: 'from-red-500 to-pink-600',
  faculty: 'from-green-500 to-emerald-600',
  student: 'from-blue-500 to-cyan-600',
  parent: 'from-purple-500 to-violet-600',
};

const roleLabels = {
  admin: 'Administrator',
  faculty: 'Faculty Member',
  student: 'Student',
  parent: 'Parent',
};

export default function Header({ userRole, onRoleChange }: HeaderProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Role Selector */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r ${roleColors[userRole]} text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              <span className="font-medium">{roleLabels[userRole]}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(role as any);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      role === userRole ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}