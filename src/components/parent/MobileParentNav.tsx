import React from 'react';
import { Button } from '../ui/button';
import { 
  User, 
  BookOpen, 
  CreditCard, 
  Bell, 
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare
} from 'lucide-react';

interface MobileParentNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileParentNav: React.FC<MobileParentNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 px-2 py-3 ${
              activeTab === tab.id 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileParentNav;