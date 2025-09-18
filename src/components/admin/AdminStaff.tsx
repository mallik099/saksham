import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Users, Plus, Search, Edit, Trash2 } from 'lucide-react';

const AdminStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staff = [
    { id: 1, empId: 'STF001', name: 'Robert Wilson', department: 'Administration', role: 'Office Manager', email: 'robert@example.com', phone: '+91 9876543210', status: 'Active' },
    { id: 2, empId: 'STF002', name: 'Lisa Anderson', department: 'Library', role: 'Librarian', email: 'lisa@example.com', phone: '+91 9876543211', status: 'Active' },
    { id: 3, empId: 'STF003', name: 'James Taylor', department: 'Maintenance', role: 'Technician', email: 'james@example.com', phone: '+91 9876543212', status: 'Active' }
  ];

  const departments = ['Administration', 'Library', 'Maintenance', 'Security', 'Transport'];
  const roles = ['Office Manager', 'Librarian', 'Technician', 'Security Guard', 'Driver'];

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddStaffForm = () => (
    <div className="space-y-4">
      <Input placeholder="Staff Name" />
      <Input placeholder="Employee ID" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map(dept => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            <SelectItem key={role} value={role}>{role}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Phone" />
      <Button className="w-full">Add Staff</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
            </DialogHeader>
            <AddStaffForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{staff.length}</p>
            <p className="text-sm text-gray-600">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{staff.filter(s => s.status === 'Active').length}</p>
            <p className="text-sm text-gray-600">Active Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{departments.length}</p>
            <p className="text-sm text-gray-600">Departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{roles.length}</p>
            <p className="text-sm text-gray-600">Different Roles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Staff Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.empId} - {member.role}</p>
                  <p className="text-sm text-gray-600">{member.department}</p>
                  <p className="text-sm text-gray-600">{member.email} | {member.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStaff;