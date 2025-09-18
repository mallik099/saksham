import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  CreditCard, DollarSign, Calendar, Receipt, 
  AlertTriangle, CheckCircle, Clock, Download,
  TrendingUp, PieChart, FileText, Wallet,
  ArrowUpRight, ArrowDownRight, Filter
} from 'lucide-react';

const ParentFees = () => {
  const [selectedYear, setSelectedYear] = useState('2023-24');
  const [paymentMethod, setPaymentMethod] = useState('online');

  const feeOverview = {
    totalFeeForYear: 125000,
    paidAmount: 95000,
    pendingAmount: 30000,
    nextDueDate: '2024-04-15',
    paymentStatus: 'partial',
    scholarshipAmount: 15000,
    discountAmount: 5000
  };

  const feeStructure = [
    {
      category: 'Tuition Fee',
      amount: 80000,
      paid: 60000,
      pending: 20000,
      dueDate: '2024-04-15',
      status: 'partial',
      description: 'Academic year tuition fees'
    },
    {
      category: 'Hostel Fee',
      amount: 25000,
      paid: 25000,
      pending: 0,
      dueDate: '2024-03-15',
      status: 'paid',
      description: 'Accommodation and mess charges'
    },
    {
      category: 'Library Fee',
      amount: 3000,
      paid: 3000,
      pending: 0,
      dueDate: '2024-01-15',
      status: 'paid',
      description: 'Library access and book charges'
    },
    {
      category: 'Lab Fee',
      amount: 8000,
      paid: 5000,
      pending: 3000,
      dueDate: '2024-04-15',
      status: 'partial',
      description: 'Laboratory equipment and materials'
    },
    {
      category: 'Sports Fee',
      amount: 2000,
      paid: 2000,
      pending: 0,
      dueDate: '2024-02-15',
      status: 'paid',
      description: 'Sports facilities and equipment'
    },
    {
      category: 'Development Fee',
      amount: 7000,
      paid: 0,
      pending: 7000,
      dueDate: '2024-05-15',
      status: 'pending',
      description: 'Infrastructure development charges'
    }
  ];

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-03-15',
      amount: 25000,
      category: 'Hostel Fee',
      method: 'Online Banking',
      status: 'completed',
      transactionId: 'TXN123456789',
      receipt: 'RCP001'
    },
    {
      id: 'PAY002',
      date: '2024-02-15',
      amount: 40000,
      category: 'Tuition Fee',
      method: 'Credit Card',
      status: 'completed',
      transactionId: 'TXN123456788',
      receipt: 'RCP002'
    },
    {
      id: 'PAY003',
      date: '2024-01-15',
      amount: 15000,
      category: 'Multiple Categories',
      method: 'UPI',
      status: 'completed',
      transactionId: 'TXN123456787',
      receipt: 'RCP003'
    },
    {
      id: 'PAY004',
      date: '2024-01-10',
      amount: 20000,
      category: 'Tuition Fee',
      method: 'Bank Transfer',
      status: 'completed',
      transactionId: 'TXN123456786',
      receipt: 'RCP004'
    }
  ];

  const scholarshipsAndDiscounts = [
    {
      name: 'Merit Scholarship',
      amount: 10000,
      type: 'scholarship',
      status: 'active',
      validUntil: '2024-12-31',
      description: 'Based on academic performance'
    },
    {
      name: 'Sports Scholarship',
      amount: 5000,
      type: 'scholarship',
      status: 'active',
      validUntil: '2024-12-31',
      description: 'For excellence in basketball'
    },
    {
      name: 'Early Payment Discount',
      amount: 3000,
      type: 'discount',
      status: 'applied',
      validUntil: '2024-04-01',
      description: '5% discount for early payment'
    },
    {
      name: 'Sibling Discount',
      amount: 2000,
      type: 'discount',
      status: 'active',
      validUntil: '2024-12-31',
      description: 'Discount for multiple children'
    }
  ];

  const upcomingDues = [
    {
      category: 'Tuition Fee (Installment 3)',
      amount: 20000,
      dueDate: '2024-04-15',
      priority: 'high',
      lateFee: 500,
      description: 'Final installment for current semester'
    },
    {
      category: 'Lab Fee (Semester 6)',
      amount: 3000,
      dueDate: '2024-04-15',
      priority: 'medium',
      lateFee: 100,
      description: 'Laboratory charges for current semester'
    },
    {
      category: 'Development Fee',
      amount: 7000,
      dueDate: '2024-05-15',
      priority: 'low',
      lateFee: 200,
      description: 'Annual development charges'
    }
  ];

  const paymentMethods = [
    { id: 'online', name: 'Online Banking', icon: CreditCard, fee: 0 },
    { id: 'upi', name: 'UPI Payment', icon: Wallet, fee: 0 },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: 25 },
    { id: 'bank', name: 'Bank Transfer', icon: DollarSign, fee: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'completed': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-red-600 bg-red-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
          <p className="text-gray-600">Track payments, dues, and financial information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Statement
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* Fee Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fee (2023-24)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(feeOverview.totalFeeForYear)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(feeOverview.paidAmount)}
                </p>
                <p className="text-xs text-green-600">
                  {((feeOverview.paidAmount / feeOverview.totalFeeForYear) * 100).toFixed(1)}% completed
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(feeOverview.pendingAmount)}
                </p>
                <p className="text-xs text-red-600">Due: {feeOverview.nextDueDate}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scholarships</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(feeOverview.scholarshipAmount)}
                </p>
                <p className="text-xs text-purple-600">Total benefits received</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Payment Progress (Academic Year 2023-24)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-gray-600">
                {formatCurrency(feeOverview.paidAmount)} / {formatCurrency(feeOverview.totalFeeForYear)}
              </span>
            </div>
            <Progress 
              value={(feeOverview.paidAmount / feeOverview.totalFeeForYear) * 100} 
              className="h-3"
            />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-green-600 font-semibold">
                  {formatCurrency(feeOverview.paidAmount)}
                </p>
                <p className="text-gray-500">Paid</p>
              </div>
              <div>
                <p className="text-red-600 font-semibold">
                  {formatCurrency(feeOverview.pendingAmount)}
                </p>
                <p className="text-gray-500">Pending</p>
              </div>
              <div>
                <p className="text-purple-600 font-semibold">
                  {formatCurrency(feeOverview.scholarshipAmount + feeOverview.discountAmount)}
                </p>
                <p className="text-gray-500">Benefits</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Fee Management */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="structure" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="structure">Fee Structure</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="dues">Upcoming Dues</TabsTrigger>
              <TabsTrigger value="benefits">Scholarships</TabsTrigger>
            </TabsList>

            <TabsContent value="structure" className="space-y-4">
              {feeStructure.map((fee, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{fee.category}</h4>
                        <Badge className={getStatusColor(fee.status)}>
                          {fee.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{fee.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600">
                          Paid: {formatCurrency(fee.paid)}
                        </span>
                        {fee.pending > 0 && (
                          <span className="text-red-600">
                            Pending: {formatCurrency(fee.pending)}
                          </span>
                        )}
                        <span className="text-gray-600">
                          Due: {fee.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(fee.amount)}
                      </p>
                      <div className="w-32 mt-2">
                        <Progress 
                          value={(fee.paid / fee.amount) * 100} 
                          className="h-2"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {((fee.paid / fee.amount) * 100).toFixed(1)}% paid
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{payment.category}</h4>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Payment ID: {payment.id}</span>
                        <span>Method: {payment.method}</span>
                        <span>Date: {payment.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Transaction ID: {payment.transactionId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(payment.amount)}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Receipt className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="dues" className="space-y-4">
              {upcomingDues.map((due, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{due.category}</h4>
                        <Badge className={getPriorityColor(due.priority)}>
                          {due.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{due.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-red-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Due: {due.dueDate}
                        </span>
                        <span className="text-gray-600">
                          Late Fee: {formatCurrency(due.lateFee)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(due.amount)}
                      </p>
                      <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              {scholarshipsAndDiscounts.map((benefit, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{benefit.name}</h4>
                        <Badge className={getStatusColor(benefit.status)}>
                          {benefit.status}
                        </Badge>
                        <Badge variant="outline" className={
                          benefit.type === 'scholarship' ? 'text-purple-600' : 'text-orange-600'
                        }>
                          {benefit.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                      <p className="text-xs text-gray-500">
                        Valid until: {benefit.validUntil}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        -{formatCurrency(benefit.amount)}
                      </p>
                      <p className="text-sm text-gray-600">Benefit Amount</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Payment Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Quick Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Payment Methods</h4>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {method.fee > 0 ? `+${formatCurrency(method.fee)}` : 'Free'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Payment Summary</h4>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                  <span>Next Due Amount</span>
                  <span className="font-semibold">{formatCurrency(23000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="font-semibold">{formatCurrency(0)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg">{formatCurrency(23000)}</span>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentFees;