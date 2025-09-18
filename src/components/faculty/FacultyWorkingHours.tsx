import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, Plus, Edit, Calendar } from 'lucide-react';

interface FacultyWorkingHoursProps {
  facultyData: any;
}

const FacultyWorkingHours: React.FC<FacultyWorkingHoursProps> = ({ facultyData }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const workingHoursData = [
    { date: '2024-03-01', classTaken: 'Data Structures - CSE 3A', hoursWorked: 8, remarks: 'Regular classes' },
    { date: '2024-03-02', classTaken: 'Database Systems - CSE 3B', hoursWorked: 6, remarks: 'Lab session' },
    { date: '2024-03-03', classTaken: 'Software Engineering - CSE 2A', hoursWorked: 8, remarks: 'Theory + Practical' },
    { date: '2024-03-04', classTaken: 'Data Structures - CSE 3A', hoursWorked: 4, remarks: 'Half day' },
    { date: '2024-03-05', classTaken: 'Database Systems - CSE 3B', hoursWorked: 8, remarks: 'Regular classes' }
  ];

  const monthlyStats = {
    totalHours: 160,
    requiredHours: 180,
    averageDaily: 8,
    daysWorked: 20
  };

  return (
    <div className="space-y-6">
      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{monthlyStats.totalHours}h</p>
              <p className="text-sm text-blue-100">Total Hours</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{monthlyStats.daysWorked}</p>
              <p className="text-sm text-green-100">Days Worked</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{monthlyStats.averageDaily}h</p>
              <p className="text-sm text-orange-100">Daily Average</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{monthlyStats.requiredHours - monthlyStats.totalHours}h</p>
              <p className="text-sm text-purple-100">Remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Working Hours Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Monthly Working Hours Report
            </CardTitle>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Hours
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-3">Add Working Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Class Details</label>
                  <input type="text" placeholder="Subject - Class" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hours Worked</label>
                  <input type="number" placeholder="8" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Remarks</label>
                  <input type="text" placeholder="Regular classes" className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm">Save</Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Class Taken</th>
                  <th className="text-left p-3">Hours Worked</th>
                  <th className="text-left p-3">Remarks</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workingHoursData.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{record.date}</td>
                    <td className="p-3">{record.classTaken}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{record.hoursWorked}h</Badge>
                    </td>
                    <td className="p-3">{record.remarks}</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hours Completed</span>
                <span>{monthlyStats.totalHours}/{monthlyStats.requiredHours} hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(monthlyStats.totalHours / monthlyStats.requiredHours) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Completion Rate</p>
                <p className="font-bold text-lg">{Math.round((monthlyStats.totalHours / monthlyStats.requiredHours) * 100)}%</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <Badge className={monthlyStats.totalHours >= monthlyStats.requiredHours ? 'bg-green-600' : 'bg-orange-600'}>
                  {monthlyStats.totalHours >= monthlyStats.requiredHours ? 'Target Met' : 'In Progress'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyWorkingHours;