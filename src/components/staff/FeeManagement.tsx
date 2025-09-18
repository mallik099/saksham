import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { DollarSign, Search, Receipt, Download, TrendingUp, Users } from 'lucide-react';

const FeeManagement: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const todayStats = {
    totalCollection: 125000,
    paymentsReceived: 45,
    pendingPayments: 12,
    averageAmount: 2778
  };

  const feeStructure = {
    tuitionFee: 25000,
    labFee: 5000,
    libraryFee: 2000,
    examFee: 3000,
    total: 35000
  };

  const recentPayments = [
    { rollNo: 'CS21001', name: 'John Doe', amount: 35000, method: 'UPI', time: '10:30 AM' },
    { rollNo: 'CS21002', name: 'Jane Smith', amount: 30000, method: 'Card', time: '11:15 AM' },
    { rollNo: 'CS21003', name: 'Mike Johnson', amount: 35000, method: 'Cash', time: '12:00 PM' }
  ];

  const handleFetchStudent = () => {
    // Simulate fetching student data
    if (rollNumber) {
      setStudentData({
        rollNo: rollNumber,
        name: 'John Doe',
        class: 'B.Tech CSE - 3rd Year',
        feeStatus: 'Pending',
        dueAmount: 35000,
        lastPayment: '2024-02-15'
      });
    }
  };

  const handlePayment = () => {
    // Handle payment processing
    alert('Payment recorded successfully! Receipt generated.');
    setStudentData(null);
    setRollNumber('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Fee Management</h3>
      
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Collection</p>
                <p className="text-2xl font-bold text-green-600">₹{todayStats.totalCollection.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payments Received</p>
                <p className="text-2xl font-bold text-blue-600">{todayStats.paymentsReceived}</p>
              </div>
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-orange-600">{todayStats.pendingPayments}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Amount</p>
                <p className="text-2xl font-bold text-purple-600">₹{todayStats.averageAmount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection Portal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Fee Collection Portal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Student Roll Number</label>
                <div className="flex space-x-2 mt-1">
                  <Input 
                    placeholder="Enter roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                  />
                  <Button onClick={handleFetchStudent}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {studentData && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Student:</span>
                    <span>{studentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Class:</span>
                    <span>{studentData.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fee Status:</span>
                    <Badge variant="destructive">{studentData.feeStatus}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Due Amount:</span>
                    <span className="text-red-600 font-bold">₹{studentData.dueAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {studentData && (
                <>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-3">Fee Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tuition Fee:</span>
                        <span>₹{feeStructure.tuitionFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lab Fee:</span>
                        <span>₹{feeStructure.labFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Library Fee:</span>
                        <span>₹{feeStructure.libraryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exam Fee:</span>
                        <span>₹{feeStructure.examFee.toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{feeStructure.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <select 
                      className="w-full p-2 border rounded mt-1"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                      <option value="netbanking">Net Banking</option>
                    </select>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handlePayment}
                  >
                    Record Payment & Generate Receipt
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fee Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Fee Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-[#b1f2ff] rounded-lg">
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">This Month</p>
                    <p className="text-xl font-bold">₹45,67,000</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Outstanding</p>
                    <p className="text-xl font-bold text-red-600">₹12,34,000</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Daily Collection Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Outstanding Fee Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Monthly Collection Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Payment Method Wise Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Roll No</th>
                  <th className="text-left p-2">Student Name</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Method</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{payment.rollNo}</td>
                    <td className="p-2">{payment.name}</td>
                    <td className="p-2 font-medium">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-2">
                      <Badge variant="outline">{payment.method}</Badge>
                    </td>
                    <td className="p-2">{payment.time}</td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">
                        View Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeManagement;