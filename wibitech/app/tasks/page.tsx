'use client';

import TaskList from '@/components/ui/TaskList';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { useAuth } from '@/context/AuthContext';
import { useUsers } from '@/context/UserContext';
import TasksHeader from '@/components/ui/TasksHeader';
import { useState, useEffect } from 'react';
import { useTasks } from '@/context/TaskContext';
import { Task } from '@/types/task';
import { redirect } from 'next/navigation';

const TasksPage = () => {
	const { user } = useAuth();
	const { users } = useUsers();
	const [isAddModalOpen, setAddModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const { tasks } = useTasks();
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check auth directly from localStorage as a backup
		const token = localStorage.getItem('token');
		
		if (!token && !user) {
			redirect('/login');
		}
		
		setIsLoading(false);
	}, [user]);

	if (isLoading) {
		return <div className="pt-[150px] flex justify-center">Loading...</div>;
	}

	const tasksNumber = user?.role === 'admin' ? tasks.length : tasks.filter(task => task.assignedTo === user?.username).length;

	const handleEditTask = (taskId: string) => {
		const task = tasks.find(t => t.id === taskId);
		if (task) {
			setTaskToEdit(task);
			setEditModalOpen(true);
		}
	};

	const handleCloseModal = () => {
		setAddModalOpen(false);
		setEditModalOpen(false);
		setTaskToEdit(null);
	};

	return (
		<div className="pt-[150px]">
			<TasksHeader
				title="Welcome"
				highlight={user?.username}
				subtitle={`Your team got ${tasksNumber} tasks to do.`}
			/>

			{/* Task List with Add New Task trigger */}
			<TaskList onAddTask={() => setAddModalOpen(true)} onEdit={handleEditTask} />

			{/* Modal for adding/editing a task */}
			<AddTaskModal
				open={isAddModalOpen || isEditModalOpen}
				onClose={handleCloseModal}
				users={users.filter(user => user.role !== "admin").map(user => user.username)}
				taskToEdit={taskToEdit}
			/>
		</div>
	);
};

export default TasksPage;
