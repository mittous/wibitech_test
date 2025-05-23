'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/api'; // axios instance with token interceptor
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'regular';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterPayload) => Promise<void>;
}

interface RegisterPayload {
  fullName: string;
  username: string;
  password: string;
  role: "admin" | "user";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

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

      // If token is embedded in user object, extract and clean it
      if (!token && user?.token) {
        // support for token nested in user
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
      console.log(error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      await axios.post("https://recruter-backend.vercel.app/api/register", data);
      await login(data.username, data.password);
      toast.success('Registration successful');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Registration failed');
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
