import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Bus, MapPin, Clock, Phone, MessageSquare, 
  Star, User, Navigation, AlertCircle 
} from 'lucide-react';

const StudentTransportModule = () => {
  const [feedback, setFeedback] = useState('');

  const transportInfo = {
    routeNumber: 'Route 15',
    busNumber: 'KA-05-MN-2341',
    pickupPoint: 'Jayanagar 4th Block',
    dropPoint: 'College Main Gate',
    status: 'Allocated',
    driver: 'Ravi Kumar',
    driverContact: '+91 9876543210',
    conductor: 'Suresh Babu',
    conductorContact: '+91 9876543211'
  };

  const routeSchedule = [
    { stop: 'Jayanagar 4th Block', time: '7:30 AM', distance: '0 km' },
    { stop: 'Banashankari', time: '7:45 AM', distance: '3 km' },
    { stop: 'JP Nagar', time: '8:00 AM', distance: '6 km' },
    { stop: 'BTM Layout', time: '8:15 AM', distance: '9 km' },
    { stop: 'Silk Board', time: '8:30 AM', distance: '12 km' },
    { stop: 'College Main Gate', time: '8:45 AM', distance: '15 km' }
  ];

  const returnSchedule = [
    { stop: 'College Main Gate', time: '5:00 PM', distance: '0 km' },
    { stop: 'Silk Board', time: '5:15 PM', distance: '3 km' },
    { stop: 'BTM Layout', time: '5:30 PM', distance: '6 km' },
    { stop: 'JP Nagar', time: '5:45 PM', distance: '9 km' },
    { stop: 'Banashankari', time: '6:00 PM', distance: '12 km' },
    { stop: 'Jayanagar 4th Block', time: '6:15 PM', distance: '15 km' }
  ];

  const transportFees = {
    monthlyFee: 2500,
    paidAmount: 2500,
    dueAmount: 0,
    nextDueDate: '2024-04-01'
  };

  const recentUpdates = [
    { date: '2024-03-10', message: 'Route timing changed due to traffic', type: 'info' },
    { date: '2024-03-08', message: 'Bus breakdown - Alternative arranged', type: 'warning' },
    { date: '2024-03-05', message: 'New driver assigned to Route 15', type: 'info' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Allocated': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Not Allocated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleSubmitFeedback = () => {
    console.log('Transport feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Transport Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bus className="w-5 h-5 mr-2" />
            Transport Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Route Number</p>
                <p className="font-medium text-lg flex items-center">
                  <Navigation className="w-4 h-4 mr-2 text-blue-500" />
                  {transportInfo.routeNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bus Number</p>
                <p className="font-medium">{transportInfo.busNumber}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Pick-up Point</p>
                <p className="font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-500" />
                  {transportInfo.pickupPoint}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className={getStatusColor(transportInfo.status)}>
                  {transportInfo.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Driver</p>
                <p className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  {transportInfo.driver}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Driver Contact</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  {transportInfo.driverContact}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Conductor</p>
                <p className="font-medium">{transportInfo.conductor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Conductor Contact</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  {transportInfo.conductorContact}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Morning Schedule (To College)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {routeSchedule.map((stop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      stop.stop === transportInfo.pickupPoint ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{stop.stop}</p>
                      <p className="text-sm text-gray-600">{stop.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{stop.time}</p>
                    {stop.stop === transportInfo.pickupPoint && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Your Stop</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Evening Schedule (From College)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {returnSchedule.map((stop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      stop.stop === transportInfo.pickupPoint ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{stop.stop}</p>
                      <p className="text-sm text-gray-600">{stop.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-600">{stop.time}</p>
                    {stop.stop === transportInfo.pickupPoint && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Your Stop</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transport Fees & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="w-5 h-5 mr-2" />
              Transport Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800 font-medium">Monthly Fee</span>
                <span className="text-blue-600 font-bold">₹{transportFees.monthlyFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium">Paid Amount</span>
                <span className="text-green-600 font-bold">₹{transportFees.paidAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-800 font-medium">Due Amount</span>
                <span className="text-gray-600 font-bold">₹{transportFees.dueAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-800 font-medium">Next Due Date</span>
                <span className="text-yellow-600 font-bold">{transportFees.nextDueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Transport Service Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Rate Transport Service</h4>
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Submit Feedback on Transport Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Transport Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Rate your transport experience:</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 text-yellow-400 fill-current cursor-pointer" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Select category:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">Punctuality</Button>
                          <Button variant="outline" size="sm">Driver Behavior</Button>
                          <Button variant="outline" size="sm">Bus Condition</Button>
                          <Button variant="outline" size="sm">Route Timing</Button>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Share your detailed feedback about transport service..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <Button onClick={handleSubmitFeedback} className="w-full">
                        Submit Feedback
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Updates & Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Recent Transport Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getUpdateTypeColor(update.type)}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{update.message}</p>
                    <p className="text-sm opacity-75 mt-1">{update.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {update.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transport Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bus className="w-5 h-5 mr-2" />
            Transport Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">General Rules</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Be at the stop 5 minutes before scheduled time</li>
                <li>• Carry your ID card for verification</li>
                <li>• Maintain discipline inside the bus</li>
                <li>• No eating or drinking in the bus</li>
                <li>• Give priority to female students</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Emergency Contacts</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Transport Office: +91 9876543200</li>
                <li>• Emergency Helpline: +91 9876543201</li>
                <li>• Route Supervisor: +91 9876543202</li>
                <li>• College Security: +91 9876543203</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTransportModule;