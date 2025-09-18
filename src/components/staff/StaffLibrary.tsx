import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { BookOpen, Users, AlertCircle, Download, Check, X, Search } from 'lucide-react';

const StaffLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bookRequests = [
    { id: 'LIB001', studentName: 'John Doe', rollNo: 'CS21001', bookTitle: 'Advanced Algorithms', isbn: '978-0262033848', requestDate: '2024-03-01', status: 'Pending' },
    { id: 'LIB002', studentName: 'Jane Smith', rollNo: 'CS21002', bookTitle: 'Database Design', isbn: '978-0073523323', requestDate: '2024-03-02', status: 'Pending' },
    { id: 'LIB003', studentName: 'Mike Johnson', rollNo: 'CS21003', bookTitle: 'Software Engineering', isbn: '978-0133943030', requestDate: '2024-03-03', status: 'Approved' }
  ];

  const [requests, setRequests] = useState(bookRequests);

  const bookInventory = [
    { id: 1, title: 'Data Structures and Algorithms', author: 'Thomas Cormen', isbn: '978-0262033848', totalCopies: 10, availableCopies: 3, issuedCopies: 7 },
    { id: 2, title: 'Database System Concepts', author: 'Abraham Silberschatz', isbn: '978-0073523323', totalCopies: 8, availableCopies: 2, issuedCopies: 6 },
    { id: 3, title: 'Computer Networks', author: 'Andrew Tanenbaum', isbn: '978-0132126953', totalCopies: 12, availableCopies: 5, issuedCopies: 7 },
    { id: 4, title: 'Operating System Concepts', author: 'Abraham Silberschatz', isbn: '978-1118063330', totalCopies: 6, availableCopies: 1, issuedCopies: 5 },
    { id: 5, title: 'Software Engineering', author: 'Ian Sommerville', isbn: '978-0133943030', totalCopies: 15, availableCopies: 8, issuedCopies: 7 }
  ];

  const issuedBooks = [
    { id: 'ISS001', studentName: 'Sarah Wilson', rollNo: 'CS21004', bookTitle: 'Data Structures and Algorithms', isbn: '978-0262033848', issueDate: '2024-02-15', dueDate: '2024-03-15', status: 'Issued' },
    { id: 'ISS002', studentName: 'David Brown', rollNo: 'CS21005', bookTitle: 'Database System Concepts', isbn: '978-0073523323', issueDate: '2024-02-10', dueDate: '2024-03-10', status: 'Overdue' },
    { id: 'ISS003', studentName: 'Lisa Davis', rollNo: 'CS21006', bookTitle: 'Computer Networks', isbn: '978-0132126953', issueDate: '2024-02-20', dueDate: '2024-03-20', status: 'Issued' }
  ];

  const [issuedBooksList, setIssuedBooksList] = useState(issuedBooks);

  const approveBookRequest = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
    alert('Book request approved!');
  };

  const rejectBookRequest = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
    alert('Book request rejected.');
  };

  const markBookReturned = (id: string) => {
    setIssuedBooksList(prev => prev.map(book => 
      book.id === id ? { ...book, status: 'Returned' } : book
    ));
    alert('Book marked as returned!');
  };

  const generateFineReport = () => {
    alert('Fine report generated for overdue books!');
  };

  const exportInventory = () => {
    alert('Book inventory exported successfully!');
  };

  const filteredInventory = bookInventory.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const overdueBooks = issuedBooksList.filter(book => book.status === 'Overdue');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {bookInventory.reduce((sum, book) => sum + book.totalCopies, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Books</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {bookInventory.reduce((sum, book) => sum + book.availableCopies, 0)}
              </p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {bookInventory.reduce((sum, book) => sum + book.issuedCopies, 0)}
              </p>
              <p className="text-sm text-gray-600">Issued</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{overdueBooks.length}</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Book Issue Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book Issue Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{request.studentName}</h4>
                  <p className="text-sm text-gray-600">{request.rollNo}</p>
                  <p className="text-sm font-medium">{request.bookTitle}</p>
                  <p className="text-xs text-gray-500">ISBN: {request.isbn}</p>
                  <p className="text-xs text-gray-500">Requested: {request.requestDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    request.status === 'Approved' ? 'default' : 
                    request.status === 'Rejected' ? 'destructive' : 'secondary'
                  }>
                    {request.status}
                  </Badge>
                  {request.status === 'Pending' && (
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        onClick={() => approveBookRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => rejectBookRequest(request.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Currently Issued Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Currently Issued Books
            </span>
            <Button onClick={generateFineReport} variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Generate Fine Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issuedBooksList.map((book) => (
              <div key={book.id} className={`p-4 border rounded-lg ${
                book.status === 'Overdue' ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{book.studentName}</h4>
                    <p className="text-sm text-gray-600">{book.rollNo}</p>
                    <p className="text-sm font-medium">{book.bookTitle}</p>
                    <p className="text-xs text-gray-500">
                      Issued: {book.issueDate} | Due: {book.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={book.status === 'Overdue' ? 'destructive' : 'default'}>
                      {book.status}
                    </Badge>
                    {book.status !== 'Returned' && (
                      <Button 
                        size="sm" 
                        onClick={() => markBookReturned(book.id)}
                        variant="outline"
                      >
                        Mark Returned
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Book Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Book Inventory
            </span>
            <Button onClick={exportInventory} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Inventory
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search books by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-4">
            {filteredInventory.map((book) => (
              <div key={book.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                  </div>
                  <div className="text-right">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{book.totalCopies}</p>
                        <p className="text-xs text-gray-600">Total</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-green-600">{book.availableCopies}</p>
                        <p className="text-xs text-gray-600">Available</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-orange-600">{book.issuedCopies}</p>
                        <p className="text-xs text-gray-600">Issued</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffLibrary;