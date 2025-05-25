'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { AppUser, UserContextType } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { token, user } = useAuth(); 

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
