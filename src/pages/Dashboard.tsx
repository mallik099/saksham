import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Building2, 
  BookOpen, 
  FileText, 
  TrendingUp,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

// Role-specific dashboard data
const getDefaultMetrics = (role: string) => {
  switch (role) {
    case 'admin':
      return {
        totalAdmissions: 1250,
        feeCollection: 850000,
        hostelOccupancy: 85,
        libraryBooks: 320,
        examRegistrations: 945,
        pendingApplications: 45,
        totalStudents: 1250,
        totalStaff: 89,
        totalRevenue: 2500000,
        outstandingFees: 125000,
      };
    case 'staff':
      return {
        hostelRooms: 45,
        hostelOccupancy: 85,
        libraryBooksIssued: 320,
        libraryReturnsToday: 15,
        examApplicationsToday: 12,
        pendingApprovals: 8,
      };
    case 'student':
      return {
        feesPaid: 15000,
        feesOutstanding: 5000,
        hostelRoom: 'A-204',
        libraryBooksIssued: 3,
        examRegistrations: 6,
        attendancePercentage: 89,
      };
    default:
      return {};
  }
};

const getDefaultChartData = (role: string) => {
  return {
    monthlyAdmissions: [
      { month: 'Jan', admissions: 145 + Math.floor(Math.random() * 20) },
      { month: 'Feb', admissions: 132 + Math.floor(Math.random() * 20) },
      { month: 'Mar', admissions: 178 + Math.floor(Math.random() * 20) },
      { month: 'Apr', admissions: 165 + Math.floor(Math.random() * 20) },
      { month: 'May', admissions: 142 + Math.floor(Math.random() * 20) },
      { month: 'Jun', admissions: 189 + Math.floor(Math.random() * 20) },
    ],
    feeCollection: [
      { month: 'Jan', collected: 85000, pending: 15000 },
      { month: 'Feb', collected: 92000, pending: 8000 },
      { month: 'Mar', collected: 88000, pending: 12000 },
      { month: 'Apr', collected: 95000, pending: 5000 },
      { month: 'May', collected: 87000, pending: 13000 },
      { month: 'Jun', collected: 98000, pending: 2000 },
    ],
    courseDistribution: [
      { course: 'Computer Science', students: 342, color: COLORS[0] },
      { course: 'Engineering', students: 298, color: COLORS[1] },
      { course: 'Business', students: 234, color: COLORS[2] },
      { course: 'Arts', students: 187, color: COLORS[3] },
      { course: 'Commerce', students: 186, color: COLORS[4] },
    ],
  };
};

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [metrics, setMetrics] = useState(getDefaultMetrics(user?.role || 'student'));
  const [chartData, setChartData] = useState(getDefaultChartData(user?.role || 'student'));

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch role-specific data
      const newMetrics = getDefaultMetrics(user?.role || 'student');
      
      // Add some random variation to simulate real-time updates
      if (user?.role === 'admin') {
        newMetrics.totalAdmissions += Math.floor(Math.random() * 5);
        newMetrics.examRegistrations += Math.floor(Math.random() * 10);
      }
      
      setMetrics(newMetrics);
      setChartData(getDefaultChartData(user?.role || 'student'));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up real-time updates every 30 seconds
    const pollInterval = parseInt(import.meta.env.VITE_DASHBOARD_POLL_INTERVAL || '30000');
    const interval = setInterval(fetchData, pollInterval);

    return () => clearInterval(interval);
  }, [user?.role]);

  const handleRefresh = () => {
    fetchData();
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'admin':
        return 'Administrative Dashboard';
      case 'staff':
        return 'Staff Dashboard';
      case 'student':
        return 'Student Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const renderAdminDashboard = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStudents?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.feeCollection?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hostel Occupancy</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.hostelOccupancy}%</div>
            <Progress value={metrics.hostelOccupancy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Registrations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.examRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts for Admin */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Monthly Admissions</CardTitle>
            <CardDescription>Student admissions over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.monthlyAdmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="admissions" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Student distribution across courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.courseDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="students"
                  label={({ course, students }) => `${course}: ${students}`}
                >
                  {chartData.courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderStaffDashboard = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hostel Rooms Managed</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.hostelRooms}</div>
          <p className="text-xs text-success">
            {metrics.hostelOccupancy}% occupied
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Library Books Issued</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.libraryBooksIssued}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.libraryReturnsToday} returns today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.pendingApprovals}</div>
          <p className="text-xs text-warning">
            Requires attention
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Paid:</span>
              <span className="text-success">${metrics.feesPaid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Outstanding:</span>
              <span className="text-destructive">${metrics.feesOutstanding?.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hostel Room</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.hostelRoom}</div>
          <p className="text-xs text-success">
            <CheckCircle className="inline h-3 w-3 mr-1" />
            Active allocation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.attendancePercentage}%</div>
          <Progress value={metrics.attendancePercentage} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );

  if (isLoading && !metrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{getDashboardTitle()}</h2>
          <p className="text-muted-foreground">
            {user?.role === 'admin' && 'Complete institutional overview and management'}
            {user?.role === 'staff' && 'Manage your department and student services'}
            {user?.role === 'student' && 'Your personal academic dashboard'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="outline" className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
            <span>Live Data</span>
          </Badge>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mb-4">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* Role-specific dashboard content */}
      {user?.role === 'admin' && renderAdminDashboard()}
      {user?.role === 'staff' && renderStaffDashboard()}
      {user?.role === 'student' && renderStudentDashboard()}

      {/* Quick Actions based on role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            {user?.role === 'admin' && 'Administrative tools and reports'}
            {user?.role === 'staff' && 'Common tasks for your department'}
            {user?.role === 'student' && 'Student services and information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {user?.role === 'admin' && (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Manage Users</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Generate Reports</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Fee Management</span>
                </div>
              </>
            )}
            {user?.role === 'staff' && (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Hostel Allocations</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Library Management</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Exam Approvals</span>
                </div>
              </>
            )}
            {user?.role === 'student' && (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Pay Fees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Library Services</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Exam Registration</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}