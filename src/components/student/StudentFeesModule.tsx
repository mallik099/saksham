import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  CreditCard, Download, Calendar, CheckCircle, 
  AlertCircle, DollarSign, Receipt, Clock 
} from 'lucide-react';

const StudentFeesModule = () => {
  const feeStructure = [
    {
      component: 'Tuition Fee',
      amount: 45000,
      status: 'Paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      receiptId: 'RCP001'
    },
    {
      component: 'Laboratory Fee',
      amount: 8000,
      status: 'Paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-12',
      receiptId: 'RCP002'
    },
    {
      component: 'Library Fee',
      amount: 2000,
      status: 'Paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-08',
      receiptId: 'RCP003'
    },
    {
      component: 'Sports Fee',
      amount: 3000,
      status: 'Due',
      dueDate: '2024-03-20',
      paidDate: null,
      receiptId: null
    },
    {
      component: 'Examination Fee',
      amount: 5000,
      status: 'Due',
      dueDate: '2024-04-15',
      paidDate: null,
      receiptId: null
    }
  ];

  const paymentHistory = [
    {
      date: '2024-01-10',
      description: 'Semester 6 Tuition Fee',
      amount: 45000,
      method: 'Online Banking',
      status: 'Success',
      receiptId: 'RCP001'
    },
    {
      date: '2024-01-12',
      description: 'Laboratory Fee - Semester 6',
      amount: 8000,
      method: 'UPI Payment',
      status: 'Success',
      receiptId: 'RCP002'
    },
    {
      date: '2024-01-08',
      description: 'Library Fee - Annual',
      amount: 2000,
      method: 'Debit Card',
      status: 'Success',
      receiptId: 'RCP003'
    }
  ];

  const totalFees = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feeStructure.filter(fee => fee.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const dueFees = totalFees - paidFees;
  const paymentProgress = (paidFees / totalFees) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Due': return 'bg-red-100 text-red-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="w-4 h-4" />;
      case 'Due': return <Clock className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleDownloadReceipt = (receiptId: string) => {
    console.log(`Downloading receipt: ${receiptId}`);
  };

  const handlePayFee = (component: string) => {
    console.log(`Initiating payment for: ${component}`);
  };

  return (
    <div className="space-y-6">
      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalFees.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{paidFees.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Due Amount</p>
                <p className="text-2xl font-bold text-red-600">₹{dueFees.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Payment Progress</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(paymentProgress)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Progress value={paymentProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Fee Structure & Payment Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Component</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Amount</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((fee, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{fee.component}</td>
                    <td className="p-3 font-bold text-blue-600">₹{fee.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge className={`${getStatusColor(fee.status)} flex items-center w-fit`}>
                        {getStatusIcon(fee.status)}
                        <span className="ml-1">{fee.status}</span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {fee.dueDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        {fee.status === 'Paid' && fee.receiptId ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(fee.receiptId!)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handlePayFee(fee.component)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Payment History
            </span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Statement
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.description}</p>
                    <p className="text-sm text-gray-600">
                      {payment.date} • {payment.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {payment.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownloadReceipt(payment.receiptId)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Payment Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 mr-2 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-red-900">Sports Fee Due</p>
                  <p className="text-xs text-red-700">Payment due by March 20, 2024. Amount: ₹3,000</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start">
                <Clock className="w-4 h-4 mt-0.5 mr-2 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Upcoming Payment</p>
                  <p className="text-xs text-yellow-700">Examination fee due by April 15, 2024. Amount: ₹5,000</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentFeesModule;