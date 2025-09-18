import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckCircle, Plus } from 'lucide-react';

interface BookIssue {
  id: string;
  studentName: string;
  rollNo: string;
  bookTitle: string;
  issueDate: string;
  dueDate: string;
  status: 'issued' | 'overdue' | 'returned';
}

const mockBooks: BookIssue[] = [
  { id: '1', studentName: 'Rahul Sharma', rollNo: '21CSE001', bookTitle: 'Data Structures', issueDate: '2024-01-15', dueDate: '2024-01-29', status: 'issued' },
  { id: '2', studentName: 'Priya Patel', rollNo: '21CSE002', bookTitle: 'Algorithms', issueDate: '2024-01-10', dueDate: '2024-01-24', status: 'overdue' },
  { id: '3', studentName: 'Amit Kumar', rollNo: '21ECE001', bookTitle: 'Digital Electronics', issueDate: '2024-01-20', dueDate: '2024-02-03', status: 'returned' },
];

export function LibraryManagement() {
  const [books] = useState(mockBooks);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{books.filter(b => b.status === 'issued').length}</p>
                <p className="text-sm text-muted-foreground">Books Issued</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{books.filter(b => b.status === 'overdue').length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{books.filter(b => b.status === 'returned').length}</p>
                <p className="text-sm text-muted-foreground">Returned Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Book Issues</CardTitle>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Issue Book</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{book.studentName}</p>
                  <p className="text-sm text-muted-foreground">{book.rollNo} - {book.bookTitle}</p>
                  <p className="text-xs text-muted-foreground">Due: {new Date(book.dueDate).toLocaleDateString('en-IN')}</p>
                </div>
                <Badge className={getStatusColor(book.status)}>{book.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}