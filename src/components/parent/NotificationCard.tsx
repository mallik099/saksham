import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  AlertCircle, 
  Calendar, 
  BookOpen, 
  CreditCard,
  Mail,
  Check
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'fee' | 'exam' | 'library';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: number) => void;
  onSendEmail?: (type: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  notification, 
  onMarkAsRead, 
  onSendEmail 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const getIcon = () => {
    switch (notification.type) {
      case 'fee':
        return <CreditCard className="w-5 h-5 text-red-500" />;
      case 'exam':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'library':
        return <BookOpen className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'fee':
        return 'border-l-red-400 bg-red-50';
      case 'exam':
        return 'border-l-blue-400 bg-blue-50';
      case 'library':
        return 'border-l-yellow-400 bg-yellow-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  const getTypeLabel = () => {
    switch (notification.type) {
      case 'fee':
        return 'Fee Alert';
      case 'exam':
        return 'Exam Notice';
      case 'library':
        return 'Library Notice';
      default:
        return 'Notice';
    }
  };

  return (
    <Card className={`border-l-4 ${getBorderColor()} ${!notification.read ? 'shadow-md' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {getIcon()}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel()}
                </Badge>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.date}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 ml-4">
            {!notification.read && onMarkAsRead && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark Read
              </Button>
            )}
            {onSendEmail && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSendEmail(notification.type)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;