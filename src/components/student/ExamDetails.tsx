import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Clock, Plus } from 'lucide-react';

interface ExamRegistration {
  id: string;
  subject: string;
  examType: string;
  date: string;
  time: string;
  venue: string;
  status: 'registered' | 'pending' | 'completed';
}

const mockExams: ExamRegistration[] = [
  { id: '1', subject: 'Data Structures', examType: 'Semester', date: '2024-02-15', time: '10:00 AM', venue: 'Hall A', status: 'registered' },
  { id: '2', subject: 'Algorithms', examType: 'Semester', date: '2024-02-18', time: '2:00 PM', venue: 'Hall B', status: 'registered' },
  { id: '3', subject: 'Database Systems', examType: 'Makeup', date: '2024-02-20', time: '10:00 AM', venue: 'Hall C', status: 'pending' },
];

export function ExamDetails() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === 'registered').length}</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Exam Registrations</CardTitle>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Register for Exam</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{exam.subject}</p>
                  <p className="text-sm text-muted-foreground">{exam.examType} Exam</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(exam.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{exam.time}</span>
                    </div>
                    <span>Venue: {exam.venue}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}