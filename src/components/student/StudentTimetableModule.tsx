import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';

const StudentTimetableModule = () => {
  const timetableData = [
    {
      time: '9:00 AM',
      monday: { subject: 'Mathematics', type: 'Lecture', room: 'Room 101' },
      tuesday: { subject: 'Physics', type: 'Lecture', room: 'Room 102' },
      wednesday: { subject: 'Chemistry', type: 'Lab', room: 'Lab 201' },
      thursday: { subject: 'English', type: 'Lecture', room: 'Room 103' },
      friday: { subject: 'CS Lab', type: 'Lab', room: 'Lab 301' }
    },
    {
      time: '10:00 AM',
      monday: { subject: 'Physics', type: 'Lecture', room: 'Room 102' },
      tuesday: { subject: 'Mathematics', type: 'Tutorial', room: 'Room 104' },
      wednesday: { subject: 'Computer Science', type: 'Lecture', room: 'Room 105' },
      thursday: { subject: 'Chemistry', type: 'Lecture', room: 'Room 106' },
      friday: { subject: 'Physics Lab', type: 'Lab', room: 'Lab 202' }
    },
    {
      time: '11:00 AM',
      monday: { subject: 'Chemistry', type: 'Lecture', room: 'Room 106' },
      tuesday: { subject: 'Computer Science', type: 'Lecture', room: 'Room 105' },
      wednesday: { subject: 'Mathematics', type: 'Lecture', room: 'Room 101' },
      thursday: { subject: 'Physics', type: 'Lab', room: 'Lab 202' },
      friday: { subject: 'English', type: 'Tutorial', room: 'Room 107' }
    },
    {
      time: '12:00 PM',
      monday: { subject: 'Break', type: 'Break', room: '' },
      tuesday: { subject: 'Break', type: 'Break', room: '' },
      wednesday: { subject: 'Break', type: 'Break', room: '' },
      thursday: { subject: 'Break', type: 'Break', room: '' },
      friday: { subject: 'Break', type: 'Break', room: '' }
    },
    {
      time: '1:00 PM',
      monday: { subject: 'Computer Science', type: 'Lecture', room: 'Room 105' },
      tuesday: { subject: 'Chemistry Lab', type: 'Lab', room: 'Lab 201' },
      wednesday: { subject: 'Physics', type: 'Tutorial', room: 'Room 108' },
      thursday: { subject: 'Mathematics', type: 'Tutorial', room: 'Room 104' },
      friday: { subject: 'Computer Science', type: 'Lab', room: 'Lab 301' }
    },
    {
      time: '2:00 PM',
      monday: { subject: 'English', type: 'Lecture', room: 'Room 103' },
      tuesday: { subject: 'Physics', type: 'Lecture', room: 'Room 102' },
      wednesday: { subject: 'English', type: 'Tutorial', room: 'Room 107' },
      thursday: { subject: 'Computer Science', type: 'Lecture', room: 'Room 105' },
      friday: { subject: 'Free Period', type: 'Free', room: '' }
    }
  ];

  const academicEvents = [
    { date: 'March 15-20', event: 'Mid-term Examinations', type: 'exam' },
    { date: 'March 25', event: 'Holi Holiday', type: 'holiday' },
    { date: 'April 1-5', event: 'Project Submission Week', type: 'assignment' },
    { date: 'April 10', event: 'Sports Day', type: 'event' },
    { date: 'May 1-15', event: 'Final Examinations', type: 'exam' }
  ];

  const getSubjectColor = (subject: string, type: string) => {
    if (type === 'Break') return 'bg-gray-100 text-gray-600';
    if (type === 'Free') return 'bg-gray-50 text-gray-400';
    
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Physics': 'bg-green-100 text-green-800',
      'Chemistry': 'bg-purple-100 text-purple-800',
      'Computer Science': 'bg-orange-100 text-orange-800',
      'CS Lab': 'bg-orange-100 text-orange-800',
      'Physics Lab': 'bg-green-100 text-green-800',
      'Chemistry Lab': 'bg-purple-100 text-purple-800',
      'English': 'bg-pink-100 text-pink-800'
    };
    
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getEventColor = (type: string) => {
    const colors = {
      'exam': 'bg-red-100 text-red-800 border-red-200',
      'holiday': 'bg-green-100 text-green-800 border-green-200',
      'assignment': 'bg-blue-100 text-blue-800 border-blue-200',
      'event': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Weekly Timetable */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Weekly Time Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Time</th>
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Monday</th>
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Tuesday</th>
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Wednesday</th>
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Thursday</th>
                  <th className="text-left p-3 font-semibold text-gray-700 bg-gray-50">Friday</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900 bg-blue-50">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        {row.time}
                      </div>
                    </td>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => {
                      const dayData = row[day as keyof typeof row] as any;
                      return (
                        <td key={day} className="p-3">
                          <div className={`p-2 rounded-lg ${getSubjectColor(dayData.subject, dayData.type)}`}>
                            <p className="font-medium text-sm">{dayData.subject}</p>
                            {dayData.room && (
                              <p className="text-xs opacity-75 flex items-center mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {dayData.room}
                              </p>
                            )}
                            {dayData.type !== 'Break' && dayData.type !== 'Free' && (
                              <Badge variant="outline" className="text-xs mt-1">
                                {dayData.type}
                              </Badge>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Academic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Academic Calendar Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicEvents.map((event, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <p className="text-sm opacity-75 mt-1">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Mathematics</p>
                <p className="text-sm text-blue-700">Room 101 • Lecture</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">9:00 AM</p>
                <Badge variant="outline" className="text-xs">Current</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Physics</p>
                <p className="text-sm text-gray-700">Room 102 • Lecture</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">10:00 AM</p>
                <Badge variant="outline" className="text-xs">Next</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Chemistry</p>
                <p className="text-sm text-gray-700">Room 106 • Lecture</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">11:00 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTimetableModule;