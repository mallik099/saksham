import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Users, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { validateForm, commonRules, ValidationRules } from '../../utils/formValidation';

const AdminStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNo: 'CS21001', course: 'Computer Science', email: 'john@example.com', phone: '+91-9876543210' },
    { id: 2, name: 'Jane Smith', rollNo: 'EC21002', course: 'Electronics', email: 'jane@example.com', phone: '+91-9876543211' },
    { id: 3, name: 'Mike Johnson', rollNo: 'ME21003', course: 'Mechanical', email: 'mike@example.com', phone: '+91-9876543212' }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    rollNo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validationRules: ValidationRules = {
    name: commonRules.name,
    email: commonRules.email,
    phone: commonRules.phone,
    course: { required: true, message: 'Course is required' },
    rollNo: { required: true, minLength: 6, message: 'Roll number must be at least 6 characters' }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newStudent = {
        id: students.length + 1,
        ...formData
      };
      
      setStudents(prev => [...prev, newStudent]);
      setFormData({ name: '', email: '', phone: '', course: '', rollNo: '' });
      setIsDialogOpen(false);
      toast.success('Student added successfully!');
    } catch (error) {
      toast.error('Failed to add student');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-600">Active Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">4</p>
            <p className="text-sm text-gray-600">Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">6</p>
            <p className="text-sm text-gray-600">Semesters</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Students
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                      <SelectTrigger className={errors.course ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      value={formData.rollNo}
                      onChange={(e) => handleInputChange('rollNo', e.target.value)}
                      className={errors.rollNo ? 'border-red-500' : ''}
                    />
                    {errors.rollNo && <p className="text-xs text-red-500 mt-1">{errors.rollNo}</p>}
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Student'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.rollNo} - {student.course}</p>
                  <p className="text-xs text-gray-500">{student.email} | {student.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStudents;