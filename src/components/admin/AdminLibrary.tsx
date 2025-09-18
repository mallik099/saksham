import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BookOpen, Users, AlertCircle, Download } from 'lucide-react';

const AdminLibrary = () => {
  const libraryStats = {
    totalBooks: 5000,
    issuedBooks: 342,
    availableBooks: 4658,
    overdueBooks: 15
  };

  const issuedBooks = [
    { id: 1, student: 'John Doe', rollNo: 'CS21001', book: 'Data Structures', issueDate: '2024-02-15', dueDate: '2024-03-15', status: 'Active' },
    { id: 2, student: 'Jane Smith', rollNo: 'EC21002', book: 'Digital Electronics', issueDate: '2024-02-10', dueDate: '2024-03-10', status: 'Overdue' },
    { id: 3, student: 'Mike Johnson', rollNo: 'ME21003', book: 'Thermodynamics', issueDate: '2024-02-20', dueDate: '2024-03-20', status: 'Active' }
  ];

  const popularBooks = [
    { title: 'Data Structures and Algorithms', author: 'Thomas Cormen', issued: 25, available: 5 },
    { title: 'Database System Concepts', author: 'Abraham Silberschatz', issued: 18, available: 7 },
    { title: 'Computer Networks', author: 'Andrew Tanenbaum', issued: 15, available: 10 }
  ];

  const categories = [
    { name: 'Computer Science', books: 1200, issued: 150 },
    { name: 'Electronics', books: 800, issued: 95 },
    { name: 'Mechanical', books: 900, issued: 67 },
    { name: 'Mathematics', books: 600, issued: 30 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Library Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{libraryStats.totalBooks}</p>
            <p className="text-sm text-gray-600">Total Books</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{libraryStats.issuedBooks}</p>
            <p className="text-sm text-gray-600">Issued Books</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{libraryStats.availableBooks}</p>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{libraryStats.overdueBooks}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Currently Issued Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issuedBooks.map((book) => (
                <div key={book.id} className={`p-3 rounded-lg border ${
                  book.status === 'Overdue' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{book.student}</p>
                      <p className="text-sm text-gray-600">{book.rollNo}</p>
                      <p className="text-sm text-gray-600">{book.book}</p>
                      <p className="text-xs text-gray-500">Due: {book.dueDate}</p>
                    </div>
                    <Badge variant={book.status === 'Overdue' ? 'destructive' : 'default'}>
                      {book.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Popular Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularBooks.map((book, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{book.title}</h4>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-orange-600">Issued: {book.issued}</span>
                    <span className="text-green-600">Available: {book.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Category-wise Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h4 className="font-medium">{category.name}</h4>
                <div className="mt-2">
                  <p className="text-lg font-bold text-blue-600">{category.books}</p>
                  <p className="text-xs text-gray-600">Total Books</p>
                </div>
                <div className="mt-1">
                  <p className="text-sm font-medium text-orange-600">{category.issued}</p>
                  <p className="text-xs text-gray-600">Currently Issued</p>
                </div>
                <div className="mt-2">
                  <Badge variant="outline">
                    {Math.round((category.issued / category.books) * 100)}% utilization
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLibrary;