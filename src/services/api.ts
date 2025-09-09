import axios from 'axios';

// API base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Loading state management
export let isApiLoading = false;
export const setApiLoading = (loading: boolean) => {
  isApiLoading = loading;
};

// Request interceptor for adding auth tokens and loading state
api.interceptors.request.use(
  (config) => {
    setApiLoading(true);
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    
    return config;
  },
  (error) => {
    setApiLoading(false);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and loading state
api.interceptors.response.use(
  (response) => {
    setApiLoading(false);
    return response;
  },
  (error) => {
    setApiLoading(false);
    
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access denied:', data.message || 'Insufficient permissions');
          break;
        case 404:
          console.error('Resource not found:', error.config.url);
          break;
        case 500:
          console.error('Server error:', data.message || 'Internal server error');
          break;
        default:
          console.error('API Error:', data.message || error.message);
      }
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Request Error:', error.message);
    }
    
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
// Dashboard API
export const dashboardAPI = {
  getMetrics: async (role: string) => {
    const response = await api.get(`/dashboard/metrics?role=${role}`);
    return response.data;
  },
  getChartData: async (role: string) => {
    const response = await api.get(`/dashboard/chart-data?role=${role}`);
    return response.data;
  },
};

// Authentication API
export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// User Profile API
export const profileAPI = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  update: async (data: any) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Role-specific APIs
export const studentAPI = {
  getProfile: async () => {
    const response = await api.get('/student/profile');
    return response.data;
  },
  getDashboard: async () => {
    const response = await api.get('/student/dashboard');
    return response.data;
  },
  getFeeStatus: async () => {
    const response = await api.get('/student/fees');
    return response.data;
  },
  getHostelInfo: async () => {
    const response = await api.get('/student/hostel');
    return response.data;
  },
  getLibraryBooks: async () => {
    const response = await api.get('/student/library');
    return response.data;
  },
  getExamRegistrations: async () => {
    const response = await api.get('/student/exams');
    return response.data;
  },
};

export const staffAPI = {
  getDashboard: async () => {
    const response = await api.get('/staff/dashboard');
    return response.data;
  },
  manageHostel: async () => {
    const response = await api.get('/staff/hostel/manage');
    return response.data;
  },
  manageLibrary: async () => {
    const response = await api.get('/staff/library/manage');
    return response.data;
  },
  manageExams: async () => {
    const response = await api.get('/staff/exams/manage');
    return response.data;
  },
};

export const adminAPI = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  createUser: async (userData: any) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  updateUser: async (userId: string, userData: any) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  getSystemMetrics: async () => {
    const response = await api.get('/admin/metrics');
    return response.data;
  },
};

export default api;