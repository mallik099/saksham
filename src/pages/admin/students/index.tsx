import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentsList from './StudentsList';
import StudentRegistration from './StudentRegistration';
import StudentAttendance from './StudentAttendance';
import StudentDocuments from './StudentDocuments';

const StudentManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Students List</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <StudentsList />
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <StudentRegistration />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <StudentAttendance />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <StudentDocuments />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;