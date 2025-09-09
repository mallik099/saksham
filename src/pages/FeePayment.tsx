import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { feePaymentAPI } from '@/services/api';
import { Loader2, CreditCard } from 'lucide-react';

interface FeeFormData {
  studentId: string;
  paymentAmount: string;
  paymentMode: string;
  transactionId: string;
}

export default function FeePayment() {
  const [formData, setFormData] = useState<FeeFormData>({
    studentId: '',
    paymentAmount: '',
    paymentMode: '',
    transactionId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FeeFormData>>({});
  const { toast } = useToast();

  const paymentModes = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Net Banking',
    'UPI',
    'Cheque',
    'Demand Draft',
  ];

  const validateForm = () => {
    const newErrors: Partial<FeeFormData> = {};

    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.paymentAmount.trim()) {
      newErrors.paymentAmount = 'Payment amount is required';
    } else if (isNaN(Number(formData.paymentAmount)) || Number(formData.paymentAmount) <= 0) {
      newErrors.paymentAmount = 'Payment amount must be a positive number';
    }
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please correct the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await feePaymentAPI.submit({
        ...formData,
        paymentAmount: Number(formData.paymentAmount),
      });
      toast({
        title: 'Payment Recorded',
        description: 'Fee payment has been successfully recorded.',
      });
      // Reset form
      setFormData({
        studentId: '',
        paymentAmount: '',
        paymentMode: '',
        transactionId: '',
      });
    } catch (error) {
      console.error('Payment submission error:', error);
      toast({
        title: 'Payment Failed',
        description: 'Failed to record payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Fee Payment</h1>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Record Fee Payment</CardTitle>
          <CardDescription>
            Enter payment details to record a student fee payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  placeholder="Enter student ID"
                  className={errors.studentId ? 'border-destructive' : ''}
                />
                {errors.studentId && (
                  <p className="text-sm text-destructive">{errors.studentId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Payment Amount (₹) *</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.paymentAmount}
                  onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                  placeholder="0.00"
                  className={errors.paymentAmount ? 'border-destructive' : ''}
                />
                {errors.paymentAmount && (
                  <p className="text-sm text-destructive">{errors.paymentAmount}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMode">Payment Mode *</Label>
                <Select value={formData.paymentMode} onValueChange={(value) => handleInputChange('paymentMode', value)}>
                  <SelectTrigger className={errors.paymentMode ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentModes.map((mode) => (
                      <SelectItem key={mode} value={mode.toLowerCase().replace(' ', '_')}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.paymentMode && (
                  <p className="text-sm text-destructive">{errors.paymentMode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID *</Label>
                <Input
                  id="transactionId"
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => handleInputChange('transactionId', e.target.value)}
                  placeholder="Enter transaction/reference ID"
                  className={errors.transactionId ? 'border-destructive' : ''}
                />
                {errors.transactionId && (
                  <p className="text-sm text-destructive">{errors.transactionId}</p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Recording Payment...
                </>
              ) : (
                'Record Payment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}