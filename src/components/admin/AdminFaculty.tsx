import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { GraduationCap, Plus, Search, Edit, Trash2 } from 'lucide-react';

const AdminFaculty = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faculty = [
    { id: 1, empId: 'FAC001', name: 'Dr. Sarah Johnson', department: 'Computer Science', designation: 'Professor', email: 'sarah@example.com', phone: '+91 9876543210', subjects: ['Data Structures', 'Algorithms'] },
    { id: 2, empId: 'FAC002', name: 'Prof. Michael Brown', department: 'Electronics', designation: 'Associate Professor', email: 'michael@example.com', phone: '+91 9876543211', subjects: ['Digital Electronics', 'Microprocessors'] },
    { id: 3, empId: 'FAC003', name: 'Dr. Emily Davis', department: 'Mechanical', designation: 'Assistant Professor', email: 'emily@example.com', phone: '+91 9876543212', subjects: ['Thermodynamics', 'Fluid Mechanics'] }
  ];

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];
  const designations = ['Professor', 'Associate Professor', 'Assistant Professor'];

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddFacultyForm = () => (
    <div className="space-y-4">
      <Input placeholder="Faculty Name" />
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
          <SelectValue placeholder="Select Designation" />
        </SelectTrigger>
        <SelectContent>
          {designations.map(des => (
            <SelectItem key={des} value={des}>{des}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Phone" />
      <Button className="w-full">Add Faculty</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Faculty Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
            </DialogHeader>
            <AddFacultyForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{faculty.length}</p>
            <p className="text-sm text-gray-600">Total Faculty</p>
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
            <p className="text-2xl font-bold text-purple-600">{faculty.filter(f => f.designation === 'Professor').length}</p>
            <p className="text-sm text-gray-600">Professors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{faculty.reduce((sum, f) => sum + f.subjects.length, 0)}</p>
            <p className="text-sm text-gray-600">Subjects Taught</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            All Faculty Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {filteredFaculty.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.empId} - {member.designation}</p>
                  <p className="text-sm text-gray-600">{member.department}</p>
                  <p className="text-sm text-gray-600">{member.email} | {member.phone}</p>
                  <div className="flex gap-1 mt-2">
                    {member.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
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

export default AdminFaculty;