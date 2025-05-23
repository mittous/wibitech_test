'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import TaskItem from './TaskItem';

interface TaskListProps {
  onEdit?: (taskId: string) => void;
  onAddTask?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onAddTask }) => {
  const { tasks, deleteTask, toggleTask, loading } = useTasks();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const visibleTasks = isAdmin
    ? tasks
    : tasks.filter(task => task.assignedTo === user?.username);

  return (
    <div className="space-y-4">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={(id) => onEdit && onEdit(id)}
          onDelete={deleteTask}
          onToggleStatus={toggleTask}
          loading={loading}
        />
      ))}

      {isAdmin && (
        <div
          onClick={onAddTask}
          className="flex items-center px-5 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">＋ Add a new task...</span>
        </div>
      )}

      {visibleTasks.length === 0 && !loading && (
        <div className="text-center text-gray-400 dark:text-gray-500 py-8">No tasks found.</div>
      )}
    </div>
  );
};

export default TaskList;
