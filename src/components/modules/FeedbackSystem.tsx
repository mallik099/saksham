import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { MessageSquare, User, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Feedback {
  id: number;
  name: string;
  email: string;
  type: 'Academic' | 'Infrastructure' | 'Food' | 'Transport' | 'Other';
  subject: string;
  message: string;
  status: 'Open' | 'Resolved';
  submittedDate: string;
  userType: 'Student' | 'Parent';
}

const mockFeedbacks: Feedback[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Academic', subject: 'Course Material Issue', message: 'Need updated textbooks for Physics', status: 'Open', submittedDate: '2024-02-15', userType: 'Student' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', type: 'Infrastructure', subject: 'Library WiFi', message: 'WiFi connection is slow in library', status: 'Resolved', submittedDate: '2024-02-10', userType: 'Parent' }
];

const FeedbackSystem = ({ isAdmin = false, userType = 'Student' }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedbacks);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      ...formData,
      type: formData.type as any,
      status: 'Open',
      submittedDate: new Date().toISOString().split('T')[0],
      userType: userType as 'Student' | 'Parent'
    };
    setFeedbacks([...feedbacks, newFeedback]);
    setFormData({ name: '', email: '', type: '', subject: '', message: '' });
    setShowForm(false);
    toast.success('Feedback submitted successfully');
  };

  const markAsResolved = (id: number) => {
    setFeedbacks(feedbacks => feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, status: 'Resolved' } : feedback
    ));
    toast.success('Feedback marked as resolved');
  };

  const getStatusColor = (status: string) => {
    return status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Academic: 'bg-blue-100 text-blue-800',
      Infrastructure: 'bg-purple-100 text-purple-800',
      Food: 'bg-orange-100 text-orange-800',
      Transport: 'bg-green-100 text-green-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.Other;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-blue-700">
            <MessageSquare className="w-5 h-5 mr-2" />
            {isAdmin ? 'Feedback Management' : 'Submit Feedback'}
          </CardTitle>
          {!isAdmin && (
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              New Feedback
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showForm && !isAdmin && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Category</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Describe your feedback or concern"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" size="sm">Submit</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{feedback.subject}</h4>
                    <Badge className={getTypeColor(feedback.type)}>{feedback.type}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {feedback.name} ({feedback.userType}) • {feedback.submittedDate}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(feedback.status)}>
                    {feedback.status === 'Resolved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {feedback.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{feedback.message}</p>
              <p className="text-xs text-gray-500 mb-3">Contact: {feedback.email}</p>
              
              {isAdmin && feedback.status === 'Open' && (
                <Button size="sm" onClick={() => markAsResolved(feedback.id)} className="bg-green-600 hover:bg-green-700">
                  Mark as Resolved
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSystem;