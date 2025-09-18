import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar, CreditCard, AlertTriangle } from 'lucide-react';

interface FeeDetail {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

const mockFees: FeeDetail[] = [
  { id: '1', type: 'Tuition Fee', amount: 50000, dueDate: '2024-01-31', status: 'paid', paidDate: '2024-01-15' },
  { id: '2', type: 'Lab Fee', amount: 15000, dueDate: '2024-02-15', status: 'pending' },
  { id: '3', type: 'Library Fee', amount: 5000, dueDate: '2024-01-20', status: 'overdue' },
];

export function FeeDetails() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPaid = mockFees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = mockFees.filter(f => f.status !== 'paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">₹{totalPaid.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">₹{totalPending.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{fee.type}</p>
                  <p className="text-sm text-muted-foreground">₹{fee.amount.toLocaleString('en-IN')}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {new Date(fee.dueDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  {fee.paidDate && (
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CreditCard className="h-3 w-3" />
                      <span>Paid: {new Date(fee.paidDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(fee.status)}>{fee.status}</Badge>
                  {fee.status !== 'paid' && (
                    <Button size="sm">Pay Now</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}