import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { BookOpen, Book, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [issueData, setIssueData] = useState({
    studentId: '',
    bookId: ''
  });
  const [returnData, setReturnData] = useState({
    studentId: '',
    bookId: ''
  });

  useEffect(() => {
    fetchBooks();
    fetchStudents();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/library/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/library/issue', issueData);
      toast.success('Book issued successfully!');
      setIsIssueDialogOpen(false);
      setIssueData({ studentId: '', bookId: '' });
      fetchBooks();
    } catch (error) {
      toast.error('Error issuing book');
    }
  };

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/library/return', returnData);
      toast.success('Book returned successfully!');
      setIsReturnDialogOpen(false);
      setReturnData({ studentId: '', bookId: '' });
      fetchBooks();
    } catch (error) {
      toast.error('Error returning book');
    }
  };

  const totalBooks = books.reduce((sum: number, book: any) => sum + book.total, 0);
  const availableBooks = books.reduce((sum: number, book: any) => sum + book.available, 0);
  const issuedBooks = totalBooks - availableBooks;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Library Management</CardTitle>
          <div className="space-x-2">
            <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Issue Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Issue Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleIssue} className="space-y-4">
                  <div>
                    <Select value={issueData.studentId} onValueChange={(value) => setIssueData({ ...issueData, studentId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student: any) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.id} - {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={issueData.bookId} onValueChange={(value) => setIssueData({ ...issueData, bookId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book" />
                      </SelectTrigger>
                      <SelectContent>
                        {books.filter((book: any) => book.available > 0).map((book: any) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title} by {book.author} (Available: {book.available})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Issue Book</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Return Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Return Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReturn} className="space-y-4">
                  <div>
                    <Select value={returnData.studentId} onValueChange={(value) => setReturnData({ ...returnData, studentId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student: any) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.id} - {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={returnData.bookId} onValueChange={(value) => setReturnData({ ...returnData, bookId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book" />
                      </SelectTrigger>
                      <SelectContent>
                        {books.map((book: any) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title} by {book.author}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Return Book</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Books</p>
                  <p className="text-2xl font-bold text-blue-700">{totalBooks}</p>
                </div>
                <Book className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Available</p>
                  <p className="text-2xl font-bold text-green-700">{availableBooks}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Issued</p>
                  <p className="text-2xl font-bold text-orange-700">{issuedBooks}</p>
                </div>
                <RotateCcw className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Total Copies</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Issued</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book: any) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.total}</TableCell>
                <TableCell>{book.available}</TableCell>
                <TableCell>{book.total - book.available}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LibraryManagement;