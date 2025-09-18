import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import Dashboard from './Dashboard';
import StudentManagement from './students';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="students/*" element={<StudentManagement />} />
        {/* Add more routes as we implement them */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;