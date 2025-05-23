import React, { useState } from 'react';
import Image from 'next/image';
import { useTasks } from '@/context/TaskContext';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  users?: string[]; // Optionally pass a list of users to assign
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, users = [] }) => {
  const { addTask, loading } = useTasks();
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) {
      setError('Title and Assignee are required.');
      return;
    }
    setError('');
    await addTask({
      title,
      assignedTo,
      description,
      status: 'in_progress',
    });
    setTitle('');
    setAssignedTo('');
    setDescription('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
        style={{ minWidth: 400 }}
      >
        <div className="flex items-center justify-between mb-4">
          <label className="font-semibold text-gray-800">Task title</label>
          <label className="font-semibold text-gray-800">Assign to</label>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <input
            className="flex-1 bg-gray-100 rounded-lg px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            placeholder="What's in your mind?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <div className="relative flex-1">
            <button
              type="button"
              className="w-full flex items-center bg-gray-100 rounded-lg px-4 py-2 text-gray-400 justify-between"
              onClick={() => setShowDropdown(v => !v)}
            >
              {assignedTo || 'Assign to'}
              <Image src="/DownArrow_Icon.svg" alt="down" width={16} height={16} />
            </button>
            {showDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow z-10">
                {users.length === 0 && (
                  <div className="px-4 py-2 text-gray-400">No users</div>
                )}
                {users.map(user => (
                  <div
                    key={user}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    onClick={() => {
                      setAssignedTo(user);
                      setShowDropdown(false);
                    }}
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <label className="block font-semibold text-gray-800 mb-2">Description</label>
        <textarea
          className="w-full bg-gray-100 rounded-lg px-4 py-2 h-24 resize-none outline-none text-gray-700 placeholder-gray-400 mb-6"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-gray-100 text-red-500 font-semibold hover:bg-gray-200"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
            disabled={loading}
          >
            Add task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal; 