import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DollarSign, Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminFees = () => {
  const feeData = [
    { month: 'Jan', collected: 2500000, pending: 500000 },
    { month: 'Feb', collected: 2800000, pending: 400000 },
    { month: 'Mar', collected: 2600000, pending: 600000 }
  ];

  const pieData = [
    { name: 'Paid', value: 75, amount: 18750000 },
    { name: 'Pending', value: 25, amount: 6250000 }
  ];

  const pendingStudents = [
    { name: 'John Doe', rollNo: 'CS21001', amount: 25000, semester: '6th', dueDate: '2024-03-15' },
    { name: 'Jane Smith', rollNo: 'EC21002', amount: 25000, semester: '6th', dueDate: '2024-03-15' },
    { name: 'Mike Johnson', rollNo: 'ME21003', amount: 25000, semester: '5th', dueDate: '2024-03-10' }
  ];

  const recentPayments = [
    { name: 'Sarah Wilson', rollNo: 'CS21004', amount: 25000, date: '2024-03-05', mode: 'Online' },
    { name: 'David Brown', rollNo: 'EC21005', amount: 25000, date: '2024-03-04', mode: 'Cash' },
    { name: 'Lisa Davis', rollNo: 'ME21006', amount: 25000, date: '2024-03-03', mode: 'Cheque' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fee Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">₹28.5L</p>
            <p className="text-sm text-gray-600">Collected (Month)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">₹6.25L</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">₹1.56Cr</p>
            <p className="text-sm text-gray-600">Total (Year)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">75%</p>
            <p className="text-sm text-gray-600">Collection Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Collection Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value as number / 100000).toFixed(1)}L`} />
                <Bar dataKey="collected" fill="#22c55e" />
                <Bar dataKey="pending" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Fee Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Fee Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNo} - {student.semester}</p>
                    <p className="text-xs text-gray-500">Due: {student.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">₹{student.amount.toLocaleString()}</p>
                    <Badge variant="destructive">Overdue</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-sm text-gray-600">{payment.rollNo}</p>
                    <p className="text-xs text-gray-500">{payment.date} via {payment.mode}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                    <Badge variant="default">Paid</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminFees;