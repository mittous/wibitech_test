'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface TaskListProps {
  onEdit?: (taskId: string) => void;
  onAddTask?: () => void; // new prop
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onAddTask }) => {
  const { tasks, deleteTask, toggleTask, loading } = useTasks();
  const { user } = useAuth();

  const visibleTasks = user?.role === 'admin'
    ? tasks
    : tasks.filter(task => task.assignedTo === user?.username);

  return (
    <div className="space-y-4">
      {visibleTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-200"
        >
          <div className="flex-1">
            <div className="text-xs text-blue-600 font-semibold mb-1">@{task.assignedTo}</div>
            <div className="font-bold text-lg text-gray-800 mb-1">{task.title}</div>
            <div className="text-xs text-gray-400">
              {task.description || (
                <span className="italic">
                  Note: Add relevant details, blockers, or context for this task here.
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              className="p-2 hover:bg-gray-100 rounded"
              title="Edit"
              onClick={() => onEdit && onEdit(task.id)}
            >
            </button>
            <button
              className="p-2 hover:bg-red-50 rounded"
              title="Delete"
              onClick={() => deleteTask(task.id)}
              disabled={loading}
            >
              <FiTrash2 className="text-red-500" />
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-150 ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              onClick={() => toggleTask(task.id)}
              disabled={loading}
            >
              {task.status === 'completed' ? 'Completed' : 'Done'}
            </button>
          </div>
        </div>
      ))}

      <div
        onClick={onAddTask}
        className="flex items-center px-5 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
      >
        <span className="text-gray-400 text-sm font-medium">＋ Add a new task...</span>
      </div>

      {visibleTasks.length === 0 && !loading && (
        <div className="text-center text-gray-400 py-8">No tasks found.</div>
      )}
    </div>
  );
};


export default TaskList;
