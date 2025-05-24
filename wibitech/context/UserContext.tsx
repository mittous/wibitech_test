'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

export type AppUser = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};

interface UserContextType {
  users: AppUser[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { token, user } = useAuth(); // get both token and user from auth

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Could not fetch users');
      }
    };

    if (token && user?.role === 'admin') {
      fetchUsers();
    }
  }, [token, user]);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUsers must be used within UserProvider');
  return ctx;
};
