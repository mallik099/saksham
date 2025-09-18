import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, CreditCard, Download, Eye, EyeOff, Edit, Save, X, 
  Calendar, Bell, CheckCircle
} from 'lucide-react';

interface FacultyFinancialDetailsProps {
  facultyData: any;
}

const FacultyFinancialDetails: React.FC<FacultyFinancialDetailsProps> = ({ facultyData }) => {
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  
  const [bankDetails, setBankDetails] = useState({
    bankName: facultyData.bankDetails.bankName,
    accountNumber: '1234567890123456',
    ifscCode: facultyData.bankDetails.ifscCode,
    branchName: 'Main Branch, College Road',
    accountType: 'Savings Account',
    accountHolderName: facultyData.name
  });

  const [editForm, setEditForm] = useState({ ...bankDetails });

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

  const handleEditBank = () => {
    setIsEditingBank(true);
    setEditForm({ ...bankDetails });
  };

  const handleSaveBank = () => {
    setBankDetails({ ...editForm });
    setIsEditingBank(false);
  };

  const handleCancelBank = () => {
    setEditForm({ ...bankDetails });
    setIsEditingBank(false);
  };

  const maskAccountNumber = (accountNumber: string) => {
    return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="salary">Salary Details</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <DollarSign className="h-5 w-5" />
                  Current Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-700">₹{facultyData.salary.netPay.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Net Monthly Salary</p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download Latest Slip
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CreditCard className="h-5 w-5" />
                  Bank Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{bankDetails.bankName}</p>
                  <p className="font-mono text-sm">
                    {showAccountNumber ? bankDetails.accountNumber : maskAccountNumber(bankDetails.accountNumber)}
                  </p>
                  <Badge className="bg-green-600">Verified & Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Calendar className="h-5 w-5" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-bold">Salary Processed</p>
                  <p className="text-sm text-gray-600">March 2024</p>
                  <Badge className="bg-green-600">Credited</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Financial Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="h-6 w-6" />
                  Download Salary Slip
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Eye className="h-6 w-6" />
                  View Bank Details
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <DollarSign className="h-6 w-6" />
                  Tax Calculator
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  Payment History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          {/* Current Salary Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <DollarSign className="h-5 w-5" />
                  Salary Structure
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
        </TabsContent>

        <TabsContent value="bank" className="space-y-6">
          {/* Bank Details Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <CreditCard className="h-5 w-5" />
                  Bank Account Details
                </CardTitle>
                {!isEditingBank && (
                  <Button onClick={handleEditBank} size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Details
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!isEditingBank ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Bank Name</label>
                      <p className="text-lg font-semibold">{bankDetails.bankName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Account Holder Name</label>
                      <p className="text-lg font-semibold">{bankDetails.accountHolderName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Account Number</label>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-mono">
                          {showAccountNumber ? bankDetails.accountNumber : maskAccountNumber(bankDetails.accountNumber)}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowAccountNumber(!showAccountNumber)}
                        >
                          {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">IFSC Code</label>
                      <p className="text-lg font-mono">{bankDetails.ifscCode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Branch Name</label>
                      <p className="text-lg">{bankDetails.branchName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Account Type</label>
                      <Badge className="bg-blue-600">{bankDetails.accountType}</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={editForm.bankName}
                        onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                      <input
                        type="text"
                        value={editForm.accountHolderName}
                        onChange={(e) => setEditForm({ ...editForm, accountHolderName: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Account Number</label>
                      <input
                        type="text"
                        value={editForm.accountNumber}
                        onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                        className="w-full p-2 border rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={editForm.ifscCode}
                        onChange={(e) => setEditForm({ ...editForm, ifscCode: e.target.value })}
                        className="w-full p-2 border rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={editForm.branchName}
                        onChange={(e) => setEditForm({ ...editForm, branchName: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Account Type</label>
                      <select
                        value={editForm.accountType}
                        onChange={(e) => setEditForm({ ...editForm, accountType: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="Savings Account">Savings Account</option>
                        <option value="Current Account">Current Account</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveBank}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelBank}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bank Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-green-700">Account Verified</p>
                  <p className="text-sm text-gray-600">Bank details are verified and active</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Badge className="bg-blue-600">✓</Badge>
                  </div>
                  <p className="font-semibold text-blue-700">Salary Account</p>
                  <p className="text-sm text-gray-600">Linked for salary payments</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Badge className="bg-purple-600">✓</Badge>
                  </div>
                  <p className="font-semibold text-purple-700">Auto Debit</p>
                  <p className="text-sm text-gray-600">Enabled for loan payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Salary Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-03-01', description: 'Salary Credit - March 2024', amount: 85000, status: 'Credited' },
                  { date: '2024-02-01', description: 'Salary Credit - February 2024', amount: 85000, status: 'Credited' },
                  { date: '2024-01-01', description: 'Salary Credit - January 2024', amount: 84500, status: 'Credited' },
                  { date: '2023-12-01', description: 'Salary Credit - December 2023', amount: 85500, status: 'Credited' },
                  { date: '2023-11-01', description: 'Salary Credit - November 2023', amount: 84000, status: 'Credited' }
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹{transaction.amount.toLocaleString()}</p>
                      <Badge className="bg-green-600">{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
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
        </TabsContent>
      </Tabs>

      {/* Important Notes */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Bank details are used for salary payments and reimbursements</li>
            <li>• Any changes to bank details require verification and may take 2-3 working days</li>
            <li>• Ensure your account is active and in good standing</li>
            <li>• Contact HR department for any issues with salary credits</li>
            <li>• Salary slips are generated on the 1st of every month</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyFinancialDetails;