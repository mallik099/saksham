import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Settings, Lock, User, Upload, Download, Eye, EyeOff, Save, X } from 'lucide-react';

interface FacultySettingsProps {
  facultyData: any;
}

const FacultySettings: React.FC<FacultySettingsProps> = ({ facultyData }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    phone: facultyData.phone,
    address: facultyData.address,
    email: facultyData.email
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const linkedDocuments = [
    { name: 'Aadhaar Card', type: 'ID Proof', uploaded: true, date: '2024-01-15' },
    { name: 'PAN Card', type: 'ID Proof', uploaded: true, date: '2024-01-15' },
    { name: 'Educational Certificates', type: 'Qualification', uploaded: true, date: '2024-01-20' },
    { name: 'Experience Certificate', type: 'Professional', uploaded: false, date: null },
    { name: 'Medical Certificate', type: 'Health', uploaded: false, date: null }
  ];

  const handleProfileUpdate = () => {
    // Handle profile update logic
    setIsEditingProfile(false);
    console.log('Profile updated:', profileForm);
  };

  const handlePasswordChange = () => {
    // Handle password change logic
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password changed');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderProfileSettings = () => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          {!isEditingProfile && (
            <Button onClick={() => setIsEditingProfile(true)} size="sm">
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isEditingProfile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-lg font-semibold">{facultyData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Faculty ID</label>
                <p className="text-lg font-semibold">{facultyData.facultyId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Department</label>
                <p className="text-lg font-semibold">{facultyData.department}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-lg font-semibold">{profileForm.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-lg font-semibold">{profileForm.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-lg font-semibold">{profileForm.address}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleProfileUpdate}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderPasswordSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full p-2 border rounded-lg pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full p-2 border rounded-lg pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <Button onClick={handlePasswordChange}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Password Requirements:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Minimum 8 characters long</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one lowercase letter</li>
            <li>• At least one number</li>
            <li>• At least one special character</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Linked Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {linkedDocuments.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-sm text-gray-600">{doc.type}</p>
                {doc.uploaded && (
                  <p className="text-xs text-green-600">Uploaded on {doc.date}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={doc.uploaded ? 'bg-green-600' : 'bg-gray-400'}>
                  {doc.uploaded ? 'Uploaded' : 'Pending'}
                </Badge>
                {doc.uploaded ? (
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Document Guidelines:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Upload clear, readable copies of documents</li>
            <li>• Supported formats: PDF, JPG, PNG (Max 5MB)</li>
            <li>• Ensure all documents are valid and up-to-date</li>
            <li>• Contact HR for document verification issues</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const settingsSections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'documents', label: 'Linked Documents', icon: Upload }
  ];

  return (
    <div className="space-y-6">
      {/* Settings Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'outline'}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Settings Content */}
      {activeSection === 'profile' && renderProfileSettings()}
      {activeSection === 'password' && renderPasswordSettings()}
      {activeSection === 'documents' && renderDocumentSettings()}

      {/* Digital ID Card Download */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-700">Digital ID Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Faculty ID Card</p>
              <p className="text-sm text-gray-600">Download your official digital ID card</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultySettings;