import axios from 'axios';

// API base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Student Admission API
export const studentAdmissionAPI = {
  submit: async (data: any) => {
    const response = await api.post('/admissions', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/admissions');
    return response.data;
  },
};

// Fee Payment API
export const feePaymentAPI = {
  submit: async (data: any) => {
    const response = await api.post('/fee-payments', data);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/fee-payments/stats');
    return response.data;
  },
};

// Hostel Allocation API
export const hostelAPI = {
  submit: async (data: any) => {
    const response = await api.post('/hostel-allocations', data);
    return response.data;
  },
  getOccupancy: async () => {
    const response = await api.get('/hostel-allocations/occupancy');
    return response.data;
  },
};

// Library API
export const libraryAPI = {
  submit: async (data: any) => {
    const response = await api.post('/library-transactions', data);
    return response.data;
  },
  getBorrowedCount: async () => {
    const response = await api.get('/library-transactions/borrowed-count');
    return response.data;
  },
};

// Exam Registration API
export const examAPI = {
  submit: async (data: any) => {
    const response = await api.post('/exam-registrations', data);
    return response.data;
  },
  getRegistrationCount: async () => {
    const response = await api.get('/exam-registrations/count');
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getMetrics: async () => {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  },
  getChartData: async () => {
    const response = await api.get('/dashboard/chart-data');
    return response.data;
  },
};

export default api;