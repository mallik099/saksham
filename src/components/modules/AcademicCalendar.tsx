import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, CreditCard, Sun } from 'lucide-react';

const mockEvents = [
  { id: 1, date: '2024-02-15', type: 'exam', title: 'Mid-term Physics', color: 'bg-blue-100 text-blue-800' },
  { id: 2, date: '2024-02-18', type: 'fee', title: 'Library Fee Due', color: 'bg-red-100 text-red-800' },
  { id: 3, date: '2024-02-20', type: 'holiday', title: 'Republic Day', color: 'bg-green-100 text-green-800' },
  { id: 4, date: '2024-02-25', type: 'exam', title: 'Chemistry Test', color: 'bg-blue-100 text-blue-800' },
  { id: 5, date: '2024-03-01', type: 'fee', title: 'Tuition Fee Due', color: 'bg-red-100 text-red-800' }
];

const AcademicCalendar = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 1)); // February 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `2024-02-${day.toString().padStart(2, '0')}`;
    return mockEvents.filter(event => event.date === dateStr);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="w-3 h-3" />;
      case 'fee': return <CreditCard className="w-3 h-3" />;
      case 'holiday': return <Sun className="w-3 h-3" />;
      default: return null;
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div key={index} className="min-h-[80px] p-1 border border-gray-100">
            {day && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                <div className="space-y-1">
                  {getEventsForDate(day).map(event => (
                    <Badge key={event.id} className={`${event.color} text-xs p-1 flex items-center`}>
                      {getIcon(event.type)}
                      <span className="ml-1 truncate">{event.title}</span>
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayEvents = mockEvents.filter(event => 
            event.date === day.toISOString().split('T')[0]
          );
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="text-center mb-2">
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold text-gray-900">{day.getDate()}</div>
              </div>
              <div className="space-y-2">
                {dayEvents.map(event => (
                  <div key={event.id} className={`${event.color} p-2 rounded text-xs flex items-center`}>
                    {getIcon(event.type)}
                    <span className="ml-1">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-blue-700">
            <Calendar className="w-5 h-5 mr-2" />
            Academic Calendar
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === 'month' ? renderMonthView() : renderWeekView()}
      </CardContent>
    </Card>
  );
};

export default AcademicCalendar;