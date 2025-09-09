import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdmissionForm from "./pages/AdmissionForm";
import FeePayment from "./pages/FeePayment";
import HostelAllocation from "./pages/HostelAllocation";
import LibraryManagement from "./pages/LibraryManagement";
import ExamRegistration from "./pages/ExamRegistration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/admission" element={
                      <ProtectedRoute allowedRoles={['admin', 'staff']}>
                        <AdmissionForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/fees" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <FeePayment />
                      </ProtectedRoute>
                    } />
                    <Route path="/hostel" element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <HostelAllocation />
                      </ProtectedRoute>
                    } />
                    <Route path="/library" element={<LibraryManagement />} />
                    <Route path="/exam" element={<ExamRegistration />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
