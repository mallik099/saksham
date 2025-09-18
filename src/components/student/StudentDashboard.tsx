import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ClipboardList, CreditCard, GraduationCap, TrendingUp, 
  Clock, Award, Bell, Briefcase, AlertCircle 
} from 'lucide-react';

const StudentDashboard = () => {
  const metrics = [
    { title: 'Attendance', value: '87%', status: 'good', icon: ClipboardList, color: 'bg-blue-100 text-blue-600' },
    { title: 'Fee Status', value: 'Paid', status: 'excellent', icon: CreditCard, color: 'bg-green-100 text-green-600' },
    { title: 'CGPA', value: '8.4', status: 'excellent', icon: Award, color: 'bg-purple-100 text-purple-600' },
    { title: 'Credits', value: '142/180', status: 'good', icon: GraduationCap, color: 'bg-orange-100 text-orange-600' }
  ];

  const notifications = [
    { type: 'exam', message: 'Mid-term exams start from 15th March', priority: 'high' },
    { type: 'fee', message: 'Semester fee payment due by 20th March', priority: 'medium' },
    { type: 'library', message: 'Return "Data Structures" book by tomorrow', priority: 'low' }
  ];

  const jobOffers = [
    { company: 'TCS', role: 'Software Developer', package: '₹3.5 LPA', status: 'Applied' },
    { company: 'Infosys', role: 'System Engineer', package: '₹4.0 LPA', status: 'Shortlisted' },
    { company: 'Wipro', role: 'Developer Trainee', package: '₹3.2 LPA', status: 'Pending' }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  notification.priority === 'high' ? 'bg-red-50 border-red-500' :
                  notification.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start">
                    <AlertCircle className={`w-4 h-4 mt-0.5 mr-2 ${
                      notification.priority === 'high' ? 'text-red-500' :
                      notification.priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobOffers.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{job.company}</p>
                    <p className="text-sm text-gray-600">{job.role}</p>
                    <p className="text-sm font-medium text-green-600">{job.package}</p>
                  </div>
                  <Badge 
                    variant={job.status === 'Shortlisted' ? 'default' : 'secondary'}
                    className={
                      job.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                      job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Semester Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completed</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-xs text-gray-600">Total Subjects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">9</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Mathematics</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Physics</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Chemistry</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Computer Science</span>
                <span className="font-medium">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Assignment Submitted</p>
                <p className="text-xs text-blue-700">Data Structures - Lab 5</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">Fee Payment</p>
                <p className="text-xs text-green-700">Semester fee paid successfully</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900">Library Book</p>
                <p className="text-xs text-purple-700">Issued "Algorithm Design"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;