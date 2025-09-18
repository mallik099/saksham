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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
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

        <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
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

        <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
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

        <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Reading Hours</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 p-6 h-auto flex-col">
              <BookOpen className="h-8 w-8 mb-2" />
              <span>Reserve Book</span>
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 p-6 h-auto flex-col">
              <Search className="h-8 w-8 mb-2" />
              <span>Search Catalog</span>
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 p-6 h-auto flex-col">
              <Calendar className="h-8 w-8 mb-2" />
              <span>Renew Books</span>
            </Button>
          </div>
        </CardContent>
      </Card>

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
                <div key={book.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <h4 className="font-medium text-blue-800">{book.title}</h4>
                    <p className="text-sm text-blue-600">by {book.author}</p>
                    <p className="text-xs text-blue-500">ISBN: {book.isbn}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-600">Due: {book.dueDate}</span>
                      {daysUntilDue <= 3 && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          Due in {daysUntilDue} days
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-100"
                    >
                      Renew
                    </Button>
                    <Button 
                      onClick={() => handleReturnBook(book.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Return
                    </Button>
                  </div>
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
              <div key={book.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <h4 className="font-medium text-blue-800">{book.title}</h4>
                  <p className="text-sm text-blue-600">by {book.author}</p>
                  <p className="text-xs text-blue-500">ISBN: {book.isbn}</p>
                  <Badge className={book.available > 0 ? 'bg-green-100 text-green-800 mt-2' : 'bg-red-100 text-red-800 mt-2'}>
                    {book.available} copies available
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-100"
                  >
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handleIssueBook(book.id)}
                    disabled={book.available === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    {book.available > 0 ? 'Issue' : 'Unavailable'}
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

export default StudentLibrary;