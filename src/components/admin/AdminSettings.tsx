import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Settings, Database, Bell, Shield, Users, Calendar } from 'lucide-react';

const AdminSettings = () => {
  const systemSettings = [
    { name: 'Email Notifications', description: 'Send email notifications to users', enabled: true },
    { name: 'SMS Alerts', description: 'Send SMS alerts for important updates', enabled: false },
    { name: 'Auto Backup', description: 'Automatically backup data daily', enabled: true },
    { name: 'Maintenance Mode', description: 'Enable maintenance mode', enabled: false }
  ];

  const academicSettings = [
    { name: 'Current Academic Year', value: '2023-24' },
    { name: 'Current Semester', value: '6th Semester' },
    { name: 'Attendance Minimum %', value: '75' },
    { name: 'Fee Due Days', value: '30' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{setting.name}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Academic Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicSettings.map((setting, index) => (
                <div key={index}>
                  <label className="text-sm font-medium">{setting.name}</label>
                  <Input defaultValue={setting.value} className="mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Database Status</h4>
                <p className="text-sm text-gray-600">Last backup: 2024-03-05 02:00 AM</p>
                <p className="text-sm text-gray-600">Size: 2.5 GB</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Backup Now</Button>
                <Button variant="outline">Restore</Button>
                <Button variant="destructive">Reset</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Password Policy</label>
                <Input defaultValue="Minimum 8 characters" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Session Timeout (minutes)</label>
                <Input defaultValue="30" className="mt-1" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Require 2FA for admin users</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Email Templates</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Admission Confirmation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Fee Payment Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Exam Schedule Notification
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">SMS Templates</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Attendance Alert
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Fee Due Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Emergency Notification
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-600">Admin Users</p>
              <Button size="sm" className="mt-2">Manage</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-green-600">85</p>
              <p className="text-sm text-gray-600">Faculty Users</p>
              <Button size="sm" className="mt-2">Manage</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-purple-600">45</p>
              <p className="text-sm text-gray-600">Staff Users</p>
              <Button size="sm" className="mt-2">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;