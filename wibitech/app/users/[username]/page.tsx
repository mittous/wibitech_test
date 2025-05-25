'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, redirect } from 'next/navigation';
import { useTasks } from '@/context/TaskContext';
import { useUsers } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import TaskList from '@/components/ui/TaskList';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { FiArrowLeft } from 'react-icons/fi';
import { Task } from '@/types/task';
import ImageWrapper from '@/components/ui/ImageWrapper';

const UserProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { tasks } = useTasks();
  const { users } = useUsers();
  const { user: currentUser } = useAuth();
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check auth directly from localStorage as a backup
    const token = localStorage.getItem('token');
    
    if (!token && !currentUser) {
      redirect('/login');
    }
    
    setIsLoading(false);
  }, [currentUser]);
  
  // Check if viewing own profile
  const isOwnProfile = currentUser?.username === username;
  
  const user = users.find(user => user.username === username);
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const filteredTasks = tasks.filter(task => task.assignedTo === username);
      setUserTasks(filteredTasks);
    }
  }, [tasks, username]);
  
  const handleBack = () => {
    router.back();
  };
  
  // Handle edit task
  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setEditModalOpen(true);
    }
  };
  
  // Handle close modal
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setAddModalOpen(false);
    setTaskToEdit(null);
  };
  
  if (isLoading) {
    return <div className="pt-[150px] flex justify-center">Loading...</div>;
  }

  return (
    <div className="pt-[150px] overflow-y-hidden">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-blue-500 hover:underline"
        >
          <FiArrowLeft size={16} />
          <span>Back to Tasks</span>
        </button>
      </div>
      
      <div className="mb-2 sticky top-[50px] bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-800">
           
            {
              user?.role === 'admin' 
                ? <ImageWrapper 
                    className="object-cover w-full h-full" 
                    src="/adminAvatar.png" 
                    alt={`${username}'s avatar`} 
                    width={64} 
                    height={64} 
                    isSvg={false} 
                  />
                : <ImageWrapper 
                    className="object-cover w-full h-full" 
                    src="/userAvatar.png" 
                    alt={`${username}'s avatar`} 
                    width={64} 
                    height={64} 
                    isSvg={false} 
                  />
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              @{username}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {user?.role || 'user'}
            </span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold">
          {isOwnProfile ? 'My Tasks' : `${username}'s Tasks`}
        </h2>
      </div>
      
      <TaskList 
        tasks={userTasks} 
        hideAddTask={false}
        onEdit={handleEditTask}
        onAddTask={() => setAddModalOpen(true)}
      />
      
      <AddTaskModal
        open={isEditModalOpen || isAddModalOpen}
        onClose={handleCloseModal}
        users={users.map(user => user.username)}
        taskToEdit={taskToEdit}
        defaultAssignee={username} // auto fill profile username if inside the same user
      />
    </div>
  );
};

export default UserProfilePage; 