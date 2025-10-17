import { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (apiFunction) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, callApi };
};

// Auth API hooks
export const useAuthApi = () => {
  const { loading, error, callApi } = useApi();

  const register = async (email, password) => {
    return callApi(async () => {
      const response = await apiClient.post('/register', { email, password });
      return response.data;
    });
  };

  const login = async (email, password) => {
    return callApi(async () => {
      const response = await apiClient.post('/login', { email, password });
      return response.data;
    });
  };

  return { register, login, loading, error };
};

// User API hooks
export const useUserApi = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 6,
    total: 0,
    total_pages: 0,
  });

  const getUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setPagination({
        page: response.data.page,
        per_page: response.data.per_page,
        total: response.data.total,
        total_pages: response.data.total_pages,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch users');
      setLoading(false);
      throw err;
    }
  };

  const getUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/users/${id}`);
      setUser(response.data.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch user');
      setLoading(false);
      throw err;
    }
  };

  return { users, user, loading, error, pagination, getUsers, getUser };
};

export default apiClient;