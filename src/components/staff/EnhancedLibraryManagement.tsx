import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BookOpen, Users, AlertCircle, Download, Check, X, Search, Plus,
  BarChart3, TrendingUp, Calendar, Clock, Star, Award, Filter,
  Scan, Bell, FileText, Database, Eye, Edit, Trash2, RefreshCw
} from 'lucide-react';

const EnhancedLibraryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [bookInventory, setBookInventory] = useState([
    { 
      id: 1, 
      title: 'Data Structures and Algorithms', 
      author: 'Thomas Cormen', 
      isbn: '978-0262033848', 
      category: 'Computer Science',
      publisher: 'MIT Press',
      edition: '3rd Edition',
      publicationYear: 2009,
      totalCopies: 15, 
      availableCopies: 8, 
      issuedCopies: 7,
      reservedCopies: 2,
      location: 'CS-A-001',
      price: 4500,
      rating: 4.8,
      popularity: 95
    },
    { 
      id: 2, 
      title: 'Database System Concepts', 
      author: 'Abraham Silberschatz', 
      isbn: '978-0073523323', 
      category: 'Computer Science',
      publisher: 'McGraw-Hill',
      edition: '7th Edition',
      publicationYear: 2019,
      totalCopies: 12, 
      availableCopies: 5, 
      issuedCopies: 7,
      reservedCopies: 1,
      location: 'CS-B-002',
      price: 3800,
      rating: 4.6,
      popularity: 88
    },
    { 
      id: 3, 
      title: 'Computer Networks', 
      author: 'Andrew Tanenbaum', 
      isbn: '978-0132126953', 
      category: 'Computer Science',
      publisher: 'Pearson',
      edition: '5th Edition',
      publicationYear: 2020,
      totalCopies: 18, 
      availableCopies: 12, 
      issuedCopies: 6,
      reservedCopies: 0,
      location: 'CS-C-003',
      price: 4200,
      rating: 4.7,
      popularity: 82
    },
    { 
      id: 4, 
      title: 'Engineering Mathematics', 
      author: 'B.S. Grewal', 
      isbn: '978-8193332672', 
      category: 'Mathematics',
      publisher: 'Khanna Publishers',
      edition: '44th Edition',
      publicationYear: 2021,
      totalCopies: 25, 
      availableCopies: 18, 
      issuedCopies: 7,
      reservedCopies: 3,
      location: 'MATH-A-001',
      price: 2800,
      rating: 4.5,
      popularity: 90
    },
    { 
      id: 5, 
      title: 'Digital Electronics', 
      author: 'Morris Mano', 
      isbn: '978-0132543262', 
      category: 'Electronics',
      publisher: 'Pearson',
      edition: '5th Edition',
      publicationYear: 2018,
      totalCopies: 20, 
      availableCopies: 14, 
      issuedCopies: 6,
      reservedCopies: 1,
      location: 'EC-A-001',
      price: 3500,
      rating: 4.4,
      popularity: 75
    }
  ]);

  const [issuedBooks, setIssuedBooks] = useState([
    { 
      id: 'ISS001', 
      studentName: 'Sarah Wilson', 
      rollNo: 'CS21004', 
      course: 'Computer Science',
      year: '3rd Year',
      bookTitle: 'Data Structures and Algorithms', 
      isbn: '978-0262033848', 
      issueDate: '2024-02-15', 
      dueDate: '2024-03-15', 
      status: 'Issued',
      renewalCount: 1,
      fineAmount: 0,
      studentPhone: '+91 9876543201',
      studentEmail: 'sarah.wilson@college.edu'
    },
    { 
      id: 'ISS002', 
      studentName: 'David Brown', 
      rollNo: 'CS21005', 
      course: 'Computer Science',
      year: '2nd Year',
      bookTitle: 'Database System Concepts', 
      isbn: '978-0073523323', 
      issueDate: '2024-02-10', 
      dueDate: '2024-03-10', 
      status: 'Overdue',
      renewalCount: 0,
      fineAmount: 50,
      studentPhone: '+91 9876543202',
      studentEmail: 'david.brown@college.edu'
    },
    { 
      id: 'ISS003', 
      studentName: 'Lisa Davis', 
      rollNo: 'EC21006', 
      course: 'Electronics',
      year: '4th Year',
      bookTitle: 'Digital Electronics', 
      isbn: '978-0132543262', 
      issueDate: '2024-02-20', 
      dueDate: '2024-03-20', 
      status: 'Issued',
      renewalCount: 0,
      fineAmount: 0,
      studentPhone: '+91 9876543203',
      studentEmail: 'lisa.davis@college.edu'
    }
  ]);

  const [bookRequests, setBookRequests] = useState([
    { 
      id: 'REQ001', 
      studentName: 'John Doe', 
      rollNo: 'CS21001', 
      course: 'Computer Science',
      year: '2nd Year',
      bookTitle: 'Advanced Algorithms', 
      isbn: '978-0262033848', 
      requestDate: '2024-03-01', 
      status: 'Pending',
      priority: 'High',
      requestType: 'Issue',
      studentPhone: '+91 9876543204',
      studentEmail: 'john.doe@college.edu'
    },
    { 
      id: 'REQ002', 
      studentName: 'Jane Smith', 
      rollNo: 'CS21002', 
      course: 'Computer Science',
      year: '3rd Year',
      bookTitle: 'Machine Learning Basics', 
      isbn: '978-0073523323', 
      requestDate: '2024-03-02', 
      status: 'Pending',
      priority: 'Medium',
      requestType: 'Reserve',
      studentPhone: '+91 9876543205',
      studentEmail: 'jane.smith@college.edu'
    }
  ]);

  const [digitalResources, setDigitalResources] = useState([
    { id: 'DR001', title: 'IEEE Digital Library', type: 'Database', subscribers: 1250, usage: 'High', cost: 50000 },
    { id: 'DR002', title: 'ACM Digital Library', type: 'Database', subscribers: 980, usage: 'Medium', cost: 35000 },
    { id: 'DR003', title: 'Springer eBooks', type: 'eBook Collection', subscribers: 1500, usage: 'High', cost: 75000 },
    { id: 'DR004', title: 'Nature Journals', type: 'Journal', subscribers: 650, usage: 'Low', cost: 25000 }
  ]);

  const categories = ['all', 'Computer Science', 'Mathematics', 'Electronics', 'Mechanical', 'Physics', 'Chemistry'];

  const filteredInventory = bookInventory.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const approveBookRequest = (id: string) => {
    setBookRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
    alert('Book request approved and notification sent to student!');
  };

  const rejectBookRequest = (id: string) => {
    setBookRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
    alert('Book request rejected with reason notification sent.');
  };

  const renewBook = (id: string) => {
    setIssuedBooks(prev => prev.map(book => 
      book.id === id ? { 
        ...book, 
        renewalCount: book.renewalCount + 1,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      } : book
    ));
    alert('Book renewed successfully! New due date assigned.');
  };

  const markBookReturned = (id: string) => {
    setIssuedBooks(prev => prev.map(book => 
      book.id === id ? { ...book, status: 'Returned' } : book
    ));
    alert('Book marked as returned and inventory updated!');
  };

  const sendFineNotification = (student: any) => {
    alert(`Fine notification sent to ${student.studentName}\nAmount: ₹${student.fineAmount}\nContact: ${student.studentPhone}`);
  };

  const generateLibraryReport = () => {
    const totalBooks = bookInventory.reduce((sum, book) => sum + book.totalCopies, 0);
    const issuedCount = bookInventory.reduce((sum, book) => sum + book.issuedCopies, 0);
    const overdueCount = issuedBooks.filter(book => book.status === 'Overdue').length;
    const totalFines = issuedBooks.reduce((sum, book) => sum + book.fineAmount, 0);
    
    alert(`Library Management Report:\n\nTotal Books: ${totalBooks}\nCurrently Issued: ${issuedCount}\nOverdue Books: ${overdueCount}\nTotal Fines: ₹${totalFines}\nMost Popular: ${bookInventory.sort((a, b) => b.popularity - a.popularity)[0].title}`);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Books</p>
                <p className="text-2xl font-bold text-blue-900">
                  {bookInventory.reduce((sum, book) => sum + book.totalCopies, 0)}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Available</p>
                <p className="text-2xl font-bold text-green-900">
                  {bookInventory.reduce((sum, book) => sum + book.availableCopies, 0)}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Issued</p>
                <p className="text-2xl font-bold text-orange-900">
                  {bookInventory.reduce((sum, book) => sum + book.issuedCopies, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Overdue</p>
                <p className="text-2xl font-bold text-red-900">
                  {issuedBooks.filter(book => book.status === 'Overdue').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Pending Requests</p>
                <p className="text-2xl font-bold text-purple-900">
                  {bookRequests.filter(req => req.status === 'Pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="issued">Issued Books</TabsTrigger>
          <TabsTrigger value="digital">Digital Resources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Book Inventory Management
                </span>
                <div className="flex gap-2">
                  <Button onClick={generateLibraryReport} variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
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
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredInventory.map((book) => (
                  <div key={book.id} className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-900">{book.title}</h4>
                          <Badge variant="outline">{book.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <p><strong>Author:</strong> {book.author}</p>
                          <p><strong>ISBN:</strong> {book.isbn}</p>
                          <p><strong>Publisher:</strong> {book.publisher}</p>
                          <p><strong>Edition:</strong> {book.edition}</p>
                          <p><strong>Year:</strong> {book.publicationYear}</p>
                          <p><strong>Location:</strong> {book.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-blue-600">{book.totalCopies}</p>
                        <p className="text-xs text-gray-600">Total Copies</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-600">{book.availableCopies}</p>
                        <p className="text-xs text-gray-600">Available</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-orange-600">{book.issuedCopies}</p>
                        <p className="text-xs text-gray-600">Issued</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-purple-600">{book.reservedCopies}</p>
                        <p className="text-xs text-gray-600">Reserved</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-yellow-600">{book.popularity}%</p>
                        <p className="text-xs text-gray-600">Popularity</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Price: ₹{book.price}</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">High Demand</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Issue Book</Button>
                        <Button size="sm" variant="outline">Reserve</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Book Issue & Reservation Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold">{request.studentName}</h4>
                          <Badge variant="outline">{request.course}</Badge>
                          <Badge variant={request.priority === 'High' ? 'destructive' : 'secondary'}>
                            {request.priority} Priority
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <p><strong>Roll No:</strong> {request.rollNo}</p>
                          <p><strong>Year:</strong> {request.year}</p>
                          <p><strong>Book:</strong> {request.bookTitle}</p>
                          <p><strong>ISBN:</strong> {request.isbn}</p>
                          <p><strong>Request Type:</strong> {request.requestType}</p>
                          <p><strong>Date:</strong> {request.requestDate}</p>
                        </div>
                      </div>
                      <Badge variant={
                        request.status === 'Approved' ? 'default' : 
                        request.status === 'Rejected' ? 'destructive' : 'secondary'
                      }>
                        {request.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📞 {request.studentPhone}</span>
                        <span>📧 {request.studentEmail}</span>
                      </div>
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => approveBookRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => rejectBookRequest(request.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4 mr-1" />
                            Notify
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Currently Issued Books
                </span>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuedBooks.map((book) => (
                  <div key={book.id} className={`border rounded-lg p-6 ${
                    book.status === 'Overdue' ? 'border-red-200 bg-red-50' : 'bg-gradient-to-r from-gray-50 to-white'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold">{book.studentName}</h4>
                          <Badge variant="outline">{book.course}</Badge>
                          <Badge variant={book.status === 'Overdue' ? 'destructive' : 'default'}>
                            {book.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <p><strong>Roll No:</strong> {book.rollNo}</p>
                          <p><strong>Year:</strong> {book.year}</p>
                          <p><strong>Book:</strong> {book.bookTitle}</p>
                          <p><strong>Issue Date:</strong> {book.issueDate}</p>
                          <p><strong>Due Date:</strong> {book.dueDate}</p>
                          <p><strong>Renewals:</strong> {book.renewalCount}/2</p>
                        </div>
                      </div>
                      {book.fineAmount > 0 && (
                        <div className="text-right">
                          <p className="text-red-600 font-bold">Fine: ₹{book.fineAmount}</p>
                          <Button size="sm" variant="outline" onClick={() => sendFineNotification(book)}>
                            Send Notice
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📞 {book.studentPhone}</span>
                        <span>📧 {book.studentEmail}</span>
                      </div>
                      {book.status !== 'Returned' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => markBookReturned(book.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Mark Returned
                          </Button>
                          {book.renewalCount < 2 && (
                            <Button size="sm" variant="outline" onClick={() => renewBook(book.id)}>
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Renew
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4 mr-1" />
                            Remind
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Digital Resources & Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {digitalResources.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.type}</p>
                      </div>
                      <Badge variant={
                        resource.usage === 'High' ? 'default' : 
                        resource.usage === 'Medium' ? 'secondary' : 'outline'
                      }>
                        {resource.usage} Usage
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subscribers:</span>
                        <span className="font-medium">{resource.subscribers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Annual Cost:</span>
                        <span className="font-medium">₹{resource.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Cost per User:</span>
                        <span className="font-medium">₹{Math.round(resource.cost / resource.subscribers)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">Access Portal</Button>
                      <Button size="sm" variant="outline">Usage Stats</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Library Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Most Popular Books</h4>
                  {bookInventory
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 5)
                    .map((book, index) => (
                    <div key={book.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{book.popularity}%</p>
                        <p className="text-xs text-gray-600">{book.issuedCopies} issued</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Category Distribution</h4>
                  <div className="space-y-3">
                    {categories.slice(1).map((category) => {
                      const categoryBooks = bookInventory.filter(book => book.category === category);
                      const totalBooks = categoryBooks.reduce((sum, book) => sum + book.totalCopies, 0);
                      const issuedBooks = categoryBooks.reduce((sum, book) => sum + book.issuedCopies, 0);
                      const percentage = totalBooks > 0 ? Math.round((issuedBooks / totalBooks) * 100) : 0;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span>{issuedBooks}/{totalBooks} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-gray-600">Circulation Rate</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">4.6</p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">₹2.8L</p>
                  <p className="text-sm text-gray-600">Collection Value</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">1,250</p>
                  <p className="text-sm text-gray-600">Active Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Library Reports & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Standard Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Daily Circulation Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Overdue Books Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Fine Collection Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Popular Books Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Inventory Status Report
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Analytics Reports</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Usage Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trend Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Top Performers
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Monthly Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Digital Resources Report
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-bold">Today's Issues: 23</p>
                    <p className="text-gray-600">Returns: 18</p>
                  </div>
                  <div>
                    <p className="font-bold">New Members: 5</p>
                    <p className="text-gray-600">This week</p>
                  </div>
                  <div>
                    <p className="font-bold">Fines Collected: ₹850</p>
                    <p className="text-gray-600">This month</p>
                  </div>
                  <div>
                    <p className="font-bold">Reservations: 12</p>
                    <p className="text-gray-600">Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLibraryManagement;