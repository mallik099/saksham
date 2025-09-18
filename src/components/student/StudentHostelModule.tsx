import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Building, User, MapPin, Phone, MessageSquare, 
  Star, Wifi, Car, Utensils, Shield, Clock 
} from 'lucide-react';

const StudentHostelModule = () => {
  const [feedback, setFeedback] = useState('');

  const hostelInfo = {
    blockName: 'Block A',
    roomNumber: 'A-205',
    roomType: 'Double Sharing',
    status: 'Allocated',
    floorNumber: '2nd Floor',
    roommate: 'Vikram Singh',
    warden: 'Dr. Priya Sharma',
    wardenContact: '+91 9876543210'
  };

  const hostelFacilities = [
    { name: 'Wi-Fi', icon: Wifi, status: 'Available', description: '24/7 High-speed internet' },
    { name: 'Parking', icon: Car, status: 'Available', description: 'Two-wheeler parking' },
    { name: 'Mess', icon: Utensils, status: 'Available', description: 'Vegetarian & Non-veg meals' },
    { name: 'Security', icon: Shield, status: 'Active', description: '24/7 Security guards' }
  ];

  const messMenu = {
    monday: { breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Dal, Sabzi, Roti', dinner: 'Chapati, Paneer Curry, Rice' },
    tuesday: { breakfast: 'Poha, Tea', lunch: 'Rajma Rice, Salad', dinner: 'Dal Rice, Aloo Gobi' },
    wednesday: { breakfast: 'Upma, Coffee', lunch: 'Chole Bhature', dinner: 'Biryani, Raita' },
    thursday: { breakfast: 'Paratha, Curd', lunch: 'South Indian Thali', dinner: 'Roti, Dal, Sabzi' },
    friday: { breakfast: 'Dosa, Sambar', lunch: 'Pulao, Curry', dinner: 'Special Dinner' }
  };

  const recentComplaints = [
    { id: 1, issue: 'AC not working', date: '2024-03-10', status: 'Resolved', priority: 'High' },
    { id: 2, issue: 'Water supply issue', date: '2024-03-08', status: 'In Progress', priority: 'Medium' },
    { id: 3, issue: 'Wi-Fi connectivity', date: '2024-03-05', status: 'Resolved', priority: 'Low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Allocated': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitFeedback = () => {
    console.log('Hostel feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Hostel Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Hostel Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Block Name</p>
                <p className="font-medium text-lg">{hostelInfo.blockName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Number</p>
                <p className="font-medium text-lg">{hostelInfo.roomNumber}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-medium">{hostelInfo.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Floor</p>
                <p className="font-medium">{hostelInfo.floorNumber}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Roommate</p>
                <p className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  {hostelInfo.roommate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className={getStatusColor(hostelInfo.status)}>
                  {hostelInfo.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Warden</p>
                <p className="font-medium">{hostelInfo.warden}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  {hostelInfo.wardenContact}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities & Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Hostel Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hostelFacilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-medium">{facility.name}</span>
                    </div>
                    <Badge className={getStatusColor(facility.status)} variant="outline">
                      {facility.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mess Menu & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="w-5 h-5 mr-2" />
              Weekly Mess Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(messMenu).map(([day, meals]) => (
                <div key={day} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 capitalize mb-2">{day}</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium text-orange-600">Breakfast:</span> {meals.breakfast}</p>
                    <p><span className="font-medium text-blue-600">Lunch:</span> {meals.lunch}</p>
                    <p><span className="font-medium text-purple-600">Dinner:</span> {meals.dinner}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Hostel Facilities Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Rate Hostel Services</h4>
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Submit Feedback on Hostel Facilities
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Hostel Feedback</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Rate your hostel experience:</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 text-yellow-400 fill-current cursor-pointer" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Select category:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">Room Facilities</Button>
                          <Button variant="outline" size="sm">Mess Quality</Button>
                          <Button variant="outline" size="sm">Cleanliness</Button>
                          <Button variant="outline" size="sm">Security</Button>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Share your detailed feedback about hostel facilities..."
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

      {/* Recent Complaints & Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Complaints & Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div>
                  <p className="font-medium text-gray-900">{complaint.issue}</p>
                  <p className="text-sm text-gray-600">Reported on: {complaint.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      complaint.priority === 'High' ? 'border-red-300 text-red-700' :
                      complaint.priority === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-green-300 text-green-700'
                    }`}
                  >
                    {complaint.priority}
                  </Badge>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit New Complaint
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hostel Rules & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Hostel Rules & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">General Rules</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Maintain silence after 10:00 PM</li>
                <li>• No outside guests after 8:00 PM</li>
                <li>• Keep rooms clean and tidy</li>
                <li>• Report any damages immediately</li>
                <li>• Follow mess timings strictly</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Timings</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Gate closing time: 10:00 PM</li>
                <li>• Breakfast: 7:00 AM - 9:00 AM</li>
                <li>• Lunch: 12:00 PM - 2:00 PM</li>
                <li>• Dinner: 7:00 PM - 9:00 PM</li>
                <li>• Study hours: 9:00 PM - 11:00 PM</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHostelModule;