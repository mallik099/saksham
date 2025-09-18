import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  GraduationCap,
  Building2,
  IndianRupee,
  ActivitySquare,
  BarChart
} from 'lucide-react';

const statsCards = [
  {
    title: 'Total Students',
    value: '3,456',
    icon: Users,
    change: '+12%',
    trend: 'up'
  },
  {
    title: 'Total Faculty',
    value: '246',
    icon: GraduationCap,
    change: '+5%',
    trend: 'up'
  },
  {
    title: 'Departments',
    value: '12',
    icon: Building2,
    change: '0%',
    trend: 'neutral'
  },
  {
    title: 'Revenue',
    value: '₹24.5L',
    icon: IndianRupee,
    change: '+18%',
    trend: 'up'
  }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${
                card.trend === 'up' ? 'text-green-500' : 
                card.trend === 'down' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                {card.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add Chart Component here */}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add Activity List Component here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;