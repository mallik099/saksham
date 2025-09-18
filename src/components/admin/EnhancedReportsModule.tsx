import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart
} from 'recharts';
import { 
  Download, Filter, Calendar, TrendingUp, Users, 
  GraduationCap, DollarSign, BookOpen, Award, AlertCircle
} from 'lucide-react';

const EnhancedReportsModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Enhanced Chart Data
  const academicPerformanceData = [
    { subject: 'Mathematics', excellent: 45, good: 35, average: 15, poor: 5, totalStudents: 120 },
    { subject: 'Physics', excellent: 38, good: 42, average: 18, poor: 2, totalStudents: 115 },
    { subject: 'Chemistry', excellent: 52, good: 28, average: 16, poor: 4, totalStudents: 108 },
    { subject: 'Computer Science', excellent: 65, good: 25, average: 8, poor: 2, totalStudents: 145 },
    { subject: 'Electronics', excellent: 41, good: 39, average: 17, poor: 3, totalStudents: 98 },
    { subject: 'Mechanical', excellent: 35, good: 45, average: 18, poor: 2, totalStudents: 132 }
  ];

  const attendanceAnalytics = [
    { month: 'Jan', overall: 92, cs: 94, me: 89, ec: 91, cv: 88 },
    { month: 'Feb', overall: 89, cs: 91, me: 87, ec: 88, cv: 85 },
    { month: 'Mar', overall: 91, cs: 93, me: 90, ec: 89, cv: 87 },
    { month: 'Apr', overall: 88, cs: 90, me: 86, ec: 87, cv: 84 },
    { month: 'May', overall: 90, cs: 92, me: 88, ec: 89, cv: 86 }
  ];

  const placementTrends = [
    { year: '2020', placed: 245, totalStudents: 320, percentage: 76.6, avgPackage: 4.2 },
    { year: '2021', placed: 278, totalStudents: 335, percentage: 83.0, avgPackage: 4.8 },
    { year: '2022', placed: 312, totalStudents: 350, percentage: 89.1, avgPackage: 5.5 },
    { year: '2023', placed: 298, totalStudents: 340, percentage: 87.6, avgPackage: 6.2 },
    { year: '2024', placed: 285, totalStudents: 365, percentage: 78.1, avgPackage: 6.8 }
  ];

  const departmentWiseData = [
    { department: 'Computer Science', students: 450, faculty: 25, avgCGPA: 8.2, placementRate: 92 },
    { department: 'Mechanical', students: 380, faculty: 22, avgCGPA: 7.8, placementRate: 85 },
    { department: 'Electronics', students: 320, faculty: 18, avgCGPA: 7.9, placementRate: 88 },
    { department: 'Civil', students: 290, faculty: 16, avgCGPA: 7.6, placementRate: 78 },
    { department: 'Chemical', students: 180, faculty: 12, avgCGPA: 7.7, placementRate: 82 }
  ];

  const feeCollectionData = [
    { month: 'Jan', collected: 2850000, pending: 450000, total: 3300000 },
    { month: 'Feb', collected: 3200000, pending: 380000, total: 3580000 },
    { month: 'Mar', collected: 3450000, pending: 320000, total: 3770000 },
    { month: 'Apr', collected: 3680000, pending: 280000, total: 3960000 },
    { month: 'May', collected: 3850000, pending: 250000, total: 4100000 }
  ];

  const examAnalytics = [
    { exam: 'Mid-Term 1', passRate: 89, avgMarks: 76, topScore: 98, subjects: 6 },
    { exam: 'Mid-Term 2', passRate: 92, avgMarks: 78, topScore: 96, subjects: 6 },
    { exam: 'Final Sem 1', passRate: 87, avgMarks: 74, topScore: 99, subjects: 8 },
    { exam: 'Final Sem 2', passRate: 91, avgMarks: 77, topScore: 97, subjects: 8 }
  ];

  const libraryUsageData = [
    { month: 'Jan', booksIssued: 1250, returned: 1180, overdue: 70, newMembers: 45 },
    { month: 'Feb', booksIssued: 1380, returned: 1320, overdue: 60, newMembers: 38 },
    { month: 'Mar', booksIssued: 1420, returned: 1350, overdue: 70, newMembers: 52 },
    { month: 'Apr', booksIssued: 1180, returned: 1150, overdue: 30, newMembers: 28 },
    { month: 'May', booksIssued: 980, returned: 950, overdue: 30, newMembers: 15 }
  ];

  const hostelOccupancyData = [
    { block: 'Block A', capacity: 200, occupied: 185, vacant: 15, occupancyRate: 92.5 },
    { block: 'Block B', capacity: 180, occupied: 165, vacant: 15, occupancyRate: 91.7 },
    { block: 'Block C', capacity: 220, occupied: 198, vacant: 22, occupancyRate: 90.0 },
    { block: 'Block D', capacity: 160, occupied: 142, vacant: 18, occupancyRate: 88.8 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const generatePDFReport = () => {
    console.log('Generating comprehensive PDF report...');
  };

  const exportToExcel = () => {
    console.log('Exporting data to Excel...');
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Advanced Analytics & Reports</h3>
          <p className="text-gray-600">Comprehensive institutional performance analysis</p>
        </div>
        <div className="flex space-x-3">
          <select 
            className="px-3 py-2 border rounded-md"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="semester">Current Semester</option>
            <option value="year">Academic Year</option>
            <option value="quarter">Quarter</option>
          </select>
          <select 
            className="px-3 py-2 border rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="cs">Computer Science</option>
            <option value="me">Mechanical</option>
            <option value="ec">Electronics</option>
            <option value="cv">Civil</option>
          </select>
          <Button variant="outline" onClick={generatePDFReport}>
            <Download className="w-4 h-4 mr-2" />
            PDF Report
          </Button>
          <Button variant="outline" onClick={exportToExcel}>
            <Download className="w-4 h-4 mr-2" />
            Excel Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Performance</p>
                <p className="text-2xl font-bold text-green-600">87.5%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+2.3% from last sem
                </p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">90.2%</p>
                <p className="text-xs text-blue-600">Above target (85%)</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Placement Rate</p>
                <p className="text-2xl font-bold text-purple-600">78.1%</p>
                <p className="text-xs text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />-9.5% from last year
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fee Collection</p>
                <p className="text-2xl font-bold text-orange-600">93.9%</p>
                <p className="text-xs text-orange-600">₹25L pending</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Library Usage</p>
                <p className="text-2xl font-bold text-pink-600">1,420</p>
                <p className="text-xs text-pink-600">Books issued/month</p>
              </div>
              <BookOpen className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Academic Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={academicPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="excellent" stackId="a" fill="#10B981" name="Excellent (90-100%)" />
                  <Bar dataKey="good" stackId="a" fill="#3B82F6" name="Good (75-89%)" />
                  <Bar dataKey="average" stackId="a" fill="#F59E0B" name="Average (60-74%)" />
                  <Bar dataKey="poor" stackId="a" fill="#EF4444" name="Poor (<60%)" />
                  <Line type="monotone" dataKey="totalStudents" stroke="#8B5CF6" strokeWidth={2} name="Total Students" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Department-wise Attendance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="overall" stroke="#374151" strokeWidth={3} name="Overall" />
                  <Line type="monotone" dataKey="cs" stroke="#3B82F6" strokeWidth={2} name="Computer Science" />
                  <Line type="monotone" dataKey="me" stroke="#10B981" strokeWidth={2} name="Mechanical" />
                  <Line type="monotone" dataKey="ec" stroke="#F59E0B" strokeWidth={2} name="Electronics" />
                  <Line type="monotone" dataKey="cv" stroke="#EF4444" strokeWidth={2} name="Civil" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placement & Financial Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              5-Year Placement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={placementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="placed" fill="#3B82F6" name="Students Placed" />
                  <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#10B981" strokeWidth={3} name="Placement %" />
                  <Line yAxisId="right" type="monotone" dataKey="avgPackage" stroke="#F59E0B" strokeWidth={2} name="Avg Package (LPA)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Fee Collection Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={feeCollectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Area type="monotone" dataKey="collected" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Collected" />
                  <Area type="monotone" dataKey="pending" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Pending" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Department-wise Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700">Department</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Students</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Faculty</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Student:Faculty Ratio</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Avg CGPA</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Placement Rate</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {departmentWiseData.map((dept, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{dept.department}</td>
                    <td className="p-3">{dept.students}</td>
                    <td className="p-3">{dept.faculty}</td>
                    <td className="p-3">{Math.round(dept.students / dept.faculty)}:1</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="font-medium">{dept.avgCGPA}</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(dept.avgCGPA / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <span className="font-medium">{dept.placementRate}%</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${dept.placementRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        dept.avgCGPA >= 8.0 && dept.placementRate >= 90 ? 'default' :
                        dept.avgCGPA >= 7.5 && dept.placementRate >= 80 ? 'secondary' : 'outline'
                      }>
                        {dept.avgCGPA >= 8.0 && dept.placementRate >= 90 ? 'Excellent' :
                         dept.avgCGPA >= 7.5 && dept.placementRate >= 80 ? 'Good' : 'Average'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exam Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={examAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exam" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passRate" fill="#10B981" name="Pass Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Library Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={libraryUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="booksIssued" stroke="#3B82F6" strokeWidth={2} name="Books Issued" />
                  <Line type="monotone" dataKey="returned" stroke="#10B981" strokeWidth={2} name="Books Returned" />
                  <Line type="monotone" dataKey="overdue" stroke="#EF4444" strokeWidth={2} name="Overdue Books" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hostel Occupancy Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hostelOccupancyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="occupied"
                    label={({ block, occupancyRate }) => `${block}: ${occupancyRate}%`}
                  >
                    {hostelOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Report */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Academic Excellence</h4>
              <p className="text-sm text-blue-700 mt-1">Computer Science leads with 8.2 CGPA average. Overall institutional performance up by 2.3%.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Attendance Compliance</h4>
              <p className="text-sm text-green-700 mt-1">90.2% overall attendance exceeds target. All departments above 85% threshold.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900">Placement Concerns</h4>
              <p className="text-sm text-yellow-700 mt-1">78.1% placement rate down 9.5% from last year. Requires strategic intervention.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Financial Health</h4>
              <p className="text-sm text-purple-700 mt-1">93.9% fee collection rate with ₹25L pending. Strong financial position maintained.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedReportsModule;