import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DollarSign, Download, Eye, Calendar } from 'lucide-react';

interface FacultySalaryDetailsProps {
  facultyData: any;
}

const FacultySalaryDetails: React.FC<FacultySalaryDetailsProps> = ({ facultyData }) => {
  const salarySlips = [
    { month: 'March 2024', basicSalary: 75000, allowances: 15000, deductions: 5000, netPay: 85000, status: 'Generated' },
    { month: 'February 2024', basicSalary: 75000, allowances: 15000, deductions: 5000, netPay: 85000, status: 'Paid' },
    { month: 'January 2024', basicSalary: 75000, allowances: 14000, deductions: 4500, netPay: 84500, status: 'Paid' },
    { month: 'December 2023', basicSalary: 75000, allowances: 16000, deductions: 5500, netPay: 85500, status: 'Paid' }
  ];

  const allowanceBreakdown = [
    { type: 'House Rent Allowance', amount: 8000 },
    { type: 'Dearness Allowance', amount: 4000 },
    { type: 'Transport Allowance', amount: 2000 },
    { type: 'Medical Allowance', amount: 1000 }
  ];

  const deductionBreakdown = [
    { type: 'Provident Fund', amount: 3000 },
    { type: 'Professional Tax', amount: 1000 },
    { type: 'Income Tax', amount: 1000 }
  ];

  return (
    <div className="space-y-6">
      {/* Current Salary Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <DollarSign className="h-5 w-5" />
              Current Salary Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Basic Salary</span>
                <span className="font-bold">₹{facultyData.salary.basic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Allowances</span>
                <span className="font-bold text-green-600">+₹{facultyData.salary.allowances.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deductions</span>
                <span className="font-bold text-red-600">-₹{facultyData.salary.deductions.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Net Salary</span>
                <span className="font-bold text-green-700">₹{facultyData.salary.netPay.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-700">Allowances Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allowanceBreakdown.map((allowance, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-600">{allowance.type}</span>
                  <span className="font-medium">₹{allowance.amount.toLocaleString()}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total Allowances</span>
                <span>₹{facultyData.salary.allowances.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader>
            <CardTitle className="text-red-700">Deductions Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deductionBreakdown.map((deduction, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-600">{deduction.type}</span>
                  <span className="font-medium">₹{deduction.amount.toLocaleString()}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total Deductions</span>
                <span>₹{facultyData.salary.deductions.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Salary Slips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Salary Slips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Month</th>
                  <th className="text-left p-3">Basic Salary</th>
                  <th className="text-left p-3">Allowances</th>
                  <th className="text-left p-3">Deductions</th>
                  <th className="text-left p-3">Net Pay</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salarySlips.map((slip, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{slip.month}</td>
                    <td className="p-3">₹{slip.basicSalary.toLocaleString()}</td>
                    <td className="p-3 text-green-600">₹{slip.allowances.toLocaleString()}</td>
                    <td className="p-3 text-red-600">₹{slip.deductions.toLocaleString()}</td>
                    <td className="p-3 font-bold">₹{slip.netPay.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge className={slip.status === 'Paid' ? 'bg-green-600' : 'bg-blue-600'}>
                        {slip.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Salary Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Trends (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">₹85,000</p>
              <p className="text-sm text-gray-600">Average Monthly</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">₹5,10,000</p>
              <p className="text-sm text-gray-600">Total Earned (6 months)</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">₹30,000</p>
              <p className="text-sm text-gray-600">Total Deductions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Download className="h-5 w-5" />
              Download Latest Slip
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Eye className="h-5 w-5" />
              View Salary History
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              Tax Calculator
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-5 w-5" />
              Salary Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultySalaryDetails;