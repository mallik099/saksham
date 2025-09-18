import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Users, 
  Bell, Star, Filter, Download, Plus,
  GraduationCap, Trophy, Music, Palette,
  BookOpen, Heart, Zap, Target
} from 'lucide-react';

const ParentEvents = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');

  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      description: 'Individual meetings with subject teachers to discuss academic progress',
      date: '2024-04-05',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      category: 'academic',
      priority: 'high',
      attendees: 150,
      status: 'upcoming',
      organizer: 'Academic Department',
      rsvp: 'pending',
      agenda: ['Academic Performance Review', 'Future Goals Discussion', 'Feedback Session']
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      description: 'Inter-house sports competition and athletic events',
      date: '2024-04-12',
      time: '8:00 AM - 5:00 PM',
      location: 'Sports Complex',
      category: 'sports',
      priority: 'medium',
      attendees: 500,
      status: 'upcoming',
      organizer: 'Sports Department',
      rsvp: 'confirmed',
      agenda: ['Opening Ceremony', 'Athletic Events', 'Prize Distribution']
    },
    {
      id: 3,
      title: 'Science Exhibition',
      description: 'Student projects and innovations showcase',
      date: '2024-04-18',
      time: '9:00 AM - 3:00 PM',
      location: 'Science Block',
      category: 'academic',
      priority: 'medium',
      attendees: 200,
      status: 'upcoming',
      organizer: 'Science Department',
      rsvp: 'confirmed',
      agenda: ['Project Presentations', 'Innovation Awards', 'Interactive Sessions']
    },
    {
      id: 4,
      title: 'Cultural Fest - Harmony 2024',
      description: 'Annual cultural festival with music, dance, and drama performances',
      date: '2024-04-25',
      time: '6:00 PM - 10:00 PM',
      location: 'Open Air Theatre',
      category: 'cultural',
      priority: 'high',
      attendees: 800,
      status: 'upcoming',
      organizer: 'Cultural Committee',
      rsvp: 'confirmed',
      agenda: ['Cultural Performances', 'Art Exhibition', 'Food Festival']
    },
    {
      id: 5,
      title: 'Career Guidance Workshop',
      description: 'Industry experts sharing insights on career opportunities',
      date: '2024-05-02',
      time: '2:00 PM - 5:00 PM',
      location: 'Conference Hall',
      category: 'workshop',
      priority: 'high',
      attendees: 100,
      status: 'upcoming',
      organizer: 'Placement Cell',
      rsvp: 'pending',
      agenda: ['Industry Trends', 'Skill Development', 'Q&A Session']
    },
    {
      id: 6,
      title: 'Alumni Meet 2024',
      description: 'Annual gathering of alumni and current students',
      date: '2024-05-10',
      time: '11:00 AM - 8:00 PM',
      location: 'Campus Grounds',
      category: 'social',
      priority: 'medium',
      attendees: 300,
      status: 'upcoming',
      organizer: 'Alumni Association',
      rsvp: 'not_required',
      agenda: ['Networking Session', 'Success Stories', 'Campus Tour']
    }
  ];

  const pastEvents = [
    {
      id: 7,
      title: 'Semester End Examination',
      description: 'Final examinations for Semester 5',
      date: '2024-03-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Examination Halls',
      category: 'academic',
      priority: 'high',
      attendees: 60,
      status: 'completed',
      organizer: 'Examination Department',
      feedback: 'Excellent organization and smooth conduct'
    },
    {
      id: 8,
      title: 'Tech Symposium 2024',
      description: 'Technical presentations and competitions',
      date: '2024-03-08',
      time: '10:00 AM - 4:00 PM',
      location: 'IT Block',
      category: 'technical',
      priority: 'medium',
      attendees: 250,
      status: 'completed',
      organizer: 'Computer Science Department',
      feedback: 'Great learning experience for students'
    }
  ];

  const eventCategories = [
    { id: 'all', name: 'All Events', icon: CalendarIcon, color: 'bg-gray-100 text-gray-800' },
    { id: 'academic', name: 'Academic', icon: GraduationCap, color: 'bg-blue-100 text-blue-800' },
    { id: 'sports', name: 'Sports', icon: Trophy, color: 'bg-green-100 text-green-800' },
    { id: 'cultural', name: 'Cultural', icon: Music, color: 'bg-purple-100 text-purple-800' },
    { id: 'technical', name: 'Technical', icon: Zap, color: 'bg-orange-100 text-orange-800' },
    { id: 'workshop', name: 'Workshop', icon: BookOpen, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'social', name: 'Social', icon: Heart, color: 'bg-pink-100 text-pink-800' }
  ];

  const upcomingReminders = [
    {
      event: 'Parent-Teacher Meeting',
      date: '2024-04-05',
      daysLeft: 15,
      action: 'RSVP Required'
    },
    {
      event: 'Annual Sports Day',
      date: '2024-04-12',
      daysLeft: 22,
      action: 'Volunteer Registration Open'
    },
    {
      event: 'Career Guidance Workshop',
      date: '2024-05-02',
      daysLeft: 42,
      action: 'Registration Required'
    }
  ];

  const eventStats = {
    totalEvents: events.length,
    confirmedAttendance: events.filter(e => e.rsvp === 'confirmed').length,
    pendingRSVP: events.filter(e => e.rsvp === 'pending').length,
    highPriorityEvents: events.filter(e => e.priority === 'high').length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRSVPColor = (rsvp: string) => {
    switch (rsvp) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'declined': return 'text-red-600 bg-red-100';
      case 'not_required': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = eventCategories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : CalendarIcon;
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events & Calendar</h2>
          <p className="text-gray-600">Stay updated with school events and important dates</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Calendar
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Bell className="w-4 h-4 mr-2" />
            Set Reminder
          </Button>
        </div>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{eventStats.totalEvents}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{eventStats.confirmedAttendance}</p>
                <p className="text-xs text-green-600">RSVP Confirmed</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending RSVP</p>
                <p className="text-2xl font-bold text-yellow-600">{eventStats.pendingRSVP}</p>
                <p className="text-xs text-yellow-600">Action Required</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{eventStats.highPriorityEvents}</p>
                <p className="text-xs text-red-600">Important Events</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Categories Filter */}
      <Card className="dashboard-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  {filteredEvents.map((event) => {
                    const Icon = getCategoryIcon(event.category);
                    return (
                      <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon className="w-5 h-5 text-blue-600" />
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <Badge className={getPriorityColor(event.priority)}>
                                {event.priority}
                              </Badge>
                              <Badge className={getRSVPColor(event.rsvp)}>
                                {event.rsvp.replace('_', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                {event.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.attendees} expected attendees • Organized by {event.organizer}
                              </span>
                            </div>
                            {event.agenda && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Agenda:</p>
                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                  {event.agenda.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2">
                            {event.rsvp === 'pending' && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                RSVP Now
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Bell className="w-4 h-4 mr-1" />
                              Remind Me
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {pastEvents.map((event) => {
                    const Icon = getCategoryIcon(event.category);
                    return (
                      <div key={event.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon className="w-5 h-5 text-gray-600" />
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <Badge className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                {event.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                            {event.feedback && (
                              <div className="mt-3 p-2 bg-green-50 rounded">
                                <p className="text-sm text-green-800">
                                  <strong>Feedback:</strong> {event.feedback}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              View Photos
                            </Button>
                            <Button variant="outline" size="sm">
                              Download Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Reminders */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Event Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-gray-900">
                  Events on {selectedDate?.toDateString()}
                </h4>
                <div className="space-y-1">
                  <div className="text-sm p-2 bg-blue-50 rounded">
                    <span className="font-medium">Parent-Teacher Meeting</span>
                    <br />
                    <span className="text-gray-600">10:00 AM - Main Auditorium</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReminders.map((reminder, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{reminder.event}</p>
                      <p className="text-sm text-gray-600">{reminder.date}</p>
                      <p className="text-xs text-yellow-700">{reminder.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">{reminder.daysLeft}</p>
                      <p className="text-xs text-gray-500">days left</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Personal Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export to Google Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Manage Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParentEvents;