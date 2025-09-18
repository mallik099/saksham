import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CreditCard, Download, AlertCircle } from 'lucide-react';

interface StudentFeesProps {
  studentData: any;
}

const StudentFees: React.FC<StudentFeesProps> = ({ studentData }) => {
  const feeHistory = [
    { semester: '5th Semester', amount: 25000, paidDate: '2024-01-15', status: 'Paid', receiptNo: 'RCP001' },
    { semester: '4th Semester', amount: 25000, paidDate: '2023-08-10', status: 'Paid', receiptNo: 'RCP002' },
    { semester: '3rd Semester', amount: 25000, paidDate: '2023-01-12', status: 'Paid', receiptNo: 'RCP003' },
    { semester: '2nd Semester', amount: 25000, paidDate: '2022-08-08', status: 'Paid', receiptNo: 'RCP004' }
  ];

  const pendingFees = [
    { description: '6th Semester Fee', amount: 25000, dueDate: '2024-03-15', status: 'Pending' }
  ];

  const handlePayment = (amount: number) => {
    alert(`Payment of ₹${amount.toLocaleString()} initiated. This is a demo.`);
  };

  const downloadReceipt = (receiptNo: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `receipt_${receiptNo}.pdf`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Paid</p>
                <p className="text-2xl font-bold">₹{studentData.paidFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">₹{studentData.pendingFees.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Fees</p>
                <p className="text-2xl font-bold">₹{studentData.totalFees.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Fees */}
      {pendingFees.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              Pending Fee Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingFees.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div>
                    <h4 className="font-medium">{fee.description}</h4>
                    <p className="text-sm text-gray-600">Due Date: {fee.dueDate}</p>
                    <p className="text-lg font-bold text-orange-600">₹{fee.amount.toLocaleString()}</p>
                  </div>
                  <Button 
                    onClick={() => handlePayment(fee.amount)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fee Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{payment.semester}</h4>
                  <p className="text-sm text-gray-600">Paid on: {payment.paidDate}</p>
                  <p className="text-sm text-gray-600">Receipt: {payment.receiptNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{payment.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">Paid</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadReceipt(payment.receiptNo)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
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

export default StudentFees;