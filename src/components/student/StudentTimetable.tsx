import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StudentTimetableProps {
  studentData: any;
}

const StudentTimetable: React.FC<StudentTimetableProps> = ({ studentData }) => {
  const timetable = {
    'Monday': [
      { time: '9:00-10:00', subject: 'Data Structures', room: 'CS-101', faculty: 'Dr. Smith' },
      { time: '10:00-11:00', subject: 'Database Systems', room: 'CS-102', faculty: 'Prof. Johnson' },
      { time: '11:15-12:15', subject: 'Computer Networks', room: 'CS-103', faculty: 'Dr. Brown' },
      { time: '1:15-2:15', subject: 'Software Engineering', room: 'CS-104', faculty: 'Prof. Davis' },
      { time: '2:15-3:15', subject: 'Lab - DS', room: 'Lab-1', faculty: 'Dr. Smith' }
    ],
    'Tuesday': [
      { time: '9:00-10:00', subject: 'Operating Systems', room: 'CS-105', faculty: 'Dr. Wilson' },
      { time: '10:00-11:00', subject: 'Computer Graphics', room: 'CS-106', faculty: 'Prof. Miller' },
      { time: '11:15-12:15', subject: 'Data Structures', room: 'CS-101', faculty: 'Dr. Smith' },
      { time: '1:15-2:15', subject: 'Database Systems', room: 'CS-102', faculty: 'Prof. Johnson' },
      { time: '2:15-3:15', subject: 'Lab - DBMS', room: 'Lab-2', faculty: 'Prof. Johnson' }
    ],
    'Wednesday': [
      { time: '9:00-10:00', subject: 'Computer Networks', room: 'CS-103', faculty: 'Dr. Brown' },
      { time: '10:00-11:00', subject: 'Software Engineering', room: 'CS-104', faculty: 'Prof. Davis' },
      { time: '11:15-12:15', subject: 'Operating Systems', room: 'CS-105', faculty: 'Dr. Wilson' },
      { time: '1:15-2:15', subject: 'Computer Graphics', room: 'CS-106', faculty: 'Prof. Miller' },
      { time: '2:15-3:15', subject: 'Project Work', room: 'CS-107', faculty: 'All Faculty' }
    ],
    'Thursday': [
      { time: '9:00-10:00', subject: 'Data Structures', room: 'CS-101', faculty: 'Dr. Smith' },
      { time: '10:00-11:00', subject: 'Database Systems', room: 'CS-102', faculty: 'Prof. Johnson' },
      { time: '11:15-12:15', subject: 'Computer Networks', room: 'CS-103', faculty: 'Dr. Brown' },
      { time: '1:15-2:15', subject: 'Software Engineering', room: 'CS-104', faculty: 'Prof. Davis' },
      { time: '2:15-3:15', subject: 'Lab - CN', room: 'Lab-3', faculty: 'Dr. Brown' }
    ],
    'Friday': [
      { time: '9:00-10:00', subject: 'Operating Systems', room: 'CS-105', faculty: 'Dr. Wilson' },
      { time: '10:00-11:00', subject: 'Computer Graphics', room: 'CS-106', faculty: 'Prof. Miller' },
      { time: '11:15-12:15', subject: 'Seminar', room: 'Seminar Hall', faculty: 'Guest Speaker' },
      { time: '1:15-2:15', subject: 'Tutorial', room: 'CS-108', faculty: 'Class Teacher' },
      { time: '2:15-3:15', subject: 'Sports/Library', room: 'Ground/Library', faculty: '-' }
    ]
  };

  const days = Object.keys(timetable);
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Timetable - {studentData.course} ({studentData.section})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {days.map((day) => (
              <Card key={day} className={currentDay === day ? 'border-blue-500 bg-blue-50' : ''}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {day}
                    {currentDay === day && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Today</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {timetable[day as keyof typeof timetable].map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{period.subject}</div>
                          <div className="text-sm text-gray-600">{period.faculty}</div>
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
    </div>
  );
};

export default StudentTimetable;