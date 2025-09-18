import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  BookOpen, 
  CreditCard, 
  Bell, 
  Download, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap,
  LogOut,
  FileText,
  Mail,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getChildData, 
  downloadReceipt, 
  generateAttendanceReport, 
  generateFeeReport, 
  sendEmailNotification,
  initializeParentSecurity,
  clearParentSecurity,
  type ChildData 
} from '../services/parentService';
import MobileParentNav from '../components/parent/MobileParentNav';
import NotificationCard from '../components/parent/NotificationCard';
import AcademicCalendar from '../components/modules/AcademicCalendar';
import FeedbackSystem from '../components/modules/FeedbackSystem';
import DocumentVault from '../components/modules/DocumentVault';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [childData, setChildData] = useState<ChildData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const loadChildData = async () => {
      if (user?.childId) {
        try {
          // Initialize security context
          initializeParentSecurity(user);
          
          const data = await getChildData(user.childId);
          setChildData(data);
        } catch (error) {
          toast.error('Failed to load child data');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadChildData();
    
    // Cleanup security context on unmount
    return () => {
      clearParentSecurity();
    };
  }, [user?.childId]);

  const handleDownloadReceipt = async (receiptId: string) => {
    if (!user?.childId) return;
    
    setActionLoading(`receipt-${receiptId}`);
    try {
      await downloadReceipt(receiptId, user.childId);
    } catch (error) {
      toast.error('Failed to download receipt');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownloadReport = async (type: 'attendance' | 'fee') => {
    if (!user?.childId) return;
    
    setActionLoading(`report-${type}`);
    try {
      if (type === 'attendance') {
        await generateAttendanceReport(user.childId);
      } else {
        await generateFeeReport(user.childId);
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendNotification = async (type: string) => {
    if (!user?.childId) return;
    
    setActionLoading(`email-${type}`);
    try {
      await sendEmailNotification(type, user.childId);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    clearParentSecurity();
    logout();
    toast.success('Logged out successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'due': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'returned': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading child data...</p>
        </div>
      </div>
    );
  }

  if (!childData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load child data</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Attendance Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{childData.attendance.percentage}%</div>
            <p className="text-xs text-blue-600 mt-1">
              {childData.attendance.present}/{childData.attendance.total} days present
            </p>
          </CardContent>
        </Card>

        {/* Academic Performance */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{childData.academics.average}%</div>
            <p className="text-xs text-green-600 mt-1">
              Rank {childData.academics.rank} of {childData.academics.totalStudents}
            </p>
          </CardContent>
        </Card>

        {/* Fee Status */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Fee Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">₹{childData.fees.totalDue.toLocaleString()}</div>
            <p className="text-xs text-orange-600 mt-1">Due amount</p>
          </CardContent>
        </Card>

        {/* Library Books */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Library Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{childData.library.books.filter(b => b.status === 'Active').length}</div>
            <p className="text-xs text-purple-600 mt-1">Currently issued</p>
          </CardContent>
        </Card>
      </div>
      

    </>
  );

  const renderAcademics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <GraduationCap className="w-5 h-5 mr-2" />
          Academic Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {childData.academics.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{subject.name}</h4>
                <p className="text-sm text-gray-600">Grade: {subject.grade}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-700">{subject.marks}/{subject.total}</div>
                <div className="text-sm text-gray-500">{((subject.marks/subject.total)*100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderFees = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <CreditCard className="w-5 h-5 mr-2" />
          Fee Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {childData.fees.history.map((fee) => (
            <div key={fee.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{fee.type}</h4>
                <p className="text-sm text-gray-600">{fee.date}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{fee.amount.toLocaleString()}</div>
                  <Badge className={getStatusColor(fee.status)}>
                    {fee.status === 'Paid' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {fee.status}
                  </Badge>
                </div>
                {fee.receiptId && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadReceipt(fee.receiptId!)}
                    disabled={actionLoading === `receipt-${fee.receiptId}`}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    {actionLoading === `receipt-${fee.receiptId}` ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderLibrary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <BookOpen className="w-5 h-5 mr-2" />
          Library Books
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {childData.library.books.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{book.title}</h4>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-xs text-gray-500">Issued: {book.issueDate} | Due: {book.dueDate}</p>
              </div>
              <Badge className={getStatusColor(book.status)}>
                {book.status === 'Returned' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                 book.status === 'Overdue' ? <AlertCircle className="w-3 h-3 mr-1" /> : 
                 <Clock className="w-3 h-3 mr-1" />}
                {book.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const handleMarkAsRead = (notificationId: number) => {
    // In real app, this would update the backend
    toast.success('Notification marked as read');
  };

  const renderNotifications = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-700">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </div>
            <Badge className="bg-red-100 text-red-800">
              {childData.notifications.filter(n => !n.read).length} New
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>
      
      <div className="space-y-4">
        {childData.notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onSendEmail={handleSendNotification}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      {/* Header */}
      <div className="glass-header border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Saksham ERP — Parent Portal</h1>
                  <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {/* Child Info Card */}
        <Card className="mb-8 glass-card text-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{childData.student.name}</h2>
                <p className="text-blue-100">
                  {childData.student.class} - Section {childData.student.section} | Roll No: {childData.student.rollNo}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'academics', label: 'Academics', icon: GraduationCap },
            { id: 'fees', label: 'Fees', icon: CreditCard },
            { id: 'library', label: 'Library', icon: BookOpen },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'feedback', label: 'Feedback', icon: FileText },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'notifications', label: 'Notifications', icon: Bell }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={`${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-700 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'academics' && renderAcademics()}
          {activeTab === 'fees' && renderFees()}
          {activeTab === 'library' && renderLibrary()}
          {activeTab === 'calendar' && <AcademicCalendar />}
          {activeTab === 'feedback' && <FeedbackSystem isAdmin={false} userType="Parent" />}
          {activeTab === 'documents' && <DocumentVault isAdmin={false} />}
          {activeTab === 'notifications' && renderNotifications()}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileParentNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ParentDashboard;
