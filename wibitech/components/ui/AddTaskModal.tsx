import React, { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { Task } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import AssigneeDropdown from './form/AssigneeDropdown';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  users?: string[];
  taskToEdit?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  open, 
  onClose, 
  users = [], 
  taskToEdit 
}) => {
  const { addTask, editTask, loading } = useTasks();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  const isAdmin = user?.role === 'admin';
  const filteredUsers = users.filter(username => !username.includes('admin'));

  // Populate form when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setAssignedTo(taskToEdit.assignedTo);
      setDescription(taskToEdit.description || '');
    } else {
      // Reset form when not editing
      setTitle('');
      setAssignedTo(isAdmin ? '' : user?.username || '');
      setDescription('');
    }
  }, [taskToEdit, user, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) {
      setError('Title and Assignee are required.');
      return;
    }
    setError('');

    if (taskToEdit) {
      await editTask(taskToEdit.id, {
        title,
        assignedTo,
        description,
      });
    } else {
      await addTask({
        title,
        assignedTo,
        description,
        status: 'in_progress',
      });
    }
    
    setTitle('');
    setAssignedTo('');
    setDescription('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md relative"
        style={{ minWidth: 400 }}
      >
        <div className="flex items-center justify-between mb-4">
          <label className="font-semibold text-gray-800 dark:text-gray-100">Task title</label>
          {isAdmin && (
            <label className="font-semibold text-gray-800 dark:text-gray-100">Assign to</label>
          )}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <input
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="What's in your mind?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          
          {isAdmin ? (
            <AssigneeDropdown 
              users={filteredUsers} 
              value={assignedTo} 
              onChange={setAssignedTo} 
            />
          ) : (
            <input
              type="hidden"
              value={user?.username || ''}
              onChange={() => {}}
            />
          )}
        </div>
        
        <label className="block font-semibold text-gray-800 dark:text-gray-100 mb-2">Description</label>
        <textarea
          className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 h-24 resize-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 mb-6"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-red-500 dark:text-red-400 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {taskToEdit ? 'Update task' : 'Add task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal; 