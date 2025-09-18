import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout';
import Dashboard from './admin/Dashboard';
import StudentManagement from './admin/students';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students/*" element={<StudentManagement />} />
        {/* Additional routes will be added here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;