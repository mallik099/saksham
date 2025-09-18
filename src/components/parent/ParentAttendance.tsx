import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { 
  ClipboardList, Calendar as CalendarIcon, TrendingUp, 
  AlertTriangle, CheckCircle, XCircle, Clock, Filter,
  Download, BarChart3, PieChart, Users
} from 'lucide-react';

const ParentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [viewMode, setViewMode] = useState('overview');

  const attendanceOverview = {
    totalClasses: 450,
    attendedClasses: 392,
    absentClasses: 58,
    overallPercentage: 87.1,
    requiredPercentage: 75,
    status: 'good'
  };

  const subjectWiseAttendance = [
    {
      subject: 'Machine Learning',
      code: 'CS601',
      totalClasses: 45,
      attendedClasses: 42,
      absentClasses: 3,
      percentage: 93.3,
      status: 'excellent',
      lastAttended: '2024-03-20',
      faculty: 'Dr. Smith Johnson'
    },
    {
      subject: 'Database Systems',
      code: 'CS602',
      totalClasses: 40,
      attendedClasses: 32,
      absentClasses: 8,
      percentage: 80.0,
      status: 'good',
      lastAttended: '2024-03-19',
      faculty: 'Prof. Emily Davis'
    },
    {
      subject: 'Software Engineering',
      code: 'CS603',
      totalClasses: 38,
      attendedClasses: 33,
      absentClasses: 5,
      percentage: 86.8,
      status: 'good',
      lastAttended: '2024-03-18',
      faculty: 'Dr. Michael Brown'
    },
    {
      subject: 'Computer Networks',
      code: 'CS604',
      totalClasses: 42,
      attendedClasses: 35,
      absentClasses: 7,
      percentage: 83.3,
      status: 'good',
      lastAttended: '2024-03-17',
      faculty: 'Prof. Sarah Wilson'
    },
    {
      subject: 'Web Technologies',
      code: 'CS605',
      totalClasses: 35,
      attendedClasses: 28,
      absentClasses: 7,
      percentage: 80.0,
      status: 'warning',
      lastAttended: '2024-03-16',
      faculty: 'Dr. James Miller'
    },
    {
      subject: 'Mobile App Development',
      code: 'CS606',
      totalClasses: 30,
      attendedClasses: 22,
      absentClasses: 8,
      percentage: 73.3,
      status: 'critical',
      lastAttended: '2024-03-15',
      faculty: 'Prof. Lisa Anderson'
    }
  ];

  const monthlyTrend = [
    { month: 'Sep 2023', percentage: 89.2 },
    { month: 'Oct 2023', percentage: 91.5 },
    { month: 'Nov 2023', percentage: 88.7 },
    { month: 'Dec 2023', percentage: 85.3 },
    { month: 'Jan 2024', percentage: 87.9 },
    { month: 'Feb 2024', percentage: 86.4 },
    { month: 'Mar 2024', percentage: 87.1 }
  ];

  const recentAbsences = [
    { date: '2024-03-15', subject: 'Mobile App Development', reason: 'Medical Leave', status: 'approved' },
    { date: '2024-03-12', subject: 'Web Technologies', reason: 'Family Emergency', status: 'approved' },
    { date: '2024-03-08', subject: 'Database Systems', reason: 'Sick Leave', status: 'approved' },
    { date: '2024-03-05', subject: 'Computer Networks', reason: 'Personal Work', status: 'pending' },
    { date: '2024-03-01', subject: 'Software Engineering', reason: 'Medical Leave', status: 'approved' }
  ];

  const attendanceAlerts = [
    {
      type: 'critical',
      subject: 'Mobile App Development',
      message: 'Attendance below 75% threshold',
      action: 'Immediate attention required'
    },
    {
      type: 'warning',
      subject: 'Web Technologies',
      message: 'Attendance approaching minimum requirement',
      action: 'Monitor closely'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
          <p className="text-gray-600">Monitor your child's class attendance and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Attendance Alerts */}
      {attendanceAlerts.length > 0 && (
        <div className="space-y-2">
          {attendanceAlerts.map((alert, index) => (
            <Card key={index} className={`border-l-4 ${alert.type === 'critical' ? 'border-red-500' : 'border-yellow-500'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <div>
                      <p className="font-semibold text-gray-900">{alert.subject}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                  <Badge variant={alert.type === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.action}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Overall Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceOverview.overallPercentage}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress 
              value={attendanceOverview.overallPercentage} 
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{attendanceOverview.attendedClasses}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Out of {attendanceOverview.totalClasses} total</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Missed</p>
                <p className="text-2xl font-bold text-red-600">{attendanceOverview.absentClasses}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((attendanceOverview.absentClasses / attendanceOverview.totalClasses) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Required %</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceOverview.requiredPercentage}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              +{(attendanceOverview.overallPercentage - attendanceOverview.requiredPercentage).toFixed(1)}% above minimum
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Attendance */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Subject-wise Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectWiseAttendance.map((subject, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                      <Badge variant="outline" className="text-xs">{subject.code}</Badge>
                      <Badge className={getStatusColor(subject.status)}>
                        {subject.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Faculty: {subject.faculty}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-600">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        {subject.attendedClasses} Present
                      </span>
                      <span className="text-red-600">
                        <XCircle className="w-4 h-4 inline mr-1" />
                        {subject.absentClasses} Absent
                      </span>
                      <span className="text-gray-600">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Last: {subject.lastAttended}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{subject.percentage}%</p>
                    <p className="text-sm text-gray-600">{subject.attendedClasses}/{subject.totalClasses}</p>
                    <div className="w-32 mt-2">
                      <Progress 
                        value={subject.percentage} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Attendance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24">
                      <Progress value={month.percentage} className="h-2" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12">
                      {month.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Absences */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Recent Absences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAbsences.map((absence, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{absence.subject}</p>
                    <p className="text-sm text-gray-600">{absence.date}</p>
                    <p className="text-xs text-gray-500">{absence.reason}</p>
                  </div>
                  <Badge 
                    variant={absence.status === 'approved' ? 'default' : 'secondary'}
                    className={absence.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {absence.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Calendar View */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Attendance Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Attendance for {selectedDate?.toDateString()}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Machine Learning</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Database Systems</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm">Web Technologies</span>
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Daily Summary</p>
                <p className="text-xs text-blue-700">2 out of 3 classes attended (66.7%)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentAttendance;