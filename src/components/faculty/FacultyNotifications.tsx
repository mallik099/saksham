import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, Calendar, Filter, Search, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

const FacultyNotifications: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Salary Slip Available for March 2024',
      content: 'Your salary slip for March 2024 is now available for download. Please review and download from the Salary Details section.',
      date: '2024-03-15',
      time: '10:30 AM',
      read: false,
      category: 'salary'
    },
    {
      id: 2,
      type: 'info',
      title: 'Working Hours Updated',
      content: 'Your working hours for the current month have been updated. Total hours: 160/180. Please ensure to complete the required hours.',
      date: '2024-03-14',
      time: '02:15 PM',
      read: false,
      category: 'attendance'
    },
    {
      id: 3,
      type: 'important',
      title: 'Faculty Meeting - March 20, 2024',
      content: 'Mandatory faculty meeting scheduled for March 20, 2024 at 3:00 PM in Conference Hall. Agenda: Curriculum updates and exam schedule.',
      date: '2024-03-13',
      time: '09:00 AM',
      read: true,
      category: 'meeting'
    },
    {
      id: 4,
      type: 'info',
      title: 'Student Feedback Forms Available',
      content: 'Student feedback forms for the current semester are now available. Please review feedback for your subjects in the Feedback section.',
      date: '2024-03-12',
      time: '11:45 AM',
      read: true,
      category: 'feedback'
    },
    {
      id: 5,
      type: 'urgent',
      title: 'Exam Schedule Released',
      content: 'Mid-semester examination schedule has been released. Please check your exam duties and invigilation assignments.',
      date: '2024-03-10',
      time: '04:20 PM',
      read: false,
      category: 'exam'
    },
    {
      id: 6,
      type: 'info',
      title: 'Library Book Return Reminder',
      content: 'You have 2 books due for return by March 18, 2024. Please return them to avoid late fees.',
      date: '2024-03-08',
      time: '01:30 PM',
      read: true,
      category: 'library'
    }
  ];

  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notificationList.filter(notif => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notif.read) ||
                         (filter === 'read' && notif.read) ||
                         notif.category === filter;
    
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notificationList.filter(notif => !notif.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'important': return <Bell className="h-5 w-5 text-orange-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? '50' : '100';
    switch (type) {
      case 'urgent': return `bg-red-${opacity} border-red-200`;
      case 'important': return `bg-orange-${opacity} border-orange-200`;
      default: return `bg-blue-${opacity} border-blue-200`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Notifications</p>
                <p className="text-2xl font-bold">{notificationList.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Read</p>
                <p className="text-2xl font-bold">{notificationList.length - unreadCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Week</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={markAllAsRead} size="sm" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                size="sm"
                variant={filter === 'urgent' ? 'default' : 'outline'}
                onClick={() => setFilter('urgent')}
              >
                Urgent
              </Button>
              <Button
                size="sm"
                variant={filter === 'salary' ? 'default' : 'outline'}
                onClick={() => setFilter('salary')}
              >
                Salary
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                    notification.read ? 'bg-gray-50' : 'bg-white shadow-sm'
                  } ${getNotificationBg(notification.type, notification.read)}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {notification.category}
                          </Badge>
                        </div>
                      </div>
                      <p className={`text-sm mb-2 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{notification.date}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyNotifications;