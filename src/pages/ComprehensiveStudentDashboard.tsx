import React, { useState } from 'react';
import StudentLayout from '../components/student/StudentLayout';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentProfileModule from '../components/student/StudentProfileModule';
import StudentTimetableModule from '../components/student/StudentTimetableModule';
import StudentAttendanceModule from '../components/student/StudentAttendanceModule';
import StudentExamsModule from '../components/student/StudentExamsModule';
import StudentFeesModule from '../components/student/StudentFeesModule';
import StudentLibraryModule from '../components/student/StudentLibraryModule';
import StudentHostelModule from '../components/student/StudentHostelModule';
import StudentTransportModule from '../components/student/StudentTransportModule';
import StudentSettingsModule from '../components/student/StudentSettingsModule';

const ComprehensiveStudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'profile':
        return <StudentProfileModule />;
      case 'timetable':
        return <StudentTimetableModule />;
      case 'attendance':
        return <StudentAttendanceModule />;
      case 'exams':
        return <StudentExamsModule />;
      case 'fees':
        return <StudentFeesModule />;
      case 'library':
        return <StudentLibraryModule />;
      case 'hostel':
        return <StudentHostelModule />;
      case 'transport':
        return <StudentTransportModule />;
      case 'settings':
        return <StudentSettingsModule />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <StudentLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
    >
      {renderContent()}
    </StudentLayout>
  );
};

export default ComprehensiveStudentDashboard;