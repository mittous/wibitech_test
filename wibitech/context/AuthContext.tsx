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
  register: (data: RegisterPayload) => Promise<void>; // <-- New
}

// Payload shape for registration
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


  // to-do useeffect for checking if the user is logged in

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post('/login', { username, password });
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem('token', token);// the best practice it use it in cokies but it was asked in the task tst
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success('Login successful');
      router.push('/tasks');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };  

   // Register logic
   const register = async (data: RegisterPayload) => {
    const res = await axios.post("https://recruter-backend.vercel.app/api/register", data);

    // Auto-login after successful registration
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
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