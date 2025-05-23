// context/TaskContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  completed: boolean;
};

interface TaskContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => Promise<void>;
  editTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error: any) {
      console.error('Failed to fetch tasks:', error);
      toast.error(error.response?.data?.message || 'Could not fetch tasks');
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'completed'>) => {
    try {
      await axios.post('/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task added');
      fetchTasks();
    } catch (error: any) {
      console.error('Failed to add task:', error);
      toast.error(error.response?.data?.message || 'Could not add task');
    }
  };

  const editTask = async (id: string, updates: Partial<Task>) => {
    try {
      await axios.patch(`/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task updated');
      fetchTasks();
    } catch (error: any) {
      console.error('Failed to edit task:', error);
      toast.error(error.response?.data?.message || 'Could not update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task deleted');
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      toast.error(error.response?.data?.message || 'Could not delete task');
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    await editTask(id, { completed: !task.completed });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, editTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};
