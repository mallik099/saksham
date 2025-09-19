import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bus, MapPin, Clock, CreditCard } from 'lucide-react';

const FacultyTransport = () => {
  const transportData = {
    route: 'Route 3 - City Center',
    busNumber: 'RJ-14-AB-1234',
    inchargeName: 'Ramesh Kumar',
    inchargePhone: '+91 9876543210',
    pickupTime: '7:30 AM',
    dropTime: '5:30 PM',
    pickupPoint: 'City Center Bus Stop',
    monthlyFee: 1200,
    feeStatus: 'Paid',
    nextDue: '2024-04-01'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Bus className="w-5 h-5 mr-2" />
            Transport Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-medium">{transportData.route}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bus Number</p>
              <p className="font-medium">{transportData.busNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Incharge</p>
              <p className="font-medium">{transportData.inchargeName}</p>
              <p className="text-sm text-gray-500">{transportData.inchargePhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Clock className="w-5 h-5 mr-2" />
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-sm text-gray-600">{transportData.pickupPoint}</p>
                </div>
              </div>
              <Badge variant="outline">{transportData.pickupTime}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-600" />
                <div>
                  <p className="font-medium">Drop</p>
                  <p className="text-sm text-gray-600">College Campus</p>
                </div>
              </div>
              <Badge variant="outline">{transportData.dropTime}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <CreditCard className="w-5 h-5 mr-2" />
            Transport Fee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Monthly Fee</span>
              <span className="font-medium">₹{transportData.monthlyFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Status</span>
              <Badge className="bg-green-100 text-green-800">{transportData.feeStatus}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Next Due</span>
              <span className="text-sm text-gray-600">{transportData.nextDue}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyTransport;