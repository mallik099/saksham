import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardAPI } from '@/services/api';
import { 
  UserPlus, 
  CreditCard, 
  Building2, 
  BookOpen, 
  FileText, 
  TrendingUp,
  Users,
  DollarSign
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

interface DashboardMetrics {
  totalAdmissions: number;
  feeCollectionPercentage: number;
  hostelOccupancyPercentage: number;
  libraryBorrowedBooks: number;
  examRegistrations: number;
}

interface ChartData {
  monthlyAdmissions: Array<{ month: string; admissions: number }>;
  feeCollection: Array<{ month: string; collected: number; pending: number }>;
  courseDistribution: Array<{ course: string; students: number; color: string }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAdmissions: 0,
    feeCollectionPercentage: 0,
    hostelOccupancyPercentage: 0,
    libraryBorrowedBooks: 0,
    examRegistrations: 0,
  });
  const [chartData, setChartData] = useState<ChartData>({
    monthlyAdmissions: [],
    feeCollection: [],
    courseDistribution: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API calls with mock data for demonstration
        const mockMetrics: DashboardMetrics = {
          totalAdmissions: 1247,
          feeCollectionPercentage: 87.5,
          hostelOccupancyPercentage: 92.3,
          libraryBorrowedBooks: 534,
          examRegistrations: 856,
        };

        const mockChartData: ChartData = {
          monthlyAdmissions: [
            { month: 'Jan', admissions: 145 },
            { month: 'Feb', admissions: 132 },
            { month: 'Mar', admissions: 178 },
            { month: 'Apr', admissions: 165 },
            { month: 'May', admissions: 142 },
            { month: 'Jun', admissions: 189 },
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

        // In a real app, you would call:
        // const [metricsData, chartResponse] = await Promise.all([
        //   dashboardAPI.getMetrics(),
        //   dashboardAPI.getChartData()
        // ]);

        setMetrics(mockMetrics);
        setChartData(mockChartData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const metricCards = [
    {
      title: 'Total Admissions',
      value: metrics.totalAdmissions.toLocaleString(),
      icon: UserPlus,
      change: '+12.5%',
      changeType: 'increase' as const,
      color: 'text-university-blue',
    },
    {
      title: 'Fee Collection',
      value: `${metrics.feeCollectionPercentage}%`,
      icon: CreditCard,
      change: '+3.2%',
      changeType: 'increase' as const,
      color: 'text-success',
    },
    {
      title: 'Hostel Occupancy',
      value: `${metrics.hostelOccupancyPercentage}%`,
      icon: Building2,
      change: '-1.8%',
      changeType: 'decrease' as const,
      color: 'text-info',
    },
    {
      title: 'Library Books',
      value: metrics.libraryBorrowedBooks.toLocaleString(),
      icon: BookOpen,
      change: '+8.7%',
      changeType: 'increase' as const,
      color: 'text-warning',
    },
    {
      title: 'Exam Registrations',
      value: metrics.examRegistrations.toLocaleString(),
      icon: FileText,
      change: '+15.3%',
      changeType: 'increase' as const,
      color: 'text-primary',
    },
  ];

  if (isLoading) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of college ERP system metrics</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((card) => (
          <Card key={card.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${
                card.changeType === 'increase' ? 'text-success' : 'text-destructive'
              }`}>
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Admissions Chart */}
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

        {/* Course Distribution Chart */}
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

        {/* Fee Collection Chart */}
        <Card className="shadow-md md:col-span-2">
          <CardHeader>
            <CardTitle>Fee Collection Status</CardTitle>
            <CardDescription>Monthly fee collection vs pending amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.feeCollection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="hsl(var(--success))" name="Collected" />
                <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}