import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  MessageSquare, Send, Phone, Video, Mail, 
  Bell, User, Clock, Search, Filter,
  Paperclip, Star, Archive, Trash2,
  CheckCircle, AlertCircle, Info, Calendar
} from 'lucide-react';

const ParentCommunication = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Dr. Smith Johnson',
      role: 'Class Teacher',
      subject: 'Machine Learning',
      lastMessage: 'Alex has shown excellent progress in the recent assignments.',
      timestamp: '2024-03-20 10:30 AM',
      unread: 2,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Prof. Emily Davis',
      role: 'Subject Teacher',
      subject: 'Database Systems',
      lastMessage: 'Please ensure Alex completes the pending lab assignments.',
      timestamp: '2024-03-19 2:15 PM',
      unread: 0,
      status: 'offline',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      role: 'HOD',
      subject: 'Computer Science',
      lastMessage: 'Invitation to parent-teacher meeting on April 5th.',
      timestamp: '2024-03-18 11:45 AM',
      unread: 1,
      status: 'busy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Ms. Sarah Wilson',
      role: 'Counselor',
      subject: 'Student Counseling',
      lastMessage: 'Alex is doing well academically and socially.',
      timestamp: '2024-03-17 4:20 PM',
      unread: 0,
      status: 'online',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith Johnson',
      content: 'Good morning Mr. Johnson! I wanted to update you on Alex\'s performance in Machine Learning.',
      timestamp: '2024-03-20 10:15 AM',
      type: 'received',
      attachments: []
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you for reaching out. How is Alex doing in the recent assignments?',
      timestamp: '2024-03-20 10:18 AM',
      type: 'sent',
      attachments: []
    },
    {
      id: 3,
      sender: 'Dr. Smith Johnson',
      content: 'Alex has shown excellent progress in the recent assignments. His understanding of neural networks has improved significantly.',
      timestamp: '2024-03-20 10:30 AM',
      type: 'received',
      attachments: ['assignment_feedback.pdf']
    },
    {
      id: 4,
      sender: 'You',
      content: 'That\'s wonderful to hear! Are there any areas where Alex needs to focus more?',
      timestamp: '2024-03-20 10:35 AM',
      type: 'sent',
      attachments: []
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'announcement',
      title: 'Parent-Teacher Meeting',
      message: 'Scheduled for April 5th, 2024 at 10:00 AM',
      timestamp: '2024-03-20 9:00 AM',
      priority: 'high',
      read: false,
      sender: 'Administration'
    },
    {
      id: 2,
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Machine Learning Assignment 3 - Grade: A (85/100)',
      timestamp: '2024-03-19 3:30 PM',
      priority: 'medium',
      read: false,
      sender: 'Dr. Smith Johnson'
    },
    {
      id: 3,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Alex was absent from Database Systems class today',
      timestamp: '2024-03-18 11:00 AM',
      priority: 'medium',
      read: true,
      sender: 'Attendance System'
    },
    {
      id: 4,
      type: 'fee',
      title: 'Fee Reminder',
      message: 'Tuition fee installment due on April 15th, 2024',
      timestamp: '2024-03-17 2:00 PM',
      priority: 'high',
      read: true,
      sender: 'Finance Department'
    }
  ];

  const quickActions = [
    {
      title: 'Schedule Meeting',
      description: 'Book a meeting with teachers',
      icon: Calendar,
      action: 'schedule'
    },
    {
      title: 'Request Leave',
      description: 'Apply for student leave',
      icon: Mail,
      action: 'leave'
    },
    {
      title: 'Report Issue',
      description: 'Report academic or other issues',
      icon: AlertCircle,
      action: 'report'
    },
    {
      title: 'Feedback',
      description: 'Provide feedback to teachers',
      icon: Star,
      action: 'feedback'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'announcement': return Bell;
      case 'grade': return CheckCircle;
      case 'attendance': return Clock;
      case 'fee': return AlertCircle;
      default: return Info;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <p className="text-gray-600">Stay connected with teachers and school administration</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      {/* Communication Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages and Conversations */}
        <div className="lg:col-span-2">
          <Card className="dashboard-card h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Messages
              </CardTitle>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex h-[480px]">
                {/* Conversations List */}
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm text-gray-900 truncate">
                              {conversation.name}
                            </p>
                            {conversation.unread > 0 && (
                              <Badge className="bg-blue-600 text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{conversation.role}</p>
                          <p className="text-xs text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {conversation.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Thread */}
                <div className="flex-1 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={selectedConversation.avatar}
                              alt={selectedConversation.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">
                                {selectedConversation.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedConversation.role} - {selectedConversation.subject}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Video className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.type === 'sent'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {message.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-xs">
                                      <Paperclip className="w-3 h-3" />
                                      <span>{attachment}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs mt-1 opacity-70">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications and Quick Actions */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-gray-900">
                            {notification.title}
                          </p>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {notification.sender}
                          </p>
                          <p className="text-xs text-gray-400">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Communication Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
                <p className="text-xs text-green-600">+12 this week</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-xs text-blue-600">With teachers</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.5h</p>
                <p className="text-xs text-gray-600">Average</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentCommunication;