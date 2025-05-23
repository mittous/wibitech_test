// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
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
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { token } = useAuth();

  console.log("token", token);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      toast.error(error.response?.data?.message || 'Could not fetch users');
    }
  }, [token]);
  
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]);


  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUsers must be used within UserProvider');
  return ctx;
};
