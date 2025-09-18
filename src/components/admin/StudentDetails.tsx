import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Phone, Mail, MapPin } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  section: string;
  class: string;
  email: string;
  phone: string;
  address: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  hostelRoom?: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rollNo: '21CSE001',
    section: 'A',
    class: 'CSE-A',
    email: 'rahul@student.edu',
    phone: '+91-9876543212',
    address: 'Mumbai, Maharashtra',
    feeStatus: 'paid',
    hostelRoom: 'A-204'
  },
  {
    id: '2',
    name: 'Priya Patel',
    rollNo: '21CSE002',
    section: 'A',
    class: 'CSE-A',
    email: 'priya@student.edu',
    phone: '+91-9876543213',
    address: 'Delhi, Delhi',
    feeStatus: 'pending',
    hostelRoom: 'B-105'
  }
];

export function StudentDetails() {
  const [students] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, roll number, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Students List ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNo} - {student.class}</p>
                  </div>
                  <Badge className={getStatusColor(student.feeStatus)}>
                    {student.feeStatus}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedStudent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Student Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                <p className="text-muted-foreground">{selectedStudent.rollNo}</p>
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedStudent.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-sm text-muted-foreground">{selectedStudent.class}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Section</p>
                  <p className="text-sm text-muted-foreground">{selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fee Status</p>
                  <Badge className={getStatusColor(selectedStudent.feeStatus)}>
                    {selectedStudent.feeStatus}
                  </Badge>
                </div>
                {selectedStudent.hostelRoom && (
                  <div>
                    <p className="text-sm font-medium">Hostel Room</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.hostelRoom}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}