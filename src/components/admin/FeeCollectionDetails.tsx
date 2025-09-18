import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, User } from 'lucide-react';

interface FeePayment {
  id: string;
  studentName: string;
  rollNo: string;
  section: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockFeePayments: FeePayment[] = [
  {
    id: '1',
    studentName: 'Rahul Sharma',
    rollNo: '21CSE001',
    section: 'A',
    amount: 50000,
    paymentDate: '2024-01-15',
    paymentMethod: 'UPI',
    status: 'completed'
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    rollNo: '21CSE002',
    section: 'A',
    amount: 45000,
    paymentDate: '2024-01-10',
    paymentMethod: 'Net Banking',
    status: 'completed'
  },
  {
    id: '3',
    studentName: 'Amit Kumar',
    rollNo: '21ECE001',
    section: 'B',
    amount: 50000,
    paymentDate: '2024-01-20',
    paymentMethod: 'Card',
    status: 'pending'
  }
];

export function FeeCollectionDetails() {
  const [payments] = useState(mockFeePayments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCollected = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fee Collection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString('en-IN')}</p>
              <p className="text-sm text-muted-foreground">Total Collected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{payments.filter(p => p.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground">Payments Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{payments.filter(p => p.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Payments Pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Fee Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.studentName}</p>
                    <p className="text-sm text-muted-foreground">{payment.rollNo} - Section {payment.section}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <p className="font-semibold">₹{payment.amount.toLocaleString('en-IN')}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(payment.paymentDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CreditCard className="h-3 w-3" />
                    <span>{payment.paymentMethod}</span>
                  </div>
                </div>
                
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}