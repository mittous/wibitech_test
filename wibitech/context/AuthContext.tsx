'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { User, AuthContextType, RegisterPayload } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post('/login', { username, password });

      let token = res.data.token;
      const user = res.data.user;

      if (!token && user?.token) {
        token = user.token;
        delete user.token;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success('Login successful');
      router.push('/tasks');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/register', userData);
      
      if (response.status === 201) {
        toast.success('Registration successful!');
        login(userData.username, userData.password);
        return { success: true, data: response.data };
      } else {
        // Any non-201 response that doesn't throw an error
        toast.error('Registration failed with unexpected response.');
        return { success: false };
      }
    } catch (err: any) {
      // Handle specific error responses
      if (err.response) {
        switch (err.response.status) {
          case 409:
            setError('Username already taken');
            toast.error('Username already taken. Please choose another one.');
            break;
          case 422:
            setError('Missing required fields');
            toast.error('Please fill in all required fields.');
            break;
          default:
            setError('Failed to register');
            toast.error('Registration failed. Please try again later.');
        }
      } else {
        setError('Network error');
        toast.error('Network error. Please check your connection.');
      }
      
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
