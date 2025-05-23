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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-100/60 bg-opacity-50 dark:bg-opacity-70">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0px_15px_25px_0px_rgba(0,0,0,0.05)] p-8 w-full max-w-[600px] relative  "
        /* style={{ minWidth: 400 }} */
      >
        <div className="flex flex-col min-[425px]:flex-row gap-4 mb-4">
          <div className="w-full">
            <label className="block font-semibold text-gray-800 dark:text-gray-100 mb-2">Task title</label>
            <input
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="What's in your mind?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          {isAdmin && (
            <div className="w-full">
              <label className="block font-semibold text-gray-800 dark:text-gray-100 mb-2">Assign to</label>
              <AssigneeDropdown
                users={filteredUsers}
                value={assignedTo}
                onChange={setAssignedTo}
              />
            </div>
          )}

          {!isAdmin && (
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
          placeholder="Note: Add relevant details, blockers, or context for this task here."
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