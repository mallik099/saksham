import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { CreditCard, Download, Plus, Receipt } from 'lucide-react';

const StaffFees = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

  const pendingPayments = [
    { id: 'FEE001', studentName: 'John Doe', rollNo: 'CS21001', amount: 25000, semester: '6th Semester', dueDate: '2024-03-15' },
    { id: 'FEE002', studentName: 'Jane Smith', rollNo: 'CS21002', amount: 25000, semester: '6th Semester', dueDate: '2024-03-15' },
    { id: 'FEE003', studentName: 'Mike Johnson', rollNo: 'CS21003', amount: 25000, semester: '6th Semester', dueDate: '2024-03-15' }
  ];

  const recentPayments = [
    { id: 'RCP001', studentName: 'Sarah Wilson', rollNo: 'CS21004', amount: 25000, semester: '6th Semester', paidDate: '2024-03-01', mode: 'Online' },
    { id: 'RCP002', studentName: 'David Brown', rollNo: 'CS21005', amount: 25000, semester: '6th Semester', paidDate: '2024-03-02', mode: 'Cash' },
    { id: 'RCP003', studentName: 'Lisa Davis', rollNo: 'CS21006', amount: 25000, semester: '6th Semester', paidDate: '2024-03-03', mode: 'Cheque' }
  ];

  const students = [
    { rollNo: 'CS21001', name: 'John Doe' },
    { rollNo: 'CS21002', name: 'Jane Smith' },
    { rollNo: 'CS21003', name: 'Mike Johnson' }
  ];

  const [payments, setPayments] = useState(recentPayments);

  const recordPayment = () => {
    if (!selectedStudent || !paymentAmount || !paymentMode) {
      alert('Please fill all fields');
      return;
    }

    const student = students.find(s => s.rollNo === selectedStudent);
    const newPayment = {
      id: `RCP${String(payments.length + 4).padStart(3, '0')}`,
      studentName: student?.name || '',
      rollNo: selectedStudent,
      amount: parseInt(paymentAmount),
      semester: '6th Semester',
      paidDate: new Date().toISOString().split('T')[0],
      mode: paymentMode
    };

    setPayments(prev => [newPayment, ...prev]);
    setSelectedStudent('');
    setPaymentAmount('');
    setPaymentMode('');
    alert('Payment recorded successfully!');
  };

  const generateReceipt = (payment: any) => {
    alert(`Receipt generated for ${payment.studentName} - ${payment.id}`);
  };

  const generateReport = () => {
    alert('Fee collection report generated and downloaded!');
  };

  const PaymentForm = () => (
    <div className="space-y-4">
      <Select value={selectedStudent} onValueChange={setSelectedStudent}>
        <SelectTrigger>
          <SelectValue placeholder="Select Student" />
        </SelectTrigger>
        <SelectContent>
          {students.map((student) => (
            <SelectItem key={student.rollNo} value={student.rollNo}>
              {student.rollNo} - {student.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Payment Amount"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
      />

      <Select value={paymentMode} onValueChange={setPaymentMode}>
        <SelectTrigger>
          <SelectValue placeholder="Payment Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cash">Cash</SelectItem>
          <SelectItem value="online">Online Transfer</SelectItem>
          <SelectItem value="cheque">Cheque</SelectItem>
          <SelectItem value="dd">Demand Draft</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={recordPayment} className="w-full">
        Record Payment
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Collected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ₹{pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Pending Collection</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
              <p className="text-sm text-gray-600">Payments Today</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{pendingPayments.length}</p>
              <p className="text-sm text-gray-600">Pending Students</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pending Fee Payments
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Fee Payment</DialogTitle>
                </DialogHeader>
                <PaymentForm />
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <h4 className="font-medium">{payment.studentName}</h4>
                  <p className="text-sm text-gray-600">{payment.rollNo} - {payment.semester}</p>
                  <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">₹{payment.amount.toLocaleString()}</p>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Payments
            </span>
            <Button onClick={generateReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h4 className="font-medium">{payment.studentName}</h4>
                  <p className="text-sm text-gray-600">{payment.rollNo} - {payment.semester}</p>
                  <p className="text-xs text-gray-500">Paid: {payment.paidDate} via {payment.mode}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default">Paid</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateReceipt(payment)}
                    >
                      <Receipt className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Mode Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">
                {payments.filter(p => p.mode === 'Cash').length}
              </p>
              <p className="text-sm text-gray-600">Cash Payments</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">
                {payments.filter(p => p.mode === 'Online').length}
              </p>
              <p className="text-sm text-gray-600">Online Payments</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-600">
                {payments.filter(p => p.mode === 'Cheque').length}
              </p>
              <p className="text-sm text-gray-600">Cheque Payments</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-xl font-bold text-orange-600">
                ₹{Math.round(payments.reduce((sum, p) => sum + p.amount, 0) / payments.length).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Average Payment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffFees;