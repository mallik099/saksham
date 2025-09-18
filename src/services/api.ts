import axios from 'axios';

// API base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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

// Authentication API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
  getAdmissionsChart: async () => {
    const response = await api.get('/dashboard/admissions-chart');
    return response.data;
  },
};

// Admission API
export const admissionAPI = {
  submit: async (data: any) => {
    const response = await api.post('/admissions', data);
    return response.data;
  },
  getMy: async () => {
    const response = await api.get('/admissions/my');
    return response.data;
  },
  getAll: async (params?: any) => {
    const response = await api.get('/admissions', { params });
    return response.data;
  },
  updateStatus: async (id: string, data: any) => {
    const response = await api.patch(`/admissions/${id}/status`, data);
    return response.data;
  },
};

// Fee API
export const feeAPI = {
  getMy: async () => {
    const response = await api.get('/fees/my');
    return response.data;
  },
  pay: async (id: string, data: any) => {
    const response = await api.post(`/fees/${id}/pay`, data);
    return response.data;
  },
  getAll: async (params?: any) => {
    const response = await api.get('/fees', { params });
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/fees', data);
    return response.data;
  },
};

// Exam API
export const examAPI = {
  register: async (data: any) => {
    const response = await api.post('/exams', data);
    return response.data;
  },
  getMy: async () => {
    const response = await api.get('/exams/my');
    return response.data;
  },
  cancel: async (id: string) => {
    const response = await api.patch(`/exams/${id}/cancel`);
    return response.data;
  },
  getAll: async (params?: any) => {
    const response = await api.get('/exams', { params });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
  getAll: async (params?: any) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  updateStatus: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}/status`, data);
    return response.data;
  },
};

// Fee Payment API (legacy compatibility)
export const feePaymentAPI = {
  submit: async (data: any) => {
    return feeAPI.pay(data.feeId, data);
  },
  getStats: async () => {
    return feeAPI.getMy();
  },
};

// Hostel API (placeholder)
export const hostelAPI = {
  submit: async (data: any) => {
    const response = await api.post('/hostel', data);
    return response.data;
  },
  getOccupancy: async () => {
    const response = await api.get('/hostel/occupancy');
    return response.data;
  },
};

// Library API (placeholder)
export const libraryAPI = {
  submit: async (data: any) => {
    const response = await api.post('/library', data);
    return response.data;
  },
  getBorrowedCount: async () => {
    const response = await api.get('/library/borrowed-count');
    return response.data;
  },
};

export default api;

// Legacy exports for backward compatibility
export const studentAdmissionAPI = admissionAPI;