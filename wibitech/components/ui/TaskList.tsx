'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import TaskItem from '@/components/ui/TaskItem';
import { Task } from '@/types/task';
import ImageWrapper from '@/components/ui/ImageWrapper';

interface TaskListProps {
  onEdit?: (taskId: string) => void;
  onAddTask?: () => void;
  tasks?: Task[]; // Optional custom tasks array
  hideAddTask?: boolean; // Optional flag to hide add task button for users
}

const TaskList: React.FC<TaskListProps> = ({ 
  onEdit, 
  onAddTask,
  tasks: customTasks,
}) => {
  const { tasks: contextTasks, deleteTask, toggleTask, loading } = useTasks();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Use custom tasks if provided, otherwise filter from context
  const visibleTasks = customTasks || (isAdmin 
    ? contextTasks
    : contextTasks.filter(task => task.assignedTo === user?.username));

  return (
    <div className="flex flex-col">
      <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2 mb-4">
        <div className="flex flex-col gap-4 mt-5">
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

          {visibleTasks.length === 0 && !loading && (
            <div className="text-center text-gray-400 dark:text-gray-500 py-8">No tasks found.</div>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <div
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-3 border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ImageWrapper src="/svg/AddTask_Icon.svg" alt="Add" width={20} height={20} isSvg={true} />
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">Add a new task...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
