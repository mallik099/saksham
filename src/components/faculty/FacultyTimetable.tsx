import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface FacultyTimetableProps {
  facultyData: any;
}

const FacultyTimetable: React.FC<FacultyTimetableProps> = ({ facultyData }) => {
  const timetable = {
    'Monday': [
      { time: '9:00-10:00', subject: 'Data Structures', class: 'CS-6A', room: 'CS-101' },
      { time: '10:00-11:00', subject: 'Database Systems', class: 'CS-6B', room: 'CS-102' },
      { time: '2:00-3:00', subject: 'Software Engineering', class: 'CS-5A', room: 'CS-103' }
    ],
    'Tuesday': [
      { time: '9:00-10:00', subject: 'Data Structures', class: 'CS-6A', room: 'CS-101' },
      { time: '11:00-12:00', subject: 'Database Systems', class: 'CS-6B', room: 'CS-102' },
      { time: '3:00-4:00', subject: 'Lab - Database', class: 'CS-6B', room: 'Lab-2' }
    ],
    'Wednesday': [
      { time: '10:00-11:00', subject: 'Software Engineering', class: 'CS-5A', room: 'CS-103' },
      { time: '11:00-12:00', subject: 'Data Structures', class: 'CS-6A', room: 'CS-101' },
      { time: '2:00-3:00', subject: 'Database Systems', class: 'CS-6B', room: 'CS-102' }
    ],
    'Thursday': [
      { time: '9:00-10:00', subject: 'Data Structures', class: 'CS-6A', room: 'CS-101' },
      { time: '10:00-11:00', subject: 'Software Engineering', class: 'CS-5A', room: 'CS-103' },
      { time: '3:00-4:00', subject: 'Lab - Data Structures', class: 'CS-6A', room: 'Lab-1' }
    ],
    'Friday': [
      { time: '9:00-10:00', subject: 'Database Systems', class: 'CS-6B', room: 'CS-102' },
      { time: '11:00-12:00', subject: 'Software Engineering', class: 'CS-5A', room: 'CS-103' },
      { time: '2:00-3:00', subject: 'Faculty Meeting', class: 'All', room: 'Conference Room' }
    ]
  };

  const days = Object.keys(timetable);
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Teaching Schedule - {facultyData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {days.map((day) => (
              <Card key={day} className={currentDay === day ? 'border-green-500 bg-green-50' : ''}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {day}
                    {currentDay === day && (
                      <Badge className="bg-green-500">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {timetable[day as keyof typeof timetable].map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{period.subject}</div>
                          <div className="text-sm text-gray-600">Class: {period.class}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{period.time}</div>
                          <div className="text-xs text-gray-600">{period.room}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {facultyData.subjects.map((subject: string, index: number) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium">{subject}</h4>
                <p className="text-sm text-gray-600">
                  Classes: {facultyData.classes.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyTimetable;