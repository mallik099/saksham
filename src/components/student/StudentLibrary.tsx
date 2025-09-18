import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { BookOpen, Search, Calendar, AlertCircle } from 'lucide-react';

interface StudentLibraryProps {
  studentData: any;
}

const StudentLibrary: React.FC<StudentLibraryProps> = ({ studentData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const issuedBooks = [
    { 
      id: 1, 
      title: 'Data Structures and Algorithms', 
      author: 'Thomas Cormen', 
      issueDate: '2024-02-15', 
      dueDate: '2024-03-15',
      isbn: '978-0262033848'
    },
    { 
      id: 2, 
      title: 'Database System Concepts', 
      author: 'Abraham Silberschatz', 
      issueDate: '2024-02-20', 
      dueDate: '2024-03-20',
      isbn: '978-0073523323'
    }
  ];

  const availableBooks = [
    { 
      id: 3, 
      title: 'Computer Networks', 
      author: 'Andrew Tanenbaum', 
      available: 5,
      isbn: '978-0132126953'
    },
    { 
      id: 4, 
      title: 'Operating System Concepts', 
      author: 'Abraham Silberschatz', 
      available: 3,
      isbn: '978-1118063330'
    },
    { 
      id: 5, 
      title: 'Software Engineering', 
      author: 'Ian Sommerville', 
      available: 7,
      isbn: '978-0133943030'
    },
    { 
      id: 6, 
      title: 'Computer Graphics', 
      author: 'Donald Hearn', 
      available: 2,
      isbn: '978-0130153906'
    }
  ];

  const filteredBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueBook = (bookId: number) => {
    alert(`Book issue request submitted for Book ID: ${bookId}. This is a demo.`);
  };

  const handleReturnBook = (bookId: number) => {
    alert(`Book return request submitted for Book ID: ${bookId}. This is a demo.`);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Books Issued</p>
                <p className="text-2xl font-bold">{issuedBooks.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Available Books</p>
                <p className="text-2xl font-bold">{availableBooks.reduce((sum, book) => sum + book.available, 0)}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Due Soon</p>
                <p className="text-2xl font-bold">
                  {issuedBooks.filter(book => getDaysUntilDue(book.dueDate) <= 3).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Currently Issued Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Currently Issued Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issuedBooks.map((book) => {
              const daysUntilDue = getDaysUntilDue(book.dueDate);
              return (
                <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Due: {book.dueDate}</span>
                      {daysUntilDue <= 3 && (
                        <Badge variant="destructive" className="text-xs">
                          Due in {daysUntilDue} days
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleReturnBook(book.id)}
                    variant="outline"
                  >
                    Return Book
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Book Catalog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Book Catalog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                  <Badge variant="secondary" className="mt-2">
                    {book.available} copies available
                  </Badge>
                </div>
                <Button 
                  onClick={() => handleIssueBook(book.id)}
                  disabled={book.available === 0}
                >
                  {book.available > 0 ? 'Issue Book' : 'Not Available'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLibrary;