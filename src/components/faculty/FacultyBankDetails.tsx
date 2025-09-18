import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CreditCard, Edit, Save, X, Eye, EyeOff } from 'lucide-react';

interface FacultyBankDetailsProps {
  facultyData: any;
}

const FacultyBankDetails: React.FC<FacultyBankDetailsProps> = ({ facultyData }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...bankDetails });
  };

  const handleSave = () => {
    setBankDetails({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...bankDetails });
    setIsEditing(false);
  };

  const maskAccountNumber = (accountNumber: string) => {
    return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
  };

  return (
    <div className="space-y-6">
      {/* Bank Details Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <CreditCard className="h-5 w-5" />
              Bank Account Details
            </CardTitle>
            {!isEditing && (
              <Button onClick={handleEdit} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Update Details
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
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
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
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
                <CreditCard className="h-6 w-6 text-green-600" />
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
              { date: '2024-01-01', description: 'Salary Credit - January 2024', amount: 84500, status: 'Credited' }
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
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyBankDetails;