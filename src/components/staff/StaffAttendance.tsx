import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { CheckCircle, Clock, Calendar, FileText, AlertCircle } from 'lucide-react';

const StaffAttendance: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [leaveForm, setLeaveForm] = useState({
    type: 'sick',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const attendanceData = {
    present: 22,
    absent: 2,
    late: 1,
    leave: 3,
    checkInTime: '9:15 AM',
    checkOutTime: null
  };

  const leaveHistory = [
    { date: '2024-03-15', type: 'Sick Leave', status: 'approved', days: 1 },
    { date: '2024-03-10', type: 'Casual Leave', status: 'approved', days: 2 },
    { date: '2024-03-05', type: 'Emergency Leave', status: 'pending', days: 1 }
  ];

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    // Handle check-out logic
  };

  const handleLeaveSubmit = () => {
    // Handle leave application submission
    console.log('Leave application submitted:', leaveForm);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Attendance Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isCheckedIn ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">Checked In</p>
                      <p className="text-sm text-green-600">Time: {attendanceData.checkInTime}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Not Checked In</p>
                      <p className="text-sm text-gray-600">Please check in to start your day</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-gray-600" />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                {!isCheckedIn ? (
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => setIsCheckedIn(true)}
                  >
                    Check In
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={handleCheckOut}
                  >
                    Check Out
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave Application */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Leave Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <select 
                  className="w-full p-2 border rounded mt-1"
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
                >
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="emergency">Emergency Leave</option>
                  <option value="personal">Personal Leave</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <Input 
                    type="date" 
                    value={leaveForm.fromDate}
                    onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <Input 
                    type="date"
                    value={leaveForm.toDate}
                    onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Textarea 
                  placeholder="Enter reason for leave"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                />
              </div>
              
              <Button 
                className="w-full bg-[#b1f2ff] text-black hover:bg-[#9ee8f5]"
                onClick={handleLeaveSubmit}
              >
                Apply Leave
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Attendance Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Monthly Attendance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">{attendanceData.present}</p>
              <p className="text-sm text-gray-600">Present Days</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-600">{attendanceData.absent}</p>
              <p className="text-sm text-gray-600">Absent Days</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-2xl font-bold text-yellow-600">{attendanceData.late}</p>
              <p className="text-sm text-gray-600">Late Arrivals</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{attendanceData.leave}</p>
              <p className="text-sm text-gray-600">Leave Days</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Attendance Percentage</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round((attendanceData.present / (attendanceData.present + attendanceData.absent)) * 100)}%
              </p>
            </div>
            <Button variant="outline">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leave History */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveHistory.map((leave, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-gray-600">Date: {leave.date}</p>
                    <p className="text-sm text-gray-600">Duration: {leave.days} day(s)</p>
                  </div>
                  <Badge 
                    variant={leave.status === 'approved' ? 'default' : 
                            leave.status === 'pending' ? 'secondary' : 'destructive'}
                  >
                    {leave.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAttendance;