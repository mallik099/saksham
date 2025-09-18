import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Settings, Lock, Bell, User, Upload, 
  Download, Eye, EyeOff, Smartphone, Mail 
} from 'lucide-react';

const StudentSettingsModule = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [profileData, setProfileData] = useState({
    phone: '+91 9876543210',
    email: 'arjun.sharma@college.edu',
    address: '123 Main Street, Bangalore, Karnataka 560001',
    emergencyContact: '+91 9876543200'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    examReminders: true,
    feeReminders: true,
    attendanceAlerts: true
  });

  const notificationHistory = [
    { id: 1, title: 'Fee Payment Due', message: 'Your semester fee payment is due by March 20', date: '2024-03-15', type: 'fee', read: false },
    { id: 2, title: 'Exam Schedule Released', message: 'Mid-term examination schedule has been published', date: '2024-03-14', type: 'exam', read: true },
    { id: 3, title: 'Low Attendance Alert', message: 'Your attendance in English is below 85%', date: '2024-03-13', type: 'attendance', read: true },
    { id: 4, title: 'Library Book Due', message: 'Return "Data Structures" book by tomorrow', date: '2024-03-12', type: 'library', read: false },
    { id: 5, title: 'Hostel Fee Payment', message: 'Hostel fee payment successful', date: '2024-03-10', type: 'payment', read: true }
  ];

  const documents = [
    { name: 'Admission Certificate', uploadDate: '2024-01-15', size: '2.3 MB', status: 'Verified' },
    { name: '10th Marksheet', uploadDate: '2024-01-15', size: '1.8 MB', status: 'Verified' },
    { name: '12th Marksheet', uploadDate: '2024-01-15', size: '2.1 MB', status: 'Verified' },
    { name: 'Transfer Certificate', uploadDate: '2024-01-20', size: '1.5 MB', status: 'Pending' }
  ];

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password change requested');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleProfileUpdate = () => {
    console.log('Profile updated:', profileData);
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'fee': return 'bg-red-100 text-red-800';
      case 'exam': return 'bg-blue-100 text-blue-800';
      case 'attendance': return 'bg-yellow-100 text-yellow-800';
      case 'library': return 'bg-purple-100 text-purple-800';
      case 'payment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
              Update Profile Information
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handlePasswordChange} className="w-full md:w-auto">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Notification Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Email Notifications</span>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationToggle('email')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2 text-green-500" />
                    <span>SMS Notifications</span>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={() => handleNotificationToggle('sms')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={() => handleNotificationToggle('push')}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Exam Reminders</span>
                  <Switch
                    checked={notifications.examReminders}
                    onCheckedChange={() => handleNotificationToggle('examReminders')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Fee Reminders</span>
                  <Switch
                    checked={notifications.feeReminders}
                    onCheckedChange={() => handleNotificationToggle('feeReminders')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Attendance Alerts</span>
                  <Switch
                    checked={notifications.attendanceAlerts}
                    onCheckedChange={() => handleNotificationToggle('attendanceAlerts')}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Manage Documents
            </span>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Document Name</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Upload Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Size</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{doc.name}</td>
                    <td className="p-3">{doc.uploadDate}</td>
                    <td className="p-3">{doc.size}</td>
                    <td className="p-3">
                      <Badge className={getDocumentStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        {doc.status === 'Pending' && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Replace
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Notifications History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg border ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className={`font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                        {notification.title}
                      </p>
                      <Badge className={getNotificationTypeColor(notification.type)} variant="outline">
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>
                      )}
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-blue-700'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSettingsModule;