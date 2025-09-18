import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DollarSign, Receipt, Download } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const FeeManagement = () => {
  const [students, setStudents] = useState([]);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    studentId: '',
    amount: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/fees/payment', {
        studentId: paymentData.studentId,
        amount: parseInt(paymentData.amount)
      });
      
      toast.success('Payment processed successfully!');
      setIsPaymentDialogOpen(false);
      setPaymentData({ studentId: '', amount: '' });
      
      // Generate receipt
      generateReceipt(response.data);
    } catch (error) {
      toast.error('Error processing payment');
    }
  };

  const generateReceipt = (receiptData: any) => {
    const receiptContent = `
      CAMPUSFLOW ERP - FEE RECEIPT
      ============================
      Receipt No: ${receiptData.receiptNumber}
      Date: ${receiptData.date}
      Student ID: ${receiptData.studentId}
      Amount Paid: ₹${receiptData.amount}
      
      Thank you for your payment!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptData.receiptNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Fee Management</CardTitle>
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Fee Payment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <Label htmlFor="studentId">Student</Label>
                  <Select value={paymentData.studentId} onValueChange={(value) => setPaymentData({ ...paymentData, studentId: value })}>
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
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Process Payment</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Total Collected</p>
                  <p className="text-2xl font-bold text-green-700">₹75,000</p>
                </div>
                <Receipt className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-700">₹20,000</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Students</p>
                  <p className="text-2xl font-bold text-blue-700">{students.length}</p>
                </div>
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Total Fee</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>₹50,000</TableCell>
                <TableCell>₹30,000</TableCell>
                <TableCell>₹20,000</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                    Partial
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeeManagement;