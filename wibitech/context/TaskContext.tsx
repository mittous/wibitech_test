'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { Task, TaskContextType } from '@/types/task';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (err: any) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'completed'>) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/tasks', task);
      toast.success('Task added');
      await fetchTasks();
    } catch (err: any) {
      setError('Failed to add task');
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, updatedFields: Partial<Task>) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/tasks/${id}`, updatedFields);
      toast.success('Task updated');
      await fetchTasks();
    } catch (err: any) {
      setError('Failed to update task');
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted');
    } catch (err: any) {
      setError('Failed to delete task');
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    
    await editTask(id, { 
      status: task.status === 'done' ? 'in_progress' : 'done',
      completed: !task.completed 
    });
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        status,
        fetchTasks,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
