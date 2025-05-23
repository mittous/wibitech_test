import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronUp } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { Task } from '@/context/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  loading: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  loading 
}) => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const isAdmin = user?.role === 'admin';
  const isCompleted = task.status === 'done';

  return (
    <div className="relative flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 group">
      <div className="flex-1">
        <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">@{task.assignedTo}</div>
        <div className={`font-bold text-lg text-gray-800 dark:text-gray-100 mb-1 ${isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {task.description || (
            <span className="italic">
              Note: Add relevant details, blockers, or context for this task here.
            </span>
          )}
        </div>
      </div>
      
      {/* Desktop actions (visible on hover) */}
      <div className="hidden md:flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isCompleted && (
          <>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              title="Edit"
              onClick={() => onEdit(task.id)}
            >
              <Image src="/Edit_Icon.svg" alt="Edit" width={20} height={20} />
            </button>
            
            <button
              className="ml-2 px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-150 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => onToggleStatus(task.id)}
              disabled={loading}
            >
              Done
            </button>
          </>
        )}
        
        {isAdmin && (
          <button
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
            title="Delete"
            onClick={() => onDelete(task.id)}
            disabled={loading}
          >
            <Image src="/Delet_Icon.svg" alt="Delete" width={20} height={20} />
          </button>
        )}
      </div>
      
      {/* Mobile toggle button - only show if there are actions available */}
      {(!isCompleted || (isCompleted && isAdmin)) && (
        <button 
          className="md:hidden absolute bottom-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          onClick={() => setExpanded(!expanded)}
        >
          <FiChevronUp 
            className={`transition-transform duration-200 ${expanded ? 'rotate-0' : 'rotate-180'}`} 
            size={16}
          />
        </button>
      )}
      
      {/* Mobile expanded actions */}
      {expanded && (
        <div className="md:hidden absolute bottom-12 right-2 flex flex-row bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 space-x-2">
          {!isCompleted && (
            <>
              <button
                className="p-[12px]  rounded-[16px] bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => onToggleStatus(task.id)}
                disabled={loading}
              >
                <Image src="/CheckCircle_Icon.svg" alt="Done" width={20} height={20} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                title="Edit"
                onClick={() => onEdit(task.id)}
              >
                <Image src="/Edit_Icon.svg" alt="Edit" width={20} height={20} />
              </button>
              
            </>
          )}
          
          {isAdmin && (
            <button
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
              title="Delete"
              onClick={() => onDelete(task.id)}
              disabled={loading}
            >
              <Image src="/Delet_Icon.svg" alt="Delete" width={20} height={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem; 