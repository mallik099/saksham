import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  BookOpen, Calendar, Clock, AlertCircle, 
  MessageSquare, Star, CheckCircle, XCircle 
} from 'lucide-react';

const StudentLibraryModule = () => {
  const [feedback, setFeedback] = useState('');

  const borrowedBooks = [
    {
      id: 1,
      bookName: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      issueDate: '2024-02-15',
      dueDate: '2024-03-15',
      status: 'Active',
      renewCount: 1
    },
    {
      id: 2,
      bookName: 'Computer Networks',
      author: 'Andrew S. Tanenbaum',
      issueDate: '2024-02-20',
      dueDate: '2024-03-20',
      status: 'Active',
      renewCount: 0
    },
    {
      id: 3,
      bookName: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      issueDate: '2024-01-10',
      dueDate: '2024-03-10',
      status: 'Overdue',
      renewCount: 2
    },
    {
      id: 4,
      bookName: 'Database System Concepts',
      author: 'Henry F. Korth',
      issueDate: '2024-01-25',
      dueDate: '2024-02-25',
      status: 'Returned',
      returnDate: '2024-02-23',
      renewCount: 0
    }
  ];

  const libraryStats = {
    totalBorrowed: 15,
    currentlyBorrowed: 3,
    overdue: 1,
    fineAmount: 50
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Returned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      case 'Returned': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  const handleRenewBook = (bookId: number) => {
    console.log(`Renewing book with ID: ${bookId}`);
  };

  return (
    <div className="space-y-6">
      {/* Library Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">{libraryStats.totalBorrowed}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Currently Borrowed</p>
                <p className="text-2xl font-bold text-green-600">{libraryStats.currentlyBorrowed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                <p className="text-2xl font-bold text-red-600">{libraryStats.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fine Amount</p>
                <p className="text-2xl font-bold text-orange-600">₹{libraryStats.fineAmount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Borrowed Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Borrowed Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Book Name</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Author</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Issue Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{book.bookName}</td>
                    <td className="p-3 text-gray-600">{book.author}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {book.issueDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-red-500" />
                        {book.dueDate}
                        {book.status === 'Active' && (
                          <span className={`ml-2 text-xs ${
                            getDaysRemaining(book.dueDate) < 0 ? 'text-red-600' :
                            getDaysRemaining(book.dueDate) <= 3 ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            ({getDaysRemaining(book.dueDate)} days)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={`${getStatusColor(book.status)} flex items-center w-fit`}>
                        {getStatusIcon(book.status)}
                        <span className="ml-1">{book.status}</span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      {book.status === 'Active' && book.renewCount < 2 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRenewBook(book.id)}
                        >
                          Renew
                        </Button>
                      )}
                      {book.status === 'Overdue' && (
                        <Badge variant="destructive" className="text-xs">
                          Pay Fine
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Library Services & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Library Services Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Rate Our Services</h4>
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Textarea
                  placeholder="Share your feedback about library services..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mb-3"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Library Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Rate your experience:</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 text-yellow-400 fill-current cursor-pointer" />
                          ))}
                        </div>
                      </div>
                      <Textarea
                        placeholder="Your detailed feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <Button onClick={handleSubmitFeedback} className="w-full">
                        Submit Feedback
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Library Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-900">Library Hours</p>
                <p className="text-sm text-green-700">Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p className="text-sm text-green-700">Saturday: 9:00 AM - 5:00 PM</p>
                <p className="text-sm text-green-700">Sunday: Closed</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Borrowing Rules</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Maximum 5 books at a time</li>
                  <li>• 30 days borrowing period</li>
                  <li>• Maximum 2 renewals per book</li>
                  <li>• ₹5 per day fine for overdue books</li>
                </ul>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Digital Resources</p>
                <ul className="text-sm text-purple-700 mt-1 space-y-1">
                  <li>• Online journals and databases</li>
                  <li>• E-books collection</li>
                  <li>• Research paper access</li>
                  <li>• Digital library portal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Library Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Book Issued</p>
                  <p className="text-sm text-blue-700">Computer Networks - Feb 20, 2024</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">New</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Book Returned</p>
                  <p className="text-sm text-green-700">Database System Concepts - Feb 23, 2024</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">Book Renewed</p>
                  <p className="text-sm text-yellow-700">Data Structures and Algorithms - Feb 15, 2024</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Renewed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLibraryModule;