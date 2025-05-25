'use client';

import React, { useEffect, useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import { Task, TaskStatus } from '@/types/task';
import ImageWrapper from '@/components/ui/ImageWrapper';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableTaskItem } from './SortableTaskItem';

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
  const contextFilteredTasks = isAdmin 
    ? contextTasks
    : contextTasks.filter(task => task.assignedTo === user?.username);
  
  // State for local sorting
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  
  // Update local tasks when context or custom tasks change
  useEffect(() => {
    const tasksToSort = customTasks || contextFilteredTasks;
    
    // Sort tasks: non-completed first, then completed
    const sortedTasks = [...tasksToSort].sort((a, b) => {
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (a.status !== 'done' && b.status === 'done') return -1;
      return 0;
    });
    
    setLocalTasks(sortedTasks);
  }, [customTasks, contextFilteredTasks]);
  
  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setLocalTasks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        // Only allow reordering within the same status group
        const activeItem = items[oldIndex];
        const overItem = items[newIndex];
        
        if (activeItem.status === 'done' && overItem.status !== 'done' ||
            activeItem.status !== 'done' && overItem.status === 'done') {
          return items; // Don't allow dragging between completed and non-completed groups
        }
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  // Re-sort tasks when a task status changes
  useEffect(() => {
    // Sort tasks whenever they change
    const sortTasks = () => {
      setLocalTasks(prev => {
        return [...prev].sort((a, b) => {
          if (a.status === 'done' && b.status !== 'done') return 1;
          if (a.status !== 'done' && b.status === 'done') return -1;
          return 0;
        });
      });
    };
    
    sortTasks(); // Initial sort
    
    // This re-sorts tasks when the task list changes
    return () => {
      // Cleanup if needed
    };
  }, [localTasks.length]); // Only re-run when the number of tasks changes

  return (
    <div className="flex flex-col">
      <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2 mb-4">
        <div className="flex flex-col gap-4 mt-5">
          {localTasks.length > 0 ? (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={localTasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {localTasks.map((task) => (
                  <SortableTaskItem
                    key={task.id}
                    id={task.id}
                    task={task}
                    onEdit={(id) => onEdit && onEdit(id)}
                    onDelete={deleteTask}
                    onToggleStatus={(id) => {
                      toggleTask(id);
                      
                      // Force re-sort after status change
                      const taskToUpdate = localTasks.find(t => t.id === id);
                      if (!taskToUpdate) return;
                      
                      const newStatus: TaskStatus = taskToUpdate.status === 'done' ? 'in_progress' : 'done';
                      
                      const updatedTask: Task = { 
                        ...taskToUpdate,
                        status: newStatus,
                        completed: newStatus === 'done'
                      };
                      
                      // Update local state with proper sorting
                      setLocalTasks(prev => {
                        const newTasks = prev.map(t => t.id === id ? updatedTask : t);
                        return newTasks.sort((a, b) => {
                          if (a.status === 'done' && b.status !== 'done') return 1;
                          if (a.status !== 'done' && b.status === 'done') return -1;
                          return 0;
                        });
                      });
                    }}
                    loading={loading}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
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
