import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Settings, User, Bell, Shield, Smartphone, 
  Mail, Lock, Eye, EyeOff, Save, 
  Download, Upload, Trash2, Edit,
  Phone, MapPin, Calendar, Globe
} from 'lucide-react';

const ParentSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    grades: true,
    attendance: true,
    fees: true,
    events: true,
    emergency: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const parentProfile = {
    personalInfo: {
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@email.com',
      phone: '+91 9876543210',
      alternatePhone: '+91 9876543211',
      address: '123 Main Street, Downtown, City - 560001',
      occupation: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      emergencyContact: '+91 9876543212',
      relationship: 'Father'
    },
    preferences: {
      language: 'English',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR',
      theme: 'light'
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-02-15',
      loginSessions: 3,
      securityQuestions: 2
    }
  };

  const connectedDevices = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      type: 'Mobile',
      lastActive: '2024-03-20 10:30 AM',
      location: 'Mumbai, India',
      status: 'active'
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'Desktop',
      lastActive: '2024-03-20 09:15 AM',
      location: 'Mumbai, India',
      status: 'active'
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'Tablet',
      lastActive: '2024-03-19 08:45 PM',
      location: 'Mumbai, India',
      status: 'inactive'
    }
  ];

  const activityLog = [
    {
      id: 1,
      action: 'Profile Updated',
      timestamp: '2024-03-20 10:30 AM',
      details: 'Updated phone number',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      action: 'Login',
      timestamp: '2024-03-20 09:15 AM',
      details: 'Successful login from iPhone',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      action: 'Password Changed',
      timestamp: '2024-02-15 02:20 PM',
      details: 'Password updated successfully',
      ip: '192.168.1.100'
    },
    {
      id: 4,
      action: 'Fee Payment',
      timestamp: '2024-02-10 11:45 AM',
      details: 'Paid tuition fee installment',
      ip: '192.168.1.100'
    }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card className="dashboard-card">
        <CardContent className="p-0">
          <Tabs defaultValue="profile" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <Lock className="w-4 h-4" />
                  <span>Privacy</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="devices" 
                  className="flex items-center space-x-2 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Devices</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profile Settings */}
            <TabsContent value="profile" className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <Input 
                          value={parentProfile.personalInfo.firstName}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <Input 
                          value={parentProfile.personalInfo.lastName}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <Input 
                        type="email"
                        value={parentProfile.personalInfo.email}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <Input 
                          value={parentProfile.personalInfo.phone}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Alternate Phone</label>
                        <Input 
                          value={parentProfile.personalInfo.alternatePhone}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <Input 
                        value={parentProfile.personalInfo.address}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Occupation</label>
                        <Input 
                          value={parentProfile.personalInfo.occupation}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <Input 
                          value={parentProfile.personalInfo.company}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Language</label>
                      <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timezone</label>
                      <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date Format</label>
                      <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Currency</label>
                      <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Theme</label>
                      <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Channels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(value) => handleNotificationChange('email', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via SMS</p>
                      </div>
                      <Switch 
                        checked={notifications.sms}
                        onCheckedChange={(value) => handleNotificationChange('sms', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications on mobile</p>
                      </div>
                      <Switch 
                        checked={notifications.push}
                        onCheckedChange={(value) => handleNotificationChange('push', value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Notification Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Grade Updates</p>
                        <p className="text-sm text-gray-600">New grades and results</p>
                      </div>
                      <Switch 
                        checked={notifications.grades}
                        onCheckedChange={(value) => handleNotificationChange('grades', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Attendance Alerts</p>
                        <p className="text-sm text-gray-600">Attendance updates and alerts</p>
                      </div>
                      <Switch 
                        checked={notifications.attendance}
                        onCheckedChange={(value) => handleNotificationChange('attendance', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Fee Reminders</p>
                        <p className="text-sm text-gray-600">Payment due dates and reminders</p>
                      </div>
                      <Switch 
                        checked={notifications.fees}
                        onCheckedChange={(value) => handleNotificationChange('fees', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Event Updates</p>
                        <p className="text-sm text-gray-600">School events and announcements</p>
                      </div>
                      <Switch 
                        checked={notifications.events}
                        onCheckedChange={(value) => handleNotificationChange('events', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Emergency Alerts</p>
                        <p className="text-sm text-gray-600">Critical and emergency notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.emergency}
                        onCheckedChange={(value) => handleNotificationChange('emergency', value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Password & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Current Password</label>
                      <div className="relative mt-1">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">New Password</label>
                      <Input 
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                      <Input 
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>
                    <Button className="w-full">
                      Update Password
                    </Button>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <Badge className={parentProfile.security.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {parentProfile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full mt-2">
                        {parentProfile.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Security Status: Good</p>
                      <p className="text-xs text-green-600">Your account is well protected</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Password Change</span>
                        <span className="text-sm font-medium">{parentProfile.security.lastPasswordChange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Sessions</span>
                        <span className="text-sm font-medium">{parentProfile.security.loginSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Security Questions</span>
                        <span className="text-sm font-medium">{parentProfile.security.securityQuestions} set</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <Button variant="outline" className="w-full">
                        Manage Security Questions
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Login History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Log */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityLog.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                          <p className="text-xs text-gray-500">IP: {activity.ip}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="p-6 space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Privacy Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Profile Visibility</p>
                      <p className="text-sm text-gray-600">Control who can see your profile information</p>
                    </div>
                    <select 
                      className="p-2 border border-gray-300 rounded-md"
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    >
                      <option value="private">Private</option>
                      <option value="school">School Only</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Data Sharing</p>
                      <p className="text-sm text-gray-600">Allow sharing of anonymized data for research</p>
                    </div>
                    <Switch 
                      checked={privacy.dataSharing}
                      onCheckedChange={(value) => handlePrivacyChange('dataSharing', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-sm text-gray-600">Help improve the platform with usage analytics</p>
                    </div>
                    <Switch 
                      checked={privacy.analytics}
                      onCheckedChange={(value) => handlePrivacyChange('analytics', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Communications</p>
                      <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                    </div>
                    <Switch 
                      checked={privacy.marketing}
                      onCheckedChange={(value) => handlePrivacyChange('marketing', value)}
                    />
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Connected Devices */}
            <TabsContent value="devices" className="p-6 space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Connected Devices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connectedDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-8 h-8 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{device.name}</p>
                            <p className="text-sm text-gray-600">{device.type}</p>
                            <p className="text-xs text-gray-500">
                              Last active: {device.lastActive} • {device.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {device.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentSettings;